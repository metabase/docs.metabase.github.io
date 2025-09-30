---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: InteractiveDashboard
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/InteractiveDashboard.md'
layout: new-docs
---

```ts
function InteractiveDashboard(
  props: {
    drillThroughQuestionHeight?: Height<string | number>;
    drillThroughQuestionProps?: DrillThroughQuestionProps;
    plugins?: MetabasePluginsConfig;
    renderDrillThroughQuestion?: () => ReactNode;
  } & {
    dashboardId: SdkDashboardId;
    hiddenParameters?: string[];
    initialParameters?: ParameterValues;
    withCardTitle?: boolean;
    withDownloads?: boolean;
    withTitle?: boolean;
  } & {
    className?: string;
    style?: CSSProperties;
  } & {
    onLoad?: (dashboard: null | MetabaseDashboard) => void;
    onLoadWithoutCards?: (dashboard: null | MetabaseDashboard) => void;
    onVisualizationChange?: (
      visualization:
        | "object"
        | "table"
        | "bar"
        | "line"
        | "pie"
        | "scalar"
        | "row"
        | "area"
        | "combo"
        | "pivot"
        | "smartscalar"
        | "gauge"
        | "progress"
        | "funnel"
        | "map"
        | "scatter"
        | "waterfall"
        | "sankey"
        | "list",
    ) => void;
  } & {
    dataPickerProps?: Pick<SdkQuestionProps, "entityTypes">;
  } & {},
): Element;
```

A dashboard component with drill downs, click behaviors, and the ability to view and click into questions.

## Parameters

<!-- [<snippet parameters>] -->

| Parameter | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `props`   | \{ `drillThroughQuestionHeight?`: `Height`\<`string` \| `number`\>; `drillThroughQuestionProps?`: [`DrillThroughQuestionProps`](./api/DrillThroughQuestionProps); `plugins?`: [`MetabasePluginsConfig`](./api/MetabasePluginsConfig); `renderDrillThroughQuestion?`: () => [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L478); \} & \{ `dashboardId`: [`SdkDashboardId`](./api/SdkDashboardId); `hiddenParameters?`: `string`[]; `initialParameters?`: [`ParameterValues`](./api/ParameterValues); `withCardTitle?`: `boolean`; `withDownloads?`: `boolean`; `withTitle?`: `boolean`; \} & \{ `className?`: `string`; `style?`: [`CSSProperties`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L2579); \} & \{ `onLoad?`: (`dashboard`: `null` \| [`MetabaseDashboard`](./api/MetabaseDashboard)) => `void`; `onLoadWithoutCards?`: (`dashboard`: `null` \| [`MetabaseDashboard`](./api/MetabaseDashboard)) => `void`; `onVisualizationChange?`: (`visualization`: \| `"object"` \| `"table"` \| `"bar"` \| `"line"` \| `"pie"` \| `"scalar"` \| `"row"` \| `"area"` \| `"combo"` \| `"pivot"` \| `"smartscalar"` \| `"gauge"` \| `"progress"` \| `"funnel"` \| `"map"` \| `"scatter"` \| `"waterfall"` \| `"sankey"` \| `"list"`) => `void`; \} & \{ `dataPickerProps?`: [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<[`SdkQuestionProps`](./api/SdkQuestionProps), `"entityTypes"`\>; \} & \{ \} |             |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L4240)

<!-- [<endsnippet returns>] -->
