---
version: v0.51
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Model index'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/model-index.md'
layout: new-docs
summary: "API endpoints for Model index.\n"
---

# Model index

API endpoints for Model index.

## `DELETE /api/model-index/:id`

Delete ModelIndex.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `GET /api/model-index/`

Retrieve list of ModelIndex.

### PARAMS:

-  **`model_id`** value must be an integer greater than zero.

## `GET /api/model-index/:id`

Retrieve ModelIndex.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `POST /api/model-index/`

Create ModelIndex.

### PARAMS:

-  **`model_id`** value must be an integer greater than zero.

-  **`pk_ref`** anything.

-  **`value_ref`** anything.

-  **`_model-index`**

---

[<< Back to API index](../api-documentation)
