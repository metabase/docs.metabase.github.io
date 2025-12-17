---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useCurrentUser
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useCurrentUser.md'
layout: new-docs
---

```ts
function useCurrentUser(): null | MetabaseUser;
```

Returns the current user.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

`null` \| [`MetabaseUser`](./api/MetabaseUser)

<!-- [<endsnippet returns>] -->
