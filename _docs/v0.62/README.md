---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: false
show_title_breadcrumb: true
category: 'Table of Contents'
title: 'Metabase documentation'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/README.md'
layout: new-docs
permalink: /docs/v0.62/index.html
redirect_from:
    - /docs/v0.62/enterprise-guide
    - /docs/v0.62/users-guide
    - /docs/v0.62/administration-guide
    - /docs/v0.62/operations-guide
    - /docs/v0.62/faq
---

# Metabase documentation

![Metabase dashboard](./images/metabase-product-screenshot.png)

Metabase is an open-source business intelligence platform. You can use Metabase to ask questions about your data, or embed Metabase in your app to let your customers explore their data on their own.

## First steps

### Metabase Cloud

The easiest way to get started with Metabase is to sign up for a free trial of [Metabase Cloud](https://store.metabase.com/checkout). You get support, backups, upgrades, an SMTP server, SSL certificate, SoC2 Type 2 security auditing, and more (plus your money goes toward improving Metabase). Check out our quick overview of [cloud vs self-hosting](./cloud/cloud-vs-self-hosting). If you need to, you can always switch to [self-hosting](./installation-and-operation/installing-metabase) Metabase at any time (or vice versa).

### [Installing Metabase](./installation-and-operation/installing-metabase)

Run as a JAR, using Docker, or on [Metabase Cloud](https://store.metabase.com/checkout).

### [Setting up Metabase](./configuring-metabase/setting-up-metabase)

Once installed, set up your Metabase and connect to your data.

### [Getting started](/learn/metabase-basics/getting-started/index)

With your data connected, get started asking questions, creating dashboards, and sharing your work.

### [A tour of Metabase](/learn/metabase-basics/overview/tour-of-metabase)

Metabase is a deep product with a lot of tools to simplify business intelligence, from embeddable charts and interactive dashboards, to GUI and SQL editors, to auditing and row and column security, and more.

## Documentation topics

Metabase's reference documentation.

### Installation

- [Installation overview](./installation-and-operation/start)
- [Installing Metabase](./installation-and-operation/installing-metabase)
- [Upgrading Metabase](./installation-and-operation/upgrading-metabase)
- [Configuring the Metabase application database](./installation-and-operation/configuring-application-database)
- [Backing up Metabase](./installation-and-operation/backing-up-metabase-application-data)
- [Migrating to a production application database](./installation-and-operation/migrating-from-h2)
- [Monitoring your Metabase](./installation-and-operation/monitoring-metabase)
- [Development instances](./installation-and-operation/development-instance)
- [Serialization](./installation-and-operation/serialization)
- [Remote sync](./installation-and-operation/remote-sync)
- [Commands](./installation-and-operation/commands)
- [Supported browsers](./installation-and-operation/supported-browsers)
- [Privacy](./installation-and-operation/privacy)
- [About the anonymous usage data we collect](./installation-and-operation/information-collection)

### Databases

- [Databases overview](./databases/start)
- [Adding and managing databases](./databases/connecting)
- [Database users, roles, and privileges](./databases/users-roles-privileges)
- [Syncing and scanning databases](./databases/sync-scan)
- [Encrypting your database connection](./databases/encrypting-details-at-rest)
- [SSH tunneling](./databases/ssh-tunnel)
- [SSL certificate](./databases/ssl-certificates)
- [Uploading data](./databases/uploads)

### Questions

- [Questions overview](./questions/start)
- [Alerts](./questions/alerts)
- [Exporting data](./questions/exporting-results)

#### Query builder

- [The query editor](./questions/query-builder/editor)
- [Filtering](./questions/query-builder/filters)
- [Summarizing and grouping](./questions/query-builder/summarizing-and-grouping)
- [Custom expressions](./questions/query-builder/expressions)
- [List of expressions](./questions/query-builder/expressions-list)
- [Joining data](./questions/query-builder/join)

#### SQL and native queries

- [The SQL editor](./questions/native-editor/writing-sql)
- [SQL parameters](./questions/native-editor/sql-parameters)
- [Table variables](./questions/native-editor/table-variables)
- [Referencing models and saved questions](./questions/native-editor/referencing-saved-questions-in-queries)
- [Snippets](./questions/native-editor/snippets)
- [Snippet folder permissions](./permissions/snippets)

#### Visualizing data

- [Visualizing data](./questions/visualizations/visualizing-results)
- [Box plots](./questions/visualizations/box-plot)
- [Combo charts](./questions/visualizations/combo-chart)
- [Detail](./questions/visualizations/detail)
- [Funnel charts](./questions/visualizations/funnel)
- [Gauge charts](./questions/visualizations/gauge)
- [Line, bar, and area charts](./questions/visualizations/line-bar-and-area-charts)
- [Maps](./questions/visualizations/map)
- [Numbers](./questions/visualizations/numbers)
- [Pie or donut charts](./questions/visualizations/pie-or-donut-chart)
- [Pivot table](./questions/visualizations/pivot-table)
- [Progress bar](./questions/visualizations/progress-bar)
- [Sankey chart](./questions/visualizations/sankey)
- [Scatterplot or bubble chart](./questions/visualizations/scatterplot-or-bubble-chart)
- [Table](./questions/visualizations/table)
- [Tooltips](./questions/visualizations/tooltips)
- [Trend](./questions/visualizations/trend)
- [Waterfall chart](./questions/visualizations/waterfall-chart)

### Dashboards

- [Dashboards overview](./dashboards/start)
- [Introduction to dashboards](./dashboards/introduction)
- [Dashboard filters](./dashboards/filters)
- [Interactive dashboards](./dashboards/interactive)
- [Charts with multiple series](./dashboards/multiple-series)
- [Dashboard subscriptions](./dashboards/subscriptions)
- [Actions on dashboards](./dashboards/actions)

### Documents

- [Introduction to documents](./documents/introduction)

### Data modeling

- [Data modeling overview](./data-modeling/start)
- [Models](./data-modeling/models)
- [Model persistence](./data-modeling/model-persistence)
- [Metrics](./data-modeling/metrics)
- [Table metadata admin settings](./data-modeling/metadata-editing)
- [Field types](./data-modeling/semantic-types)
- [Formatting defaults](./data-modeling/formatting)
- [Working with JSON](./data-modeling/json-unfolding)
- [Segments](./data-modeling/segments)

### Actions

- [Actions overview](./actions/start)
- [Introduction to actions](./actions/introduction)
- [Basic actions](./actions/basic)
- [Custom actions](./actions/custom)

### AI

- [AI overview](./ai/start)
- [Metabot](./ai/metabot)
- [AI settings](./ai/settings)
- [AI usage controls](./ai/usage-controls)
- [AI usage auditing](./ai/usage-auditing)
- [AI customization](./ai/customization)
- [AI system prompts](./ai/system-prompts)
- [Agent API](./ai/agent-api)
- [MCP server](./ai/mcp)
- [Metabot in Slack](./ai/metabot-slack)
- [AI privacy](./ai/privacy)

### Exploration and organization

- [Organization overview](./exploration-and-organization/start)
- [Basic exploration](./exploration-and-organization/exploration)
- [Collections](./exploration-and-organization/collections)
- [Keyboard shortcuts](./exploration-and-organization/keyboard-shortcuts)
- [History](./exploration-and-organization/history)
- [Trash](./exploration-and-organization/delete-and-restore)
- [Data reference](./exploration-and-organization/data-model-reference)
- [Events and timelines](./exploration-and-organization/events-and-timelines)
- [X-rays](./exploration-and-organization/x-rays)
- [Content verification](./exploration-and-organization/content-verification)

### People

- [People overview](./people-and-groups/start)
- [Account settings](./people-and-groups/account-settings)
- [Managing people and groups](./people-and-groups/managing)
- [Password complexity](./people-and-groups/changing-password-complexity)
- [Session expiration](./people-and-groups/changing-session-expiration)
- [Google Sign-In](./people-and-groups/google-sign-in)
- [LDAP](./people-and-groups/ldap)
- [API keys](./people-and-groups/api-keys)

#### Paid SSO options

- [JWT-based authentication](./people-and-groups/authenticating-with-jwt)
- [OIDC-based authentication](./people-and-groups/authenticating-with-oidc)
  - [OIDC with Keycloak](./people-and-groups/oidc-keycloak)
- [SAML-based authentication](./people-and-groups/authenticating-with-saml)
  - [SAML with Auth0](./people-and-groups/saml-auth0)
  - [SAML with Microsoft Entra ID](./people-and-groups/saml-azure)
  - [SAML with Google](./people-and-groups/saml-google)
  - [SAML with Keycloak](./people-and-groups/saml-keycloak)
  - [SAML with Okta](./people-and-groups/saml-okta)
- [User provisioning with SCIM](./people-and-groups/user-provisioning)

### Permissions

- [Permissions overview](./permissions/start)
- [Permissions introduction](./permissions/introduction)
- [Data permissions](./permissions/data)
- [Collection permissions](./permissions/collections)
- [Application permissions](./permissions/application)
- [Row and column security](./permissions/row-and-column-security)
- [Row and column security examples](./permissions/row-and-column-security-examples)
- [Connection impersonation](./permissions/impersonation)
- [Database routing](./permissions/database-routing)
- [Snippets folder permissions](./permissions/snippets)
- [Notification permissions](./permissions/notifications)
- [Configuring permissions for embedding](./permissions/embedding)

### Embedding

- [Embedding overview](./embedding/start)
- [Embedding introduction](./embedding/introduction)
- Modular embedding
  - [SSO](./embedding/modular-embedding)
  - [Guest](./embedding/guest-embedding)
  - [SDK](./embedding/sdk/introduction)
- [Full app embedding](./embedding/full-app-embedding)
- [Securing embeds](./embedding/securing-embeds)
- [AI agent resources](./embedding/ai-agent-resources)

### Configuration

- [Configuration overview](./configuring-metabase/start)
- [Setting up Metabase](./configuring-metabase/setting-up-metabase)
- [General settings](./configuring-metabase/settings)
- [Email](./configuring-metabase/email)
- [Slack](./configuring-metabase/slack)
- [Webhooks](./configuring-metabase/webhooks)
- [Environment variables](./configuring-metabase/environment-variables)
- [Configuration file](./configuring-metabase/config-file)
- [Metabase log configuration](./configuring-metabase/log-configuration)
- [Timezones](./configuring-metabase/timezones)
- [Languages and localization](./configuring-metabase/localization)
- [Appearance](./configuring-metabase/appearance)
- [Caching query results](./configuring-metabase/caching)
- [Custom maps](./configuring-metabase/custom-maps)
- [Customizing the Metabase Jetty webserver](./configuring-metabase/customizing-jetty-webserver)

### Tools

- [Tools overview](./usage-and-performance-tools/start)
- [Usage analytics](./usage-and-performance-tools/usage-analytics)
- [Admin tools](./usage-and-performance-tools/tools)

### Metabase Cloud

- [Documentation for Metabase Cloud and Store](./cloud/start)

### Metabase API

- [Metabase API documentation](./api)
- [API tutorial](/learn/metabase-basics/administration/administration-and-operation/metabase-api)

### Troubleshooting

- [Troubleshooting guides](./troubleshooting-guide/index)

### Developer guide

- [Developer guide](./developers-guide/start)

## Getting help

### Troubleshooting

- [Troubleshooting guides](troubleshooting-guide/index)
- [Metabase forum](https://discourse.metabase.com/)
- [Configuring logging](./configuring-metabase/log-configuration)

### Tutorials and guides

[Learn Metabase](/learn) has a ton of articles on how to use Metabase, data best practices, and more.

## More resources

### [Discussion](https://discourse.metabase.com)

Share and connect with other Metabasers.

### [Community stories](/community)

Practical advice from our community.

### [Metabase blog](/blog)

News, updates, and ideas.

### [Customers](/case-studies)

Real companies, real data, real stories.

### [Metabase Twitter](https://twitter.com/metabase)

We tweet stuff.

### [Source code repository on GitHub](https://github.com/metabase/metabase)

Follow us on GitHub.

### [List of releases](https://github.com/metabase/metabase/releases)

A list of all Metabase releases, including both the Enterprise Edition and the Open Source Edition.

### [Developers guide](./developers-guide/start)

Contribute to the Metabase open source project!

### [Data and Business Intelligence Glossary](/glossary)

Data jargon explained.

### [Metabase Experts](/partners/)

If you’d like more technical resources to set up your data stack with Metabase, connect with a [Metabase Expert](/partners/).

<!-- bump 2 -->
