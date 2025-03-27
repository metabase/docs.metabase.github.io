---
version: v0.45
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

- **The API is subject to change.** The API is tightly coupled with the front end and is subject to change between releases. The endpoints likely won’t change that much (existing API endpoints are changed infrequently, and removed rarely), but if you write code to use the API, you might have to update it in the future.
- **The API isn't versioned.** Meaning: it can change version to version, so don’t expect to stay on a particular version of Metabase in order to use a “stable” API.

## API tutorial

Check out an introduction to the [Metabase API](/learn/administration/metabase-api).

## API endpoints

_* indicates endpoints used for features available on [paid plans](/pricing)._


- [Action](api/action)
- [Activity](api/activity)
- [Advanced permissions application*](api/ee/advanced-permissions-application)
- [Alert](api/alert)
- [App](api/app)
- [Audit app user*](api/ee/audit-app-user)
- [Automagic dashboards](api/automagic-dashboards)
- [Bookmark](api/bookmark)
- [Card](api/card)
- [Collection](api/collection)
- [Content management review*](api/ee/content-management-review)
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
- [Metric](api/metric)
- [Model action](api/model-action)
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
- [Sandbox GTAP*](api/ee/sandbox-gtap)
- [Sandbox table*](api/ee/sandbox-table)
- [Sandbox user*](api/ee/sandbox-user)
- [Search](api/search)
- [Segment](api/segment)
- [Serialization serialize*](api/ee/serialization-serialize)
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
