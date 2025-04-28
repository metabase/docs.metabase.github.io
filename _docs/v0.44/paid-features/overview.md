---
version: v0.44
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Paid Features'
title: 'Overview of premium features'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/paid-features/overview.md'
layout: new-docs
redirect_from:
    - /docs/v0.44/enterprise-guide/start
---

# Overview of premium features

Metabase's [Enterprise and Pro][pricing] plans provide additional features that help organizations scale Metabase and deliver self-service, embedded analytics.

## Setting up

Metabase Pro is hosted, so you should already be setup with all the paid features, but you may have to activate a Metabase Enterprise edition to access all the features.

- [Getting and activating the Enterprise edition](activating-the-enterprise-edition)

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

## Embedding

You can embed all of Metabase in your app.

- [Embedding the entire Metabase app in your app](../embedding/full-app-embedding)
- [Customizing Metabase's appearance](../configuring-metabase/appearance)

## Dashboard subscription customization

Send different groups of people the contents of the dashboard with different filters applied. You only need to maintain one dashboard, which you can use to send results relevant to each subscriber.

- [Customizing filter values for each dashboard subscription](../dashboards/subscriptions)

## Official collections

You can mark certain collections as [official](../exploration-and-organization/collections#official-collections), which helps people find your most important questions, dashboards, and models.

## Question moderation

People can ask administrators to verify their questions.

- [Question moderation](../questions/sharing/answers#question-moderation)

## Advanced caching controls

All Metabase editions include global caching controls. Paid plans includes additional caching options that let you control caching for individual questions.

- [Caching controls for individual questions](../questions/sharing/answers#caching-results)

## Auditing

See how people are using your Metabase.

- [Using the audit logs](../usage-and-performance-tools/audit)

## Admin tools

See which queries are failing to help keep your Metabase tidy.

- [Tracking query errors](../usage-and-performance-tools/tools)

## Serialization

You can export Metabase application data and use that to spin up new instances preloaded with questions, dashboards, and collections.

- [Serialization](../installation-and-operation/serialization)

[pricing]: /pricing
