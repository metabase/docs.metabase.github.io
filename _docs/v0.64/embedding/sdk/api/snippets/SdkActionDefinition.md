---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkActionDefinition
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkActionDefinition.md'
layout: new-docs
---

```ts
type SdkActionDefinition = {
  action: {
    id: SdkActionId;
  };
  copiedActionId?: number;
};
```

How a data app names an action: the `defineAction` export, which is what a
data app must pass. `copiedActionId` addresses the copy synchronization made
in the app's own collection — the only one its viewers can read. The dev
preview runs `action` instead, so an app works before its first
synchronization.

## Properties

<!-- [<snippet properties>] -->

| Property                                      | Type                                               |
| :-------------------------------------------- | :------------------------------------------------- |
| <a id="action"></a> `action`                  | \{ `id`: [`SdkActionId`](./api/SdkActionId); \} |
| `action.id`                                   | [`SdkActionId`](./api/SdkActionId)              |
| <a id="copiedactionid"></a> `copiedActionId?` | `number`                                           |

<!-- [<endsnippet properties>] -->
