---
layout: learn_article
date: 2022-01-17
categories: guide
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/analytics/avoiding-data-jargon
---

It's easy to fall into the trap of using the word "data" and other analytics jargon as ambiguous placeholders for what you really mean, like a dumping ground for miscellaneous information you haven't quite figured out how to articulate.

"Data" means different things to different audiences. Your engineering, legal, and marketing colleagues all have different ideas of what data is, and they're all correct. To cut through this confusion, it's important to be specific when talking about the fields and rows that make up your databases and the information you need to validate decisions. Sticking with straightforward and precise language will help your team form a clearer idea of what information you already have, what questions you're looking to answer, and how answering those questions will help people make progress toward your goals. And the better people understand your new analytics strategy, the more interested they will be, and the more they'll contribute to it.

There's a certain irony to the guidance we're providing — yes, this is all _broad_ advice about how you should be _specific_ when figuring out how analytics should work at your organization, but stay with us here. And no, you probably won't stop using the word "data" entirely, but you can try to avoid ambiguous analytics corporate-speak whenever possible.

## Create specific language and shared definitions

Most people at your organization have a strong mental model for how the "data" all fits together, even if they wouldn't think so themselves. They draw on that mental model whenever they do their job, whether that's in sales, marketing, or another department. Mapping these mental models of the business to information that you can analyze is a fundamental step of getting analytics up and running, like figuring out how the organization defines "customers," what qualifies as an active customer, a returning customer, a good customer, or a churned customer. Going from thinking about how your business works to building instrumentation that validates that story is a challenge for any growing organization, so try to think about how people can translate these mental models into data points that can be captured and scrutinized; literally, what is it that you want to count, average, or sum, and how?

Working across departments to develop these shared definitions gives people some stake in the process, and ensures that analytics at your organization [stay organized](/learn/metabase-basics/administration/administration-and-operation/same-page). And in the future when you talk about active customers, the people around you will know what that term means, and can use your analysis of what those active customers are doing to inform their decisions.

Simply put, people will get behind your BI strategy if they understand what you're talking about.

## Don't lean on "data" or other analytics jargon, articulate what it is you really mean

If you find yourself talking about unspecific "data," take that as a signal that you may be confused, and need to clarify your strategy. Your organization already collects some kind of information, and ambiguous language like "insights," "analysis," and "data" all correlate to some real-life action or meaning. Identifying the meaning behind the information you already have — what you already collect — is a good starting point. For example, "data" could mean page views, deals, contracts, likes, installs, or people. When you talk about "analysis," be specific about the operations involved, like averaging, grouping by date, filtering, or comparing different time periods. If you know these meanings, use them! These unclear buzzwords always refers to _something_, so talk about that something.

Once you've identified what you already have, keep up that specificity when thinking about what else you'd like to capture, if anything. Here's an example:

**Vague**: "Let's collect more data about the success of our customer trials."

**Better**: "In the last 30 days, what percentage of customers who started with a free trial converted to paying for our service? For those that didn't, did they complete their profiles? Did they contact us, and did we respond within the timeframe listed in our service agreement? What issues did customers contact us about the most?"

This second example involves asking more questions — precise ones — and pinpoints exactly what new information you're looking for and what problems having it would solve. This specificity is part of effective storytelling, whether you're proposing or developing a new system, building useful dashboards, or presenting findings. You'll need to think critically about the current market and the problems your business is trying to solve, but sharpening these skills is foundational to crafting a strong business intelligence strategy.

## Prefer technical vocabulary to buzzwords

You don't need to discard every BI-related word in your vocabulary. Phrases and acronyms like [data warehouse](/glossary/data_warehouse), [ETL](/glossary/etl), and [OLAP](/glossary/olap) can be confusing to a newcomer, but they do have specific, industry-wide definitions. Now that doesn't mean you should sprinkle confusing vocabulary into a company-wide presentation without explanation, but use them if you have to. And if you find that some knowledge of this vocabulary is fundamental to getting everyone onboard with the analytics strategy, offering low-stakes training on concepts like [segments](/glossary/segment), [measures](/glossary/measure), [dimensions](/glossary/dimension), or [metadata](/glossary/metadata) could be helpful for your team.
