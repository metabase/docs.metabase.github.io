---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseCollectionItem
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseCollectionItem.md'
layout: new-docs
---

```ts
type MetabaseCollectionItem = {
  description: string | null;
  entity_id?: SdkEntityId;
  id: SdkCollectionId;
  is_remote_synced?: boolean;
  last-edit-info?: {
     email: string;
     first_name: string;
     id: SdkUserId;
     last_name: string;
     timestamp: string;
  };
  model: string;
  name: string;
  type?: "instance-analytics" | "trash" | "model" | "question" | "metric" | null;
};
```

The CollectionItem entity

## Properties

<!-- [<snippet properties>] -->

| Property                                          | Type                                                                                                                                    |
| :------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="description"></a> `description`            | `string` \| `null`                                                                                                                      |
| <a id="entity_id"></a> `entity_id?`               | [`SdkEntityId`](./api/SdkEntityId)                                                                                                   |
| <a id="id"></a> `id`                              | [`SdkCollectionId`](./api/SdkCollectionId)                                                                                           |
| <a id="is_remote_synced"></a> `is_remote_synced?` | `boolean`                                                                                                                               |
| <a id="last-edit-info"></a> `last-edit-info?`     | \{ `email`: `string`; `first_name`: `string`; `id`: [`SdkUserId`](./api/SdkUserId); `last_name`: `string`; `timestamp`: `string`; \} |
| `last-edit-info.email`                            | `string`                                                                                                                                |
| `last-edit-info.first_name`                       | `string`                                                                                                                                |
| `last-edit-info.id`                               | [`SdkUserId`](./api/SdkUserId)                                                                                                       |
| `last-edit-info.last_name`                        | `string`                                                                                                                                |
| `last-edit-info.timestamp`                        | `string`                                                                                                                                |
| <a id="model"></a> `model`                        | `string`                                                                                                                                |
| <a id="name"></a> `name`                          | `string`                                                                                                                                |
| <a id="type"></a> `type?`                         | `"instance-analytics"` \| `"trash"` \| `"model"` \| `"question"` \| `"metric"` \| `null`                                                |

<!-- [<endsnippet properties>] -->
