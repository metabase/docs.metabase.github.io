---
title: "Keeping tabs on embedded analytics"
summary: "Metabase's usage analytics can help you learn who your most engaged customers are and what’s most important to them."
date: 2024-02-19 00:03:50
last_updated_at: 2024-02-19 00:03:50
categories: "Using Metabase"
author: The Metabase Team
featured_image: /images/posts/embedding-usage-analytics/keeping-tabs-on-embedded-analytics.jpg
image: /images/posts/embedding-usage-analytics/keeping-tabs-on-embedded-analytics.jpg
layout: post
---

Metabase offers a few different types of embedding: [interactive](/docs/latest/embedding/interactive-embedding), [static](/docs/latest/embedding/static-embedding), and [public embedding](/docs/latest/embedding/public-links#public-embeds). With [usage analytics](/docs/latest/usage-and-performance-tools/usage-analytics), you can track how your customers interact with your customer-facing analytics.

The level of detail available in usage analytics depends on the embedding type. For example, interactive embedding gives you an additional capability to track usage tied to a log in, whereas usage stats, like views and downloads, with static and public embedding are anonymous.

However, this guide can give you a roundabout idea of how to start track usage analytics for embedded analytics.

## See how often people use your customer-facing analytics

Justify your investment in embedding by keeping track of how often it’s being used. The [Metabase metrics dashboard](/docs/latest/usage-and-performance-tools/usage-analytics#metabase-metrics-dashboard) tracks how many active users you have, how many questions people are viewing and creating per week, and trends over time as usage changes week over week.

![The Metabase metrics dashboard](/images/posts/embedding-usage-analytics/metabase-metrics.png)

## Understand what your customers are most interested in

In that same Metabase metrics dashboard, you'll find a list of who your most engaged data consumers are. See what they’re looking at so you can create more relevant content geared towards their interests. Knowing what your customers actually care about can also lead to more meaningful conversations about how you can support them.

You can also learn when customers start to lose interest. For example, for interactive embedding, you can spot if a particularly active customer suddenly stops visiting your analytics. This could be a sign to reach out and see if they need your support.

For static and public embedding, you can look at usage in aggregate by filtering on anonymous to find what your customers are most interested in.

## Keep questions and dashboards quick and minimize friction so your customers can self-serve what they need

There are two different dashboards you can use to figure out which dashboards and questions are running the slowest or consuming the most resources.

![The Metabase Analytics collection dashboards available in Metabase](/images/posts/embedding-usage-analytics/dashboard-options.png)

1. Use the [Performance Overview dashboard](/docs/latest/usage-and-performance-tools/usage-analytics#performance-overview-dashboard) to find out what your slowest dashboards and questions are, and refactor, [cache](/docs/latest/configuring-metabase/caching), or [archive](/docs/latest/exploration-and-organization/delete-and-restore) them.

2. Look in the [Content with Cobwebs dashboard](/docs/latest/usage-and-performance-tools/usage-analytics#content-with-cobwebs-dashboard) to see what’s not being viewed. It might be time to archive, or if you think people are really missing out, put this content somewhere more prominent.

## Keep your data secure with multi-tenant embedded analytics

Usage analytics gives you a comprehensive log for auditing and security purposes.

You can monitor the people or activity logs for anomalies, like suspicious logins or changed settings, and set up subscriptions and alerts on questions created from these logs to keep a constant watch on what’s going on in your instance.

![The activity log filtered by changed settings](/images/posts/embedding-usage-analytics/security-monitoring.png)

You can use these logs in combination with other security features, like [SSO](/docs/latest/people-and-groups/start#authentication), [sandboxing](/docs/latest/permissions/data-sandboxes), and more, for secure, multi-tenant analytics.

## Metabase usage analytics resources

Usage analytics spans beyond just tracking embedded analytics. You can also use usage analytics for internal things, like cleaning up your Metabase, giving your data team an idea of how often your data is being used, and more. Check out a few of the other ways you can use the Metabase analytics collection:

- [Usage analytics docs](/docs/latest/usage-and-performance-tools/usage-analytics)
- [Metabase housekeeping with usage analytics](/blog/metabase-housekeeping-with-usage-analytics)
- [Understand how your team uses Metabase](/blog/how-to-use-metabase-usage-analytics)
- [Video: Metabase usage analytics — what happens inside your instance](/events/metabase-usage-analytics)
