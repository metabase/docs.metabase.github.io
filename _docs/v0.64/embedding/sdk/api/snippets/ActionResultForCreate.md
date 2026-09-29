---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionResultForCreate
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionResultForCreate.md'
layout: new-docs
---

```ts
type ActionResultForCreate = {
  created-row: Record<string, RowValue>;
};
```

Response from a single-row create — the inserted row.

## Properties

<!-- [<snippet properties>] -->

| Property                               | Type                                                                                                                                     |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="created-row"></a> `created-row` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`RowValue`](./api/RowValue)\> |

<!-- [<endsnippet properties>] -->
