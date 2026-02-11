---
version: v0.59
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkEventHandlersConfig
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkEventHandlersConfig.md'
layout: new-docs
---

```ts
type SdkEventHandlersConfig = {
  onDashboardLoad?: SdkDashboardLoadEvent;
  onDashboardLoadWithoutCards?: SdkDashboardLoadEvent;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                                                | Type                                                      | Description                                                                                                                                                                         |
| :---------------------------------------------------------------------- | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="ondashboardload"></a> `onDashboardLoad?`                         | [`SdkDashboardLoadEvent`](./api/SdkDashboardLoadEvent) | Triggers when a dashboard loads with all visible cards and their content                                                                                                            |
| <a id="ondashboardloadwithoutcards"></a> `onDashboardLoadWithoutCards?` | [`SdkDashboardLoadEvent`](./api/SdkDashboardLoadEvent) | Triggers after a dashboard loads, but without its cards (at this stage only the dashboard title, tabs, and cards grid are rendered, but the contents of the cards have yet to load. |

<!-- [<endsnippet properties>] -->
