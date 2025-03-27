---
title: "Metabase 48"
summary: "Metabase 48 gives you complete visibility into who's doing what in your Metabase, plus a bunch of dashboard and search improvements, and things to make your day-to-day life in Metabase better."
date: 2024-01-16 00:12:18
categories: News
subtitle: Keeping track of what’s happening in your Metabase
image: /images/posts/metabase-48/metabase-48.png
author: The Metabase Team
highlights:
  - title: Usage analytics
    description: Learn what’s happening in your Metabase… using Metabase
    image: /images/releases/highlights/usage-analytics.png
    url_fragment: learn-whats-happening-in-your-metabase-using-metabase
  - title: New regions for cloud-hosting
    description: Move your cloud-hosted instance into your backyard
    image: /images/releases/highlights/new-regions-for-cloud-hosting.png
    url_fragment: new-cloud-hosting-options-in-europe-asia-pacific-and-latin-america
---

{% include youtube.html id="-HF_8Yf-5Lg" %}

Whether you need to put your data access under a magnifying glass for compliance and auditing purposes, or you’re looking for hard evidence on whether that dashboard your executive team _needed, like, yesterday_ is actually being used, the new **Metabase analytics** collection has got you covered.
And there’s plenty besides in this release, with cloud-hosting now available in a region near you, improvements to recently-launched dashboard functionality, and more.

- **If you’re hosted on [Metabase Cloud](/pricing/)** we’ll be rolling out these new features automatically over the next few weeks.
- **If you’re self-hosting Metabase**, you (or your admin) can follow the docs on [how to upgrade](/docs/latest/operations-guide/upgrading-metabase).

Tired of managing your instance? [Upgrade to a hosted plan](/upgrade/) and leave it to us.

## Learn what’s happening in your Metabase… using Metabase

{% include video-player.html id="meta-analytics" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-48/interactive-meta-analytics.mp4" %}

### The Metabase analytics collection is an overhaul of auditing tools, offering new dashboards, models, and questions

{% include plans-blockquote.html feature="The Metabase analytics collection" %}

With [this overhaul](/features/usage-analytics), you have better insight into your usage, configuration, and performance of content in your Metabase, bringing audit tools more in line with how we hope you’re able to use Metabase to make more data-driven decisions across your org.

### Track Metabase usage, performance, and configuration changes: logged for posterity and interactive for analysis

See everything that’s been going on in your Metabase with this collection of dashboards, questions, and models. You can spot overall trends in your Metabase usage, filter on whatever you’re most interested in, and use the action menu, breakouts, and X-rays to slice and dice the data or zero-in on the details of specific records.

Know what your most used dashboards, questions, and models are so you can make them more discoverable (in official collections, on your Metabase homepage, or set up subscriptions) so your data team isn’t tied up digging out the same stuff on repeat.

{% include video-player.html id="question-1" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-48/meta-analytics-create.mp4" %}

### Create custom reports based on dashboards or models

The collection of ready-made analyses on your Metabase usage data is pretty comprehensive, and should could everything you'd want to know about how people are working with your data. But you can also use the collection's set of models to ask your own questions, or make a copy of read-only dashboards to customize their content.

### Set up alerts and subscriptions on Metabase analytics

Get notified if something shady (or plain misguided) is afoot, like someone downloading a 10,000 row table or signing in at 2am on a Saturday.

{% include video-player.html id="question-2" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-48/meta-analytics-alert.mp4" %}

### Admins can share view-only access to the new usage analytics with other groups

Give read-only access to the Metabase analytics collection to anyone who needs it, without having to make everyone an admin.

## New cloud-hosting options in Europe, Asia Pacific and Latin America

![Multi-region](/images/posts/multi-region-hosting/Multi-region-hosting.jpg)

Speed up your Metabase by hosting it closer to you. Choose your preferred hosting region when [setting up a new Metabase](https://store.metabase.com/checkout), or [move your existing Metabase by logging into your store account](/blog/choose-where-your-metabase-cloud-is-hosted).

## More day-to-day improvements

We’ve continued to iterate on some of our most popular recent releases, like [dashboard tabs](/docs/latest/dashboards/introduction#dashboard-tabs), [CSV uploads](/product/csv-uploads), [actions](/docs/latest/actions/introduction), and expanded X-rays to make your every day experience in Metabase better.

{% include video-player.html id="dashboard" autoplay="true" rounded="true" source_mp4="/images/posts/metabase-48/move-card.mp4" %}

### Auto-wire up dashboard field filters

We’ve made lighter work of hooking up filters to questions on your dashboards so you don’t have to do it one-by-one anymore. Connect a filter to a column on a dashboard card, and Metabase will automatically connect that filter to every other card with that column on the dashboard.

### Move cards between dashboard tabs

Does what it says on the tin. Now you have more control over where your chart goes in your multi-tabbed dashboard.

### Filter search results to get closer to what you’re looking for

Apply filters like content type, creator, last editor, and more to search results. Get to more trustworthy stuff by toggling on ‘Verified items only’, or filter by date created or last edited for freshness.

### New table settings to add and remove columns in bulk

We’ve made it quicker and easier to get the columns you want and hide the ones you don’t into your table visualization in settings.

### X-ray indexed records in a model

Hot on the heels of [X-rays being available for models in Metabase 47](/releases/Metabase-47#other-things-that-got-better), the magic of X-rays can now be applied to [indexed records in a model](/docs/latest/data-modeling/models#surface-individual-records-in-search-by-matching-against-this-column). Think a specific customer’s name in a Customer table, like Acme Inc. You can click the X-ray icon to generate an automatic dashboard populated with charts just about Acme Inc.

### We’re working more usage data into X-rays

[Metrics](/docs/latest/data-modeling/segments-and-metrics) that you (or your admin) have defined for a table will now appear in X-rays to show you more of what you care about. The X-rays mechanism now also powers more helpful suggestions for aggregations and breakouts.

This is part of some ongoing work to make better use of how you’ve already defined your data, and how you’ve interacted with it (via models, queries, filtering, and more) to make X-rays more relevant to you. Stay tuned.

### Auto-assign a primary key to CSV uploads

You need a primary key to do a lot of cool stuff in Metabase, but a lot of uploaded CSVs don't have one. Now Metabase will autogenerate a column with an ID for all CSV uploads. Metabase will now also recognize timezone data for timestamps.

### Make quicker changes to Actions

If you have basic actions enabled on the model, you can now update and delete items directly via their object detail.

### New admin setting for authenticating embedding users across domains

Setting up interactive embedding is now smoother for cross-domain setups. The [same-site cookie admin setting](/docs/latest/embedding/interactive-embedding#embedding-metabase-in-a-different-domain) lets you manage it on your own without requiring a restart.

### Metabase in Finnish!

Tuemme nyt suomea uutena kielenä! Thanks to our contributors who got this over the Finnish line (sorry).

## FYI / Breaking changes

### Changes to database user roles

We’ve made some performance optimizations to our database driver code and will no longer enforce read-only connections as much as before (although, it was never a given). You may not be affected, but we recommend checking out [our guidance](/docs/latest/databases/users-roles-privileges) on managing database user roles and privileges in Metabase.

### MySQL as app db for Metabase must be 8.0.17 or higher

If you're using MySQL as your application database for Metabase, you'll need to upgrade to MySQL version 8.0.17 or higher before you upgrade your Metabase to 48.

### Postgres as app db for Metabase must be 9.5 or higher

If you're using Postgres as your application database for Metabase, you'll need to upgrade to Postgres version 9.5 or higher before you upgrade your Metabase to 48.

### API changes

- `ordered_tabs` key is now `tabs`.
- `ordered_cards` key is now `dashcards`.
- We removed `PUT /api/dashboard/:id/cards`.

### Pulses will be removed from Metabase 49

Pulses gave way to dashboard subscriptions way back in Metabase 38 and have been chilling out in the background since then. We'll remove them in the next release (Metabase 49). But worry not — if you’ve still got pulses lingering in your Metabase, you can get the same outcome (but better) with [subscriptions and alerts](/docs/v0.52/questions/sharing/pulses).

## Join our product team on January 24 for a live walkthrough of these new features

[RSVP for the webinar here](/events/metabase-48-release-webinar?utm_source=mailchimp&utm_medium=email&utm_campaign=48) to make sure you don't miss it.

Or if you want to get into the nitty-gritty, check out our release notes to see everything we’ve been up to:

- [OSS/Starter](https://github.com/metabase/metabase/releases/tag/v0.48.3)
- [Pro/Enterprise](https://github.com/metabase/metabase/releases/tag/v1.48.3)

## Big thanks to everyone who contributed!

Thanks to all those who submitted bug reports, feature suggestions, translations, and pull requests. Metabase gets better and better thanks to your efforts.

Hope you enjoy the release. To see what other features we have in the works, check out our [product roadmap](/roadmap).

Cheers,

The Metabase Team
