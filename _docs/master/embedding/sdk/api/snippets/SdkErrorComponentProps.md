---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkErrorComponentProps
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkErrorComponentProps.md'
layout: new-docs
---

```ts
type SdkErrorComponentProps = {
  message: ReactNode;
  onClose?: () => void;
  type?: "relative" | "fixed";
  withCloseButton?: boolean;
};
```

## Properties

<!-- [<snippet properties>] -->

| Property                                        | Type                                                                                                                                        |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="message"></a> `message`                  | [`ReactNode`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/index.d.ts#L478) |
| <a id="onclose"></a> `onClose?`                 | () => `void`                                                                                                                                |
| <a id="type"></a> `type?`                       | `"relative"` \| `"fixed"`                                                                                                                   |
| <a id="withclosebutton"></a> `withCloseButton?` | `boolean`                                                                                                                                   |

<!-- [<endsnippet properties>] -->
