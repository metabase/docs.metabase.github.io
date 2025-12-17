---
version: v0.56
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseDataPointObject
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseDataPointObject.md'
layout: new-docs
---

```ts
type MetabaseDataPointObject = {
  column?: Record<string, any>;
  data?: {
    col: Record<string, any> | null;
    value: string | number | null | boolean;
  }[];
  event?: MouseEvent;
  value?: string | number | null | boolean;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                      | Type                                                                                                                                                                                              |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="column"></a> `column?` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\>                                                                                    |
| <a id="data"></a> `data?`     | \{ `col`: \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\> \| `null`; `value`: `string` \| `number` \| `null` \| `boolean`; \}[] |
| <a id="event"></a> `event?`   | [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)                                                                                                                             |
| <a id="value"></a> `value?`   | `string` \| `number` \| `null` \| `boolean`                                                                                                                                                       |

<!-- [<endsnippet properties>] -->
