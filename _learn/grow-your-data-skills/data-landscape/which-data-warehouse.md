---
layout: learn_article
date: 2021-02-26 00:16:26
categories: Analytics
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/data-diet/analytics/which-data-warehouse
  - /learn/analytics/which-data-warehouse
  - /learn/grow-your-data-skills/analytics/which-data-warehouse
---

When setting up an analytics system for an organization or project, you'll need to figure out where to store your data. While there's no one-size-fits-all solution, we'll give you a rough map of the choices available for data warehousing, with the goal of helping you find the solution that's best for your budget, the amount of data you expect to work with, and your performance needs.

Here's the list of our choices for the best data warehouse software, for small startups on up.

## 1. Your application database

The simplest option is to just use the production database) that is currently storing your data, whether that's a web app, mobile app, or native desktop app (and not Metabase's own [application database](/glossary/application-database)).

Common examples:

- [MySQL](https://www.mysql.com/)
- [PostgreSQL](http://www.postgresql.org/)
- [SQL Server](https://www.microsoft.com/en-us/server-cloud/products/sql-server/)
- [Oracle](https://www.oracle.com/database/)

| Pros                                         | Cons                                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| Your data warehouse already exists.          | Analytics workloads might slow down your application.                              |
| Only need to deal with one database server.  | The data schema is often difficult to use for analytics.                           |
| No need to transform data or move it around. | Scaling becomes difficult when balancing two fundamentally different modes of use. |

Using a database as both your production database and your data warehouse is usually a preliminary stage for "real" applications, but if you're building a small, internal application, MVP, or prototypes, doubling up on a single database is a viable choice. Once you get ready to launch (for consumer applications), you'll likely want to migrate off this setup to a more scalable choice below. If you haven't already selected a database for you application, make sure it supports read replicas, which bring us to the next option:

## 2. A read replica of your application database

If your main database supports read replicas, the next laziest thing you can do is create a read replica of your main database, i.e., a copy of your production database. You can also set up another namespace to include your third-party data or events, and call it a win.

| Pros                                                            | Cons                                                                             |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| You don't need to manage a different kind of database.          | Databases optimized for transactional loads are usually suboptimal for analytics |
| No need to transform data or move it around.                    | You need to manage another database. server.                                     |
| You can scale analytical and transactional loads independently. | The data schema is often difficult to use for analytics.                         |

Typically, once you start getting serious about analytics, and your scale increases (both in the _volume_ of data and the _complexity_ of analytical queries), there are significant performance advantages to moving to a dedicated data warehouse.

## 3. Running the same kind of database as your application

If you don't have scale that requires you to run a database on multiple machines, you can get away with using the same type of database you use for your application database as a dedicated analytics data warehouse (e.g., if you're using PostgreSQL for your app, you can use another Postgres database to store your analytics data). This setup differs from the previous one in that this data warehouse is not merely a read replica of your database; it's instead tuned for analytical workloads. This tuning involves configuring the database's settings, and reshaping the way your data is laid out in tables to make analytical queries faster and easier to write.

| Pros                                                            | Cons                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| You only need to manage one kind of database.                   | You need to manage another database server.                                                |
| You can scale analytics and transactional loads independently.  | Databases optimized for transactional loads are usually suboptimal for analytics purposes. |
| You can optimize the data model/schema to your analytical work. | You need to move data around (and transform it).                                           |
|                                                                 | These databases are usually limited to a single node, which impacts scalability.           |

This setup can take you really far. Once you reach a point where common queries are taking minutes or longer, you should evaluate options with more horsepower.

## 4. SQL-based analytics databases

Here's where we get into databases designed for analytical workloads. The main distinctions between "normal" database software and databases intended for heavy analytics workloads are parallelization and data format. You'll often see the terms Online Transaction Processing databases (OLTP) and Online Analytical Processing databases (OLAP). These are the OLAP databases.

### Difference between OLAP and OLTP

Just to be clear on the difference between OLAP and OLTP databases: transactional (OLTP) workloads typically have many small reads, writes, and updates. These workloads can live on a single machine for much longer than analytical workloads for a given company. By contrast, analytical (OLAP) workloads have less frequent read operations, but those reads touch much larger amounts of data.

- Example _transactional_ workload: fetch a single user's last login time to display it to them in the app.
- Example _analytical_ workload: a query to count the total number of user logins per day for the last three months to create a line chart.

Transactional databases typically store data in row format. For example, let's say we have a table with user records, with each user record comprising their name, address, last login time, and date of birth. The transactional database will store all four of those fields in one unit, which enables the database to retrieve (or update) that record very quickly.

Conversely, analytical databases tend to use columnar storage, storing all of the names together, all of the last login times together, and so on. Columnar storage makes operations like "what is the average age of our userbase?" easy, as the database can ignore all of the data in the database except the date of birth column. By reducing the amount of data the database needs to scan, columnar storage dramatically improves performance for analytical queries. The flipside is that columnar storage isn't so super at transactional workloads.

### Hosted SQL-based analytics database options

SQL-based analytics databases as a service can be a great deal if you don't have much in-house database administration expertise. The space is very competitive, so the general wisdom here is that you should just use the option that your current cloud provider offers, though if you're hitting this stage, it might be time to shop around to see if you can get a better deal. The main challenge with these data warehouses is that getting data into them can be complicated. Performance is _relatively_ comparable across all options, so be skeptical about benchmarks showing one solution dramatically outperforming others.

| Pros                             | Cons                               |
| -------------------------------- | ---------------------------------- |
| Designed for analytical queries. | Can be expensive.                  |
| Scalable.                        | Potentially unpredictable pricing. |
| Battle-tested.                   | Getting data in is a pain.         |

Here are some of the major data warehouses:

#### Redshift - Amazon Web Services

[Redshift](https://aws.amazon.com/redshift/) is Amazon Web Service's (AWS) hosted data warehouse. It's generally the cheapest and easiest option overall. You'll have to deal with manually provisioning clusters, but you'll get more predictable pricing, as you'll be the one "buying" more machine time. Recently, AWS added [RA3 instances](https://pages.awscloud.com/Redshift_RA3instances.html) to the Redshift offering, which let's you separate compute and storage, similar to options like Big Query and Snowflake. And when combined with AWS Aqua, you can significantly improve performance.

#### BigQuery - Google Cloud Platform

For a while, [BigQuery](https://cloud.google.com/bigquery/) (known internally and in the research literature as Dremel) was one of Google's semi-secret weapons. It's fast, and instead of paying per machine (like you would if you were to run Postgres on a server) BigQuery abstracts away the infrastructure, instead charging you based on the volume of your data and how much CPU/IO your queries use. It used to use a custom dialect of SQL, but since version 2.0 it has switched to [Standard SQL](https://cloud.google.com/bigquery/docs/reference/standard-sql/migrating-from-legacy-sql). BigQuery also provide built-in machine learning capabilities with [BigQuery ML](https://cloud.google.com/bigquery-ml/docs/introduction). The flipside of pay by compute and storage is that pricing can be less predictable.

#### Snowflake - available hosted, or on other providers

[Snowflake](https://www.snowflake.com/) is one of the most popular data warehouses. Its advantages are that it's fast (some claim their compute optimizations make them the fastest), and you don't need to scale Snowflake, so no need to worry about provisioning machines. The downside is that it's expensive.

#### Vertica - hosted service or run your own

[Vertica](https://www.vertica.com/) offers a free community edition limited to 3 nodes and 1 TB of data, and the commercial edition is available without those limits as a Docker image and via Kubernetes.

### Proprietary analytics databases

There are a variety of sophisticated (and expensive) database solutions optimized for analytical workloads. If you're reading this guide, chances are you're not in the market for a 6--7 figure engagement with a database vendor.

| Pros                                                                    | Cons                                                |
| ----------------------------------------------------------------------- | --------------------------------------------------- |
| Strong services component if you need help (and can pay).               | Expensive.                                          |
| Some with on prem option or hosted.                                     | You need to manage another database server.         |
| Long operational histories and experience with complicated deployments. | Typically very complicated to setup and administer. |

Examples:

- [Teradata](http://www.teradata.com/)
- [Oracle Data Warehouse](https://www.oracle.com/database/data-warehouse/)

## 5. Beyond the data warehouse: data lakes and lakehouses

Here's where the number of options start getting out of control. If you're a company dealing with significant scale, you could consider building a dedicated data pipeline that uses a **data lake**: a place where all of your data is stored, both structured and unstructured. The catch here is that building a pipeline around a data lake will involve assembling a team of (expensive) data engineers. At this point, you'll be instrumenting your application with events (like app open, button clicked), decorating that data as needed (like adding other relevant details to an event, such as user session details), then dumping that cleaned-up data into cheap storage (like AWS's [S3 (Simple Storage Service)](https://aws.amazon.com/s3/), typically in a format like [parquet](https://parquet.apache.org/)). This object store is your data lake.

Your users won't generally query the data lake directly. Instead, you'll create the "structure" of your data as needed using [Extract Transform Load](/glossary/etl) (ETL) operations. You'll use a query engine like Presto to run ETL queries over the data lake, with the goal of organizing the data into tables that anticipate the kinds of questions your business will ask. These query engines allow you to ask questions of an object store like S3 as if it were a relational database - it's like using SQL to query a file system.

You can use [directed acyclic graphs](/glossary/dag) (DAGs) to schedule and run these ETLs: [Airflow](https://airflow.apache.org/) comes in handy here. The idea with your ETLs is to produce fact and dimension tables, as well as summary tables that list aggregate data (daily number of orders, average session duration, or whatever). The tables produced by the ETLs tie together a lot of info from multiple sources that will help the business make decisions (e.g., everything you'd want to know about an order, or a product, and so on). It's like building your data warehouses on the fly.

You can also dump these ETL tables back into your data lake, or---if you really need speedy dashboards---into an in-memory database like [Druid](https://druid.apache.org/).

| Pros                                                 | Cons                                                      |
| ---------------------------------------------------- | --------------------------------------------------------- |
| Can scale to massive datasets.                       | Data engineers and pipeline services are expensive.       |
| Flexible, don't need to define schema ahead of time. | You're taking on the complexity of a lot of moving parts. |

The hybrid data lake and data warehouse gave us the data lakehouse, an architecture which aims to provide some structure to data lakes, with the goals of reducing administration and giving analytics tools more direct access to the data.

Some popular tools to work with a data lake setup:

- [Presto](https://prestodb.io/) Open source query engine that let's you query a file store using SQL
- [Athena](https://aws.amazon.com/athena). AWS's serverless interactive query service.
- [Spark SQL](http://spark.apache.org/sql/). Run SQL queries over data in Parquet format or Hive tables.
- [Azure Data Lake Storage](https://azure.microsoft.com/en-us/services/storage/data-lake-storage/).
- [Databricks](https://databricks.com/)
- [Data lakes on AWS](https://aws.amazon.com/big-data/datalakes-and-analytics/) Overview of a data lake setup.
- [Airflow](https://airflow.apache.org/) For scheduling ETLs.
- [Druid](https://druid.apache.org/). In-memory database to store your ETL'd tables for analytical queries.
- [Pinot](https://pinot.apache.org/) OLAP db purpose-built for realtime analytics. Came out of LinkedIn, now under Apache.

## Further reading

- [Metabase at scale](/learn/administration/metabase-at-scale)
- [Making dashboards faster](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster)
