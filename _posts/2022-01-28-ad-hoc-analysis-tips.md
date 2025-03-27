---
title: "Avoiding analyst burnout: how to streamline ad hoc requests"
summary: "Help your analysts avoid burnout with these tips for handling ad hoc analysis requests (hint: the answer lies in self-service analytics!)."
date: 2022-02-01
last_updated_at: 2022-02-01
categories: "Analytics and BI"
image: /images/posts/avoiding-analyst-burnout_-how-to-streamline-ad-hoc-requests.jpg
author: The Metabase Team
redirect_from: /blog/ad-hoc-analysis-tips
layout: post
---

The goal of business intelligence is to give stakeholders and strategists the information they need to make data-driven decisions. BI analysts can answer questions that help guide some of these decisions, but often someone at your organization will need to perform fast analytics using a number of data sources, and then translate those findings into a readable format that all your stakeholders will understand (not just the data-savvy). That’s where ad hoc analysis comes in.

If managed poorly, ad hoc analysis can be an exhausting process. Each investigation into your data takes time, and BI analysts are often juggling a number of requests at once from stakeholders. The question then becomes: how can we perform ad hoc analysis efficiently, effectively, and without wearing out our analysts?

## Embrace self-service analytics to empower team members to self-serve for ad hoc analysis

The beneficiaries of ad hoc analysis should know how to perform some level of analytics themselves. This doesn’t mean that your marketers or HR people need to have double majored in data science, but they should be equipped with the basic tools and protocols necessary to get the answers they need, without necessarily involving an analyst.

Chris Short, Senior Insights Analyst at Easy Agile, suggests engaging Loom to access tutorial videos that will help team members better understand analytics for their specific use case. “We have a scoring mechanism... where if it's an easy question they should be able to self-serve themselves.” Chris also says that for more complicated queries, his team constructs custom solutions that enable non-analysts to still answer their questions independently.

Ali Bagshomali, founder of Mentat Analytics, agrees that user empowerment is the best way to decrease traffic for BI analysts, “Adding lanes to a freeway is not a good way to reduce traffic. Instead, analysts need to focus on setting things up so that fewer data requests come into their team in the first place, rather than trying to answer as many requests as they can. Sticking with the traffic analogy, the goal should instead be to establish a better public transportation system.”

Ali believes that good documentation and “better tooling, data assets, and training for non-data team members,” will pave the pathway for improved self-servicing in analytics.

## Use a ticketing system for ad hoc analysis requests

Ticketing analysis requests is critical in helping teams track requests from initial inquiry to resolution. Without a ticket, requests can become lost, severely delayed, or even duplicated — slowing down the entire analytics line. Used on their own, Slack channels, DMs, and emails aren’t efficient or organized enough to be effective for handling large volumes of requests.

Self-service analytics and ticketing systems are not mutually exclusive. “Some content produced could then be used for self-serve,” Chris Short says. Jon Udell of Strategies for Internet Citizens describes this as a “virtuous cycle for analytics,” where questions posed by non-data users inform new tooling that helps them and future users answer those questions themselves.

Ticketing is also a great way to track BI team bandwidth, demonstrating to requesters the current volume that the team faces and providing others (including management) some perspective on their workload.

## Train power users from different departments on simple ad hoc analysis

Not all members of non-data teams at your company will have the capacity or the time to learn how to perform ad hoc analysis. But you should train at least one power user from each department as a “data hero” to handle ad hoc analyses.

You may even consider routing ad hoc requests away from the BI department entirely, and insist that these requests be handled by the department who initiated it. If you go this route, you may want your BI team to offer periodical training session that teach ad hoc analytic basics to interested non-data users. Other training resources may include additional online learning opportunities, as well as informative Q&A sessions on Reddit.

## Using canned queries for ad hoc analysis

Over time, you'll probably notice that many ad hoc requests you receive are relatively similar, or make use of the same data. Creating a catalog for common data queries will greatly reduce the time and energy you spend pulling data and running analyses. These canned queries — like [Metabase SQL snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets) — streamline things by allowing you to copy, paste, and edit your queries as needed.

If you want to get started building your canned query database, check out [SQL Cheatsheet](/blog/sql-cheatsheet-simple-sql-commands-to-get-started-in-data-analytics).

## Data dictionary

Similar to creating a canned query catalog, compiling a data dictionary (a dump of metadata) allows you to quick-reference different query components for ad hoc analysis.

You can implement this solution easily using a spreadsheet format with columns for Database, Table, Field, Field Description, and Data Type (among others) to make filtering easier.

## Establish clear procedures with senior leadership for ad hoc analysis

The bane of ad hoc analysis is often a lack of understanding, or a complete dismissal, of request procedures. If requests are sent too often, via the wrong channel, or with inaccurate prioritization, it's easy for them to get misplaced or lost and BI teams to become overwhelmed.

You should have clear and easy-to-follow guidelines in place for submitting requests that allow users to self-determine priority and complexity before submitting. If you do, you'll be able to route these requests to self-service portals as well.

Leadership and managerial staff should have a clear understanding of these procedures and must be accountable to them, and willing to hold their employees accountable to them as well.

## Final thoughts: ad hoc analysis tips

The best you can do for your team and your non-data colleagues is to empower self-service as much as possible. This will reduce the volume of ad-hoc requests you receive, even if a few complex inquiries slip through every now and then. Beyond that, good documentation and a robust database will help your team address requests quickly and easily.
