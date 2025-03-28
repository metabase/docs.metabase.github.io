---
version: v0.47
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Audit app user'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/audit-app-user.md'
layout: new-docs
summary: "`/api/ee/audit-app/user` endpoints. These only work if you have a premium token with the `:audit-app` feature.\n"
---

# Audit app user

`/api/ee/audit-app/user` endpoints. These only work if you have a premium token with the `:audit-app` feature.

## `DELETE /api/ee/audit-app/user/:id/subscriptions`

Delete all Alert and DashboardSubscription subscriptions for a User (i.e., so they will no longer receive them).
  Archive all Alerts and DashboardSubscriptions created by the User. Only allowed for admins or for the current user.

### PARAMS:

*  **`id`**

---

[<< Back to API index](../../api-documentation)
