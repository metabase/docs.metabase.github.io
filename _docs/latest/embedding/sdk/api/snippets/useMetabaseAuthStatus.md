---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useMetabaseAuthStatus
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useMetabaseAuthStatus.md
layout: new-docs
latest: true
---

```ts
function useMetabaseAuthStatus(): null | InitializationStatus;
```

Returns the authentication status of the current user in the Metabase embedding SDK.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

`null` \| [`InitializationStatus`](./api/InitializationStatus)

<!-- [<endsnippet returns>] -->
