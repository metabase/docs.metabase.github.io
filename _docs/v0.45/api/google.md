---
version: v0.45
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Google
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/google.md'
layout: new-docs
summary: "/api/google endpoints.\n"
---

# Google

/api/google endpoints.

## `PUT /api/google/settings`

Update Google Sign-In related settings. You must be a superuser or have `setting` permission to do this.

### PARAMS:

*  **`google-auth-client-id`** value must be a string.

*  **`google-auth-enabled`** value may be nil, or if non-nil, value must be a boolean.

*  **`google-auth-auto-create-accounts-domain`** value may be nil, or if non-nil, value must be a string.

---

[<< Back to API index](../api-documentation)
