---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ParameterChangeSource
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ParameterChangeSource.md'
layout: new-docs
---

```ts
type ParameterChangeSource = "initial-state" | "manual-change" | "auto-change";
```

Source of a parameter-change event:

- `initial-state` - first applied snapshot, fired once per dashboard load.
- `manual-change` - user edited parameters in UI.
- `auto-change` - in the case of auto-updates, e.g. to pass normalized values back to parent.
