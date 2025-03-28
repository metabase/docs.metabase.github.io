---
version: v0.50
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Task
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/task.md'
layout: new-docs
summary: "/api/task endpoints.\n"
---

# Task

/api/task endpoints.

## `GET /api/task/`

Fetch a list of recent tasks stored as Task History.

## `GET /api/task/:id`

Get `TaskHistory` entry with ID.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `GET /api/task/info`

Return raw data about all scheduled tasks (i.e., Quartz Jobs and Triggers).

---

[<< Back to API index](../api-documentation)
