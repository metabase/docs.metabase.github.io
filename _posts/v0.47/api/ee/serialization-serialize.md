---
version: v0.47
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Serialization serialize'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/serialization-serialize.md'
layout: new-docs
summary: "/api/ee/serialization/serialize endpoints.\n"
---

# Serialization serialize

/api/ee/serialization/serialize endpoints.

## `POST /api/ee/serialization/serialize/data-model`

This endpoint should serialize: the data model, settings.yaml, and all the selected Collections

  The data model should only change if the user triggers a manual sync or scan (since the scheduler is turned off)

  The user will need to add somewhere (probably in the admin panel):

  - A path (maybe we can assume it will always dump to the same path as the Metabase jar, but we probably want to let
    them define the path)

  - The collections that they want to serialize (using selective serialization).

### PARAMS:

*  **`collection_ids`** Non-empty, distinct array of Collection IDs

*  **`path`** Valid directory to serialize results to

---

[<< Back to API index](../../api-documentation)
