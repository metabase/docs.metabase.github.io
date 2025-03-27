---
title: "Metric"
headline: "Metric"
def: "A metric is a calculation performed on a measure. In Metabase, a capital-M Metric is a saved aggregation with or without filters based on one table."
related-terms:
  - term: Measure
    slug: measure
  - term: KPI
    slug: kpi
further-reading:
  - title: Docs on Metrics
    url: /docs/latest/data-modeling/metrics#creating-a-metric
  - title: Measures and dimensions
    url: /learn/grow-your-data-skills/data-fundamentals/dimensions-and-measures
---

## What is a metric?

A **metric** is a calculation performed on a measure. Metrics are quantitative attributes of data, with some summarization applied.

## Metric vs. measure

You'll see the terms metric and [measure](/glossary/measure) used interchangeably, and they're pretty similar concepts, both referring to some numerical value that's part of (or drawn from) your data. However, there's an important distinction: measures are raw, unaggregated data, while metrics are aggregated (or summarized) data. For example, while a field like `Discount` is a measure, the standard deviation of that `Discount` field would be a metric.

Some people will also use "metric" to mean a computation of measures that's specifically related to performance goals, like CRR (customer churn rate) or NRR (net revenue retention). By this definition, a metric is basically a [KPI](/glossary/kpi) (key performance indicator), depending on whether or not someone has designated that metric as "key."

## Example metric

If we wanted to determine the average of order subtotals in Metabase's [Sample Database](/glossary/sample_database), we'd do so by summarizing, like in figure 1:

{% include image_and_caption.html url="/glossary/images/metric/example-metric-summarization.png" description="<em>Fig. 1</em>. Summarizing the <strong>Orders</strong> table by subtotal average, a metric." %}

In this case, `Subtotal` is a measure, but average subtotal is our metric.

## Metrics in Metabase

In Metabase, a capital-M Metric is a saved aggregation based on one table, with or without filters applied.

If there are certain [aggregations](/glossary/aggregation) that you and your team need to reference and use on a regular basis (like revenue), you may want to [create a metric](/docs/latest/data-modeling/metrics#creating-a-metric) in Metabase so you can access it when asking questions, without rebuilding that aggregation yourself every time.
