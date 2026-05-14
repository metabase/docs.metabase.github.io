---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: InitializationStatus
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/InitializationStatus.md'
layout: new-docs
latest: true
---

```ts
type InitializationStatus =
  | {
      status: "uninitialized";
    }
  | {
      status: "success";
    }
  | {
      status: "loading";
    }
  | {
      error: Error;
      status: "error";
    };
```
