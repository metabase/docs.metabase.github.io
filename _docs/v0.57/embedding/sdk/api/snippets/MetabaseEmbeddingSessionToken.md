---
version: v0.57
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseEmbeddingSessionToken
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseEmbeddingSessionToken.md'
layout: new-docs
---

```ts
type MetabaseEmbeddingSessionToken = {
  exp?: number | null;
  id: string;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                | Type               | Description                                                                                                                           |
| :---------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="exp"></a> `exp?` | `number` \| `null` | (EMB-829) This is a temporary type. After we disallowed token without expiration, we will remove make it a non-optional number again. |
| <a id="id"></a> `id`    | `string`           | -                                                                                                                                     |

<!-- [<endsnippet properties>] -->
