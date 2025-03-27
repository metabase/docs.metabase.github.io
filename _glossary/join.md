---
title: Join
headline: Join
def: The combination of results from two tables in a relational database.
key-article:
  title: Joins in Metabase
  url: /learn/metabase-basics/querying-and-dashboards/questions/joins-in-metabase
related-terms:
  - term: Left outer join
    slug: left_outer_join
  - term: Right outer join
    slug: right_outer_join
  - term: Inner join
    slug: inner_join
  - term: Full outer join
    slug: full_outer_join
  - term: Entity key
    slug: entity_key
  - term: Foreign key
    slug: foreign_key
further-reading:
  - title: Combining tables with joins
    url: /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-joins
  - title: Types of SQL joins
    url: /learn/sql-questions/sql-join-types
  - title: Documentation on joining data
    url: /docs/latest/users-guide/join
---

## What is a join?

A **join** is the combination of results from two [tables](/glossary/table) in a [relational database](/glossary/relational_database).

While the word "join" makes it sound like you're merging the tables themselves, a join actually takes the [rows](/glossary/row) from two (or more) different tables and returns a new set of rows that combines [columns](/glossary/column) from those tables, using [entity keys](/glossary/entity_key) and [foreign keys](/glossary/foreign_key) to determine which rows are related.

## Types of joins

There are four [types of SQL joins](/learn/sql-questions/sql-join-types):

- [Left outer join](/glossary/left_outer_join): select all records from Table A, along with records from Table B that meet the join condition, if any.
- [Right outer join](/glossary/right_outer_join): select all records from Table B, along with records from Table A that meet the join condition, if any.
- [Inner join](/glossary/inner_join): only select the records from Table A and B where the join condition is met.
- [Full outer join](/glossary/full_outer_join): select all records from both tables, whether or not the join condition is met.

## Example joins in Metabase

Metabase defaults to left outer joins for questions asked in the [query builder](/glossary/query_builder), but inner joins are the default for [native SQL queries](/glossary/native_query) (that is, if you just use `JOIN` in your query rather than specifying which type of join).

Let's say we wanted to return results from both the `People` and `Orders` tables in Metabase's [Sample Database](/glossary/sample_database), like a table of includes an order ID, the name of the person who placed that order, and their user ID.

### Query builder join

Figure 1 shows what this join would look like in Metabase's [notebook editor](/glossary/notebook_editor). We'd also want to pick which columns are visible, so we aren't shown every column from both tables.

{% include image_and_caption.html url="/glossary/images/join/join-notebook-editor.png" description="<em>Fig. 1</em>. A join in the query builder." %}

### Native SQL query join

If we were to write this same query in SQL, it may look something like this:

```sql
SELECT
  orders.id AS "Order ID",
  people.name AS "Name",
  people.id AS "User ID"
FROM
  people
JOIN
  orders ON people.id = orders.user_ID
```

Here we've identified where the join happens (in this case, joining at `People → ID` and `Orders → User_ID`, an entity key and foreign key).
