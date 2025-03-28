---
version: v0.45
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: Email
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/email.md'
layout: new-docs
summary: "/api/email endpoints.\n"
---

# Email

/api/email endpoints.

## `DELETE /api/email/`

Clear all email related settings. You must be a superuser or have `setting` permission to do this.

## `POST /api/email/test`

Send a test email using the SMTP Settings. You must be a superuser or have `setting` permission to do this.
  Returns `{:ok true}` if we were able to send the message successfully, otherwise a standard 400 error response.

## `PUT /api/email/`

Update multiple email Settings. You must be a superuser or have `setting` permission to do this.

### PARAMS:

*  **`settings`** value must be a map.

---

[<< Back to API index](../api-documentation)
