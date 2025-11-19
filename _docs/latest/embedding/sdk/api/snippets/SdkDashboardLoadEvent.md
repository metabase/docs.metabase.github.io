---
version: v0.57
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkDashboardLoadEvent
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkDashboardLoadEvent.md
layout: new-docs
latest: true
---

```ts
type SdkDashboardLoadEvent = (dashboard: MetabaseDashboard | null) => void;
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter   | Type                                                        |
| :---------- | :---------------------------------------------------------- |
| `dashboard` | [`MetabaseDashboard`](./api/MetabaseDashboard) \| `null` |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

`void`

<!-- [<endsnippet returns>] -->
