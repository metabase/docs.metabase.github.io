---
version: v0.52
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: SCIM
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/scim.md'
layout: new-docs
summary: "/api/ee/scim/ endpoints.\n"
---

# SCIM

/api/ee/scim/ endpoints.

## `GET metabase-enterprise.scim.api/api_key`

Fetch the SCIM API key if one exists. Does *not* return an unmasked key, since we don't have access
  to that after it is created.

You must be a superuser to do this.

## `POST metabase-enterprise.scim.api/api_key`

Create a new SCIM API key, or refresh one that already exists. When called for the first time,
  this is equivalent to enabling SCIM.

You must be a superuser to do this.

---

[<< Back to API index](../api-documentation)
