---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ChartColorV2
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ChartColorV2.md'
layout: new-docs
latest: true
---

```ts
type ChartColorV2 =
  | string
  | {
      base: string;
      shade?: string;
      tint?: string;
    }
  | null;
```

Chart color definition for V2 themes.

Can be a simple color string or an object with base/tint/shade variants.

## Type Declaration

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

`null`

<!-- [<endsnippet type-declaration>] -->
