---
version: docs-workflow-test-run
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedding introduction'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/introduction.md'
redirect_from:
    - /docs/docs-workflow-test-run/administration-guide/13-embedding
---

# Embedding introduction

You can embed Metabase tables, charts, and dashboards—even Metabase's query builder—in your website or application.

Here are the different ways you can embed Metabase.

{% include shared/in-page-promo-embedding-workshop.html %}

## Embedded analytics SDK with React

With the [Embedded analytics SDK](./sdk/introduction), you can embed individual Metabase components with React (like standalone charts, dashboards, the query builder, and more). You can manage access and interactivity per component, and you have advanced customization for seamless styling.

**When to use the Embedded analytics SDK**: you want the most control over how you embed Metabase in your React app.

## Interactive embedding

Interactive embedding is the only kind of embedding that [integrates with SSO and data permissions](./interactive-embedding) to enable true self-service access to the underlying data.

**When to use interactive embedding**: you want to [offer multi-tenant, self-service analytics](/blog/why-full-app-embedding). With interactive embedding, people can create their own questions, dashboards, models, and more, all in their own data sandbox.

## Static embedding

Also known as signed embedding, [static embedding](./static-embedding) is a secure way to embed charts and dashboards.

**When to use static embedding**: you don't want to offer ad-hoc querying or chart drill-through. To filter data relevant to the viewer, you can use static embeds with [locked parameters](./static-embedding-parameters#locked-parameters-limit-the-values-available-to-other-editable-parameters).

## Public links and embeds

If you'd like to share your data with the good people of the internet, admins can create a [public link](./public-links) or embed a question or dashboard directly in your website.

**When to use public links and embeds**: public links and embeds are good for one-off charts and dashboards. Admins can use them when you just need to show someone a chart or dashboard without giving people access to your Metabase. And you don't care who sees the data; you want to make those stats available to everyone.

## Comparison of embedding types

| Action                                                                                                                          | [Embedded analytics SDK](./sdk/introduction) | [Interactive](./interactive-embedding) | [Static](./static-embedding) | [Public](../embedding/public-links) |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------- | ------------------------------- | -------------------------------------- |
| Display charts and dashboards                                                                                                   | ✅                                              | ✅                                        | ✅                              | ✅                                     |
| Display interactive [filter widgets](/glossary/filter-widget)                                           | ✅                                              | ✅                                        | ✅                              | ✅                                     |
| Export results\*                                                                                                                | ✅                                              | ✅                                        | ✅                              | ✅                                     |
| Restrict data with [locked filters](./static-embedding-parameters#restricting-data-in-a-static-embed-with-locked-parameters) | ❌                                              | ❌                                        | ✅                              | ❌                                     |
| Restrict data with [sandboxes](../permissions/data-sandboxes)                                                                | ✅                                              | ✅                                        | ❌                              | ❌                                     |
| Use the [drill-through menu](/learn/metabase-basics/querying-and-dashboards/questions/drill-through)    | ✅                                              | ✅                                        | ❌                              | ❌                                     |
| Self-serve via [query builder](/glossary/query_builder)                                                 | ✅                                              | ✅                                        | ❌                              | ❌                                     |
| View usage of embeds with [usage analytics](../usage-and-performance-tools/usage-analytics)                                  | ✅                                              | ✅                                        | ❌                              | ❌                                     |
| [Actions on dashboards](../dashboards/actions)                                                                               | ✅                                              | ✅                                        | ❌                              | ❌                                     |
| Embed individual Metabase components                                                                                            | ✅                                              | ❌                                        | ❌                              | ❌                                     |
| Manage access and interactivity per component                                                                                   | ✅                                              | ❌                                        | ❌                              | ❌                                     |

\* Each embedding type allows data downloads by default, but only [Pro and Enterprise](/pricing/) plans can disable data downloads.

## Switching from static to interactive embedding

[Interactive embedding](./interactive-embedding) requires authentication via single sign-on (SSO), so you'll need to set that up both in your Metabase and in your application's server. Check out our [Interactive embedding quick start](/docs/latest/embedding/interactive-embedding-quick-start-guide).

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/metabase-basics/embedding/overview).
- [Publishing data visualizations to the web](/learn/metabase-basics/embedding/charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).
