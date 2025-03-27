---
title: "You don't need a data warehouse"
summary: "Start querying your production database as soon as possible, because the best way to model your data warehouse is to prototype it in real life."
date: 2023-05-18 00:10:18
last_updated_at: 2023-05-18 00:10:18
categories: "Analytics and BI"
featured_image: /images/posts/no-data-warehouse-necessary/no-data-warehouse-necessary.jpg
image: /images/posts/no-data-warehouse-necessary/no-data-warehouse-necessary.jpg
author: The Metabase Team
layout: post
---

You don't need a data warehouse to start getting insights from your data. In fact, starting off with a data warehouse is a bad idea.

Don't get us wrong: data warehouses are great. We're big fans. But we're bigger fans of doing something _now_ versus waiting for a perfect situation. Because some data is better than no data. Even if your data isn't perfect or comprehensive, _any_ data will probably point you in a better direction than no data at all.

We have an article on [which data warehouse you should use](/learn/grow-your-data-skills/data-landscape/which-data-warehouse) that goes into detail about how to think about data warehousing as your organization grows, but this article focuses on hammering on a single public service announcement: just start querying your production database.

## Start querying your production database as soon as possible

We're assuming you're a startup, and you've built some kind of software or program, and that software uses a database to keep track of what it does. Presumably at this stage you're seeing some growth, people are starting to use your app or service, and you want to get a better idea of how things are actually going.

Before you invest in a dedicated data warehouse, pick up a business intelligence tool–ideally free or low cost–that lets you query and visualize your data–and connect it to your production database.

Which is another way to say that:

## The best way to model your data warehouse is to prototype it in real life

Setting up a data warehouse is a lot of work. And what we've seen happen is that companies that jump too quickly into a data warehouse find out that the _way_ they've modeled their data doesn't address the kinds of questions they want answers to. Which means they've just pushed backed their prototyping period, and made that period much more expensive.

You can prototype data modeling with something like Metabase or Superset, or even spreadsheet software like Microsoft Excel, Google Sheets, or LibreOffice Calc. By messing around with the data in this lo-fi way, as it exists in for your app, you'll learn:

- What kind of data you're working with
- Which of that data you're actually interested in
- If that data is in any way accurate or reflective of stuff in real life
- What data you should probably start collecting

The exercise of asking questions and pulling data will help you model your data so that, when the time comes where you really _do_ need a data warehouse, you’ll have a much better handle on how you want to structure it.

## When to upgrade to a data warehouse

Eventually, if you get a bunch of people using your app, you’ll have more data to sift through. You’ll start running a lot of big analytical queries against your production database, and you’ll find yourself starting blankly at loading animations.

Even _then_, you can get away with replicating your production database and just adding some materialized views to make the data easier to query. That way, you get to analyze your data, and you don’t tie up your production database with long-running analytical queries.

Meanwhile, however, you're starting to accumulate more tools to manage the day-to-day tasks involved in running a business. Which means more data, which you probably want to store alongside your application data to establish a single source of truth. And that’s when you want to start thinking about a [data warehouse](/learn/grow-your-data-skills/data-landscape/which-data-warehouse).
