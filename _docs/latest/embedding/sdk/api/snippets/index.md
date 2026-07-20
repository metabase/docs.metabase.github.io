---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Index
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/index.md
layout: new-docs
latest: true
---

## CollectionBrowser

| Name                                                      | Description                                                        |
| :-------------------------------------------------------- | :----------------------------------------------------------------- |
| [CollectionBrowser](./api/CollectionBrowser)           | A component that allows you to browse collections and their items. |
| [CollectionBrowserProps](./api/CollectionBrowserProps) | -                                                                  |

## CreateDashboardModal

| Name                                                            | Description         |
| :-------------------------------------------------------------- | :------------------ |
| [CreateDashboardModal](./api/CreateDashboardModal)           | Creates a dashboard |
| [CreateDashboardModalProps](./api/CreateDashboardModalProps) | -                   |

## CreateQuestion

| Name                                                | Description |
| :-------------------------------------------------- | :---------- |
| [~~CreateQuestion~~](./api/CreateQuestion)       | -           |
| [CreateQuestionProps](./api/CreateQuestionProps) | -           |

## Dashboard

| Name                                                            | Description                                                                                                                                                                                                                                                    |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EditableDashboard](./api/EditableDashboard)                 | A dashboard component with the features available in the `InteractiveDashboard` component, as well as the ability to add and update questions, layout, and content within your dashboard.                                                                      |
| [InteractiveDashboard](./api/InteractiveDashboard)           | A dashboard component with drill downs, click behaviors, and the ability to view and click into questions.                                                                                                                                                     |
| [StaticDashboard](./api/StaticDashboard)                     | A lightweight dashboard component.                                                                                                                                                                                                                             |
| [EditableDashboardProps](./api/EditableDashboardProps)       | -                                                                                                                                                                                                                                                              |
| [InteractiveDashboardProps](./api/InteractiveDashboardProps) | -                                                                                                                                                                                                                                                              |
| [StaticDashboardProps](./api/StaticDashboardProps)           | -                                                                                                                                                                                                                                                              |
| [ParameterChangePayload](./api/ParameterChangePayload)       | Payload passed to `onParametersChange` callback                                                                                                                                                                                                                |
| [ParameterChangeSource](./api/ParameterChangeSource)         | Source of a parameter-change event: - `initial-state` - first applied snapshot, fired once per dashboard load. - `manual-change` - user edited parameters in UI. - `auto-change` - in the case of auto-updates, e.g. to pass normalized values back to parent. |

## InteractiveQuestion

| Name                                                                                                          | Description                                                                                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [InteractiveQuestion](./api/InteractiveQuestion)                                                           | A component that renders an interactive question.                                                                                                                                                                                                              |
| [DrillThroughQuestionProps](./api/DrillThroughQuestionProps)                                               | Props for the drill-through question                                                                                                                                                                                                                           |
| [InteractiveQuestionChartTypeDropdownProps](./api/InteractiveQuestionChartTypeDropdownProps)               | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionEditorButtonProps](./api/InteractiveQuestionEditorButtonProps)                         | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionEditorProps](./api/InteractiveQuestionEditorProps)                                     | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionProps](./api/InteractiveQuestionProps)                                                 | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionQuestionSettingsDropdownProps](./api/InteractiveQuestionQuestionSettingsDropdownProps) | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionQuestionVisualizationProps](./api/InteractiveQuestionQuestionVisualizationProps)       | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionResetButtonProps](./api/InteractiveQuestionResetButtonProps)                           | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionSaveQuestionFormProps](./api/InteractiveQuestionSaveQuestionFormProps)                 | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionTitleProps](./api/InteractiveQuestionTitleProps)                                       | -                                                                                                                                                                                                                                                              |
| [SdkQuestionProps](./api/SdkQuestionProps)                                                                 | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionBackButtonProps](./api/InteractiveQuestionBackButtonProps)                             | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionBreakoutDropdownProps](./api/InteractiveQuestionBreakoutDropdownProps)                 | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionChartTypeSelectorProps](./api/InteractiveQuestionChartTypeSelectorProps)               | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionDownloadWidgetDropdownProps](./api/InteractiveQuestionDownloadWidgetDropdownProps)     | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionDownloadWidgetProps](./api/InteractiveQuestionDownloadWidgetProps)                     | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionFilterDropdownProps](./api/InteractiveQuestionFilterDropdownProps)                     | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionFilterProps](./api/InteractiveQuestionFilterProps)                                     | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionQuestionSettingsProps](./api/InteractiveQuestionQuestionSettingsProps)                 | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionSaveButtonProps](./api/InteractiveQuestionSaveButtonProps)                             | -                                                                                                                                                                                                                                                              |
| [InteractiveQuestionSummarizeDropdownProps](./api/InteractiveQuestionSummarizeDropdownProps)               | -                                                                                                                                                                                                                                                              |
| [SqlParameterChangePayload](./api/SqlParameterChangePayload)                                               | Payload passed to `onSqlParametersChange` callback                                                                                                                                                                                                             |
| [SqlParameterChangeSource](./api/SqlParameterChangeSource)                                                 | Source of a sql-parameter-change event: - `initial-state` - first applied state, fired once per question load. - `manual-change` - user edited parameters in UI. - `auto-change` - in the case of auto-updates, e.g. to pass normalized values back to parent. |

## MetabaseProvider

| Name                                                                  | Description                                                   |
| :-------------------------------------------------------------------- | :------------------------------------------------------------ |
| [defineMetabaseAuthConfig](./api/defineMetabaseAuthConfig)         | Defines a Metabase auth config.                               |
| [MetabaseProvider](./api/MetabaseProvider)                         | A component that provides the Metabase SDK context and theme. |
| [MetabaseProviderProps](./api/MetabaseProviderProps)               | -                                                             |
| [MetabaseAuthConfig](./api/MetabaseAuthConfig)                     | -                                                             |
| [MetabaseAuthConfigWithApiKey](./api/MetabaseAuthConfigWithApiKey) | -                                                             |
| [MetabaseAuthConfigWithJwt](./api/MetabaseAuthConfigWithJwt)       | -                                                             |
| [MetabaseAuthConfigWithSaml](./api/MetabaseAuthConfigWithSaml)     | -                                                             |
| [MetabaseIsGuestAuthConfig](./api/MetabaseIsGuestAuthConfig)       | -                                                             |

## MetabotQuestion

| Name                                                  | Description                                  |
| :---------------------------------------------------- | :------------------------------------------- |
| [MetabotQuestion](./api/MetabotQuestion)           | A component that renders a metabot question. |
| [MetabotQuestionProps](./api/MetabotQuestionProps) | Props for the MetabotQuestion component.     |

## StaticQuestion

| Name                                                | Description                                 |
| :-------------------------------------------------- | :------------------------------------------ |
| [StaticQuestion](./api/StaticQuestion)           | A component that renders a static question. |
| [StaticQuestionProps](./api/StaticQuestionProps) | -                                           |

## Theming

| Name                                                          | Description                                                     |
| :------------------------------------------------------------ | :-------------------------------------------------------------- |
| [MetabaseEmbeddingThemeV2](./api/MetabaseEmbeddingThemeV2) | Version 2 theme configuration for embedded Metabase components. |
| [ChartColorV2](./api/ChartColorV2)                         | Chart color definition for V2 themes.                           |
| [MetabaseColorKey](./api/MetabaseColorKey)                 | All color keys available in Metabase themes.                    |
| [MetabaseEmbeddingTheme](./api/MetabaseEmbeddingTheme)     | Theme configuration for embedded Metabase components.           |

## other

| Name                                                                          | Description                                                                    |
| :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| [InteractiveQuestionComponents](./api/InteractiveQuestionComponents)       | -                                                                              |
| [MetabaseColors](./api/MetabaseColors)                                     | -                                                                              |
| [MetabaseQuestion](./api/MetabaseQuestion)                                 | -                                                                              |
| [MetabaseTheme](./api/MetabaseTheme)                                       | Theme configuration for embedded Metabase components.                          |
| [StaticQuestionComponents](./api/StaticQuestionComponents)                 | -                                                                              |
| [ButtonProps](./api/ButtonProps)                                           | -                                                                              |
| [ChartColor](./api/ChartColor)                                             | -                                                                              |
| [CollectionBrowserListColumns](./api/CollectionBrowserListColumns)         | -                                                                              |
| [CustomDashboardCardMenuItem](./api/CustomDashboardCardMenuItem)           | -                                                                              |
| [DashboardCardCustomMenuItem](./api/DashboardCardCustomMenuItem)           | -                                                                              |
| [DashboardCardMenu](./api/DashboardCardMenu)                               | -                                                                              |
| [DashboardCardMenuCustomElement](./api/DashboardCardMenuCustomElement)     | -                                                                              |
| [DashCardMenuItem](./api/DashCardMenuItem)                                 | -                                                                              |
| [EmbeddingDataPicker](./api/EmbeddingDataPicker)                           | -                                                                              |
| [EmbeddingEntityType](./api/EmbeddingEntityType)                           | -                                                                              |
| [EntityTypeFilterKeys](./api/EntityTypeFilterKeys)                         | -                                                                              |
| [IconName](./api/IconName)                                                 | -                                                                              |
| [InitializationStatus](./api/InitializationStatus)                         | -                                                                              |
| [LoginStatus](./api/LoginStatus)                                           | -                                                                              |
| [MetabaseClickAction](./api/MetabaseClickAction)                           | -                                                                              |
| [MetabaseClickActionPluginsConfig](./api/MetabaseClickActionPluginsConfig) | -                                                                              |
| [MetabaseCollection](./api/MetabaseCollection)                             | The Collection entity                                                          |
| [MetabaseCollectionItem](./api/MetabaseCollectionItem)                     | The CollectionItem entity                                                      |
| [MetabaseComponentTheme](./api/MetabaseComponentTheme)                     | Theme options for customizing specific Metabase components and visualizations. |
| [MetabaseDashboard](./api/MetabaseDashboard)                               | The Dashboard entity                                                           |
| [MetabaseDashboardPluginsConfig](./api/MetabaseDashboardPluginsConfig)     | -                                                                              |
| [MetabaseDataPointObject](./api/MetabaseDataPointObject)                   | -                                                                              |
| [MetabaseEmbeddingColorKeyV2](./api/MetabaseEmbeddingColorKeyV2)           | Color keys available for theming in modular embedding.                         |
| [MetabaseFetchRequestTokenFn](./api/MetabaseFetchRequestTokenFn)           | -                                                                              |
| [MetabaseFontFamily](./api/MetabaseFontFamily)                             | -                                                                              |
| [MetabaseGlobalPluginsConfig](./api/MetabaseGlobalPluginsConfig)           | -                                                                              |
| [MetabasePluginsConfig](./api/MetabasePluginsConfig)                       | -                                                                              |
| [MetabaseThemePreset](./api/MetabaseThemePreset)                           | -                                                                              |
| [MetabaseUser](./api/MetabaseUser)                                         | The User entity                                                                |
| [MetabotAgentChartMessage](./api/MetabotAgentChartMessage)                 | -                                                                              |
| [MetabotAgentMessage](./api/MetabotAgentMessage)                           | -                                                                              |
| [MetabotAgentTextMessage](./api/MetabotAgentTextMessage)                   | -                                                                              |
| [MetabotUserTextMessage](./api/MetabotUserTextMessage)                     | -                                                                              |
| [ParameterValues](./api/ParameterValues)                                   | -                                                                              |
| [ProtectedColorKey](./api/ProtectedColorKey)                               | Color keys that are protected and should not be exposed to embedding.          |
| [SdkActionId](./api/SdkActionId)                                           | -                                                                              |
| [SdkCollectionId](./api/SdkCollectionId)                                   | -                                                                              |
| [SdkDashboardEntityPublicProps](./api/SdkDashboardEntityPublicProps)       | -                                                                              |
| [SdkDashboardId](./api/SdkDashboardId)                                     | -                                                                              |
| [SdkDashboardLoadEvent](./api/SdkDashboardLoadEvent)                       | -                                                                              |
| [SdkEntityId](./api/SdkEntityId)                                           | -                                                                              |
| [SdkEntityToken](./api/SdkEntityToken)                                     | -                                                                              |
| [SdkErrorComponent](./api/SdkErrorComponent)                               | -                                                                              |
| [SdkErrorComponentProps](./api/SdkErrorComponentProps)                     | -                                                                              |
| [SdkEventHandlersConfig](./api/SdkEventHandlersConfig)                     | -                                                                              |
| [SdkQuestionEntityPublicProps](./api/SdkQuestionEntityPublicProps)         | -                                                                              |
| [SdkQuestionId](./api/SdkQuestionId)                                       | Represents the identifier for a question in the Metabase SDK.                  |
| [SdkQuestionTitleProps](./api/SdkQuestionTitleProps)                       | -                                                                              |
| [SdkUserId](./api/SdkUserId)                                               | -                                                                              |
| [SqlParameterValues](./api/SqlParameterValues)                             | -                                                                              |
| [UserBackendJwtResponse](./api/UserBackendJwtResponse)                     | -                                                                              |

## useAction

| Name                                                    | Description                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [useAction](./api/useAction)                         | Triggers a pre-existing Metabase action. The first arg is the action's numeric id or its `entity_id` string; supply `TParameters` as the first generic to type the `execute` argument, and optionally `TKind` as the second generic to type the discriminated `result` shape.                                                                         |
| [UseActionResult](./api/UseActionResult)             | -                                                                                                                                                                                                                                                                                                                                                     |
| [ActionExecuteError](./api/ActionExecuteError)       | Shape of the thrown error captured into the hook's `error` state on a non-2xx response. The hook types `error` as `ActionExecuteError                                                                                                                                                                                                                 | null`, so consumers read its fields directly — no cast needed: |
| [ActionKind](./api/ActionKind)                       | Flat public kind union. Maps onto the backend's namespaced `row/*` + `bulk/*` `implicitKind` and the `query` `type` value, but exposes a simpler five-value surface to callers: `create` / `update` / `delete` always refer to a single row, `bulk` covers any bulk variant, and `sql` covers custom SQL actions (the backend's `query`-type action). |
| [ActionResultForBulk](./api/ActionResultForBulk)     | Response from any bulk variant — a success flag plus optional counts.                                                                                                                                                                                                                                                                                 |
| [ActionResultForCreate](./api/ActionResultForCreate) | Response from a single-row create — the inserted row.                                                                                                                                                                                                                                                                                                 |
| [ActionResultForDelete](./api/ActionResultForDelete) | Response from a single-row delete — the affected primary keys.                                                                                                                                                                                                                                                                                        |
| [ActionResultForKind](./api/ActionResultForKind)     | Maps an `ActionKind` literal to the discriminated `result` shape. Omit `TKind` (`undefined`) to fall back to the `AnyActionResult` union.                                                                                                                                                                                                             |
| [ActionResultForSql](./api/ActionResultForSql)       | Response from a custom SQL action — the affected row count.                                                                                                                                                                                                                                                                                           |
| [ActionResultForUpdate](./api/ActionResultForUpdate) | Response from a single-row update — the affected primary keys.                                                                                                                                                                                                                                                                                        |
| [AnyActionResult](./api/AnyActionResult)             | Union of every possible response body. Used as the `result` default when `TKind` is omitted, so authors who don't know the action's kind upfront still get TS-narrowable shapes (via `"<key>" in result`) instead of a permissive `Record<string, unknown>` that swallows mistyped reads.                                                             |

## useApplicationName

| Function                                          | Description                                                                             |
| :------------------------------------------------ | :-------------------------------------------------------------------------------------- |
| [useApplicationName](./api/useApplicationName) | Returns application name. Returns `null` until the SDK is fully loaded and initialized. |

## useAvailableFonts

| Function                                        | Description                                                                            |
| :---------------------------------------------- | :------------------------------------------------------------------------------------- |
| [useAvailableFonts](./api/useAvailableFonts) | Returns available fonts. Returns `null` until the SDK is fully loaded and initialized. |

## useCreateDashboardApi

| Name                                                    | Description                                                                        |
| :------------------------------------------------------ | :--------------------------------------------------------------------------------- |
| [useCreateDashboardApi](./api/useCreateDashboardApi) | Creates a dashboard. Returns `null` until the SDK is fully loaded and initialized. |
| [CreateDashboardValues](./api/CreateDashboardValues) | -                                                                                  |

## useCurrentUser

| Function                                  | Description                                                                             |
| :---------------------------------------- | :-------------------------------------------------------------------------------------- |
| [useCurrentUser](./api/useCurrentUser) | Returns the current user. Returns `null` until the SDK is fully loaded and initialized. |

## useMetabaseAuthStatus

| Function                                                | Description                                                                                                                                        |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useMetabaseAuthStatus](./api/useMetabaseAuthStatus) | Returns the authentication status of the current user in the Metabase embedding SDK. Returns `null` until the SDK is fully loaded and initialized. |

## useMetabot

| Name                                                | Description                           |
| :-------------------------------------------------- | :------------------------------------ |
| [useMetabot](./api/useMetabot)                   | Returns the Metabot conversation API. |
| [MetabotChartProps](./api/MetabotChartProps)     | -                                     |
| [MetabotErrorMessage](./api/MetabotErrorMessage) | -                                     |
| [MetabotMessage](./api/MetabotMessage)           | -                                     |
| [UseMetabotResult](./api/UseMetabotResult)       | -                                     |
