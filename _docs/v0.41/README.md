---
version: v0.41
has_magic_breadcrumbs: true
show_category_breadcrumb: false
show_title_breadcrumb: true
category: 'Table of Contents'
title: README
source_url: 'https://github.com/metabase/metabase/blob/master/docs/README.md'
permalink: /docs/v0.41/index.html
---

## Getting started

- [Getting started][getting-started]
- [A tour of Metabase][tour]

## Troubleshooting and getting help

- [Troubleshooting guides][troubleshooting] 
- [Metabase forum][forum]. 
- [Configuring logging](./operations-guide/log-configuration)

## Tutorials and guides

- [Learn Metabase][learn] has a ton of articles on how to use Metabase and level up as a data analyst.

## Installation and operation

- [Installing Metabase](./operations-guide/installing-metabase)
- [Setting up Metabase](setting-up-metabase)
- [How to upgrade Metabase](./operations-guide/upgrading-metabase)
- [Application database](./operations-guide/configuring-application-database)
- [Backing up Metabase](./operations-guide/backing-up-metabase-application-data)
- [Migrating to a production application database](./operations-guide/migrating-from-h2)
- [Running database migrations manually](./operations-guide/running-migrations-manually)
- [A word on Java versions](./operations-guide/java-versions)
- [How to setup monitoring via JMX](./operations-guide/jmx-monitoring)
- [Serialization: copying one Metabase instance to another](./enterprise-guide/serialization)

## Asking questions

### Query builder

- [Simple questions](./users-guide/04-asking-questions)
- [Custom questions](./users-guide/custom-questions)
- [Custom expressions](./users-guide/expressions)
- [List of expressions: aggregations and functions](./users-guide/expressions-list)
- [Visualizing data](./users-guide/05-visualizing-results)
- [Using results to ask new questions](./users-guide/referencing-saved-questions-in-queries)

### SQL and native queries

- [The native SQL editor](./users-guide/writing-sql)
- [Viewing metadata](./users-guide/12-data-model-reference)
- [SQL templates](./users-guide/13-sql-parameters)
- [SQL snippets](./users-guide/sql-snippets)

### Alerts and Metabot

- [Setting and getting alerts](./users-guide/15-alerts)
- [Get answers in Slack with Metabot](./users-guide/11-metabot)

## Dashboards

- [Creating dashboards](./users-guide/07-dashboards)
- [Dashboard filters](./users-guide/08-dashboard-filters)
- [Interactive dashboards](./users-guide/interactive-dashboards)
- [Dashboard charts with multiple series](./users-guide/09-multi-series-charting)
- [Setting up dashboard subscriptions](./users-guide/dashboard-subscriptions)

## Collections

- [Sharing and organizing your saved questions](./users-guide/06-sharing-answers)
- [Collections](./users-guide/collections)

## People and groups

- [Editing your account settings](./users-guide/account-settings)
- [Managing people and groups](./administration-guide/04-managing-users)
- [Google Sign-In or LDAP](./administration-guide/10-single-sign-on)
- [SAML](./enterprise-guide/authenticating-with-saml)
- [JWT](./enterprise-guide/authenticating-with-jwt)
- [Password complexity](./operations-guide/changing-password-complexity)
- [Session expiration](./operations-guide/changing-session-expiration)

## Permissions

- [Data permissions](./administration-guide/05-setting-permissions)
- [Collection permissions](./administration-guide/06-collections)
- [Sandboxing data based on user attributes](./enterprise-guide/data-sandboxes)
- [SQL snippets folder permissions](./enterprise-guide/sql-snippets)

## Embedding questions and dashboards

- [Public links for dashboards and questions](./administration-guide/12-public-links)
- [Embedding Metabase in other applications](./administration-guide/13-embedding)
- [Embedding the entire Metabase app in your own web app](./enterprise-guide/full-app-embedding)
- [Embedding example apps][embedding-ref-apps]
- [White labeling charts (branding)](./enterprise-guide/whitelabeling)

## Databases

- [Adding data sources](./administration-guide/01-managing-databases)
- [Encrypting your database connection](./operations-guide/encrypting-database-details-at-rest)
- [Editing your database metadata](./administration-guide/03-metadata-editing)
- [Creating segments and metrics](./administration-guide/07-segments-and-metrics)
- [SSH tunneling](./administration-guide/ssh-tunnel-for-database-connections)
- [SSL certificate](./administration-guide/secure-database-connections-with-ssl-certificates)

## Configuring Metabase

- [Settings](./administration-guide/08-configuration-settings)
- [Email](./administration-guide/02-setting-up-email)
- [Slack](./administration-guide/09-setting-up-slack)
- [Environment variables](./operations-guide/environment-variables)
- [Handling timezones](./operations-guide/handling-timezones)
- [Customizing the Metabase Jetty Webserver](./operations-guide/customizing-jetty-webserver)
- [Default formatting](./administration-guide/19-formatting-settings)
- [Localization](./administration-guide/localization)
- [Caching query results](./administration-guide/14-caching)
- [Custom map settings](./administration-guide/20-custom-maps)

## Usage and performance tools

- [Auditing tools](./enterprise-guide/audit)
- [Tracking query errors](./enterprise-guide/tools)

## Metabase API

- [API reference][api-documentation]
- [API tutorial][api-tutorial]

## Enterprise and Pro editions

- [Getting and activating the Enterprise edition](./enterprise-guide/activating-the-enterprise-edition)
- [List of premium features][enterprise]

## Metabase community

- [Metabase forum][forum]
- [Data Bytes][data-bytes]
- [Case studies][case-studies]
- [Blog][blog]
- [Source code repository on GitHub][source-code]

## Documentation guides

- [Users guide](users-guide/start)
- [Admin guide](administration-guide/start)
- [Operations guide](operations-guide/start)
- [Troubleshooting guide][troubleshooting] 
- [Developers guide][developers]

## Reference

- [Anonymous Information Collection Reference][info-collection]
- [FAQs][faq]
- [Glossary][glossary]

[api-documentation]: ./api-documentation
[api-tutorial]: /learn/administration/metabase-api
[admin-guide]: administration-guide/start
[blog]: /blog
[case-studies]: /case_studies/
[embedding-ref-apps]: https://github.com/metabase/embedding-reference-apps
[enterprise]: enterprise-guide/start
[enterprise-landing]: /enterprise
[data-bytes]: /community
[developers]: developers-guide/start
[drivers]: developers-guide-drivers
[faq]: faq/start
[forum]: https://discourse.metabase.com/
[getting-started]: /learn/getting-started/getting-started
[glossary]: /glossary
[info-collection]: information-collection
[learn]: /learn
[operations-guide]: operations-guide/start
[source-code]: https://github.com/metabase/metabase
[tour]: /learn/getting-started/tour-of-metabase
[troubleshooting]: troubleshooting-guide/index
[users-guide]: users-guide/start
