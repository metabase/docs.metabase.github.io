---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Modular embedding components
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/components.md'
layout: new-docs
summary: >-
  A map of the modular embedding docs: dashboards, charts, the query builder, a
  collection browser, and AI chat.
latest: true
---

# Modular embedding components

Modular embedding gives you a handful of components you can drop into your app, with either web components or the React SDK. This page maps out the docs for each one.

> While you can use attributes and props to show or hide parts of an embedded component, they're _not_ a substitute for [permissions](../permissions/start). Even if you hide stuff, people could still grab their token from the frontend and use it to query the Metabase API.

## Dashboard

Embed a dashboard view-only, interactive, or editable, and let people create dashboards from your app.

- [Embed a dashboard](./dashboard)
- [Dashboard component reference](./dashboard-reference), for `<metabase-dashboard>` attributes and SDK props

## Question

Embed a single chart, or the query builder and SQL editor so people can build questions from scratch.

- [Embed a chart](./chart)
- [Embed the query builder](./query-builder)
- [Question component reference](./question-reference), for `<metabase-question>` attributes and SDK props

## Browser

{% include plans-blockquote.html feature="Browser component" convert_pro_link_to_embedding=true%}

Embed a browsable collection, so people can find and open dashboards and questions themselves.

- [Embed a collection browser](./browser)
- [Browser component reference](./browser-reference), for `<metabase-browser>` attributes and SDK props

## AI chat

{% include plans-blockquote.html feature="AI chat component" convert_pro_link_to_embedding=true%}

Embed an AI chat, so people can ask questions of their data in natural language.

- [Embed an AI chat](./ai-chat), for the `<metabase-metabot>` attributes, the `MetabotQuestion` props, and the `useMetabot` hook

## Things you can only do with the React SDK

Web components cover the components above. A few features are React-only, because they take React components or hooks that an HTML attribute can't carry. For those, use the [Modular embedding SDK](./sdk/introduction).

- [Plugins](./sdk/plugins), to customize component menus and click actions
- [Actions](./sdk/actions), to run Metabase actions from your app with the `useAction` hook
- [Custom question layouts](./question-reference#customize-the-layout-of-an-interactive-chart), to lay out a question yourself with namespaced `InteractiveQuestion` components
- [Customize loading, error, and empty states](./sdk/loading-and-errors), to swap in your own loading and error components, and your own no-results image

## Further reading

- [Appearance](./appearance)
- [Modular embedding SDK config](./sdk/config), for the `MetabaseProvider` props
- [Modular embedding parameters](./parameters)
- [Translating embeds](./translations)
- [Authentication](./authentication)
- [Modular embedding SDK](./sdk/introduction)
