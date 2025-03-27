---
title: "Metabase 50"
subtitle: Better caching, permissions, navigation, and more.
summary: "New features and improvements to query and present your data, navigate to find and file stuff faster, manage permissions, and keep everything organized."
date: 2024-08-27 00:12:18
categories: News
image: /images/posts/metabase-50/50.jpg
author: The Metabase Team
highlights:
  - title: Charts in subscriptions look the same as they do in Metabase
    description: What you see is what you get in- and outside of Metabase
    image: /images/releases/highlights/WYSIWYG-charts.jpg
    url_fragment: charts-in-subscriptions-look-the-same-as-they-do-in-metabase
  - title: Better caching controls
    description: More options to (in)validate cache or not, as well as caching for questions and dashboards.
    image: /images/releases/highlights/cache.jpg
    url_fragment: better-caching-controls
  - title: Improved data access and querying permissions
    description: More control over how groups view and query data
    image: /images/releases/highlights/permissions.jpg
    url_fragment: improved-permissions-with-more-control-over-how-groups-view-and-query-data
  - title: Command palette
    description: Cmd+k your way around Metabase
    image: /images/releases/highlights/command-palette.jpg
    url_fragment: cmdk-your-way-around-metabase-with-the-command-palette
---

Metabase 50 is coming in hot with 50+ new features. There's a lot here, so get settled in, or [join the webinar on September 3](/events/metabase-50-release-webinar) for a live walkthrough of everything new with our product team.

- **If you’re hosted on [Metabase Cloud](/cloud/)**, we’ll be rolling out these new features automatically over the next few weeks.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Feel like you _just_ finished an upgrade? [Try Metabase Cloud for free](/upgrade/) to automate upgrades and always be on the latest version.

## Charts in subscriptions look the same as they do in Metabase

{% include video-player.html id="dash-to-sub" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/dash-to-sub.mp4" %}

What you see in Metabase is what you get in subscriptions when it comes to Line, Area, Bar, Combo, Scatter, and Waterfall charts.

## Better caching controls

{% include video-player.html id="add-section" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/caching.mp4" %}

[Caching controls](/docs/latest/configuring-metabase/caching) now come with more clarity around how we decide to validate cache, with more options than before. For example, you can schedule your invalidation policy around the time you know you’re adding new data to your database. You can set one caching policy for all databases, or tailor your policies for each database. You can also set caching policies for questions and dashboards.

Advanced caching is available on [Metabase Pro and Enterprise plans](/pricing/).

## Improved permissions with more control over how groups view and query data

{% include video-player.html id="duplicate-replace" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/data-perms.mp4" %}

### View data and create queries access

We split data access into [**View data** or **Create queries**](/docs/latest/permissions/data). This split makes it easier to reason about permissions, and allows you to set viewing and querying privileges table by table.

### Blocked access now available at the table level

You can now [block groups from viewing data](/docs/latest/permissions/data#blocked-view-data-permission) from individual tables, even if the group has collection access to questions and dashboards that query that data.

### Upgrading from old permissions

[Your permissions will automatically be upgraded, with _NO change_ to your existing permission settings](/docs/latest/permissions/no-self-service-deprecation). Your permissions settings will look different, but everyone will have the same access as before, only now you'll have more control over permissions if you ever want to change them. In some rare cases we'll email you about how to manually migrate permissions that we couldn't automatically migrate due to the limitations of the old system.

Advanced permissions are available on [Metabase Pro and Enterprise plans](/pricing/).

## Time-over-time comparisons in the query builder with the new `Offset` custom expression (yes, window functions!)

It’s now easier to quantify when it has(n’t) been your day, your week, your month—or even your year. You can now spot it using the [`Offset` custom expression](/docs/latest/questions/query-builder/expressions/offset) to compare numeric data values with previous time period.

As one of our most requested features, this opens up the use of [window functions in the query builder](/learn/time-series/time-series-comparisons). We’ll soon add it as another clickable element in the query builder to let you and your team skip writing expressions.

[Watch a video tutorial of Alex making year-over-year comparison charts.](https://www.youtube.com/watch?v=LgPiQdkV4g8)

## Cmd+k your way around Metabase with the command palette

{% include video-player.html id="required-filter" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/command-palette.mp4" %}

Return to a recently viewed question or dashboard. Create a new query or model. Search and jump to admin settings, and more. Do whatever you want to do and get wherever you want to go in Metabase without leaving the comfort of your keyboard.

## Improved menus for picking data and moving stuff around

{% include video-player.html id="trend-chart" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/entity-picker.mp4" %}

Speaking of smoother ways to get to the things you want, item menus now set out a clearer path to get to what you need, whether you’re picking a data source to create a new question, or finding a dashboard to add a question to.

The finder view anticipates obvious choices, like showing recent items, and organizing stuff into tabs by type, like models, collections, saved questions, and more.

## New chart types and ways to customize your visualizations

Besides the following headliners in this category, we delivered a bunch of [overall improvements to visualizations](https://github.com/metabase/metabase/releases) to make them better and easier to work with.

### Combo stacked bar charts

![combo-stacked-bar](/images/posts/metabase-50/combo-stackedbar.png)

A stacked bar chart with trend line is double the chart power in one card.

### Stacked charts with data values displayed on each bar in the stack

![stacked-bar-values](/images/posts/metabase-50/stacked-bar-values.png)

In-chart values currently only apply to bar charts, with more chart types to follow in future versions.

### Customize the thickness or pattern of lines for each series in charts

![line-chart-weight](/images/posts/metabase-50/line-chart-weight.png)

Make lines in a chart thicker or thinner depending on what you want to stand out. Also options for dashed and plotted line patterns.

### Unpin y-axis from zero

{% include video-player.html id="serialization" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-50/unpin-from-zero.mp4" %}

Remove unnecessary whitespace from charts to focus on the range where stuff is actually happening.

## Create custom columns with combine and extract functions with a click 🪄

Bypass custom expressions to combine values in two columns into a new column (e.g., First and Last name → Full name), or pull out part of a value (e.g., email address → domain name). You now have a button in column headers and shortcuts in the query builder to combine or extract data in columns.

## The data browser now includes models

[Models](/docs/latest/data-modeling/models) claim their rightful, discoverable place in the left-hand nav panel, alongside your databases.

If you're on the Metabase Pro or Enterprise plan, you can also toggle on the verified models filter to give your team an even more direct path to the most valuable, reliable building blocks.

## More ways to upload and manage CSVs

First there was CSV upload. Then there was Append CSV data. [Now there’s Replace CSV](/docs/latest/exploration-and-organization/uploads#create-append-or-replace-models-with-uploads). Does what it says, and gives you more ways to bring your data in and analyze your CSV data in Metabase.

Admins on Metabase Pro and Enterprise plans can now also delete CSVs from a table in the admin panel.

## Added customization options for the appearance of your Metabase with white-labeling

Turn down the Metabaseness by [hiding or customizing illustrations on the login page](/docs/latest/configuring-metabase/appearance#metabase-illustrations), the home page, search results and more. You can swap out images like the lighthouse, sailboat, and others for images that speak to your own brand, or drop them completely.

White-labeling is available on [Metabase Pro and Enterprise plans](/pricing/).

## Migrating to Metabase Cloud is smoother than ever

Moving from self-hosted deployment to Metabase Cloud now comes with more end-to-end control over the migration process, and a clearer workflow. [Check out the guide](/docs/latest/cloud/migrate/guide).

[Find out if Metabase Cloud is the way to go for you.](/cloud/)

## Easier, more automated setup of air-gapped Metabase

Take your Metabase off the grid. Setting up an [air-gapped, offline version of Metabase](/product/air-gapping) now works almost like any other version of Metabase, with a more straightforward workflow and less technical knowledge needed.

Air-gapped deployment is available on the [Metabase Enterprise plan](/product/enterprise).

## Smaller but still cool stuff

### Brand new Druid JDBC driver added

This new Druid driver supports Druid SQL and all available SQL JDBC features with nested column parsing and querying.

The new Druid driver uses a different type of connection and query language than the previous driver. If you’re using the previous Druid driver, you’ll need to start over by [creating a new database connection](/docs/latest/databases/connections/druid).

### ClickHouse driver now supports CSV uploads and connection impersonation

The ClickHouse driver update now lets you store and analyze CSVs, and supports impersonated permissions.

Impersonation is available on [Metabase Pro and Enterprise plans](/pricing/).

### Example dashboard ships with all new Metabases

For those new to Metabase who want a quick look at dashboards, there’s now an example dashboard to play with. The dashboard is made from sample data and ready to embed so you can get a feel for the embedding setup flow and see how a dashboard will look in your app.

### New tooltips show metadata in more places

We added some handy tooltips in the query builder and in column headers.

### The query builder now suggests custom expressions for easy reference

Get the full list of available [aggregations and functions](/docs/latest/questions/query-builder/expressions-list) without having to dip out of the query builder to reference or search other sources.

### Downloaded data is formatted by default

By default, downloaded data retains the format you set in your question. You can opt for unformatted downloads by holding down the ctrl key when you click export.

### New embedding setup flow to get from zero to proof of concept

When setting up a new Metabase for embedding, Metabase can help you through the setup, with tools and instructions to embed your first chart fast.

### Download diagnostics for quicker debugging

Export error logs to figure out what’s going on with your Metabase and share with our customer success team for speedier resolution. [Get diagnostics via the Ctrl+F1 shortcut](/docs/latest/troubleshooting-guide/diagnostic-info).

### New video tutorials

Visual learners, this one’s for you. We’ve added video tutorials to our Learn repertoire. Brush up or share the love on [searching in tables](https://www.youtube.com/watch?v=45ltec8BUew), [highlighting one bar in a chart](https://www.youtube.com/watch?v=A6nHjKCfVUA), and more on our channel on YouTube. Like, subscribe, share, etc.

### Metabase in Danish!

Vi støtter nu dansk som nyt sprog. Thanks for the Dansk.

### Breaking changes

- **Google Analytics driver has now been removed.**
- **[Check out the API changelog for breaking changes](https://github.com/metabase/metabase/blob/release-x.50.x/docs/developers-guide/api-changelog.md)**
- **You can no longer configure uploads via environment variables.** - You can no longer configure uploads via environment variables. The following environment variables no longer work:
  - `MB_UPLOADS_ENABLED`
  - `MB_UPLOADS_DATABASE_ID`
  - `MB_UPLOADS_SCHEMA_NAME`
  - `MB_UPLOADS_TABLE_PREFIX`

If you’re running the Pro or Enterprise version of Metabase, you can configure uploads on startup via the [config file](/docs/latest/configuring-metabase/config-file). `uploads_enabled`, `uploads_schema_name`, and `uploads_table_prefix` are now database-specific settings, which you can configure like so:

```yaml
config:
  settings:
  databases:
    - name: test-data
    ...
    uploads enabled: true
    uploads_schema_name: uploads
    uploads_table_prefix: uploads
```

## Join the webinar for a walkthrough of these new features with the product team

[Save your spot for the live event on September 3](/events/metabase-50-release-webinar).

Or if you want to get into the nitty-gritty, check out our [release notes in GitHub](https://github.com/metabase/metabase/releases/).

## Be part of the embedded analytics SDK beta program

We’re working on an SDK to make interactive embedding more powerful, flexible and easier to customize, and we're looking for people to partner with us and provide feedback to help shape the final product. Could it be you?

[Sign up for the embedding SDK beta program](https://forms.gle/PKJBF5pxMwJTTwH4A)

### Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. To see what other features we have in the works, check out our [product roadmap](/roadmap).

Cheers,

The Metabase Team
