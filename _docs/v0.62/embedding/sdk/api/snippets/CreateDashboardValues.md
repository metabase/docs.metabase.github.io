---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: CreateDashboardValues
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/CreateDashboardValues.md'
layout: new-docs
---

## Properties

<!-- [<snippet properties>] -->

| Property                                 | Type                                          | Description                                                                                                    |
| :--------------------------------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| <a id="collectionid"></a> `collectionId` | [`SdkCollectionId`](./api/SdkCollectionId) | Collection in which to create a new dashboard. You can use predefined system values like `root` or `personal`. |
| <a id="description"></a> `description`   | `string` \| `null`                            | Dashboard description                                                                                          |
| <a id="name"></a> `name`                 | `string`                                      | Dashboard title                                                                                                |

<!-- [<endsnippet properties>] -->
