---
version: v0.44
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Persist
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/persist.md'
layout: new-docs
summary: "API endpoints for Persist.\n"
---

# Persist

API endpoints for Persist.

## `GET /api/persist/`

List the entries of [[PersistedInfo]] in order to show a status page.

## `GET /api/persist/:persisted-info-id`

Fetch a particular [[PersistedInfo]] by id.

### PARAMS:

*  **`persisted-info-id`** value may be nil, or if non-nil, value must be an integer greater than zero.

## `GET /api/persist/card/:card-id`

Fetch a particular [[PersistedInfo]] by card-id.

### PARAMS:

*  **`card-id`** value may be nil, or if non-nil, value must be an integer greater than zero.

## `POST /api/persist/disable`

Disable global setting to allow databases to persist models. This will remove all tasks to refresh tables, remove
  that option from databases which might have it enabled, and delete all cached tables.

## `POST /api/persist/enable`

Enable global setting to allow databases to persist models.

## `POST /api/persist/set-refresh-schedule`

Set the cron schedule to refresh persisted models.
   Shape should be JSON like {cron: "0 30 1/8 * * ? *"}.

### PARAMS:

*  **`cron`** Value must be a string representing a cron schedule of format <seconds> <minutes> <hours> <day of month> <month> <day of week> <year>

*  **`_body`**

---

[<< Back to API index](../api-documentation)
