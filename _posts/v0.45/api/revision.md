---
version: v0.45
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Revision
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/revision.md'
layout: new-docs
summary: "API endpoints for Revision.\n"
---

# Revision

API endpoints for Revision.

## `GET /api/revision/`

Get revisions of an object.

### PARAMS:

*  **`entity`** value must be one of: `card`, `dashboard`.

*  **`id`** value must be an integer.

## `POST /api/revision/revert`

Revert an object to a prior revision.

### PARAMS:

*  **`entity`** value must be one of: `card`, `dashboard`.

*  **`id`** value must be an integer.

*  **`revision_id`** value must be an integer.

---

[<< Back to API index](../api-documentation)
