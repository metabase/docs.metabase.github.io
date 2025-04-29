---
version: v0.51
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Channel
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/channel.md'
layout: new-docs
summary: "/api/channel endpoints.\n\n  Currently only used for http channels.\n"
---

# Channel

/api/channel endpoints.

  Currently only used for http channels.

## `GET /api/channel/`

Get all channels.

### PARAMS:

-  **`include_inactive`** nullable boolean.

## `GET /api/channel/:id`

Get a channel.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `POST /api/channel/`

Create a channel.

### PARAMS:

-  **`name`** value must be a non-blank string.

-  **`description`** nullable value must be a non-blank string.

-  **`type`** Must be a namespaced channel. E.g: channel/http.

-  **`active`** nullable boolean.

-  **`details`** map.

## `POST /api/channel/test`

Test a channel connection.

### PARAMS:

-  **`type`** Must be a namespaced channel. E.g: channel/http.

-  **`details`** map.

## `PUT /api/channel/:id`

Update a channel.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

-  **`name`** nullable value must be a non-blank string.

-  **`type`** nullable Must be a namespaced channel. E.g: channel/http.

-  **`description`** nullable value must be a non-blank string.

-  **`details`** nullable map.

-  **`active`** nullable boolean.

---

[<< Back to API index](../api-documentation)
