---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: useMetabot
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/useMetabot.md
layout: new-docs
latest: true
---

```ts
function useMetabot(): UseMetabotResult | null;
```

Returns the Metabot conversation API.

Returns `null` until the SDK bundle has loaded and `<MetabaseProvider>`
has mounted its internal subscriber. Guard before use:

## Returns

<!-- [<snippet returns>] -->

[`UseMetabotResult`](./api/UseMetabotResult) \| `null`

<!-- [<endsnippet returns>] -->

## Example

<!-- [<snippet example>] -->

```ts
const metabot = useMetabot();
if (!metabot) {
  return <Spinner />;
}
metabot.submitMessage("Show me orders");

@function
```

<!-- [<endsnippet example>] -->
