---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabotChartProps
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabotChartProps.md'
layout: new-docs
---

```ts
type MetabotChartProps =
  | (Omit<StaticQuestionProps, "questionId" | "token" | "query" | "card"> & {
      drills?: false;
    })
  | (Omit<
      InteractiveQuestionProps,
      "questionId" | "token" | "query" | "card"
    > & {
      drills: true;
    });
```
