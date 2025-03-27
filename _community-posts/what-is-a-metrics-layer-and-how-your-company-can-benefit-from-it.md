---
title:  "What is a metrics layer and how your company can benefit from it"
redirect_from:
  - /community_posts/what-is-a-metrics-layer-and-how-your-company-can-benefit-from-it
meta_description: The metrics layer can be that central, single source of truth for how metrics are defined in your organization.
date:   2022-05-09 10:10:58
image: /images/community/what-is-a-metrics-layer-and-how-your-company-can-benefit-from-it.jpg
read_time: 4 minutes
category_filters: "Strategy,Data culture"
organization: Keller Williams Realty International
organization_url: https://www.kw.com/
author: Chris Nguyen
author_img: /images/community/chris-nguyen.png
author_bio: Chris is a Business Intelligence Analyst at Keller Williams Realty International, a real estate franchise and technology company headquartered in Austin, TX USA. In his spare time, you can find him cooking something fun, attempting to declutter his life, reading, or fulfilling his inner completionist in a video game. You can find Chris on [LinkedIn](https://www.linkedin.com/in/christopher-lee-nguyen/){:target="_blank"} and read more on his [blog](https://medium.com/@datadissectiondr){:target="_blank"}.
---

## A sign that the metrics layer is needed

*“The number of users is different on dashboards A, B, and C. Can you explain what’s going on?”*

*“The definition of this count is outdated in this report. Can we get this fixed ASAP?”*

These are examples of common questions that I have been asked as a Business Intelligence Analyst on a weekly, if not daily, occurrence. It’s a sign that metrics have gotten out of control and is creating chaos for end-users of the data who have to make decisions based on them. This creates more work for the data team even though we were the ones who created it. As the business grows and changes, so do the metrics it tracks. And as the data it collects grows richer, so does its complexity.

Consider the basic scenario of counting users. Sounds easy enough to do, right? But here are some common questions I’ve had to face on the job:

- What time frame do I count users in? Daily? Weekly? Monthly?
- Do I split by geographic area? How is that defined (state, county, MSA)?
- How do I know if I have duplicates when counting users? At what grain level do I deduplicate?
- I only want active users. How do I determine if a user is active? Is there a flag column or do I consider a user inactive if there have been no transactions after a certain amount of time? What is that certain amount of time?
- Are there other flags or filters in the data I need to be aware of when counting? Do I turn them on or off?
Countless more caveats depending on your domain.

In analytics, counting things is actually pretty hard. When the numbers are off for what should be the same metric on multiple consumption outlets, users start losing trust in the data and it becomes a headache for the data team to track down exactly what happened.

### What is a metrics layer?

But there’s a growing solution in the space: the concept of **a metrics layer** (other terms for this are headless BI or metrics store).

You know how Github is the central repository for where a project’s codebase is? Or how the data warehouse is the single source of truth for data? The metrics layer can be that central, single source of truth for how metrics are defined in your organization.

![a schema showing how the metrics layer is placed between your data warehouse and a BI tool](/images/community/metrics-layer.png)
The metrics layer should lie between where your data is stored and how it is consumed for a unified definition

Your organization has multiple dashboards. It may have multiple business intelligence (BI) tools too. Do you really want to define the business logic for your metrics every single time in each of those outlets? What if the logic changes as the business grows? That increases the chances of one instance being slightly off or out-of-date by the time someone looks at it and makes a decision. But a single, agreed upon definition that is used in multiple places solves that dilemma and is a great example of the DRY principle (Don’t Repeat Yourself).

### How do you start out defining a metrics layer?

It doesn’t have to be a fully engineered feature at first. Start out by just defining how the metric should be calculated. Write out a SQL query or series of steps used to create your metric and save it in a place multiple users can reference and give input (careful of copying and pasting code into various tools though). Then move it to a place where multiple tools can access the definition. You could create a table or view based of the SQL query and store it in the data warehouse.

When you’re ready, define a metrics layer where you can share metrics from a centralized location (at the time of this writing, Metabase has this in a soon upcoming feature). Some tools allow various BI solutions to connect to an API to access metrics and let you swap them out while keeping the metric definition intact (hence, the “headless BI” term).

## How do you define a metrics layer?

Multiple tools can aid in your attempt to fill in this missing piece of the modern data stack. The general outline is:

1) Determine what metrics you want to track. Sounds simple but as I outlined in the beginning example, it can get out of hand fast. What do you want to measure, how do you want to aggregate, and what dimensions will you want to slice the data by? Do you want to include any filters/constraints in the metric?

2) Depending on your tool of choice to implement the metric layer, you’ll need to define these configurations. In some tools you will set these definitions in a YAML file.

3) Now that you’ve defined your metrics, it’s time to test them. The flexibility of the metrics layer means that instead of pre-aggregating every single possible combination of measures and dimensions, you just define the possibilities instead and let the tool handle it so that you get the same numbers in the end no matter who pulls the metric in whatever BI tool you use. An API provided by the aforementioned tools can be used to pull the metrics.

The metrics layer is an exciting development in BI and can solve so many headaches and repeat questions for your analysts. Instead of locking away definitions and repeating complex business logic across all your data consumption tools, try defining the “single source of truth” for metrics in your organization!
