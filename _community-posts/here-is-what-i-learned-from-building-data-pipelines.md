---
title:  "Here's what I learned from creating Data Pipelines"
redirect_from:
  - /community_posts/here-is-what-i-learned-from-building-data-pipelines
meta_description: Data Pipeline. Main questions you need to answer before building it.
date:   2021-11-17 16:10:58
image: /images/community/here's-what-i-learned-from-creating-data-pipelines.jpg
read_time: 3 minutes
category_filters: "Pipelines"
organization: Lendingkart
organization_url: https://www.lendingkart.com/
author: Srivamsi Sakirepalli
author_img: /images/community/srivamsi-sakirepalli.jpeg
author_bio: Srivamsi is a Data Engineer at Lendingkart, a startup that empowers businesses and financial institutions. He’s an infrastructure, data, and math enthusiast. You can find Srivamsi on [LinkedIn](https://www.linkedin.com/in/vazmeee/){:target="_blank"}.
---

## The importance of creating data infrastructure

Our company works with a variety of data stores, for building apps, analysis, and making informed data-driven decisions. And as part of the Data Engineering team, we have to keep up with the organization’s growth and scale.

With the increase in volume-velocity-variety of data, storage-movement-management is a formidable task. (see how 3 of big data V’s are in play already).

Part of the responsibility of a Data Engineer is to choose the right Principles (ETL-ELT; Kappa-Lambda; Governance) and Infrastructure (Storage; Compute; Frameworks). The **“when”** and **“why”** to use the above play a big role.

### Preparing to create a data pipeline

Before building a pipeline, always ask a few questions about the data and systems in place:

- What's the source and where's the sink? (data flow on-premise or external)
- Is it a one-time procedure or will it have to be scaled?
- What are the costs and budgets for the data platform?
- Is it needed in real-time or in batches, and will the system support the method?
- Do we have existing infrastructure to make it work and personnel support for times to come?
- Is there an Enterprise platform that does all the work readily? (Build vs Buy)

## Benefits from creating a data pipeline

So here's my two cents on ETL/ELT after working with different types of Data and systems.

When moving Data **within the organization** from a Transactional Database (OLTP) to an Analytics Platform (OLAP), ELT is the way to go. Intermediate storage decouples OLTP and OLAP, which is important when use-cases such as historical refresh of data, or optimizing the Warehouse tables arise. ELT provides better SLAs for recovery, re-runs, and eliminates the risk of resource spikes on source systems. (No need to schedule the jobs at nights/weekends)

It sounds cooler and observably faster to use ETL and transform data on the fly, but while using self-hosted systems, storing all the data you can on low-cost object storage (AWS S3, Azure ADLS) in an organized structure is beneficial and it **scales**! Data is centralized and easily accessible.

When powering **Operational Analytics** (Reverse ETL for the Data folks out there), ETL provides better value. Getting used to in-house databases which are the backbone rarely does change, but Analytics SaaS Platforms certainly do. End users on these platforms expect readily available Data, to make informed decisions. Choosing an Enterprise or Opensource ETL tool allows faster development of Data Pipelines to various external systems without the prerequisite of knowing all about the destinations. (don't reinvent the wheel)

ETL is also helpful as external systems have limits and costs associated with the amount of data stored. So there is no need to explain when the Data limits exceed and dashboards stop updating on a workday.

Balancing rapid development, movement of data, and storing what's needed is a chore in itself, but the key is to maintain data integrity (facts, information, insights) and make data management easier & flexible today and in times to come.
