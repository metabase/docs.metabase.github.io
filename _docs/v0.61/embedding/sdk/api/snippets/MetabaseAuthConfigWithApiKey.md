---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseAuthConfigWithApiKey
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseAuthConfigWithApiKey.md'
layout: new-docs
latest: true
---

```ts
type MetabaseAuthConfigWithApiKey = {
  metabaseInstanceUrl: string;
} & {
  apiKey: string;
  fetchRequestToken?: never;
  isGuest?: false;
  preferredAuthMethod?: never;
};
```

## Type Declaration

<!-- [<snippet type-declaration>] -->

| Name                  | Type     |
| :-------------------- | :------- |
| `metabaseInstanceUrl` | `string` |

<!-- [<endsnippet type-declaration>] -->

## Type Declaration

<!-- [<snippet type-declaration>] -->

| Name                   | Type     |
| :--------------------- | :------- |
| `apiKey`               | `string` |
| `fetchRequestToken?`   | `never`  |
| `isGuest?`             | `false`  |
| `preferredAuthMethod?` | `never`  |

<!-- [<endsnippet type-declaration>] -->
