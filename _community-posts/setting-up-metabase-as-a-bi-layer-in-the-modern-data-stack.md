---
title:  "Setting up Metabase as a BI Layer in the Modern Data Stack"
redirect_from:
  - /community_posts/setting-up-metabase-as-a-bi-layer-in-the-modern-data-stack
meta_description: Building a Modern Data Stack? Read about choosing Metabase as a Business Intelligence tool.
date:   2021-11-11 16:10:58
image: /images/community/setting-up-metabase-as-a-bi-layer-in-the-modern-data-stack.jpg
read_time: 2 minutes
category_filters: "Working with Metabase,Self-service analytics"
organization: Data Culture
organization_url: https://www.datacult.com/
author: Opeyemi Fabiyi
author_img: /images/community/opeyemi-fabiyi.jpeg
author_bio: Opeyemi is a Senior Data Lead at Data Culture, a company that helps organizations twitch the full data stack implementation. Being the organizer of the dbt Nigeria meetup he is also a founder of a Young Data Professionals community focusing on helping people to grow through their data careers. You can find Opeyemi on [LinkedIn](hhttps://www.linkedin.com/in/opeyemifabiyi/){:target="_blank"}.
redirect_from:
  - /community_posts/setting_up_metabase_as_a_bi_layer_in_the_modern_data_stack
---

## BI Layers and the modern data stack

Being a Data Lead in Data Culture as well as the organizer of dbt Nigeria meetup, I’ve been providing some knowledge around modern data stack for folks in the Nigerian data ecosystem. I often emphasize the fact that modern data stack isn’t just a new buzzword that’s rapidly growing at the moment in the data space. It's a solution to many challenges organizations face in their journey of becoming data-driven.

A modern data stack is primarily a tool suite that fuels ease of data integration.

The strength of the modern data stack is how it empowers data professionals - Data Analysts, Data Scientists, Data Engineers, and even non-technical users with capabilities that enable them to analyze business data and proactively glean insights that impact the business.

### Setting up BI analytics software

In setting up a modern data stack, one of the most important parts is the Business Intelligence (BI) Layer. It provides visibility to important business metrics used by an organization for decision-making.

There are a lot of different BI tools out there. However, with the current shift in data landscape disrupted by Massively Parallel Processing (MPP) data warehouses, and Columnar Data Stores built on SQL lingua franca, it’s very important to pick a BI tool that fits perfectly into that paradigm shift.

### 6 steps on setting up Metabase as you BI and data visualization tool

Setting up any data stack generally requires planning and understanding business requirements. While building a data stack, I adopted the following best practices:

- Connect Metabase to the transformed denormalized data in the data warehouse which makes it easy for the end-user to query;
- Create a separate data model in the data warehouse and expose it to Metabase. The first data model powers all dashboards and tracks important business metrics. The other data model is the transformed denormalized data source required by different units in the organization;
- Enforce permissions by creating different collections & groups based on departments (Finance, Growth, Product, etc.) and grant access appropriately to the various groups;
- Leverage on Metabase [filter widgets](/learn/sql-questions/sql-variables){:target="_blank"} and [date filters](/docs/latest/users-guide/08-dashboard-filters){:target="_blank"} to create interactive dashboards for stakeholders to slice and dice;
- Group different questions into categories for easy cataloging and accessing for later use;
- Empower those who use the dashboards by doing a basic Metabase walk-through for self-service analytics purposes.
