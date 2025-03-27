---
title: "Pivot table"
headline: "Pivot table"
def: A data visualization that summarizes rows and columns of a table and lets you rotate (pivot) the columns.
related-terms:
  - term: Dimension
    slug: dimension
  - term: Measure
    slug: measure
key-article:
  title: "How to create a pivot table to summarize your data"
  url: /learn/metabase-basics/querying-and-dashboards/visualization/how-to-create-pivot-tables
further-reading:
  - title: "Everything you can do with the table visualization"
    url: /learn/visualization/table
  - title: "Data cubes"
    url: /learn/databases/data-cube
redirect_from:
  - /glossary/pivot_table
---

## What is a pivot table?

A pivot table is a data visualization tool that summarizes rows and columns of a table and lets you rotate ("pivot") the columns to view those summaries in different ways. The summary rows are usually subtotals or grand totals, though they can also be other [metrics](/glossary/metric) like averages.

This ability to rotate columns by 90 degrees, so that the values in that column become the columns themselves for the pivoted tables, can be really helpful when trying to analyze data across multiple [dimensions](/glossary/dimension), like time, location, and category.

## Example pivot table

If we want to see how orders perform over the days of the week, broken out by different product categories, a pivot table is a great choice, as it'll give us an easy-to-digest glimpse at a lot of numerical data. That pivot table may look something like this:

{% include image_and_caption.html url="/glossary/images/pivot-table/pivot-table.png" description="<em>Fig. 2</em>. A pivot table containing information about how four product categories performed on different days of the week." %}

It's nice to have those summary rows that include totals for each day of the week, but it's still not easy to compare category sales on different days. However, if we pivot the **Created At** column so that its values become the column headings, our result looks like this:

{% include image_and_caption.html url="/glossary/images/pivot-table/pivot-table-pivoted.png" description="<em>Fig. 2</em>. Our same pivot table, with the <strong>Created At</strong> column pivoted, giving us a better look at all of the data in our table." %}

Now we can quickly compare orders across day and product category, while still seeing the totals for both, without having to scroll through a long list of rows.
