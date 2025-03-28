---
version: v0.44
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Timeline
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/timeline.md'
layout: new-docs
summary: "/api/timeline endpoints.\n"
---

# Timeline

/api/timeline endpoints.

## `DELETE /api/timeline/:id`

Delete a [[Timeline]]. Will cascade delete its events as well.

### PARAMS:

*  **`id`**

## `GET /api/timeline/`

Fetch a list of [[Timelines]]. Can include `archived=true` to return archived timelines.

### PARAMS:

*  **`include`** value may be nil, or if non-nil, value must be one of: `events`.

*  **`archived`** value may be nil, or if non-nil, value must be a valid boolean string ('true' or 'false').

## `GET /api/timeline/:id`

Fetch the [[Timeline]] with `id`. Include `include=events` to unarchived events included on the timeline. Add
  `archived=true` to return all events on the timeline, both archived and unarchived.

### PARAMS:

*  **`id`** 

*  **`include`** value may be nil, or if non-nil, value must be one of: `events`.

*  **`archived`** value may be nil, or if non-nil, value must be a valid boolean string ('true' or 'false').

*  **`start`** value may be nil, or if non-nil, value must be a valid date string

*  **`end`** value may be nil, or if non-nil, value must be a valid date string

## `POST /api/timeline/`

Create a new [[Timeline]].

### PARAMS:

*  **`name`** value must be a non-blank string.

*  **`default`** value may be nil, or if non-nil, value must be a boolean.

*  **`description`** value may be nil, or if non-nil, value must be a string.

*  **`icon`** value may be nil, or if non-nil, value must be one of: `balloons`, `bell`, `cloud`, `mail`, `star`, `warning`.

*  **`collection_id`** value may be nil, or if non-nil, value must be an integer greater than zero.

*  **`archived`** value may be nil, or if non-nil, value must be a boolean.

## `PUT /api/timeline/:id`

Update the [[Timeline]] with `id`. Returns the timeline without events. Archiving a timeline will archive all of the
  events in that timeline.

### PARAMS:

*  **`id`** 

*  **`name`** value may be nil, or if non-nil, value must be a non-blank string.

*  **`default`** value may be nil, or if non-nil, value must be a boolean.

*  **`description`** value may be nil, or if non-nil, value must be a string.

*  **`icon`** value may be nil, or if non-nil, value must be one of: `balloons`, `bell`, `cloud`, `mail`, `star`, `warning`.

*  **`collection_id`** value may be nil, or if non-nil, value must be an integer greater than zero.

*  **`archived`** value may be nil, or if non-nil, value must be a boolean.

*  **`timeline-updates`**

---

[<< Back to API index](../api-documentation)
