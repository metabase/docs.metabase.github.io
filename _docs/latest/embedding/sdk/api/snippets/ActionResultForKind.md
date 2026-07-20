---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ActionResultForKind
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ActionResultForKind.md
layout: new-docs
latest: true
---

```ts
type ActionResultForKind<TKind> = TKind extends "create"
  ? ActionResultForCreate
  : TKind extends "update"
    ? ActionResultForUpdate
    : TKind extends "delete"
      ? ActionResultForDelete
      : TKind extends "bulk"
        ? ActionResultForBulk
        : TKind extends "sql"
          ? ActionResultForSql
          : AnyActionResult;
```

Maps an `ActionKind` literal to the discriminated `result` shape. Omit
`TKind` (`undefined`) to fall back to the `AnyActionResult` union.

## Type Parameters

<!-- [<snippet type-parameters>] -->

| Type Parameter                                                       |
| :------------------------------------------------------------------- |
| `TKind` _extends_ [`ActionKind`](./api/ActionKind) \| `undefined` |

<!-- [<endsnippet type-parameters>] -->
