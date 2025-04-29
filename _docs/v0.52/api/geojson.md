---
version: v0.52
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: GeoJSON
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/geojson.md'
layout: new-docs
summary: "API endpoints for GeoJSON.\n"
---

# GeoJSON

API endpoints for GeoJSON.

## `GET /api/geojson/`

Load a custom GeoJSON file based on a URL or file path provided as a query parameter.
  This behaves similarly to /api/geojson/:key but doesn't require the custom map to be saved to the DB first.

### PARAMS:

-  **`url`** value must be a non-blank string.

-  **`respond`** 

-  **`raise`**

## `GET /api/geojson/:key`

Fetch a custom GeoJSON file as defined in the `custom-geojson` setting. (This just acts as a simple proxy for the
  file specified for `key`).

### PARAMS:

-  **`key`** value must be a non-blank string.

-  **`respond`** 

-  **`raise`**

---

[<< Back to API index](../api-documentation)
