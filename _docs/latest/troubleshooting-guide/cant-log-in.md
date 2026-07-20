---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Troubleshooting Guide
title: People can't log in to Metabase
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/troubleshooting-guide/cant-log-in.md
layout: new-docs
latest: true
---

# People can't log in to Metabase

## Reset password

To reset a password for your Metabase instance, see:

- [Reset a user's password](../people-and-groups/managing#resetting-someones-password).
- [Reset admin password](../people-and-groups/managing#resetting-the-admin-password).

To reset password for your Metabase Store account, [contact support](/help-premium).

## No access to Metabase login page

If you're not a Metabase admin, you'll have to tag them for help here.

1. Check that you have the correct [site URL](../configuring-metabase/settings) from **Settings** > **Admin** > **General**.
2. Check if the [account is deactivated](../people-and-groups/managing#deactivating-an-account).

## No access to Metabase Cloud account

The admin password for `store.metabase.com` (where you can find payment and subscription info) is not necessarily the same as the password for your Metabase instance (where you log in to look at data).

If you've forgotten your Metabase Cloud admin password, you can [contact support](/help-premium) to reset the password.

## Related topics

- [Troubleshooting SAML](./saml).
- [Troubleshooting LDAP](./ldap).
- [Resetting someone's password](../people-and-groups/managing#resetting-someones-password).
- [Resetting the admin password](../people-and-groups/managing#resetting-the-admin-password).
- [Deleting an account that's set up incorrectly](../people-and-groups/managing#deleting-an-account).

## Are you still stuck?

If you can’t solve your problem using the troubleshooting guides:

- Search or ask the [Metabase community](https://discourse.metabase.com/).
- Search for [known bugs or limitations](./known-issues).
