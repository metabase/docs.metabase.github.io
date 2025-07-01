---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: EditableDashboard
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/EditableDashboard.md
layout: new-docs
latest: true
---

```ts
function EditableDashboard(
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
  } & {},
): Element;
```

A dashboard component with the features available in the `InteractiveDashboard` component, as well as the ability to add and update questions, layout, and content within your dashboard.

## Parameters

<!-- [<snippet parameters>] -->

| Parameter | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| `props`   | \{ `drillThroughQuestionHeight?`: `Height`\<`string` \| `number`\>; `drillThroughQuestionProps?`: [`DrillThroughQuestionProps`](./api/DrillThroughQuestionProps); `plugins?`: [`MetabasePluginsConfig`](./api/MetabasePluginsConfig); `renderDrillThroughQuestion?`: () => [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L478); \} & \{ `dashboardId`: [`SdkDashboardId`](./api/SdkDashboardId); `hiddenParameters?`: `string`[]; `initialParameters?`: [`ParameterValues`](./api/ParameterValues); `withCardTitle?`: `boolean`; `withDownloads?`: `boolean`; `withTitle?`: `boolean`; \} & \{ `className?`: `string`; `style?`: [`CSSProperties`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L2579); \} & \{ `onLoad?`: (`dashboard`: `null` \| [`MetabaseDashboard`](./api/MetabaseDashboard)) => `void`; `onLoadWithoutCards?`: (`dashboard`: `null` \| [`MetabaseDashboard`](./api/MetabaseDashboard)) => `void`; \} & \{ \} |             |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/jsx-runtime.d.ts#L6)

<!-- [<endsnippet returns>] -->
