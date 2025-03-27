---
version: v0.50
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

- [Aggregations (counts, sums, etc.) are wrong](/learn/grow-your-data-skills/learn-sql/debugging-sql/sql-logic#aggregated-results-counts-sums-etc-are-wrong).
- [Results have duplicated rows](/learn/grow-your-data-skills/learn-sql/debugging-sql/sql-logic-duplicated-data).
- [Results are missing rows](/learn/debugging-sql/sql-logic-missing-data).
- [Dates and times are wrong](./timezones).
- [Data isn't up to date](./sync-fingerprint-scan).

## SQL variables and field filters

- [Filter widget doesn't display a dropdown menu of values](../data-modeling/metadata-editing#changing-a-search-box-filter-to-a-dropdown-filter).
- [SQL query contains table aliases](../questions/native-editor/sql-parameters#field-filters-dont-work-with-table-aliases).
- [SQL syntax error: missing `FROM` clause](../questions/native-editor/sql-parameters#field-filters-must-be-connected-to-fields-included-in-the-query).
- [No option to display a filter widget](../questions/native-editor/sql-parameters#field-filter-compatible-types).
- [I don't know the SQL variable type](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-variables).

## SQL syntax errors

For some common error messages, see [error messages](./error-message).

## Working with JSON in SQL

Using the `?` operator for working with JSON in SQL may cause queries to fail. On PostgreSQL, you can use `??` instead.

## Are you still stuck?

If you can’t solve your problem using the troubleshooting guides:

- Search or ask the [Metabase community](https://discourse.metabase.com/).
- Search for [known bugs or limitations](./known-issues).
- Hire a [Metabase Expert](/partners){:target="\_blank"}.
