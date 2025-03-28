---
version: v0.47
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Paid Features'
title: 'Overview of premium features'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/paid-features/overview.md'
layout: new-docs
redirect_from:
    - /v0.47/enterprise-guide/start
---

# Overview of premium features

Metabase's [Enterprise and Pro](/pricing) plans provide additional features that help organizations scale Metabase and deliver self-service internal or embedded analytics.

- **If you're on Metabase Cloud**, your paid features will activate automatically.
- **If you're self-hosting,** you'll need to [activate your license](./activating-the-enterprise-edition).

## Authentication

Paid plans include more ways to authenticate people and manage groups.

- [Authenticating with SAML](../people-and-groups/authenticating-with-saml)
  - [Setting up SAML with Auth0](../people-and-groups/saml-auth0)
  - [Setting up SAML with Azure AD](../people-and-groups/saml-azure)
  - [Setting up SAML with Google](../people-and-groups/saml-google)
  - [Setting up SAML with Keycloak](../people-and-groups/saml-keycloak)
  - [Setting up SAML with Okta](../people-and-groups/saml-okta)
- [Authenticating with JWT](../people-and-groups/authenticating-with-jwt)

## Permissions

Paid plans include more ways to manage permissions, including data sandboxing, which brings row and column-level permissions to Metabase.

- [Data sandboxes](../permissions/data-sandboxes)
- [Block permissions](../permissions/data#block-access)
- [SQL snippet folder permissions](../permissions/snippets)
- [Application permissions](../permissions/application)
- [Download permissions](../permissions/data#download-results)
- [Connection impersonation](../permissions/data#impersonation-access)
- [Database management permissions](../permissions/data#manage-database)
- [Table metadata management permissions](../permissions/data#manage-table-metadata)

## People and group management

- [Group managers](../people-and-groups/managing#group-managers)

## Interactive embedding

You can embed all of Metabase in your app.

- [Embedding the entire Metabase app in your app](../embedding/interactive-embedding)
- [Customizing Metabase's appearance](../configuring-metabase/appearance)

## Dashboard subscription and alert customization

### Custom filter values

Send different groups of people the contents of a dashboard with different filters applied. You only need to maintain one dashboard, which you can use to send results relevant to each subscriber.

- [Customizing filter values for each dashboard subscription](../dashboards/subscriptions)

### Restrict which domains people can send alerts and subscriptions to

As an additional security layer, you can whitelist domains, which restricts people from sending alerts and subscriptions to email addresses that don't use an approved domain.

- [Approved domains for notifications](../configuring-metabase/email#approved-domains-for-notifications)

### Suggest recipients on dashboard subscriptions and alerts

You can also control which recipients Metabase suggests when people create dashboard subscriptions and alert.

- [Recipient suggestion controls](../configuring-metabase/email#suggest-recipients-on-dashboard-subscriptions-and-alerts)

## Content moderation tools

Tools for keeping your Metabase organized, so people can find your most important, verified items.

- [Official collections](../exploration-and-organization/collections#official-collections)
- [Verified items](../exploration-and-organization/exploration#verified-items)

## Advanced caching controls

All Metabase editions include global caching controls. Paid plans includes additional caching options that let you control caching for individual questions.

- [Caching controls for individual questions](../configuring-metabase/caching#caching-per-question)
- [Caching control per database](../configuring-metabase/caching#caching-per-database)

## Auditing

See how people are using your Metabase.

- [Using the audit logs](../usage-and-performance-tools/audit)

## Admin tools

See which queries are failing to help keep your Metabase tidy.

- [Tracking query errors](../usage-and-performance-tools/tools)

## Serialization

You can export Metabase application data and use that to spin up new instances preloaded with questions, dashboards, and collections.

- [Serialization](../installation-and-operation/serialization)

## Configuration file

For self-hosted installations, you can load Metabase from a [configuration file](../configuring-metabase/config-file).

