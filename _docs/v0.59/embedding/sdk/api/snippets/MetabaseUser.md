---
version: v0.59
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseUser
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseUser.md'
layout: new-docs
---

```ts
type MetabaseUser = {
  common_name: string;
  date_joined: string;
  email: string;
  first_login: string;
  first_name: string | null;
  id: SdkUserId;
  last_login: string;
  last_name: string | null;
  locale: string | null;
};
```

The User entity

## Properties

<!-- [<snippet properties>] -->

| Property                               | Type                              |
| :------------------------------------- | :-------------------------------- |
| <a id="common_name"></a> `common_name` | `string`                          |
| <a id="date_joined"></a> `date_joined` | `string`                          |
| <a id="email"></a> `email`             | `string`                          |
| <a id="first_login"></a> `first_login` | `string`                          |
| <a id="first_name"></a> `first_name`   | `string` \| `null`                |
| <a id="id"></a> `id`                   | [`SdkUserId`](./api/SdkUserId) |
| <a id="last_login"></a> `last_login`   | `string`                          |
| <a id="last_name"></a> `last_name`     | `string` \| `null`                |
| <a id="locale"></a> `locale`           | `string` \| `null`                |

<!-- [<endsnippet properties>] -->
