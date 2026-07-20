---
version: v0.63
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
function useMetabaseAuthStatus(): InitializationStatus | null;
```

Returns the authentication status of the current user in the Metabase embedding SDK.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

[`InitializationStatus`](./api/InitializationStatus) \| `null`

<!-- [<endsnippet returns>] -->
