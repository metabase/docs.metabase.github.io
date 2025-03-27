---
title: 4 steps to turn your support tickets into an automated dashboard
summary: "Using Zendesk, Freshdesk, or any other ticketing system? You can start labeling your support tickets for content analysis, and view the results in a support dashboard."
date: 2023-05-05 00:10:00
last_updated_at: 2023-05-05 00:10:00
categories: "Analytics and BI"
featured_image: /images/posts/4-steps-support-dashboard/support-tickets.jpg
image: /images/posts/4-steps-support-dashboard/support-tickets.jpg
author: The Metabase Team
layout: post
---

Understanding why customers contact your support team helps you improve your products and services. By analyzing your support ticket data, you can spot problem areas to focus on, and then build resources, product improvements, and processes to reduce your ticket resolution time, and (ideally) the number of tickets customers need to submit in the first place.

To get started, you'll need a ticketing system, like Zendesk or Freshdesk, with a batch of tickets in the system.

## 1. Create a few lists from your existing ticket data

### Make a table of ticket reasons and their definitions

List the most common reasons people file a support ticket. Keep the reasons short and concise. For example, `Bug` or `Feature Request`. Use your existing tickets to determine ticket reason. You can export ticket data and do a keyword search to find reasons, or use any built-in [field features](https://support.zendesk.com/hc/en-us/articles/4408886739098-About-ticket-fields) to filter and narrow down by types.

See our list below to get an example of how to structure your list.

| Reason          | Definition                                                                 |
| --------------- | -------------------------------------------------------------------------- |
| Biz Ops         | Billing or plan related matters                                            |
| Bug             | Product is broken in some way - issue labeled as Type:Bug in Github        |
| Duplicate       | Customer put in issue multiple times.                                      |
| Feature Request | Enhancement to product - issue labeled as “Type:New Feature” in Github     |
| How to          | A customer is seeking guidance on best practices or how to use the product |
| Sales support   | Answering questions about plans, pricing                                   |
| System outage   | System is down                                                             |
| Troubleshooting | Helping customers figure out why things aren’t working as expected         |

### List product or service areas to focus on

Next, go through your tickets and write down a list of product and service areas.

If you don't have a lot of tickets to work with, you can think of a few features that your customers interact with the most to begin a list. For example, if you have an online store, you can create a list based on general areas like cart, accounts, wishlist, etc. Once you receive new tickets, you can go back in and update these options with more concrete areas.

As an example, we label our `Bug`, `Feature Request`, `How To`, or `Troubleshooting` tickets with a product or service area to help us filter across ticket reason, which we'll talk about a bit in an [example below](#4-create-a-dashboard-with-the-results).

If you're a SaaS or tech-based company, here are some example product and service areas we use:

- API
- Dashboards and Visualizations
- Database connection
- Embedding
- Filters
- GUI Querying
- Permissions
- Sandboxing
- SSO or Authentication
- SQL Querying
- Subscriptions

### Create a list for any additional trending areas

When we first labeled our tickets by ticket reason and product area, we found that 1/3 of our support tickets are related to business operations. To collect more info about these tickets, we created a biz ops field, and that helped us chart and find additional areas to focus and improve on.

Biz ops could be a helpful field to add if you're working with accounts, subscriptions, or billing. If you're interested in creating this list specifically, here's the list we made:

- Billing question
- Can't find account
- Cancel subscription
- Delete Account
- Extend trial
- Password / Password reset
- Provide backup
- Reactivate Trial
- Upgrade from open source
- Upgrade from Starter to Pro

## 2. Use your lists to create custom fields in your ticketing system

Now it's time to plug those lists into your customer ticketing system. Create a custom field for _ticket reason_, _product or service area_, and additional areas, like _biz ops_, in [Zendesk](https://support.zendesk.com/hc/en-us/articles/4408883152794) or any ticketing system you're using. Use a [dropdown menu](https://support.zendesk.com/hc/en-us/articles/4408838961562) or one-input method. Giving your team the ability to choose only one option per field will allow you to group data with better accuracy.

After you've set up your custom fields, it's time to start labeling tickets. Label a batch of existing tickets with reasons and areas. You can also [require reason and areas to be filled in](https://support.zendesk.com/hc/en-us/articles/4408846008218) before a ticket is marked as solved, which will help you maintain a steady stream of new, incoming ticket data.

![Zendesk fields](/images/posts/4-steps-support-dashboard/zendesk-fields.png)

## 3. Connect your ticket data to your BI tool

To move the ticket data to your database or warehouse, and into your BI tool, you'll need to use an ETL tool or a connector. For example, to move data from Zendesk to Metabase, we use use [Stitch](https://www.stitchdata.com/analysis-tools/metabase/) for ETL. You can find an [open source](https://github.com/airbytehq/airbyte) or low cost ETL tool to add yourself, or work with your engineering team to implement a more robust data pipeline. Zendesk also offers [apps](https://www.zendesk.com/marketplace/apps/), which allow you to connect directly to certain BI tools, like Tableau.

We also use a reverse ETL tool called [Census](https://www.getcensus.com/). Building a pipeline with reverse ETL tooling can help you push organizational data back to your ticketing system, like customer org ID, subscription status, support tier, etc. Pushing org data from your data warehouse to your ticketing software is only necessary if you want that data on hand in the ticketing software when responding to tickets.

## 4. Create a dashboard with the results

Once your ticket data is flowing into Metabase, or whichever BI tool you're using, you can start asking questions. For example, you can ask yourself, _"What is our most common ticket reason?"_ or _"Which product areas have the most tickets?"_ These questions will help narrow down which data to focus on, and find the results you're looking for.

If you're using Metabase, you can create a new [question](/docs/latest/questions/introduction) and add it to a [dashboard](/learn/metabase-basics/querying-and-dashboards/dashboards/bi-dashboard-best-practices) to find initial insights, and start tracking trends over time.

![Ticket reason bar graph](/images/posts/4-steps-support-dashboard/ticket-reason.png)

For example, if you notice a particular ticket reason trending week-over-week, you can [click on any point in a chart](/learn/metabase-basics/querying-and-dashboards/questions/drill-through) and select "View these Tickets". _Note: This feature only works with questions built in the query builder, not in native query._

If you're using Zendesk, [ticket type](https://support.zendesk.com/hc/en-us/articles/4408886739098-About-ticket-fields) is a default field that you can use to filter ticket data across ticket reason and areas. Some other default fields that may be useful are "status" and "priority".

![View tickets by type](/images/posts/4-steps-support-dashboard/view-tickets-by-type.png)

To get an idea of how many tickets are considered problems versus general questions in Metabase, you can drill-through to a specific ticket reason and filter by ticket type. Use the summarize button to summarize tickets by _count_, and choose to group by _type_. Sort the tickets in descending order, and visualize as a bar chart.

With a support ticketing dashboard, you can also track ticketing trends, like top 5 ticket reasons or areas, and send weekly reports to your team and company. Metabase dashboards allow [subscribers](/docs/latest/dashboards/subscriptions), so people can subscribe to your dashboard and get updates directly to their email inbox or in Slack.

![Ticket dashboard](/images/posts/4-steps-support-dashboard/ticket-dashboard.png)

## Further reading

- You can send people to a [custom URL](/docs/latest/dashboards/interactive) from a Metabase dashboard. Link batches of tickets using this feature so people can readily access the original tickets.
- You can also use [Metabase Actions](/docs/latest/actions/introduction) to create custom buttons for your dashboard, and forms for feedback. Implement actions to [remove redundant data](/docs/latest/dashboards/actions), or add new data as your support team monitors other channels.
