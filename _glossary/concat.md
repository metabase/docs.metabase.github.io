---
title: "Concat"
headline: "Concat"
def: "A function that combines multiple strings into a single string."
aka:
  - concatenate
key-article:
  title: Concat
  url: /docs/latest/questions/query-builder/expressions/concat
related-terms:
  - term: Join
    slug: join
  - term: Custom expression
    slug: custom_expression
further-reading:
  - title: Custom expressions in the notebook editor
    url: /learn/metabase-basics/querying-and-dashboards/questions/custom-expressions
  - title: Custom expression documentation
    url: /docs/latest/questions/query-builder/expressions-list#concat
  - title: Best practices for writing SQL queries
    url: /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices
---

## What is concat?

Concat (or concatenate) is a function that combines multiple strings into a single string. The word comes from the Latin root _con-_ for "together", and _caten-_ for "chain". For example, you might want to concatenate a city (Vienna) with a country (Austria) to get a single location string like "Vienna, Austria".

The Metabase [`concat` expression](/docs/latest/questions/query-builder/expressions/concat) is translated into a SQL `CONCAT` function when running against your database, like this:

```sql
SELECT CONCAT(City, ", ", Country) AS "Location"
```

In Metabase and other [BI tools](/glossary/bi-tool), you can assume that `concat` only works with the text [data type](/glossary/data-type) (often called a _string_). If you want to use `concat` with other data types, like numbers or dates, you'll have to convert them to text first.

If you prefer to write SQL, note that the functions [`JOIN`](/glossary/join), `UNION`, and `MERGE` might sound like they work similarly to `CONCAT`, but they are used to combine [rows](/glossary/row) and [columns](/glossary/column) from different [tables](/glossary/table), rather than text strings from different columns.
