---
version: v0.51
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Cloud migration'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/cloud-migration.md'
layout: new-docs
summary: "/api/cloud-migration endpoints.\n  Only one migration should be happening at any given time.\n  But if something weird happens with concurrency, /cancel will\n  cancel all of them. .\n"
---

# Cloud migration

/api/cloud-migration endpoints.
  Only one migration should be happening at any given time.
  But if something weird happens with concurrency, /cancel will
  cancel all of them. .

## `GET /api/cloud-migration/`

Get the latest cloud migration, if any.

You must be a superuser to do this.

## `POST /api/cloud-migration/`

Initiate a new cloud migration.

You must be a superuser to do this.

## `PUT /api/cloud-migration/cancel`

Cancel any ongoing cloud migrations, if any.

You must be a superuser to do this.

---

[<< Back to API index](../api-documentation)
