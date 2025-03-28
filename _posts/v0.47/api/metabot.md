---
version: v0.47
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Metabot
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/metabot.md'
layout: new-docs
summary: "These Metabot endpoints are for an experimental feature.\n"
---

# Metabot

These Metabot endpoints are for an experimental feature.

## `POST /api/metabot/database/:database-id`

Ask Metabot to generate a native question given a prompt about a given database.

### PARAMS:

*  **`database-id`** value must be an integer greater than zero.

*  **`question`** value must be a non-blank string.

## `POST /api/metabot/database/:database-id/query`

Ask Metabot to generate a SQL query given a prompt about a given database.

### PARAMS:

*  **`database-id`** value must be an integer greater than zero.

*  **`question`** value must be a non-blank string.

## `POST /api/metabot/feedback`

Record feedback on metabot results.

### PARAMS:

*  **`feedback`**

## `POST /api/metabot/model/:model-id`

Ask Metabot to generate a SQL query given a prompt about a given model.

### PARAMS:

*  **`model-id`** value must be an integer greater than zero.

*  **`question`** value must be a non-blank string.

---

[<< Back to API index](../api-documentation)
