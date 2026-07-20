---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionKind
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionKind.md
layout: new-docs
latest: true
---

```ts
type ActionKind = "create" | "update" | "delete" | "bulk" | "sql";
```

Flat public kind union. Maps onto the backend's namespaced
`row/*` + `bulk/*` `implicitKind` and the `query` `type` value, but
exposes a simpler five-value surface to callers: `create` / `update` /
`delete` always refer to a single row, `bulk` covers any bulk variant,
and `sql` covers custom SQL actions (the backend's `query`-type action).
