---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabasePluginsConfig
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabasePluginsConfig.md'
layout: new-docs
---

```ts
type MetabasePluginsConfig = {
  dashboard?: MetabaseDashboardPluginsConfig;
  getNoDataIllustration?: () => string | null | undefined;
  getNoObjectIllustration?: () => string | null | undefined;
  mapQuestionClickActions?: MetabaseClickActionPluginsConfig;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                                        | Type                                                                            | Description                                                                                              |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------- |
| <a id="dashboard"></a> `dashboard?`                             | [`MetabaseDashboardPluginsConfig`](./api/MetabaseDashboardPluginsConfig)     | -                                                                                                        |
| <a id="getnodataillustration"></a> `getNoDataIllustration?`     | () => `string` \| `null` \| `undefined`                                         | Provides a custom illustration to display when there is no data.                                         |
| <a id="getnoobjectillustration"></a> `getNoObjectIllustration?` | () => `string` \| `null` \| `undefined`                                         | Provides a custom illustration to display when there is no object (e.g., no dashboards, no collections). |
| <a id="mapquestionclickactions"></a> `mapQuestionClickActions?` | [`MetabaseClickActionPluginsConfig`](./api/MetabaseClickActionPluginsConfig) | -                                                                                                        |

<!-- [<endsnippet properties>] -->
