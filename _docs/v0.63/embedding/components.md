---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Modular embedding components'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/components.md'
layout: new-docs
summary: 'Embed dashboards, questions, query builder, AI chat, and a collection browser.'
---

# Modular embedding components

There are different components you can embed, each with various options.

> While you can use component parameters to show or hide parts of the embedded component, these parameters are _not_ a substitute for [permissions](../permissions/start). Even if you hide stuff, people could still grab their token from the frontend and use it to query the Metabase API.

This page covers what you can embed. For theming your embeds, see [Appearance](./appearance).

> Depending on the framework you're using, you may need to stringify attributes before passing them to the embedded components.

## Dashboard

- [Embed a dashboard](./dashboard)
- [Dashboard component reference](./dashboard-reference), for `<metabase-dashboard>` attributes and SDK props

## Question

- [Embed a chart](./chart)
- [Embed a query editor](./query-builder)
- [Question component reference](./question-reference), for `<metabase-question>` attributes and SDK props

## Browser

{% include plans-blockquote.html feature="Browser component" convert_pro_link_to_embedding=true%}

- [Embed a collection browser](./browser)
- [Browser component reference](./browser-reference), for `<metabase-browser>` attributes and SDK props

## AI chat

{% include plans-blockquote.html feature="AI chat component" convert_pro_link_to_embedding=true%}

AI chat component is only available for authenticated modular embeds. It's unavailable for [Guest embeds](./guest-embedding).

To render the AI chat interface:

```html
<metabase-metabot></metabase-metabot>
```

If you're using the SDK, you can use either the [`MetabotQuestion`](./sdk/ai-chat#example) component or the [`useMetabot`](./sdk/ai-chat#building-custom-ai-chat-uis-with-usemetabot) hook for a custom UI.

### Attributes

{% include_file "{{ dirname }}/eajs/snippets/MetabaseMetabotAttributes.md" snippet="properties" %}

## Customizing loader and error components

{% include plans-blockquote.html feature="Customizing loader and error components" convert_pro_link_to_embedding=true%}

If you're using the [modular embedding SDK](./sdk/introduction), you can provide your own components for loading and error states by specifying `loaderComponent` and `errorComponent` as props to `MetabaseProvider`.

```tsx
{% include_file "{{ dirname }}/sdk/snippets/appearance/customizing-loader-and-components.tsx" snippet="imports" %}

{% include_file "{{ dirname }}/sdk/snippets/appearance/customizing-loader-and-components.tsx" snippet="example" %}
```

## Further reading

- [Appearance](./appearance)
- [Modular embedding SDK](./sdk/introduction).
