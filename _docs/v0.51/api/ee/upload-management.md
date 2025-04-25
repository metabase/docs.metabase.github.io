---
version: v0.51
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Upload management'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/upload-management.md'
layout: new-docs
summary: "API endpoints for Upload management.\n"
---

# Upload management

API endpoints for Upload management.

## `DELETE /api/ee/upload-management/tables/:id`

Delete the uploaded table from the database, optionally archiving cards for which it is the primary source.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

-  **`archive-cards`** nullable value must be a valid boolean string ('true' or 'false').

## `GET /api/ee/upload-management/tables`

Get all `Tables` visible to the current user which were created by uploading a file.

---

[<< Back to API index](../../api-documentation)
