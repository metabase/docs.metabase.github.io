---
title: "Time series"
headline: "Time series"
def: "A time series is a sequence of points charted over time."
aka:
  - Run chart
related-terms:
  - term: Line chart
    slug: line_chart
  - term: Bar chart
    slug: bar_chart
further-reading:
  - title: "Time series comparisons"
    url: /learn/questions/time-series-comparisons
redirect_from:
  - /glossary/time_series
---

## What is a time series?

A time series is a sequence of data points over time. Times series are used for both analysis (how has the data performed over time) and forecasting (given the line's trend, what can we expect next week, month, etc.).

Typically you represent a time series as a line chart (called a run chart), but sometimes as a bar chart or area chart. In each case, the horizontal x-axis plots time, and each point plotted on the line is a value at a fixed interval (once an hour, or once a day, etc.). People will use the term "time series" to refer to the actual data by date/time as well as the chart that visualizes that time series.

The values plotted on a time series can be [measures](/glossary/measure) (like a temperature) or [metrics](/glossary/metric), such as the total number of orders placed in a week. If you plot the total numbers of orders for each week over fifty-two weeks (or some other period of time), the resulting chart is a visualization of a time series.

## Example time series

Here is a time series of orders per month depicted as a line chart:

{% include image_and_caption.html url="/glossary/images/time-series/time-series-example.png" description="<em>Fig. 1</em>. A time series showing the count of orders grouped by month." %}
