---
version: v0.49
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

-  **`entity`** enum of card, dashboard.

-  **`id`** value must be an integer greater than zero.

## `POST /api/revision/revert`

Revert an object to a prior revision.

### PARAMS:

-  **`entity`** enum of card, dashboard.

-  **`id`** value must be an integer greater than zero.

-  **`revision_id`** value must be an integer greater than zero.

---

[<< Back to API index](../api-documentation)
