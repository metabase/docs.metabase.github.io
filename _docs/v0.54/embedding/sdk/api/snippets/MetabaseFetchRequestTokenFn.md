---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseFetchRequestTokenFn
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseFetchRequestTokenFn.md'
layout: new-docs
---

```ts
type MetabaseFetchRequestTokenFn = (
  url: string,
) => Promise<MetabaseEmbeddingSessionToken | null>;
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter | Type     |
| :-------- | :------- |
| `url`     | `string` |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<
\| [`MetabaseEmbeddingSessionToken`](./api/MetabaseEmbeddingSessionToken)
\| `null`\>

<!-- [<endsnippet returns>] -->
