---
title: "How to visualize time-series data: best practices"
summary: "Learn about time-series data and how to visualize it. With best practices and a handy cheat sheet."
date: 2024-11-20 00:05:05
last_updated_at: 2024-11-21 00:05:05
categories: "Analytics and BI"
author: Alex Yarosh
featured_image: /images/how-to-visualize-time-series-data-og.jpg
image: /images/how-to-visualize-time-series-data-og.jpg
layout: post
---

Here's a guide to best practices in time-series visualization, covering chart selection, data structure, and advanced techniques. We'll skip the mechanics of creating charts, and focus on the principles behind building clear and impactful time-based visualizations,

This article includes stuff we covered in our [webinar on visualizing time-series data](/events/visualizing-time-series-data-in-metabase).

We also made a [time-series cheat sheet](https://metaba.se/time-series-dashboard) dashboard with everything we've discussed about time-series visualizations, from selecting the right chart type to structuring your data for comparison across time periods. Bookmark it and use it as a reference for your next time-series visualization.

## What is time-series data?

Time-series data refers to a sequence of data points that include datetimes. Unlike other types of data, time series data is ordered chronologically, where each data point represents a specific moment in time, such as hourly, daily, or monthly measurements.

Examples of time-series data include stock prices, weather temperatures, sales figures, or economic indicators like GDP. These data points are typically grouped by a particular time granularity, like daily sales or weekly temperature readings.

## Types of time-series visualizations

Charts for visualizing time-series data include:

- **Line Charts** track trends or data progression over time.
- **Bar Charts** compare values across time intervals, especially for discrete data points.
- **Area Charts** illustrate cumulative totals over time.
- **Trend Charts** analyze performance changes by comparing values to previous periods.
- **Waterfall Charts** display sequential changes, though they're more niche in application.

![Types of time series visualizations](/images/posts/types-time-series-visualizations.png)

![Revenue by category](/images/posts/revenue-by-category.png)

## Best practices for time-series charts

**Focus on a single message**: Each chart should communicate one key insight. For multiple insights, use separate visualizations. Different charts highlight different parts of your data, so start by structuring the results table to match your goal.

Consider:

- "How should the results look for this chart?" For comparisons, include values for current, last week, and last month in your table.

- "How do I control which month shows in a trend?" Make sure the target month is at the top of the table.

![Same table, different presentations](/images/posts/same-table-different-presentations.png)

**Consider data shape**: Data structure informs the best chart type.

**One metric over time**

![One metric over time](/images/posts/time-series-visualizations.png)

**Multiple metrics over time**

![Multiple metrics over time](/images/posts/time-series-visualizations-multiple-metrics-over-time.png)

**One metric with a breakout**

![One metric with a breakout](/images/posts/time-series-visualizations-02.png)

Different charts emphasize different aspects of data, so pick the right chart for the aspect that you want to communicate.

**Current state**

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/25d441da-c757-43cc-b409-4bafbff35b0f"
    frameborder="0"
    width="400"
    height="300"
    allowtransparency
></iframe>

**Evolution**

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/681991fa-7140-4f54-8184-7d504a64785f"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

**Magnitude**

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/620b74ba-c21f-410c-b283-a9c36aec9a2a"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

**Proportion**

- Area charts (and bar charts) work better for showing _size_ instead of trend.

- Stacked area charts can be used to show how the shares of a metric's breakouts change over time.

- Don't make conclusions about change in the _metric_ itself from stacked area charts - they can be misleading! Stacked bar charts are only meant to show the change in proportions of the metric's breakouts.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/67624f20-136c-44c6-99e2-b47c6279093a"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

**Accumulation**

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/8494fccd-61c1-4d2c-b4eb-7ded07e19213"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

**Use `Offset` for comparisons**: The [offset function](/docs/latest/questions/query-builder/expressions/offset) in Metabase allows you to compare a metric's value in the current row to its value in a previous row. For example, if you're grouping by month, setting the offset to -12 will show the metric's value from 12 months prior. You can use `Offset` to add columns to a row that include values from previous rows, which makes it easier to compare metrics like year-over-year changes in a single chart.

![Offset function in Metabase](/images/posts/using-offset-metabase.png)

Now that you’ve got the basics down, it’s time to get hands-on and start building your own time-series charts with [Metabase](/cloud/login). Go ahead, create something awesome, and share it with the community!

## More data visualization resources

- [Time-series visualizations cheat sheet](https://metaba.se/time-series-dashboard)
- [Video - Visualizing time-series data in Metabase](/events/visualizing-time-series-data-in-metabase)
- [Data visualization tips for the non-analyst](/blog/visualization-mistakes)
- [How to build better line and bar charts](/blog/how-to-build-better-line-and-bar-charts)
- [Maps data visualizations: best practices](/blog/maps-data-visualization)
- [The perfect chart: choosing the right visualization for every scenario](/blog/the-right-visualization)
