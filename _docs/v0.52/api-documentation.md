---
version: v0.52
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
clojure -M:ee:doc api-documentation
```

## About the Metabase API

- **The API is subject to change.** We rarely change API endpoints, and almost never remove them, but if you write code that relies on the API, there's a chance you might have to update your code in the future.
- **The API isn't versioned.** So don’t expect to stay on a particular version of Metabase in order to use a “stable” API.

## API tutorial

Check out an introduction to the [Metabase API](/learn/administration/metabase-api).

## API keys

Create keys to authenticate programmatic requests to your Metabase. See [API keys](./people-and-groups/api-keys).

## API changelog

For breaking changes, see the API [changelog](./developers-guide/api-changelog).

## API endpoints

_* indicates endpoints used for features available on [paid plans](/pricing)._


- [Action](./api/action)
- [Activity](./api/activity)
- [Advanced config logs*](./api/ee/advanced-config-logs)
- [Advanced permissions application*](./api/ee/advanced-permissions-application)
- [Advanced permissions impersonation*](./api/ee/advanced-permissions-impersonation)
- [Alert](./api/alert)
- [API key](./api/api-key)
- [Audit app user*](./api/ee/audit-app-user)
- [Automagic dashboards](./api/automagic-dashboards)
- [Bookmark](./api/bookmark)
- [Cache](./api/cache)
- [Card](./api/card)
- [Channel](./api/channel)
- [Cloud migration](./api/cloud-migration)
- [Collection](./api/collection)
- [Content verification review*](./api/ee/content-verification-review)
- [Dashboard](./api/dashboard)
- [Database](./api/database)
- [Dataset](./api/dataset)
- [Email](./api/email)
- [Embed](./api/embed)
- [Field](./api/field)
- [GeoJSON](./api/geojson)
- [Google](./api/google)
- [LDAP](./api/ldap)
- [LLM](./api/llm)
- [Login history](./api/login-history)
- [Metabot](./api/metabot)
- [Model index](./api/model-index)
- [Native query snippet](./api/native-query-snippet)
- [Notify](./api/notify)
- [Permissions](./api/permissions)
- [Persist](./api/persist)
- [Premium features](./api/premium-features)
- [Preview embed](./api/preview-embed)
- [Public](./api/public)
- [Pulse](./api/pulse)
- [Query reference validation*](./api/ee/query-reference-validation)
- [Revision](./api/revision)
- [Routes](./api/routes)
- [Sandbox GTAP*](./api/ee/sandbox-gtap)
- [Sandbox table*](./api/ee/sandbox-table)
- [Sandbox user*](./api/ee/sandbox-user)
- [SCIM](./api/scim)
- [Search](./api/search)
- [Segment](./api/segment)
- [Serialization*](./api/ee/serialization)
- [Session](./api/session)
- [Setting](./api/setting)
- [Setup](./api/setup)
- [Slack](./api/slack)
- [SSO*](./api/ee/sso)
- [SSO SAML](./api/sso-saml)
- [Stale](./api/stale)
- [Table](./api/table)
- [Task](./api/task)
- [Tiles](./api/tiles)
- [Timeline](./api/timeline)
- [Timeline event](./api/timeline-event)
- [Upload management*](./api/ee/upload-management)
- [User](./api/user)
- [Util](./api/util)
