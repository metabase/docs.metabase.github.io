---
layout: learn_article
redirect_from:
  - /learn/administration/metabase-in-production
---

This article describes what a production-ready setup of Metabase looks like, including server sizing, best practices, and pitfalls to avoid. This article is for people who are interested in self-hosting Metabase. If you want us to run Metabase for you, just [sign up for a free trial](/pricing/).

## What's in the Metabase JAR

For context, Metabase is a web application. Its backend is written in Clojure, and its frontend is written in JavaScript, Typescript, and Clojurescript using the React framework.

By default, the entire application is self contained: the backend and the web server that serves the frontend are shipped in the same bundle. The bundle is a JAR file, which can be run anywhere a Java runtime environment is installed.

Metabase also ships a container image that packages up the JRE and Metabase JAR (which you can also run with Podman).

## A JAR and a database are all you need

![Metabase JAR running in a container, saving its application data in a Postgres database.](../../../images/metabase-in-production/metabase-and-app-db.png)

To run Metabase in production, you need two things:

1. Either a Metabase JAR or the container image.
2. A dedicated PostgreSQL database to store Metabase's application database

You can also use MySQL/MariaDB to store Metabase's application database, but we emphatically recommend Postgres.

## Why you need to use a separate application database

Metabase saves all its entities (dashboards, questions, accounts, configurations) in its application database.

> If you stick with the default, file-based application database, your database will eventually become irrevocably corrupted, and you'll have to start over from scratch (after losing all your work: all of your questions, dashboards, and so on)\*\*.

So the one thing you want to avoid doing is using the default application database that ships with the Metabase JAR. That embedded database is intended for local use only. We include that embedded database as a kind of party favor for people who just want to try out Metabase on their machine. That embedded H2 database also houses some sample data that people can play with. It's NOT meant for production.

Similarly, if you're running Metabase in a container, you'll lose your all of your work whenever your container is replaced with a new version. Containers are meant to be ephemeral, so don't keep your data inside them.

You can avoid all of these problems by using a [dedicated PostgreSQL application database](/docs/latest/installation-and-operation/configuring-application-database).

## If you've already started using the default H2 database

That's okay. But you should [migrate to a production database](/docs/latest/installation-and-operation/migrating-from-h2) as soon as possible.

## Metabase application and database servers and their sizing

We recommend that you run at least two instances (ideally on the same network):

- [One or more instance for the Metabase application](#metabase-application-server-size).
- [One database instance for the Postgres or MySQL Metabase application database](#metabase-application-database-server-size) where Metabase will store its application data. We recommend that the database instance not be used for any other purpose than the Metabase application database.

The reason you want to run these instances on the same network is to reduce the time it takes for Metabase (the application) to get a response from the database storing its application data. The vast majority of Metabase operations require a call to Metabase’s API, which uses the application database to retrieve information about questions, dashboard, table metadata, and so on.

### Metabase application server size

Metabase needs at least 1 core and 1GB of RAM as the baseline. On top of that, for every 20 concurrent people using your Metabase, Metabase will need 1 CPU and 2GB of RAM. These system recommendations apply whether you're running Metabase as a JAR or as a container image. As an example, if you have 40 concurrent users, you'll need a total of 3 CPU cores and 5GB of RAM.

NOTE: before v52 we recommended only 1GB of memory per 20 concurrent users, but we raised this requirement in newer versions to be on the safe side.

### Metabase application database server size

The application database is probably the most important component of the entire architecture: it's the single point of failure, and the faster the app db can return queries to the Metabase application server, the better.
As a starting point, allocate 1 CPU core and 2GB of RAM the server running your application database. As a general rule, for every 40 concurrent people using your Metabase, a PostgreSQL application database will need 1 CPU core and 1 GB of RAM.

## Each Metabase environment must have its own dedicated application database

By environment, we mean one or more Metabase jars (or container images), and one application database. If you're running multiple environments, you can run multiple application databases, one for each environment, on the same application database server, but each environment must have its own dedicated application database.

## Maintenance

Keeping things running smoothly.

- [Metabase server maintenance](#metabase-server-maintenance)
- [Metabase application database maintenance](#metabase-application-database-maintenance)
- [Data warehouse server maintenance](#data-warehouse-server-maintenance)

### Metabase server maintenance

You don't need to do anything. It should just work.

### Metabase application database maintenance

All databases require maintenance for optimal performance, and PostgreSQL and MySQL are no exception. Follow PostgreSQL's best practices for maintenance(https://www.postgresql.org/docs/current/maintenance.html) (especially backups:

- [Postgres](https://www.postgresql.org/docs/current/backup.html)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html)

This application database should be:

- Backed up on a daily basis.
- Vacuumed and analyzed on a weekly basis.

Additionally, cards and dashboards that are no longer needed should be periodically archived and deleted.

### Data warehouse server maintenance

Maintenance of your data warehouse depends on which data warehouse you're using. See the database's documentation for guidance.

## Example load test

On this simple [load test](https://github.com/paoliniluis/metabase-load-test-k6), the Metabase API clocked the following metrics on K6.

- <span style="color:#EF8C8C">Red</span>: Poor performance
- <span style="color:#88BF4D">Green</span>: Good performance

| **Metrics / Systems**                                                                                 | **2 Cores / 2GB RAM**                          | **3 Cores / 3GB RAM**                          | **4 Cores / 4GB RAM**                          | **8 Cores / 8GB RAM**                          | **16 Cores / 16GB RAM**                        |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| **Total Requests Processed**<br>_Total number of successful web requests handled_                     | <span style="color:#EF8C8C">278,303</span>     | <span style="color:#EF8C8C">303,420</span>     | <span style="color:#88BF4D">311,740</span>     | <span style="color:#88BF4D">311,350</span>     | <span style="color:#88BF4D">313,625</span>     |
| **Requests Per Second**<br>_How many requests the system can process every second (higher is better)_ | <span style="color:#EF8C8C">121.3 req/s</span> | <span style="color:#EF8C8C">132.0 req/s</span> | <span style="color:#88BF4D">136.2 req/s</span> | <span style="color:#88BF4D">135.8 req/s</span> | <span style="color:#88BF4D">136.1 req/s</span> |
| **Avg Response Time**<br>_How long, on average, it takes to get a response (lower is better)_         | <span style="color:#EF8C8C">78.59ms</span>     | <span style="color:#EF8C8C">38.89ms</span>     | <span style="color:#88BF4D">26.82ms</span>     | <span style="color:#88BF4D">27.45ms</span>     | <span style="color:#88BF4D">24.46ms</span>     |
| **Slowest 10% (p90)**<br>_The slowest 10% of requests took at least this long_                        | <span style="color:#EF8C8C">204.97ms</span>    | <span style="color:#EF8C8C">88.58ms</span>     | <span style="color:#88BF4D">66.00ms</span>     | <span style="color:#88BF4D">66.73ms</span>     | <span style="color:#88BF4D">65.78ms</span>     |
| **Slowest 5% (p95)**<br>_The slowest 5% of requests took even longer than this_                       | <span style="color:#EF8C8C">389.85ms</span>    | <span style="color:#EF8C8C">118.88ms</span>    | <span style="color:#88BF4D">81.79ms</span>     | <span style="color:#88BF4D">83.01ms</span>     | <span style="color:#88BF4D">76.72ms</span>     |
| **Time to Receive Data**<br>_Time to receive data after sending a request_                            | <span style="color:#EF8C8C">6.16ms</span>      | <span style="color:#EF8C8C">2.54ms</span>      | <span style="color:#88BF4D">1.56ms</span>      | <span style="color:#88BF4D">1.52ms</span>      | <span style="color:#88BF4D">1.62ms</span>      |
| **Time to Send Data**<br>_The time spent sending a request to the server (usually very fast)_         | <span style="color:#EF8C8C">16.74µs</span>     | <span style="color:#EF8C8C">17.46µs</span>     | <span style="color:#88BF4D">15.07µs</span>     | <span style="color:#88BF4D">16.04µs</span>     | <span style="color:#88BF4D">17.79µs</span>     |
| **Time Waiting for Response**<br>_The delay between sending a request and getting a response_         | <span style="color:#EF8C8C">72.41ms</span>     | <span style="color:#EF8C8C">36.32ms</span>     | <span style="color:#88BF4D">25.24ms</span>     | <span style="color:#88BF4D">25.90ms</span>     | <span style="color:#88BF4D">22.82ms</span>     |
| **Test Duration per Iteration**<br>_The total time for one test iteration to complete_                | <span style="color:#EF8C8C">30.92s</span>      | <span style="color:#EF8C8C">28.36s</span>      | <span style="color:#88BF4D">27.57s</span>      | <span style="color:#88BF4D">27.62s</span>      | <span style="color:#88BF4D">27.42s</span>      |
| **Total Iterations**<br>_Number of times the test was fully completed_                                | <span style="color:#EF8C8C">4,273</span>       | <span style="color:#EF8C8C">4,666</span>       | <span style="color:#88BF4D">4,796</span>       | <span style="color:#88BF4D">4,790</span>       | <span style="color:#88BF4D">4,825</span>       |
| **Total Data Received**<br>_How much data was downloaded during the test_                             | <span style="color:#EF8C8C">16GB</span>        | <span style="color:#EF8C8C">17GB</span>        | <span style="color:#88BF4D">17GB</span>        | <span style="color:#88BF4D">17GB</span>        | <span style="color:#88BF4D">17GB</span>        |
| **Total Data Sent**<br>_How much data was uploaded during the test_                                   | <span style="color:#EF8C8C">103MB</span>       | <span style="color:#EF8C8C">112MB</span>       | <span style="color:#88BF4D">115MB</span>       | <span style="color:#88BF4D">115MB</span>       | <span style="color:#88BF4D">116MB</span>       |

Some context on the load test:

- This load test ran with Metabase v53.5 on a laptop with (Ryzen 7840HS) changing the assigned CPU cores and RAM to the Metabase container and setting the highest power profile.
- To leave some space for the non-heap memory, we configured Metabase with the environment variable `JAVA_TOOL_OPTIONS: -Xmx<80% of total RAM>m`.
- The application database was Postgres version 17 with 2 cores and 8GB of RAM.
- No HTTPS.
- We performed this specific load test with fewer resources than what we recommend (for 100 concurrent users, we would recommend 6 cores and 11GB of RAM). We used fewer resources on purpose to show that the app can withstand traffic spikes without significantly degrading performance when it has enough cores and memory available.
- Although this load test checked several API endpoints, it _didn't_ test for CPU/memory intensive operations like X-Rays, or asynchronous operations like subscriptions, alerts, database syncs or database scans/fingerprinting.

Load tests, however, can't mimic real-life usage. People's activity in your Metabase will generate different a variety of API call patterns. You'll also have asynchronous processes running in the background. If Metabase lacks sufficient CPU resources, it'll queue operations and start consuming more memory. If the queue overflows, Metabase may crash trying to deal with all the requests. In which case, you'll need to allocate more cores and more memory.

## Async processes

Metabase will run asynchronous processes periodically that will use CPU and RAM depending on the amount of tables and amount of columns on your tables.

These processes are:

- sync
- scan
- fingerprinting
- field values
- model caching
- question metadata

If you see Metabase using a lot of CPU on a certain period of time, check the logs to see if Metabase is running any of these processes. If so, you can schedule these tasks to run whenever people aren't using your Metabase.

Metabase will assign each of these tasks to a single core. If your server has four cores, the maximum number of async processes that Metabase will run is three, as one core should be available for serving people's requests (one core should be able to serve requests to ~10 people using Metabase concurrently).

## Observability and some metrics to monitor

Metabase exposes a [metrics endpoint that can be scraped by Prometheus](/docs/latest/installation-and-operation/observability-with-prometheus). Ideally you have some alarms set up so you can take action if any of these numbers cross one of these thresholds.

### Metabase application

- API Response time
- CPU: 80%-90% max
- RAM: 80% max

### Metabase application database

- CPU: 90% max
- RAM: 80% max
- Disk usage: 80% max.
- Disk IOPS: Check your disk's IOPS support. If the disk you're using to run your app db exceeds the IOPS the disk claims to support, then your disk will queue operations, which will affect performance.

### When to increase the connection pool size

By default, Metabase's connection pool size is limited to 15 connections. Metabase will manage one pool per connected database, including one pool for the application database, with each pool limited to 15 connections.

To handle more people using your Metabase concurrently, you can override the connection limit to the application database with the `MB_APPLICATION_DB_MAX_CONNECTION_POOL_SIZE` environment variable. If you increase this limit, you may need to give your application database more RAM, so you should monitor your app db's RAM usage. If the database lacks free RAM, the database will queue connections, which means that some people will find Metabase unresponsive while it waits for RAM to free up.

Metabase only uses the connections it needs at any given time. But some requests can tie up many of these connections. For example, if someone loads a dashboard with 20 cards on it, Metabase will use its 15 available connections to retrieve results, and load the remaining five cards as connections become available.

## Using a load balancer

![A Metabase setup with a load balancer.](../../../images/metabase-in-production/metabase-with-load-balancer.png)

A good architectural practice is to use a load balancer on top of Metabase, even if you only have one server running, and you’re not doing any horizontal scaling. Deploying a load balancer later can be trickier to implement, and the load balancer can also perform TLS termination (a.k.a. encrypting and decrypting HTTP traffic), WAF (web application firewall), redirections, and other common tasks.

See [Straightforward load balancing](./metabase-at-scale#straightforward-load-balancing).

## Logs

Metabase generates application logs that you should keep. These logs are useful for debugging and for auditing. Check out our docs on [log configuration](/docs/latest/configuring-metabase/log-configuration).

If you've also deployed a load balancer, or reverse proxy, on top of Metabase, we recommend you save those logs to a log aggregator. These logs will help you identify patterns and conduct investigations if needed.

## Metabase over HTTPS

You can [serve Metabase over HTTPS](/docs/latest/configuring-metabase/customizing-jetty-webserver#using-https-with-metabase) without using a load balancer or a reverse proxy.

Just note that if you use the same server to run both Metabase and the TLS termination (a.k.a. HTTPS), Metabase will lose valuable CPU resources that are spent on encrypting/decrypting traffic. So you may want to [use a load balancer](#using-a-load-balancer).

## Pitfalls to avoid

Learn from the trials of others.

### We recommend that you avoid services that claim to scale automagically

Based on our experience, many services that claim that scale to automagically are, well, not magical. We instead recommend that you put some observability metrics in place, monitor them, and make the scaling changes you need to make based on those observations, as your Metabase usage will grow as your company grows.

### Avoid services that shut down servers when they're not in use

If you must go with a auto-scaling service, avoid any service that periodically turns off servers when they're not in use.

The reason is twofold:

1. **Async processes**. Metabase runs some async processes, for example to get metadata for your tables, or refresh models, or get filter values. If these processes can't run, people won't see many of the features that Metabase offers.
2. **Startup time** The first people to log into your application the next will suffer a massive performance penalty, as the server will have to spin up from a complete cold start.

### Issues with running on other cloud providers

Just something to be aware of: many cloud service providers will host you on shared infrastructure. In this case, tenants share access to CPUs. Multi-tenant servers can be cheaper to rent, and they can offer decent performance, provided your CPU usage stays under 100%. If your Metabase server uses 100% of CPU for a certain amount of time, the provider may throttle the performance of your assigned CPUs, and your performance will significantly degrade. The same throttling can happens with disk IOPS in shared infrastructure.

## Upgrading to a new major version of Metabase

Normally, we don't make any changes to the schema of the application database across minor versions (e.g., 1.51.1 to 1.51.2), so you can upgrade and downgrade between minor version without issues.

When upgrading to a major version, (e.g., 1.50.9 to 1.51.3), you should expect some downtime, as Metabase may need to handle schema changes to the application database. How long the schema changes will take depends on the size of your application database.
