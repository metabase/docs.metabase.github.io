---
layout: post
title: Migrating from Redash to Metabase
summary: "If you're planning on leaving Redash, Metabase might be the right fit for you. This migration guide showcases the Metabase features around self-service business intelligence, data visualization, and embedded analytics that line up with what Redash can do."
image: /images/twitter/default.png
author: Alexander Kinn
---

We know many of you were disappointed by the announcement that Hosted Redash will be going away, and are looking for an easy new home for your charts and dashboards.

So we wanted to provide this brief overview to help you decide if Metabase would be a good replacement for you. The fastest way to get to know Metabase is to [download it and try it out](/start/), or to [start a free Metabase Cloud trial](/start/). You can quickly and easily connect to your own data, or just play around the with Sample Dataset included with Metabase.

## Before starting: am I in the right place?

Metabase might be the right fit for you if you’re looking for:

- [Embedded analytics](/enterprise/embedded-analytics) and customer-facing reporting. You want to embed charts and dashboards in your own application, host a web portal for your customers’ analytics, or create a white-labeled dashboard for clients.
- A way to democratize data access to let anyone explore and create charts and dashboards, even if they don’t know how to write SQL.
- A flexible and open source application that developers and analysts can easily customize and integrate in their workflow.

## Free and paid options

Metabase is free and [open source](https://github.com/metabase/metabase). You can host it yourself, or let us handle it on Metabase Cloud. We also have paid tiers with additional features for folks looking either to [embed Metabase](/enterprise/embedded-analytics), or who are looking to [manage complex permissions or large numbers of users](/enterprise/scale).

## The features

- [Supported databases](#supported-databases)
- [Scalability](#scalability)
- [Reporting](#reporting)
- [Sharing and embedding](#sharing-and-embedding)
- [Permissions and auditing](#permissions-and-auditing)
- [Support](#support)
- [Migrating from hosted Redash](#migrating-from-hosted-redash)

You can also check out our homepage for [an overview of our features](/product/), or take a [Tour of Metabase](/learn/getting-started/tour-of-metabase) to get some additional detail.

## Supported databases

Amazon Redshift, PostgreSQL, Big Query, Snowflake, MySQL, Mongo, and more: Metabase [supports a lot of databases out of the box](/docs/latest/databases/connecting#connecting-to-supported-databases), and there are a dozen [community drivers](/docs/latest/developers-guide-drivers) to connect you to others.

## Scalability

Metabase scales well: check out our articles on [Metabase at scale](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale), and [making dashboards faster](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster).

## Reporting

Metabase makes it simple to connect to your data and start asking questions right away. Here are some details on querying, visualizing, and making dashboards.

### Querying data and visualizing results

There are two ways to put together a query in Metabase to create a chart. You can use:

- A graphical query builder that’s [simple to pick up](/learn/getting-started/getting-started), with separate modes for beginners and experts. You can add custom columns and use [custom expressions](/learn/metabase-basics/querying-and-dashboards/questions/custom-expressions) for your filters and aggregations, and even join data, without having to write any SQL.
- A [native editor for SQL](/docs/latest/questions/native-editor/writing-sql), complete with variables, and [Snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets) to let you share and reuse code.

Once you have the results you’re looking for, you’ll have [more than 15 different visualizations](/docs/latest/questions/visualizations/visualizing-results) to choose from, including pivot tables, gauges, time series with trend lines, maps, and numbers with percent changes. Check out our [visualizations guide](/learn/basics/visualizing-data/guide) for more details.

### Dashboards

A dashboard is way more than a collection of charts in Metabase.

- You can create [interactive dashboards](/docs/latest/users-guide/interactive-dashboards) with [drill-through capabilities](/learn/basics/questions/drill-through), customizable click behaviors, and [cross filtering](/learn/building-analytics/dashboards/cross-filtering).
- Speaking of filters, Metabase lets you add [smart filter widgets](/learn/building-analytics/sql-templates/field-filters) to your dashboards that allow anyone to explore and modify the SQL-based charts in your dashboard.
- Keep your team in the loop with [dashboard subscriptions](/docs/latest/dashboards/subscriptions) to schedule reports via email or Slack. In the Enterprise edition, you can even customize filter values for different recipients..

## Sharing and embedding

We’ve already mentioned dashboard subscriptions, but here are some other ways to share what you make in Metabase with others.

### Sharing

Sharing a question or dashboard is as simple as sending someone a link (check out our [Guide to sharing data](/learn/data-diet/analytics/guide-to-sharing-data)), and you can always export your results to a CSV, XLSX, or JSON file.

Beyond dashboard subscriptions, you can also set up [alerts on questions](/docs/latest/questions/sharing/alerts) to tell you when a metric crosses a threshold or when some other condition is met.

![https://www.metabase.com/learn/images/embedding-charts-and-dashboards/sharing-options.png](/learn/images/embedding-charts-and-dashboards/sharing-options.png)

Sharing options include: Public link, Public embed, and Embed this dashboard in an Application (a signed embed).

### Embedding

You can embed single charts or entire dashboards in your app. The free open source edition will include a “Powered by Metabase” logo at the bottom of your embeds, while the Enterprise tier removes that attribution and allows you to embed the full Metabase application in your app, letting your customers explore the data on their own. Check out our [guide on embedding Metabase in your app](/learn/developing-applications/advanced-metabase/multi-tenant-self-service-analytics) to deliver multi-tenant, self-service analytics.

![https://www.metabase.com/learn/images/embedding-charts-and-dashboards/powered-by-metabase.png](/learn/images/embedding-charts-and-dashboards/powered-by-metabase.png)

An example of using a public link to share a dashboard, with the **Powered by Metabase** footer.

## Permissions and auditing

Metabase handles permissions using groups, allowing you to [control access to individual databases and tables](/learn/organization/organization/data-permissions), or to the [collections](/learn/organization/organization/collection-permissions) containing your charts and dashboards.

![Grant table access](/learn/images/guide-to-data-permissions/grant-table-access.png)

E.g., Granting the Accounting group access to the Orders table.

If you need even more granular control over permissions, the Enterprise Edition includes data sandboxes that allow you to customize access to specific [rows](/learn/metabase-basics/administration/permissions/data-sandboxing-row-permissions) and [columns](/learn/organization/organization/data-sandboxing-column-permissions) in your tables. You can take a look at [How to scale self-service analytics](/learn/organization/organization/scale-self-service-analytics) for an overview.

Lastly, in the Enterprise Edition, the [Auditing tool](/learn/metabase-basics/administration/permissions/keep-tabs-on-your-data) lets you to track queries, downloads, dashboard views, and more, letting you answer the question “who saw what when?”

## Support

### Direct support

Metabase Cloud and Enterprise customers enjoy support directly from the Metabase team.

### Documentation and education

We’ve got you covered here. Metabase is easy to pick up and run with, but it has a lot of depth. We have reference materials in [our documentation](/docs/latest/), and walkthroughs and guides on [Learn Metabase](/learn/).

### The Metabase forum

If our docs don’t cover it, check out [our discussion forum](https://discourse.metabase.com), which is a treasure trove of tips and problems solved. We even have a few core members of the Metabase team hanging out in there to help the community.

## Migrating from Hosted Redash

Redash has provided an [FAQ page](https://redash.io/help/faq/eol) about how they plan to sunset Hosted Redash. Currently, it is not clear if they will provide an automated means for you to export the dashboards and charts that you have in Redash, but you can [follow along in Redash's discussion forum](https://discuss.redash.io/t/updated-migration-script/8755) to check for updates about this.

However, falling short of that, you have a couple of options. You can rebuild your queries individually in Metabase using the graphical query builder, or copy and paste the contents of your queries into Metabase's SQL editor.

## Okay, so this is interesting — what next?

If you’ve made it this far, it’s probably time to [spin up your own Metabase](https://store.metabase.com/checkout/login-details) and kick the tires. You can also check out this tutorial that shows you the basics of how to use Metabase.

{% include youtube.html id='4bNp906oOhs' %}

If you still have questions, feel free to [post on the community forum](https://discourse.metabase.com), or [use our contact form](/contact).
