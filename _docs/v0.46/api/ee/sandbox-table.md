---
version: v0.46
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Sandbox table'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/sandbox-table.md'
layout: new-docs
summary: "API endpoints for Sandbox table.\n"
---

# Sandbox table

API endpoints for Sandbox table.

## `GET /api/table/:id/query_metadata`

This endpoint essentially acts as a wrapper for the OSS version of this route. When a user has segmented permissions
  that only gives them access to a subset of columns for a given table, those inaccessable columns should also be
  excluded from what is show in the query builder. When the user has full permissions (or no permissions) this route
  doesn't add/change anything from the OSS version. See the docs on the OSS version of the endpoint for more
  information.

### PARAMS:

*  **`id`** 

*  **`include_sensitive_fields`** value may be nil, or if non-nil, value must be a valid boolean string ('true' or 'false').

*  **`include_hidden_fields`** value may be nil, or if non-nil, value must be a valid boolean string ('true' or 'false').

*  **`include_editable_data_model`** value may be nil, or if non-nil, value must be a valid boolean string ('true' or 'false').

---

[<< Back to API index](../../api-documentation)
