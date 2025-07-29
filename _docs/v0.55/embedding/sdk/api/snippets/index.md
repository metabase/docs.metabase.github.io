---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Index
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/index.md'
layout: new-docs
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
| [useCreateDashboardApi](./api/useCreateDashboardApi)         | Creates a dashboard |
| [CreateDashboardModalProps](./api/CreateDashboardModalProps) | -                   |
| [CreateDashboardValues](./api/CreateDashboardValues)         | -                   |

## CreateQuestion

| Name                                                | Description |
| :-------------------------------------------------- | :---------- |
| [~~CreateQuestion~~](./api/CreateQuestion)       | -           |
| [CreateQuestionProps](./api/CreateQuestionProps) | -           |

## Dashboard

| Name                                                            | Description                                                                                                                                                                               |
| :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EditableDashboard](./api/EditableDashboard)                 | A dashboard component with the features available in the `InteractiveDashboard` component, as well as the ability to add and update questions, layout, and content within your dashboard. |
| [InteractiveDashboard](./api/InteractiveDashboard)           | A dashboard component with drill downs, click behaviors, and the ability to view and click into questions.                                                                                |
| [StaticDashboard](./api/StaticDashboard)                     | A lightweight dashboard component.                                                                                                                                                        |
| [EditableDashboardProps](./api/EditableDashboardProps)       | -                                                                                                                                                                                         |
| [InteractiveDashboardProps](./api/InteractiveDashboardProps) | -                                                                                                                                                                                         |
| [StaticDashboardProps](./api/StaticDashboardProps)           | -                                                                                                                                                                                         |

## InteractiveQuestion

| Name                                                                                                          | Description                          |
| :------------------------------------------------------------------------------------------------------------ | :----------------------------------- |
| [DrillThroughQuestionProps](./api/DrillThroughQuestionProps)                                               | Props for the drill-through question |
| [InteractiveQuestionEditorButtonProps](./api/InteractiveQuestionEditorButtonProps)                         | -                                    |
| [InteractiveQuestionEditorProps](./api/InteractiveQuestionEditorProps)                                     | -                                    |
| [InteractiveQuestionProps](./api/InteractiveQuestionProps)                                                 | -                                    |
| [InteractiveQuestionQuestionSettingsDropdownProps](./api/InteractiveQuestionQuestionSettingsDropdownProps) | -                                    |
| [InteractiveQuestionQuestionVisualizationProps](./api/InteractiveQuestionQuestionVisualizationProps)       | -                                    |
| [InteractiveQuestionResetButtonProps](./api/InteractiveQuestionResetButtonProps)                           | -                                    |
| [InteractiveQuestionSaveQuestionFormProps](./api/InteractiveQuestionSaveQuestionFormProps)                 | -                                    |
| [InteractiveQuestionTitleProps](./api/InteractiveQuestionTitleProps)                                       | -                                    |
| [SdkQuestionProps](./api/SdkQuestionProps)                                                                 | -                                    |
| [InteractiveQuestionBackButtonProps](./api/InteractiveQuestionBackButtonProps)                             | -                                    |
| [InteractiveQuestionBreakoutDropdownProps](./api/InteractiveQuestionBreakoutDropdownProps)                 | -                                    |
| [InteractiveQuestionChartTypeDropdownProps](./api/InteractiveQuestionChartTypeDropdownProps)               | -                                    |
| [InteractiveQuestionChartTypeSelectorProps](./api/InteractiveQuestionChartTypeSelectorProps)               | -                                    |
| [InteractiveQuestionDownloadWidgetDropdownProps](./api/InteractiveQuestionDownloadWidgetDropdownProps)     | -                                    |
| [InteractiveQuestionDownloadWidgetProps](./api/InteractiveQuestionDownloadWidgetProps)                     | -                                    |
| [InteractiveQuestionFilterDropdownProps](./api/InteractiveQuestionFilterDropdownProps)                     | -                                    |
| [InteractiveQuestionFilterProps](./api/InteractiveQuestionFilterProps)                                     | -                                    |
| [InteractiveQuestionQuestionSettingsProps](./api/InteractiveQuestionQuestionSettingsProps)                 | -                                    |
| [InteractiveQuestionSaveButtonProps](./api/InteractiveQuestionSaveButtonProps)                             | -                                    |
| [InteractiveQuestionSummarizeDropdownProps](./api/InteractiveQuestionSummarizeDropdownProps)               | -                                    |

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

## ModifyQuestion

| Function                                      | Description |
| :-------------------------------------------- | :---------- |
| [~~ModifyQuestion~~](./api/ModifyQuestion) | -           |

## StaticQuestion

| Interface                                           | Description |
| :-------------------------------------------------- | :---------- |
| [StaticQuestionProps](./api/StaticQuestionProps) | -           |

## other

| Name                                                                          | Description                                                                                                                                                                                                                                                                                                            |
| :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BaseSdkQuestionProps](./api/BaseSdkQuestionProps)                         | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseColors](./api/MetabaseColors)                                     | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseQuestion](./api/MetabaseQuestion)                                 | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseTheme](./api/MetabaseTheme)                                       | Theme configuration for embedded Metabase components.                                                                                                                                                                                                                                                                  |
| [ButtonProps](./api/ButtonProps)                                           | -                                                                                                                                                                                                                                                                                                                      |
| [ChartColor](./api/ChartColor)                                             | -                                                                                                                                                                                                                                                                                                                      |
| [CollectionBrowserListColumns](./api/CollectionBrowserListColumns)         | -                                                                                                                                                                                                                                                                                                                      |
| [CustomDashboardCardMenuItem](./api/CustomDashboardCardMenuItem)           | -                                                                                                                                                                                                                                                                                                                      |
| [DashboardCardCustomMenuItem](./api/DashboardCardCustomMenuItem)           | -                                                                                                                                                                                                                                                                                                                      |
| [DashboardCardMenu](./api/DashboardCardMenu)                               | -                                                                                                                                                                                                                                                                                                                      |
| [DashboardCardMenuCustomElement](./api/DashboardCardMenuCustomElement)     | -                                                                                                                                                                                                                                                                                                                      |
| [DashCardMenuItem](./api/DashCardMenuItem)                                 | -                                                                                                                                                                                                                                                                                                                      |
| [EmbeddingEntityType](./api/EmbeddingEntityType)                           | `question` only works on multi-stage data picker, not the simple data picker. The reason being that we want to streamline user experience for simple embedding use cases, but `question` was later added to support users who are used to selecting Saved questions in interactive embedding, so this is special case. |
| [EntityTypeFilterKeys](./api/EntityTypeFilterKeys)                         | -                                                                                                                                                                                                                                                                                                                      |
| [IconName](./api/IconName)                                                 | -                                                                                                                                                                                                                                                                                                                      |
| [LoginStatus](./api/LoginStatus)                                           | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseClickAction](./api/MetabaseClickAction)                           | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseClickActionPluginsConfig](./api/MetabaseClickActionPluginsConfig) | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseCollection](./api/MetabaseCollection)                             | The Collection entity                                                                                                                                                                                                                                                                                                  |
| [MetabaseCollectionItem](./api/MetabaseCollectionItem)                     | The CollectionItem entity                                                                                                                                                                                                                                                                                              |
| [MetabaseComponentTheme](./api/MetabaseComponentTheme)                     | Theme options for customizing specific Metabase components and visualizations.                                                                                                                                                                                                                                         |
| [MetabaseDashboard](./api/MetabaseDashboard)                               | The Dashboard entity                                                                                                                                                                                                                                                                                                   |
| [MetabaseDashboardPluginsConfig](./api/MetabaseDashboardPluginsConfig)     | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseDataPointObject](./api/MetabaseDataPointObject)                   | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseEmbeddingSessionToken](./api/MetabaseEmbeddingSessionToken)       | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseFetchRequestTokenFn](./api/MetabaseFetchRequestTokenFn)           | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseFontFamily](./api/MetabaseFontFamily)                             | -                                                                                                                                                                                                                                                                                                                      |
| [MetabasePluginsConfig](./api/MetabasePluginsConfig)                       | -                                                                                                                                                                                                                                                                                                                      |
| [MetabaseUser](./api/MetabaseUser)                                         | The User entity                                                                                                                                                                                                                                                                                                        |
| [ParameterValues](./api/ParameterValues)                                   | -                                                                                                                                                                                                                                                                                                                      |
| [SdkCollectionId](./api/SdkCollectionId)                                   | -                                                                                                                                                                                                                                                                                                                      |
| [SdkDashboardId](./api/SdkDashboardId)                                     | -                                                                                                                                                                                                                                                                                                                      |
| [SdkDashboardLoadEvent](./api/SdkDashboardLoadEvent)                       | -                                                                                                                                                                                                                                                                                                                      |
| [SdkEntityId](./api/SdkEntityId)                                           | -                                                                                                                                                                                                                                                                                                                      |
| [SdkErrorComponent](./api/SdkErrorComponent)                               | -                                                                                                                                                                                                                                                                                                                      |
| [SdkErrorComponentProps](./api/SdkErrorComponentProps)                     | -                                                                                                                                                                                                                                                                                                                      |
| [SdkEventHandlersConfig](./api/SdkEventHandlersConfig)                     | -                                                                                                                                                                                                                                                                                                                      |
| [SdkQuestionId](./api/SdkQuestionId)                                       | -                                                                                                                                                                                                                                                                                                                      |
| [SdkQuestionTitleProps](./api/SdkQuestionTitleProps)                       | -                                                                                                                                                                                                                                                                                                                      |
| [SdkUserId](./api/SdkUserId)                                               | -                                                                                                                                                                                                                                                                                                                      |
| [SqlParameterValues](./api/SqlParameterValues)                             | -                                                                                                                                                                                                                                                                                                                      |
| [UserBackendJwtResponse](./api/UserBackendJwtResponse)                     | -                                                                                                                                                                                                                                                                                                                      |
