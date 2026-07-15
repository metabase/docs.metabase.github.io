---
version: v0.62
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
layout: new-docs
---

# Example markdown astro page

## Liquid include examples

{% include plans-blockquote.html feature="Authenticated embeds" sdk=true is_plural=true%}

{% include youtube.html id='yTRzCQeTmO8' %}

{% include beta-blockquote.html %}

## Custom include_file examples

Whole file (remove snippet comments):

```js
{% include_file "{{ dirname }}/sdk/snippets/next-js/app-router-authentication-api-route.ts" %}
```

Specific snippet:

```js
{% include_file "{{ dirname }}/sdk/snippets/authentication/auth-config-base.tsx" snippet="example" %}
```

## Miscellaneous edge cases

### Inline attribute lists

```
[Metabase Expert](/partners/){:target="_blank"}
```

gets rendered as [Metabase Expert](/partners/){:target="_blank"}.

### Inline code snippet

Inline backticks like `this` get rendered as inline code with no copy button.
