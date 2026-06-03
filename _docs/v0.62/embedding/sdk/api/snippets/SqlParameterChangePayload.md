---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SqlParameterChangePayload
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SqlParameterChangePayload.md'
layout: new-docs
---

```ts
type SqlParameterChangePayload = {
  defaultParameters: ParameterValues;
  parameters: ParameterValues;
  source: SqlParameterChangeSource;
};
```

Payload passed to `onSqlParametersChange` callback

## Properties

<!-- [<snippet properties>] -->

| Property                                           | Type                                                            |
| :------------------------------------------------- | :-------------------------------------------------------------- |
| <a id="defaultparameters"></a> `defaultParameters` | [`ParameterValues`](./api/ParameterValues)                   |
| <a id="parameters"></a> `parameters`               | [`ParameterValues`](./api/ParameterValues)                   |
| <a id="source"></a> `source`                       | [`SqlParameterChangeSource`](./api/SqlParameterChangeSource) |

<!-- [<endsnippet properties>] -->
