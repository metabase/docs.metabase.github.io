---
title: Data warehouse
headline: Data warehouse
def: A database used for analytics.
key-article:
  title: Which data warehouse should you use?
  url: /learn/analytics/which-data-warehouse
further-reading:
  - title: Data warehouse vs data lake vs data mart
    url: /learn/databases/data-mart-data-warehouse-data-lake
redirect_from:
  - /glossary/data_warehouse
---

## What is a data warehouse?

A **data warehouse** is a database used for analytics. This could be a standard relational database, or one that's specifically designed for analysis, relying on columnar storage. The analysis part happens in whatever BI tool your organization uses, but that BI tool has to pull its data from somewhere — that "somewhere" is your data warehouse.

Data warehouses typically store information from a number of sources (like the different operational databases that your organization uses), and those raw data sources make their way into your data warehouse via [ETLs in a data pipelines](/learn/analytics/etl-landscape), usually constructed by a data engineer. Unlike a [data lake](/glossary/data_lake), the information you store in a data warehouse is structured, so it's ready for analysis when you query it with your BI tool. Whether that structuring (or transformation) process happens inside (ELT) or outside (ETL) the data warehouse depends on how your pipelines are configured and what transformation tools you're using.
