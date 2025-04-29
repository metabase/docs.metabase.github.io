---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: DashboardCardMenuCustomElement
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/DashboardCardMenuCustomElement.md'
layout: new-docs
---

```ts
type DashboardCardMenuCustomElement = ({
  question,
}: {
  question: MetabaseQuestion;
}) => ReactNode;
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter                | Type                                                               |
| :----------------------- | :----------------------------------------------------------------- |
| `{ question, }`          | \{ `question`: [`MetabaseQuestion`](./api/MetabaseQuestion); \} |
| `{ question, }.question` | [`MetabaseQuestion`](./api/MetabaseQuestion)                    |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L478)

<!-- [<endsnippet returns>] -->
