---
version: v0.59
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ButtonProps
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ButtonProps.md'
layout: new-docs
---

```ts
type ButtonProps = ButtonProps_2 & {
  animate?: boolean;
  highlightOnHover?: boolean;
  type?: "button" | "submit";
} & HTMLAttributes<HTMLButtonElement>;
```

## Type Declaration

<!-- [<snippet type-declaration>] -->

| Name                | Type                     |
| :------------------ | :----------------------- |
| `animate?`          | `boolean`                |
| `highlightOnHover?` | `boolean`                |
| `type?`             | `"button"` \| `"submit"` |

<!-- [<endsnippet type-declaration>] -->
