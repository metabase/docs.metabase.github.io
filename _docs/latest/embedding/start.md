---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: Embedding
title: Embedding overview
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/start.md'
layout: new-docs
redirect_from:
  - /docs/latest/embedding
latest: true
---

# Embedding overview

You can use Metabase as a BI tool for your own team, or embed Metabase in your app so your customers can explore their own data.

## [Introduction](./introduction)

What is embedding, and how does it work?

## [Modular embedding](./modular-embedding)

Embed individual dashboards, questions, or the query builder in your app with an interactive wizard and simple drop-in script, with minimal or no coding required. Control component UI and theming. Integrate your app's auth with Metabase SSO.

If you're on Metabase OSS or Starter, you can only embed components without SSO. See [Guest embeds](./guest-embedding).

### [Modular embedding SDK](./sdk/introduction)

With the Modular embedding SDK, you can embed individual Metabase components with React (like standalone charts, dashboards, the query builder, and more). You can manage access and interactivity per component, and you have advanced customization for seamless styling.

### [Modular embedding SDK quickstart](./sdk/quickstart)

Jump to a SDK quickstart with a sample React application.

### [Modular embedding components](./components)

A map of the components you can embed, with links to each component's docs and its attribute and prop reference.

### [Embed a dashboard](./dashboard)

Embed a dashboard, view-only or interactive, with web components or the React SDK. Let people edit and create dashboards from your app.

### [Dashboard component reference](./dashboard-reference)

Every `<metabase-dashboard>` attribute, the `StaticDashboard`, `InteractiveDashboard`, and `EditableDashboard` props, and the `dashboardCardMenu` plugin.

### [Embed a chart](./chart)

Embed a single chart, view-only or interactive, with web components or the React SDK.

### [Embed the query builder](./query-builder)

Embed Metabase's visual query builder or SQL editor, so people can build and save their own questions.

### [Question component reference](./question-reference)

Every `<metabase-question>` attribute, the `StaticQuestion` and `InteractiveQuestion` props, and the components you can use to build your own question layout.

### [Embed a collection browser](./browser)

Embed a browsable collection with web components or the React SDK, so people can find and open dashboards and questions themselves.

### [Browser component reference](./browser-reference)

Every `<metabase-browser>` attribute and the `CollectionBrowser` props.

### [Embed an AI chat](./ai-chat)

Embed an AI chat with web components or the React SDK, so people can ask questions of their data in natural language.

### [Guest embedding](./guest-embedding)

Guest embedding is a secure way to embed charts and dashboards. Guest embeds are view-only; people won't be able to drill-through charts and tables.

### [Customize loading, error, and empty states](./sdk/loading-and-errors)

Replace the React SDK's default loading screen, error screen, and no-results image with your own.

### [Translating embeds](./translations)

Upload a translation dictionary to translate questions and dashboards in modular embeds.

## [Full app embedding](./full-app-embedding)

Full app embedding allows you to embed full Metabase app in an iframe. Full app embedding integrates with your data permissions to let people slice and dice data on their own using Metabase's query builder.

### [Full app embedding quickstart](./full-app-embedding-quick-start-guide)

You'll embed the full Metabase application in your app. Once logged in, people can view a Metabase dashboard in your web app, and be able to use the full Metabase application to explore their data, and only their data.

### [Full app UI components](./full-app-ui-components)

Customize the UI components in your full app embed by adding parameters to the embedding URL.

## [Public embeds](./public-links)

Admins can also create unsecured public links or embeds of questions and dashboards.

## [Securing embeds](./securing-embeds)

How to make sure the right people can see the right data in your embedded Metabase.

## [AI agent resources](./ai-agent-resources)

Machine-readable docs and agent skills to help AI coding agents with embedding setup, upgrades, and migrations.
