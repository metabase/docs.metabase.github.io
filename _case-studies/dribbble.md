---
title: Dribbble uses Metabase to democratize data across all their teams.
summary: Dribbble is the world’s leading community for creatives to share, grow, and get hired.
redirect_from:
  - /case_studies/dribbble
company_name: Dribbble
industry: IT & Software
employees: 80+
headquarters: Victoria, Canada
key_usecases: Business Intelligence:/product/business-intelligence
logo_image: /images/case-studies/dribbble-logo.png
image: /images/case-studies/dribbble-uses-metabase-to-democratize-data-across-all-their-teams.jpg
featured_image: /images/case-studies/dribbble-banner.jpg
the_challenge: Before Metabase, Dribbble had been using another Business Intelligence tool, but the atomic unit in that tool was a dashboard, which made a search for a specific question complicated. Over and over again their teammates would address their data team asking where to look for a specific chart.
the_solution: Dribbble’s Director of Data Science heard about Metabase during one of the dbt Coalesce-talks. They initially implemented the open source version of Metabase and discovered it was much easier for their teams to explore data and ask questions. They ended up making Metabase the only Business Intelligence tool in the company.
the_results: Metabase enabled their non-technical team members to easily question and explore their data without the need to ask the data team for help.
blockquote: Metabase increases the accessibility of the data and gives everyone in the team a lot more capabilities without having to learn how to write SQL.
speaker_name: Charles Lariviere
speaker_title: Director of Data Science at Dribbble
speaker_photo: /images/case-studies/testimonials/Dribbble-Charles-Lariviere.jpeg
---

[Dribbble](https://dribbble.com/){:target="\_blank"} is the world’s leading community for creatives to share, grow, and get hired. Founded in July 2009, Dribbble has grown into a global community where tens of millions of people get inspired and connect with designers around the world. As of January 2020, nearly 10 million shots, snapshots of designers’ work, have been shared, making Dribbble one of the most prolific and engaged design communities.

#### Why Metabase?

In 2021 Dribbble’s data team decided to rebuild all of their analytics stack from scratch. They changed their data warehouse, ETL tools, and transitioned to Metabase.
Previously they had dashboards that were all SQL-based.

> **“Our main pain point was finding the right information, which was more difficult with our last tool, which had the dashboard as its atomic unit. Metabase’s atomic unit is a chart which was super appealing to us. When somebody from our team is looking for the daily active users - they don’t need to know whether this chart is a part of the traffic dashboard or any other dashboard.”,- Charles Lariviere, Director of Data Science at Dribbble.**

Dribbble initially deployed the Open Source version of Metabase but then migrated to the cloud version. Charles says it wasn’t too hard to manage Open Source by themselves, but it was still a bit of a hassle, and they also wanted to take advantage of the full Enterprise/Pro features package. (Plus, they just wanted to support Metabase as an open source project.)

#### The data

Dribbble uses Snowflake for all of the data warehousing, and dbt to model the data within Snowflake. In Metabase, they make available only the data that is modeled and tested through the dbt. They use Snowplow to capture how people are interacting with the website and Dagster to ETL data from various sources.

#### How Dribbble team uses Metabase

Dribbble team uses Metabase for all their Business Intelligence within the company. They use it for financial reporting, monitoring subscription metrics, web performance metrics, user growth, and much more.

Everything that is meant to be shared and consumed by everyone is prepared by their data team. But everyone has the access to explore the data, drill-down, and save their own questions.

Dribbble product team members are the most active on Metabase. Product managers do a lot of drilling down into all of the charts to understand how people navigate through the product, or which segment of people is having the most impact on certain metrics.

In most cases, the Dribbble team asks their questions in Metabase using the graphical query builder. They prefer that because it’s much easier for anyone to drill down and understand how that chart was created.

> **“In SQL-based questions, you can see how a query is written, but unless you’re familiar with the language, which is not a case for many people - you can’t really fully understand how the question is built.”, - Charles Lariviere.**

Dribbble team also likes how the data can be organized in Metabase. They create top-level collections by functions (finance, marketing, product engineering, etc) and each collection consists of logical folders.

#### The results

With Metabase it became much easier for everyone in the company to find answers to their questions and know directly where to look for the information. Dribbble's Head of Data Science said that they’re seeing fewer questions coming from our team like “Where to find this information?” compared to their previous Business Intelligence tool.

Now the entire team has the ability to drill down, add their own filters, groupings, and generally dig into the data.

One of the unexpected benefits for Dribbble was learning about Metabase’s API and how much they could do with it. They’ve started to write code to be able to automate their workflows, like updating the data types for all the columns and adding descriptions and foreign key relationships between their models. They’re also planning to automate the creation of metrics and segments so that they can manage them in version-controlled dbt configuration files.

#### Charles’s Advice for others

> **"We’re looking more and more in how to use metrics as a foundation for creating charts. We found that to be super powerful - to define metrics directly in a table and then have all of the charts to be based on those metrics. It’s a great way to keep charts consistent: if we decide to update the metric, that change is reflected in all the charts that use it.", - Charles Lariviere.**
