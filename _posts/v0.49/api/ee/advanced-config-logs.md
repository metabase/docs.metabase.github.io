---
version: v0.49
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Advanced config logs'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/advanced-config-logs.md'
layout: new-docs
summary: "/api/logs endpoints.\n\n  These endpoints are meant to be used by admins to download logs before entries are auto-removed after the day limit.\n\n  For example, the `query_execution` table will have entries removed after 30 days by default, and admins may wish to\n  keep logs externally for longer than this retention period.\n"
---

# Advanced config logs

/api/logs endpoints.

  These endpoints are meant to be used by admins to download logs before entries are auto-removed after the day limit.

  For example, the `query_execution` table will have entries removed after 30 days by default, and admins may wish to
  keep logs externally for longer than this retention period.

## `GET /api/ee/logs/query_execution/:yyyy-mm`

Fetch rows for the month specified by `:yyyy-mm` from the query_execution logs table.
  Must be a superuser.

### PARAMS:

-  **`yyyy-mm`** Must be a string like 2020-04 or 2222-11.

---

[<< Back to API index](../../api-documentation)
