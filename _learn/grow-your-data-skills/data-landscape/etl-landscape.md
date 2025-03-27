---
layout: learn_article
date: 2021-10-22 10:10:58
categories: Analytics
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/analytics/etl-landscape
  - /learn/grow-your-data-skills/analytics/etl-landscape
---

We're going to talk broadly about how to go about getting all the data that you collect into a position where you can make use of it. The idea here is to give you some vocabulary and a basic lay of the land around what even is this ELT-alphabet soup.

Specifically, we're going to talk about extracting, transforming, and loading data. As your organization grows, you're going to add more data sources, and while you can analyze these data silos in isolation (like reporting revenue), eventually you're going to want to consolidate that data and put it in a place where you can make decisions based on it.

We'll start with a problem, _how to get your data into structures that make it easy to ask questions about that data (ETL)_, then talk about _how to make use of the answers you get (reverse ETL)_, and we'll dig into the tooling involved along the way.

## Extract, Transform, Load

First, a detour to define terms and distinguish ELT from ETL. In the large, these terms refer to the prepping of data for analysis in a data warehouse or data mart, but specifically these letters stand for:

- **Extract**: Get data from your application and other services you use.
- **Transform**: Clean, filter, format, aggregate, combine, enrich, and in general organize that data to make it easier to create models in your database (like modeling a customer).
- **Load**: Store that data in a data warehouse (or in the case of reverse ETL, push it to third-party services).

### ETL vs ELT

To complicate things, when people say ETL, they usually mean either ETL or ELT, or both. These initialisms (you say each letter; it's E.T.L., not "ettle") refer to the general process of getting data from a source, doing something to it, and storing it somewhere so people can query it. The key difference between ETL and ELT is that with ETLs the data transformation step takes place _outside_ of the data warehouse.

Historically, you would use a single tool, like [Informatica][informatica], to extract, transform, and load data into your data warehouse, but as the world moves toward the ELT paradigm, you'll see more tools specialized for each part of the process.

**Typical ETL pipeline:**

Data sources -> Distributed processing software like [Hadoop][hadoop], [Spark][spark], or Informatica -> Data warehouse like [Redshift][redshift], [BigQuery][bigquery], or [Snowflake][snowflake].

Hadoop, Spark, or Informatica jobs running on server clusters clean up the data, enrich it, aggregate it, and otherwise organize the data before loading it into the data warehouse.

**Typical ELT pipeline:**

Data sources -> Extraction tool like [Fivetran][fivetran] -> Data warehouse (Redshift, BigQuery, Snowflake) -> Transformation jobs defined and scheduled by software like [DBT][dbt] in your data warehouse.

As data warehousing improved, more and more people simply extracted the data and loaded that raw, untransformed data into a data warehouse. Once in the data warehouse, they would transform it, organizing that raw data into tables that are easier to analyze: for example, fact tables that gather records, and summary tables that gather aggregations.

In general, the world is moving toward the ELT approach, and mainly for three reasons:

- Data warehousing has improved; they can now handle computational work traditionally done by Hadoop clusters and the like.
- You can also keep the raw data stored in your data warehouse, which allows you to do different transformations in the future to answer new questions about your data.
- Data warehousing has also gotten much cheaper (which is nice).

### When to prefer ETL

That said, there are still good use cases for ETLs (Metabase, the company, uses both approaches). ETLs are a good choice when you:

- You have particularly complicated data transformations (sometimes called transforms),
- Or you want to run machine learning on the data before loading it into a data warehouse,
- Or you need to change the format of the data to meet the database's specifications.

## Example data flow from ETL to reverse ETL

Let's keep it simple and say you're collecting data from only three sources:

- Your application,
- A payment platform like [Stripe][stripe],
- A help ticket platform like [Zendesk][zendesk].

Now, let's say you want to know _how customer support affects retention_. To analyze this effect, you'll need to review subscription data from Stripe, and compare it with support data from Zendesk.

## Extracting data

Though you _can_ roll your own tools for extracting data, typically you're going to want to use a service that handles that complexity for you (like keeping up with each API, scheduling jobs, dealing with errors, and so on).

When evaluating extraction tools, you'll want to look for options that:

- **Have all the connectors you need**. And once you go with a tool, make sure to consider their library of connectors when evaluating other related tools. E.g., if you go with Fivetran, and then later on find yourself shopping for an email marketing platform, consider going with a platform that Fivetran supports.
- **Can incrementally extract the data** (as opposed to simple batch processing). You likely don't need real-time data, but you may want to get updates in minutes rather than once a day.
- **Don't change the data**, or at least not significantly. You should be the one transforming your data, not the extraction service.

There are a lot of options in this space: [Airbyte][airbyte], [Peliqan][peliqan], [Fivetran][fivetran], [Segment][segment], [Singer][singer], and [Stitch][stitch].

## Loading data into a data warehouse

Loading in this context just means that you're putting the data into storage (sometimes called a sink). This data store could be a standard transactional database like PostgreSQL or MySQL, a simple file system like S3 paired with a query engine like [Presto][presto], or a data warehouse optimized for analytical queries like BigQuery, Redshift, or Snowflake.

An overview of data warehousing is outside the scope of this article, so we'll just refer you to [Which data warehouse should you use?][data-warehouse]. For this article, you can just think of your data warehouse more generally (and ideally) and as your source of truth.

## Transforming data

There are many different ways to clean up, filter, format, enrich, or otherwise transform your data, including combining it with other data. You may also roll up data, for example to determine start and stop times of a process to calculate its duration.

In an ELT world, you're going to want a tool that works with your data warehouse to take raw data, transform it, then insert that transformed data into other tables in your data warehouse. That way you'll retain both the raw data that was extracted from various sources, as well as this cleaned-up, ready-for-modeling-and-analysis data, all in one data warehouse.

When evaluating tools for transforming data, you'll want software that:

- **Speaks SQL as its primary language**. Sticking to a single language is just easier, and most databases understand SQL.
- **Allows you to version that SQL**. If you change a query and the data looks incorrect, you're going to want to roll back to a previous version of that query to find out where things went wrong.
- **Can test your code**, e.g., to confirm all of your IDs in the output are unique.
- **Allows you to document these jobs**, ideally capturing field data and lineage (so you know where the data comes from).

Good tools in this space are [DBT][dbt] and [Dataform][dataform].

## Now that you have an insight into your data, how do you make use of it?

Back to our example of finding out if customer support improves retention. Let's say you learn that closing out support tickets in the last ninety days of a customer's annual subscription can improve retention by a significant percentage. What you'd want to do then is flag help tickets in Zendesk submitted by customers who are nearing the end of the annual subscription, as well as maybe reach out to them as their renewal date approaches to see if you could help them make the most of your service.

There are several ways you could plug this insight into your help ticket system:

- You could manually run a report to see which companies are up for renewal, add a column in Zendesk that shows whether the customer is `UP_FOR_RENEWAL`, and prioritize those tickets.
- Build a custom tool to run every night, and then update the column in Zendesk using its API.
- Use a tool like Zapier to coordinate data between Stripe and Zendesk.
- Use a tool like Census to push this data point from your data warehouse to the relevant app (in this case, Zendesk).

## Reverse ETL, or data operationalization

Tools that push data to in-house or third-party tools take one of two fundamental approaches. They either automate workflows by listening for events in applications, and update other applications to keep them in sync, or they push data from a single source of truth to the relevant applications.

We're going to strongly recommend the single-source-of-truth approach, as it drastically reduces the complexity of keeping your applications up to date with the data they need. Whereas a tool like [Zapier][zapier] will have to work to keep your various applications in sync, a tool like [Census][census] simply reads from your data warehouse at regular intervals, and pushes updates to where they're needed.

The big idea here is that data at rest is easier to maintain than data you have to coordinate. And as your organization grows, you'll use more services, which will require more coordination. The single-source-of-truth approach that Census takes sidesteps that coordination challenge and comes out way ahead when you're trying to deal with complex logic.

Let's say you learn that the retention effect is strongest when companies are within the ninety day window, _and_ they are paying you above X amount annually, _and_ they're in one of three geographic regions, _and_ they've submitted X number of tickets over the last year, and so on. With Zapier, you'd have to coordinate with other apps to synchronize the data needed to filter for the customers you want your Customer Success team to prioritize. With Census (which can run DBT jobs to calculate data points), you need only query the data warehouse, and push the results of that query to the help ticket software. Same goes if you want to plug a bunch of data into something like a [Tensor Flow][tensor] classifier, and have it just spit out which customers the classifier thinks you should prioritize.

In this sense, the term "Reverse ETL" is a bit of misnomer, as Census isn't transforming data; it's simply reading from the data warehouse, and telling other application what they need to know; in this case, which customers your success team should prioritize.

Check out [Census][census], [Hightouch][hightouch], and [Zapier][zapier].

## Further reading

For an overview of how data flows through an org, check out our article on the [Modern Data Stack][stack].

[airbyte]: https://www.airbyte.io
[peliqan]: https://peliqan.io/
[bigquery]: https://cloud.google.com/bigquery
[census]: https://www.getcensus.com/
[dataform]: https://www.dataform.co
[data-warehouse]: /learn/grow-your-data-skills/data-landscape/which-data-warehouse
[dbt]: https://www.getdbt.com/
[fivetran]: https://fivetran.com/
[hadoop]: https://hadoop.apache.org/
[hightouch]: https://www.hightouch.io
[informatica]: https://www.informatica.com/
[redshift]: https://aws.amazon.com/redshift/
[presto]: https://prestodb.io/
[segment]: https://www.segment.com
[singer]: https://www.singer.io
[snowflake]: https://www.snowflake.com/
[spark]: https://spark.apache.org/
[stack]: /blog/the-modern-data-stack
[stripe]: https://stripe.com/
[stitch]: https://www.stitchdata.com
[tensor]: https://www.tensorflow.org/
[zapier]: https://www.zapier.com
[zendesk]: https://www.zendesk.com/
