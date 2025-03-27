---
title: "SQL"
headline: "SQL"
def: "A standardized and widely-used language for accessing and manipulating data in a relational database."
aka:
  - Structured query language
key-article:
  title: "Best practices for writing SQL queries"
  url: /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices
related-terms:
  - term: Relational database
    slug: relational_database
  - term: Native query
    slug: native_query
  - term: Native query editor
    slug: native_query_editor
  - term: SQL snippet
    slug: sql_snippet
  - term: CTE (common table expression)
    slug: cte
further-reading:
  - title: Working with SQL guide in Learn Metabase
    url: /learn/grow-your-data-skills/learn-sql/working-with-sql
  - title: Docs on Metabase's SQL editor
    url: /docs/latest/questions/native-editor/writing-sql
  - title: "SQL Cheatsheet: Five simple SQL commands to get started in data analytics"
    url: /blog/sql-cheatsheet-simple-sql-commands-to-get-started-in-data-analytics
---

## What is SQL?

Structured query language (known as **SQL**) is a standardized and widely-used language for accessing and manipulating data in a [relational databases](/glossary/relational_database). Using SQL involves writing and executing structured commands, known as statements, that communicate to a database what information you need or what you want to change.

SQL is a published ANSI and ISO standard, meaning there are established rules about what exactly the language includes and how it works. However, SQL-based database systems (like PostgreSQL, MySQL, SQL Server, etc.) each have slightly different functions and their own syntactical quirks — no major databases conform 100% to the official written standard.

Using SQL, you can:

- Create and configure databases, tables, and indexes
- Insert, update, and delete information in databases
- Retrieve information from databases (commonly known as querying)
- Set and adjust database permissions

## Is it pronounced "S.Q.L." or "sequel"?

Opinions are split on the matter of pronunciation, with some of those opinions _very_ strongly held. When computer scientists Donald Chamberlin and Raymond Boyce first developed the language specification in the early 1970s, they called it "SEQUEL" (pronounced "sequel"), but changed the language's name to SQL when faced with a trademark dispute. The ANSI and ISO standards dictate that the official pronunciation is the initialism ("S.Q.L."), but both pronunciations are common today.

So go with whatever sounds best to you — just don't be surprised when someone disagrees with you.

## Querying databases with SQL

No matter how advanced or complex, all SQL queries involve telling a database to return certain columns from a table (or tables), and then optionally specifying conditions about which rows should be included in those results and how they should be presented.

SQL is case-insensitive, but you'll often see people capitalizing reserved words (e.g., functions and clauses like `SELECT`, `WHERE`, `HAVING`, or `ORDER BY`). You can format your SQL statements as a single line if you like, though people will usually break their queries out onto separate lines for readability.

## Example SQL query

Here's a SQL query that asks Metabase's [Sample Database](/glossary/sample_database) to return a table of orders where the order subtotal was greater than \$100:

```sql
SELECT
    *
FROM
    orders
WHERE
    subtotal > 100
```

We can break this query down into three statements:

1. `SELECT *` tells the database to return every [column](/glossary/column) in the table.
2. `FROM orders` tells the database which table that is.
3. `WHERE subtotal > 100` tells the database to [filter](/glossary/filter) results and only return [rows](/glossary/row) where the value in the `Subtotal` field is greater than 100.

The example query above is a pretty simple one; more advanced queries can include [joins](/glossary/join), [aggregations](/glossary/aggregation), [CTEs](/glossary/cte), and other tools for pulling and organizing data.

## SQL in Metabase

You don't have to write SQL when asking [questions](/glossary/question) in Metabase (that's what the [query builder](/glossary/query_builder) is for), but if you prefer SQL queries, the [native query editor](/glossary/native_query_editor) is there for you, along with features like:

- [SQL variables](/docs/latest/users-guide/13-sql-parameters) (including [field filters](/learn/sql-questions/field-filters))
- [SQL snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets)
- [SQL snippet controls](/docs/latest/enterprise-guide/sql-snippets) (available in [some plans](/pricing/))

And if you do opt for using the query builder to ask questions in Metabase, you can always view the underlying SQL that powers your question or convert it to a native SQL query.
