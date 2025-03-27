---
layout: post
title:  "Early stage engineering anti-patterns"
date:   2016-03-03 16:10:58
categories: guide
author: Sameer Al-Sakran
---

![I've seen some shit, man](/images/seen.jpg)

Having gone riden the ride of early stage startups a few times myself, working with Expa companies, and working with a number of  of companies through Metabase, I can safely say I've seen more than my fair share of early stage engineering Anti-patterns. Given the context (helping companies get analytics, business intelligence and operational toolings setup), they will of course be biased towards the analytics side of the equation.

It's also important to note that a lot of these patterns were *great* ideas at later stages, or in different companies but in an early stage, that is pre, or just barely post, product market fit, they were *less than awesome*.

## Not internalizing that engineering is also responsible for analytics

This is very common with teams where the main leaders come from big companies. With big companies there is a lot of specialization and resources. The dashboards, financial reporting, ad hoc queries, etc, was all *someone else's problem*. At a smaller company, that's not true, and anything to do with data becomes defacto an engineering problem because no one else has the skills or access.

So when making decisions about data models and schema, it's important to zoom out a bit and realize that you need to make your live easier on at least four different dimensions of developer productivity

* how well does this data model work for the main application?
* how easy does this data model make writing internal tools?
* how much work will this data model require to use third party (or internal) analytics tools?
* how easy will this data model be operationally? (eg, how easy are migrations, etc)

It's best to assume you'll end up responsible for all of this, and design accordingly.

## Not making it easy to ignore test accounts

Whether it's test accounts, staff accounts, different data programs or orders that come in through feline telepathy, many many companies include something that requires certain events or transactions to be ignored in the bulk of common queries.

If this is the case, you've introduced a tax on all analytics (and internal tool building) query writing. Often this is balanced against transactional efficiency or (application) developer productivity. Sometimes this tax is worth it , sometimes it isn't. For very large companies, transactional efficiency is a important enough goal that you can afford to spend a couple engineers' or analysts' time to clean up the results.

If you're small, chances are you can't and you should probably place the tradeoff somewhere else.

## Normalize all the things!

Do you *really* need categories to be normalized in their own table? Do you really think users will input multiple email addresses in V1 of the product? Just how much additional latency would it really add to update the whole user record instead of just the UserAddress record?

Engineers from an enterprise background typically over normalize their schema. While the consistancy, improved write performance, and future extensivility are valuable, if you only have a handful of engineers, you'll probably be better off just making a fatter primary record rather than normalizing it across too many tables.

## Denormalize all the things!

On the flip side, you can definitely overdo the whole denormalization thing. Just because you can put all of a users blog posts as an array in their main user document in mongo doesn't mean it's a good idea. Aside from the normal issues around locking the entire record, making updates tricky, etc there's the problem of how do you get it out of the database and into Excel? Or how do you let users run their own queries. The more the data model breaks down into tables the coincide with concepts someone in the organization knows the names of, the happier folks tend to be when having to query it themselves.

### A useful heuritic

When thinking through how the whether the data model has taken analytical nad transactional needs into account, it's useful to do the following:

1. Collect the top 10 most commonly run update queries from the application
2. Collect the top 10 most common read patterns from the application
3. Collect the top 10 important metrics the business operations folks care about

In general, you're looking for a data model that minimizes pain across all of these distinct queries. In general, you'll maximize overall productivity by accepting a bit of complexity in 1+2 if it makes 3 easier. This is because with most companies there are much fewer workhorse queries on the application side than common analytics or business intelligence questions.

Also, 1+2 are usually done in source control, are wrapped in automated testing, and are generally much more hardened. Queries for 3 are usually scattered, written by many people and generally much less controlled. Anything you can do to make the queries in 3 idiot-proof pays off big in the long run.

## Not operating at the appropriate degree of OCD

You should probably think differently about "Moving fast and break things" if you're writing a payment gateway or pacemaker firmware. Likewise, if you are running a user generated content site based around cat memes, chances are you can tolerate a much hire degree of "YOLO, just push it to production" if that makes your ability to ship features faster.

Figure out how costly a mistake is, how quickly it can be corrected and let that drive your engineering process.
