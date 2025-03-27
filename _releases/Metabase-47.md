---
title: "Metabase 47"
subtitle: Better looking dashboards, CSVs, better serialization and more
summary: This release has something for everyone. CSV uploads, PDF downloads, searching, serialization, and more.
date: 2023-09-19 00:12:18
categories: News
image: /images/posts/metabase-47/metabase-47.png
author: The Metabase Team
highlights:
  - title: Revamped dashboards
    description: Lots of improvements big and small to make building and viewing dashboards better
    image: /images/releases/highlights/revamped-dashboard.png
    url_fragment: dashboards-got-revamped
  - title: Upload CSVs
    description: Upload and start exploring from a CSV, no ETL required
    image: /images/releases/highlights/upload-csvs.png
    url_fragment: upload-and-analyze-data-from-csv
  - title: Overhauled serialization
    description: Serious upgrades to serialization allow for git-based workflows.
    image: /images/releases/highlights/overhauled-serialization.png
    url_fragment: powered-up-pro-features
---

{% include youtube.html id="QgIJQk4e87c" %}

Metabase 47 has got something in it for everyone—CSV uploads, PDF downloads, searching, serialization, and more.

- **If you’re hosted on [Metabase Cloud](/pricing/)**, we’ll be rolling out these new features automatically over the next few weeks.
- **If you’re self-hosting**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Tired of managing your instance? [Upgrade to a hosted plan](/upgrade/) and leave it to us.

## Dashboards got revamped

![Dashboards](/images/releases/dashboard-short.gif)

If you spend any time at all in Metabase, a good chunk of that time will be spent [playing around with dashboards](/docs/latest/dashboards/introduction), so we’ve made a LOT of improvements, big and small, to make that experience better all around.

- **Download dashboards to PDF for reporting and sharing made easier**
Skip the screenshots! One-click [PDF export](/docs/latest/questions/exporting-results#exporting-results-of-a-dashboard) is now available for dashboards. For embedded dashboards, only interactive embeds include PDF exports (PDF exports are unavailable for static embeds). This expands on the recently released PNG downloads for charts.

- **Keep dashboards organized with tabbed navigation**
[Chunk dashboards down](/docs/latest/dashboards/introduction#dashboard-tabs) into smaller sections to keep them easier to browse and absorb, all while keeping everything in one page.
- **Guide your team to the most valuable info by setting your home page to a dashboard**
Provide a clearer path to self-service by putting the most relevant dashboard right in front of people as soon as they open Metabase. In addition to recently added [link cards](/docs/latest/dashboards/introduction#link-cards), it’s easier to shepherd people to the right data.
- **Get more control over your dashboard setup with a more granular grid**
We can’t make new space (physics or something), but we can give you more flexibility over it by taking the grid from 18 squares across to 24. Now you can get your dashboards closer to how you want them to look, with more symmetry and precise placement.
- **Choose when dashboards apply filters and reload**
Slow dashboards can become annoying when filters automatically apply before you’re done making your selection. Now we’ll detect if it’s a slow dashboard, and switch to only applying filters once you say so. You can also configure this manually whenever you want.
- **Flow between dashboards and questions smoothly for quicker edits**
Not only is there now a back button for a very easy path from dashboard → question → dashboard, we cache results now for faster load times and less hammering your DB. Jump directly from dashboard edit mode to a question. And back again.
- **Hide dashboard cards when they don’t return results**
Keep things tidy and easier to consume by setting cards to not display if the results haven’t changed. This is especially useful in an operational dashboard, like a customer view, where a list may be empty.
- **Keep the flow when building dashboards**
We’ll remember the last dashboard you viewed and suggest it as the default to save a new question to. It’s the little things.
- **Keep dashboards organized with full-width headings**
Pairs well with dashboard tabs for clear structure and readability.

Our Head of Product Design, Maz Ameli, made a video walkthrough of how to [build dashboards like a pro](/events/building-metabase-dashboards-like-a-pro) using some of these new features (alongside some old favorites).

## Upload and analyze data from CSV

![csv-upload](/images/posts/metabase-47/csv-upload.gif)

This long-awaited and heavily requested feature is finally here! [CSV upload](/product/csv-uploads) allows you to bring together more data sources, faster, and apply the full power of Metabase to your spreadsheets. Anyone can start analyzing data without it having to be ETL’d in, and join with existing data from a database. CSV uploads are supported for Postgres and MySQL right now.
CSVs are uploaded straight into collections, becoming models, and admins can choose the schema where they go.

[Find out more about CSV uploads and how to use them here](/docs/latest/databases/uploads).

## Powered-up Pro features

Our [Pro](/product/pro) and [Enterprise](/product/enterprise) plans ship with advanced buttons and levers to make lighter work of managing your Metabase, people, and permissions.

### We overhauled serialization to improve exporting and importing your Metabase data

We’ve made some serious upgrades to [serialization](/docs/latest/installation-and-operation/serialization) to get beyond just instance portability to enable [git-based workflows](/learn/administration/git-based-workflow). Now you can go from development to git with `export`, and from git to production with `import`.

Headline changes that take serialization from 1.0 to 2.0 include: more selective serialization, loading internal references, deduplication, better performance, and more.

This update comes with a few changes, including new commands and differences in the `export` file structure. [Learn more in our docs](/docs/latest/installation-and-operation/serialization).

### Row-level SQL permissions with connection impersonation

![connection-impersonation](/images/posts/metabase-47/SQL-Impersonation.jpg)

You can now [configure database-side roles](/docs/latest/permissions/impersonation) (think `USE ROLE` or `SET ROLE`) when querying. This means you can give a group access to the native/SQL editor, while restricting the group's access to data based on a specific database role, centralizing permissions on the DB. This is currently available with Postgres and Snowflake to start.

## Fresh new icons

![icons](/images/posts/metabase-47/optimized-sync.jpg)

New look, who ‘dis? You probably don’t need this one pointed out, but we couldn’t not give it a little shout out. Icons got prettier, but also clearer and more consistent.

## Other things that got better

- **Your data made more searchable:**
Type in a customer’s name, like Acme, Inc. and we’ll surface specific rows - not just the Customer model or table. This can be defined in your model at the column level, allowing you to bypass having to click into the model, collection, or table a row exists in.
We’re also no longer searching within SQL queries, so search performance is now anywhere between 2 and 30 times faster, depending on the contents of your instance.
- **Actions got some more love:**
We’re continuing to iterate on the recently released [actions](/docs/latest/actions/introduction) by making it easier to edit an action in place, and allowing form fields to be hidden.
- **Single-tenant hosting in our Enterprise tier:**
Your analytics on a proverbial desert island with no noisy neighbors. Our [multi-tenant cloud-hosting already prioritizes isolation](/security), with single-tenancy you get a dedicated database.
- **Drill-throughs are more intuitive:**
We’ve changed up some of the language and symbols on the drill-through modal to be clearer and more intuitive. Try clicking a cell in a table or data point in a chart to see them in action.
- **X-ray models:**
The same magic you get for tables, now also for models.
- **Metabase in Latvian!**
Sveiki! Thanks to our contributors who have made Metabase in Latvian a reality!

## FYI / Breaking changes

- We recently had a vulnerability which required all Metabase instances to be upgraded. You can read a [full post-mortem on our blog](/blog/vulnerability-post-mortem). 47 includes all of the security patches. If you haven’t yet upgraded, please do so immediately. We apologize for any inconvenience this has caused.
- We’re removing the `POST /api/database/:id/sync` API endpoint. If you’re using this endpoint to sync and scan your database, we recommend using `POST /api/notify/db/:id`, or `POST /api/database/:id/sync_schema` followed by `POST /api/database/:id/rescan_values`.
- We removed two endpoints for bulk editing dashboard cards:
    `DELETE /api/dashboard/:id/cards`
    `POST /api/dashboard/:id/cards`<br>
To create, update, and delete dashboard cards in bulk, use `PUT /api/dashboard/:id/cards`. [More info in our documentation](/docs/latest/api/dashboard#put-apidashboardidcards).
- The Google Analytics driver will be removed with the next release as Google is retiring GA3 and we’ve decided not to build a GA4 driver.
- *Data Model* in Admin Settings is now *Table Metadata*. This admin section was often confused with Models, so we renamed it.

## Take a tour of 47 with us

Join our product team on October 4 for a live walkthrough of these new features. [RSVP for the webinar here](/events/metabase-47-release-webinar) to make sure you don't miss it.

Or if you want to get into the nitty-gritty, check out our release notes to see everything we’ve been up to:

- [OSS/Starter](https://github.com/metabase/metabase/releases/tag/v0.47.2)
- [Pro/Enterprise](https://github.com/metabase/metabase/releases/tag/v1.47.2)

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. To see what other features we have in the works, check out our [product roadmap](/roadmap).

Cheers,

The Metabase Team
