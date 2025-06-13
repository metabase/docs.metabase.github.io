---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseAuthConfigWithJwt
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseAuthConfigWithJwt.md'
layout: new-docs
---

```ts
type MetabaseAuthConfigWithJwt = {
  metabaseInstanceUrl: string;
} & {
  apiKey: never;
  fetchRequestToken: MetabaseFetchRequestTokenFn;
  preferredAuthMethod: "jwt";
};
```

## Type declaration

<!-- [<snippet type-declaration>] -->

| Name                  | Type     |
| :-------------------- | :------- |
| `metabaseInstanceUrl` | `string` |

<!-- [<endsnippet type-declaration>] -->

## Type declaration

<!-- [<snippet type-declaration>] -->

| Name                   | Type                                                                  | Description                                                                                                                                             |
| :--------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey?`              | `never`                                                               | -                                                                                                                                                       |
| `fetchRequestToken?`   | [`MetabaseFetchRequestTokenFn`](./api/MetabaseFetchRequestTokenFn) | Specifies a function to fetch the refresh token. The refresh token should be in the format of [UserBackendJwtResponse](./api/UserBackendJwtResponse) |
| `preferredAuthMethod?` | `"jwt"`                                                               | Which authentication method to use. If both SAML and JWT are enabled at the same time, it defaults to SAML unless the preferredAuthMethod is specified. |

<!-- [<endsnippet type-declaration>] -->
