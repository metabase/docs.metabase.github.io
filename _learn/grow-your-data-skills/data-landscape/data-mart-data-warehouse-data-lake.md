---
layout: learn_article
date: 2021-12-14
categories: Databases
author: The Metabase Team
redirect_from:
  - /learn/databases/data-mart-data-warehouse-data-lake
  - /learn/grow-your-data-skills/data-fundamentals/data-mart-data-warehouse-data-lake
---

The thing about these standard data warehouse terms is that they're not great. They're mushy marketing words with overloaded metaphors, so even experienced data people can have a hazy idea of what, exactly, they refer to. Sometimes they can refer to something specific, other times they can refer to something super abstract. We wrote this up because you'll probably hear these terms thrown around, and wanted to give you some context around each.

If you're looking for advice on what to use to store your analytical data, check out [Which data warehouse should you use?][data-warehouse].

## Data warehouse

A _data warehouse_ is just a structured place where you put the data you want to query. It could be a scalable database with columnar storage optimized for queries that touch a lot of data, or it could be a room with some file cabinets. The gist here is that the data warehouse is distinct from your production database, even if that data warehouse is just a replica of, say, your PostgreSQL production database. It’s a place intended to keep data for analysis, not the needs of your application or service. Data warehouses are also essentially read-only; the only thing that should be writing to your data warehouse are [ETLs][etl].

Ideally, though, you're going to want to organize your data in such a way that anticipates the kinds of questions you're going to ask. Meaning you'll want to take the [normalized data](/learn/grow-your-data-skills/data-fundamentals/normalization) optimized for your application's transactions, as well as all the data dumps from your third-party apps and services (think all that hard-won data from your customer relations management software), and ETL it into columns or tables that make it easy to answer questions like, how many customers signed up last month vs the previous, or which part of the onboarding funnel saw the biggest dropoff?

You’ll also hear people refer to data warehouses specifically as a particular type of database or cloud service that specializes in analytical query processing. Data warehouses like BigQuery, Redshift, Snowflake, and Vertica are designed for aggregating and filtering large amounts of data. The flipside is they're terrible for use as application databases, as they're not great for finding specific records (like returning one person's profile info when they log in).

## Data lake

_Data lakes_ are dumping grounds for all of your data from all of your sources (usually in an object storage service that is like a distributed file system–like AWS’s S3). This data isn't necessarily structured (you don't even need file cabinets here). The advantage of a data lake is that you don't have to determine up front the kinds of queries you want to run on the data. Data warehouses are great, but they can require a lot of work to set up, both in figuring out how you want to model your data, and then actually transforming your data from all your messy sources into that structure. With data lakes, you just sort of stand up tables with ETLs as you need them. You can use query engines like Presto that allow you to use SQL to query data spread out over a bunch of S3 buckets (essentially a distributed file system). Or you can train machine learning models on parts of your data lake.

Some cloud providers offer data lake products, like AWS's Data Lake, where the data lake "product" is a particular combination of services (the "infrastructure components") that together help you get data in and out of storage, in this case AWS's S3 (Simple Storage Service). Another approach, one used by BigQuery, is of federated data sources, where the "lake" isn't one place, but multiple places that BigQuery can query.

## Data mart

A data mart is essentially a set of dashboards that analyze data from a subset of a data warehouse or lake for a particular business function. That is, a data mart combines a part of a data warehouse or lake, curated for a team or an analytical domain, with the dashboards and visualizations that analyze that data. They're not something you can buy; they're something your org has to define and build.

Data marts are generally conceived of as a vertical slice of the [data stack][data-stack], where those slices correspond to different teams within the organization. So an example data mart for a marketing team in an enterprise would include all of the tables and models (and the summary tables that aggregate the facts and dimensions the team is interested in), the ETLs that build those tables, as well as the “human interface” to that curated data: the BI tool (like Metabase) with the charts and dashboards the marketing team has created (or traditionally that the data or engineering team had set up for them).

Data marts don't necessarily have to be that rigid, and they shouldn't be. If you want, you could put together a [collection](/docs/latest/exploration-and-organization/collections) of questions and dashboards in Metabase that covers everything the operations team is interested in and call that an operations data mart. You could also organize the data and its analysis by subject: here's everything we know about our customers, everything we know about our supply chain, our activation funnel, and so on. BI tools can also do neat stuff where you can build dashboards with filters that make it easy to dial in on specific products or categories or whatever.

Data marts as a concept have been around for a while, but you don't hear the term as often anymore. Traditionally, data mart development was done by a data or engineering team for other teams, which can be good or bad. Good if it makes sure the data is easy to work with, explore, and expand on; bad when it silos data and stunts curiosity by making it difficult to ask related questions or incorporate data from elsewhere. But the fundamental idea behind a data mart (that organizing data to make it easier for people to ask questions) is dear to how Metabase thinks about business intelligence. BI should be self-service, so good data mart design doesn't just give people a set of answers, it gives people the tools they need to answer those questions, slice and dice those answers, and ask their own questions.

## Further reading

- [Analytics with Metabase][analytics]
- [Which data warehouse should you use?][data-warehouse]
- [The modern data stack][data-stack]

[analytics]: /learn/grow-your-data-skills/analytics
[data-stack]: /blog/the-modern-data-stack
[data-warehouse]: /learn/grow-your-data-skills/data-landscape/which-data-warehouse
[etl]: /learn/analytics/etl-landscape
