---
layout: learn_article
date: 2021-06-04 00:05:06
image: /images/twitter/default.png
categories: Administration
author: The Metabase Team
redirect_from:
  - /learn/developing-applications/advanced-metabase/ldap-auth-access-control
  - /learn/permissions/ldap-auth-access-control
---

Authentication and access control are essential to ensuring that the right people have access to the data they need, and that _only_ the right people have that access. This tutorial shows you how to connect Metabase to an LDAP server for authentication, and how to use group information from that LDAP server to control who can view tables in Metabase. We won't try to teach you LDAP itself, but we will only assume you know a few basic concepts.

## Setting up LDAP

The Sample Database that ships with Metabase has four tables. The `People` table contains personal identifying information (PII), so we only want people in Human Resources to be able to see it. Since our company is already using LDAP for single sign-on (SSO), we want to get information about who is (and isn't) in HR from LDAP. We already have a record in LDAP for the company:

```txt
dn: dc=metabase,dc=com
objectClass: top
objectClass: dcObject
objectClass: organization
o: Metabase
```

We also have records for Farrah (who is in HR) and Rasmus (who isn't):

```txt
dn: uid=farrah,dc=metabase,dc=com
objectClass: person
objectClass: inetOrgPerson
cn: Farrah Zubin
mail: farrah@example.metabase.com
givenName: Farrah
sn: Zubin
uid: farrah
userPassword: ------

dn: uid=rasmus,dc=metabase,dc=com
objectClass: person
objectClass: inetOrgPerson
cn: Rasmus Verdorff
mail: rasmus@example.metabase.com
givenName: Rasmus
sn: Verdorff
uid: rasmus
userPassword: ------
```

The records for Farrah and Rasmus don't specify which groups they are part of. Instead, we need a separate `Groups` records for our user groups, and below that, a `groupOfNames` record that specifies that Farrah and another employee named Luis are in `Human Resources`:

```txt
dn: ou=Groups,dc=metabase,dc=com
objectClass: top
objectClass: organizationalUnit
ou: Groups

dn: cn=Human Resources,ou=Groups,dc=metabase,dc=com
objectClass: top
objectClass: groupOfNames
description: Human Resources
member: uid=farrah,dc=metabase,dc=com
member: uid=luis,dc=metabase,dc=com
```

> If you're following along with OpenLDAP and setting it up from scratch, you may need to modify the `slapd.conf` configuration file to include the `cosine.schema` and `inetorgperson.schema` schema files as well as `core.schema` in order for this to work.

## Connecting to LDAP

Once LDAP has the right records, we can log into Metabase using an account with administrator rights. We need to do four things:

1. [Create a group](#creating-a-group).
2. [Tell Metabase that people can authenticate through LDAP](#authenticating).
3. [Specify which tables that group can access](#permissions).
4. [Tell Metabase to get group information from LDAP](#group-management).

### Creating a group

To start, we click on the **gears** icon in the bottom of the navigation sidebar and select **Admin settings** > **People** > **Groups** and select **Create a Group**. We'll call our group "Human Resources", but we _won't_ add any people to it here in Metabase: we're going to rely on LDAP to manage membership.

### Authenticating

The next step is to tell Metabase that it can authenticate people via LDAP. To do this, we click on **Authentication**, enable LDAP, and then fill in the settings to tell Metabase where it can find the server. We are using a local instance on port 389, and we want Metabase to use the "Manager" account to access LDAP. All of our people are under `metabase.com`, and we can find them using the default search filter (which looks people up by ID or email address).

At this point people can log in via LDAP. To test that, we can open an anonymous browser window and log in as either Rasmus or Farrah. Neither of them can see the `People` table yet because we haven't told Metabase to get group information from LDAP.

### Permissions

Next, we go to **Admin settings** > **Permissions** > **Data** and disable general access to the `People` table so that people cannot see that table by default. We then grant access to the `Human Resources` group. ([This article on sandboxing][sandboxing] has more information about managing table access in Metabase.)

### Group Management

Let's go back to the LDAP configuration page in the **Admin settings**. Down at the bottom we tell Metabase to synchronize group memberships with information from LDAP, and that it can find groups under the `metabase.com` domain.

The last step is to tell Metabase how its groups and LDAP's groups are related. If we click on **Edit mappings** and **Create a mapping**, we can fill in the distinguished name that identifies the group in LDAP---in this case, the DN for the Human Resources group we created earlier. We then click **Add**, select the Metabase group that the LDAP group corresponds to, and save our changes.

That's a lot of setup. To test it, let's open an anonymous window and log in as Rasmus. Sure enough, Rasmus still can't see the `People` table since he's not a member of the Human Resources group. But if we close that window, open another one, and log in as Farrah, we _can_ see the `People` table. And if we go back to the administrator's window and look at `People`, we can see icons that show us whose account is coming from LDAP instead of being managed by Metabase.

## Further reading

- [Sandboxing your data][sandboxing]
- [Authenticating with Google Sign-In or LDAP][sso]

[sandboxing]: /docs/latest/enterprise-guide/data-sandboxes
[sso]: /docs/latest/administration-guide/10-single-sign-on
