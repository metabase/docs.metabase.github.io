---
title: "View"
headline: "View"
def: "A query and its results that function like a virtual table in your database."
related-terms:
  - term: Common Table Expression (CTE)
    slug: cte
  - term: Relational database
    slug: relational_database
  - term: SQL
    slug: sql
further-reading:
  - title: "SQL Snippets vs. Saved Question vs. Views"
    url: /learn/sql-questions/organizing-sql
  - title: "Models in Metabase"
    url: /learn/getting-started/models
  - title: "Making dashboards faster"
    url: /learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster
---

## What is a view?

A **view** is a query and its results that function like a virtual table in your database. Databases compute views on demand, meaning they aren't precomputed or materialized, and for that reason don't occupy any storage space in the database. You can think of views as virtual or logical tables.

Database views let you combine information from multiple tables and format that information however best makes sense for the people who need to query it. You (or a database administrator) can create a view that hides unnecessary fields in a cluttered table or joins tables to bring together relevant data. By using the view as the starting point, people won't need to run the same complex queries every time just to get to their actual question about the data.

The downside to querying views is that those queries can be time-consuming to run, especially if that view is the result of several tables or multiple [joins](/glossary/join).

Database administrators also use views for security purposes, like creating views that hide certain fields that exist in the base table. That way, other users can still access and query the data they need without gaining access to sensitive fields or rows.

## View vs. materialized view

If views are virtual tables (computed as needed), then **materialized views** are like regular tables in a database. While views require that a query be rerun every time that view is referenced, a materialized view is a precomputed view that's saved in the database. So, materialized views take up space in your database, but since the database doesn't have to compute materialized views each time, they perform much faster when querying than standard database views (it's like querying a normal table).

## When you should (and shouldn't) use database views

Creating views in your database is a good idea if:

- You need to access the results of a complex query on a regular basis and don't want to type that query out every time.

- You're looking to strengthen database security by restricting access to sensitive information.

- You want to create custom columns without altering the underlying structure of your database.

- You'd like to simplify the appearance of your tables by hiding fields that are unlikely to be queried.

However, if the underlying structure of your database is subject to change, you probably don't want to rely on views; the moment a field name changes, the query you've established as a view may break.

Your BI tool probably has features that function sort of like views too, whether it's a [model](/glossary/model), [saved question](/glossary/saved_question), or [SQL snippet](/glossary/sql_snippet). The important distinction here is that those are all features that exist with the world of the BI tool, whereas views (materialized or not) are built into your database itself.

## Example view

Using Metabase's [Sample Database](/glossary/sample_database), let's say we wanted to create a view based on the `People` table that our team in Pennsylvania could use to access information like the names, addresses, birthdays, and emails of our PA-based customers, but not user passwords.

We'd create that view in our database by running query shown below, which creates the view, names it `pennsylvania_customers`, includes only the columns we want from the `People` table, and only displays records where the value in the `State` field is the abbreviation for Pennsylvania (PA).

```sql
CREATE VIEW pennsylvania_customers
AS
SELECT
    id
    address
    email
    name
    city
    state
    birth_date
    zip
    created_at
FROM
    people
WHERE state = 'PA'
```

Then for future queries, our team in Pennsylvania could access the information they need about their customer base by querying `pennsylvania_customers` as their starting point.

While views are a pretty fundamental feature of any SQL-based database or data warehouse, the specifics of creating, materializing, and maintaining them may differ depending on [which database software or data warehouse](/learn/analytics/which-data-warehouse) you use.
