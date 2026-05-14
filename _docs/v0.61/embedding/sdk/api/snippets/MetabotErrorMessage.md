---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabotErrorMessage
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabotErrorMessage.md'
layout: new-docs
latest: true
---

```ts
type MetabotErrorMessage = {
  message: string;
  type: "message" | "alert" | "locked";
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                       | Type                                   | Description                                                                               |
| :----------------------------- | :------------------------------------- | :---------------------------------------------------------------------------------------- |
| <a id="message"></a> `message` | `string`                               | -                                                                                         |
| <a id="type"></a> `type`       | `"message"` \| `"alert"` \| `"locked"` | `"alert"` renders with a warning icon and error color; `"message"` renders as plain text. |

<!-- [<endsnippet properties>] -->
