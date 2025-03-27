---
layout: learn_article
date: 2021-12-22
categories: Databases
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/databases/types-of-databases
  - /learn/grow-your-data-skills/data-fundamentals/types-of-databases
---

There are a lot of database and data source options out there to consider when building your [data stack](/blog/the-modern-data-stack). Here's a rundown of the major players that Metabase supports, whether you're new to the data space or just need a refresher.

## All-around workhorses: traditional relational database management systems

**Includes**: Microsoft SQL Server, MySQL, Oracle Database, PostgreSQL

All four of these relational database management systems (RDBMS) have been around for decades, and handle all-around database needs — inserting records, reading, updating, deleting records — quite well. Of these four, MySQL and PostgreSQL are open source.

If your organization is short on time or resources, or lacks any data experts to build [ETLs](/learn/grow-your-data-skills/analytics/etl-landscape), a relational database system like [MySQL](/docs/latest/administration-guide/databases/mysql), Postgres, SQL Server, or [Oracle Database](/docs/latest/administration-guide/databases/oracle) is a great option. Lots of organizations that use Metabase do so simply by connecting their relational database so they can start getting insights right away. These databases are well-suited for use as the [application database](/glossary/application-database) for your software. Metabase, the software, can use either Postgres or MySQL for its [production database](/docs/latest/operations-guide/configuring-application-database).

Traditional relational databases can handle analytical queries of hundreds of thousands of records with little problem, but if your organization needs to significantly scale up — think millions of records or more — you may hit a ceiling with your RDBMS. A lot of this depends on how your data warehouse is configured and whether you're using ETL processes to aggregate data so your database has to read fewer rows.

These four systems are transactional databases, and aren't specifically built for analytical queries. While you _can_ accomplish analytical queries via any of these four engines, it can require a lot of extra hardware (additional RAM, CPUs, and faster disks) to keep up with the growth of the volume of your data, and that gets expensive very quickly. As you scale up and your analytical queries become more complex, they may run slowly no matter how much hardware you throw at the problem. At that point, it may be time to look at another technology specifically built for big data and analytical queries.

## Querying big data: data warehouses

**Includes**: BigQuery, Redshift, Snowflake, Vertica

[Data warehouses](data-mart-data-warehouse-data-lake#data-warehouse) are well-equipped to execute analytical queries on large amounts of data. Products like [BigQuery](/docs/latest/administration-guide/databases/bigquery), AWS Redshift, [Snowflake](/docs/latest/administration-guide/databases/snowflake), and [Vertica](/docs/latest/administration-guide/databases/vertica) are able to process big data because they're powered by huge numbers of parallel engines, making analytical queries across massive data sources much more manageable. These data warehouses each work a little differently, but when you want to run a query, they'll utilize that parallelization to split up your data and aggregate the results before returning your query. These data warehouses also rely on columnar storage (storing data by columns rather than rows) to speed up analytical operations, as this frees your database from having to scan information within rows that isn't relevant to the current query.

You're charged according to the resources used while executing queries, but inserting data into these warehouses also gets expensive. If your organization needs real-time data (or close to it), a data warehouse like one of these isn't the most efficient, as they'll need to reindex whenever new data is added, and that takes time.

While BigQuery, Redshift, and Snowflake are exclusively cloud-based, Vertica — which is open source — can be run either in the cloud or on-prem.

## Real-time analytical databases

**Includes**: Druid

Databases like Druid, an open-source product, appeal to organizations who need to query data as soon it's generated. With a real-time database, you can run analytical queries as soon as data makes its way to your data engine, without additional processing or lengthy wait times.

If your business model relies on the ability to harness real-time data (e.g., financial services or information security), a database like Druid is worth exploring. But managing pipelines for real-time data can get complex — there's a lot that can go wrong between whatever is generating your data and the processing of that data through the different tools in the pipeline. Given the complexity of these systems, especially when you're handling large amounts of data, having people on hand to oversee your real-time database will be a big help.

## For ad hoc analysis: file-based databases

**Includes**: SQLite, H2

SQLite and H2 are similar to a traditional RDBMS like MySQL or Postgres — both types are relational databases — but file-based databases contain no server on the database side. Instead of any code that works to optimize your database, these types are a file that lives on your computer. If you're using Metabase, you'll store your SQLite database in the same place as your Metabase server so that Metabase can draw on it for analysis.

File-based databases are well-suited for embedding and ad hoc analysis — things like one-off queries that don't require massive amounts of real-time data. While SQLite is the most widely-deployed database in the world (largely because of its simplicity), use of file-based databases for complex analytics is limited, and a file-based database probably isn't where you want to keep your live data.

## Query engines

**Includes**: SparkSQL, Presto

Query engines aren't databases themselves, but rather sit between your data and your end result. SparkSQL and Presto are two open source engines that can ingest and query data from a wide variety of sources, including real-time data.

Like the cloud data warehouses discussed above, engines like Spark and Presto will execute analytical queries on massive amounts of data roughly according to the following steps:

1. Start by dividing the work into smaller jobs.
2. Parallelize the query — that is, run it simultaneously across those smaller jobs.
3. Aggregate those results.
4. Finally, deliver the result of your original query.

## Document-based databases

**Includes**: MongoDB

While all of the above options all contain some relational element, an unstructured, NoSQL database like [MongoDB](/docs/latest/administration-guide/databases/mongodb) works differently. Instead of storing data in tables, MongoDB saves data in "collections" of documents, and allows you to query those documents, which are often JSON files. This means that the documents you save in a collection can be the same or completely unrelated, but there's no native way to [join](/learn/metabase-basics/querying-and-dashboards/questions/joins-in-metabase) them like you would tables in a relational database.

Unlike relational databases, MongoDB is easily sharded. This means you can store different parts of collections in entirely separate nodes (a physical instance of your database, like a separate server or computer), which helps when scaling your database.
