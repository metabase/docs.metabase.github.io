---
layout: learn_article
title: "Cross-filtering: using a chart to update a dashboard filter"
summary: "With just a few clicks, you can configure any chart or table to update a dashboard filter."
date: 2020-12-01 00:16:26
modified: 2020-12-01 00:16:26
categories: ["Reporting"]
level: Intermediate
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/dashboards/cross-filtering.html
---

<div class="learn-toc" markdown="1">
- [Setting up the filters](#setting-up-the-filters)
- [Further Reading](#further-reading)
</div>

Metabase allows you to customize what happens when you click on a question card in a dashboard. This article will walk through how to set up cards to update dashboard filters - what we call **cross-filtering**.

placeholder wizard Here's the dashboard we're going to wire up:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/starter-dashboard.png' description="<em>Fig. X</em>. Our starter dashboard that with cards about Orders from the Sample Dataset included with Metabase.." %}

This **Cross-filtering** dashboard shows information about orders in the Sample Dataset included with your Metabase installation.

Here's our goal: we want to set up this dashboard so that when people click on a state in the map, the dashboard's State filter updates and filters every other card _except_ the Orders by state card.

We also want to wire up the dashboard so that when people click on a category in the bar chart, the category filter updates, and all the cards _except_ the Orders by product category card update to filter orders by that category.

Here's the finished dashboard in action:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/cross-filtering-example.gif' description="<em>Fig. 2</em>. Clicking on Wisconsin updates the state filter, filtering the dashboard for orders placed from users in Wisconsin. Clicking on Gadget or Widget updates the Category filter, and filters the dashboard for orders with products in those categories." %}

## Setting up the filters

We've already added questions related to orders to our dashboard, so we'll start by adding two filters: a State filter and a Category filter. The setup process for both filters is similar, so we'll focus on adding the State filter and you'll get the idea.

From the dashboard, we'll click on the **pencil** icon to enter dashboard editing mode. To add a state filter, we'll select the filter icon from the menu on the top right. For filter type, we'll select **Location**, and for kind, we'll select **State**. To learn more about setting up filters, see [Dashboard filters](https://www.metabase.com/docs/latest/users-guide/08-dashboard-filters.html).

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/add-state-filter.png' description="<em>Fig. 3</em>. Add a Location filter." %}

Next, we'll want to wire up every card to our state filter _except_ the card we want to use to update that filter: the **Orders by state** card. This way, we can click on different states, and the other cards will update to show orders from users in the clicked state.

To set up this cross-filtering, let's set every other card's **Column to filter on** to `User.State`.

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/wiring-state-filter.png' description="<em>Fig. 4</em>. Connect each card to the <strong>State</strong> filter <em>except</em> the <strong>Orders by state</strong> card, as we want to use the state map to update the <strong>State</strong> filter." %}

Next, we'll want to set up the map of the United States to update the state filter on click. To do that, we'll need to change the **click behavior** for our **Orders by state** question. Hover over the Orders by state card and click on the Click behavior icon (figure 5):

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/orders-by-state-click-behavior.png' description="<em>Fig. 5</em>. Hover over the Orders by state card and select the <strong>Click behavior</strong> icon." %}

Metabase will slide out a sidebar where we can define what happens when people click on the Orders by state cards. Since we want the card to update the State filter, we'll select the **Update a dashboard filter** option.

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/update-a-dashboard-filter.png' description="<em>Fig. 6</em>. For <strong>Click behavior for Orders by state</strong>, select <strong>Update a dashboard filter</strong>." %}

Metabase will list the dashboard's available filters that we can update:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/available-filters.png' description="<em>Fig. 7</em>. Metabase will list the available filters to update on click." %}

Since we want to update the State filter, we'll select the State filter, and pass the value of `User->State` to the filter.

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/select-column.png' description="<em>Fig. 8</em>. We'll need to select a column to specify which value we want to send to the filter. In this case, we pass <strong>User->State</strong>." %}

With that: Metabase will give us a summary of the click behavior we just defined. In this case, we've set up the Orders by state card to update the State filter by passing the value `User-State` to the filter.

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/click-behavior-summary.png' description="<em>Fig. 9</em>. Metabase will summarize our configured click behavior: the Orders by state card will update a dashboard filter by passing the value from the <strong>User->State</strong> column to the dashboard's State filter." %}

Let's **Save** our changes, and try out the new click behavior:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/update-state-filter.gif' description="<em>Fig. 10</em>. Clicking on a state once filters the rest of the cards by that state. Clicking on the state a second time resets the filter." %}

In figure 10 above, if we click on Wisconsin, the dashboard will filter the other cards for orders by users from Wisconsin. If we click on Wisconsin again, the filter resets, and the other cards on the dashboard update to show all orders from all states.

So far so good. Now let's move on to set up the **Orders by product category** to update the dashboard's **Category** filter.

The process is more or less the same as above, so we won't walk through it step by step. All we need to do is:

- Add a Category filter to filter the dashboard by `Product->Category`.
- Wire up every card _except_ **Orders by product category** to the dashboard's **category filter**.
- Set the click behavior on **Orders by product category** to update the **Category** filter by passing values from the `Product->Category` column.

The sidebar will show a summary of our configured click behavior:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/update-category-filter.png' description="<em>Fig. 11</em>. Summary of click behavior for <strong>Orders by product category</strong>: update the dashboard's Category filter by passing values from the <strong>Product->Category</strong> column." %}

Let's **Save** our changes, and we're done. We have a dashboard that people can cross-filter by state or category simply by clicking on a chart:

{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/finished-dashboard.gif' description="<em>Fig. 12</em>. Summary of click behavior for <strong>Orders by product category</strong>: update the dashboard's Category filter by passing values from the <strong>Product->Category</strong> column." %}

In our example, we added text cards to let people know they can click on a chart to filter the dashboard, but you might want to just let people discover this cross-filtering functionality on their own. And if they miss it, they can always update the filter widgets by manually plugging in the values.

Happy cross-filtering!

## Further Reading

For more about customizing click behavior, check out our post on [custom destinations](/learn/building-analytics/dashboards/custom-destinations.html), which covers how to set up dashboard cards to link to other dashboards, saved questions, and even external URLs, allowing you to create rich clickpaths through your data.

Here are some additional links that cover working with filters in Metabase:

- [Field Filters: create smart filter widgets for SQL questions](/learn/building-analytics/sql-templates/field-filters.html)
- [Adding filters to dashboards with SQL questions](/learn/building-analytics/dashboards/filters.html)
- [Create filter widgets for charts using SQL variables](/learn/building-analytics/sql-templates/sql-variables.html)
