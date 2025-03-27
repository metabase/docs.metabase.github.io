---
title: "Table"
headline: "Table"
def: "Data’s natural habitat. In a database, a table is a series of fields, with the values of those fields arranged in rows."
key-article:
  title: "Everything you can do with the table visualization"
  url: /learn/visualization/table
related-terms:
  - term: Field
    slug: field
  - term: Column
    slug: column
  - term: Record
    slug: record
  - term: Row
    slug: row
  - term: Relational database
    slug: relational_database
  - term: Pivot table
    slug: pivot_table
further-reading:
  - title: Database fundamentals track in Learn
    url: /learn/grow-your-data-skills/data-fundamentals
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
---

## What is a table?

A **table** is data's natural habitat. In a [database](/glossary/relational_database), a table is a series of [fields](/glossary/field), with the values of those fields arranged in [rows](/glossary/row), each row with a value corresponding to a field. Tables in databases are connected via [entity](/glossary/entity_key) and [foreign keys](/glossary/foreign_key).

Databases are made up of tables, but _table_ can also refer to a type of data visualization, or chart. The table visualization resembles a spreadsheet, with [columns](/glossary/column) corresponding to fields (or [aggregations](/glossary/aggregation), in the case of [custom columns](/glossary/custom_column)).

## Example table in Metabase

Metabase's [Sample Database](/glossary/sample_database) contains four tables: `Products`, `Orders`, `People`, and `Reviews`.

Figure 1 shows a [question](/glossary/question) in Metabase visualized as a table. This question adds one [filter](/glossary/filter) to the `People` table, so that our result is a table of our customers whose `State` is Georgia:

{% include image_and_caption.html url="/glossary/images/table/example-table.png" description="<em>Fig. 1</em>. A table showing <strong>People</strong> in Georgia (GA)." %}

With the toggle below the table, we can alternate between viewing this question as a table and as a [pin map](/glossary/pin_map) (or whatever other visualization you've chosen).
