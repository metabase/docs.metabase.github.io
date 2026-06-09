---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SqlParameterChangeSource
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SqlParameterChangeSource.md'
layout: new-docs
latest: true
---

```ts
type SqlParameterChangeSource =
  | "initial-state"
  | "manual-change"
  | "auto-change";
```

Source of a sql-parameter-change event:

- `initial-state` - first applied state, fired once per question load.
- `manual-change` - user edited parameters in UI.
- `auto-change` - in the case of auto-updates, e.g. to pass normalized values back to parent.
