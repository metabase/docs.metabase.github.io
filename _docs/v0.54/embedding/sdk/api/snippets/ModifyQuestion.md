---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: ModifyQuestion
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/ModifyQuestion.md'
layout: new-docs
---

```ts
function ModifyQuestion(props: BaseInteractiveQuestionProps): Element;
```

## Parameters

<!-- [<snippet parameters>] -->

| Parameter | Type                                                                    | Description |
| :-------- | :---------------------------------------------------------------------- | :---------- |
| `props`   | [`BaseInteractiveQuestionProps`](./api/BaseInteractiveQuestionProps) |             |

<!-- [<endsnippet parameters>] -->

## Returns

<!-- [<snippet returns>] -->

[`Element`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0b728411cd1dfb4bd26992bb35a73cf8edaa22e7/types/react/jsx-runtime.d.ts#L6)

<!-- [<endsnippet returns>] -->

## Deprecated

<!-- [<snippet deprecated>] -->

Use `InteractiveQuestion` with `isSaveEnabled={true}` instead.

<!-- [<endsnippet deprecated>] -->
