---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: DashboardCardCustomMenuItem
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/DashboardCardCustomMenuItem.md'
layout: new-docs
---

```ts
type DashboardCardCustomMenuItem = {
  customItems?: (DashCardMenuItem | CustomDashboardCardMenuItem)[];
  withDownloads?: boolean;
  withEditLink?: boolean;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                    | Type                                                                                                                             | Description  |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| <a id="customitems"></a> `customItems?`     | ( \| [`DashCardMenuItem`](./api/DashCardMenuItem) \| [`CustomDashboardCardMenuItem`](./api/CustomDashboardCardMenuItem))[] | **`Expand`** |
| <a id="withdownloads"></a> `withDownloads?` | `boolean`                                                                                                                        | -            |
| <a id="witheditlink"></a> `withEditLink?`   | `boolean`                                                                                                                        | -            |

<!-- [<endsnippet properties>] -->
