---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useCurrentUser
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useCurrentUser.md
layout: new-docs
latest: true
---

```ts
function useCurrentUser(): MetabaseUser | null;
```

Returns the current user.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

[`MetabaseUser`](./api/MetabaseUser) \| `null`

<!-- [<endsnippet returns>] -->
