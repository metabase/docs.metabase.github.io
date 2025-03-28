---
version: v0.43
has_magic_breadcrumbs: true
show_category_breadcrumb: false
show_title_breadcrumb: true
category: 'Table of Contents'
title: 'API Documentation'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api-documentation.md'
layout: docs
---

# Metabase API documentation

_These reference files were generated from source comments by running `clojure -M:ee:run api-documentation`_.

## About the Metabase API

- **The API is subject to change.** The API is tightly coupled with the front end and is subject to change between releases. The endpoints likely won’t change that much (existing API endpoints are changed infrequently, and removed rarely), but if you write code to use the API, you might have to update it in the future.
- **The API isn't versioned.** Meaning: it can change version to version, so don’t expect to stay on a particular version of Metabase in order to use a “stable” API.

## API tutorial

Check out an introduction to the [Metabase API](https://www.metabase.com/learn/administration/metabase-api.html).

## API endpoints

_* indicates endpoints used for features available on [paid plans](https://www.metabase.com/pricing/)._


- [Activity](api/activity.html)
- [Advanced permissions application*](api/ee/advanced-permissions-application.html)
- [Alert](api/alert.html)
- [Audit app user*](api/ee/audit-app-user.html)
- [Automagic dashboards](api/automagic-dashboards.html)
- [Bookmark](api/bookmark.html)
- [Card](api/card.html)
- [Collection](api/collection.html)
- [Content management review*](api/ee/content-management-review.html)
- [Dashboard](api/dashboard.html)
- [Database](api/database.html)
- [Dataset](api/dataset.html)
- [Email](api/email.html)
- [Embed](api/embed.html)
- [Field](api/field.html)
- [GeoJSON](api/geojson.html)
- [LDAP](api/ldap.html)
- [Login history](api/login-history.html)
- [Metric](api/metric.html)
- [Native query snippet](api/native-query-snippet.html)
- [Notify](api/notify.html)
- [Permissions](api/permissions.html)
- [Premium features](api/premium-features.html)
- [Preview embed](api/preview-embed.html)
- [Public](api/public.html)
- [Pulse](api/pulse.html)
- [Revision](api/revision.html)
- [SSO*](api/ee/sso.html)
- [Sandbox GTAP*](api/ee/sandbox-gtap.html)
- [Sandbox table*](api/ee/sandbox-table.html)
- [Sandbox user*](api/ee/sandbox-user.html)
- [Search](api/search.html)
- [Segment](api/segment.html)
- [Session](api/session.html)
- [Setting](api/setting.html)
- [Setup](api/setup.html)
- [Slack](api/slack.html)
- [Table](api/table.html)
- [Task](api/task.html)
- [Tiles](api/tiles.html)
- [Timeline](api/timeline.html)
- [Timeline event](api/timeline-event.html)
- [Transform](api/transform.html)
- [User](api/user.html)
- [Util](api/util.html)