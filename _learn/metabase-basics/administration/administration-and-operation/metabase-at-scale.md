---
layout: learn_article
date: 2020-08-06 00:15:58
categories: jekyll update
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/administration/metabase-at-scale
  - /learn/data-diet/analytics/metabase-at-scale
---

Metabase is scalable, battle-hardened software used by tens of thousands of companies to deliver high quality, self-service analytics. It supports high availability via horizontal scaling, and it's efficient out of the box: a single core machine with 4 Gbyte of RAM can scale Metabase to hundreds of users.

![A single Metabase instance connected to multiple databases, as well as to its application database, which stores questions, dashboards, and other data specific to Metabase. You can easily add more Metabase instances as you grow.](../../../images/scaling-metabase/metabase-setup-diagram.png)

This article provides high-level guidance and best practices on how to keep Metabase running smoothly in production as the numbers of users and data sources increase. Each data system is different, so we can only discuss scaling strategies at a high level, but you should be able to translate these strategies to your particular environment and usage.

## Factors that impact Metabase performance and availability

Metabase scales well both vertically and horizontally, but it is only one component of your data warehouse, and the overall performance of your system will depend on the composition of your system and your usage patterns. Major factors that impact your experience using Metabase include:

- The number of databases connected to Metabase.
- The number of tables in each database.
- The efficiency of your data warehouse.
- The number of questions in your dashboards.

For example, it won't matter how many instances of Metabase you run if a question needs to run a query that your database(s) takes 30 minutes to complete: that's just going to take 30 minutes. The solution is to re-evaluate your need for that data (do you really need all that info every time?) or to find ways to improve the performance of your database, such as reorganizing, indexing, or caching your data.

The number of databases and tables can also affect client performance, but only in large-scale situations where you're managing hundreds of databases and/or thousands of tables, as the metadata itself can be a lot to query. To help keep performance smooth even at this scale, you can [manage when Metabase syncs its metadata](#sync-with-your-databases-only-when-you-need-to) with your connected databases.

Now let's make sure your Metabase application is well-tuned to scale.

## Vertical scaling

Vertical scaling is the brute force approach. Give Metabase more cores and memory, and it will have more resources available to do its work. If you are experiencing performance issues related to the application itself (i.e., unrelated to the breadth and magnitude of your databases), running Metabase on a more powerful machine can improve performance.

### For every 20 concurrent users, figure roughly need 1 CPU core and 1GB of RAM

Metabase is already efficient out of the box. To start, a single-core machine with 2 gigabytes of RAM should be more than enough for solo users or small teams.

When to add more memory and cores: If you see that your server is consistently using more than 80% of its current resources (memory or compute).

The Metabase application database should respond in less than one second for any operation (not counting the response time for the data warehouse your Metabase is connected to).

Machines with 4-8 Gigabytes should handle hundreds of users, and you can bump the number of cores and gigabytes of memory if needed.

While adding more cores and memory can be effective, you're generally better off using horizontal scaling to support more users. The reason is because there are database connectivity limits built into each Metabase instance to prevent the instance from overwhelming your data warehouse with requests. You can [increase the number of connections](#increase-the-maximum-number-of-connections-to-each-database) available for your instance, but we still recommend multiple instances.

## Horizontal scaling (preferred)

Instead of increasing the size of the server running Metabase, horizontal scaling involves spinning up more servers, each running Metabase, which you connect to the same application database. This way you can run multiple instances of Metabase in combination with a load balancer to direct traffic to the instances. Metabase is set up for horizontal scaling out of the box, so you don't need any special configuration to run multiple instances of Metabase. When a Metabase server connects to an existing application database, it will recognize itself as a part of a cluster.

The primary use case for horizontal scaling is to improve reliability (a.k.a. "high availability"), but horizontal scaling can also improve multi-user performance. When the load is balanced, a high-traffic, CPU-bound Metabase instance will perform better (faster) when some of its traffic is directed to other instances, as the CPU load will be distributed across multiple machines.

Metabase ships with a local [H2 database][h2] to store your application data (all of your questions, dashboards, logs, and other Metabase data), but when running in production you should upgrade to a relational database like [PostgreSQL][postgresql] running on a separate server. In fact, when scaling horizontally, you must use a relational database that runs on a separate server to store your application data. That way, all instances of Metabase can share a common database. We recommend an external database on a separate server for all production instances, even if you only ever run one instance of Metabase, so an external database is not an added cost for horizontal scaling.

Metabase uses the external [application database](/glossary/application-database) to store user session data, so people don't have to worry about losing saved work if one or all Metabase instances go down, and administrators don't have to deal with configuring sticky sessions to ensure people are connected to the right Metabase instance. The load balancer will route people to an available instance so they can keep right on working.

### Taking advantage of time-based horizontal scaling

Some customers adjust the number of Metabase instances based on the time of day. For example, some companies will spin up multiple instances of Metabase in the morning to handle a burst of traffic when people log in and run their morning dashboards, then spin down those instances in the afternoon (or at night, or on the weekends) to save money on cloud spend.

For environments like [Kubernetes][kubernetes] or [Google Cloud Platform][google-cloud], you'll need to refer to each system's respective documentation to set up similar autoscaling rules.

### Straightforward load balancing

Load balancers direct traffic to multiple Metabase instances to ensure that each request gets the fastest response. If one instance of Metabase goes down temporarily, the load balancer will route requests to another available instance.

Setting up a load balancer with Metabase is simple. Metabase's [API](/docs/latest/api) exposes a health check endpoint, `/api/health`, that load balancers can call to determine whether a Metabase instance is up and responding to requests. If the instance is healthy, the endpoint will return an HTTP status code `200 OK`. Otherwise, the load balancer will know to route the request to another instance.

## Data warehouse tuning

Architecting a data warehouse is beyond the scope of this article, but you should know that your queries in Metabase will only be as fast as your databases can return data. If you have questions that ask for a lot of data that takes your database a long time to retrieve, those query times will impact your experience, regardless of how fast Metabase is.

Here are some ways you can improve data warehouse performance:

- **Structure your data in a way that anticipates the questions people will ask.** Identify your usage patterns and store your data in a way that make its easy to return results for questions common in your organization. Compose ETLs to create new tables that bring together frequently queried data from multiple sources.
- **Tune your databases.** Read up on the documentation for your databases to learn how to improve their performance via indexing, caching, and other optimizations.
- **Filter your data**. Encourage people to filter data when asking questions. They should also take advantage of Metabase's data exploration tools (including record previews) so they only query data relevant to the question they're trying to answer.
- **Decide whether to use a database or a data warehouse.** Folks often get started with Metabase using a transactional database like [MySQL][mysql] or [PostgreSQL][postgresql]. While these databases scale quite well, they often aren't optimized for the type of analytical queries that Metabase will use. Operations like `sum` or `max` can slow down once you reach a certain scale. As analytics adoption grows, you may find the need to explore dedicated data warehouses like [Amazon Redshift][redshift], [Google BigQuery][google-bigquery], or [Snowflake][snowflake].

## Metabase application best practices

Here are some strategies to get the most out of your Metabase application:

- [Only ask for the data you need](#only-ask-for-the-data-you-need).
- [Use a managed relational database to store your Metabase application data](#use-a-managed-relational-database-to-store-your-metabase-application-data).
- [Cache your queries](#cache-your-queries).
- [Look for bottlenecks](#look-for-bottlenecks).
- [Increase the maximum number of connections to the app db](#increase-the-maximum-number-of-connections-to-the-app-db).
- [Increase the maximum number of connection to each database](#increase-the-maximum-number-of-connections-to-each-database).
- [Sync with your databases only when you need to](#sync-with-your-databases-only-when-you-need-to).
- [Upgrade to the latest version of Metabase](#upgrade-to-the-latest-version-of-metabase).
- [Keep your browser up to date](#keep-your-browser-up-to-date).

### Only ask for the data you need

If people are running a lot of queries that return a lot of records, it won't matter that Metabase is fast: the users will get their data only as fast as your data warehouse can return the requested records. And sometimes people go overboard with dashboards: when a dashboard with (for example) 50 questions loads, it sends 50 simultaneous requests asking for data. Depending on the size of that database, it can be quite some time before those records return.

![Example dashboard with filter widgets using data from the Sample Database included with Metabase.](../../../images/scaling-metabase/example-dashboard.png)

But that's not the whole story. Metabase doesn't slow down simply because you put more questions in your dashboard. If your questions don't pull a lot of data, or your data warehouse can return results in under a second, 50 questions will load quickly.

In general, however, encourage people to keep their dashboards focused. Dashboards are meant to tell a story about your data, and you can tell a good story with just a handful of questions (or even a single question). Take advantage of Metabase's data exploration tools to learn about your data (such as the ability to preview records in tables) so you can dial in on only the records you need to answer your questions.

So make sure each question is necessary to complete the dashboard, and be especially mindful when querying data across time or space, as you can filter out a lot of unnecessary data by restricting your question to a shorter timespan or a smaller area.

![Example question using a pin map to visualize latitude and longitude. Geospatial data can add up quickly, slowing query times, so it](../../../images/scaling-metabase/example-question-with-map.png)

### Use a managed relational database to store your Metabase application data

The application database stores all of your questions, dashboards, collections, permissions, and other data related to the Metabase application. You can use an relational database (like PostgreSQL or MySQL) to manage your application database, but we recommend a managed solution like [AWS RDS][amazon-rds]. RDS will automate backups and make it easy for you to adjust storage and compute as you scale, giving you one less thing to worry about.

### Cache your queries

You can [configure caching][configure-caching] to store the results of recently asked questions so that they don't need to be recalculated. Metabase will show people the timestamp for the results, and they can manually refresh the results of the question if they want to rerun the query. Caching is suitable for results that do not update frequently.

![Enable caching to store question results](../../../images/scaling-metabase/caching-ui.png)

### Look for bottlenecks

[Pro and Enterprise plans](/pricing/) offer [Usage Analytics][metabase-analytics] for you to monitor the usage and performance of your application. You can, for example, see how many questions are being asked, by whom, and how long the questions took to run, which can help identify any bottlenecks that need attention.

![Usage analytics](../../../images/scaling-metabase/metabase-analytics.png)

### Increase the maximum number of connections to the app db

The default number of connections to the Metabase application database is specified by the [`MB_APPLICATION_DB_MAX_CONNECTION_POOL_SIZE`][db-max-connections] environment variable, which is currently set to 15 by default. If your usage regularly consumes all of those connections, you can improve performance by increasing the maximum number of connections. Alternatively, you can increase the number of connections via horizontal scaling (e.g., if you add an additional Metabase instance, you effectively add an additional 15 connections to the application database).

You can check the number of connections by [viewing the logs][viewing-logs], and checking for lines like `... App DB connections: 12/15`. In that example, Metabase is using 12 out of the 15 available application database connections.

### Increase the maximum number of connections to each database

Similarly, the default maximum number of connections for a single Metabase instance to each database is 15. That's 15 for each database, so if you've connected Metabase to two databases, you'll have a maximum of 30 connections.

You can increase the maximum number of connections to each database by changing the [`MB_JDBC_DATA_WAREHOUSE_MAX_CONNECTION_POOL_SIZE`][setting-pool-size] environment variable. As above with the application database connections, you can also increase the number of connections via horizontal scaling. Each additional Metabase instance would increase the maximum number of connections by 15 (or by whatever maximum you've set). To learn more, see our [documentation on environment variables][env-var].

### Sync with your databases only when you need to

By default, Metabase performs a lightweight sync every hour. The sync does not copy any of your data. Metabase merely checks to make sure the list of tables, columns, and rows it maintains in its application database is up to date with the tables, columns, and rows in your databases.

You can [set the timing and frequency of these synchronizations][controlling-sync-scan]. For large databases, you might consider limiting the number of times Metabase performs the sync, and restricting those synchronizations to off-peak hours, especially if you aren't frequently adding new tables to your database.

![You can change when Metabase syncs with your databases, which can improve performance when you](../../../images/scaling-metabase/sync-settings.png)

### Upgrade to the latest version of Metabase

If you haven't already, we recommend you [upgrade to the latest Metabase version][upgrading-metabase] to get the most recent performance improvements.

### Serve Metabase via HTTPS over HTTP/2

Serving your Metabase instance via HTTPS over HTTP/2 can increase performance, since browsers on HTTP/1.1 can limit connections to approximately 6 concurrent connections per domain, whereas HTTP/2 is multiplexed on a single connection. More available connections won't fix a slow database, or an overloaded Metabase instance that has run out of threads, but you'll at least know that your browser isn't throttling your connections.

### Keep your browser up to date

Metabase is a web application, and can benefit from the latest and greatest versions of browsers like [Firefox][firefox], [Chrome][chrome], [Edge][edge], and [Safari][safari].

## Supported deployments

There are many ways to set up Metabase; some of our favorites include:

- AWS Elastic Beanstalk: Check out our [guide to setting up Metabase on Elastic Beanstalk][running-on-elastic-beanstalk]. We use Elastic Beanstalk to host our internal Metabase application.
- Docker: See [running Metabase on Docker][running-on-docker].

[Google Cloud Platform][google-cloud], [Microsoft Azure][azue], [Digital Ocean][digital-ocean], and other cloud providers offer other great alternatives for hosting your Metabase application.

## Hosted Metabase

If you don't want to deal with the care and feeding of a Metabase application, Metabase offers a [hosted solution][hosted-metabase]. You still have to ensure your data sources are performant, but you no longer have to manage running the Metabase application.

## Getting help

If you still have questions, chances are someone's already had the same question. Check out the [Metabase discussion forum][forum] and search for your issue. If you can't find a solution, submit a question of your own.

[amazon-rds]: https://aws.amazon.com/rds/
[metabase-analytics]: /docs/latest/usage-and-performance-tools/usage-analytics
[azue]: https://azure.microsoft.com/en-us/
[chrome]: https://www.google.com/chrome/
[configure-caching]: /docs/latest/administration-guide/14-caching
[controlling-sync-scan]: /docs/latest/databases/sync-scan#choose-when-metabase-syncs-and-scans
[digital-ocean]: https://www.digitalocean.com/
[db-max-connections]: /docs/latest/configuring-metabase/environment-variables#mb_application_db_max_connection_pool_size
[edge]: https://www.microsoft.com/en-us/edge
[env-var]: /docs/latest/operations-guide/environment-variables
[firefox]: https://www.mozilla.org/en-US/firefox/
[forum]: https://discourse.metabase.com/
[google-bigquery]: https://cloud.google.com/bigquery
[google-cloud]: https://cloud.google.com/
[h2]: http://www.h2database.com/html/main.html
[hosted-metabase]: /cloud/
[kubernetes]: https://kubernetes.io/
[mysql]: https://www.mysql.com/
[postgresql]: https://www.postgresql.org/
[redshift]: https://aws.amazon.com/redshift/
[running-on-docker]: /docs/latest/installation-and-operation/running-metabase-on-docker
[running-on-elastic-beanstalk]: /docs/latest/operations-guide/running-metabase-on-elastic-beanstalk
[safari]: https://www.apple.com/safari/
[setting-pool-size]: /docs/latest/configuring-metabase/environment-variables#mb_jdbc_data_warehouse_max_connection_pool_size
[snowflake]: https://www.snowflake.com/
[upgrading-metabase]: /docs/latest/operations-guide/upgrading-metabase
[viewing-logs]: /docs/latest/troubleshooting-guide/
