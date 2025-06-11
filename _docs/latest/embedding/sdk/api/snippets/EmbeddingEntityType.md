---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: EmbeddingEntityType
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/EmbeddingEntityType.md
layout: new-docs
latest: true
---

```ts
type EmbeddingEntityType = "model" | "table" | "question";
```

`question` only works on multi-stage data picker, not the simple data picker.
The reason being that we want to streamline user experience for simple embedding
use cases, but `question` was later added to support users who are used to
selecting Saved questions in interactive embedding, so this is special case.
