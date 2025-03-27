---
title: Unfiltered Filter Excitement
summary: Metabase now has dashboard-wide filters
date: 2016-06-20 12:48:30
last_updated_at: 2016-06-20 12:48:30
categories: "Using Metabase"
author: Maz Ameli
image: /images/posts/unfiltered-filter-excitement.jpg
layout: post
---

One feature we’re especially excited to be including in the latest version of Metabase is dashboard-wide filters. If you’ve been using Metabase since the early days, then you are a cool person who probably knows where to find the best sushi and whatnot. But also, while you know that Metabase is a great way to easily ask questions about your data and to create great-looking dashboards and reports, one thing that _hasn’t_ been so easy in Metabase is easily modifying all the cards on a dashboard.

For example, if you wanted to see the same set of charts or metrics, but broken out in different ways (like by Date, Customer, or Category), then you had to recreate that dashboard over and over with slight tweaks to the cards.

Dashboard filters fix this.

## Creating Dashboard Filters

This is easier shown than told, so let’s take a look at this example Orders dashboard for a fictional company that builds widgets, doohickeys, gizmos, and the like.

![Dashboard](/images/dashboard-filters-post/01-starting-dashboard.png)

This dashboard has a bunch of interesting charts and data on it, but it’s showing us data for all time. In the old days, if we wanted to see this same dashboard with only data from, say, June of 2016, we’d have to edit _all_ of the questions, which would be tedious.

Instead, we can add a Month and Year filter to this dashboard. First, we’ll start editing the dashboard, and then click the new **Add a Filter button**, and select **Time**, then **Month and Year**.

![Add a filter](/images/dashboard-filters-post/02-Add-a-filter.png)

![Add time filter](/images/dashboard-filters-post/03-add-time-filter.png)

![Add month filter](/images/dashboard-filters-post/04-add-month-and-year-filter.png)

Next, for each card on the dashboard, we just need to pick which field to do the filtering on.

![Map cards](/images/dashboard-filters-post/05-map-cards.png)

In this example, we’re interested in filtering the whole dashboard by when orders were created, so we’re selecting the “Created At” field for each of our cards. Then we’ll click Done, then Save.

![Cards mapped](/images/dashboard-filters-post/06-cards-mapped-to-time-filter.png)

Now we can click on our new Month and Year filter and select a specific month…

![Month dropdown](/images/dashboard-filters-post/08-month-dropdown.png)

…and all the cards on our dashboard change!

![Filtering by month](/images/dashboard-filters-post/09-filtering-by-month.png)

## Different Kinds of Filters

Time isn’t the only thing we can filter on, though. Let’s say we want to be able to see how our different product categories are performing — are widgets selling better than gizmos? Instead of creating a new dashboard with the same charts, but with different product categories, we can just add a category filter.

So we’ll go edit the dashboard again, add a new filter, and select Other Categories. This is a flexible option that will let us filter on basically anything that’s not a date, location, or ID.

![Category filter](/images/dashboard-filters-post/10-category-filter.png)

Next let’s select the product “Category” field for all the cards, then click Done and Save again…

![Category filter mapped](/images/dashboard-filters-post/11-category-filter-mapped.png)

…and now we have two filters, which we can use independently or together. Huzzah!

![Using both filters](/images/dashboard-filters-post/12-both-filters.png)

## Try it Yourself!

Our hope is that these new filters will make it really easy for even your least-sophisticated teammates to start exploring your data. Give it a look and let us know what you think! We’re [@metabase](http://www.twitter.com/metabase) on Twitter. And if you don’t have the latest version of Metabase yet, [you can download it here](/start/).

xoxo
Metabase
