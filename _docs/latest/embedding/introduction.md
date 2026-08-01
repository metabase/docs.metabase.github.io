---
version: v0.63
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

You can embed Metabase tables, charts, dashboards, AI chat---even Metabase's query builder---in your website or application.

There are two ways to embed Metabase.

- **[Modular embedding](#modular-embedding)**: embed individual Metabase components, like questions, dashboards, and AI chat, so they seamlessly integrate with your app.
- **[Full app embedding](#full-app-embedding)**: embed the full Metabase app in an iframe, styled like your branding.

Most people go with modular embedding, so you can integrate Metabase components into your app.

If you just want to share a chart or dashboard with anyone who has the link, and you don't need any authentication, take a look at [public links and embeds](#public-links-and-embeds).

## Modular embedding

With [modular embedding](./modular-embedding), you can embed individual Metabase components in your web app. You can use guest embeds for basic functionality, or use SSO to take full advantage of Metabase.

You can use two different ways to authenticate modular embeds:

- [SSO](#sso-embeds)
- [Guest](#guest-embedding)

### SSO embeds

With SSO, Metabase can know who's viewing what, which unlocks a lot of power. You can automatically apply [data permissions](../permissions/embedding), which means you can give people access to all the cool tools Metabase provides, and everyone will only ever see the data they're allowed to.

**When to use SSO**: You want to offer multi-tenant, self-service analytics, or you want to include the query builder, AI chat, drill-through, or a collection browser.

If you're building a SaaS product with embedded analytics for multiple customers, you can keep customer data isolated with [Tenants](./tenants).

Accounts for these embedded users in your Metabase count toward the [accounts billed in your Metabase plan](/docs/latest/cloud/how-billing-works). But by letting your customers self-serve their data, you save time on developing bespoke charts. And you can charge _more_ for a premium analytics experience. If you plan on giving a lot of your customers self-service access to their data, you should consider an enterprise plan, with custom pricing that scales with your business.

### Guest embedding

[Guest embeds](./guest-embedding) are a secure way to embed charts and dashboards. Guest embedding works on all Metabase plans, including OSS and Starter.

**When to use guest embeds**: simple embedding use cases where you don't want to offer ad-hoc querying or chart drill-through. To filter data relevant to the viewer, you can use guest embeds with [locked parameters](./guest-embedding#locked-parameters).

### Set up modular embeds with web components or React

Whichever way you authenticate, you can set up modular embeds two ways.

- **Web components**: a script tag plus HTML elements like `<metabase-question>`. Web components have no build step and no framework requirement, so they work in plain HTML, Vue, Svelte, Rails, React, or any framework you like. Metabase's [in-app wizard](./modular-embedding) writes the code for you.
- **React SDK**: React components that you import and compose yourself. The [SDK](./sdk/introduction) gives you more control: you can build custom layouts and [customize behavior with plugins](./sdk/plugins).

If your app runs on React and you want that extra control, go with the SDK. Otherwise start with web components. You can always move to the SDK later.

## Comparison between SSO and guest embeds

All SSO options require a Pro or Enterprise plan.

| Feature                                                                                   | SSO | Guest |
| ----------------------------------------------------------------------------------------- | --- | ----- |
| Charts                                                                                    | ✅  | ✅    |
| Dashboards                                                                                | ✅  | ✅    |
| [Filter widgets](/glossary/filter-widget)                         | ✅  | ✅    |
| Export results\*                                                                          | ✅  | ✅    |
| [Basic appearance customization](../configuring-metabase/appearance)\*\*               | ✅  | ✅    |
| Row-level data segregation                                                                | ✅  | ✅    |
| [Drill-through menus](../questions/visualizations/drill-through)                       | ✅  | ❌    |
| [Query builder](../questions/query-builder/editor)                                     | ✅  | ❌    |
| [SQL editor](../questions/native-editor/writing-sql)                                   | ✅  | ❌    |
| [AI chat](./sdk/ai-chat)                                                               | ✅  | ❌    |
| [Collection browser](./sdk/collections)                                                | ✅  | ❌    |
| Advanced [Tenant](./tenants) and [permissions](../permissions/embedding) management | ✅  | ❌    |
| [Advanced theming](./appearance)                                                       | ✅  | ❌    |
| [Usage analytics](../usage-and-performance-tools/usage-analytics)                      | ✅  | ❌    |
| Customize layouts and behavior with [plugins](./sdk/plugins)                           | ✅  | ❌    |
| [Locked filters](./guest-embedding#locked-parameters)\*\*\*                            | ❌  | ✅    |

\* Each embedding type allows data downloads by default, but only [Pro and Enterprise](/pricing/) plans can disable data downloads.

\*\* Requires a [Pro and Enterprise](/pricing/) plan for any embedding type.

\*\*\* SSO embeds don't need locked filters. Since Metabase knows who's viewing an SSO embed, you can segregate data with [permissions](../permissions/embedding) instead. There's a little more set up, but much less long-term overhead.

## Full app embedding

[Full app embedding](./full-app-embedding) allows you to embed the entire Metabase app in an iframe, and integrate Metabase SSO with your app's authentication.

## Public links and embeds

If you'd like to share your data with the good people of the internet, admins can create a [public link](./public-links) or embed a question or dashboard directly in your website. A public link is a URL you can hand to anyone. A public embed is an iframe snippet you drop into one of your pages. Neither one is really an embedding setup — there's no authentication, and anyone with the link can see the data.

**When to use public links and embeds**: one-off charts and dashboards. Admins can use public links when you just need to show someone a chart or dashboard without giving people access to your Metabase. And you don't care who sees the data; you want to make the item available to everyone.

## Resources for AI agents

If you're using an AI agent to help you embed Metabase in your app, check out [AI agent resources](./ai-agent-resources).

## Tracking embed usage

{% include plans-blockquote.html feature="Tracking embed usage" %}

[Usage Analytics](../usage-and-performance-tools/usage-analytics) tracks embed usage, including embedding context, authentication methods, hostname, and other metadata. Check out the [Embedding usage dashboard](../usage-and-performance-tools/usage-analytics-reference#embedding-usage).

For information about the anonymous usage data Metabase collects from embedded components, see [Embedding telemetry](../installation-and-operation/information-collection#embedding-telemetry).

## Embedding limitations

- Currently, you can't embed [documents](../documents/introduction) (though you can create [public documents](./public-links)).
- Only the [Modular embedding SDK](./sdk/introduction) renders [custom visualizations](../questions/visualizations/custom), and only ones you allowlist with the [`allowedCustomVisualizations` prop](./sdk/config#custom-visualizations). In other embedding types, any card that uses a custom visualization falls back to the default visualization for the query's results.

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/metabase-basics/embedding/overview).
- [Publishing data visualizations to the web](/learn/metabase-basics/embedding/charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).
- [Securing embedded Metabase](./securing-embeds).
