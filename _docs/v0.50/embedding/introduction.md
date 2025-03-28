---
version: v0.50
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedding introduction'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/introduction.md'
layout: new-docs
redirect_from:
    - /v0.50/administration-guide/13-embedding
---

# Embedding introduction

You can embed Metabase tables, charts, and dashboards—even Metabase's query builder—in your website or application.

## Different ways to embed

There are three ways to embed Metabase in your app:

- [Interactive embedding](#interactive-embedding)
- [Static embedding](#static-embedding)
- [Public links and embeds](#public-links-and-embeds)

## Interactive embedding

Interactive embedding is the only kind of embedding that [integrates with SSO and data permissions](./interactive-embedding) to enable true self-service access to the underlying data.

**When to use interactive embedding**: when you want to [offer multi-tenant, self-service analytics](/blog/why-full-app-embedding). With interactive embedding, people can create their own questions, dashboards, models, and more, all in their own data sandbox.

## Static embedding

Also known as signed embedding, [static embedding](./static-embedding) is a secure way to embed charts and dashboards.

**When to use static embedding**: you don’t want to give people ad hoc query access to their data for whatever reason, or you want to present data that applies to all of your tenants at once. For example, say you want to showcase some benchmarking stats: if you just want to make those stats available exclusively to your customers, you could use a signed embed.

## Public links and embeds

If you'd like to share your data with the good people of the internet, admins can create a [public link](../questions/sharing/public-links) or embed a question or dashboard directly in your website.

**When to use public links and embeds**: public links and embeds are good for one-off charts and dashboards. Admins can use them when you just need to show someone a chart or dashboard without giving people access to your Metabase. And you don't care who sees the data; you want to make those stats available to everyone.

## Comparison of embedding types

| Action                                                                                                                          | [Interactive](./interactive-embedding) | [Static](./static-embedding) | [Public](../questions/sharing/public-links) |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------- | ---------------------------------------------- |
| Display charts and dashboards                                                                                                   | ✅                                        | ✅                              | ✅                                             |
| Display interactive [filter widgets](/glossary/filter_widget)                                           | ✅                                        | ✅                              | ✅                                             |
| Restrict data with [locked filters](./static-embedding-parameters#restricting-data-in-a-static-embed-with-locked-parameters) | ❌                                        | ✅                              | ❌                                             |
| Restrict data with [sandboxes](../permissions/data-sandboxes)                                                                | ✅                                        | ❌                              | ❌                                             |
| Use the [drill-through menu](/learn/questions/drill-through)                                            | ✅                                        | ❌                              | ❌                                             |
| Self-serve via [query builder](/glossary/query_builder)                                                 | ✅                                        | ❌                              | ❌                                             |
| View usage of embeds with [usage analytics](../usage-and-performance-tools/usage-analytics)                                  | ✅                                        | ❌                              | ❌                                             |
| [Actions on dashboards](../dashboards/actions)                                                                               | ✅                                        | ❌                              | ❌                                             |

## Switching from static to interactive embedding

[Interactive embedding](./interactive-embedding) requires authentication via single sign-on (SSO), so you'll need to set that up both in your Metabase and in your application's server. Check out our [Interactive embedding quick start](/learn/customer-facing-analytics/interactive-embedding-quick-start).

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/embedding/embedding-overview).
- [Publishing data visualizations to the web](/learn/embedding/embedding-charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).
