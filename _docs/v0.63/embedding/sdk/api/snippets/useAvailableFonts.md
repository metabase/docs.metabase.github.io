---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useAvailableFonts
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useAvailableFonts.md'
layout: new-docs
latest: true
---

```ts
function useAvailableFonts(): {
  availableFonts: string[];
} | null;
```

Returns available fonts.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

\| \{
`availableFonts`: `string`[];
\}
\| `null`

<!-- [<endsnippet returns>] -->
