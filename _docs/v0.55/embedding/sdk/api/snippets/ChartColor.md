---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ChartColor
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ChartColor.md'
layout: new-docs
latest: true
---

```ts
type ChartColor =
  | string
  | {
      base: string;
      shade?: string;
      tint?: string;
    };
```

## Type declaration

<!-- [<snippet type-declaration>] -->

`string`

```ts
{
  base: string;
  shade?: string;
  tint?: string;
}
```

| Name     | Type     | Description                         |
| :------- | :------- | :---------------------------------- |
| `base`   | `string` | -                                   |
| `shade?` | `string` | Darker variation of the base color  |
| `tint?`  | `string` | Lighter variation of the base color |

<!-- [<endsnippet type-declaration>] -->
