---
version: v0.60
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useAvailableFonts
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useAvailableFonts.md'
layout: new-docs
---

```ts
function useAvailableFonts(): null | {
  availableFonts: string[];
};
```

Returns available fonts.
Returns `null` until the SDK is fully loaded and initialized.

## Returns

<!-- [<snippet returns>] -->

\| `null`
\| \{
`availableFonts`: `string`[];
\}

<!-- [<endsnippet returns>] -->
