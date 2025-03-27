---
title: "The Metabase approach to Permissions"
date: 2016-10-11 00:10:58
last_updated_at: 2016-10-11 00:10:58
categories: "Using Metabase"
author: Sameer Al-Sakran
image: /images/posts/the-metabase-approach-to-permissions.jpg
layout: post
---

> In the beginning, all was peace and love.<br />
> Then the barbarians showed up at the gate<br />
> So we built a fence<br />
> But we still want peace and love inside the fence

The Metabase project has had an interesting relationship with permissions and access controls. We’ve simultaneously promoted complete transparency while having extremely strict access control restrictions on the instance we run internally.

First a bit of history — Metabase started out as the internal Expa (www.expa.com) analytics system. During that time period, Metabase had conflicting needs. On one hand, we wanted each company to be deeply data driven, and promoted company-wide access to information, analytics and bottom up discovery. On the other hand, we had a variety of companies with drastically different businesses, public profiles and hence security threat models. Starting out, we went the usual route, and had a fairly generic permissions model. We split off each company into it’s own group and gave that group access to the company’s data in our centralized data warehouse. If you’re inclined towards source code forensics, you can find all kinds of interesting remnants of this in our initial public commits. As we went through the process of progressively locking things down, we ended up deciding that it made more sense to create hard partitions between the data of various companies. User accounts, application data, and the underlying data warehouses were all split up and stored on separate VMs, and the application slowly morphed in response to this.

When we open sourced Metabase, we carried over this rather binary view of the world with the expectation that the primary use of Metabase would be in small companies or relatively homogenous teams within larger companies. As we’ve found adoption in larger, more heterogenous companies, we’ve gotten feedback that this division of the world is a touch … shall we say naive? Some way to control access permissions has been high on the list of feedback from everyone we’ve talked to. There have been numerous, widely voted, issues on github related to access controls. People have literally called us on the phone to request this.

At the same time, the team has been a bit reticent to just “slap a bad version of LDAP on it”. From the inception of the project, we had a strong desire to ship an application that is simple, elegant and easy to use, install and administer. To the end of making our eventual permissions system satisfy those goals, we decide to try to collect as much information as possible about the various scenarios our users had that required access controls. We’ve had lots of conversations on github as well as in person, and have been slowly synthesising a solution to these underlying problems.

We’re happy to say that starting with our latest version (0.20), we’re rolling out a permissions framework that can be used to provide controlled access to data.

At its core, the permissions framework we’re shipping in 0.20 is simple — you can assign users to groups and you can give groups access to data. Groups can have restrictions on databases, tables and raw SQL access. Metabase will figure out which dashboards, questions and pulses a given user can see based on their groups data access permissions. In short we focus your attention on what data the user has access to as opposed to which dashboards they can view. Why are we doing this rather than giving you direct control over who sees which dashboard or question directly?

When locking down a Metabase installation, we think you should add the minimal number of controls required that secures the data you want controlled while at the same time letting your end users still ask (and answer!) their own questions.

Applications that focus on controlling access to specific artifacts, invariably tend to result in a company where 99% of the reports are built by a few analysts who have access to the underlying data required to produce anything useful. While this works reasonably well for top-down information distribution in a company, it kills bottom-up discovery. It also has the unpleasant side effect of flooding the analyst pool with ad hoc requests for data pulls and reports.

At Metabase, we are strong believers in constructive laziness. By spending a bit of time up front, partitioning off and preparing data for the various groups in your company you can make it so your end users answer a large number of the ad hoc questions that otherwise tie up your engineers and analysts. This leaves your analysts, data scientists and engineers free to do more valuable things — build scalping bots to get tickets for Hamilton, spending time with their families or under extreme circumstances even performing deep, insightful analyses of your business.

Over the next few releases, we’ll be adding other ways of further locking down your instance. We’ll be extending the power of user group and provide more powerful permission tools. We’ll be introducing ways to help you lock down specific questions/dashboards as well, though we’d strongly recommend that you do what you can to giving your end users room to discover, ask questions and help each other.
