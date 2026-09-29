---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: FieldSchema
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/FieldSchema.md'
layout: new-docs
---

```ts
type FieldSchema = SchemaColumn & {
  fieldId?: number;
  id?: string | number;
  sourceFieldId?: number;
  sourceName?: string;
  tableId?: number;
  type: "column";
};
```

Metadata for a generated table field.

## Type Declaration

<!-- [<snippet type-declaration>] -->

| Name             | Type                 |
| :--------------- | :------------------- |
| `fieldId?`       | `number`             |
| `id?`            | `string` \| `number` |
| `sourceFieldId?` | `number`             |
| `sourceName?`    | `string`             |
| `tableId?`       | `number`             |
| `type`           | `"column"`           |

<!-- [<endsnippet type-declaration>] -->
