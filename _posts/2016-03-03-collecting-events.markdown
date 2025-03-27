---
title: "Event Analytics Strategies"
date: 2016-03-03 16:10:58
last_updated_at: 2016-03-03 16:10:58
categories: "Analytics and BI"
author: Allen Gilliland
image: /images/posts/event-analytics-strategies.jpg
layout: post
---

## Overview

So you want to do event analytics — awesome! This document provides some basic things you should know. There are a few sections to read, as follows:

- General strategies for implementing event analytics. Describes three high-level options to consider.

- The anatomy of an event analytics pipeline and how it works. This will help you make better decisions throughout your journey.

- Practical advice. How to stay out of trouble and benefit from the mistakes of the many people who have tried this stuff before you.

## Event Analytics Strategies

Which option a team goes for will depend a lot on their needs, but most folks tend to work their way through these options progressively as their product and business scales.

- Use an end-to-end SAAS analytics provider. You’ll do this when you can’t afford the cost of managing any of your event analytics pipeline yourself or you simply don’t want to.

  - Benefits

    - completely hands-free and no infra required

    - fastest option to get something in place

    - solutions are often well optimized for event analytics workloads

  - Drawbacks

    - proprietary solution with no control over capabilities

    - data is isolated and can’t be joined with any other data from your application

    - often gets quite expensive at higher volumes

    - in most cases you won’t own your data or have the ability to get it back completely if you decide that you want to do more with it

  - Example Solutions

    - Google Analytics

    - Mixpanel

    - Keen IO

- Custom pipeline made from managed services. This is the middle path. You get back some critical elements of control in exchange for a bit more work.

  - Benefits

    - you own the data all the way through the pipeline, giving you the opportunity to decide any way you want to use it

    - you'll be able to join your various data sources together, enabling analyses not possible otherwise

    - data privacy and security are more firmly in your control

  - Drawbacks

    - you’re taking on the responsibility for collecting and storing your data, so you need to be ready to own the solution

    - typically you’ll need to create and maintain some code to handle extracting and transforming your collected data for use

  - Example Solutions

    - AWS Mobile Events + S3 + Redshift + BI

    - AWS Kinesis + S3 + DWH + BI

    - Kafka + S3 + DWH + BI

    - Kafka + Storm + BI (real-time)

    - Segment.io + S3 or Redshift + BI

- Fully custom pipeline. This is an anything-goes, fully constructed pipeline that will often contain components which are highly customized.

  - Benefits

    - full control over every step in the pipeline ensures you have the ability to solve anything you need to

    - you can optimize for your own specific needs where appropriate rather than relying on more generalized solutions

    - all of your data can be moved around and consolidated as needed, so any analysis is possible

  - Drawbacks

    - this is the most costly option and will certainly require dedicated headcount to execute on

    - it takes time to build out a full data pipeline — often several months or years

  - Example Solutions

    - you’re on your own here — that’s what you wanted, right?

## Anatomy of an Analytics Pipeline

Data pipelines come in many shapes and sizes, but in most cases the steps below represent a solid framework for discussing the pieces in the pipeline.

- **Generation** - this is where and how the data is created. Could be coming from a mobile app, a user in their browser, a backend server, whatever. In most cases you are either writing this code yourself or you are using a third-party SDK like GA, Segment.io, Mixpanel, etc.

- **Collection** - once data is generated it typically needs to be sent somewhere and stored for downstream usage. In most cases this is an HTTP-based API of some sort. It’s important to keep in mind that data often is collected once but intended to be used multiple times, so designing for a pub/sub model makes sense here to allow multiple subscribers to the same data.

- **Processing** - after data is collected, it typically goes through one or more transformations to prepare it for consumption. This step is often highly custom and depends greatly on how data generation and collection take place, as well as what’s available for data warehousing. This is your ETL and it’s effectively the glue in your pipeline.

- **Warehousing** - refers to how data is stored and made available for analysis. This can be as simple as a CSV file or as complex as a Hadoop cluster with over 2,000 nodes. The principle factors in picking your warehouse are data volume and analytical needs.

- **Analysis** - the set of tools and processes which pull data from a warehouse and format it for active consumption, usually by humans. This is where your BI tools and custom dashboards tend to focus. If you have an ML discipline then you would have modeling software here as well.

## Practical Advice

### General Thoughts

- Ride each solution as far as you can before moving up to a more sophisticated approach.

- Don’t underestimate the work involved in running your own pipeline. A data pipeline is not a system where you set it up and it just runs without any attention; it will require care and feeding on a regular basis.

- The general degree of difficulty/time cost for parts of your pipeline tends to be:

  - Generation = EASY

  - Capture = MODERATE -> EASY (as you get better at it)

  - Processing = HARD -> MODERATE (as you get better at it)

  - Warehousing = HARD -> MODERATE (as you get better at it)

  - Analysis = MODERATE

### When going with an end-to-end SAAS service

- Typically you’ll have to do a little coding to implement a third-party SDK and integrate the data generation code into your application. Depending on what you want to track this can be very easy, like GA on a website, or it can be a bit more involved.

- Customers/clients/users will be sending data to a third-party so there are at least some legal and privacy implications to consider. In most cases this isn’t a big issue, but it’s worth thinking about.

- You’ll access your data through the proprietary set of tools created by your provider, and that can be a mixed bag. In most cases you’ll end up running into walls regarding what you can do, and you’ll just have to live with them because you have no way to change anything.

### When you are planning to start up your own pipeline

- Remember that to execute on this you’ll have to run some infrastructure, even if it’s managed services such as on AWS, so make sure you’ve got some basic techops capabilities.

- It’s tempting to think you’ll need a data engineer to execute on this analytics strategy, but you don’t if you keep things simple. There is no reason to jump the gun on hiring data engineers.

- Focus on creating a stable and robust data collection pattern to start with, because “literally” everything is downstream from there. Once you have something solid in place for data collection you can build lots on top of it. Top choices here are AWS Kinesis and Kafka.

- Your Data Warehouse choice will mostly be dependent on data volume. For small volumes stick with the simplest tools like open source SQL databases. When you outgrow that you’ll be looking at an analytics DWH, of which there are lots of choices: AWS Redshift, Vertica, ParAccel, and Terradata are among the big names. There are also newer tools like Spark, Presto, Impala, and Druid.

- Everyone wants their data pipeline to be real-time (meaning data is ready for analysis immediately) but it’s certainly more work to execute on, so decide early on if it’s worth it for you. To do this often you’ll require specialized tools and a different pipeline configuration, so take that into account.

## Sources of Inspiration

- [The totally managed analytics pipeline](https://segment.com/blog/the-totally-managed-analytics-pipeline/)
