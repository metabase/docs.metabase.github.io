---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: CreateQuestionProps
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/CreateQuestionProps.md
layout: new-docs
latest: true
---

**`Expand`**

## Properties

<!-- [<snippet properties>] -->

| Property                                                  | Type                                                                                                                                                                                                                                    | Description                                                                                                                                 |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="entitytypes"></a> `entityTypes?`                   | [`EmbeddingEntityType`](./api/EmbeddingEntityType)[]                                                                                                                                                                                 | An array that specifies which entity types are available in the data picker                                                                 |
| <a id="initialsqlparameters"></a> `initialSqlParameters?` | [`SqlParameterValues`](./api/SqlParameterValues)                                                                                                                                                                                     | Initial values for the SQL parameters.                                                                                                      |
| <a id="issaveenabled"></a> `isSaveEnabled?`               | `boolean`                                                                                                                                                                                                                               | Whether to show the save button.                                                                                                            |
| <a id="onbeforesave"></a> `onBeforeSave?`                 | (`question`: `undefined` \| [`MetabaseQuestion`](./api/MetabaseQuestion), `context`: \{ `isNewQuestion`: `boolean`; \}) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`void`\> | A callback function that triggers before saving. Only relevant when `isSaveEnabled = true`                                                  |
| <a id="onrun"></a> `onRun?`                               | (`question`: `undefined` \| [`MetabaseQuestion`](./api/MetabaseQuestion)) => `void`                                                                                                                                                  | A callback function that triggers when a question is updated, including when a user clicks the `Visualize` button in the question editor    |
| <a id="onsave"></a> `onSave?`                             | (`question`: `undefined` \| [`MetabaseQuestion`](./api/MetabaseQuestion), `context`: \{ `isNewQuestion`: `boolean`; \}) => `void`                                                                                                    | A callback function that triggers when a user saves the question. Only relevant when `isSaveEnabled = true`                                 |
| <a id="plugins"></a> `plugins?`                           | [`MetabasePluginsConfig`](./api/MetabasePluginsConfig)                                                                                                                                                                               | -                                                                                                                                           |
| <a id="targetcollection"></a> `targetCollection?`         | [`SdkCollectionId`](./api/SdkCollectionId)                                                                                                                                                                                           | The collection to save the question to. This will hide the collection picker from the save modal. Only applicable to interactive questions. |
| <a id="withdownloads"></a> `withDownloads?`               | `boolean`                                                                                                                                                                                                                               | Enables the ability to download results in the interactive question.                                                                        |

<!-- [<endsnippet properties>] -->
