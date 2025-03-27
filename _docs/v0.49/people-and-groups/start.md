---
version: v0.49
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: 'People and Groups'
title: 'People overview'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/people-and-groups/start.md'
layout: new-docs
redirect_from:
    - /docs/v0.49/administration-guide/sso
---

# People overview

User accounts, groups, and authentication. For permissions, see [Permissions overview](../permissions/start).

## [Editing your account settings](./account-settings)

Edit your profile and password, and view your login history.

## [Managing people and groups](./managing)

Admin controls for setting up user accounts and organizing them into groups.

## [Changing password complexity](./changing-password-complexity)

Make people use longer and more complex passwords.

## [Changing session expiration](./changing-session-expiration)

Tell Metabase how long it should wait before asking people to log in again.

## Authentication

Metabase offers several options for single sign-on (SSO) authentication.

> If you need to set up 2-step or multi-factor authentication (2FA or MFA) for your Metabase, consider using one of the SSO options below.

### SSO for Metabase Open Source and Starter plans

- [Google Sign-in][google-sign-in]
- [LDAP][ldap]

### SSO for Metabase Pro and Enterprise plans

With some paid plans, you have more options to help orchestrate lots of people and groups.

- [JWT][jwt]
- LDAP advanced features
  - [Group membership filter][ldap-group-membership-filter]
  - [Syncing user attributes][ldap-user-attributes]
- [SAML][saml]
  - [Auth0][saml-auth0]
  - [Azure AD][azure-ad]
  - [Google][saml-google]
  - [Keycloak][saml-keycloak]
  - [Okta][saml-okta]

## [API keys](./api-keys)

Create keys to authenticate API calls.

[azure-ad]: ./saml-azure
[google-sign-in]: ./google-and-ldap#enabling-google-sign-in
[jwt]: ./authenticating-with-jwt
[ldap]: ./google-and-ldap#enabling-ldap-authentication
[ldap-group-membership-filter]: ./google-and-ldap#ldap-group-membership-filter
[ldap-user-attributes]: ./google-and-ldap#syncing-user-attributes-with-ldap
[saml-okta]: ./saml-okta
[saml]: ./authenticating-with-saml
[saml-auth0]: ./saml-auth0
[saml-google]: ./saml-google
[saml-keycloak]: ./saml-keycloak
[sso-def]: /glossary/sso

## [Accessibility](./accessibility)

Notes on Metabase's accessibility.
