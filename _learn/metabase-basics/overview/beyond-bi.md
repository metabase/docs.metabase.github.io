---
layout: learn_article
date: 2016-03-06 16:10:58
categories: guide
image: /images/twitter/default.png
author: Sameer Al-Sakran
redirect_from:
  - /learn/data-diet/analytics/beyond-bi
  - /learn/analytics/beyond-bi
  - /learn/getting-started/beyond-bi
  - /learn/metabase-basics/getting-started/beyond-bi
---

One of the most interesting parts of building Metabase has been seeing how many different problems it can alleviate that don't necessarily look like "Business Intelligence". We'll go over some uncommon uses of a BI platform like Metabase, and include some steps you can take to get started for each use case.

For each of these use cases, all you need to do is spend five minutes [installing Metabase](/docs/latest/installation-and-operation/installing-metabase) and [connecting it to your database](/docs/latest/configuring-metabase/setting-up-metabase), and you're halfway there.

## A quick business intelligence tool

Let's start with the obvious use case: if you know you want dashboards, have a bunch of KPIs, and enjoy getting updates on these metrics by email: Metabase is great at [pushing data](/learn/analytics/push-and-pull) throughout your organization.

**What to do**

- Figure out which tables of your database are relevant to non-engineers, and mark the remainder as hidden.
- Write descriptions of commonly used tables and any confusing fields to make it easier for people to [explore your data](/learn/metabase-basics/getting-started/data-browser).
- Create a few [simple saved questions](/learn/getting-started/getting-started) for frequently asked questions.

## Lookup tool for customers, accounts, or whatever

You probably have users. These users probably do things like upload photos, leave comments, order products, leave complaints, or have credit card transactions that leave records in your database. It'd be useful to be able to look up user info without having to build custom admin pages---and Metabase was designed with this in mind. Photos, venues---any kind of record that you'd need to look up.

**What to do**

- Figure out the most common ways to find a given record, then tell people how to [use filters](/learn/analytics/searching-tables) to find specific records.
- Click on the primary identifying key of the record to view all the records your database has related to that user.
- Build out shared questions and dashboards. [Set up alerts](/docs/latest/questions/alerts).
- As people ask you questions, save the query and [give them accounts to Metabase](/docs/latest/people-and-groups/managing) so they can refer to it, or use it as the starting point of another question.
- Set up [custom destinations](/learn/metabase-basics/querying-and-dashboards/dashboards/custom-destinations) to send people to another question or dashboard, or to your CRM or other third-party tool using a parameterized URL.

## A browser for your database(s)

At the start of a project, you probably don't know what you want to measure, so the idea of setting up analytics may seem premature. That said, before launching or even getting a prototype out, there are a number of common tasks that pop up over and over again. You'll probably want to look up records every once in a while. You'll likely have user accounts, and it'd be useful to pull up all the information about a user. You'll probably want to pull information out of the database and import it into a spreadsheet, or some other third party tool. Eventually, after you've been asked the same question a few times (e.g., how many users signed up last week?), it'd be nice to automate the answer without committing to creating (and maintaining) a dedicated internal tool for it.

**What to do**

- Use your Metabase in an ad hoc fashion to [learn about your data](/learn/metabase-basics/getting-started/data-browser).
- Stop interrupting engineers to have them write ad hoc custom SQL.
- Create a dashboard at some point.
- As you need BI, build out shared questions, dashboards and nightly emails.
- As people ask you questions, instead of sending them emails, CSVs, or spreadsheets, save the question in Metabase and give people accounts.

## A way to field frequently asked questions

If you're the only person in the office who knows SQL, you're probably fielding a lot of questions --- often the same ones over and over. Metabase works really well as a place to share SQL queries with non-technical users (or even just useful [snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets) of SQL). Metabase also provides a [friendly query building interface](/learn/getting-started/getting-started) that allows people to ask their own questions without writing SQL.

**What to do**

- Create Metabase accounts for people.
- Start to collect common questions, and point people to the Metabase server.
- Look for opportunities for people to look up other people's common questions, and provide some [simple question templates](/learn/sql-questions/sql-variables) they can edit.
- Write some commonly use SQL and save the code as [snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets) that anyone can use.
- Watch as folks start to answer their own questions. After a while they'll be asking you questions about the [data model](/glossary/data_model) and how to calculate numbers instead of the answer.
- Encourage people to look up their own data, as now they can!

## A publishing platform

Even in companies that have a lot of data infrastructure in place, there is often a need to publish the results of a complex analysis. While there are a lot of tools that provide support for complicated analysis (R, Matlab, Julia, etc), they're often less than optimal as a means of relaying the results to the rest of the company. Rather than coding a custom view of these results, or forcing non-technical users to interact with Matlab, you can use Metabase as a simple, lightweight means of publishing these results to the rest of the company. Send people a link to a dashboard, embed the dashboard in your app, or simply take a screenshot of the Metabase chart and stick it in a slide deck: whatever works.

**What to do**

- Decide on where data will be stored: a central [data warehouse](/glossary/data_warehouse) or a set of decentralized databases.
- Dump the data into the database.
- Seed the Metabase instance with a few common questions that show people how to use the data model.
- For extra credit, create a dashboard or two with these questions to provide a starting point for passive consumption.
