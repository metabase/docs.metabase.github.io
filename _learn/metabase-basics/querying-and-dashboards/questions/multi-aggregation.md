---
layout: learn_article
date: 2021-04-30 00:58:59
categories: Querying
image: /learn/images/multi-aggregation/viz-weekly-totals-by-category.png
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/notebook-editor/multi-aggregation
  - learn/questions/multi-aggregation
---

Many analytics questions can be answered with just four steps:

1. _Join_ a couple of tables to get all the required information in one place.
2. _Filter_ the data so that it only includes the values that are relevant.
3. _Group_ and _aggregate_ those values to create the insight you need.
4. _Visualize_ the result so that you can understand what your data is telling you.

Queries don't have to stop there, though: Metabase allows you to add more filters and calculate more summaries step by step. To see how this works, let's trace the steps an analyst might go through while exploring how many items of each category are sold weekly.

We start by counting the number of items sold each week in each product category in the [Sample Database](/glossary/sample_database). Information about sales are in the `Orders` table, and product categories are in the `Products` table, so we join those by matching product IDs. For the moment we want to know about all product categories, so we don't need to filter this data, but we do need to group it and summarize it to calculate weekly totals by category.

![Joining orders and products to bring information together, then grouping and summarizing to calculate weekly totals by category.](../../../images/multi-aggregation/join-and-summarize.png)

We can visualize the result so far as a time series) line chart to get insight we didn't have before.

![Visualizing weekly totals by category.](../../../images/multi-aggregation/viz-weekly-totals-by-category.png)

However, let's go further and add another filter _after_ the summary step to take widgets out of our data. When we return to the query builder and click the **Add Filter** button at the bottom of the editor, it shows us the three columns in the summarized data: `Created At`, `Category`, and `Count`. A few clicks lets us create a filter that removes rows whose category is widget.

![Defining a filter to remove one category from the summary data.](../../../images/multi-aggregation/filter-out-widgets.png)

If we save the filter and visualize the data, we'll get a table of results. If you select the line chart from the visualization settings, the chart now only shows lines for the three product categories we are interested in.

![Visualizing the filtered weekly totals by category.](../../../images/multi-aggregation/viz-filtered-summary.png)

Now suppose we want to know the average number of products of each of these three categories that were sold weekly. We've already calculated the weekly sales by category, so all we have to do is return to the query builder, click the **Summarize button**, choose `Average`, and then tell Metabase that we want to average the `Count` grouped by `Category`.

![Adding a second summarization step to condense the data even further.](../../../images/multi-aggregation/create-second-summary.png)

Our visualization is now exactly what we want: the average number of doohickeys, gadgets, and gizmos sold each week.

![The final summary shows a few key numbers.](../../../images/multi-aggregation/final-table.png)

The full question that produces this table:

![The final analysis shows each step in order from start to finish.](../../../images/multi-aggregation/final-analysis.png)

There are other ways to calculate this result: we could, for example, filter out the widgets before we calculated the first summary (which most analysts would consider a best practice, since reducing the size of the data set early on improves performance). The important lesson is that we can construct insight step by step as each answer leads to a new question, and that Metabase allows us to add operations one by one as they occur to us. We don't have to plan everything in advance: if we find that we are always starting with the same operations, we can save those separately, as explained in the article [Snippets vs. Saved Questions vs. Views][learn-save].

[learn-save]: /learn/building-analytics/sql-templates/organizing-sql
