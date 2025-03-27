---
title: "Metabase 49"
subtitle: Making it easier to get stuff done
summary: "This release is all about making it easier to get stuff done in Metabase. Dashboard improvements make setup and editing smoother. Improvements to trend charts are up 400%. You can append data to CSV uploads. API keys. Serialization for Metabase Cloud (take a breath!), and lots more."
date: 2024-04-04 00:12:18
categories: News
image: /images/posts/metabase-49/metabase-49.jpg
author: The Metabase Team
highlights:
  - title: Dashboard improvements
    description: Quicker dashboard set up and editing
    image: /images/releases/highlights/dashboard-improvements.png
    url_fragment: show-dashboard-filters-only-on-tabs-where-theyre-relevant
  - title: Additional comparisons in Trend charts
    description: More options to configure time ranges and benchmarks in trend charts
    image: /images/releases/highlights/additional-comparisons-in-trend-charts.png
    url_fragment: add-more-comparisons-to-trend-charts
  - title: Append data to CSV uploads
    description: Upload additional rows to an existing CSV-created model
    image: /images/releases/highlights/append-data-to-csv-uploads.png
    url_fragment: append-data-to-csv-uploads
  - title: Serialization in Metabase Cloud
    description: API endpoints for serialization for import and exporting application data.
    image: /images/releases/highlights/serialization-in-metabase-cloud.png
    url_fragment: serialization-now-works-with-metabase-cloud
---

This release is all about making it easier to get stuff done in Metabase. Dashboard improvements make setup and editing smoother. Improvements to trend charts are up 400%. You can append data to CSV uploads. API keys. Serialization for Metabase Cloud (take a breath!), and lots more.

- **If you’re hosted on [Metabase Cloud](/pricing/)**, we’ll be rolling out these new features automatically over the next few weeks.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Feel like you _just_ finished an upgrade? [Try Metabase Cloud for free](/upgrade/) to automate upgrades and always be on the latest version.

## Show dashboard filters only on tabs where they’re relevant

If you’re [adding filters](/docs/latest/dashboards/filters) to a multi-tabbed dashboard, you might have one filter that applies to cards in some tabs and not in others. Now Metabase will automatically hide filters in tabs where they’re not hooked up to any cards.

## Section templates for dashboards

{% include video-player.html id="add-section" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/add-section.mp4" %}

To get a head start on adding content to a dashboard, you can now choose from three [templated sections](/docs/latest/dashboards/introduction#dashboard-sections). Add your questions with a click of a button. You can resize and shape the cards as you want, or roll with the format as-is without having to dedicate precious brainpower to formatting, we won’t tell.

## Duplicate dashboard cards and tabs

Tessellate your way to dashboard artistry. Once you’ve got the size and shape of your cards down to a fine art, you can click to copy the card, and sub in a different question (spoiler on that below). You can duplicate any card type - questions, headers, text - as well as duplicate entire tabs, cards included.

## Swap out questions on a dashboard card

{% include video-player.html id="duplicate-replace" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/duplicate-replace.mp4" %}

No more removing, adding, resizing, and rearranging cards: now you can just [click and replace](/docs/latest/dashboards/introduction#arranging-dashboard-cards). Fin. Fade to black.

## Fixed-width canvas for consistent dashboard display

To make sure card aspect ratios stay constant on dashboards across devices and screen sizes, toggle on [fixed-width](/docs/latest/dashboards/introduction#dashboard-width) at the top of your dashboard. When set to fixed-width, what you see is what you get.

## Set dashboard filters to require a value

{% include video-player.html id="required-filter" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/required-filter.mp4" %}

Ensure people are always looking at a contextual, filtered view of a dashboard by [requiring a filter](/docs/latest/dashboards/filters#requiring-a-filter-or-parameter). You can add a default value that dashboard viewers will be able to change, but not remove.

## Add more comparisons to trend charts

{% include video-player.html id="trend-chart" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/trend-chart.mp4" %}

[Trend charts](/docs/latest/questions/visualizations/trend) give you a snapshot on how KPIs are tracking against a previous time period or target number. Now you have more options for configuring those time ranges and benchmarks. And you can display up to three comparisons on one chart.

**Adjust and compare against**:

- The unit of time, from minute through to quarter
- The increment of that time period, e.g. past _two_ months, or _three_ quarters
- A static number, like a goal
- Another column, like an average

## Append data to CSV uploads

{% include video-player.html id="csv-append" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/csv-append.mp4" %}

Avoid the pile up of `nps_q12024`, `nps_q22024`, `nps_q32024` models ad infinitum with this neat way of keeping your CSV uploads easier to manage and well organized. [Upload additional rows to an existing CSV-created model](/docs/latest/exploration-and-organization/uploads), without needing to delete and reupload afresh.

## Serialization now works with Metabase Cloud

{% include video-player.html id="serialization" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/serialization.mp4" %}

We’ve added [API endpoints for serialization](/docs/latest/installation-and-operation/serialization#serialization-via-the-api) for import and exporting application data. If you’re an admin who’s been looking longingly for a way to set up multiple cloud-hosted instances, you’ll want to take note.

Serialization via API runs as a transaction, making it faster and easier to manipulate, regardless of deployment type.

Serialization is available on [Metabase Pro](/product/pro) and [Enterprise plans](/product/enterprise).

## Authenticate API requests with API keys

[API Keys](/docs/latest/people-and-groups/api-keys) are not tied to a password, don't expire, and you can assign each key to a specific group.

These API keys most often come in handy for automating processes around user management for internal and embedded analytics, like provisioning, group management, and permissions.

## New ways to customize Metabase’s appearance

{% include video-player.html id="white-label" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-49/white-label-ui.mp4" %}

We’ve added [new appearance settings](/docs/latest/configuring-metabase/appearance) to tuck traces of Metabase out of view in your white-labeled instance.

Hide links and references to ‘Learn More’ Metabase pages, in addition to the lighthouse illustration, Metabot, and more. You can also hide the Help link in the settings menu, or customize the URL it goes to. We were never here 🫥

White-labeling is available on [Metabase Pro](/product/pro) and [Enterprise plans](/product/enterprise).

## Connection impersonation is now available for Redshift

In addition to Postgres and Snowflake. [Connection impersonation](/learn/permissions/impersonation) lets you assign groups to use database-defined roles based on user attributes. By defining permissions in your database, you can use impersonation to bring row-level permissions to Metabase's SQL editor (in the same way that data sandboxing restricts row access for the query builder), or apply data masking policies. Available on [Metabase Pro](/product/pro) and [Enterprise plans](/product/enterprise).

## Data export formatting matches what you see in Metabase

Data exports via CSV, XLSX, JSON and the API [now look the same as you've set them up in Metabase](/docs/latest/questions/exporting-results). From 49.3, we’ve added an option to let you get at unformatted data in exports if you prefer the previous behavior.

## Connect to Snowflake with custom hostnames

You can now connect to your Snowflake database by entering the full hostname of the server, making connecting via internal network links like AWS PrivateLink, Azure Private Link, GCP Service Connect or external service proxies possible.

### Breaking changes

- **Pulses have been removed**. Switch to **[subscriptions and alerts](/docs/v0.52/questions/sharing/pulses)** instead (they're way better).
- **[Check out the API changelog for breaking changes](https://github.com/metabase/metabase/blob/release-x.49.x/docs/developers-guide/api-changelog.md)**

### Join the product team for a walkthrough of these new features

[Watch a replay of the webinar](/events/metabase-49-release-webinar).

Or if you want to get into the nitty-gritty, check out our release notes to see everything we’ve been up to:

- [OSS/Starter](https://github.com/metabase/metabase/releases/tag/v0.49.3)
- [Pro/Enterprise](https://github.com/metabase/metabase/releases/tag/v1.49.3)

### Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. To see what other features we have in the works, check out our [product roadmap](/roadmap).

Cheers,

The Metabase Team
