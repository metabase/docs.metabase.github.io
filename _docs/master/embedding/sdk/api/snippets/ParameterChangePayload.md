---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ParameterChangePayload
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ParameterChangePayload.md'
layout: new-docs
---

```ts
type ParameterChangePayload = {
  defaultParameters: ParameterValues;
  lastUsedParameters: ParameterValues;
  parameters: ParameterValues;
  source: ParameterChangeSource;
};
```

Payload passed to `onParametersChange` callback

## Properties

<!-- [<snippet properties>] -->

| Property                                             | Type                                                      |
| :--------------------------------------------------- | :-------------------------------------------------------- |
| <a id="defaultparameters"></a> `defaultParameters`   | [`ParameterValues`](./api/ParameterValues)             |
| <a id="lastusedparameters"></a> `lastUsedParameters` | [`ParameterValues`](./api/ParameterValues)             |
| <a id="parameters"></a> `parameters`                 | [`ParameterValues`](./api/ParameterValues)             |
| <a id="source"></a> `source`                         | [`ParameterChangeSource`](./api/ParameterChangeSource) |

<!-- [<endsnippet properties>] -->
