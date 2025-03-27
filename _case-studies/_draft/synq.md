---
title: "Metabase at SYNQ"
summary: ""
company_name: SYNQ
industry:
employees:
headquarters:
logo_image: /images/case-studies/retargetly-logo.png
image: /images/case-studies/Solv.png
permalink: /case-studies/synq
---

- [SYNQ](https://www.synq.fm/) uses Metabase to analyze their video API usage and activity.
- The developers use the flexible SQL interface, while Sales and Marketing use predefined questions or the GUI query builder.
- Commonly asked questions include
  - "How many videos were uploaded the last 30 days?"
  - "What is the number of uploaded videos per user the last 24 hours?"
  - "What is the average video transcoding time the last 24 hours? "
  - "How many Webhook requests have failed the last 24 hours?"

#### The Company

[SYNQ](https://www.synq.fm/) is a Norwegian startup founded in 2014 with 13 employees. They deliver a video API for developers to simplify the process of integrating video uploading, transcoding, storage and content delivery in apps or other services.

#### Why Metabase?

After trying out several different analytics tools they found that Metabase was the best solution for their company with the possibility to build questions either with the simple GUI builder for less technical personnel or the more advanced SQL interface that the developers prefer. Since all data related to a video or user is stored in a database, all information can be visualized easily. A general dashboard is displayed on a wall in their office that auto refreshes and shows the most crucial information. API usage data is important for [SYNQ](https://www.synq.fm/) to track user behavior and to act on certain issues that could emerge. For sales it is vital that it is easy to see if a free trial user has performed certain milestones to be able to target them with the correct marketing material. The fact that Metabase is open source is also highly appreciated by all.

#### The Data

Metabase is connected to a read replica of their PostgreSQL database that contains video data, user data, and web hooks data that is generated through the API.

#### The Questions

[SYNQ](https://www.synq.fm/) has several dashboards with data from all users or specific VIP customers and around 40 different questions. Many of the developers and the sales personnel have their own dashboards focusing on different aspects of the API. Metabase is used every day and there is a wide variety of questions, both broad and more specific. After defining the dashboards needed and creating the initial questions, there has not been any need to spend time maintaining Metabase. Questions are added with the GUI query builder, or by developers when more advanced querying is needed. In addition to dashboards, [SYNQ](https://www.synq.fm/) uses pulses in Slack to quickly get an overview of the current state of things.

Metabase is an important aspect of monitoring the usage of their API.
