---
layout: learn_article
date: 2015-12-22 16:10:58
categories: jekyll update
image: /images/twitter/default.png
author: Sameer Al-Sakran
redirect_from:
  - /learn/data-diet/analytics/analytics-mistakes
  - /learn/analytics/analytics-mistakes
---

This article covers ten common mistakes startups make when applying data to decision making. These are situations that many well-intentioned people will find themselves in, and the goal in going over these is not to get down on yourself but to reinforce the need to be self aware in your (and your organization's) decision making processes, and constantly work on improving. We cover more on decision-making in [Managing your information budget](information-budget).

## 1. Mixing up correlation and causation

Yes, you already know about it, but it's still really easy to fall for. Mixing up correlation and causation is especially dangerous when [exploring historical data](/learn/metabase-basics/querying-and-dashboards/time-series/start), or otherwise not having a clear hypothesis to falsify. It's best to treat any common patterns that happened in the past as _suggestive_ of causation, rather than as a cause until proven otherwise.

## 2. Expecting data to give you answers to questions you can't formulate

Too many companies think they can just collect data, use the latest trendy technologies, and hire expensive data scientists/analysts/MBAs to figure out their business. The reality is that the quality of your business intelligence is directly proportional to how well your organization can articulate the questions it needs to answer. More data and talented data analysts can supercharge an organization that has a clear decision and product process, but doubling down on big data won't be the miracle that saves an organization that lacks focus.

## 3. Looking for data to support a decision you already made

It's common to go through the motions of collecting data, analyzing it, and coming to a decision when you (or others on the team) have already made up your mind. Instead, you should formulate hypothesis, see if you can falsify them, and update your perspective when the data goes the other way.

## 4. Fishing for the positive

A subset of looking for data to support a decision: looking for data to support a rosy picture. There's always something that is trending upwards, even in terminally ill companies. If all the metrics you think are important are going south, avoid the temptation to seek out metrics that tell a sunnier story.

## 5. Expecting too much clarity in results

Even if you've seen plenty of action movies, when you watch an _actual_ boxing match, you might not be able to make much sense of it. If you're used to seeing choreographed fight sequences, shot from perfect angles with perfect lighting and editing, the chaos and speed of real-life fighting can be bewildering.

The same goes for people accustomed to MBA coursework or highly idealized blog posts when they encounter quantitative decision-making in real life. In the real world, effects can be small, messy, and multimodal (we'll talk about pitfalls of averages below). You'll need to work with the data you have, not the perfect data you imagine.

## 6. Expecting to A/B test your way to success

While carefully planned, well-run A/B tests can be transformative to a company, they also often lead to chasing one's tail. Make sure you know what a significant result is _before_ you start an A/B test. Don't stop the test the instant one of the options seems to be performing better, and always include a control group. And the smaller the effect, the larger the number of users you'll need. If you only have 10k monthly active users, you would be better off simply delaying any kind of A/B testing until you have more people you can test against.

Furthermore, A/B testing won't determine the best product features or advertising copy for you. The results are only as good as the options that you test, and the results are very sensitive to how good the initial design is. Don't let "we'll A/B test that" become a mantra that shuts down the process of deciding what your product actually is. A/B tests are best used to add that last bit of polish.

## 7. Using the wrong time period

If your customers purchase on a multi-month time frame, and your product cycle moves in two-week sprints, you don't need real-time analytics. Likewise, if you're trying to diagnose errors in network operations where the cost of being down is measured in tens of millions a minute, you better not be looking at hourly charts. It's important to tie the reporting time period with the natural time period of your decision-making. If you're looking at your data at too fine a time period, you'll end up being twitchy and thrashing between decisions. If you're using too large a time period, you'll forever be three moves behind.

## 8. Only looking at averages

Averages are a great place to hide uncomfortable truths. If you only use blended averages across organic and paid channels, you might end up ignoring the fact that your paid acquisition channels are becoming unsustainably expensive. If you look at average latency across all your web pages, you might not notice that your most important pages are getting slower over time. As a rule, when averages tell you something is getting worse, it's time to worry. When averages tell you things are looking good, it's time to dig deeper.

Most average-inspired delusions go away when you break the data out into a [histogram](/learn/visualization/histograms). For example, rosy projections regarding the average cost of customer acquisition can disappear when you break the costs out by channel.

## 9. Focusing on totals instead of the rate of change

Everyone loves charts that go up and to the right. "Total number of signups", "Cumulative revenue", and "Total value of goods sold" can make for good press, but for most situations, you should be looking at the [rate of change](/learn/metabase-basics/querying-and-dashboards/time-series/time-series-comparisons), and possibly even the growth in that rate. If 95% of the information a metric carries relates to events that happened months or years ago, does that help you evaluate how you're doing today? Or how things will look tomorrow?

## 10. Not evaluating the results of a decision

It's common to want to collect lots of information before making a big decision. However, once you make the decision, and the results start to trickle in, it's common to just assume things are going well. Bad decisions are inevitable, but it's the bad decisions you don't accept and correct that end up hurting you the most. It's better to understand that you made the wrong call right away than it is find out you've been wrong for months.
