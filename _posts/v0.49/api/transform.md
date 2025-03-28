---
version: v0.49
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Transform
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/transform.md'
layout: new-docs
summary: "API endpoints for Transform.\n"
---

# Transform

API endpoints for Transform.

## `GET /api/transform/:db-id/:schema/:transform-name`

Look up a database schema transform.

### PARAMS:

-  **`db-id`** value must be an integer greater than zero.

-  **`schema`** value must be a non-blank string.

-  **`transform-name`** value must be a non-blank string.

---

[<< Back to API index](../api-documentation)
