---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SchemaRow
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SchemaRow.md'
layout: new-docs
---

```ts
type SchemaRow<TSchema> = {
  [TColumn in TSchema["columns"][number] as TColumn["name"]]: SchemaValue<TColumn>;
};
```

## Type Parameters

<!-- [<snippet type-parameters>] -->

| Type Parameter                                                                           |
| :--------------------------------------------------------------------------------------- |
| `TSchema` _extends_ \{ `columns`: readonly [`SchemaColumn`](./api/SchemaColumn)[]; \} |

<!-- [<endsnippet type-parameters>] -->

## Not Exported

<!-- [<snippet not-exported>] -->

SchemaValue

<!-- [<endsnippet not-exported>] -->
