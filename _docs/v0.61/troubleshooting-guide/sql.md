---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Troubleshooting Guide'
title: 'Troubleshooting SQL questions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/troubleshooting-guide/sql.md'
layout: new-docs
---

# Troubleshooting SQL questions

## Incorrect results

- [Aggregations (counts, sums, etc.) are wrong](/learn/sql/debugging-sql/sql-logic#aggregated-results-counts-sums-etc-are-wrong).
- [Results have duplicated rows](/learn/sql/debugging-sql/sql-logic-duplicated-data).
- [Results are missing rows](/learn/sql/debugging-sql/sql-logic-missing-data).
- [Dates and times are wrong](./timezones).
- [Data isn't up to date](./sync-fingerprint-scan).

## SQL variables and field filters

- [Filter widget doesn't display a dropdown menu of values](../data-modeling/metadata-editing#changing-a-search-box-filter-to-a-dropdown-filter).
- [SQL query contains table aliases](../questions/native-editor/field-filters#specifying-the-table-and-field-alias).
- [SQL syntax error: missing `FROM` clause](../questions/native-editor/field-filters#field-filters-must-be-connected-to-database-fields-included-in-the-query).
- [I don't know the SQL variable type](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/sql-variables)

## SQL syntax errors

For some common error messages, see [error messages](./error-message).

## Working with JSON in SQL

Using the `?` operator for working with JSON in SQL may cause queries to fail. On PostgreSQL, you can use `??` instead.

## Are you still stuck?

If you can’t solve your problem using the troubleshooting guides:

- Search or ask the [Metabase community](https://discourse.metabase.com/).
- Search for [known bugs or limitations](./known-issues).
- Hire a [Metabase Expert](/partners/){:target="\_blank"}.
