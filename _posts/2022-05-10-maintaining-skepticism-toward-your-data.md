---
title: "Maintaining healthy skepticism toward your data"
summary: "Your data isn't infallible, but it takes practice to get comfortable interrogating that data when you get an unexpected result. Learn how you can hone your data intuition and keep cool in the face of fluctuating numbers."
date: 2022-05-19 00:12:18
last_updated_at: 2022-05-19 00:12:18
categories: "Analytics and BI"
featured_image: /images/posts/maintaining-healthy-skepticism-toward-your-data.svg
image: /images/posts/Maintaining-healthy-skepticism-toward-your-data.jpg
author: The Metabase Team
redirect_from: /blog/maintaining-skepticism-toward-your-data
layout: post
---

If you're not someone who spends their days knee-deep in data, it can be easy to operate under the assumption that those numbers you see on a chart or [dashboards](/glossary/dashboard) are infallible and would never steer you wrong. The more familiar you get with that data, however, you'll realize this isn't always the case. In fact, we think it's a _good_ idea to be a little skeptical about those numbers.

We’re certainly not telling you to throw facts out the window, but we all know that data can be misleading, contain errors, and reflect [biases](/blog/6-most-common-type-of-data-bias-in-data-analysis). What’s important is getting to a place where you’re comfortable enough with your data to know when something seems off, and knowing how to react when it does.

## Keep your cool when data fluctuates

As your company grows, you'll target different audiences, test new features, and adjust priorities, and you're going to have some panic-inducing moments where the data — customer sign-ups, retention, revenue projections, or some other [metric](/glossary/metric) — shows you something you weren't expecting to see.

Try to keep a cool head when it comes to those dips and spikes. Sure, you want to respond to signals as soon as possible and course-correct when necessary, but thrashing in response to every slight change is no way to make decisions. Ask yourself these questions:

1. Is something actually [broken](/community-posts/how-to-fix-broken-dashboards) in the data pipeline, like a lineage issue or time zone error?

2. Is your problem one of interpretation? Maybe you've misread or misconstrued the chart, and that spike doesn't actually mean what you think it does. Consider checking or creating related metrics that could frame those numbers from a different perspective.

3. Is this actually just an unexpected result?

Truly surprising results happen, but it's a good idea to confirm the underlying data before changing course. That level-headed reaction is even more crucial when numbers are looking suspiciously great, so don't get complacent based on numbers alone. And for smaller companies just getting off the ground, know that your data will become more reliable over time, as you collect more of it, refine how you capture information, and develop a clearer sense of which numbers matter versus which are background noise.

### Example: volatility of net promoter score (NPS)

Probably a familiar metric, your net promoter score (NPS) measures customer satisfaction based on a single question: "How likely are you to recommend our product to a colleague?"

And while NPS is a helpful signal, the metric itself can be extremely volatile. Your company's NPS may swing from one end of the spectrum to the other due to factors like a change in sample size from week to week or adjustments you've made to the length or substance of your customer survey.

With a metric as seemingly straightforward as NPS, it's easy to take one look at a low number and jump to catastrophic thinking. Moving away from strict averages is helpful here, in favor of a rolling average that tracks NPS over time. You may also want to build out a visualization (like a [bar graph](/glossary/bar-chart)) that can demonstrate how reliable your NPS is based on the number of surveys you've received in the most recent month or quarter.

## Honing "data intuition" takes time

That healthy skepticism toward your data won't develop overnight, and it'll take practice and trial-and-error to strengthen that intuition muscle. Practice means spending time with qualitative research in addition to your numbers, like getting to know your users and your product. Take time to understand the ebb and flow of your data too, like if particular metrics fluctuate according to where you are in the quarter.

If your organization has a data team, developing a relationship with those data scientists and analysts can go a long way in helping you become more comfortable with the numbers. They'll know those numbers (and how they got there) better than you do, and can suggest new ways to track or visualize complicated metrics or offer crucial context you may be missing. So tap into their expertise, and learn what you can about the data sources your company relies on and how they're modeled.

Have advice on how to hone your data intuition? Let us know on the [Metabase forum](https://discourse.metabase.com/t/metabase-blog-maintaining-healthy-skepticism-toward-your-data/20198)!
