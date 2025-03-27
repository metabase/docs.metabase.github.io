---
title: "Summary table"
headline: "Summary table"
def: "The result of an aggregation that gets saved in a database or data warehouse so that people can work with those precomputed metrics."
related-terms:
  - term: Aggregation
    slug: aggregation
  - term: OLAP
    slug: olap
  - term: Pivot table
    slug: pivot_table
  - term: Metric
    slug: metric
  - term: View
    slug: view
further-reading:
  - title: Measures and dimensions
    url: /learn/grow-your-data-skills/data-fundamentals/dimensions-and-measures
  - title: Data cubes
    url: /learn/databases/data-cube
redirect_from:
  - /glossary/summary_table
---

## What is a summary table?

A **summary table** is the result of an aggregation that gets saved in a database or data warehouse so that people can work with those precomputed metrics.

The term "summary table" can get confusing, since some people use "summary table" to describe any result of an [aggregate function](/glossary/aggregation), like the table that you get after filtering and grouping by some [measures](/glossary/measure) and [dimensions](/glossary/dimension). By this definition, a summary table is basically the same thing as a [pivot table](/glossary/pivot_table), minus the pivoting.

The difference here comes down to whether or not those tables get saved within your [data warehouse](/glossary/data_warehouse). Creating summary tables in your data warehouse can make it easier for people to generate reports without having to query raw data. In this sense, summary tables function a lot like [materialized views](/glossary/view#view-vs-materialized-view) (which don't necessarily aggregate data).

## Example: summary tables in a data warehouse

For example, maybe you're working with an [analytical database](/glossary/analytical-database) that uses a [star schema](/glossary/schema#star-schema) setup, with a fact table containing tens of thousands of individual orders records, surrounded by dimension tables that describe those orders. If someone at your organization wants to generate a weekly report containing sales data by product category from the last seven days, calculating that from your raw fact and dimension tables every time will be inefficient and costly.

Instead, creating a summary table lets you join those tables and aggregate that data far less often. Then in the future when someone creates that report, they can do so using the summary table as a base, rather than needing to calculate those numbers every time from scratch.

While there's some maintenance associated with summary tables (like making sure your data refreshes on a schedule or adjusting the filters and groupings if they aren't exactly what people need), they still tend to be a highly efficient way of working with large datasets.
