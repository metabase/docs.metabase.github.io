---
version: v0.61
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
    params: CreateDashboardValues,
  ) => Promise<MetabaseDashboard>;
} | null;
```

Creates a dashboard.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

\| \{
`createDashboard`: (`params`: [`CreateDashboardValues`](./api/CreateDashboardValues)) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`MetabaseDashboard`](./api/MetabaseDashboard)\>;
\}
\| `null`

<!-- [<endsnippet returns>] -->
