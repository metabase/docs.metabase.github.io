---
title: "Metabase helps every team at Clockwise to get sense of their data."
summary: "Clockwise optimizes your team’s calendars to create more time in everyone’s day. It brings together a powerful optimization engine with a personal calendar assistant to make your work life run smoothly."
redirect_from:
  - /case_studies/clockwise
company_name: "Clockwise"
industry: IT & Software
employees: 80+
headquarters: San Francisco, USA
logo_image: /images/case-studies/clockwise-logo.png
key_usecases: Business Intelligence:/product/business-intelligence,Interactive dashboards:/product/interactive-dashboards
image: /images/case-studies/clockwise-og.jpeg
featured_image: /images/case-studies/clockwise-illus.png
the_challenge: Prior to Metabase, Clockwise used Chartio, but when that product was discontinued,  Clockwise took the opportunity to reassess their analytics needs and choose a new, better tool.
the_solution: Clockwise tested several tools and came to the conclusion that Metabase was the simplest and most convenient tool for both non-technical business users and advanced SQL users alike.
the_results: Metabase has helped spread the perception that data analysis can be easier and does not require specialized skills - meaning the entire company can be more data-driven in decision making.
blockquote: Typical data analysis tasks take half the time with the graphical query builder with Metabase questions. I no longer have to learn syntax and tweak SQL queries to obtain distributions or filter dates because Metabase handles that natively.
speaker_name: Krishnan Raghupathi
speaker_title: Product Manager at Clockwise
speaker_photo: /images/case-studies/krishnan.png
---

#### Why Metabase?

[Clockwise](http://getclockwise.com){:target="\_blank"} evaluated Metabase against some competitors ([Superset](/lp/metabase-vs-superset) and [Looker](/lp/metabase-vs-looker) were the primary alternatives) by spinning up test instances with a couple datasets and trying out basic analytics exercises, such as answering a set of questions with visualizations and dashboards.

Metabase gave Clockwise the best combination of being simple/clean, providing good interfaces for table exploration and documentation, and a good balance of data querying pathways that enabled non-technical business teams and teams with advanced SQL skills alike.

#### The data

Clockwise ingests a broad combination of their own production data (backend and frontend) and third-party partner models into Snowflake. Their data team then manages processing and transformation into analytical tables (using dbt and Airflow jobs) that are then documented and exposed in Metabase to address ad hoc questions and feed KPI/OKR dashboards.

Clockwise looks at product usage (successful feature uptake), revenue (billing and subscription info), and third-party application data (email, CRM systems, etc.).

#### How Clockwise teams use Metabase

Clockwise uses Metabase mostly for ad-hoc product data analysis and persistent functional dashboards.

All Clockwise teams use Metabase, and it’s become the primary way they analyze and consume data. For example, their Business Operations team understands user and revenue growth, product engagement, and user retention. Their Sales and Customer Success keep track of usage and key metrics within their accounts. Product teams dive deep into feature uptake and usage, and their Marketing teams mine data for useful insights on how their users are spending their time.

For example, on the Customer Success side, Metabase is their source of truth for deeper analytics about their customer accounts. Clockwise CS team have high-level stats in the CS CRM (Vitally), but if they want to see charts or dig in deeper to how an account is using the tool, they can use a Metabase dashboard.

_“We have several Metabase dashboards that the BizOps team created for us that I have bookmarked and reference before every customer call.”_, - Kaitie Chambers, Customer Success Manager at Clockwise.

_“Additionally, for ad hoc queries about customer accounts, I’ll often start with our “Org Summary” tables and filter down to the information I need. Metabase makes this super easy to do without knowing SQL, and it just has a very clean UI that makes it easy and enjoyable to use.”_, - says Kaitie.

About 60% of Clockwise dashboards are built with the graphical editors and 40% use SQL queries, and those are the ones their data engineers tend to build out.

As Metabase is Clockwise’s primary data visualization and analysis tool, they’re expanding on Metabase education within their organization. Clockwise moves pretty fast, which means their data models often change, so they plan initiatives to reduce their number of tables/columns, to organize their chart/dashboard clutter within Metabase’s directory system, and to improve their documentation. Clockwise uses these housecleaning sessions as the foundation for training sessions to help level up teams, both on their Metabase skills and on the data they have available for analysis.

#### The results

_“Metabase has helped spread the perception that data analysis can be easier and does not require specialized skills - meaning the entire company can be more data-driven in decision making.”_, - says Krishnan.

Metabase allowed Clockwise team to get organized with their dashboards - building one set of Executive dashboards for the top metrics within the company, another set of dashboards with filters for each customers’ usage, anda set of functional dashboards for Sales, Marketing, and various Product teams within Clockwise.

**With Metabase Clockwise got better at:**

- Finding answers to usage questions to help inform the product roadmap.
- Understanding how much value a particular customer gets from Clockwise, and how to bring them up the value chain.
- Understanding engagement and retention.

Metabase has made it easier to quickly settle questions about product direction as they decide on upcoming roadmap items for Product teams. Metabase has also made it easier for their Customer Success and Sales orgs to understand and improve customer utilization for Clockwise - which contributes to reduced churn.

Krishnan Raghupathi had one case where he was able to cut analysis time by 50%. He noticed a segment of customers with declining engagement, and he wanted to find the underlying root cause. Metabase helped him correlate engagement by type of customer and by specific features they used. The graphical query editor helped simplify distributions without needing to tweak SQL queries. This cut down the time to arrive at the root cause from 4 days to about 2 days using Metabase.

#### Advice for others

1. Write good data documentation and expose this knowledge to your analytics teams. Clockwise has their data stack hooked up to dbt, so data engineers only have to describe the data in one place and it automatically gets surfaced in Metabase.

2. A strong data taxonomy and sense of internal business intelligence division/ownership will help a lot with analytics organization and clarity; you can connect Metabase directories of charts/dashboards straight to the people who care and who are most enabled to minimize redundancies, confusion, and misinterpretation.
