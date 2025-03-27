---
title: "Metabase 0.14"
subtitle: Segments, Metrics
date: 2016-01-28 16:10:58
categories: jekyll update
image: /images/releases/metabase-0.14.jpg
author: Sameer Al-Sakran
redirect_from: /blog/metabase-v14-is-out/
---

A new version of Metabase is out! See our release notes below.

### Features / Enhancements

- Segments - the ability to store and reuse filter definitions
- Metrics - the ability to store and reuse aggregation definitions
- Improved support for table namespaces (schemas) in databases that use them such as Postgres/Redshift
- Druid driver
- Performance improvements in database introspection process plus the ability to optionally completely disable the more resource intensive database analysis work
- Interactive tutorial that trains users on how to work with the Query Builder
- Expand the limits on Pulses so more charts can be included
- More instrumentation on frontend features
- SQL Server now supports SSL connections
- Provide detailed error messages on Query Builder when query fails
- Support for many more timezones across the world
- Ability to easily migrate from H2 application database to Postgres/MySQL

### Bug Fixes

- Fix for Firefox where strict javascript validation was causing app failure
- Fix bug where "[Unknown Field]" would show up in automatic title creation sometimes
- Fix issue where dots in SQL database table names was causing an error
- Fix for utf-8 encoding issue on Pulse images
- Fix bug where add to dashboard modal was only listing dashboards created by the user
- Fix error where SQL Server columns using varchar(max) were breaking queries
- Fix for error in queries that returned a binary column
- Don't show stddev aggregation option on databases that don't support it
- Fix for rendering bug on pivot tables
- Fix bug where a row count larger than MAX_INT would create an error updating table metadata
- Fix chart rendering for bar charts grouped by time quarterly
- Fix issue where pulses fail to render some SQL cards

[Full list of issues](https://github.com/metabase/metabase/issues?q=milestone%3A0.14.0+is%3Aclosed)

You can download the new version of Metabase at [metabase.com/start](/start/).
