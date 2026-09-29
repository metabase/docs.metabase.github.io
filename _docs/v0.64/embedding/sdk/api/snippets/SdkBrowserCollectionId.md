---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkBrowserCollectionId
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkBrowserCollectionId.md'
layout: new-docs
---

```ts
type SdkBrowserCollectionId = SdkCollectionId | "all";
```

`SdkCollectionId` plus `"all"`, a virtual read-only top level showing
everything the current user can access.
