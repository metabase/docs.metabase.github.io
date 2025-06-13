---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: CustomDashboardCardMenuItem
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/CustomDashboardCardMenuItem.md'
layout: new-docs
---

```ts
type CustomDashboardCardMenuItem = ({
  question,
}: {
  question: MetabaseQuestion;
}) => DashCardMenuItem;
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter                 | Type                                                               |
| :------------------------ | :----------------------------------------------------------------- |
| `{ question, }`           | \{ `question`: [`MetabaseQuestion`](./api/MetabaseQuestion); \} |
| `{ question, }.question?` | [`MetabaseQuestion`](./api/MetabaseQuestion)                    |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`DashCardMenuItem`](./api/DashCardMenuItem)

<!-- [<endsnippet returns>] -->
