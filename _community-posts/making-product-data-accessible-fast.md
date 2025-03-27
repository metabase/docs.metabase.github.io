---
title:  "Using product data to support your launch"
redirect_from:
  - /community_posts/making-product-data-accessible-fast
meta_description: Learn how to make product data accessible and how to properly inform multiple departments with needed data answers when launching a new product.
date:   2021-10-11 16:10:58
image: /images/community/using-product-data-to-support-your-launch.jpg
read_time: 1 minute
category_filters: "Self-service analytics"
organization: MachineQ, a Comcast Company
organization_url: https://machineq.com/asset-management
author: Will Sanderson
author_img: /images/community/Will-Sanderson.jpg
author_bio: Will is a Senior Product Manager at MachineQ. Backed by the power of Comcast, MachineQ makes it simple to build, connect and deploy IoT solutions at scale. You can find Will on [Linkedin](https://www.linkedin.com/in/willsanderson/){:target="_blank"}.
---

Our team was launching a brand new, integrated hardware & software product. With so many different components of the system, contributors from our Product, Engineering, Operations, Finance/Strategy, and other teams were all looking for specific slices of data. Rapid proof of concepts(POCs) for Product, health checks for Engineering, installation monitoring for Operations → everyone had something they needed.

We needed to keep data dynamic and shared across teams, whether it was tracking installation progress, auditing new product features, or reporting numbers to finance. We built out a KPI dashboard so that we could keep all of our stakeholders informed.

## 5 steps to support your product launch with data

### Create example SQL queries

The upfront time to get acquainted with SQL may seem daunting to some, but it's important to demonstrate the value and efficiency of SQL to contributors in the organization.

*Simple SELECT statements with JOINs went a long way towards making others comfortable with SQL.*

### Organize your data

We quickly found the number of useful queries ballooning - building out folder structures from the start enabled us to efficiently find the info we needed.

*We organized folders by product and have subfolders on a per customer basis, so that anyone from Sales, Ops, or Engineering can quickly access.*

### Start with the most important queries

With so many disparate asks, it would have been easy to get bogged down. We started by building out queries for Product usage metrics, then dashboards, then alerts. We then scaled it across teams and product lines.

### Make your product team data-driven

Becoming a BI-centric org requires time and many small wins. Show value with simple questions with potentially unexpected answers. Then, continue to scale.

*An early win was being able to quantitatively assess how the product usage changed from day to night.*

### Share dashboards frequently

The power of a BI tool such as Metabase relies on the data actually being consumed. Sharing queries and dashboards wisely helps foster a data-centric organization!

*We started with questions about operations and installation progress - information that had been previously self-reported and managed in Excel. Pretty soon we were building dashboards for many key aspects of the business, from product growth metrics to billing and forecasting.*
