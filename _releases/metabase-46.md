---
title: "Metabase 46"
subtitle: Ready, set, Action!
summary: "This release brings Actions—a way to write back to your database straight from Metabase. It also includes serious improvements to our MongoDB driver, along with a bunch of quality of life improvements."
date: 2023-03-28 00:12:18
categories: News
image: /images/releases/metabase-46.png
author: The Metabase Team
highlights:
  - title: Actions
    description: Write back to your database, from Metabase
    image: /images/releases/highlights/actions.png
    url_fragment: actions-write-back-to-your-database-from-metabase
  - title: Humongous upgrades for MongoDB
    description: Lots of improvements for our MongoDB driver
    image: /images/releases/highlights/mongo-db.png
    url_fragment: our-mongodb-driver-gets-a-humongous-upgrade
  - title: Optimized sync and fingerprinting
    description: Significant optimizations to reduce database loads and data warehouse costs
    image: /images/releases/highlights/optimized-sync.png
    url_fragment: save-money-with-optimized-sync-and-fingerprinting
  - title: Customized filter drop downs
    description: Define a custom list, or choose an existing question, to populate dropdown options in dashboard filters and SQL queries.
    image: /images/releases/highlights/customized-filter-dropdowns.png
    url_fragment: customize-filter-dropdown-menus
  - title: Learn more about your Models
    description: Get all the details on your model in one place.
    image: /images/releases/highlights/learn-more-about-your-models.png
    url_fragment: more-info-about-your-models-in-one-place
---

{% include youtube.html id="xbxWpoNGi4c" %}

For this release, we’ve continued our focus on improving the day-to-day Metabase experience. It’s a lot of stuff, so settle in and let’s get through it all.

If you’re hosted on Metabase Cloud, we’ll be rolling out these new features automatically over the next few weeks. If you’re self-hosting, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Tired of managing your instance? [Upgrade to a hosted plan](/upgrade/) and leave it to us.

## Actions: write back to your database, from Metabase

![Action form](/images/posts/metabase-46/action-form.jpeg)

With [actions](/docs/latest/actions/start), you can now add buttons to your dashboards that change the data—logging a new request or editing a customer profile. You can also make an action public and share it via forms that collect information straight into your database.

Actions are parameterized SQL queries that you can write today (as long as you enable them in your DB settings). To make things easier, we automatically track your schema for basic CRUD stuff, so you only have to write more specific actions.

To start, actions are available for PostgreSQL, MySQL, and H2. Check out a quick walkthrough on how to [build a basic CRUD app](/learn/actions/dashboard) with actions, as well as a webinar on [what you can do with actions](https://youtu.be/iExyy_gkTwk).

## Our MongoDB driver gets a hu<em>mongo</em>us upgrade

![MongoDB](/images/posts/metabase-46/mongodb.jpeg)

MongoDB is quite popular as a data source for Metabase, but our driver wasn’t living up to the popularity. So we made humongous improvements to it, including a smarter schema sync process to handle variable keys, support for models, fast joins, custom expressions, additional aggregations, and more.

## Save money with optimized sync and fingerprinting

![Optimized sync](/images/posts/metabase-46/sync.jpeg)

We made significant optimizations to reduce the load on your database and the cost of running your data warehouse. Expect to see particularly big gains for Snowflake, BigQuery, and MongoDB.

## Customize filter dropdown menus

![Customize filter dropdown menus](/images/posts/metabase-46/dropdown.jpeg)

You can now define a custom list, or choose an existing question, to populate dropdown options in dashboard filters and SQL queries. Paired with the choice of multi/single select, these options give you control over what’s displayed, preventing unnecessary queries to the database when people select values.

## More info about your models in one place

![Model detail page](/images/posts/metabase-46/model-detail.jpeg)

Get all the [details on your model](/docs/latest/data-modeling/models#model-details), complete with where they’re being used, and most notably the Actions associated with them. This is a great way to guide people in your company to use your models and start to self-serve their analytics needs.

## Visualizations also get even better

![Improved-visualizations](/images/posts/metabase-46/improved-visualizations.jpeg)

Even more improvements to visualizations (we weren’t done [last time](/releases/Metabase-0.45)):

- Stop the screenshots: you can now download visualizations as PNGs (and download data straight from cards in dashboards).
- Tooltips are more useful: in multi-series charts with totals and percentages; in time series with days of the week, and more.
- Pivot tables got some optimizations for snappier performance, and now allow you to export pivoted data. We also made the columns resizable, and you can now disable/enable row and column totals.
- We continued the improvements to static visualizations in Dashboard Subscriptions and Alerts, bringing them ever closer to parity with the charts in the web app.
- Trying out different types of visualizations and tweaking them is now easier with a redesigned picker and smoother flow.
- You can now add [Link cards](/docs/latest/dashboards/introduction#link-cards) to dashboards to guide viewers to other parts of your Metabase instance, or even URLs elsewhere on the internet.
- There’s a new visualization type called [Detail](/docs/latest/questions/visualizations/visualizing-results#detail) that displays individual rows as a card. Super useful for operational dashboards to vertically show the details of an individual item. Particularly nice if paired with action buttons in dashboards.

## Also this stuff

- **The [Clickhouse](https://github.com/ClickHouse/metabase-clickhouse-driver) partner data source connector is now available on Cloud.** Built by the great folks over at Clickhouse, with support from our team, it now ships with Metabase.
- **Similarly, the new [Ocient](https://github.com/Xeograph/metabase-ocient-driver) partner data source connector is also available.**
- **When using variables or field filters in your SQL queries, you can now preview the actual SQL that Metabase sends to your database.** Debugging queries just got a lot easier.
- **Përshëndetje and 안녕하세요!** Thanks to our fantastic community, Metabase is now available in Albanian and Korean!
- **A new custom expression function, `now`**, returns the current date time based on your report timezone.
- **We’re deprecating Google Analytics 3**, and will remove the driver from our future releases after it stops accepting new events, in July of this year. We don’t have plans of supporting GA4 directly, but you’ll still be able to use it [via BigQuery](/docs/latest/databases/connections/bigquery).
- **You can now add managers and contacts to your Metabase Store Account.** Designate teammates to help manage your instances, and control who gets gets billing and technical update emails.

Plus even more bug fixes and small improvements all around. We focused on our favorite improvements in this announcement, but make sure you check out our release notes to see everything we’ve been up to:

- [OSS/Starter](https://github.com/metabase/metabase/releases/tag/v0.46.1)
- [Pro/Enterprise](https://github.com/metabase/metabase/releases/tag/v1.46.1)

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Wanna know what’s coming up in later releases of Metabase? Check out our [public product roadmap](/roadmap).

Cheers,

The Metabase Team
