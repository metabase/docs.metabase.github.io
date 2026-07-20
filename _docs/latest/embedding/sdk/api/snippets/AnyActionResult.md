---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: AnyActionResult
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/AnyActionResult.md
layout: new-docs
latest: true
---

```ts
type AnyActionResult =
  | ActionResultForCreate
  | ActionResultForUpdate
  | ActionResultForDelete
  | ActionResultForBulk
  | ActionResultForSql;
```

Union of every possible response body. Used as the `result` default when
`TKind` is omitted, so authors who don't know the action's kind upfront
still get TS-narrowable shapes (via `"<key>" in result`) instead of a
permissive `Record<string, unknown>` that swallows mistyped reads.
