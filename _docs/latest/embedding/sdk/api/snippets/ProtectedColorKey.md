---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ProtectedColorKey
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ProtectedColorKey.md
layout: new-docs
latest: true
---

```ts
type ProtectedColorKey =
  | "metabase-brand"
  | "admin-navbar"
  | "admin-navbar-secondary"
  | "admin-navbar-inverse"
  | "accent0"
  | "accent1"
  | "accent2"
  | "accent3"
  | "accent4"
  | "accent5"
  | "accent6"
  | "accent7";
```

Color keys that are protected and should not be exposed to embedding.

Do not derive this from `PROTECTED_COLORS` or doc generation will fail.
