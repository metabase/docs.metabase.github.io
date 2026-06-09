---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabotAgentChartMessage
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabotAgentChartMessage.md
layout: new-docs
latest: true
---

```ts
type MetabotAgentChartMessage = {
  Chart: React_2.ComponentType<MetabotChartProps>;
  id: string;
  questionPath: string;
  role: "agent";
  type: "chart";
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                 | Type                                                                                                                                                                                                         | Description                                         |
| :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| <a id="chart"></a> `Chart`               | [`React_2.ComponentType`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L104)\<[`MetabotChartProps`](./api/MetabotChartProps)\> | A pre-wired React component that renders the chart. |
| <a id="id"></a> `id`                     | `string`                                                                                                                                                                                                     | -                                                   |
| <a id="questionpath"></a> `questionPath` | `string`                                                                                                                                                                                                     | URL path to the question, e.g. `/question#<base64>` |
| <a id="role"></a> `role`                 | `"agent"`                                                                                                                                                                                                    | -                                                   |
| <a id="type"></a> `type`                 | `"chart"`                                                                                                                                                                                                    | -                                                   |

<!-- [<endsnippet properties>] -->
