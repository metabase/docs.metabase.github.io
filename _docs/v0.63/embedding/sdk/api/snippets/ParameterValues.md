---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ParameterValues
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ParameterValues.md'
layout: new-docs
---

```ts
type ParameterValues = Record<
  string,
  | string
  | number
  | boolean
  | (string | number | boolean | null)[]
  | null
  | undefined
>;
```
