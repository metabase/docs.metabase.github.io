---
title: "Tools for building trust"
summary: "Official Collections and Question Moderation help people find intelligence they can rely on."
date: 2021-11-17 00:12:18
last_updated_at: 2021-11-17 00:12:18
categories: "News"
image: /images/posts/tools-for-building-trust.jpg
author: The Metabase Team
redirect_from: /blog/official-collections-and-verification
layout: post
---

One of the things that happens when you roll out Metabase to your organization is that people start asking a lot of questions. This is a good thing. You want to cultivate a data-driven culture, which means you need to give people the tools to explore your org's data whenever they want, without getting blocked on a backed-up data or engineering team for the answers. After all, each team owns the business logic specific to their domain, and not all questions or dashboards need to be (or should be) official, verified analysis. In fact, if all your questions are strictly regimented and triple-stamped, you're unlikely to develop a data-driven culture and you'll miss out on crucial insights.

But sometimes you _do_ want official, verified analysis. When your Metabase accumulates a boatload of questions and dashboards, it can be tricky to trust which questions have been vetted by someone who knows the business domain and has confirmed the numbers, versus someone who just spun up a quick question three months ago. Does Jerry _really_ know how we should calculate net revenue retention? Where are the dashboards the Data team made? Who signed off on this?

These problems of data governance are what we wanted to address with two new tools available to our paid plans: [Official Collections][official-collections] and [Verified items][verified-items]. In the spirit of Metabase's larger goal to "enable laziness" when dealing with Business Intelligence, both Official Collections and Question Moderation are lightweight tools that you can use a la carte to elevate those questions and dashboards that your org needs to get right.

## Official collections

![Official collections](/images/posts/official-collections-and-verification/official-collections.png)

Let's start with [Official Collections][official-collections]: which are collections that Admins decorate with a handsome yellow badge to signify that the questions and dashboards in that collection are the go-to resources for that domain. Think of your Official Collections as the canon of your analytical artifacts. But it's not just that Official Collections get a yellow badge: these collections (and their contents), are more likely to show up in search results, making them easier to discover when someone searches for something like "Recurring Revenue."

![Items in official collections bubble up in seach results, making them easier to discover](/images/posts/official-collections-and-verification/search-results.png)

You can have Official Collections that contain unofficial but related collections, or official sub-collections as well. You can also designate a sub-collection as Official, even if its parent collection isn't. For example, you may choose to create collections for each of your teams, and within each team's collection, you could have an Official Collection that gathers that team's important, day-to-day analysis, as well as a bunch of unofficial collections that house ad hoc questions and dashboards related to various sub-domains.

## Question moderation

![Question Moderation](/images/posts/official-collections-and-verification/verified-question.png)

In this sense, Official Collections are about _wayfinding_, whereas [Verifed items][verified-items] are about _workflow_. Verified items are another lightweight tool that allows administrators to put a checkmark next to the question's title to signal that they've verified that the question is correctly stated and that it returns the expected results. If someone wants to get another pair of eyes on their work, they can simply send a link to a question to an admin and have them review and sign off on it. You can view a history of a question to see what changes were made; if anyone modifies the question and saves those changes, the question will lose its verified status. Like Official Collections, verified questions are more likely to bubble up in search results.

Calling attention to something isn't the same as verifying it, though there can be some overlap. You can have something in an Official Collection that hasn't been verified, and vice versa. Maybe you have a one-off report that details an incident or period of time that doesn't really fit the day-to-day requirements for an "Official" dashboard, but nonetheless the data is a bit wonky and you want to make sure someone who knows the domain has confirmed you did, indeed have record-breaking revenue during that sale.

We'll be adding [more features in the future][roadmap] to help manage large Metabases, so stay tuned. In the meantime, check out [Keeping your analytics organized][same-page].

[official-collections]: /docs/latest/exploration-and-organization/collections#official-collections
[verified-items]: /docs/latest/exploration-and-organization/content-verification
[roadmap]: /roadmap
[same-page]: /learn/metabase-basics/administration/administration-and-operation/same-page
