---
version: v0.48
has_magic_breadcrumbs: true
show_category_breadcrumb: false
show_title_breadcrumb: true
category: 'Table of Contents'
title: 'Metabase API documentation'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api-documentation.md'
layout: new-docs
---

# Metabase API documentation

_These reference files were generated from source comments by running:_

```
clojure -M:ee:run api-documentation
```

## About the Metabase API

- **The API is subject to change.** We rarely change API endpoints, and almost never remove them, but if you write code that relies on the API, there's a chance you might have to update your code in the future.
- **The API isn't versioned.** So don’t expect to stay on a particular version of Metabase in order to use a “stable” API.

## API tutorial

Check out an introduction to the [Metabase API](/learn/administration/metabase-api).

## API endpoints

_* indicates endpoints used for features available on [paid plans](/pricing)._


- [Action](api/action)
- [Activity](api/activity)
- [Advanced config logs*](api/ee/advanced-config-logs)
- [Advanced permissions application*](api/ee/advanced-permissions-application)
- [Advanced permissions impersonation*](api/ee/advanced-permissions-impersonation)
- [Alert](api/alert)
- [Audit app user*](api/ee/audit-app-user)
- [Automagic dashboards](api/automagic-dashboards)
- [Bookmark](api/bookmark)
- [Card](api/card)
- [Collection](api/collection)
- [Content verification review*](api/ee/content-verification-review)
- [Dashboard](api/dashboard)
- [Database](api/database)
- [Dataset](api/dataset)
- [Email](api/email)
- [Embed](api/embed)
- [Field](api/field)
- [GeoJSON](api/geojson)
- [Google](api/google)
- [LDAP](api/ldap)
- [Login history](api/login-history)
- [Metabot](api/metabot)
- [Metric](api/metric)
- [Model index](api/model-index)
- [Native query snippet](api/native-query-snippet)
- [Notify](api/notify)
- [Permissions](api/permissions)
- [Persist](api/persist)
- [Premium features](api/premium-features)
- [Preview embed](api/preview-embed)
- [Public](api/public)
- [Pulse](api/pulse)
- [Revision](api/revision)
- [SSO*](api/ee/sso)
- [SSO SAML](api/sso-saml)
- [Sandbox GTAP*](api/ee/sandbox-gtap)
- [Sandbox table*](api/ee/sandbox-table)
- [Sandbox user*](api/ee/sandbox-user)
- [Search](api/search)
- [Segment](api/segment)
- [Session](api/session)
- [Setting](api/setting)
- [Setup](api/setup)
- [Slack](api/slack)
- [Table](api/table)
- [Task](api/task)
- [Tiles](api/tiles)
- [Timeline](api/timeline)
- [Timeline event](api/timeline-event)
- [Transform](api/transform)
- [User](api/user)
- [Util](api/util)
