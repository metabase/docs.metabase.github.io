---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: Embedding
title: 'Embedding overview'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/start.md'
layout: new-docs
redirect_from:
    - /docs/master/embedding
---

# Embedding overview

## [Introduction](./introduction)

What is embedding, and how does it work?

## [Interactive embedding](./interactive-embedding)

The solution to self-service customer analytics: embed the full Metabase app in your app. Interactive embedding integrates with your data permissions to let people slice and dice data on their own using Metabase's query builder.

## [Interactive embedding quickstart](./interactive-embedding-quick-start-guide)

You'll embed the full Metabase application in your app. Once logged in, people can view a Metabase dashboard in your web app, and be able to use the full Metabase application to explore their data, and only their data.

## [Interactive UI components](./interactive-ui-components)

Customize the UI components in your interactive embed by adding parameters to the embedding URL.

## [Embedded analytics SDK](./sdk/introduction)

With the Embedded analytics SDK, you can embed individual Metabase components with React (like standalone charts, dashboards, the query builder, and more). You can manage access and interactivity per component, and you have advanced customization for seamless styling.

## [Embedded analytics SDK quickstart](./sdk/quickstart)

Jump to a SDK quickstart with a sample React application.

## [Static embedding](./static-embedding)

Also known as Signed Embedding, Static embedding is a secure way to embed charts and dashboards. Static embeds are view only; people won't be able to drill-through charts and tables.

## [Parameters for static embeds](./static-embedding-parameters)

You can pass parameters between Metabase and your website via the embedding URL to specify how Metabase items should look and behave inside the iframe on your website.

## [Public embeds](./public-links)

Admins can also create unsecured public links or embeds of questions and dashboards.
