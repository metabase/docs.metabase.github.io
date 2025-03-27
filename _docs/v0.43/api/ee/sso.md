---
version: v0.43
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Api
title: SSO
source_url: 'https://github.com/metabase/metabase/blob/master/docs/api/ee/sso.md'
summary: "`/auth/sso` Routes.\n\n  Implements the SSO routes needed for SAML and JWT. This namespace primarily provides hooks for those two backends so\n  we can have a uniform interface both via the API and code.\n"
layout: docs
---

# SSO

`/auth/sso` Routes.

  Implements the SSO routes needed for SAML and JWT. This namespace primarily provides hooks for those two backends so
  we can have a uniform interface both via the API and code.

  - [GET /api/ee/sso/sso/](#get-apieessosso)
  - [POST /api/ee/sso/sso/](#post-apieessosso)

## `GET /api/ee/sso/sso/`

SSO entry-point for an SSO user that has not logged in yet.

### PARAMS:

*  **`req`**

## `POST /api/ee/sso/sso/`

Route the SSO backends call with successful login details.

### PARAMS:

*  **`req`**

---

[<< Back to API index](../../api-documentation.html)