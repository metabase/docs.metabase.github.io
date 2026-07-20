---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SqlParameterValues
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SqlParameterValues.md
layout: new-docs
latest: true
---

```ts
type SqlParameterValues = Record<
  string,
  | string
  | number
  | boolean
  | (string | number | boolean | null)[]
  | null
  | undefined
>;
```
