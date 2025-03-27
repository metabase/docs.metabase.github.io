---
title: "Metabase 52"
subtitle: Sankey charts, faster search, connect dashboard filters to columns at any stage of the query, and more
summary: "A lite Metabase release that still manages to pack a punch - just in time for the end of the year!"
date: 2024-12-09 00:12:18
categories: News
image: /images/posts/metabase-52/52-cover.jpg
author: The Metabase Team
highlights:
  - title: Sankey charts
    description: For all your user-flow needs
    image: /images/releases/highlights/Sankey-highlight.jpg
    url_fragment: sankey-charts
  - title: Connect dashboard filters to columns at any stage of the query
    description: Multiple stages in your queries? Custom columns? You're covered
    image: /images/releases/highlights/filter-highlight.jpg
    url_fragment: connect-dashboard-filters-to-columns-at-any-stage-of-the-query
  - title: Faster search, more relevant results
    description: Think 3x! Plus refined rankers to give more relevant stuff top spot
    image: /images/releases/highlights/faster-search-highlight.jpg
    url_fragment: faster-and-more-relevant-search-results
  - title: Dashboard verification
    description: Dashboards join the ranks of content you can mark as vetted and official
    image: /images/releases/highlights/Verified-dashboards-highlight.jpg
    url_fragment: dashboard-verification
---

{% include youtube.html id="h4xKT3MkLj0" %}

Happy Metabase Release Day to those who observe. You’ll notice this one’s a touch lighter than most of our [recent releases](/releases). We kept this one a little smaller in order to give you one more new version before the new year.

- **If you’re hosted on [Metabase Cloud](/cloud/)**, we’ll be rolling out these new features automatically in the new year. If you'd like to get it sooner, just let us know. Email help@metabase.com and we'll upgrade you.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Feel like you _just_ finished an upgrade? [Try Metabase Cloud for free](/upgrade/) to get automatic upgrades and excellent technical support.

## Sankey charts

{% include video-player.html id="sankey" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-52/Sankey.mp4" %}

This one’s especially for the product analytics people. We know you love a Sankey chart for understanding user flows, and now you got it in Metabase. To get this new chart out in time for the holidays, we limited its visualization options. But we have more improvements in the works, [so have fun playing around with Sankey charts](/docs/latest/questions/visualizations/sankey) and let us know what you think.

## Connect dashboard filters to columns at any stage of the query

{% include video-player.html id="filters" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-52/filters-at-any-stage.mp4" %}

Got multiple stages in your queries? Custom columns? You can now wire up dashboard filters to columns from _any_ part of a card's query.

## Faster and more relevant search results

![faster-search](/images/posts/metabase-52/Faster-search.jpg)

Upgraded search boasts two big improvements (the clue is in the title): First of all, it’s much faster - think around 3x. Secondly, results are more relevant with full-text search that includes partial matches. We’ve also refined the rankings to give more weight to things like content that’s more popular, been viewed more recently, and more.

If you're self-hosting, an admin will need to opt in to the new search, and for now it’s only available with a Postgres app DB. To do this, you'll need to set the environment variable [`MB_SEARCH_ENGINE=appdb`](/docs/latest/configuring-metabase/environment-variables#mb_search_engine).

If you're hosted on Metabase Cloud, we'll be rolling out the new search gradually over the coming weeks.

## Dashboard verification

{% include video-player.html id="verified-dashboards" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-52/verified-dashboards.mp4" %}

Dashboards join the list of [content admins can verify](/docs/latest/exploration-and-organization/content-verification), alongside questions, models, and metrics. Verified items get a fancy blue checkmark, show up higher in search results, and help your teams find your most important content. We have more updates to verified content coming soon, like expiry dates and flagged status. Blue checkmarks never had it so good.

Available on [Metabase Pro and Enterprise plans](/pricing/).

## ‘View-only’ badge on questions that can’t be edited

![view-only](/images/posts/metabase-52/View-only.jpg)

We’ve made it more obvious when you can’t edit or interact with a question. Questions built on a table that’s been hidden by an admin can’t have filters, drill-through, or other interactive features applied. This badge takes out the guesswork.

## Gray color palette added to charts

![gray](/images/posts/metabase-52/gray.jpg)

Data is often pretty black and white. But sometimes you need a gray accent to offset the parts of a chart you really want to highlight. Currently available for line, bar, area, and gauge charts.

## Language localization support for all embedding types

{% include video-player.html id="locale" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-52/locale.mp4" %}

You can now [set the language for static and public embeds](/docs/latest/embedding/static-embedding-parameters#setting-the-language-for-a-static-embed) as well (e.g., set a static embed to Spanish with `#locale=es`).

Check out the [locales Metabase supports](/docs/latest/configuring-metabase/localization). Available on [Metabase Pro and Enterprise](/pricing/).

## New old data picker for interactive embedding

We [recently released a new data picker](/releases/metabase-50#improved-menus-for-picking-data-and-moving-stuff-around) to help people navigate Metabases that have a lot of stuff: tables, models, questions, etc. That new picker is overkill for customer-facing, embedded use cases, so we reverted back to the previous version of the entity picker for interactive embedding. Sometimes you really can’t beat a classic.

## Be part of the embedded analytics SDK beta program

Our embedded analytics SDK is now available in beta! Try embedding with more powerful, flexible, and easier-to-customize implementation. Sign up for the [embedded analytics SDK beta program](https://forms.gle/PKJBF5pxMwJTTwH4A), or dive straight in with the [quickstart](/docs/latest/embedding/sdk/quickstart?utm_source=mailchimp&utm_medium=email&utm_campaign=metabase-52).

## FYI

### [Check the API changelog for breaking changes](/docs/latest/developers-guide/api-changelog#metabase-0520)

### Snowflake will block single-factor password authentication by November 2025

This doesn’t affect how you use Metabase, but important to know if you're using Snowflake that you’ll need to move to multi-factor authentication next year. [Check out their blog for more information](https://www.snowflake.com/en/blog/blocking-single-factor-password-authentification/).

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. If you want to get into the nitty-gritty, check out our [release notes in GitHub](https://github.com/metabase/metabase/releases/). To see what other features we have in the works, see our [product roadmap](/roadmap).

See you next year!

Cheers,

The Metabase Team
