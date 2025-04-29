---
version: v0.52
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Alert
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/alert.md'
layout: new-docs
summary: "/api/alert endpoints.\n\n  Deprecated: will soon be migrated to notification APIs.\n"
---

# Alert

/api/alert endpoints.

  Deprecated: will soon be migrated to notification APIs.

## `DELETE /api/alert/:id/subscription`

For users to unsubscribe themselves from the given alert.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `GET /api/alert/`

Fetch alerts which the current user has created or will receive, or all alerts if the user is an admin.
  The optional `user_id` will return alerts created by the corresponding user, but is ignored for non-admin users.

### PARAMS:

-  **`archived`** nullable value must be a valid boolean string ('true' or 'false').

-  **`user_id`** nullable value must be an integer greater than zero.

## `GET /api/alert/:id`

Fetch an alert by ID.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

## `GET /api/alert/question/:id`

Fetch all alerts for the given question (`Card`) id.

### PARAMS:

-  **`id`** nullable value must be an integer greater than zero.

-  **`archived`** nullable value must be a valid boolean string ('true' or 'false').

## `POST /api/alert/`

Create a new Alert.

### PARAMS:

-  **`alert_condition`** enum of rows, goal.

-  **`card`** value must be a map with the keys `id`, `include_csv`, `include_xls`, and `dashboard_card_id`.

-  **`channels`** one or more map.

-  **`alert_first_only`** boolean.

-  **`alert_above_goal`** nullable boolean.

-  **`new-alert-request-body`**

## `PUT /api/alert/:id`

Update a `Alert` with ID.

### PARAMS:

-  **`id`** value must be an integer greater than zero.

-  **`alert_condition`** nullable enum of rows, goal.

-  **`alert_first_only`** nullable boolean.

-  **`alert_above_goal`** nullable boolean.

-  **`card`** nullable value must be a map with the keys `id`, `include_csv`, `include_xls`, and `dashboard_card_id`.

-  **`channels`** nullable one or more map.

-  **`archived`** nullable boolean.

-  **`alert-updates`**

---

[<< Back to API index](../api-documentation)
