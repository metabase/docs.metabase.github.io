---
title:  "Real-time data analytics with Metabase and CrateDB"
redirect_from:
  - /community_posts/real-time-data-analytics-with-metabase-and-cratedb
meta_description: In this tutorial, we’ll show you how to use Metabase with CrateDB to analyze massive amounts of data in real-time.
date:   2023-01-19 10:10:58
image: /images/community/real-time-analytics-cratedb.jpg
read_time: 4 minutes
category_filters: "Working with Metabase"
organization: Crate
organization_url: https://crate.io/
author: Matej Matkuliak
author_img: /images/community/matej-matkuliak.jpeg
author_bio: Matej is a Technical Writer at Crate, a distributed SQL database built on top of a cloud-native architecture. Matej mainly writes about the CrateDB Cloud, a fully managed database-as-a-service product.
---

You can use CrateDB and Metabase to get insights from various types of data including  time series, relational, geospatial, and structured/semi-structured data.
In this tutorial, we’ll show you how to use Metabase with CrateDB to analyze massive amounts of data in real-time.

## Getting started with CrateDB

CrateDB is an open-source, distributed SQL database for real-time data analytics. CrateDB offers easy integration with PostgreSQL compatible tools, horizontal scalability, availability, and the capability to store and analyze massive amounts of data.
To get started with CrateDB, set up a running cluster in [CrateDB Cloud](https://crate.io/products/cratedb-cloud){:target="_blank"}. Please check CrateDB’s [documentation](https://crate.io/docs/cloud/tutorials/en/latest/cluster-deployment/index.html){:target="_blank"} on building the cluster from scratch. Once the cluster is up and running, open the Admin UI:

![CrateDB cluster](/images/community/cratedb-1.png)

Now, let’s import some sample data. Return to the overview page and click on “Learn how to import data” link. This will open a list of statements you need to execute to load NYC taxi data:

![Importing sample data](/images/community/cratedb-2.png)

## Connecting CrateDB with Metabase

The first step will be adding your CrateDB cluster as a new database. Go to the `Admin Settings` -> `Setup`, and choose the `Add a database` option.

![Adding CrateDB cluster as a new database](/images/community/cratedb-3.png)

**Database configuration requires the following fields:**

- Database type (select PostgreSQL)
- Display name
- Host (the URI of your cluster)
- Database name
- Username
- Password

![Database configuration](/images/community/cratedb-4.png)

Finally, make sure you also select “Use a secure connection (SSL) option” (unless your cluster isn't configured for SSL).
After submitting your details, Metabase will sync with your CrateDB cluster for a few moments. When the sync completes, you will get a message saying, “Syncing complete”.

!["Syncing complete" message](/images/community/cratedb-5.png)

## Asking questions

Now you’re ready to visualize your data.

Open up Metabase and click on `New` -> `Question` in the upper right corner.  Then select the CrateDB database and one of the tables.
For example, we could ask about the **Average tip amount**, sorted by the passenger count.

![Metabase query builder](/images/community/cratedb-6.png)

Metabase then provides a visualization of the results.

![Metabase visualization](/images/community/cratedb-7.png)

When you save a question in Metabase, you will also be asked if you want to add it to a dashboard. Dashboards  provide an easy way to monitor your data.

![Metabase dashboard](/images/community/cratedb-8.png)

## Wrap up

If you’d like to see how the other questions were configured, feel free to check out our [video tutorial](https://www.youtube.com/watch?v=veuR_76njCo){:target="_blank"} on this topic, or, to CrateDB Cloud Console and get started.
