---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: QueryQuestionResult
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/QueryQuestionResult.md'
layout: new-docs
---

```ts
type QueryQuestionResult = {
  columns: DatasetColumn[];
  description: MetabaseQuestion["description"];
  entityId: MetabaseQuestion["entityId"];
  id: MetabaseQuestion["id"];
  name: MetabaseQuestion["name"];
  rowCount: number | null;
  rows: RowValues[];
  runningTime: number | null;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                               | Type                                                               |
| :------------------------------------- | :----------------------------------------------------------------- |
| <a id="columns"></a> `columns`         | `DatasetColumn`[]                                                  |
| <a id="description"></a> `description` | [`MetabaseQuestion`](./api/MetabaseQuestion)\[`"description"`\] |
| <a id="entityid"></a> `entityId`       | [`MetabaseQuestion`](./api/MetabaseQuestion)\[`"entityId"`\]    |
| <a id="id"></a> `id`                   | [`MetabaseQuestion`](./api/MetabaseQuestion)\[`"id"`\]          |
| <a id="name"></a> `name`               | [`MetabaseQuestion`](./api/MetabaseQuestion)\[`"name"`\]        |
| <a id="rowcount"></a> `rowCount`       | `number` \| `null`                                                 |
| <a id="rows"></a> `rows`               | `RowValues`[]                                                      |
| <a id="runningtime"></a> `runningTime` | `number` \| `null`                                                 |

<!-- [<endsnippet properties>] -->
