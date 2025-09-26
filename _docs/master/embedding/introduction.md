---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedding introduction'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/introduction.md'
layout: new-docs
redirect_from:
    - /docs/master/administration-guide/13-embedding
---

# Embedding introduction

You can embed Metabase tables, charts, and dashboards—even Metabase's query builder—in your website or application.

Here are the different ways you can embed Metabase.

{% include shared/in-page-promo-embedding-workshop.html %}

## Embedded analytics JS

With [Embedded analytics JS](./embedded-analytics-js), you can embed individual Metabase components in your web app with JavaScript — no React required. Choose from dashboards, questions, or the query builder, and configure per‑component options like drill‑through, parameters, downloads, and theming. Embedded Analytics JS integrates with [SSO](securing-embeds) and [data permissions](../permissions/embedding).

**When to use Embedded analytics JS**: You want to [offer multi-tenant, self-service analytics](/blog/why-full-app-embedding), you’re not using React (or want a drop‑in script) and want to embed Metabase components with per‑component controls and theming.

## Static embedding

Also known as signed embedding, [static embedding](./static-embedding) is a secure way to embed charts and dashboards.

**When to use static embedding**: you don't want to offer ad-hoc querying or chart drill-through. To filter data relevant to the viewer, you can use static embeds with [locked parameters](./static-embedding-parameters#locked-parameters-limit-the-values-available-to-other-editable-parameters).

## Public links and embeds

If you'd like to share your data with the good people of the internet, admins can create a [public link](./public-links) or embed a question or dashboard directly in your website.

**When to use public links and embeds**: public links and embeds are good for one-off charts and dashboards. Admins can use them when you just need to show someone a chart or dashboard without giving people access to your Metabase. And you don't care who sees the data; you want to make those stats available to everyone.

## Interactive embedding

[Interactive embedding](./interactive-embedding) allows you to embed the entire Metabase app in an iframe, and integrate Metabase SSO with your app's authentication.

## Comparison of embedding types

| Action                                                                                                                          | [React SDK](./sdk/introduction) | [JS](./embedded-analytics-js) | [Interactive](./interactive-embedding) | [Static](./static-embedding) | [Public](../embedding/public-links) |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------- | ----------------------------------------- | ------------------------------- | -------------------------------------- |
| Display charts and dashboards                                                                                                   | ✅                                 | ✅                               | ✅                                        | ✅                              | ✅                                     |
| Display interactive [filter widgets](/glossary/filter-widget)                                           | ✅                                 | ✅                               | ✅                                        | ✅                              | ✅                                     |
| Export results\*                                                                                                                | ✅                                 | ✅                               | ✅                                        | ✅                              | ✅                                     |
| Restrict data with [locked filters](./static-embedding-parameters#restricting-data-in-a-static-embed-with-locked-parameters) | ❌                                 | ❌                               | ❌                                        | ✅                              | ❌                                     |
| [Data segregation](../permissions/embedding)                                                                                 | ✅                                 | ✅                               | ✅                                        | ❌                              | ❌                                     |
| Use the [drill-through menu](/learn/metabase-basics/querying-and-dashboards/questions/drill-through)    | ✅                                 | ✅                               | ✅                                        | ❌                              | ❌                                     |
| Self-serve via [query builder](../questions/query-builder/editor)                                                            | ✅                                 | ✅                               | ✅                                        | ❌                              | ❌                                     |
| [Basic appearance customization](../configuring-metabase/appearance)\*\*                                                     | ✅                                 | ✅                               | ✅                                        | ✅                              | ✅                                     |
| [Advanced theming](./sdk/appearance)                                                                                         | ✅                                 | ✅                               | ❌                                        | ❌                              | ❌                                     |
| View usage of embeds with [usage analytics](../usage-and-performance-tools/usage-analytics)                                  | ✅                                 | ✅                               | ✅                                        | ❌                              | ❌                                     |
| [Actions on dashboards](../dashboards/actions)                                                                               | ✅                                 | ✅                               | ✅                                        | ❌                              | ❌                                     |
| Embed individual Metabase components                                                                                            | ✅                                 | ✅                               | ❌                                        | ❌                              | ❌                                     |
| Manage access and interactivity per component                                                                                   | ✅                                 | ✅                               | ❌                                        | ❌                              | ❌                                     |
| Custom layouts                                                                                                                  | ✅                                 | ❌                               | ❌                                        | ❌                              | ❌                                     |
| Customize behavior with [plugins](./sdk/plugins)                                                                             | ✅                                 | ❌                               | ❌                                        | ❌                              | ❌                                     |

\* Each embedding type allows data downloads by default, but only [Pro and Enterprise](/pricing/) plans can disable data downloads.

\*\* Requires [Pro and Enterprise](/pricing/) for any embedding type.

### Embedded analytics SDK vs JS

When deciding between the Embedded analytics SDK and Embedded analytics JS: if your app uses React, you should use the SDK. Otherwise, use the JS library. The JS library uses the SDK under the hood, but you can have more control with React and the SDK.

## Switching from static embedding to Embedded Analytics JS

[Embedded Analytics JS](./embedded-analytics-js) requires authentication via single sign-on (SSO), so you'll need to set that up both in your Metabase and in your application's server. Check out our [Modular embedding authentication](../embedding/sdk/authentication).

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/metabase-basics/embedding/overview).
- [Publishing data visualizations to the web](/learn/metabase-basics/embedding/charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).
- [Securing embedded Metabase](./securing-embeds)
