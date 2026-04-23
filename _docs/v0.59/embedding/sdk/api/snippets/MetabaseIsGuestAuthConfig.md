---
version: v0.59
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseIsGuestAuthConfig
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseIsGuestAuthConfig.md'
layout: new-docs
---

```ts
type MetabaseIsGuestAuthConfig = {
  metabaseInstanceUrl: string;
} & {
  apiKey?: never;
  fetchRequestToken?: never;
  isGuest: true;
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

| Name                   | Type    | Description                                      |
| :--------------------- | :------ | :----------------------------------------------- |
| `apiKey?`              | `never` | -                                                |
| `fetchRequestToken?`   | `never` | -                                                |
| `isGuest`              | `true`  | Defines if SDK should work in a Guest Embed mode |
| `preferredAuthMethod?` | `never` | -                                                |

<!-- [<endsnippet type-declaration>] -->
