---
layout: post
title:  "Understanding Data Models"
date:   2016-03-02 16:10:58
categories: guide
author: Sameer Al-Sakran
---

## Understanding data models

In the vast majority of cases, there is a significant difference between the mental model you have of the business and the model represented in the database.

There are lots of good reasons for this -

* Schemas that are very tied to how data will be analyzed isn't very efficient when used for an application database
* There can be multiple sensible data models of the business depending on perspective
* Models that work well for analysis aren't as easy to keep consistently correct

## How this works with lots of resources

There is a tendancy to optimize the initial data model for getting the application out the door. Then as the system runs and scales the data model tends to change to allow for scalability (in either raw data, complexity of the problem or both). Eventually the data model is entirely unsuitable for direct access by analysts.

The analytics team or the engineering team will task dedicated data engineers to extracting data from application databases.

The difference between the data model as produced by the application and the mental model of the business in an analyst's mind is smoothed over by a team of highly skilled engineers who write transforms. I.e. at large, sophisticated tech companies this team can number in the 10s of engineers.

This is not something to try to emulate before you have the engineering resources to do so. Large companies are able to deal with data models that are very disconnected from the mental model because the the payoff in efficiency outweighs the cost of resources to bridge the gap. Early on, you won't see much of an impact on the bottom line in the increased efficiency, and won't have the engineering resources to cover the gap.

## Recommendations

Take analytics needs into account when deciding on data models early on.
Make sure the engineering team looks ahead to the consequences of data model changes on common queries.

### What you can expect

Expect to spend 1/2 to a full Full Time Engineer in time to clean things up. Emotionally (and financially) budget that now.
Accept that some metrics will be hard to get out unless you make an effort.

### Worthwhile exercises

​* Create a list of core metrics and common reports

* Go through the list of core metrics and common reports and actually try writing the SQL statements for each. This will help shed light on changes we could make to our database to make these questions easier to answer.
* Setting up Metabase and allowing a non-technical user to try to answer as many questions as possible without SQL

## The Mongo Problem

* Mongo is very popular among developers because using it feels more like programing than dealing with databases
* Mongo removes many of the time consuming requirements of defining a data model up front, you can throw anything you feel like

### Resulting Problems

* Mongo documents are often deeply nested
* Mongo documents are not required to be the same shape
* Mongo documents don't have the same consistency guarantees as SQL databases, eg a `time` field can have multiple formats

### Using Mongo for Analytics vs Using Analytics tools with Mongo

If you haven't used Mongo before, some of this no doubt sounds strange. Many of the most compelling use cases for mongo are in the analytics space.

There is however a difference between using it as an object store for powering custom analytics and using it with third party tools. In the former, the lack of an enforced structure makes it fast and easy to get started and the lack of enforced structure isn't a problem as the same team that writes events typically processes them using known conventions. When using it with a third party tool, this lack of structure turns into a drawback.

### The upshot

If you are using Mongodb, it is very likely that the underlying data model will be difficult to use with Metabase (or any other tool). You will likely need to do a bit of transformation to get all the questions and metrics you want from your data.
