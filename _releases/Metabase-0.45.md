---
title: "Metabase 0.45"
subtitle: Improvements for your day to day
summary: "For this release, we’ve focused on improving your day-to-day Metabase experience. There’s a few cool things, but most of our effort went into improving key features, with the goal of making Metabase more reliable and easier to work with."
date: 2022-12-05 00:12:18
categories: News
image: /images/releases/metabase-0.45.jpg
author: The Metabase Team
highlights:
  - title: Official Amazon Athena data source 
    description: Athena’s available for all plans on Metabase Cloud!
    image: /images/releases/highlights/athena-data-source.png
    url_fragment: metabase-now-supports-amazon-athena-as-an-official-data-source
  - title: Easier to work with charts 
    description: Easier-to-work with viz settings, and improvements to charts sent on Slack and email.
    image: /images/releases/highlights/easier-to-work-with-charts.png
    url_fragment: better-charts-and-a-new-visualization-settings-ui
  - title: Better Models 
    description: Easier to create, more reliable, and faster to to edit and iterate on.
    image: /images/releases/highlights/better-models.png
    url_fragment: vastly-improved-models
  - title: New datetime functions in the query builder 
    description: Extract datetime, do math with dates, and convertTimezone.
    image: /images/releases/highlights/datetime-functions.png
    url_fragment: new-datetime-functions-in-the-query-builder
  - title: Load an instance from a config file 
    description: Pre-configure instances (including database connections) in YAML.
    image: /images/releases/highlights/load-instance-from-config-file.png
    url_fragment: loading-metabase-from-a-config-file
---

{% include youtube.html id="enOp_JxbCyo" %}

For this release, we focused on improving the day-to-day Metabase experience. We added a few cool things, like the new datetime functions available in the query builder, but we dedicated most of our efforts to improving key features, with the goal of making Metabase more reliable and easier to work with.

Plus: we added a new, officially supported database.

![Metabase and Amazon Athena](/images/posts/metabase-0.45/metabase-and-amazon-athena.png)

## Metabase now supports Amazon Athena as an official data source

Some of you self-hosting Metabase have been using the Athena community driver for some time. Our engineers picked up the driver, originally developed by the inimitable Damon Cortesi (thanks, Damon!), and made a bunch of improvements to bring it up our high standards for officially supported data sources (all officially supported database drivers have to survive our punishing testing gauntlet).

So, as of this release (Metabase 45), we are officially committing to supporting the Athena driver going forward. Which means that **Athena will be available for all plans on Metabase Cloud!** Give it a try; it's like shooting fish in a S3 bucket.

![Better charts and new visualization settings UI](/images/posts/metabase-0.45/better-charts-ui.png)

## Better charts and a new visualization settings UI

We redesigned the visualization settings UI to make charts easier to work with, including the option to reorder series (which makes funnel charts a _lot_ easier to work with).

Static charts (the charts Metabase sends via email and Slack) now support more viz types, and they look a lot more like their in-app counterparts, down to the axes, legends, color selection, column formatting, and more.

Row charts got a complete revamp, so they're now on par with Metabase's bar charts. We also polished a bunch of other chart types: we brought conditional formatting to pivot tables, improved labels on pie charts, and more.

![Vastly improved models](/images/posts/metabase-0.45/models-improvement.gif)

## Vastly improved models

First off, models are easier to create; there's no need to create a saved question first, you can just click on **+ New** > **Model**.

And models are now _much_ more reliable, and faster to edit and iterate, with fewer query-reruns and a snappier UI. When you're in the native editor writing SQL, you can use autocomplete to reference models, and browse models and their fields from the data reference sidebar.

Model caching is now available for MySQL (in addition to PostgreSQL). If you want model caching for your data source, let us know [on GitHub](https://github.com/metabase/metabase/issues).

![New datetime functions](/images/posts/metabase-0.45/datetime-functions.gif)

## New datetime functions in the query builder

It was about time to unlock more expressivity in the query builder. You can now:

- Extract datetime components with functions like `hour`, `day`, `month`, and so on.
- Do math with dates: [`datetimeAdd`](/docs/latest/questions/query-builder/expressions/datetimeadd), [`datetimeSubtract`](/docs/latest/questions/query-builder/expressions/datetimesubtract) and, oh yeah, [`datetimeDiff`](/docs/latest/questions/query-builder/expressions/datetimediff).
- And the big one: [`convertTimezone`](/docs/latest/questions/query-builder/expressions/converttimezone). Pairing `convertTimezone` with models allows you to provide data sources with adjusted time zones, irrespective of how they’re stored in the DB.

![Metabase configuration file](/images/posts/metabase-0.45/config-file.png)

## Loading Metabase from a config file

On self-hosted [paid plans](/pricing/), you can now load a Metabase from a [configuration file](/docs/latest/configuring-metabase/config-file) (`config.yml`). This allows you to pre-configure instances (including database connections) in YAML, and spin up new instances without having to go through the UI or mess around with environment variables.

## Metabase is now available in Arabic!

Metabase adds Arabic to its [list of supported languages](/docs/latest/configuring-metabase/localization). A huge shukran to everyone who helped out with the translation.

## And more!

- Dashboard filters now offer single-select in addition to multi-select behavior.
- Deep copy dashboards: when [duplicating dashboards](/docs/latest/dashboards/introduction#duplicating-a-dashboard), you can now choose whether to duplicate the cards in the dashboard. Which, ahem, is kind of how dashboard copying should have worked from the beginning.
- To make it easier to play with and learn how to use Metabase, we expanded the Sample Database that ships with Metabase to include more relevant, up-to-date data. Have at it.
- We improved the whole UX with respect to SSO, LDAP, and Google Sign-on.
- Timezones are now properly honored in BigQuery.
- For those of you self-hosting Metabase and using Prometheus for observability, you can now export Metabase metrics directly!

And, of course, lots of bug fixes and improvements all around: the bulk filtering UI, BigQuery, MongoDB, MySQL, and Redshift drivers, and more.

## Note that starting with this release, Metabase 0.45, Heroku support is now deprecated

With Heroku’s canceling of their free tier, Docker-based deployments and our own Metabase Cloud are now the easiest ways to deploy Metabase. With that, Heroku support is now deprecated, and will be removed in Metabase 0.46. To migrate off Heroku, see our guide on [Migrating from Heroku to Metabase Cloud](/cloud/docs/migrate/heroku).

## Full release notes

Check out our release notes to see everything we’ve been up to:

- [OSS](https://github.com/metabase/metabase/releases/tag/v0.45.0)
- [Pro/Enterprise](https://github.com/metabase/metabase/releases/tag/v1.45.0)

Which brings us, once again, to:

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Cheers,

The Metabase Team
