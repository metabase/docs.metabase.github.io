---
title: "Why interactive embedding?"
summary: "If you want to offer customer analytics, you want interactive embedding."
date: 2022-12-15 00:10:18
last_updated_at: 2022-12-15 00:10:18
categories: "Using Metabase"
featured_image: /images/posts/full-app-embedding/full-app-embedding-abstract.jpg
image: /images/posts/full-app-embedding/full-app-embedding-abstract.jpg
author: The Metabase Team
layout: post
---

The goal of this article is twofold: 1) to advocate for the most _scalable_ way to provide customer-facing analytics in your application or service. And 2) to make it overwhelmingly clear which path you should take based on your situation and goals.

It's going to come off like an aggressive sell for interactive embedding, but it's really just some megaphoning to make sure people don't end up in a bad situation by trying to save money in the short term. Because if you want to offer customers analytics, you want interactive embedding. In fact, let's make that a heading:

## If you want to offer customer analytics, you want interactive embedding

There are essentially three ways to share Metabase questions and dashboards with the outside world:

- [Public links and embeds](/docs/latest/embedding/public-links)
- [Static embeds](/docs/latest/embedding/static-embedding)
- [Interactive embedding](/docs/latest/embedding/full-app-embedding)

Interactive embedding just means that you can embed the full Metabase application in your app. But that's not the "full" story; when you pay for interactive embedding, in addition to the self-serve query builder, you also get all the tools you'll need to manage customer analytics in your application:

- [SAML](/docs/latest/people-and-groups/authenticating-with-saml) and [JWT](/docs/latest/people-and-groups/authenticating-with-jwt) SSO integration to manage authentication
- [Data sandboxing](/docs/latest/permissions/data-sandboxes) to orchestrate permissions down to the rows and columns of tables, and
- [Whitelabeling tools](../docs/latest/configuring-metabase/appearance) to tailor charts' appearance to your app's branding.

Plus, with a paid plan you'll [remove the "Powered by Metabase"](/docs/latest/embedding/static-embedding#removing-the-powered-by-metabase-banner) footer on the charts.

With this setup, you can offer [multi-tenant, self-service analytics](/learn/customer-facing-analytics/multi-tenant-self-service-analytics). Multi-tenant meaning Customer A cannot see Customer B's data, and vice versa. And self-service meaning that all customers can create their own questions to run ad hoc queries, so you don't have to write those queries for them.

The reason that some people hesitate when considering interactive embedding (hence this article) is because they worry that interactive embedding is more expensive from both a labor and licensing perspective, and they think they might be able to get away with juggling static embeds with locked parameters to restrict data. There _is_ an upfront cost for interactive embedding, in terms of licensing and initial operational overhead. But the return on investment you'll get from a interactive setup dwarfs the ROI of maintaining alternative solutions (like a Metabase fork, or a bunch of signed embeds), especially as you try to keep up with a never-ending queue of ad hoc requests for data.

It's worth reiterating this point. If you pass on interactive embedding and try to hack together an alternative, you'll not just incur technical debt, you'll also end up taking on the nontrivial overhead of 1) maintaining the signed embeds for individual customers, 2) dealing with authentication and permissions, and 3) fielding ad hoc customer requests for data. These tedious, employee-churning tasks will tie up resources that would be better spent on improving your software or service. In fact, we could arguably classify going this route as a "mistake", or even a "bad call". It's effectively as if you were to acknowledge that, yes, there exists an elegant, battle-tested solution to the problem you need to solve, and then instead opt to do something that takes way more effort (read "money") and yields a far worse solution that doesn't really work. And _then_ switching to interactive embedding.

## So, why interactive embedding?

There are many reasons to opt for interactive embedding when offering analytics to customers, but we'll focus on the five most material:

### Customers can self-serve, so you don't have to deal with ad hoc reports

Arguably the most important: customers can [drill through dashboards](/learn/metabase-basics/querying-and-dashboards/questions/drill-through), or even [ask their own questions](/docs/latest/questions/introduction) of the data using the graphical query builder. You're no longer the bottleneck, and you'll never get inundated by customers' trivial requests for data.

Some people worry (needlessly) that giving the full toolkit could "overwhelm" their customers, or that their customers won't know what to do with the data. While we can't speak about how other products pan out, our experience with Metabase is that customers just "get it". Metabase ships with tools that make it easy for people to learn about their data: people can look up tables and fields from the [data reference](/docs/latest/exploration-and-organization/data-model-reference), create shared business logic using [models](/docs/latest/data-modeling/models), and annotate trends using [events and timelines](/docs/latest/exploration-and-organization/events-and-timelines).

### You can sandbox data, so customers can only see the rows and columns you want them to see

The idea with [data sandboxing](/docs/latest/permissions/data-sandboxes) is you just make one dashboard, or a small set of dashboards, that all your customers can use, and they only ever see data relevant to them.

There is a fair amount of setup here, but it's not that complicated, and we have a ton of documentation on how to do it. But once sandboxes are up and running, the amount of time you'll save is astronomical compared to having to manage a bunch of different dashboards and filters.

### You can manage authentication with Single Sign-On

Managing permissions with Metabase groups and SSO with [SAML](/docs/latest/people-and-groups/authenticating-with-saml) or [JWT](/docs/latest/people-and-groups/authenticating-with-jwt) makes life tolerable. The alternative is misery that is too gratingly boring to bother describing here.

### You can make the charts match your brand

Your charts can use the same colors and font that your application uses, so the charts will look like they belong in your application. While not strictly necessary, this bit of [customization](/docs/latest/configuring-metabase/appearance) adds some professional polish to your app.

### Interactive embedding is a LOT less work

Once you get a interactive embedding setup running, it pretty much runs itself. You may decide to update existing dashboards, or introduce another dashboard or question based on customer feedback, but, other than that, customers will be able to get most of what they need from the dashboards you provide. For the remainder of customer questions, customers can use Metabase to get answers on their own. You're not constantly dealing with permissions, or managing a fleet of different dashboards; it all just works.

## What if you're a pre-revenue startup? Is interactive embedding still worth the cost?

That depends on two factors: 1) your organization's funding, and 2) your market.

If you're in a market where customer analytics are table stakes, you might not be able to afford to delay on customer analytics, and you should budget for interactive embedding (whether you go with Metabase or some other comparable solution).

The decision is less clear if you're in a market where offering customer analytics could distinguish your product from the competition (that is, customer analytics is not a must-have, but a way to make your product rise above the competition). If the cost is prohibitive at the moment, you might want to hold off on incorporating analytics altogether, at least until your customers start asking for data. By that point, you should have the revenue to implement a permanent solution the right way from the start.

The rationale for holding off is that, with customer-facing analytics, it's not a matter of taking "incremental steps" from signed embeds. [Signed embeds are NOT a stepping stone](/learn/analytics/embedding-mistakes) to interactive embedding; they're a wrong turn.

## When instead to go with public and/or signed embeds

Public and signed embeds do have their uses: they're intended for one-off, external sharing, and for including basic, non-interactive charts where permissions are irrelevant.

So, public and signed embeds are actually feature-rich; they're just not scalable or intended for use with multi-tenant setups.

There are, however, cases where you could (or should) instead go with public and/or signed embeds:

- You don't want to give people ad-hoc query access to their data for whatever reason. A vanishingly rare situation, but worth mentioning.
- You want to present data that applies to all of your tenants at once. For example, say you want to showcase some benchmarking stats: if you just want to make those stats available exclusively to your customers, you could use a signed embed, or if you want to make those stats available to everyone, you could use a public embed.
