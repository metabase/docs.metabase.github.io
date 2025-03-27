---
title: "How Metabase uses Metabase"
summary: "Here at Metabase, we use Metabase internally, so we thought it'd be fun to use Metabase to see how we use Metabase."
date: 2022-09-21 00:10:18
last_updated_at: 2022-09-21 00:10:18
categories: "Data explorations"
featured_image: /images/posts/how-metabase-uses-metabase/how-metabase-metabases.jpg
image: /images/posts/how-metabase-uses-metabase/how-metabase-metabases.jpg
author: The Metabase Team
layout: post
redirect_from:
  - /blog/how-Metabase-uses-Metabase
---

Here at Metabase, we use Metabase internally, so we thought it'd be fun to use Metabase to see how we use Metabase.

As our own first customer, we wanted to understand how we use our own product, and how our usage patterns have evolved as we've grown.

## Here's what we've found

- Overall, we use Metabase more and more.
- Table, line, and bar charts are our bread and butter (sorry, pie charts 🍩).
- We’re big fans of [dashboard subscriptions](/docs/latest/dashboards/subscriptions) and [alerts](/docs/latest/questions/alerts), sending them via both email and Slack.
- We use [collections](/docs/latest/exploration-and-organization/collections) to store and organize [questions](/docs/latest/questions/start), [dashboards](/docs/latest/dashboards/start), and [model](/docs/latest/data-modeling/models). Also, we try to limit ourselves to one root collection per team.

## Overall usage

Number of users:

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/452d604a-9dce-407e-9a5f-04f56f6357f3"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

Percentage of us who actively use Metabase (viewed at least one question):

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/34e3afce-e820-401f-89a0-eae7c781d8f2"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

Average questions viewed per person:

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/c92784d0-7eea-4f4f-883a-c2008e3561ad"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

- The number of people were pretty stable from 2016 up until May 2019 (mostly comprising of the founding team). Shortly after our series A, we started hiring more people.
- This growth led to a decline in the percentage of monthly active users. We suspect people were still acclimating themselves to the company and the product and that's probably why we saw less usage during this period.
- The percentage of active users has since climbed back up; we've have been above ninety percent for most of 2022!
- Overall, our usage has been trending up. The average questions viewed per person is up from fifteen questions per month in 2017 to twenty questions per month in 2022.

## Visualizations

Top visualizations used:

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/432e962d-7bb4-4bdb-b187-a33bb058a909"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

Share of visualizations (table, line, bar, scalar, area) over time:

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/853dc2df-c608-403f-a143-53648cbf4eca"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

- [Tables](/learn/visualization/table) have been the most popular visualization used at Metabase.
- In second and third place, we have the line and bar charts. These charts are versatile, and they make it easy to compare trends over time.

If we take the all-time top five visualizations and plot their shares over time, we observe some patterns:

- We use more and more table charts, from 28% in 2019 to 55% in 2022.
- We've used fewer scalar charts over time. (Anecdotally, we don't think they're as effective as line or bar charts at visualizing changes over time.)

## Subscriptions and Alerts

Subscriptions and alerts by receiving channel:

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/24141433-f46f-4057-bca2-f7e3e08f772c"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

Scheduled frequency of subscriptions and alerts:

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/398b5eff-1102-4016-81ab-2bdf443f82dc"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

- We currently have 81 active subscriptions and alerts. Around 60% of them are sent via Slack, the other 40% by email.
- Almost half of these reports are scheduled on a daily basis.
- For those reports delivered weekly or monthly, the majority are scheduled for Mondays (70%).

## Collections

<iframe
    src = "https://metabase-public.metabaseapp.com/public/question/839305f2-9732-43d4-82da-cee5135b0be5"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

The collection depth chart shows how many collections are nested at each level (16 in the root collection, 125 under one of the root collection, and so on).

- Out of the 16 root (top-level) collections, half of them are [official collections](/docs/latest/exploration-and-organization/collections#official-collections) belonging to different teams.
- We have 125 sub-collections nested in one of the root collections. This number tapers at the third level, as it's harder to find and organize things deeper than that.

## We'll conclude with a tip

The way we organize each team's official collection is to have a standard set of sub-collections:

- Useful reports
- Data sources
- Explorations
- Miscellaneous

These standardized collections make it easier for people to navigate each team's collection.
