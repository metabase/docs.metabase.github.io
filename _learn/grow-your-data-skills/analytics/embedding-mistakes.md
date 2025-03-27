---
layout: learn_article
date: 2022-06-07
categories: guide
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/analytics/embedding-mistakes
---

When you're thinking about [putting data in front of your customers](/learn/metabase-basics/embedding), you might be imagining bespoke charts, color-coded metrics, and an abundance of white space.

Although dashboards are capable of delivering [self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics) to your customers, they're rarely the best tool for the job.

This article shows you why _starting with_ embedded dashboards (or any pre-defined view of your data) tends to cause problems with maintainability and scalability.

If you're already convinced, check out the [embedding approach you can take](#a-mindset-shift-from-embedded-dashboards-to-embedded-data-models) to avoid giving yourself grief.

## Sample use case

Let’s say you run an e-commerce platform. Your analysts have built a dashboard where your team can look at the success of each merchant based on data such as visits per customer, transaction volume over time, and average customer rating.

You plan to embed the dashboard in a merchant-facing app so that your merchants can take advantage of those metrics and visualizations to understand and grow their business.

### Stage 1: Denial

People are using your dashboard everyday, so you feel pretty confident that it already meets the [bar for high-quality external analytics](/learn/metabase-basics/embedding/overview#the-bar-for-high-quality-external-analytics).

After reading through the [strategies for delivering customer analytics](/learn/metabase-basics/embedding/overview#strategies-for-delivering-customer-facing-analytics-with-metabase), you decide to combine [single sign-on (SSO)](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics#single-sign-on), [data sandboxing](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics#data-sandboxing), and [white labeling](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics#white-labeling-branding) to embed your existing dashboard directly into the merchant-facing app.

### Stage 2: Anger

A few weeks after rolling out the first iteration, you find that your merchants love using the dashboard, so much so that your data warehouse doesn’t quite scale to meet their enthusiasm.

Your merchants start to get frustrated with how long it takes to load the dashboard. You decide to copy your dashboard’s data sources to a [faster data warehouse](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster#consider-a-database-optimized-for-analytics), and you [adjust the number of instances](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale) for good measure.

### Stage 3: Bargaining

Feature requests are beginning to roll in for your dashboard — it seems that the more your merchants get to work with data, the more questions they have about filters, pivots, and custom calculations.

Some of your merchants want to use their own calculations for revenue. Others are strongly opinionated about [line charts](/learn/metabase-basics/querying-and-dashboards/visualization/line-charts) vs. [bar charts](/learn/metabase-basics/querying-and-dashboards/visualization/bar-charts). And a small (but vocal) faction don't even care for charts at all — all they want is a way to get de-anonymized customer data for running personalized campaigns.

### Stage 4: Depression

You realize that the tables in your database require some serious SQL wizardry to support the latest dashboard additions that your merchants have been asking for.

Your team lacks the time to refactor the schemas (they're busy [maintaining the existing views](/learn/grow-your-data-skills/learn-sql/debugging-sql/sql-logic#common-reasons-for-unexpected-query-results)), so you start writing custom SQL scripts to meet the needs of your most important merchants. Your data warehouse becomes cluttered with arbitrary tables.

Even though your product team does their best to track the requests for more data _and_ more ways to look at that data, your once-successful internal dashboard seems to have mutated into a hundred-tile abomination.

When you finally have time to check out the usage stats of your merchant dashboard, you're heartbroken to learn that your merchants have only ever looked at those tiles once, if at all.

### Stage 5: Acceptance

You're delighted to remember that this entire scenario is hypothetical. As you reflect on your simulated trauma, you come to understand that:

- People reach answers by looking at the data in different ways.
- Dashboard requests (can I get a specific view of the data?) are actually requests to self-serve data (can I get as many views as I need to answer my question?).
- You shouldn’t have to create or update your tables in response to dashboard requests.

## A mindset shift: from embedded dashboards to embedded data models

The best way to [get started with embedding](/docs/latest/embedding/start) is to treat your data models as the end product (and by data models, we mean the design of the fields, tables, and relationships that live in your data warehouse).

If your data models are easy for non-engineers to [find](/learn/metabase-basics/getting-started/find-data#browse-databases-and-tables), [understand](/learn/metabase-basics/querying-and-dashboards/data-browser#data-reference-pages), [modify](/learn/metabase-basics/getting-started/models), and [verify](/blog/official-collections-and-verification), you'll give them the confidence and autonomy to use data in the way that makes the most sense to them (and get your time back from herding ad-hoc dashboard requests).

Of course, you’ll still want to avoid creating a whole new category of ad-hoc _data model_ requests. It’s well worth your time (now that you've got some back) to construct data models that are not only optimized from an engineering perspective, but also from a product design one.

## Further reading

Learn more about data modeling strategy, design, and implementation:

- [The problems with democratizing analytics](/learn/metabase-basics/administration/administration-and-operation/same-page#the-problems-with-democratizing-analytics)
- [What is a data model?](/glossary/data_model)
- [Common data model mistakes made by startups](./data-model-mistakes)
