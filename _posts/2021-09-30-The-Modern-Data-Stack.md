---
title: The Modern Data Stack (updated for 2021)
permalink: /blog/the-modern-data-stack
summary: "The Modern Data Stack (MDS) consists of a flexible set of technologies that help businesses store, manage, and learn from their data."
date: 2021-09-30 10:30:33
last_updated_at: 2021-09-30 10:30:33
categories: "Analytics and BI"
author: The Metabase Team
image: /images/posts/the-modern-data-stack-(updated-for-2021).jpg
layout: post
---

Cloud, open-source, and SaaS business models have transformed the software industry and the way that companies think about and build their products. Today, we can set up an entire technology stack in a fraction of the time and cost than before. And it's no surprise that these transformations have paved the way for the modern data stack.

The Modern Data Stack consists of a flexible set of technologies that help businesses store, manage, and learn from their data. Typically, Modern Data Stacks are built on cloud-based services, and increasingly include Low- and No-code tools that empower users to explore and use data.

## What's a Data Stack?

The term "data stack" originates from "technology stack", the very deliberate combinations of different technologies that software engineers combine to build products and services. While technology stacks might be focused on a variety of use-cases, data stacks are specifically built to support storage, management, and access to data. Data stacks are typically built by companies seeking to leverage their data in strategic decision-making.

### Data Stack vs. Data Platform vs. Data Infrastructure

- **Data Stack**: A set of technologies and services that organizations use to store, manage, and access data. Typically this is shared as a list of technologies and services, but the work and theory behind a given stack is much more muli-faceted than the simple format lets on.
- **Data Platform**: The implementation of your data stack into infrastructure, ie. how each of your technologies and services connect to each other. Typically this is shared as a diagram that abstracts underlying infrastructure, but shows how each component cooperates with the others.
- **Data Infrastructure**: The underlying computing system that powers your data stack. It's usually shared as a diagram, but with a focus on networking, hardware resources, and low-level API.

## How the Data Stack is evolving

Three major changes to underlying data infrastructure architecture have paved the way to the Modern Data Stack, and form the basis for its definition.

### 1. The move from on-prem to the cloud

Modern Data Stacks typically take advantage of cloud-hosted storage's improvements to security and elasticity, but more importantly to store and process very large chunks of data at very little cost.

### 2. The shift from ETL to ELT

Data warehouses used to be a huge bottleneck for data teams. People mostly used row-based relational databases as their data warehouses, which didn't scale well for data analytics workloads, since it spreads out related data across multiple disks or servers. Even with technologies such as Hadoop, map-reduce jobs still took hours to run and were very complicated to write and maintain.
Additionally, due to the limited processing power in legacy data warehouses, data engineers used to write transformation jobs before loading data in, leading to the term ETL (Extract-Transform-Load).
Now, with the advancement of high-performing cloud-based columnar data warehouses, data engineers can run petabyte-scale queries in minutes. With a Modern Data Stack, they can provision and start loading data into the data warehouse in minutes (ELT, Extract-Load-Transform) and analysts no longer need to rely on engineers to transform the data.

### 3. The rise of self-service analytics to democratize data exploration

Regardless of the size of the company, the knowledge of SQL limits people from accessing data stored in databases and warehouses without the help of an analyst. For example in a traditional data stack, an account executive wanting a list of customers who've visited a certain area of the product would need the help of a friendly engineer or analyst to "pull" the data for them.

Companies have recognized this bottleneck, and use business intelligence tools like Metabase to empower everyone in their organization to explore and find their answers from data. Now, designers can learn about the usage of their features, executives can explore strategic options, and account executives can make their sales, all without relying on analysts.

## The benefits of a Modern Data Stack

### Modularity

Because a Modern Data Stack consists of technologies with generally standard connection points, teams can swap parts of the stack as their needs evolve. This helps them avoid vendor lock-in, and allows the team to grow their stack as their data needs mature.

### Speed (ops and execution)

Due to limits in processing power in legacy data warehouses, pipelines used to take hours to run, if not days. Today, with a Modern Data Stack and its access to elastic computing resources, the same work can be done in minutes.

Additionally, due to the self-contained nature of their components, Modern Data Stacks are significantly faster to set up and iterate on. Today, a young startup can build an analytics stack to track their experimentation in just a few hours, without needing to write a single line of code—a job that would have taken days or weeks in a legacy stack.

### Cost

Cloud-based technologies and data storage typically carry significant cost savings over their on-premise counterparts. An on-premise data warehouse requires paying for server use for 100% of the time, and makes scaling difficult or costly. With cloud-based data warehouses like Redshift, Snowflake, and BigQuery, you only pay for what you use and can seamlessly scale up with massive workloads.

## Components of a Modern Data Stack

Most teams organize their data stack into layers—like a cake. Not every team needs every layer covered, but each has a unique role that helps build up to the complete, delicious recipe.

For example, a solo founder who is just trying to validate a few experiments probably doesn't need complex transformation tools, but might need a way to connect their data sources to an analytics tool.

### Data source

This is where your data comes from: it can be your production database (e.g. PostgreSQL), the logs of your web server, or a third-party application like Stripe, Zendesk, or any other product you're working with. It's common for teams to have multiple data sources, all flowing together into centralized data storage solutions.

### Data ingestion

This is how data gets moved and normalized from your data source to your data storage.

Three major companies in this space are: Fivetran, Stitchdata, and Segment.

### Data storage

This is where all the data coming in from the data sources is aggregated and stored. In mature data stacks it's [usually a data warehouse](/learn/grow-your-data-skills/data-landscape/which-data-warehouse), but may just be a [read-only replica of your database](/learn/grow-your-data-skills/data-landscape/which-data-warehouse#2-a-read-replica-of-your-application-database) in earlier-stage companies.

Three major companies in this space are: Snowflake, Amazon Redshift, and Google BigQuery.

### Data transformation and modeling

Data transformation and modeling helps package different data sources into user-friendly models, so that people can explore these combined sets without sifting through raw data and making guesses about what they represent.

Notable companies in this space: dbt and Dataform.

### Data analytics

Sometimes simplified as "data visualization" or "business intelligence", data analytics helps users explore and find insights in their data. This usually involves building visualizations or other representations, and can include the development of dashboards and other tools for monitoring.

Modern data analytics include tools to help non-technical users explore data without needing to know SQL. This frees them from depending on developers and analysts, and encourages everyone to explore and learn from data.

We're pretty biased, but we think Metabase is a great option. You can [try it out here](https://store.metabase.com/checkout/login-details).

### Data operationalization

Also known as "Reverse ETL", data operationalization is the process of moving data from a data warehouse back into third-party systems to make data operational. For example, syncing customer data from your warehouse into your customer service software so your frontline agents can better support them.

Notable companies in this space: Census and Hightouch.

This article is just the tip of the iceberg, but we hope it gives you a clear understanding of the characteristics and advantages of building and working with Modern Data Stacks.

Cheers,

The Metabase Team
