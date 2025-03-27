---
title: Breakout
headline: Breakout
def: The grouping of aggregated results by one or more dimensions.
related-terms:
  - term: Dimension
    slug: dimension
  - term: Metric
    slug: metric
  - term: Aggregation
    slug: aggregation
further-reading:
  - title: Measures and dimensions
    url: /learn/grow-your-data-skills/data-fundamentals/dimensions-and-measures
  - title: Create charts with explorable data
    url: /learn/metabase-basics/querying-and-dashboards/questions/drill-through
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
---

## What is a breakout?

A **breakout** is the grouping of [aggregated](/glossary/aggregation) results by one or more [dimensions](/glossary/dimension), like the count of users grouped (or broken out) by country. The [column](/glossary/column) you choose to group by is sometimes known as a **breakout column**.

In [native SQL queries](/glossary/native_query), the `GROUP BY` statement serves a similar function, separating and organizing results based on whatever dimension(s) you've specified.

## Example breakout in Metabase

Figure 1 shows a [metric](/glossary/metric) (sum of order subtotal), broken out by two dimensions: 1) the month an order was placed and 2) the product category. Here we've visualized this breakout as a [stacked bar chart](/glossary/stacked_bar_chart).

{% include image_and_caption.html url="/glossary/images/breakout/breakout-example.png" description="<em>Fig. 1</em>. A stacked bar chart with a metric (sum of order subtotals) broken out by two dimensions: month and product category." %}

You can also [break out your data](/learn/metabase-basics/querying-and-dashboards/questions/drill-through#breakouts) when [drilling through](/glossary/drill_through) on a chart in Metabase. Clicking on a chart like this brings up the drill-through menu, where you can further break out your data. In figure 2, we've used the action menu to break out a subset of our data by the `Vendor` of the product ordered.

{% include image_and_caption.html url="/glossary/images/breakout/action-menu.gif" description="<em>Fig. 2</em>. Using the action menu to break out our data." %}
