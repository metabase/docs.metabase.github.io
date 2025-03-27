---
layout: post
title:  "What does anything mean anymore?"
date:   2016-03-02 16:10:58
categories: guide
author: Sameer Al-Sakran
---


If you're unclear about how analytics works, or what the difference between an event log and an events database are, the below should set your straight. Or, at the very least, it will provide a firmly crooked vocabulary which will let you navigate the rest of our guide.

## Analytics vs Business Intelligence vs Data Science

Great news: given the weight of ~40 years of marketing, most of these words are overloaded to the point of incoherence and really just mean whatever the speaker or author wants them to mean. They typically mean different things in different regions and industries. For this purposes of this, we'll settle on the below distinctions:

*Analytics* is the most generic term, though in practice it tends to refer to event or interaction analytics. But it is used pretty generally to mean: using data to better understand the process you're studying and the tools that enable that.

*Business Intelligence* generally refers to the analytics in the context of making business decisions. It usually, but not always, leans towards non-event or interaction analytics.

*Data Science* is equally vague. It started out life referring to the use of machine learning, statistical inference and similar tools to create end user facing features in internet products. Since then it has grown to encompass everything from the work that "business analysts" used to perform, to machine learning, to putting together data infrastructures, to being glorified data janitors. The number of hours spent doing basic data cleansing by "data scientists" with PhD's from MIT/CMU/Stanford/etc is mindblowing.

To keep things simple, if the primary person interested in the system is a product manager or online marketer, chances are it's "analytics". If it's your CFO or business operations folks, let's call it "business intelligence". If there is R, statistics or any kind of complicated algorithm involved, we'll be calling the "data science".

## Databases vs Data Warehouses

First off, you'll often see references to databases and data warehouses. A database can refer to either a stored collection of data, a server that holds that collection of data or the software that runs that server. So for example, you can have an "mobile database" that lives on the "events database" that runs the "MySQL database". Obvious, no? In this case, we've explicitly left out the qualifier that the "events database" is a database server, and that "MySQL database" is the database software. In general, we'll qualify what we mean by "database" but be aware that in both our guide and the big bad outside world, it's used in these ways.

Databases can be used for a wide set of purposes, but we'll distinguigh between "application" or transactional databases, and analytics databases. While a blurry line, in practice it's useful to point out cases where the database in question is clearly one or the other. Transactional databasea are optimized for small writes and reads, and doing things like updating your bank balance when you deposit a check, make a reservation for an airline ticket, or adding a comment to a cat photo on the internet. Analytics databases are optimized for large reads, eg. looking up the average bank balance across the bank's 100,000 accounts, predicting the average lead time before a reservation or analyzing what breed of cat gets the most views.

Data warehouses are a centralized database that is meant to be used for analytics across a company. Typically, they collect data from multiple databases and other sources of data from across a company, and the data is then cleaned and formated for easier analysis. Historically, they were extremely expensive and labor intensive to set up and maintain, but in recent years the availability of fully managed data warehouses such as AWS's Redshift has made them accessible to much smaller companies (read: budgets).

## Events and event processing

It is often useful to make a distinction between event analytics and more common business intelligence. In general, "events" often refers a collection of timestamped records that describe something that happened. The most common example is user interactions with your application. Google Analytics, Mixpanel, Omniture, Flurry, etc are examples of all-in-one analytics providers that primarily deal with event analytics. Early on in the history of the web, the scale of event data and the specialized analysis that was considered foundational resulted in a boom of specialized tools for events. These days, it is common to use large data warehouses and more general Business intelligence tools to do event analytics in a large number of situtations.

Event processing also lends itself to real time analytics, in that you'll tend to want to analyse the events as they come in.
