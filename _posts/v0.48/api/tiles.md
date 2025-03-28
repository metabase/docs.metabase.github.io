---
version: v0.48
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Tiles
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/tiles.md'
layout: new-docs
summary: "`/api/tiles` endpoints.\n"
---

# Tiles

`/api/tiles` endpoints.

## `GET /api/tiles/:zoom/:x/:y/:lat-field/:lon-field`

This endpoints provides an image with the appropriate pins rendered given a MBQL `query` (passed as a GET query
  string param). We evaluate the query and find the set of lat/lon pairs which are relevant and then render the
  appropriate ones. It's expected that to render a full map view several calls will be made to this endpoint in
  parallel.

### PARAMS:

*  **`zoom`** value must be an integer.

*  **`x`** value must be an integer.

*  **`y`** value must be an integer.

*  **`lat-field`** string

*  **`lon-field`** string

*  **`query`** value must be a valid JSON string.

---

[<< Back to API index](../api-documentation)
