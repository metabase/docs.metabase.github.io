---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: SdkQuestionEntityPublicProps
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/SdkQuestionEntityPublicProps.md
layout: new-docs
latest: true
---

```ts
type SdkQuestionEntityPublicProps =
  | {
      questionId: SdkQuestionId | null;
      token?: never;
    }
  | {
      questionId?: never;
      token: SdkEntityToken | null;
    };
```

## Type Declaration

<!-- [<snippet type-declaration>] -->

```ts
{
  questionId: SdkQuestionId | null;
  token?: never;
}
```

| Name         | Type                                                | Description                                                                                                                                                                                                                                                                                                                             |
| :----------- | :-------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `questionId` | [`SdkQuestionId`](./api/SdkQuestionId) \| `null` | The ID of the question. <br/> This is either: <br/> - the numerical ID when accessing a question link, i.e. `http://localhost:3000/question/1-my-question` where the ID is `1` <br/> - the string ID found in the `entity_id` key of the question object when using the API directly or using the SDK Collection Browser to return data |
| `token?`     | `never`                                             | -                                                                                                                                                                                                                                                                                                                                       |

```ts
{
  questionId?: never;
  token: SdkEntityToken | null;
}
```

| Name          | Type                                                  | Description                            |
| :------------ | :---------------------------------------------------- | :------------------------------------- |
| `questionId?` | `never`                                               | -                                      |
| `token`       | [`SdkEntityToken`](./api/SdkEntityToken) \| `null` | A valid JWT token for the guest embed. |

<!-- [<endsnippet type-declaration>] -->
