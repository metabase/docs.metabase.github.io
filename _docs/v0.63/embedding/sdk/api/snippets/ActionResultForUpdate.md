---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionResultForUpdate
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionResultForUpdate.md'
layout: new-docs
latest: true
---

```ts
type ActionResultForUpdate = {
  rows-updated: readonly (null | string | number | false | true | object)[];
};
```

Response from a single-row update — the affected primary keys.

## Properties

<!-- [<snippet properties>] -->

| Property                                 | Type                                                                         |
| :--------------------------------------- | :--------------------------------------------------------------------------- |
| <a id="rows-updated"></a> `rows-updated` | readonly (`null` \| `string` \| `number` \| `false` \| `true` \| `object`)[] |

<!-- [<endsnippet properties>] -->
