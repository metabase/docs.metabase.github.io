---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseAuthConfigWithSaml
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseAuthConfigWithSaml.md'
layout: new-docs
---

```ts
type MetabaseAuthConfigWithSaml = {
  metabaseInstanceUrl: string;
} & {
  apiKey?: never;
  fetchRequestToken?: never;
  preferredAuthMethod?: "saml";
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

| Name                   | Type     | Description                                                                                                                                             |
| :--------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey?`              | `never`  | -                                                                                                                                                       |
| `fetchRequestToken?`   | `never`  | -                                                                                                                                                       |
| `preferredAuthMethod?` | `"saml"` | Which authentication method to use. If both SAML and JWT are enabled at the same time, it defaults to SAML unless the preferredAuthMethod is specified. |

<!-- [<endsnippet type-declaration>] -->
