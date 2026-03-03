---
version: v0.59
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseClickActionPluginsConfig
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseClickActionPluginsConfig.md
layout: new-docs
latest: true
---

```ts
type MetabaseClickActionPluginsConfig = (
  clickActions: MetabaseClickAction[],
  clickedDataPoint: MetabaseDataPointObject,
) =>
  | MetabaseClickAction[]
  | {
      onClick: () => void;
    };
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter          | Type                                                          |
| :----------------- | :------------------------------------------------------------ |
| `clickActions`     | [`MetabaseClickAction`](./api/MetabaseClickAction)[]       |
| `clickedDataPoint` | [`MetabaseDataPointObject`](./api/MetabaseDataPointObject) |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

\| [`MetabaseClickAction`](./api/MetabaseClickAction)[]
\| \{
`onClick`: () => `void`;
\}

<!-- [<endsnippet returns>] -->
