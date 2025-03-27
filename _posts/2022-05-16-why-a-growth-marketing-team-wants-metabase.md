---
title: "A marketer's guide to getting started with Metabase"
summary: "Your marketing team moves fast, and doesn't have the time to spend weeks vetting and configuring an analytics tool. Learn how Metabase can help you level up those growth initiatives."
date: 2022-05-20 00:12:18
last_updated_at: 2022-05-20 00:12:18
categories: "Using Metabase"
featured_image: /images/posts/a-marketers-guide-to-getting-started-with-Metabase.svg
image: /images/posts/A-marketers-guide-to-getting-started-with-Metabase.jpg
author: Alexander Kinn
redirect_from: /blog/why-a-growth-marketing-team-wants-metabase
layout: post
---

As a marketing professional you probably use a whole slew of different tools to track the success of initiatives like ad buys, social campaigns, or website updates. And while you've fine-tuned that array of platforms and disparate datasets as best you can, you still run into plenty of frustrations. So what if learning from that mountain of growth data was just simpler, and what if your whole team could track and ask questions about incoming data? Having that data together in one place can be a game-changer for marketers, allowing you and your team to make sense of those disparate datasets in a way that's simple and doesn't overload your analyst colleagues.

[Metabase](/pricing/) could be that game-changer for your team. Metabase is an open-source [BI tool](/glossary/bi-tool) that puts your data in the hands of everyone at your organization, not just the analysts. With Metabase, your team can analyze and compare customer behavior across channels in one centralized place, follow user journeys all the way to checkout, and create the charts and dashboards that track the metrics you need run a successful marketing operation.

## Why Metabase for marketing teams

### No more screenshots in a slide deck

Screenshots of charts become outdated the second you create them, and it's frustrating to have to keep updating and replacing that image in a slide deck or project doc. With Metabase, you can [share questions and dashboards](/learn/getting-started/sharing-work) directly with others at your org just by sending them the URL — not only will those charts stay updated, but they'll be interactive too. Your colleagues can then build on those questions themselves, taking that data exploration even further and possibly leading to some unexpected insights.

![Example orders dashboard in Metabase](/images/posts/marketers-guide/card-example.png)

### Team members can report on their own work

Everyone on your team handles their own projects from start to finish, that is until it comes time to measure the success of those projects. At best, your team ends up overloading a data analyst with [ad hoc requests](/blog/ad-hoc-analysis-tips), and at worst you're not measuring outcomes of those growth initiatives at all, because no one's sure where the data is or how to meaningfully interpret it.

Adding Metabase to the mix can go a long way in resolving these pain points — your team can explore data themselves, asking questions and comparing outcomes, without needing to know SQL. No longer will any one person need to act as the keeper of how each member of the marketing team is doing, because everyone can report on outcomes themselves.

### See how activity affects sign-ups

Maybe you had a particularly great week on Twitter last month, with new followers and retweets coming in left and right. And yet you're still not sure if that great week moved the needle at all on sign-ups. With Metabase, you can track that correlation directly on a [dashboard](/product/interactive-dashboards), so you can be sure that the decisions your team makes are backed by the data, and change course as soon as things look different.

The best part is that you can do all this in Metabase without relying on an analyst, and without needing to know any SQL. When you notice a drop or spike in sign-ups, you can do that debugging investigation yourself, slicing and dicing the numbers on your own to get to the bottom of things.

### Shared metrics throughout the company

With Metabase, people in product, sales, engineering, and so on can all access the same data sources, meaning you can codify shared definitions, designate trusted metrics, and generally be confident that when people say they're looking at a certain metric, they're seeing the same up-to-date information you are (and not an old spreadsheet version of that data). And yes, this means you can stop emailing CSVs back and forth, especially those with file names like `ImportantGrowthMetrics_final_v2_FINAL_1.csv`.

Metabase even has [tools](/blog/official-collections-and-verification) to make this sort of thing official.

## Getting started with Metabase

At this point, Metabase may sound well and good, but you're probably wondering how much setup is involved, and how Metabase even fits into your organization's existing configuration. That [data stack](/blog/the-modern-data-stack) may fall anywhere from simple to complex, with plenty of moving parts and pipeline services.

Setting up Metabase is something doable in an afternoon, _not_ six months. Here's a quick rundown of what you'll need to get up and running:

1. A [data source](/data-sources/): this could be a read-only copy of your production database, or a more complex [data warehouse](/glossary/data_warehouse) setup.

2. A [data transformation tool](/learn/grow-your-data-skills/analytics/etl-landscape): these tools move and transform between raw data sources and data warehouses, like cleaning or changing the shape of your data so it'll be easier for end users to query.

3. Someone with credentials for connecting to your data source, like an analyst or engineer, who can [install Metabase](/docs/latest/operations-guide/installing-metabase) (or set up [Metabase Cloud](/pricing/)) and [connect your data source](/docs/latest/databases/connecting#adding-a-database-connection). They'll thank you in the long run — think of all the time that analyst or engineer will save not having to "pull the data" every week for your team.

And... that's pretty much it. Metabase doesn't host any of your data, and instead sits on top of your database as an analytics layer. We know that marketing projects need to move fast — you don't have the time to spend weeks vetting and configuring an analytics tool. This is part of why people [love](/love) Metabase: setup is quick and straightforward, and everybody can get their hands on the data right away.

## Further reading

- [Getting started with Metabase](/learn/getting-started/getting-started)
- [A tour of Metabase](/learn/getting-started/tour-of-metabase)
