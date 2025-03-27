---
layout: learn_article
date: 2016-04-01 16:10:58
categories: guide
image: /images/twitter/default.png
author: Sameer Al-Sakran
redirect_from:
  - learn/data-diet/analytics/data-model-mistakes
  - learn/analytics/data-model-mistakes
---

After helping build out a few startups' analytics stacks, one starts to see some patterns. Sometimes these patterns are happy ones: just about everyone loves the moment when you go from having no idea what's going on, to having a foggy idea of what happened last week. Other patterns are less awesome, and usually involve decisions around [data models](/glossary/data_model) or [schemas](/glossary/schema).

It's important to note that the anti-patterns we'll discuss below are specific to startups. Some of these patterns are actually good ideas for later-stage companies, but for small, pre-product-market-fit, resource-constrained startups, these are mistakes you don't need to make.

Without further ado, here are the top five sources of pain in early-stage analytics:

## 1. Polluting your database with test or fake data

Whether it's test accounts, staff accounts, different data programs, or orders that come in through feline telepathy, too many companies include data that require you to ignore certain events or transactions in many or most of your queries.

By polluting your database with test data, you've introduced a tax on all analytics (and internal tool building) at your company. You _can_ balance this tax against transactional efficiency, or developer productivity. Sometimes this tax is worth it, sometimes it isn't. For large companies, transactional efficiency is an important enough goal that you can afford to spend a couple engineers' or analysts' time to clean up the results.

If you're small, chances are you _can't_ afford this, and you should probably make the tradeoff somewhere else.

## 2. Reconstructing sessions post hoc

A sizable portion of the important questions around user behavior, satisfaction, and value revolve around session metrics. Whether they are called "sessions", "conversations", "support contacts", or something else, these metrics refer to a number of discrete events related to a user that should be grouped together and treated as a single concept. It is, however, frighteningly common for startups' data models to fail to capture this basic concept in the vocabulary of a business.

Sessions are often reconstructed post hoc (i.e., after the fact), which typically results in a lot of fragility and pain. The exact definition of what comprises a session typically changes as the app itself changes. Additionally, there is often a lot of context around a user's session on the client, or the server processing the client's requests. It is far easier to assign a session, support ticket, or conversation ID in your app than it is to try to reconstruct a session after the fact.

## 3. Soft deletes

At scale, deleting rows in a database under significant load is a bad thing. Soft deletes are a common schema tool that alleviate the performance hits of deletion, and the subsequent compaction (or vacuuming). Additionally, soft deletes make it easy to _undelete_ rows to recover deleted data.

On the flip side, soft deletes require every single read query to exclude deleted records. If you consider just the application data calls, this might not seem so bad. However, when multiplied across all the analytics queries that you'll run, this exclusion quickly starts to become a serious drag. That, and soft deletes introduce yet another place where different users can make different assumptions, which can lead to inconsistent numbers that you'll need to debug.

## 4. Misusing semi-structured data

Semi-structured data (e.g., fields encoded as JSON) can be useful in situations where there are a number of different structures present over time. As databases get larger, semi-structured data can also help avoid the hassles of migrating large tables under heavy read or write load.

However, semi-structured data can also lead to a lot of heartburn when trying to get data out of a database. Typically semi-structured data have schemas that are only enforced by convention, that might change unpredictably, or be off due to transient bugs, and in general that require a lot of post-hoc cleaning to be useful.

And sometimes semi-structured data fields are an excuse to punt on thinking through the structure you need until _after_ you've written a feature. In this case, you actually have structured data, it's just unenforced, prone to bugs, and generally a pain to use. A simple test: if every instance of a JSON field has the same four fields, you should probably decompose the structure.

## 5. The "right database for the job" syndrome

The presence of a multitude of different databases used in a company's technology stack usually indicates one of three scenarios:

- A truly huge, complex company that has a wide variety of needs and subdivisions.
- A highly functional, top performing engineering and ops team working on very difficult problems that needs to highly optimize all aspects of the app.
- (Most commonly) a small team that is constantly putting out fires in technologies it only shallowly understands.

With each additional database you add, you take on a lot of operational overhead. That, and each additional database is yet another set of data that you'll need to put into an analytics database. These databases will have slightly different semantics, data types, and natural data models that you'll have to sort out.

So resist the urge to make a small feature easier to implement, as you will make operations and analytics a lot harder across the board.

## A tip: make it easy to get business metrics

When thinking through whether your data model accounts for your analytical and transactional needs, it's useful to identify the following:

- 10 important metrics the business cares about
- 10 most commonly run update queries from the application
- 10 most common read patterns from the application

You're looking for a data model that minimizes pain across all of these distinct queries. In general, queries for business metrics are the most important, so if introducing a bit of complexity for app updates and reads will make it easier to query for the business metrics, do it. You'll maximize overall productivity, as there are usually far fewer workhorse queries on the application side than there are for common analytics or business intelligence questions.

Also, the queries for the app are usually done in source control, wrapped in automated testing, and generally much more hardened. Queries for business metrics are usually scattered, written by many people, and generally much less controlled. So do what you can to make it easy for your business to get the metrics it needs to make better decisions.
