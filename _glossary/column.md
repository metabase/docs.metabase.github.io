---
title: Column
headline: Column
def: A list of values, usually belonging to a particular field, displayed vertically in a table.
related-terms:
  - term: Field
    slug: field
  - term: Attribute
    slug: attribute
further-reading:
  - title: A short overview of databases
    url: /learn/grow-your-data-skills/data-fundamentals/database-basics
  - title: Data types and metadata
    url: /learn/grow-your-data-skills/data-fundamentals/data-types-overview
---

## What is a column?

A **column** is a list of values, usually belonging to a particular field, displayed vertically in a table. In a [relational database](/glossary/relational_database) table, values within a column each correspond to a different [record](/glossary/record).

Values in a column share a [data type](/glossary/data_type). That is, if a column's data type is `Integer`, that means every value within that column must be an integer. There may be other constraints too, related to formatting, character length, or whether or not that value is mandatory.

## Example column

Here's an image of the `Orders` table in Metabase's [Sample Database](/glossary/sample_database), with the `Created At` column highlighted. The `Created At` column's data type is `DateTime`, and the values in this column each correspond to the timestamp of a single order.

{% include image_and_caption.html url="/glossary/images/column/column-highlighted.png" description="<em>Fig. 1</em>. A look at the <strong>Orders</strong> table, with the <strong>Created At</strong> column highlighted." %}

## Columns vs fields

While columns and fields aren't technically the same thing, it's usually okay to use these terms interchangeably. See [Columns vs. Fields](/learn/grow-your-data-skills/data-fundamentals/database-basics#columns-vs-fields).

However, keep in mind that columns don't always directly correspond to fields in a database. For example, you may want to create a [custom column](/learn/metabase-basics/querying-and-dashboards/questions/custom-expressions#custom-columns) in Metabase that contains calculated values, like one that displays the percentage discount for each order. You'd create this custom column by telling Metabase to calculate the `Discount` divided by the `Subtotal` and display the resulting value in a new column.

## Columnar storage

While many traditional relational databases store data as [rows](/glossary/row) and are typically best suited for holding [transactional](/glossary/transactional-database) data, some databases (like [data warehouses](/glossary/data_warehouse) optimized for [analytics](/glossary/analytical-database)) utilize **columnar storage**.

Columnar databases (also known as column-oriented databases) physically store a column's values together, rather than indexing based on entire [rows](/glossary/row). This can drastically speed up analytical queries and [aggregate](/glossary/aggregation) functions, since those queries will be able to retrieve similar data from the same location on a disk, rather than executing large reads across the database to pull a column's values from individual records.
