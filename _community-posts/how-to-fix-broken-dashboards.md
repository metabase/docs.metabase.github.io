---
title:  "How to fix broken dashboards"
redirect_from:
  - /community_posts/how-to-fix-broken-dashboards
meta_description:  Broken dashboards - identifying the root cause so you can get back up and running.
date:   2022-04-21 10:10:59
image: /images/community/how-to-fix-broken-dashboards.jpg
read_time: 3 minutes
category_filters: "Visualization"
organization: Shopback
organization_url: https://www.shopback.sg/
author: Halynne Shi
author_img: /images/community/halynne-shi.png
author_bio: Halynne is a Product Manager at Shopback, a rewards platform that gives users cash back when they shop. She builds scalable systems for merchants and networks to ensure that each order is processed accurately and efficiently as the company grows. In her free time, Halynne co-hosts [YWLChats](https://open.spotify.com/show/15LZUPKYQMoMgDX3jaQmM0){:target="_blank"}, a podcast about women changemakers and their stories. You can reach out to Halynne on [LinkedIn](https://www.linkedin.com/in/halynne-shi){:target="_blank"}.
---

We’ve all been there — some dashboards are unusually outdated, but you may still need that data urgently for reporting.

How can you quickly get the dashboards up and running? Ultimately, data breakage can be grouped into 3 main aspects. Think along these lines to help you in your exploration:

- **Input:** The data feeding into the data pipeline has changed.
- **Transformation:** The transformation logic has changed.
- **Operations:** The data system cannot operate as expected due to issues such as schedule changes, permission changes, runtime errors, and infrastructure failures.

To accurately pinpoint where things could have gone wrong, follow the steps below.

![an image showing steps on how to fix broken dashboards](/images/community/how-to-fix-broken-dashboards.png)

## Start from the source

Usually, the dashboard is built from a series of transformations from multiple data sources. The goal is to trace back to the first node at the upstream that has the problem. At best, the most immediate node is causing errors and you can fix it right away. At worst, the problem stems from the origin node, and you’ll need to backfill each broken data table until you reach the problematic node.

If you have access to it, the data lineage file to get a birds-eye view of how all the databases in your dashboard relate to one another.
Starting from the most immediate upstream node, work backward to check which node is facing the problem.

## Check the query

Now that you’ve identified the origin of the breakage, the next step is figuring out the logic behind how the table was created.

1) **Search the logs:** Which query was altered or rewritten most recently? How did those changes affect the dataset?

2) **Investigate the logic:** Are there gaps in any queries that could have caused an error?

## Dive into the data

Hopefully, by now you have some idea of what caused the data error. However, if completing the above steps has not revealed the root cause of the problem, you can check the datasets, paying attention to things like:

- Time periods - is the data facing an error for a specific period?
- Timestamps - is the data in the correct timezone?
- Currencies - is your currency conversion wrong?
- Segments - are there any new segments that are not covered by the query?Eg. desktop, mobile; domains;
- Format - is there any text in fields that are supposed to be numbers?

## Investigate the production environment

If it’s not a data problem, then the error is most likely found in the operational environment. The data system logs can highlight potential areas of breakage, like:

- Delays in data syncing between the ETL tool and the database;
- Errors in running jobs;
- Changes in job schedule;
- Slow processing time;
- Changes in the network, access permissions, and/or data infrastructure;
