---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionResultForBulk
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionResultForBulk.md
layout: new-docs
latest: true
---

```ts
type ActionResultForBulk = {
  rows-created?: number;
  rows-deleted?: number;
  rows-updated?: number;
  success: boolean;
};
```

Response from any bulk variant — a success flag plus optional counts.

## Properties

<!-- [<snippet properties>] -->

| Property                                  | Type      |
| :---------------------------------------- | :-------- |
| <a id="rows-created"></a> `rows-created?` | `number`  |
| <a id="rows-deleted"></a> `rows-deleted?` | `number`  |
| <a id="rows-updated"></a> `rows-updated?` | `number`  |
| <a id="success"></a> `success`            | `boolean` |

<!-- [<endsnippet properties>] -->
