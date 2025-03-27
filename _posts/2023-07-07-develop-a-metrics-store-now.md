---
title: "The two most important business metrics to track"
summary: "Effective metrics are not a one-size-fits-all solution. Here's how to create a useful North Star metric and counter metric to start building out your metrics store."
date: 2023-07-07 00:09:18
last_updated_at: 2023-07-07 00:09:18
categories: "Analytics and BI"
featured_image: /images/posts/develop-a-metrics-store-now/metrics_store.jpg
image: /images/posts/develop-a-metrics-store-now/metrics_store.jpg
author: The Metabase Team
layout: post
---

Metrics need to align with your business goals, or else you're stuck with a bunch of [vanity metrics](https://www.productplan.com/glossary/vanity-metrics/). Trying to solve business problems with impressive, yet irrelevant numbers is a waste of time, money, and resources.

The two main [critical thinking skills](https://asana.com/resources/critical-thinking-skills) for data teams that develop metrics are the ability to identify problems and ask questions. However, you may not have a data team available.

Let's breakdown how you can use these skills to develops metrics of [value and substance](https://breakingpoint.substack.com/p/you-have-too-many-metrics) on your own, and store them for later use.

## Developing your first metric: the North Star metric

You should first develop a [North Star metric](https://future.com/north-star-metrics/), or a metric that gives your company direction to long-term goals. A North Star metric can help encompass what your core value is, and add definition to growth. If you can track growth in north star metric results, you are heading in the right direction.

To start developing a useful North Star metric, you'll need to identify the main problems your business aims to solve, and how you plan to solve them.

You may already have identified problems and solutions in your company mission or vision statement, something like, "We're a brand that focuses on sustainable fashion by selling 100% recyclable goods."

This is technically a problem-solution statement: you see fashion as wasteful (problem), so you create sustainable fashion (solution). Keep this in mind when going to develop a new metric.

You may have multiple problems and solutions. However, you don't want several North Star metrics, or you'll defeat the purpose of finding direction.

If you're having trouble deciding _which_ business problems are more important to focus on as North Star metrics, think about the criteria required for an effective metric. Metrics should be measurable, relevant, actionable, reliable, and easy to understand, [among a few other things](https://tdwi.org/Blogs/TDWI-Blog/2010/04/Effective-Metrics.aspx?m=1).

Fundamentally, you can ask questions to decide if your business problem fits to the criteria, and narrow it down. Is one business problem more relevant than the other? Would creating a measure around this certain business problem be more actionable? Use this criteria as a process of elimination.

### Develop your solutions into a metric

Ask yourself a few questions about your business solutions:

- Which part of the solution (typically a product or service you offer) can you measure? And how?
- Think deeper about the subjective adjectives, like sustainability, accessibility, reliability, listed in your solutions. What can you measure to back these claims up?

For example, if you're a company that creates sustainable fashion as a solution to your business problem, what is the way that you're making the biggest footprint in solving that business problem?

For example, you could count the **total number of items recycled** (metric 1). You could also count the **total number of recyclable items sold** (metric 2). These are good, overarching metrics that embody a large area of how you choose to tackle your business problem.

You now have developed a few North Star metrics!

### Store your metrics in your BI tool

You can create a [question](/docs/latest/questions/introduction) in Metabase by selecting the data you'd like measure and summarizing it. You can summarize data with other BI tools, too. This summary is your metric.

### Visualize your metric

Visualize your question as a [time series](/glossary/time_series) so you can view your metric over time and see where you can continue make improvements to this metric.

## Develop counter metrics to build out a metrics store

It's hard to measure how successful you are with one metric alone. You need to create [counter metrics](https://productcoalition.com/counter-metrics-9cbde3ab5fc9), or metrics that support your argument, to help guide you.

You can use your North Star metric to help develop counter metrics.

For example, if your North Star metric is the **total number of recyclable items sold**, you can ask questions with this metric in mind to identify new business problems. Ask a counter question of your North Star metric, something like, "If we measure the total number of recyclable items sold, what about the non-recyclable items we sell?"

Continue down the Q&A path to break down all the possible ways to solve that business problem, and create measures around them, the same way you created your North Star metric. Add them to your BI tool to keep your metrics in one place, and start a [metrics store](https://medium.com/kyligence/understanding-the-metrics-store-c213341e4c25).

A metrics store can help you standardize metrics to easily [group data by](/docs/latest/questions/introduction) individual or multiple metrics when developing new business questions.

As new data becomes available, you'll now be able to quickly track the right metrics, and [pivot](https://www.indiewire.com/news/breaking-news/netflix-new-top-10-metrics-wednesday-no-1-1234876660/) with changes without losing sight of the problems you set out to solve.
