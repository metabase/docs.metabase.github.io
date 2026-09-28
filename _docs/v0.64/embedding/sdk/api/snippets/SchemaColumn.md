---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SchemaColumn
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SchemaColumn.md'
layout: new-docs
---

```ts
type SchemaColumn = {
  baseType?: string;
  description?: string;
  displayName?: string;
  effectiveType?: string;
  jsType?: SchemaJavaScriptType;
  name: string;
  type?: "column";
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                    | Type                                                    |
| :------------------------------------------ | :------------------------------------------------------ |
| <a id="basetype"></a> `baseType?`           | `string`                                                |
| <a id="description"></a> `description?`     | `string`                                                |
| <a id="displayname"></a> `displayName?`     | `string`                                                |
| <a id="effectivetype"></a> `effectiveType?` | `string`                                                |
| <a id="jstype"></a> `jsType?`               | [`SchemaJavaScriptType`](./api/SchemaJavaScriptType) |
| <a id="name"></a> `name`                    | `string`                                                |
| <a id="type"></a> `type?`                   | `"column"`                                              |

<!-- [<endsnippet properties>] -->
