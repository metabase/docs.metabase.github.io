---
layout: learn_article
date: 2022-01-06 10:10:58
categories: Analytics
author: The Metabase Team
redirect_from:
  - /learn/dashboards/editing-dashboards
  - /learn/metabase-basics/querying-and-dashboards/dashboards/editing-dashboards
---

To keep your most important dashboards relevant, schedule time to review and revise them on a regular basis. Maybe every couple of months or so, or in sync with the planning cadence of your company (e.g., if you plan quarterly, make sure that you're still tracking the right stuff, since the dashboards are bound to inform the initiatives you prioritize).

Given that the kinds of information dashboards monitor will differ org to org, discussing how to revise dashboards can be a little abstract. So to prime your thinking about what and how to revise, here are some reasons why you should regularly revisit dashboards, as well as some questions to ask when revising them. You don't need solid answers to all of these questions, they're just meant as prompts for your thinking.

## Why you should regularly edit dashboards

### You'll be more deliberate in what you track and why

This is the biggest reason. Revisiting dashboards is a chance to vet your strategic thinking. Regular assessment of what it is you're tracking ensures that you're not stuck with your thinking from however long ago you first made that dashboard (or for that matter _someone else's thinking_). Measurements like tracking Key Performance Indicators (KPIs) can help get an org marching in the same direction, but is it the right direction?

- Do these charts and tables still show you how you're making progress in the direction you want to be going?
- Are the KPIs still key?
- Does the dashboard uncover the risks you're facing?

### It's an excuse to get feedback and make sure people know about the dashboard

You probably have an excellent brain. But what do other brains think about the story your dashboard is telling?

- Who is looking at this dashboard?
- What do they think about it?
- Does the dashboard give them insight into the org's (or their) performance?
- Who has started at the org since you last updated this dashboard? Do they know about it?
- Are all the relevant people [subscribed to the dashboard][dashboard-subscriptions]?
- Does the subscription cadence make sense?
- Should the results be sent to a Slack channel?

### Priorities will shift over time

Things happen. You, your product, your org, and the realities of your market and your customers are going to change over time. Maybe you've even solved some of the problems this dashboard was meant to illuminate, so you'll need to make sure the dashboard reflects your updated priorities. Then there's Goodhart's Law to guard against: when a measure becomes a target, it ceases to be a good measure, so don't mistake the numbers on your dashboard for your goals (or reality). They are just a way you've sliced up the data the last time you took a look at the available data and the challenges you were facing.

- What's changed since you last updated this dashboard? Any new risks or opportunities?
- How has customer behavior changed since you last revised the dashboard?
- Any new competitors in your market? Does the dashboard speak to that new competition?
- Are you still tracking the right [measures and dimensions][measures-dimensions]? Are there other numbers that might illuminate conversion, retention, and so on? Are there other attributes your customers have that could help differentiate their needs (referrers, location, industry...)?

### It keeps you focused on priorities

If you keep returning to and refining a dashboard (or set of dashboards), you'll make sure you're actually checking the dashboards and keeping track of your progress. And if you've assembled the right questions for these dashboards, that means you're enforcing focus on what really matters for your organization. A side benefit of refining a small set of dashboards over time is you're not spinning up ad hoc dashboards that steal that focus, which means your BI tool won't get cluttered with a bunch of unmaintained dashboards. (Outdated dashboards are easily weeded out via archiving, but at least you won't waste effort creating dashboards that take your eye off the ball).

- Are you missing any questions?
- Can you remove any questions? Are you tracking anything that doesn't matter any more (or matters less)?
- Should a subset of the dashboard be expanded into its own dashboard?

### Experience will teach you better ways to measure your progress

As you develop expertise in your domain, you'll likely change your business in such a way that you're collecting more (or different) facts, and you should tune your dashboards accordingly. And experience here doesn't need to be _your_ experience. You may have hired someone who will bring a new perspective and some ideas for how to make progress toward your goals.

- Is there any new data you could incorporate?
- Are you missing any possible comparisons?
- Are the queries returning what you expect? That is, are they accurate?
- Is any of the data skewed by errors or test data?
- What are other teams tracking and why?

### It's a chance to develop and refine your skills

Lastly, tuning your dashboard is a chance to develop your expertise with your BI tool, and the better you know your tool, the better stories you can tell about the data. And the best data stories tend to be choose your own adventure. Make sure your dashboard can anticipates the questions the dashboard will prompt, and give people the tools to find those answers.

- Can you make the [dashboard faster][faster-dashboards]?
- Are these charts the right way to [visualize the data][viz]?
- Should you even have filters?
- If so, are they the right filters?
- Do the default filter values make sense?
- Are any cards not wired up to the filters?
- For chart-to-chart comparisons, are the axes the same?
- When you click on a chart, does it do what you expect?
- Should any charts link to other charts or dashboards for further exploration?
- What about linking to third-party apps?
- Any events you should note on a text card that would answer anticipated questions?

Check out our article on [dashboard best practices][dashboard-best-practices].

[dashboard-best-practices]: /learn/metabase-basics/querying-and-dashboards/dashboards/bi-dashboard-best-practices
[faster-dashboards]: /learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster
[measures-dimensions]: /learn/grow-your-data-skills/data-fundamentals/dimensions-and-measures
[viz]: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
[dashboard-subscriptions]: /docs/latest/users-guide/dashboard-subscriptions
