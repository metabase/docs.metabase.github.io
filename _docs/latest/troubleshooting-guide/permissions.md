---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Troubleshooting Guide
title: Troubleshooting permissions
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/troubleshooting-guide/permissions.md
layout: new-docs
latest: true
---

# Troubleshooting permissions

If someone has the wrong level of access to a dashboard or a question, the problem may be coming from group settings, collection permissions, or data permissions.

1. Go to **Admin** > **People** and check if the person is in [more than one group with different permissions][group-permissions].
2. If a person **can't view or edit** questions or dashboards, see [Troubleshooting collection permissions](#troubleshooting-collection-permissions).
3. If a person **can't access data**, such as schema, tables, rows, or columns, see [Troubleshooting data permissions](#troubleshooting-data-permissions).

If you have a different issue, see [related problems](#do-you-have-a-different-problem).

## Troubleshooting collection permissions

- [A user group can't access a dashboard in a collection that they have permissions for][troubleshooting-viewing-editing].
- [A user group can view collections that contain restricted data][collections-restricted-data].

## [Troubleshooting data permissions][troubleshooting-data-permissions]

### Row and column permissions

- [Troubleshooting data row and column security](./row-and-column-security)

### Native query (SQL) permissions

- [A user group can't access the SQL editor][sql-access].
- [A user group with SQL permissions isn't being restricted by their row and column security](./row-and-column-security)

### Table or schema permissions

- [A user group has the wrong access to a table or schema][table-schema-access].
- [Getting a "permission denied" error message][permission-denied].
- [Checking someone's access to a table or schema](./data-permissions#checking-someones-access-to-a-table-or-schema)

## Do you have a different problem?

- [I can't save my question or dashboard][proxies].
- [I can't see my tables](./cant-see-tables).

## Are you still stuck?

If you can’t solve your problem using the troubleshooting guides:

- Search or ask the [Metabase community][discourse].
- Search for [known bugs or limitations][known-issues].

[admin-permissions]: ../permissions/start
[collection-permissions]: ../permissions/collections
[collections-restricted-data]: ./data-permissions#a-user-group-can-view-collections-that-contain-restricted-data
[connecting-database]: ../databases/connecting
[data-browser]: /learn/metabase-basics/querying-and-dashboards/data-browser
[data-model]: ../data-modeling/metadata-editing
[data-permissions]: ../permissions/data
[discourse]: https://discourse.metabase.com/
[group-permissions]: ../permissions/introduction#key-points-regarding-permissions
[known-issues]: ./known-issues
[learn-permissions]: /learn/metabase-basics/administration/permissions
[permission-denied]: ./data-permissions#getting-a-permission-denied-error-message
[proxies]: ./proxies
[setting-collection-permissions]: ../permissions/collections#setting-permissions-for-collections
[sql-access]: ./data-permissions#a-user-group-cant-access-the-sql-editor
[table-schema-access]: ./data-permissions#a-user-group-has-the-wrong-access-to-a-table-or-schema
[troubleshooting-data-permissions]: ./data-permissions
[troubleshooting-viewing-editing]: ./cant-view-or-edit
