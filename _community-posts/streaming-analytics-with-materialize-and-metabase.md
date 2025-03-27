---
title:  "Streaming Analytics with Materialize and Metabase"
redirect_from:
  - /community_posts/streaming-analytics-with-materialize-and-metabase
meta_description: How to build an end-to-end streaming analytics pipeline using Materialize and Metabase.
date:   2022-01-18 18:10:58
image: /images/community/streaming-analytics-with-materialize-and-metabase.jpg
read_time: 2 minutes
category_filters: "Working with Metabase"
organization: Materialize
organization_url: https://materialize.com/
author: Marta Paes
author_img: /images/community/marta-paes.png
author_bio: Marta is a Senior DevEx Engineer at Materialize, a company that makes building with real-time data as easy as possible. Before finding her mojo in streaming systems and developer experience, she worked as a DWH Engineer for 4+ years. You can reach her on Twitter at [@morsapaes](https://twitter.com/morsapaes){:target="_blank"}.
---

For a long time, migrating your batch pipelines to streaming meant being prepared to deal with a mix of JVM languages and high-maintenance distributed frameworks, as well as learning way more than you should about the internals of streaming systems. While this might fit teams with big human and time budgets, it made streaming [harder to adopt](https://twitter.com/esammer/status/1374494686639878145){:target="_blank"} for the rest of us.

### How is the Modern Data Stack changing this?

Taking the leap from batch to streaming will never not be challenging, but it can sure enough be less painful. As the Modern Data Stack (MDS) reshapes the future of data engineering and analytics, there are some tools focusing on lowering the entry barrier to the space by providing:

1) Easier access to fresher data, faster; <br>
2) Familiar interfaces that blend into your usual stack; <br>
3) Minimal operational overhead.<br>

At the same time, “not being fast enough” is still a common bottleneck in analytics, all the way from data [transformation](https://discourse.getdbt.com/t/how-to-create-near-real-time-models-with-just-dbt-sql/1457#the-right-use-case-2){:target="_blank"} to [visualization](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster){:target="_blank"}. One tool looking to change this is [Materialize](https://materialize.com/){:target="_blank"}, a database purpose-built for streaming analytics and the MDS.

## Streaming analytics in practice

Let’s use [this demo](https://github.com/morsapaes/mz-twitch-analytics){:target="_blank"} to break down the fundamental steps involved in building an end-to-end analytics pipeline using Materialize and Metabase:

![a screenshot with a Metabase date picker](/images/community/streaming-analytics-materialize-metabase.gif)

### 1. Connecting to a streaming data source

The first step is to let Materialize know where your data is located and what it looks like. In this demo, we’re using Kafka as a source, but you could also get started with a relational database like PostgreSQL, and push the replication stream to Materialize (aka change data capture).

### 2. Modeling data transformations using SQL

Next, you need to define your transformations as SQL queries (you can even use [dbt](https://materialize.com/docs/guides/dbt/){:target="_blank"}!). These can be arbitrarily complex and use e.g. subqueries and n-way joins, because here’s the trick: instead of re-reading the source data and recomputing everything from scratch, Materialize will keep the results of your queries indexed in memory and incrementally update them as new source data streams in.

### 3. Visualizing the results

To finish it off, you can keep track of these results using Materialize’s native integration with Metabase. All queries are simply reading data out of self-updating materialized views, so you can set dashboards to auto-refresh every second without making the serving layer break a sweat, and rest assured that you’re delivering nothing but fresh, consistent insights to your end users.

Useful resources:<br>
[Demo](https://github.com/morsapaes/mz-twitch-analytics){:target="_blank"} <br>
[Blogpost: Hey, Materialize: what’s streaming on Twitch?](https://medium.com/@morsapaes/hey-materialize-whats-streaming-on-twitch-f90426b6ed9){:target="_blank"} <br>
[Materialize Docs](https://materialize.com/docs/){:target="_blank"} <br>
