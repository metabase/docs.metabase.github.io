---
title: Measure
headline: Measure
def: A numerical attribute of your data that can be broken out by one or more dimensions.
related-terms:
  - term: Dimension
    slug: dimension
  - term: Metric
    slug: metric
key-article:
  title: Measures and dimensions
  url: /learn/grow-your-data-skills/data-fundamentals/dimensions-and-measures
further-reading:
  - title: A short overview of databases
    url: /learn/databases/database-basics
  - title: Data cubes
    url: /learn/databases/data-cube
---

## What is a measure?

A **measure** is a numerical attribute of your data, and can be broken out by one or more [dimensions](/glossary/dimension). These are the fields in your database containing numerical values that can be calculated or aggregated. Measures are quantitative; you can perform calculations on them like sums, averages, or standard deviations.

## Example measure

If we have a table in our database that stores product information, the field containing each product's price is a measure.

## Measures vs. metrics

On its own, a measure won't give us a very well-rounded view of our data — that's where metrics come in. Metrics are a kind of measure; they're the calculations that you perform on your raw data (your unaggregated measures). While a product's price is a measure, the standard deviation of all our products' prices is a metric. The [KPIs](/glossary/kpi) that your organization tracks are metrics too, like each month's average order totals.
