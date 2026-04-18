---
version: v0.60
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Embedding introduction
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/introduction.md
layout: new-docs
summary: >-
  Different ways you can embed charts and dashboards, or all of Metabase, in
  your app.
redirect_from:
  - /docs/latest/administration-guide/13-embedding
latest: true
---

# Embedding introduction

{% include shared/in-page-promo-embedding-workshop.html %}

You can embed Metabase tables, charts, and dashboards—even Metabase's query builder—in your website or application. Here are the different ways you can embed Metabase:

- [Modular embedding](#modular-embedding)
- [Full app embedding](#full-app-embedding)
- [Public links](#public-links-and-embeds)

## Modular embedding

With [modular embedding](./modular-embedding), you can embed individual Metabase components in your web app. You can use guest embeds for basic functionality, or use SSO to take full advantage of Metabase.

You can use two different ways to authenticate modular embeds:

- [SSO](#modular-embedding)
- [Guest](#guest-embedding)

Here's a basic breakdown of what each auth type enables:

| Component                                             | SSO | Guest |
| ----------------------------------------------------- | --- | ----- |
| Chart                                                 | ✅  | ✅    |
| Chart with drill-through                              | ✅  | ❌    |
| Dashboard                                             | ✅  | ✅    |
| Dashboard with drill-through                          | ✅  | ❌    |
| [Query builder](../questions/query-builder/editor) | ✅  | ❌    |
| Browser to navigate collections                       | ✅  | ❌    |
| Metabot AI chat                                       | ✅  | ❌    |

Currently, you can't embed [documents](../documents/introduction).

### SSO embeds

With SSO, Metabase can know who's viewing what, which unlocks a lot of power. You can automatically apply [data permissions](../permissions/embedding), which means you can give people access to all the cool tools Metabase provides, and everyone will only ever see the data they're allowed to.

**When to use SSO**: You want to offer multi-tenant, self-service analytics, or you want to include the query builder, AI chat, drill-through, or a collection browser.

If you're building a SaaS product with embedded analytics for multiple customers, you can keep customer data isolated with [Tenants](./tenants).

### Guest embedding

[Guest embeds](./guest-embedding) are a secure way to embed charts and dashboards. Guest embedding works on all Metabase plans, including OSS and Starter.

**When to use guest embeds**: simple embedding use cases where you don't want to offer ad-hoc querying or chart drill-through. To filter data relevant to the viewer, you can use guest embeds with [locked parameters](./guest-embedding#locked-parameters).

## Public links and embeds

If you'd like to share your data with the good people of the internet, admins can create a [public link](./public-links) or embed a question or dashboard directly in your website.

**When to use public links and embeds**: One-off charts and dashboards. Admins can use public links when you just need to show someone a chart or dashboard without giving people access to your Metabase. And you don't care who sees the data; you want to make the item available to everyone.

## Full app embedding

[Full app embedding](./full-app-embedding) allows you to embed the entire Metabase app in an iframe, and integrate Metabase SSO with your app's authentication.

## Comparison of embedding types

| Action                                                                                                               | [Modular SDK](./sdk/introduction) | [Modular SSO](./modular-embedding) | [Modular Guest](./guest-embedding) | [Full app](./full-app-embedding) | [Public](../embedding/public-links) |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------- | ------------------------------------- | ----------------------------------- | -------------------------------------- |
| Charts and dashboards                                                                                                | ✅                                   | ✅                                    | ✅                                    | ✅                                  | ✅                                     |
| [Filter widgets](/glossary/filter-widget)                                                    | ✅                                   | ✅                                    | ✅                                    | ✅                                  | ✅                                     |
| Export results\*                                                                                                     | ✅                                   | ✅                                    | ✅                                    | ✅                                  | ✅                                     |
| [Locked filters](./static-embedding-parameters#restricting-data-in-a-static-embed-with-locked-parameters)         | ❌                                   | ❌                                    | ✅                                    | ❌                                  | ❌                                     |
| [Data segregation](../permissions/embedding)                                                                      | ✅                                   | ✅                                    | ❌                                    | ✅                                  | ❌                                     |
| [Drill-through menu](/learn/metabase-basics/querying-and-dashboards/questions/drill-through) | ✅                                   | ✅                                    | ❌                                    | ✅                                  | ❌                                     |
| [Query builder](../questions/query-builder/editor)                                                                | ✅                                   | ✅                                    | ❌                                    | ✅                                  | ❌                                     |
| [Basic appearance customization](../configuring-metabase/appearance)\*\*                                          | ✅                                   | ✅                                    | ✅                                    | ✅                                  | ✅                                     |
| [Advanced theming](./appearance)                                                                                  | ✅                                   | ✅                                    | ❌                                    | ❌                                  | ❌                                     |
| [Usage analytics](../usage-and-performance-tools/usage-analytics)                                                 | ✅                                   | ✅                                    | ❌                                    | ✅                                  | ❌                                     |
| Embed individual Metabase components                                                                                 | ✅                                   | ✅                                    | ❌                                    | ❌                                  | ❌                                     |
| Manage access and interactivity per component                                                                        | ✅                                   | ✅                                    | ❌                                    | ❌                                  | ❌                                     |
| Custom layouts                                                                                                       | ✅                                   | ❌                                    | ❌                                    | ❌                                  | ❌                                     |
| Customize behavior with [plugins](./sdk/plugins)                                                                  | ✅                                   | ❌                                    | ❌                                    | ❌                                  | ❌                                     |
| AI chat                                                                                                              | ✅                                   | ✅                                    | ❌                                    | ✅                                  | ❌                                     |

\* Each embedding type allows data downloads by default, but only [Pro and Enterprise](/pricing/) plans can disable data downloads.

\*\* Requires a [Pro and Enterprise](/pricing/) plan for any embedding type.

### Should you use the Modular embedding SDK?

If your app uses React, you can go with the modular embedding SDK, but you don't need to.

The modular embeds that you can set up in the [in-app wizard](./modular-embedding) are built on top of the Modular embedding SDK. Using the SDK just gives you slightly more customization (see the table above), but your app has to use React. You can always start with modular embedding, then move to the SDK if you really need that extra customization. Both support SSO and Guest embeds.

## Resources for AI agents

If you're using an AI agent to help you embed Metabase in your app, check out [AI agent resources](./ai-agent-resources).

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/metabase-basics/embedding/overview).
- [Publishing data visualizations to the web](/learn/metabase-basics/embedding/charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).
- [Securing embedded Metabase](./securing-embeds).
