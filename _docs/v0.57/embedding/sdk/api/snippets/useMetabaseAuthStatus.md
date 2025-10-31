---
version: v0.57
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useMetabaseAuthStatus
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useMetabaseAuthStatus.md'
layout: new-docs
---

```ts
function useMetabaseAuthStatus(): null | LoginStatus;
```

Returns the authentication status of the current user in the Metabase embedding SDK.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

`null` \| [`LoginStatus`](./api/LoginStatus)

<!-- [<endsnippet returns>] -->
