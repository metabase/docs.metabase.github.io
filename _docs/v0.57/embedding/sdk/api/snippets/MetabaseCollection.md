---
version: v0.57
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseCollection
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseCollection.md'
layout: new-docs
---

```ts
type MetabaseCollection = {
  description: string | null;
  entity_id?: SdkEntityId;
  id: SdkCollectionId;
  name: string;
  slug?: string;
};
```

The Collection entity

## Properties

<!-- [<snippet properties>] -->

| Property                               | Type                                          |
| :------------------------------------- | :-------------------------------------------- |
| <a id="description"></a> `description` | `string` \| `null`                            |
| <a id="entity_id"></a> `entity_id?`    | [`SdkEntityId`](./api/SdkEntityId)         |
| <a id="id"></a> `id`                   | [`SdkCollectionId`](./api/SdkCollectionId) |
| <a id="name"></a> `name`               | `string`                                      |
| <a id="slug"></a> `slug?`              | `string`                                      |

<!-- [<endsnippet properties>] -->
