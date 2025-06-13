---
version: v0.55
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: InteractiveQuestionBackButtonProps
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/InteractiveQuestionBackButtonProps.md'
layout: new-docs
---

```ts
type InteractiveQuestionBackButtonProps = Omit<
  ActionIconProps & HTMLAttributes<HTMLButtonElement>,
  "noLink" | "onClick"
>;
```

**`Expand`**
