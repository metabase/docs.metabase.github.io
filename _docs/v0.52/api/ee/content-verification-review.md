---
version: v0.52
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Content verification review'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/content-verification-review.md'
layout: new-docs
summary: "API endpoints for Content verification review.\n"
---

# Content verification review

API endpoints for Content verification review.

## `POST /api/moderation-review/review/`

Create a new `ModerationReview`.

You must be a superuser to do this.

### PARAMS:

-  **`text`** nullable string.

-  **`moderated_item_id`** value must be an integer greater than zero.

-  **`moderated_item_type`** enum of card, :card, dashboard, :dashboard.

-  **`status`** nullable nullable enum of verified.

---

[<< Back to API index](../../api-documentation)
