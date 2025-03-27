---
title: "Understand how your team uses Metabase"
summary: "Learn which dashboards are most popular, how to track active users and changes to settings and configurations, view audit logs to monitor incidents, and more."
date: 2024-01-11 09:10:18
last_updated_at: 2024-01-11 09:10:18
categories: "Using Metabase"
featured_image: /images/posts/how-to-use-metabase-usage-analytics/header-image.jpg
image: /images/posts/how-to-use-metabase-usage-analytics/header-image.jpg
author: The Metabase Team
layout: post
---

[Metabase usage analytics](/features/usage-analytics) is the new version of auditing tools on Pro and Enterprise plans, available as a collection of interactive dashboards, questions, and models built on your usage data.

With Metabase usage analytics you can see:

- Which dashboards and questions are the most popular
- How many weekly active Metabase users you have
- Which groups are most actively using dashboards and questions
- Who's creating and viewing what content

This guide gives a few real-world examples of how you can take advantage of these usage analytics.

There are many factors that may determine how you use usage analytics, like industry standards and regulations, team and org size, structure, etc. This guide isn't a specific set of rules, so feel free to take these ideas and build on them for your use case.

## Track and monitor model and data performance as a data team

Our data team uses Metabase usage analytics to track and monitor question and dashboard usage and performance to ensure things run smoothly. Usage analytics allows the team to track which questions people view the most (e.g. Seeing if their latest activation models are being used in questions).

The prebuilt **Most viewed content** dashboard lets you filter by group name. Once you know what people are most interested in viewing, you can structure your Metabase so that the most used stuff is more discoverable, like by putting certain metrics on your Metabase home page.

![The Most viewed content dashboard, filtered by user group, in Metabase](../images/posts/how-to-use-metabase-usage-analytics/most-viewed-content.png)

You can also set up as a [dashboard subscription](../docs/latest/configuring-metabase/slack) to a Slack #general channel to send relevant data to your teammates.

## Find out which questions and dashboards you could archive

We use usage analytics to find out which dashboards or questions are no longer being used and retire them. To see this, take a look in the **Content with cobwebs** prebuilt dashboard and [archive unused content](../docs/latest/exploration-and-organization/delete-and-restore).

We also use usage analytics to find dashboard questions that take a long time to load and refactor or [cache results](../docs/latest/configuring-metabase/caching). To see this yourself, go to the **Performance overview** prebuilt dashboard for a full overview of your slowest content.

## Quickly catch changes to configurations and settings

We track changes to configurations and settings, like that time someone changed the language of our instance from English to Brazilian Portuguese, or disabled Google single sign-on.

To see changes to settings, you can go to the activity log model, and filter on `setting-update`. You can continue to keep tabs on them without living in Metabase by setting up subscriptions or alerts if something changes.

![Filtering on setting-update for the activity log model](../images/posts/how-to-use-metabase-usage-analytics/setting-update-filter.png)

## Monitor who has access to, and is downloading, your data

We use Metabase for compliance, auditing, and monitoring data security. It’s important to note that the definition of what we do can look very different compared to other organizations. How you use usage analytics in this situation can vary greatly depending on scale, industry, and the needs of your organization.

For Metabase, we're mainly focused on SOC2 Type 2 compliance. We want to know who has access to what, whether that access is really needed. If not, we change the account's permissions, or deactivate the account entirely.

For example, your IT team could use usage analytics when offboarding team members or restricting access by teams. Having an overview of data access available in Metabase helps us ensure that each person is mapped to the correct user group and has the right access levels and permissions.

To view which groups a person belongs to, go to **Person Overview** dashboard. You can filter on a person’s name, email, or user ID, looking specifically at date range, activity type, query source, and more. The dashboard includes details about the person, groups they belong to, how many questions and dashboard they’re viewing month over month, and what they’re looking at.

### Audit logs

The Metabase analytics collection also comes with audit logs to help you understand who is downloading and accessing your data. For example, the UI only allows you to see up to 10k rows of data, but in audit logs you can see if someone downloaded 1M rows of data.

Audit logs are a feature we've used as part of our incident recovery plan. For example, if someone sees or does something on accident, audit logs lets us know what happened so we can prevent it from happening again. We report on any kind of data breaches as they occur, so any data we have to investigate and provide context is helpful.

To view audit logs, you can go to the Metabase analytics collection and click on any of the log models under Useful data. For example, you can view the Activity Log and click on any ID to see the audit log details.

![Audit logs in Metabase](../images/posts/how-to-use-metabase-usage-analytics/audit-log.png)

## Play around with Metabase usage analytics

You can get to Metabase usage analytics by clicking on "Metabase analytics" under your collections. Try out any of these use cases, or come up with your own workflow.

## More Metabase usage analytics resources

- [How data-driven is your org?](/blog/usage-analytics)
- [Metabase housekeeping with usage analytics](/blog/metabase-housekeeping-with-usage-analytics)
- [Keeping tabs on embedded analytics](/blog/embedding-usage-analytics)
- [Video: Metabase usage analytics — what happens inside your instance](/events/metabase-usage-analytics)
- [Usage analytics docs](/docs/latest/usage-and-performance-tools/usage-analytics)
