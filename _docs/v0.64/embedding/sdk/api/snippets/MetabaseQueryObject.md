---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseQueryObject
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseQueryObject.md'
layout: new-docs
---

```ts
type MetabaseQueryObject =
  | {
  database?: unknown;
  parameters?: unknown;
  query?: unknown;
  type: "query";
}
  | {
  database?: unknown;
  native?: unknown;
  parameters?: unknown;
  type: "native";
}
  | {
  database?: unknown;
  lib/type: "mbql/query";
  parameters?: unknown;
  stages?: unknown;
};
```

Public structural type for ad-hoc SDK queries created by
`useMetabaseQueryObject`.
