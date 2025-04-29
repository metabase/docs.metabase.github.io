---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseAuthConfigWithApiKey
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseAuthConfigWithApiKey.md'
layout: new-docs
---

```ts
type MetabaseAuthConfigWithApiKey = {
  fetchRequestToken: MetabaseFetchRequestTokenFn;
  metabaseInstanceUrl: string;
} & {
  apiKey: string;
  authProviderUri: never;
};
```

## Type declaration

<!-- [<snippet type-declaration>] -->

| Name                  | Type                                                                  | Description                                                                                                               |
| :-------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `fetchRequestToken?`  | [`MetabaseFetchRequestTokenFn`](./api/MetabaseFetchRequestTokenFn) | Specifies a function to fetch the refresh token. The refresh token should be in the format of { id: string, exp: number } |
| `metabaseInstanceUrl` | `string`                                                              | -                                                                                                                         |

<!-- [<endsnippet type-declaration>] -->

## Type declaration

<!-- [<snippet type-declaration>] -->

| Name               | Type     |
| :----------------- | :------- |
| `apiKey`           | `string` |
| `authProviderUri?` | `never`  |

<!-- [<endsnippet type-declaration>] -->
