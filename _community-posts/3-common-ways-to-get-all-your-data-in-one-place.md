---
title:  "Three common ways to get all your data in one place"
redirect_from:
  - /community_posts/3-common-ways-to-get-all-your-data-in-one-place
meta_description: Learn three common ways to consolidate your data into a data warehouse, and how to assess each approach in terms of cost, engineering resources, and general versatility.
date:   2022-12-20 17:10:58
image: /images/community/3-common-ways.jpg
read_time: 3 minutes
category_filters: "Pipelines"
organization: Mentat Analytics
organization_url: https://www.mentatanalytics.co/
author: Ali Baghshomali
author_img: /images/community/ali-baghshomali.png
author_bio:  Ali is a founder of Mentat Analytics, an [analytics consulting agency](https://mentatanalytics.co/){:target="_blank"} and a [Metabase Expert](/partners/mentat-analytics){:target="_blank"} specializing in high-growth startups. He's also the creator of Product Analytics Academy, which offers a [product analytics course](https://productanalytics.academy/){:target="_blank"} for product managers. He previously worked at Bird and BuzzFeed.

---

These days, every department of a typical company deals with data. So does every tool used by those departments. Whether you’re dealing with ad campaigns, product analytics tools, or crash logging tools, one thing is clear: you have lots of actionable data to dig through.

But what do you do when each of your data sets resides in a different tool? Wouldn’t it be easier to have the data all in one place so you can join them together, run SQL, and build dashboards?

We’ll discuss the most common ways to consolidate all your data in one place and assess each of them in terms of cost, engineering resources, and general versatility.

## The most common ways to get all your data in one place

A data warehouse is a database used explicitly for analytical purposes. Your product doesn’t run off of it, but your business can use it to build all its queries and dashboards. A warehouse allows you to have fast analytics without having to query your product database, which could potentially cause your product to slow down. Examples of commonly used data warehouses include Redshift (part of AWS), BigQuery (part of Google Cloud), and Snowflake.

## Direct Integrations

Many tools offer their own direct integration with a data warehouse or BI tool. Mixpanel for example has a “Data Pipeline” add-on that lets you easily export all of its data to a warehouse of your choice. The customer data platform tool Segment has data warehouses as a possible destination for you to send all your captured data. So if you’re looking to put data from several tools into one location, first check to see if any or all of them have a built-in integration with your warehouse or your BI tool.

Direct integrations are generally pretty fast and don't cost much either (some tools offer it for free), but the downside is that they're not very versatile. Only a subset of tools offer integrations like this, so if the tool you need doesn’t offer it, you’re out of luck.

## ETL Tools

Consolidating data from several sources is a longstanding need that has taken lots of time and money from companies over the years, which is why in recent years we’ve had a whole category of tools built just to handle this need in a codeless manner. These tools are generally referred to as “ETL Tools”; some examples include Fivetran, Hevo, and Stitch.

ETL tools have a set of pre-built integrations for “sources” and “destinations”. As the names suggest, a “source” refers to any data source like a marketing analytics or product analytics tool. A “destination” refers to any place where data taken from the sources will be deposited to, usually  a data warehouse.

The nice thing about ETL tools is that they are codeless. You can generally set up a pipeline in a matter of minutes, then monitor how well the pipeline performs. ETL tools save you lots of time and resources, and their pipelines are always high quality. The tradeoff is that they can cost a lot if your data volume is very high. But for most startups, you can use an ETL tool for only ~$200-$300 a month. Their other limitation is selection: you can only use these tools with data sources and destinations that the tools support. So before you pull the trigger on an ETL tool, go check their list of integrations to make sure your tools are covered by it.

To summarize, ETL tools take very little engineering resources and are generally pretty versatile. Their only downside is the high cost in cases of large data volume.

## Custom Scripts

Last but not least we have the most time-tested way to move data around: a custom script. Pretty much every single tool offers an API that can be used to export/import data. So if your tool doesn’t offer its own integrations, and it’s not covered by your ETL tool of choice either, then you can always write a script that exports the data through its API to your destination of choice.

Typically these types of scripts are written in Python or JavaScript, and they’re set up to run periodically. Their frequency is based on your needs, usually daily.

Custom scripts are the most versatile and the cheapest of all options in terms of amount you have to pay directly in order ro get the system up and running, but they take up the most engineering resources. This may seem like an appealing tradeoff, but in my experience teams tend to underestimate the work involved in building and maintaining the scripts. So only proceed with this method if you have the bandwidth on your engineering team and have tried the other options mentioned above.

## Which approach should you take?

How you approach this problem depends on your data sources, your engineering resources, and your financial resources. In many cases, a company ends up using a combination of all the methods outlined above. But before you get started on any of these methods, make sure you check to see if the data sources in question are a good fit for your method of choice: Do they have an integration with your ETL tool? Do they offer a good API? Additionally, make sure that you have the resources to implement that solution.
