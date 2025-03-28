---
version: v0.48
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: 'Sandbox user'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/sandbox-user.md'
layout: new-docs
summary: "Endpoint(s)for setting user attributes.\n"
---

# Sandbox user

Endpoint(s)for setting user attributes.

## `GET /api/mt/user/attributes`

Fetch a list of possible keys for User `login_attributes`. This just looks at keys that have already been set for
  existing Users and returns those. .

## `PUT /api/mt/user/:id/attributes`

Update the `login_attributes` for a User.

### PARAMS:

*  **`id`** value must be an integer greater than zero.

*  **`login_attributes`** nullable value must be a valid user attributes map (name -> value)

---

[<< Back to API index](../../api-documentation)
