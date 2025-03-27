---
title: "Predicate"
headline: "Predicate"
def: "An expression that evaluates to either true or false, like quantity > 0. True and false values are known as Boolean values."
further-reading:
  - title: "Data types and metadata"
    url: /learn/grow-your-data-skills/data-fundamentals/data-types-overview
  - title: "Best practices for writing SQL queries"
    url: /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices
---

## What is a predicate?

In SQL, a predicate is a type of conditional expression that evaluates to either true or false, like `quantity > 0`. Including a predicate in your query narrows down your results by filtering out unwanted rows based on whether that expression returns true or false. Predicate expressions all contain some sort of comparison element, like `=`, `>`, or `<`.

When evaluated, the resulting true and false values are known as **boolean values**, though not all databases support boolean values as a [data type](/glossary/data_type). Not all databases support the same list of predicates either, especially predicates beyond mathematical comparisons (like `BETWEEN` or `ISNULL`), so check out your database's documentation to know for sure which predicates will work for your use case.

## Null values: not zero, just not there

While predicates typically evaluate to one of two boolean values (like true or false), if the field being evaluated lacks a value entirely, it's known as `null`. That doesn't mean its value is zero, but that rather that is no value present in that field.

If your predicate expression requires that `quantity > 0`, then a row without values will not return true or false, but rather will return `null`.

## Example predicate

An example of a predicate is condition that follows `WHERE` in a simple SQL `SELECT` query, like so:

```sql
SELECT * from orders
WHERE subtotal > 35
```

In this case, our predicate expression is `subtotal > 35`. Each row in the `Orders` table has a value in the `Subtotal` field, and for each row, this predicate evaluates whether it's true or false that the subtotal is greater than \$35. From there, our query returns only those rows with a subtotal greater than \$35.

In Metabase's [query builder](/glossary/query_builder), you use predicates when [filtering](/glossary/filter) your data. You can also write your own predicates in the [notebook editor](/glossary/notebook_editor) using [custom expressions](/learn/metabase-basics/querying-and-dashboards/questions/custom-expressions). In the question below, we're filtering the `People` table in the [Sample Database](/glossary/sample_database) to only show us records where the `State` field equals Montana, or `state = MT`:

{% include image_and_caption.html url="/glossary/images/predicate/predicate-filter.png" description="<em>Fig. 1</em>. A predicate expression (or filter) in Metabase's query builder that will return only records where the <strong>State</strong> field equals Montana (MT)." %}
