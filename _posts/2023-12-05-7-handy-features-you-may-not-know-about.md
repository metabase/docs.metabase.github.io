---
title: "10 handy Metabase features you may not know about"
summary: "Here are ten features of Metabase that may take some time to discover, but once you do you may find yourself using all the time."
date: 2023-12-05 00:16:26
last_updated_at: 2023-12-05 00:16:26
categories: "Using Metabase"
author: The Metabase Team
featured_image: /images/posts/metabase-features/metabase-features-header-image.jpg
image: /images/posts/metabase-features/metabase-features-header-image.jpg
redirect_from: /blog/7-handy-features-you-may-not-know-about
layout: post
---

Metabase's interface tries to stay out of your way to help bring your data to the forefront. This laid-back approach means that sometimes features can take time to discover, so we put together an **updated** list of some features you may not be taking advantage of yet.

*Note: We've updated this list from 7 to 10 to include newer features and updates.*

## 1. Alerts: get notified when a metric hits a certain number

Some people miss the menu in the bottom right corner of a question:

![The alert bell in the bottom right corner of Metabase.](../images/posts/metabase-features/alert-bell.png)

They don't click on the bell, so they never figure out that you can set up a question to send you an email or Slack message based on:

- When a time series [crosses a goal line][goal-line-alerts].
- When a [progress bar reaches (or goes below) its goal][progress-bar-alerts].
- When a question [returns a result][results-alert].

![Different kinds of alerts: When a raw data question returns any results, when a line or bar crosses a goal line, or when a progress bar reaches its goal.](../images/posts/metabase-features/wide-world-of-alerts.png)

You can schedule the question to run hourly, daily, or weekly. If the results meet your criteria, Metabase will send you an email or Slack message letting you know.

![Options for setting up an alert: what time to check for results and whether to send the alerts to Slack or email.](../images/posts/metabase-features/alert-setup.png)

Once you've set up your alerts, you can focus your attention elsewhere until your data needs your attention again.

To learn more, check out [Getting alerts about questions][getting-alerts].

## 2. Download results as CSV, Excel, JSON, PDF, or PNG

While we're still in the bottom-right menu of a question, another often-overlooked feature is the ability to download the results of a question.

![The cloud icon in the bottom right corner of Metabase with CSV, XLSX, JSON, PDF, or PNG format options for download.](../images/posts/metabase-features/export-results.png)

If you'd prefer to share the results as a question in Metabase, check out our [Guide to sharing data][sharing-data].

## 3. Field Filters: create smart filter widgets

Field Filters are a special kind of variable you can include in a SQL query that allows Metabase to create filters that "know" about the data in the column. What this means in practice is that you can do things like create a filter with a date picker, or a dropdown menu of pre-populated options. They take a bit to get the hang of, which is why we wrote a [Learn article on Field Filters][field-filters], but experienced users rely on them all the time.

![A SQL question with a field filter powering a date picker.](../images/posts/metabase-features/field-filter.gif)

## 4. Customize what happens when people click on a chart

![A dashboard card showing the Click behavior option.](../images/posts/metabase-features/edit-dashboard.png)

You can customize the on-click behavior of a question when you add it to a dashboard. Here are your options:

- [Open the Metabase action menu][action-menu].
- [Custom destinations: choose what happens when people click on a chart][custom-destinations].
- [Cross-filtering: using a chart to update a filter][cross-filtering].

![The dashboard editing interface when setting up custom click behavior.](../images/posts/metabase-features/click-behavior.png)

You can use values from the chart to parameterize the links. To learn more, check out the articles listed above or see our docs to learn about [Interactive dashboards][interactive-dashboards].

## 5. Add time series from different databases to a single dashboard card

If you click the **Add Series** option directly to the right of the on-click behavior option we just mentioned, you can layer series from any of your saved questions right onto your dashboard card; no manual joins required.

![The dashboard editing interface when setting up a series](../images/posts/metabase-features/add-a-series.png)

Note that you can only add time series to another time series, like adding the series revenue over time to a card with transactions over time.

See our docs to learn more about [Interactive dashboards][interactive-dashboards].

## 6. Link filters in dashboards

Do you have two dashboard filters that are related? You can link from one filter to another to create hierarchies. For example, set up a [State filter that is linked to a City filter](/learn/metabase-basics/querying-and-dashboards/dashboards/linking-filters#adding-a-state-filter). Now when  someone selects a specific state in the first filter, it will only show that state's cities as selectable in the second filter.

To learn more, see our article on [Linking filters in a dashboard](/learn/metabase-basics/querying-and-dashboards/dashboards/linking-filters).

## 7. Multi-step summarizations in the notebook editor

When using the notebook editor, most people stop at 1) select data, 2) filter it, and 3) summarize it. But you can keep going: adding additional stages of filtering, joining, and summarizing to get the answer you need.

![A question with two steps of summarization to find the average count of orders per month by product category.](../images/posts/metabase-features/two-summarize-steps.png)

This opens up a lot more possibilities for what you can do with the notebook editor.

For example, you can use the notebook editor to join a question with another saved question to create a ratio: after joining the two questions, just create a custom column where you divide one question's metric column by the other's. You can see an example in our [building better charts event](https://youtu.be/TdgDcJzv8zg?feature=shared&t=1206).

For more, see our article on [multi-level aggregations][multi-aggregation].

## 8. Share and reuse bits of code with SQL snippets

You can save a bit of SQL code as a snippet and refer to it like so:

```sql
SELECT
    product_id
FROM
    orders
WHERE
    total < {% raw %}{{snippet: average order total}}{% endraw %}
```

You can find existing snippets in the right sidebar of the SQL editor by clicking on the code icon. From there you can insert existing snippets, or create your own.

![Clicking on the right sidebar to insert an existing snippet.](../images/posts/metabase-features/insert-snippet-from-sidebar.gif)

You can also highlight parts of your code to save it as a snippet. See our [full article on SQL snippets][sql-snippets].

## 9. Reference results of any saved question or model in a SQL query via common table expressions

If you're using a SQL database that supports [common table expressions (CTEs)](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-cte), you can [create tags that will be substituted with the SQL query of a referenced question](/docs/latest/questions/native-editor/referencing-saved-questions-in-queries#model-table-or-saved-question-as-a-common-table-expression-cte). That way you can write your query once and reference it across multiple questions, and quickly debug your SQL queries as you're working.

[Read more about CTE syntax to get started](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-cte#cte-syntax).

## 10. Keep collections organized with drag-and-drop, and bulk moves

You can drag and drop items from collection to collection.

You can also click on an item's icon to select it, useful for when you want to move or archive a bunch of questions and dashboards all at once.

![Select the items you want to move, then you can either archive or move them in bulk.](../images/posts/metabase-features/bulk-move.gif)

For more on collections, see our [docs][collections].

[action-menu]: /learn/basics/questions/drill-through
[progress-bar-alerts]: /docs/latest/questions/alerts#progress-bar-alerts
[goal-line-alerts]: /docs/latest/questions/alerts#goal-line-alerts
[results-alert]: /docs/latest/questions/alerts#results-alerts
[getting-alerts]: /docs/latest/questions/alerts
[field-filters]: /learn/building-analytics/sql-templates/field-filters
[custom-destinations]: /learn/building-analytics/dashboards/custom-destinations
[cross-filtering]: /learn/building-analytics/dashboards/cross-filtering
[sharing-data]: /learn/data-diet/analytics/guide-to-sharing-data
[multi-aggregation]: /learn/building-analytics/notebook-editor/multi-aggregation
[interactive-dashboards]: /docs/latest/users-guide/interactive-dashboards
[collections]: /docs/latest/exploration-and-organization/collections
[sql-snippets]: /learn/building-analytics/sql-templates/sql-snippets
