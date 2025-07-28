---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: Questions
title: 'Questions overview'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/questions/start.md'
layout: new-docs
redirect_from:
    - /docs/master/questions
---

# Questions overview

Questions are queries plus their visualization. You can ask questions using Metabase's graphical query builder, or create a native/SQL query.

## [Question introduction](./introduction)

Questions are the basic building blocks of Metabase.

## Query builder

### [The query editor](./query-builder/editor)

An introduction to Metabase's graphical query builder.

### [Custom expressions](./query-builder/expressions)

Custom expressions, like spreadsheet formulas, are tools you can use in the graphical query builder to ask more complicated questions.

### [List of expressions](./query-builder/expressions-list)

A list of the aggregations and functions available in the graphical query builder.

### [Joining data](./query-builder/join)

You can join data to combine your current data with another table, or even with a saved question.

## Native query editor

Also known as the SQL editor (we say native because you can also query databases that don't use SQL, like MongoDB).

### [Introduction to the native query editor](./native-editor/writing-sql)

Write native code (like SQL) to query your data source.

### [SQL templates](./native-editor/sql-parameters)

Pass parameters into variables in your SQL templates.

### [Field filters](./native-editor/field-filters)

Create smart filter widgets by connecting field filter variables to fields in your database.

### [Basic SQL parameters](./native-editor/basic-sql-parameters)

Learn the basics of using parameters in SQL queries.

### [Optional variables](./native-editor/optional-variables)

Use brackets to create parameters that can be left empty in your queries.

### [Time grouping parameters](./native-editor/time-grouping-parameters)

Group your data by time periods using parameters in native queries.

### [Filter widgets](./native-editor/filter-widgets)

Configure filter widgets connected to variables in your native queries.

### [Referencing saved questions in queries](./native-editor/referencing-saved-questions-in-queries)

Use saved questions as data sources in your native queries.

### [Snippets](./native-editor/snippets)

Reuse and share bits of SQL.

## Sharing results

There are many different ways to share the results of questions. To share the results of a dashboard, see [Dashboard subscriptions](../dashboards/subscriptions).

### [Visualizing results](./visualizations/visualizing-results)

Choose from a variety of visualization types.

### [Alerts](./alerts)

Get results via email or Slack, either on a schedule, or only when something interesting happens.

### [Exporting](./exporting-results)

The different ways you can export the results of questions and dashboards.

### [Tooltips](./visualizations/tooltips)

Customize tooltips on bar, line, and area charts.
