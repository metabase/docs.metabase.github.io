---
title: "BI tool"
headline: "BI tool"
def: "An app designed for people to look at data without relying on code."
aka:
  - Business intelligence tool
  - Business intelligence platform
  - BI platform
related-terms:
  - term: Dashboard
    slug: dashboard
further-reading:
  - title: From spreadsheets to business intelligence
    url: /blog/spreadsheets-to-bi
  - title: A quick business intelligence tool
    url: /learn/metabase-basics/getting-started/beyond-bi
  - title: The push and pull of analytics
    url: /learn/analytics/push-and-pull
redirect_from:
  - /glossary/bi_tool
---

## What is a BI tool?

A BI tool is an app designed for people to look at data without relying on code. These apps allow people to visualize and share data as tables, charts, and dashboards.

BI tools plug into existing data sources at your organization, such as your [data warehouse](/glossary/data_warehouse), CRM, or [event analytics service](#bi-tools-vs-event-analytics-services).

## Common BI tools

### Spreadsheet applications

A classic example of a BI tool is a spreadsheet app like Microsoft Excel or Google Sheets, where you can visualize data in [tables](/glossary/table), [pivot tables](/glossary/pivot_table), or charts, and share the results as individual files (or links to those files in the cloud).

### BI platforms

A BI tool is often thought of as an app that is only used to visualize data and make reports. A BI _platform_ like Metabase is type of BI tool that can handle additional tasks adjacent to reporting, such as [data modeling](/glossary/data_model), [data cataloging](/glossary/data_dictionary), [version control](/glossary/serialization), and [permissions management](/learn/permissions).

## How do BI tools fit into a data stack?

{% include image_and_caption.html url='/glossary/images/bi-tool/data-stack-highlight-analytics.png' description="<em>Fig. 1</em>. BI tools fit under the analytics component of a modern data stack." %}

BI tools are one of many analytics tools that can be set up at the user-facing end of a [data stack](/blog/the-modern-data-stack). BI platforms in particular can handle some of the same tasks as other parts of your stack. Here's how you can expect the pieces to interact:

### BI tools vs. databases

BI tools aren't data sources — they don't replace [production databases](/glossary/production-database) or [data warehouses](/glossary/data_warehouse) for storing data owned by your organization. BI tools pull information from databases by running queries and displaying the results.

### BI tools vs. ETLs

BI tools don't replace [ETLs](/glossary/etl) (or ELTs) for ingesting or transforming large amounts of data on a schedule. However, [like ETLs, some BI platforms can handle data modeling and data stitching](/learn/metabase-basics/getting-started/models#why-not-run-an-etl-job-to-create-a-model-in-your-database) (joining data from different databases) by running queries on the fly.

### BI tools vs. event analytics services

Event or web analytics services like Google Analytics, Segment, or Amplitude collect usage data from your product. Although these services come with their own interface to visualize and share that data, they aren’t considered BI tools. You can think of them as mini data stacks that can be used standalone.

Event analytics services can be integrated into your core data stack by combining them with a central BI tool. You can download event data from the service and move it into the data warehouse connected to your BI tool, or if supported, wire up the service to connect directly to your BI tool.

### BI tools vs. open source coding tools

Open source tools like Jupyter Notebook and RShiny use programming languages like Python and R to work with data. They can be used to build reports and dashboards for analytics, but they aren’t considered BI tools because they rely on code rather than a visual interface.
