---
title:  "Building a data-driven team to setup Metabase for success"
redirect_from:
  - /community_posts/setting-up-metabase-for-success-within-your-organization
meta_description: Using Metabase? Read a story about how to increase Metabase’s adoption inside your team and encourage data-driven decision making.
date:   2021-10-11 16:10:58
image: /images/community/building-a-data-driven-team-to-setup-metabase-for-success.jpg
read_time: 3 minutes
category_filters: "Working with Metabase,Data culture"
organization: YourCampus
organization_url: https://yourcamp.us/
author: George Visniuc
author_img: /images/community/George-Visniuc.png
author_bio: George is a co-founder and CTO at YourCampus, a company that offers a mobile application for flexible perks & benefits. You can find George on [Linkedin](https://www.linkedin.com/in/georgevisniuc){:target="_blank"}.
---

In this story, I would like to highlight the importance of offering a great user experience to your data stakeholders. Having an intuitive, easy-to-use setup in Metabase will result in a healthy data culture, where people are curious and eager to discover more.

## 4 steps on how to make your team data-driven

### Annotate your data to make the team more data-driven

The most common questions asked are something along the lines of “What is this field?”, “Where can I find this field?”, “Is this data available?”.

Annotating your data using Metabase’s data browser/dictionary can help users become self-sufficient and enable them to find data definitions.

Whenever possible maintain an up-to-date ER diagram that shows the big picture and how data is interconnected.

Example below:
![drill through options](/images/community/image1.png)

### Run onboarding and SQL training programs

Like any tool, Metabase has a learning curve, and in spite of its user-friendliness, can be intimidating to new users. Offering a basic, in-person/online overview of the different tools, can have a great impact and will help with adoption. The official guide is a very good resource to follow.
Although the editor capabilities in Metabase are great and you can perform multi-table joins, there are sometimes some operations or database native functions that you’d like to access. To make this less of a bottleneck for Metabase users you can offer basic SQL training and make use of Metabase’s convert question to SQL tool.

### Create data champions in the organization

Bottlenecks can also appear when the BI or Reporting Team is swamped with work and cannot service users in a reasonable time.

A great way to expand the knowledge in the organization is to “recruit” subject matter experts from each team or department. The individuals that show great interest in the data will bring immense value and context to the reports, given their intimate knowledge of the data. They can also act as a buffer and help other individuals in their team or other teams with answering questions and figuring out data.

Centralizing communication Slack channels for example enables users to ask questions and discover new data from other previously answered questions.

### Ensure data security and clean reports directory

An important part of the setup consists of the data hygiene standards that you implement and the organization of the questions and collections.

The easiest way to funnel the creation of the resources (questions, dashboards, alerts) in their appropriate location, is [to set up and manage permissions thus avoiding any users errors](/docs/latest/administration-guide/05-setting-permissions).

Collections and permissions can be created either per team, department, or function (manager, C-level, etc).

Although it’s not possible to enforce naming collection I found that following certain standards helps with searching and identifying the content of a question.

* Capitalized and descriptive title (Premium Users Per Region Per Month);
* Description when needed (Premium users are a segment of users that pay over $100 per month);
