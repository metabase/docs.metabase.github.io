---
version: v0.56
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Databases
title: Adding and managing databases
source_url: 'https://github.com/metabase/metabase/blob/master/docs/databases/connecting.md'
layout: new-docs
redirect_from:
  - /docs/latest/administration-guide/01-managing-databases
  - /docs/latest/databases/connections/sql-server
  - /docs/latest/administration-guide/databases/h2
  - /docs/latest/databases/connections/h2
  - /docs/latest/databases/connections
latest: true
---

# Adding and managing databases

Connect Metabase to your data sources.

## Adding a database connection

To add a database connection, click on the **gear** icon in the top right, and navigate to **Admin settings** > **Databases** > **Add a database**.

Fill out the fields for that database, and click **Save changes** at the bottom.

The connection settings differ database to database. For the list of connection settings available for your database, click on the link to your database below.

## Connecting to supported databases

The databases listed below have official drivers maintained by the Metabase team. Customers on [Pro and Enterprise](/pricing/) will get official support. For each database, Metabase supports the oldest supported version through the latest stable version.

- [Athena](./connections/athena)
- [BigQuery](./connections/bigquery) (Google Cloud Platform)
- [ClickHouse](./connections/clickhouse)
- [Databricks](./connections/databricks)
- [Druid](./connections/druid)
- [MongoDB](./connections/mongodb)
- [MariaDB](./connections/mariadb)
- [MySQL](./connections/mysql)
- [Oracle](./connections/oracle)
- [PostgreSQL](./connections/postgresql)
- [Presto](./connections/presto)
- [Redshift (Amazon Web Services)](./connections/redshift)
- [Snowflake](./connections/snowflake)
- [SparkSQL](./connections/sparksql)
- [SQL Server](./connections/sql-server)
- [SQLite](./connections/sqlite)
- [Starburst](./connections/starburst)
- [Vertica](./connections/vertica)

If you don't see your database listed here, see [Community drivers](../developers-guide/community-drivers).

As of version 46.6.4, Metabase [no longer supports H2 connections](/blog/vulnerability-post-mortem). But Metabase still ships with an H2 database to include an embedded application database, as well as to provide some sample data out of the box.

## Connecting to databases hosted by a cloud provider

For provider-specific connection details, like connecting to a PostgreSQL data warehouse on RDS:

- [AWS's Relational Database Service (RDS)](./connections/aws-rds)

## Granting database privileges

For Metabase to connect, query, or write to your database, you must give Metabase a database user account with the correct database privileges. See [Database roles, users, and privileges](./users-roles-privileges).

## Syncing and scanning databases

See [Syncing and scanning](./sync-scan).

## Deleting databases

**Caution: Deleting a database is irreversible! All saved questions and dashboard cards based on the database will be deleted as well!**

Go to **Admin settings** > **Databases** > your database and click **Remove this database**.

## Restoring the Sample Database

If you've deleted the Metabase [Sample Database](/glossary/sample-database), go to **Admin settings** > **Databases** and click **Bring the Sample Database back**.

## Troubleshooting

- [Troubleshooting database connections](../troubleshooting-guide/db-connection)
- [Troubleshooting syncs, scans, and fingerprinting](../troubleshooting-guide/sync-fingerprint-scan)
- Search or ask the [Metabase community](https://discourse.metabase.com/).
- Search for [known bugs or limitations](../troubleshooting-guide/known-issues).

## Further reading

- [Metadata editing](../data-modeling/metadata-editing).
- [Setting data access permissions](../permissions/data).
- [Metabase at scale](/learn/metabase-basics/administration/administration-and-operation/metabase-at-scale).
