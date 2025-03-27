---
title: Metabase 0.36
subtitle: SQL snippets, localization
summary: Version 36 of Metabase contains the long-awaited SQL/native query snippets feature, new localizations settings, better value labels for charts, and more.
date: 2020-07-22 00:12:18
image: /images/releases/metabase-0.36.jpg
author: The Metabase Team
redirect_from: /blog/v36-release-announcement/
---

Metabase version 0.36 marks another big release from the Metabase team, with help as always from our contributors and the community.

If you're ready to get going, you can start with our [upgrade guide](/docs/latest/operations-guide/upgrading-metabase), or read on to learn what's new.

## New features and improvements

### SQL snippets in the native query builder

{% include image_and_caption.html url='/images/posts/36-release-announcement/highlight_and_save_as_snippet.gif' description='Highlight SQL code and click to save as snippet.' %}

You can now save bits of SQL and refer to them in your SQL editor queries via a tag, like `{% raw %}{{ snippet: My Great Snippet }}{% endraw %}`. Updating the definition of a snippet will update every query that uses that snippet. Just click the icon with the three lines in the native query editor to open up the SQL snippets sidebar.

{% include image_and_caption.html url='/images/posts/36-release-announcement/snippet_sidebar_and_insertion.gif' description='Find and edit snippets in the Snippets sidebar, and insert them into your query.' %}

Any user with SQL editor permissions for at least one database can use, create, and edit snippets.

We'll discuss snippets in more detail in an upcoming blog post, so stay tuned. In the meantime, you can [check out the documentation on snippets](/docs/latest/users-guide/sql-snippets).

### Language selection

{% include image_and_caption.html url='/images/posts/36-release-announcement/localization-settings.png' description='Localization settings in the Settings tab.' %}

Instead of changing the language in the UI for each user based on their browser's language settings, Metabase now lets admins pick the language for the instance on the [Localization tab](/docs/latest/administration-guide/localization) of the Settings page in the Admin Panel. Users can also change their personal language preferences from their Account Settings page.

### Better value labels for line, area, bar, and combo charts

You can now turn on value labels for charts with multiple series, and selectively turn labels on or off for individual series.

{% include image_and_caption.html url='/images/posts/36-release-announcement/individual-value-labels.gif' description='Toggle value labels for individual series.' %}

### A reorganized Data Model section

We've moved things around a bit in the [Data Model section](/docs/latest/administration-guide/03-metadata-editing): there are now tabs at the top to see all of the Segments and Metrics you've defined across your whole instance, so you no longer need to drill down through your tables to find a Segment or Metric.

{% include image_and_caption.html url='/images/posts/36-release-announcement/data-model-section.png' description='Data, Segments, and Metrics tabs in the Data Model section.' %}

### Reorderable table columns in the Data Model

You can now change the default order for table columns, and choose between database order, alphabetical, custom order, or the old "smart" ordering. You can also click and drag on columns to reorder them manually.

{% include image_and_caption.html url='/images/posts/36-release-announcement/column-reorder.gif' description='Drag to reorder columns.' %}

## Improvements and bugs fixes

See the [release notes](https://github.com/metabase/metabase/releases/tag/v0.36) for a list of all the improvements we made (and all the bugs we squashed).

Thanks to all who submitted issues, pull requests, and suggestions: you are a big part of why Metabase continues to get better and better.

Stay healthy and safe, everyone, and enjoy the new release!

Cheers,

The Metabase team
