---
title: Line chart
headline: Line chart
def: A type of visualization that connects discrete values connected by lines to show changes and trends.
aka:
  - Line graph
key-article:
  title: Guide to line charts
  url: /learn/metabase-basics/querying-and-dashboards/visualization/line-charts
related-terms:
  - term: Time series
    slug: time_series
  - term: Bar chart
    slug: bar_chart
  - term: Area chart
    slug: area_chart
  - term: Combo chart
    slug: combo_chart
further-reading:
  - title: Chart docs
    url: /docs/latest/questions/visualizations/visualizing-results
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
  - title: Time series comparisons
    url: /learn/questions/time-series-comparisons
redirect_from:
  - /glossary/line_chart
---

## What is a line chart?

A **line chart** is a type of visualization that connects discrete values connected by lines to show changes and trends. Line charts are useful for tracking quantitative data over some sequence, often (though not always) time, known as a [time series](/glossary/time_series). You'll typically plot the [measure](/glossary/measure) or [metric](/glossary/metric) along the y-axis, with your sequence along the x-axis, like the count of orders (y-axis) over time (x-axis).

Line charts, like [bar charts](/glossary/bar-chart), are a go-to chart for visualizing changes in data and for forecasting future data based on trends.

## Example line chart in Metabase

Figure 1 shows a line chart that plots the number of reviews from the [Sample Database's](/glossary/sample_database) `Reviews` table over time, broken out by month:

{% include image_and_caption.html url="/glossary/images/line-chart/line-chart-example.png" description="<em>Fig. 1</em>. A line chart showing the number of reviews over time." %}

This example also includes a [trend line](/learn/metabase-basics/querying-and-dashboards/visualization/line-charts#trend-lines-and-goal-lines) showing the overall direction of the points on the chart. You have a lot of options when it comes to customizing a line chart, whether you want to display your data as an [area chart](/learn/metabase-basics/querying-and-dashboards/visualization/line-charts#line-area-or-bar-chart), [adjust the scale of axes](/learn/metabase-basics/querying-and-dashboards/visualization/line-charts#axes-tab) in your line chart, or even track [multiple series](/docs/latest/users-guide/09-multi-series-charting) within one graph.
