---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: MetabaseGlobalPluginsConfig
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/MetabaseGlobalPluginsConfig.md'
layout: new-docs
---

```ts
type MetabaseGlobalPluginsConfig = MetabasePluginsConfig & {
  handleLink?: (url: string) => {
    handled: boolean;
  };
};
```

## Type Declaration

<!-- [<snippet type-declaration>] -->

| Name            | Type                                             |
| :-------------- | :----------------------------------------------- |
| `handleLink()?` | (`url`: `string`) => \{ `handled`: `boolean`; \} |

<!-- [<endsnippet type-declaration>] -->
