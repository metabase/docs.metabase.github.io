---
version: v0.51
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Advanced permissions application'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/advanced-permissions-application.md'
layout: new-docs
summary: "`/advanced-permisisons/application` Routes.\n  Implements the Permissions routes needed for application permission - a class of permissions that control access to features\n  like access Setting pages, access monitoring tools ... etc.\n"
---

# Advanced permissions application

`/advanced-permisisons/application` Routes.
  Implements the Permissions routes needed for application permission - a class of permissions that control access to features
  like access Setting pages, access monitoring tools ... etc.

## `GET /api/ee/advanced-permissions/application/graph`

Fetch a graph of Application Permissions.

You must be a superuser to do this.

## `PUT /api/ee/advanced-permissions/application/graph`

Do a batch update of Application Permissions by passing a modified graph.

You must be a superuser to do this.

### PARAMS:

-  **`skip-graph`** nullable value must be a valid boolean string ('true' or 'false').

-  **`force`** nullable value must be a valid boolean string ('true' or 'false').

-  **`body`** map.

---

[<< Back to API index](../../api-documentation)
