---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: LoginStatus
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/LoginStatus.md'
layout: new-docs
---

```ts
type LoginStatus =
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
