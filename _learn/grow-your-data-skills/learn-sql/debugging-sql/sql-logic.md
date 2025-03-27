---
layout: learn_article
date: 2022-05-18
categories: Debugging
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/debugging-sql/sql-logic
---

Combining data can get complicated very quickly (that's probably why you're patiently writing SQL instead of using the friendly [query builder][multi-level-aggregation]). This debugging guide explains what you can do when your query returns unexpected results.

## Debugging steps

1. Get the schemas for the data sources used in your query.
   - If you’re using tables from your database, get the schemas from the [data reference][data-reference-docs].
   - If you’re using nested queries such as subqueries, CTEs, saved questions, or models, you'll need to run each nested query individually and [manually inspect the results](#how-to-get-the-schema-for-a-nested-query).
   - [I don’t know if I’m using a nested query](#how-to-identify-a-nested-query).
2. Review the foreign keys of your tables or nested queries.
   - Is there more than one possible foreign key?
   - Have the foreign keys been renamed or moved to another schema?
   - If you’re not sure, ask the person who maintains the schema.
3. Check for [common SQL logic problems](#common-sql-logic-problems).

## Common reasons for unexpected query results

SQL logic describes the way that your query combines data from different tables or data sources (including temporary tables, such as the results of other queries). The most common ways of combining data are joins and [nested queries](#how-to-identify-a-nested-query).

Even if your SQL logic _used_ to work, it can break when:

- The tables or data sources have changed.
- The nested queries have changed (if you’re building on top of a [saved question or model][saved-question-model-docs]).
- Your nested queries aren’t being computed as you expect (if you’ve written them from scratch).
- Your data includes edge cases, such as empty or `NULL` values.

Most of the time, these changes are introduced upstream by the systems that collect your data, or the lovely people who manage your databases and BI tools.

It’s extremely tricky for teams to anticipate ripple effects from such changes. Fixing SQL logic is not only about responding to change, but updating your approach to better guard against future updates.

If you’re getting a red error message that mentions SQL clauses or table and column names, you most likely have a SQL syntax problem. Go to [Debugging SQL syntax][debugging-sql-syntax] instead.

## Common SQL logic problems

- [My result has duplicated data][debugging-duplicated-data].
- [My result has missing data][debugging-missing-data].
- [My aggregations (counts, sums, etc.) are wrong](#aggregated-results-counts-sums-etc-are-wrong).

### Aggregated results (counts, sums, etc.) are wrong

1. If your aggregations are:
   - too high, check if your source tables or queries have [duplicated rows][debugging-duplicated-data].
   - too low, check if your source tables or queries have [missing rows][debugging-missing-data].
2. Check your source tables or queries for filters.
   - How are you handling empty or `NULL` rows in your aggregations?
   - How are you handling invalid, cancelled, or expired records? Ask your Metabase admin or data team about business logic that you might not know about.
3. If you're working with `COUNT_DISTINCT`, check if it's interacting with other aggregate functions.
   - For example, applying `SUM` on top of `COUNT_DISTINCT` may double-count unique values.
4. If you're working with time series data, [check your time zones][troubleshooting-datetimes].
5. If your data gets updated on a schedule, ask your Metabase admin [if your tables are up to date][troubleshooting-database-syncs].

**Explanation**

Aggregations are often the first place where you'll detect a problem caused by one of the [common reasons for unexpected query results](#common-reasons-for-unexpected-query-results). The steps above will help you catch any data edge cases that may be skewing your results. If you find lots of edge cases, and you anticipate handling the same cases over and over again, you may want to bundle all of that logic into a [model][model-learn] so it can be easily re-used.

Sometimes, you might just need a pair of fresh eyes. If you can't locate the root cause using the steps above, ask a teammate to help you check your math!

**Further reading**

- [How Metabase executes SQL queries][how-metabase-executes-sql-queries]

## How to identify a nested query

If your SQL contains:

- **More than one `SELECT` statement**, you’re using subqueries.

- **A `WITH` clause**, you’re using CTEs (Common Table Expressions).

- **Notation that looks like `{% raw %}{{ variable }}{% endraw %}` in your `FROM` or `WITH` clause**, you have a [SQL variable][sql-variable-def] that references a [saved question or model][saved-question-model-docs].

## How to get the schema for a nested query

1. Get a sample of data from your nested query.
   - For **subqueries** or **CTEs**, [run each `SELECT` block separately][how-to-run-query-selections] and use the`LIMIT` clause.
   - For **saved questions or models**, go to the underlying Metabase question from the variables panel or by pasting the ID number into the search bar. Add a row limit using the query builder, or add a `LIMIT` clause in the SQL editor.
2. Compare the column names and values between your samples to check for foreign keys. For example:
   - In the [Metabase Sample Database][sample-database-def], the `Products` table has an `ID` column, and the `Orders` table has a `Product ID` column.
   - `ID` and `Product ID` both contain integer values, and many of those values show up in both columns.
3. Compare the rows between your samples to check for [table relationships][table-relationships-learn]. For example:
   - The `Products` table has unique values in the `ID` column.
   - The `Orders` table has multiple rows with the same `Product ID`.
   - The table relationship from `Products` to `Orders` is [one-to-many][one-to-many] (assuming that the foreign key relationship is valid).
4. If you're using a [model][model-foreign-keys], you can look for explicitly defined metadata by hovering over the column name.
5. If you're building off of someone else's work, ask the original creator of the query, saved question, or model.

**Explanation**

A schema describes the columns in a table, the data types of those columns, and the relationships between columns across different tables. This metadata is usually explicitly defined for tables stored in your database by the people who manage your data.

Since the results of nested queries are only stored temporarily, the metadata about the results isn't defined or stored anywhere. The steps above will help you manually inspect the query results instead.

Once you have the schemas for your nested queries, you can follow the [debugging steps](#debugging-steps).

**Further reading**

- [How to identify a nested query](#how-to-identify-a-nested-query)
- [What is a schema?][schema-def]
- [Database table relationships][table-relationships-learn]
- [How Metabase executes SQL queries][how-metabase-executes-sql-queries]

## Do you have a different problem?

- [My dates and times are wrong][troubleshooting-datetimes].
- [My data isn't up to date][troubleshooting-database-syncs].
- [I have a SQL syntax error][debugging-sql-syntax].
- [I have an error message that isn't specific to my SQL query or syntax][troubleshooting-error-messages].

## Are you still stuck?

Search or ask the [Metabase community][discourse].

[data-reference-docs]: /docs/latest/questions/native-editor/data-model-reference
[debugging-duplicated-data]: ./sql-logic-duplicated-data
[debugging-missing-data]: ./sql-logic-missing-data
[debugging-sql-syntax]: ./sql-syntax
[discourse]: https://discourse.metabase.com/
[how-metabase-executes-sql-queries]: /docs/latest/questions/native-editor/writing-sql#how-metabase-executes-sql-queries
[how-to-run-query-selections]: /docs/latest/questions/native-editor/writing-sql#running-query-selections
[model-foreign-keys]: /docs/latest/data-modeling/models#database-column-this-maps-to
[model-learn]: /learn/metabase-basics/getting-started/models
[multi-level-aggregation]: /learn/metabase-basics/querying-and-dashboards/questions/multi-aggregation
[one-to-many]: /learn/grow-your-data-skills/data-fundamentals/table-relationships#one-to-many-relationship
[sample-database-def]: /glossary/sample_database
[saved-question-model-docs]: /docs/latest/questions/native-editor/referencing-saved-questions-in-queries
[schema-def]: /glossary/schema
[sql-variable-def]: /glossary/variable#example-variable-in-metabase
[table-relationships-learn]: /learn/grow-your-data-skills/data-fundamentals/table-relationships
[troubleshooting-database-syncs]: /docs/latest/troubleshooting-guide/sync-fingerprint-scan
[troubleshooting-datetimes]: /docs/latest/troubleshooting-guide/timezones
[troubleshooting-error-messages]: /docs/latest/troubleshooting-guide/error-message
