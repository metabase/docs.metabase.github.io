---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useCreateDashboardApi
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useCreateDashboardApi.md'
layout: new-docs
---

```ts
function useCreateDashboardApi(): {
  createDashboard: (
    options: CreateDashboardValues,
  ) => Promise<MetabaseDashboard>;
};
```

Creates a dashboard

## Returns

<!-- [<snippet returns>] -->

```ts
{
  createDashboard: (options: CreateDashboardValues) =>
    Promise<MetabaseDashboard>;
}
```

| Name                | Type                                                                                                                                                                                                                           | Description |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `createDashboard()` | (`options`: [`CreateDashboardValues`](./api/CreateDashboardValues)) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MetabaseDashboard`](./api/MetabaseDashboard)\> |             |

<!-- [<endsnippet returns>] -->
