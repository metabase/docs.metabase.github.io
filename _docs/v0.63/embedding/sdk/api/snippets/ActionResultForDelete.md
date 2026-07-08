---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionResultForDelete
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionResultForDelete.md'
layout: new-docs
---

```ts
type ActionResultForDelete = {
  rows-deleted: readonly (null | string | number | false | true | object)[];
};
```

Response from a single-row delete — the affected primary keys.

## Properties

<!-- [<snippet properties>] -->

| Property                                 | Type                                                                         |
| :--------------------------------------- | :--------------------------------------------------------------------------- |
| <a id="rows-deleted"></a> `rows-deleted` | readonly (`null` \| `string` \| `number` \| `false` \| `true` \| `object`)[] |

<!-- [<endsnippet properties>] -->
