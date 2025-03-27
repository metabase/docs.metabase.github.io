---
title: "Set up a basic pipeline for log analysis"
summary: "You can use a BI tool for small scale log analysis with data visualizations. Here are a few tips and suggestions to get started."
date: 2024-03-04 00:10:22
last_updated_at: 2024-03-04 00:10:22
categories: "Using Metabase"
author: The Metabase Team
featured_image: /images/posts/best-practices-logging-pipeline.jpg
image: /images/posts/best-practices-logging-pipeline.jpg
layout: post
---

Choosing tools to clean, parse, and structure log data can be overwhelming (and expensive). But when you're just getting started, you can get away with a simple setup for ad hoc analysis with a BI tool like Metabase. Here are a few best practices to follow for setting up a basic pipeline for analyzing logs.

## Use a data connector tool as a shortcut for ingestion

Tools like [Airbyte](https://airbyte.com/) can quickly connect to your database and structure logs for you. Choose your logging source, like [AWS CloudTrail](https://aws.amazon.com/cloudtrail/), and connect it to a database, like [Snowflake](https://www.snowflake.com/en/) (a relatively easy, scalable, reasonable cost solution), or [AWS Aurora Serverless Postgres](https://aws.amazon.com/rds/aurora/serverless/)(an easy, somewhat scalable, low-cost solution).

Other ETL tools, like [Fivetran](https://www.fivetran.com/connectors) or [Stitch](https://www.stitchdata.com/), work in a similar vein. They use a connector to move log data from a source, like CloudTrail, to your database. You can also [use an ETL tool and perform data modeling in tandem](/learn/metabase-basics/getting-started/models) to do some of the heavier lifting for you.

## Use a single cloud provider to keep everything under one roof

[Google Cloud Logging](https://cloud.google.com/logging?hl=en) connects with [BigQuery](https://cloud.google.com/logging/docs/export/bigquery) so you can automatically ingest logs right into your data warehouse. AWS has multiple logging options, like CloudTrail or [CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html), that you can connect to one of their database options, like [Postgres for RDS](https://aws.amazon.com/rds/). [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview) also has logging and storage capabilities.

### Advanced use case: dump logs from multiple AWS services into an S3 bucket and query them with Athena

If you have a bit of experience with cloud services, like AWS, you can use an entire suite of cloud services to take logs from several different services and push them into one central location to prepare for analysis.

For example, push web server or application logs from your EC2 instances into an S3 bucket, along with your CloudTrail logs. Connect your S3 bucket to a querying tool, like [Athena](https://levelup.gitconnected.com/loading-data-from-s3-to-aws-athena-7c56c63efccc), so you can [create a few tables](https://docs.aws.amazon.com/athena/latest/ug/creating-tables.html#creating-tables-how-to) to use for analysis. Once you have tables, you can connect to your analytics tool and create a troubleshooting dashboard, like one that maps EC2 events to CloudTrail incidents for root cause analysis.

Here's some other AWS logging options that you can use with S3 and Athena:

- CloudWatch: store application, system, or custom logs
- RDS: store error, slow query, or transaction logs
- Lambda: store lambda logs that contain execution details, error messages, and custom log statements
- Elastic Load Balancer (ELB): store ELB logs that contain client IP address, request time, and response status code

If want to go a step further, you can [connect Athena to dbt](https://docs.getdbt.com/docs/core/connect-data-platform/athena-setup) and learn how to write your own data transformations in SQL. dbt streamlines version control, deployment, and testing without having to run individual tools. However, we only recommend this setup if you're familiar with data modeling and developer tooling.

## Batch load logs for efficiency

You should batch load your logs into your data warehouse directly, or a storage option like S3, to avoid latency and resource consumption. Most cloud services offer a [batch service](https://docs.aws.amazon.com/batch/latest/userguide/review-job-logs.html) where you can schedule and queue jobs. _Note if you're paying for a database or log storage, double-check the price of batch loading first as some cloud services charge per batch upload._

## Use a database client library or connector for ingestion

Not having access to a connector tool is not an issue, but it may take more development work. Using an existing database client library or driver can help you ingest logs directly into storage / data warehouse at log time.

For example, [Postgres has drivers](https://wiki.postgresql.org/wiki/List_of_drivers), and [MySQL has connectors](https://www.mysql.com/products/connector/). Use one of these to hook into your database without having to reinvent the wheel.

## Make sure your logs include a timestamp, source, message, and log level

There are four areas we recommend to add to your log files to make log analysis smoother:

- Timestamps: It'll be easier to establish a sequence of events. Timestamps are especially important if you're using an analytics tool to create dashboards for performance monitoring, or auditing and compliance.
- Source: Like the service that created the log, but also which location/file/sub-service the logs are coming from. You can use the service field for troubleshooting, or just to gauge which resources are allocated to each service.
- Log message: Keep messages clear and concise so you can understand each event. Reuse keywords so it's easier to filter and find what you need during textual analysis.
- Log level: You can filter on levels like `ALERT` and `CRITICAL` to get to the bottom of which log requires immediate investigation and response.

## Additional best practices and ideas for log analysis

If you're aiming for real-time log analysis, or advanced or frequent log analysis, log-specific tooling tends to be a better fit. If your team is already using an ELK stack, a tool like [Grafana](https://grafana.com/) could fit the bill.

Here are a few additional resources you can use to make decisions when building out a small scale logging pipeline:

- [Learn about applying data science principles to logging](https://tersesystems.com/blog/2019/09/28/applying-data-science-to-logs-for-developer-observability/).
- [Guidance on which AWS database and services to use](https://aws.amazon.com/getting-started/decision-guides/databases-on-aws-how-to-choose/). [Google has docs available, too](https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained).
- [Learn about log storage strategies that can help you reduce cost and scale over time](https://www.kdnuggets.com/how-to-digest-15-billion-logs-per-day-and-keep-big-queries-within-1-second).
