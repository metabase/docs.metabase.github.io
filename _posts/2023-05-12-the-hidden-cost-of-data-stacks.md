---
title: "The hidden costs of the data stack"
summary: "An incomplete list of the less obvious costs associated with maintaining a data stack, and some things you can do to keep those costs under control."
date: 2023-05-12 00:10:18
last_updated_at: 2023-05-12 00:10:18
categories: "Data explorations"
featured_image: /images/posts/hidden-costs-of-the-data-stack/hidden-costs.jpg
image: /images/posts/hidden-costs-of-the-data-stack/hidden-costs.jpg
author: The Metabase Team
layout: post
---

We present here an incomplete list of the hidden costs associated with maintaining a data stack. And by data stack, we're loosely talking about a modern data stack composed of roughly a:

- Data source layer (an operational/production database and third-party data sources)
- An ETL layer that wrangles all of that source data into a data warehouse
- A storage layer (data warehouse)
- A query layer (BI tool)

This article isn't meant to provoke FUD (fear, uncertainty, and doubt); we just thought it'd be useful to spotlight some opportunities for managing costs. We're not listing these costs in any order, as the magnitude of the costs will differ org to org, so you may choose to address some costs but not others. We'll cover the problemspace first, then explore different ways you can mitigate these costs.

## Hidden costs

### Training and learning curves

An often overlooked cost is that the tooling in your stack will incur some training overhead. That, or you pay higher salaries for people who've already mastered some tool or stack layer. This overhead is particularly relevant to your BI tool, as the BI tool–the window into your data stack–will have the largest pool of people using it, each with various levels of experience.

The other thing to call out here is that learning curves impose two different types of costs. The first cost is the time needed to train staff in these tools, either through _active_ training (you're hosting training sessions with people), or _self-directed_ training, where you expect people to read the docs, figure stuff out, and learn-by-doing.

The second cost, adoption failure, can be more subtle: if the tool is difficult to learn, people won't bother to learn the product in a way that makes them productive. Or, worse, they won't bother to learn the product _at all_, and you end up paying for a license that generates zero value for your organization.

### Iteration lag

How fast can teams iterate on their own reports? That is, how fast can you update reports based on new information (whether that new information stems from a change in market, or a newly instrumented event in your product)?

Concretely what we mean is that, if for every "build" of your data stack (and here we're talking about the ETL layer that "builds" your data warehouse), you need to process the whole table, the cost to iterate on making changes to that build is nontrivial.

If, after making a change, you get feedback from the people who are analyzing that data that some data looks off, or that you need to incorporate _more_ data, adding or changing a couple of columns to a model can cost you a noticeable amount of money in payroll and cloud costs.

### Zombie ETL jobs and reports

People create and schedule reports. Then they move on to create new reports, and schedule those. They stop checking the old reports, and yet the old reports keep running, even as you hire more people, who create and schedule more reports... The problem is, most cloud database providers charge per query, so you end up paying for analysis that you don't take advantage of.

### Bus factors

While not specific to data teams, data and team silos are prone to "knowledge resets" when experts on those teams leave the company.

### Caching costs

Caching is largely a cost saver, but some solutions require caching your data in a separate database, and then charging you for it. Maybe that cost is worth it, maybe not.

### Lack of extensibility

BI tools should be able to work well with tools your team are already familiar with. For example, you could just use Metabase to model your data, and then let people use whatever they want to create reports. If some people are more comfortable with spreadsheet software, they can just export data from Metabase and analyze it in the spreadsheet software of choice, and that's totally fine. The issue is when tools _force_ you to use them.

### Maintaining multiple sources of truth

Storing the same-ish data in multiple places can cause two problems: the first problem is that you can end up wasting time figuring out which data you can rely on. The second, related, and more damaging problem is that you can end up making decisions based on the wrong or incorrect data (wrong meaning you should be using other, more relevant data, and incorrect meaning the data itself is inaccurate or incomplete).

### Account tier juggling

Minor, but a hassle nonetheless. Because some plans offer different types of accounts, with different abilities at different price points, you have to deal with how to dole out those abilities. Some creator licenses can be 10x of a base account, so you have to burn time to figure out who gets licenses and why, and when to increase or decrease the license count as your business changes.

The other thing with these tiered accounts is that, because only some account types are allowed to create reports or make changes, they guarantee that you build bottlenecks into your workflows (think: ad hoc request queues).

## How to keep data stack costs down

Here is a nonexhaustive lists of actions you can take to mitigate the issues outlined above. Each suggestion can help to reduce one or more of the costs listed above.

### Use a tool that doesn't _require_ SQL to query your data

You definitely want a tool where you can use SQL, but you also need a way to get people to interact with data who don't know SQL. And the more intuitive the query builder, the faster people can ramp up on the BI tool, and that means more people will actually _use_ the software you're paying for.

### Host training sessions and data sharing

These training sessions don't have to be formal. Just get people together and have them learn by making dashboards relevant to them. Once people get the hang of the tool, and understand what data is where, you only have to hold training sessions for new hires.

And you can't merely train on the tool; you have to show people what data is available to them and where. If the tool is any good, it _should_ have plenty of documentation and learning resources. But if people don't know where to find data relevant to their domain, that know-how is wasted.

### Document your data

Speaking of training: data documentation is part of your company's core infrastructure, but, yeah, okay, good luck with this. Your data will probably only get documented if you assign people to do it; that is, you'll need to ticket the work and actually get it over the line. If you don't yet have the resources to do this work, you can try some forcing functions that might at least get _some_ of the data documented. You could for example, rotate spotlighting certain models or reports at team or company meetings, which can motivate people to actually write the stuff down (e.g., fill in column descriptions, add context to dashboards, etc.). Documenting your data may appear sisyphean, but every little bit helps, and those docs will pay dividends in terms of knowledge-sharing, onboarding, and decision-making.

### Periodically prune scheduled reports

Some tools come with auditing tools that can tell you how often scheduled reports are run. If you suspect people aren't checking some reports, archive them and see if anyone complains. And even if they do complain, talk to them about running the report less frequently, or turning the report off completely and just have people run it when needed.

### Make it easier to build, maintain, and modify models

Make it easy for every team to curate their own data sets. These teams know the domain the data describes, so they are in a good position to identify which data's relevant versus which isn't.

A useful distinction here is the difference between foundational models and reporting models.

Ideally you have a set of foundational models: your cleaned-up, relatively raw data curated by a data team or analyst or engineer. The data in these models is clean and correct, but not yet curated for specific domains. Changes to this models should be infrequent, as they are probably expensive to make.

Reporting models are the downstream models that teams can build and update to respond to the questions they need to answer. These models are lightweight and flexible. They're cheaper to make, and while they can be verified by analysts, they're not gated by them.

This section merits an entire article, so we'll just stop here for now.

### Avoid tools with tiered accounts

If you want to tighten the reins on who can do what, that should be a permissions issue, not a pricing issue. One of the reasons we (Metabase) have adopted the tiered product model (free vs Enterprise/Pro) is because we believe that the account tier model is _annoying_. Metabase is not unique here, but in general, if you steer clear of software that doesn't make you figure out which people you want to pay more for, you incur less overhead.

### Distribute your data team

If you have a deep data bench, embed analysts with teams to develop domain expertise, and to help the teams learn how to create the reports themselves. Ideally, data analysts should be teaching and vetting the reports of others as much as they write reports themselves.

### Upgrade cautiously (or have someone else do it for you)

Only upgrade tools if you would benefit from the new features. Or (better) de-risk and save time by outsourcing the upgrades to a service. If something goes wrong, it's not your problem.
