---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabasePluginsConfig
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabasePluginsConfig.md
layout: new-docs
latest: true
---

```ts
type MetabasePluginsConfig = {
  dashboard?: MetabaseDashboardPluginsConfig;
  mapQuestionClickActions?: MetabaseClickActionPluginsConfig;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                                        | Type                                                                            |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| <a id="dashboard"></a> `dashboard?`                             | [`MetabaseDashboardPluginsConfig`](./api/MetabaseDashboardPluginsConfig)     |
| <a id="mapquestionclickactions"></a> `mapQuestionClickActions?` | [`MetabaseClickActionPluginsConfig`](./api/MetabaseClickActionPluginsConfig) |

<!-- [<endsnippet properties>] -->
