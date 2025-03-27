---
title: "Metabase 51"
subtitle: Improved visualizations, Databricks driver, iframes in dashboards, and more.
summary: "A bunch of new stuff to help your team make the most of your data: viz upgrades, revamped metrics, more tools to manage accounts and keep your Metabase tidy, and a lot more."
date: 2024-11-04 00:12:18
categories: News
image: /images/posts/metabase-51/51-cover.jpg
author: The Metabase Team
highlights:
  - title: Add iframe cards to dashboards
    description: Include external content alongside your charts in Metabase
    image: /images/releases/highlights/iframe-cards.jpg
    url_fragment: add-external-content-to-dashboards-with-iframe-cards
  - title: Revamped metrics
    description: Official, reusable calculations made easier to find and use
    image: /images/releases/highlights/revamped-metrics.jpg
    url_fragment: revamped-metrics-are-now-more-functional-as-reusable-calculations
  - title: Let people change time granularity on dashboards
    description: View your KPIs by week, month, year, etc., with just a click
    image: /images/releases/highlights/time-granularity.jpg
    url_fragment: new-time-grouping-widgets-let-people-view-dashboards-by-year-quarter-month-week-day-and-more
  - title: Databricks driver
    description: It's official, fully supported with help on offer when you need it
    image: /images/releases/highlights/Databricks.jpg
    url_fragment: its-official-databricks-driver-is-here
  - title: Add way more context in your tooltips
    description: Show more info when people hover on your charts
    image: /images/releases/highlights/Tooltips.jpg
    url_fragment: add-way-more-context-in-your-tooltips
---

{% include youtube.html id="oqoqSiVihdo" %}

Metabase 51 has a bunch of new stuff to help your team make the most of your data: viz upgrades, drill-through improvements, more tools to manage accounts and keep your Metabase tidy, and a lot more.

[Join the webinar on November 21](/events/metabase-51-release-webinar) for a live walkthrough of what’s new in 51 with our product team.

- **If you’re hosted on [Metabase Cloud](/cloud/)**, we’ll be rolling out these new features automatically over the next few weeks.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Feel like you _just_ finished an upgrade? [Try Metabase Cloud for free](/upgrade/) to get automatic upgrades and excellent technical support.

## Add external content to dashboards with iframe cards

{% include video-player.html id="duplicate-replace" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-51/iframes.mp4" %}

You thought your dashboards were cool before. Now you can add content from sources outside of Metabase into your dashboards via [iframe cards](/docs/latest/dashboards/introduction#iframe-cards). Think Loom recordings, Google Docs, a Typeform widget survey—whatever you can dream up and put in an iframe, you can now put on your Metabase dashboard. Have everything in one dashboard so people have all the context in one place.

[Check out Conor's demo of iframe cards and more visualization upgrades.](https://youtu.be/1GiqH3BSkjY)

## Revamped Metrics are now more functional as reusable calculations

Give your team an [official way to calculate things in Metabase with metrics](/docs/latest/data-modeling/metrics). Join two or more metrics to make a new metric, or join with additional data sources, e.g., to find the revenue from your department.

Metrics could previously only be created and viewed by admins. Now anyone can create new metrics and save to collections. Like models, metrics now have their own page you can browse. Admins can also mark vetted metrics as official, so people know they’re using moderated calculations.

When you upgrade, Metabase will move any existing metrics you have into a new collection (you'll no longer see metrics in your admin settings).

## New time grouping widgets let people view dashboards by year, quarter, month, week, day, and more

If you’ve got a KPI that you want to view by week, month, quarter, etc., now you’re just a click away from adjusting the time granularity without having to rewrite the query for different [time groupings](/docs/latest/dashboards/filters#time-grouping-parameter).

[Watch Alex change the time granularity on a dashboard.](https://youtu.be/GuHsIDiVTKc)

## It’s official: Databricks driver is here

Databricks was previously available as a community driver, which meant you could connect to Metabase, but it was [built by some other talented folks](https://github.com/relferreira/metabase-sparksql-databricks-driver) and we didn’t officially support it (in spirit, yes, but not in an active, development-time, help-on-offer, kind of way). [Now we do](/docs/latest/databases/connections/databricks)!

[Watch Matthew connect Databricks to Metabase.](https://youtu.be/NxuQmc9eZ3E)

## Create custom webhooks to send alerts anywhere

In addition to email and Slack, you can now [set up webhooks](/docs/latest/configuring-metabase/webhooks) to send notifications to pretty much any platform. Add to Zapier then send updates anywhere, like to MS Teams, to a database—even fax for those with strict compliance requirements.

This is a step towards expanding our notification options in Metabase with more to come over in future releases. Think subscriptions, system events, and more.

## Add way more context in your tooltips

![tootips](/images/posts/metabase-51/Tooltips.jpg)

Add additional metrics in [tooltips](/docs/latest/questions/visualizations/tooltips) to give more context when people hover over your charts. By default, tooltips will only show what’s on the chart. If there’s more going on below the surface that you’d like to show, head to your visualization settings and choose which supplementary metrics to include.

[Watch Thomas add more detail to tooltips.](https://youtu.be/L8x7rHkxVSg)

## SCIM account provisioning

Keep authentication and account provisioning separate with SSO and SCIM. Now, in addition to SSO, you can [set up user provisioning with SCIM](/docs/latest/people-and-groups/user-provisioning) to manage who gets an account vs. who doesn’t, as well as automated deprovisioning of Metabase accounts.

SCIM authentication and user provisioning is available on [Pro and Enterprise plans](/pricing/).

## Click on a chart’s legend to highlight a series

![Click-to-hide](/images/releases/highlights/Click-to-hide.jpg)

Anyone viewing dashboard or question can have more control over what they’re looking at without needing to edit a query or change the view for everyone else. You--or people looking at your dashboards and charts--can click on the bubbles in the chart legend to hide series, and click again to show.

## New sunburst chart visualization

![sunburst](/images/releases/highlights/Sunburst.jpg)

Add depth to your [pie charts](/docs/latest/questions/visualizations/pie-or-donut-chart) with the new sunburst charts that let you add more rings to your pie.

You now have more flexibility and control over how your pie chart legends are named, ordered, what to show and hide, or how many decimal places to include.

[Catch Cynthia's passion for pie charts and see improvements in action.](https://youtu.be/Yr5UFsUkLfA)

## Exported pivot tables keep their pivotness

![pivot-tables](/images/releases/highlights/Pivot-tables.jpg)

Pivot tables will keep all their pivoty goodness when exported in a download or dashboard subscription, so you can continue working on the table in Excel.

Another thing: by default, all exported data keeps the formatting you set in Metabase (e.g., if you formatted 187.50 as \$187.50), but you can opt to download without formatting if you take your data raw.

## Questions created with SQL now have more interactivity

If “Drill-through doesn’t work on SQL questions” looks familiar to you - we’ve got great news. Now when you click on table results and charts made with SQL, you’ll see column-heading filters, distribution, and drill-through options. There are still some things sacred to the realm of questions made with the query builder, like the ability to breakout by category, and ‘See all records’, but our updates to the native query editor will help people pull threads and explore data in more places, regardless of whether the question was made with SQL or the query editor. No configuration needed.

## Even the trash gets a glow-up

Does what it says on the ~~trashcan~~ tin. Archiving content was often done with the intention of getting rid of it. Although items were out of sight and out of mind, they weren’t really gone. If you got a link to an archived item you couldn’t see it or resurrect it. Now, if you happen to see something that’s been trashed, there’ll be a clear indication with a banner and you’ll have the option to restore or delete it permanently.

[Trash](/docs/latest/exploration-and-organization/delete-and-restore) is also now a collection-you can search, filter, sort, view metadata. It’s visible to everyone in your Metabase, but which trashed items people can see will depend on their collection permissions.

## Keep your Metabase tidy with the new bulk clean-up tool

Click a button to send collection items to the trash when they haven't been viewed for a set amount of time. Decluttering collections helps keep your Metabase clean and makes it easier to find stuff.

For now, [collection clean-up](/docs/latest/exploration-and-organization/collections#cleaning-up-collections) is a manual process. Automatic clean-up is coming soon. [Available on Pro and Enterprise plans](/pricing/).

[Watch Alex clean up a collection fast](https://youtu.be/XPrf3F_cHgI).

## Embedding improvements

### Embedded analytics SDK is available in beta for the most modular, flexible embedding ever

Use React to embed individual components of Metabase like charts, dashboards, or even the query builder on its own. Style each component to fit seamlessly with your app, and tailor the level of access and interactivity per person or group. All the best bits of Metabase ready to embed, unconstrained by an iframe for maximum control and customization options.

Try the [Embedded analytics SDK](https://metaba.se/sdk) beta on all plans, including open source. You can use it in production on [Metabase Pro and Enterprise plans](/pricing/).

### Export static and public embeds to PDF

Controls for downloading questions to PDF are now more consistent (and generally just better) on static embeds and public links. Admins on [Pro and Enterprise plans](/pricing/) can [choose whether to show export buttons](/docs/latest/embedding/static-embedding-parameters#disable-downloads-for-an-embedded-question-or-dashboard).

### Improved transparent theme for static and public embeds

We’ve introduced the option to choose between the light and dark themes and optionally toggle background transparency. Transparent mode isn’t new, but we’ve taken on your feedback about what was working and what wasn’t to give you a toggle that ensures your static embeds blend more smoothly, without disappearing entirely 🎩🪄

## Stable entity IDs for moving content across instances with serialization

For those of you using serialization to move dashboards, questions, and other things between instances, inconsistent IDs can make it way harder than it needs to be. [Stable entity IDs](/docs/latest/installation-and-operation/serialization#metabase-uses-entity-ids-to-identify-and-reference-metabase-items) remove that pain by ensuring IDs stay the same regardless of which environment or instance you’re in, for smoother transfer of content.

## And more

### Boolean expressions in custom columns

You can now use the boolean return value of custom expressions without any hacks to cast into strings or numbers. Do you love it—true or false?

### Add multiple breakouts on the same column

See your data by different time breakouts from the query builder without needing to create a custom column. Year AND months. days of the week AND hour of day, and more.

[Watch Alex add multiple breakouts to charts](https://youtu.be/vkwBkRyX7dM).

### Metabase Cloud Storage: you don't need a database to get started with Metabase

Start analyzing and visualizing your data even if you don’t have a data team or the technical skills to set up a database on your own. [Upload your CSVs directly into Metabase with built-in storage](https://store.metabase.com/checkout?dwh=1).

### Get notified about new releases with our new Stable, Beta, and Nightly channels

Select from a dropdown menu which type of releases you want to be notified about - Stable (recommended for production), Beta, or Nightly (contains all work from the master branch. Only recommended for experimental use).

### BigQuery improvements include quicker syncs and JSON unfolding

We’ve reduced the time it takes to sync. And now with JSON unfolding available, you can query nested fields.

### Azure managed identity for Postgres auth

Super secure passwordless authentication now available on self-hosted [Pro and Enterprise plans](/pricing/).

### New environment variable limits on how much data you can download

We’ve added a [new environment variable](/docs/latest/configuring-metabase/environment-variables#mb_download_row_limit), `MB_DOWNLOAD_ROW_LIMIT`, so people with specific use cases can change it. This is niche, but it's a nice option for those who need it.

## Join the webinar for a walkthrough of these new features with the product team

[Save your spot for the live event on November 21](/events/metabase-51-release-webinar).

Or if you want to get into the nitty-gritty, check out our [release notes in GitHub](https://github.com/metabase/metabase/releases/).

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. To see what other features we have in the works, check out our [product roadmap](/roadmap).

Cheers,
The Metabase Team
