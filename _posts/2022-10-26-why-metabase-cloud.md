---
title: "Why Metabase Cloud?"
summary: "What you get with Metabase Cloud, and why it's a good deal."
date: 2022-10-26 00:10:18
last_updated_at: 2022-10-26 00:10:18
categories: "Using Metabase"
featured_image: /images/posts/why-metabase-cloud/why-metabase-cloud.jpg
image: /images/posts/why-metabase-cloud/why-metabase-cloud.jpg
author: The Metabase Team
layout: post
---

The value in services like Metabase Cloud can be tricky to gauge until you pick apart all the work that goes into building the service. Whether you sign up for Metabase Cloud or not, our hope here is that this post will help you make a more informed decision. Either way you're using Metabase, so welcome aboard!

## Why you shouldn't use Metabase Cloud

First, let's list the reasons why you shouldn't, or can't, use Metabase Cloud.

- You need an [air-gapped environment](/product/air-gapping), usually for regulatory compliance, or if you’re running your own three-letter-agency… If you’re not sure if you need an air-gapped environment, you don’t need an air-gapped environment. If you do need an air-gap, we have an [air-gap offering as well](/talk-to-a-person/) (just not for Cloud, obviously).
- You have some regulations that stipulate how you run your software (like HIPAA).
- You want to run a custom build of Metabase. That is, you’re running a fork of Metabase (OSS or the Enterprise/Pro version) so you can add your own customizations to the software, and you have the engineering resources to tank that level of overhead.
- You want to use a community or custom driver. We only support [official (1st-party) and partner drivers](/docs/latest/databases/connecting#connecting-to-supported-databases) on Metabase Cloud, because we need to be able to vouch for their quality and help you with problems in a production context.

The vast majority of orgs don't fall into any of the above categories, so the decision is less clear: should I self-host my Metabase? Or should I outsource the overhead to Metabase Cloud?

## The cost of running a bare bones Metabase

There's nothing specifically difficult about running Metabase compared with running other software, it's just that running software in production is nontrivial. Let's say you want to run your Metabase as cheaply as possible. To do that you'd need two things: one server to run Metabase, one server to run your application database (not counting the database that houses all your data).

So, at a minimum, you need a dedicated Postgres or MySQL database to serve as your application database. The absolute cheapest setup would get you to maybe ten people using Metabase (as long as they're not using Metabase at the same time). You can play with the numbers here, but you're already starting to look at the [starter price](/pricing/) for Metabase Cloud.

Why not use the embedded H2 database and just run one server? Because the embedded H2 database will _ruin your life_. We included the embedded H2 application database as a party favor so people could just download the Metabase JAR or Docker image and be able to start querying data in minutes. The H2 database is intended for demos, not production. It _will_ get corrupted at some point, and you _will_ suffer.

Even if you _do_ go with a bare minimum setup, it won't be production-grade. Meaning, you'll have to deal with hidden costs (network, monitoring, load balancing, storage, multi-zone availability, SMTP server) on top of having to deal with upgrades, backups, restores, and other operational maintenance. We know all too well about these costs because we had to put a ton of work into building a platform to manage a fleet of Metabases. And since we can manage a fleet at scale, we can pass those savings on to you, all while still getting paid to develop the platform and the open-source project.

## The "why our cloud offering is a good deal" section

With Metabase Cloud, all you do is sign up and you can basically just get to work querying your data.

You'll get:

### Up and running in minutes

Even if your company is running their entire infrastructure in cloud, there's typically some sort of provisioning process that could take a while depending on how bureaucratic your company is. With Metabase Cloud, you literally just sign up, hook up your database, and invite your team to start querying.

### High availability

If your Metabase goes down due to some data center issue, cosmic ray interference, or whatever, we'll spin up another Metabase for you and redirect your traffic to that Metabase. Plus, we use a scalable application database (PostgreSQL via AWS's RDS), so you get an application database that scales with your use. Essentially what this means is that you get an auto-scaling setup that will keep your setup speedy no matter what level of traffic you throw at it.

Basically, Metabase won't be your bottleneck; how fast your queries run still depends on how much data you ask for, how fast your data warehouse is, and how well you model your data. Check out [Making dashboards faster](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster) for some tips.

### Operational management

Metabase Cloud takes care of all the operational management for you, including:

- Backups and restores (safety first).
- Upgrades. We do a major release of new features every three months or so, and minor updates every few weeks with bug fixes and security patches. You'll get all of these updates automatically, without any of the stress.
- Monitoring.
- SoC2 Type 2 security auditing
- Managing an SMTP server for sending [dashboard subscriptions](/docs/latest/dashboards/subscriptions) and [alerts](/docs/latest/questions/alerts).

Although this operational maintenance isn't unique to Metabase, it's a pain to deal with. So just have us deal with it.

### Support from first-class success engineers

You'll get support from actual technical experts, not customer service reps. Our success engineers are all former Metabase users and consultants. When you need help, you'll be talking to an expert who's been in your shoes. You'll not only get help with whatever your problem is, but advice on best practices from people who have seen it all. And you won't have to deal with any customer service runaround, like figuring out how to trick a chatbot into connecting you with an actual human. You can just email us.

And our success engineers are, frankly, unreasonably good. When giving us feedback about their support, customers say things like, "World-class", "Great", "Excellent", "Fantastic", "The best". Some even go all-caps: "Johannes was EXTREMELY helpful". And sure, that's cherry-picked anecdata, but the feedback is almost all cherries: ticket resolution where the customer was satisfied has been clocking over 95%, and that percentage has been trending up over time. Over the past three months, we've been clearing 97%.

That, plus we have an [active forum](https://discourse.metabase.com/) and a ton of [documentation](/docs/latest/) and [learning resources](/learn/) (but everyone gets these, so these are more "why Metabase"; they don't really score any points for the "why Metabase _Cloud_" argument).

## Still tempted to self-host your Metabase?

A few other things to consider here:

### Both real and opportunity costs (with some ballpark costs/savings)

People versed in DevOps are rare and expensive. If you're one of these people, you could, with some effort, get a production-ready Metabase setup going. But the engineering time (your time) is going to be more expensive than your infrastructure costs. If you only spend a couple of hours per month managing your Metabase, Metabase Cloud would have paid for itself. So the question becomes, should you be spending that time on Metabase, or on your organization's infrastructure?

Let's consider some ballpark numbers here (circa October 2022) for 10 people using the cheapest Metabase plan (that's the OSS version of Metabase, not the [Enterprise/Pro](/product/enterprise) version that ships with more advanced features). And let's set aside the annual discount for now. A month of Metabase Cloud would run you $85 (which includes the first five accounts) plus $5 per person after those first five, for a total of $110 per month. Given that an average DevOps engineer salary works out to about $60 per hour, if they spend ~2 hours a month dealing with your self-hosted Metabase installation, Metabase Cloud will have already paid for itself, and that's _before_ you tally the infrastructure costs you'll have to carry.

### Derisking the project

You can vet Metabase Cloud [with a free trial](https://store.metabase.com/checkout/login-details). If (for some imaginary, ludicrous reason) Metabase doesn't work out at your org, you can just cancel and move on, and you won't have sunk any time into building out infrastructure to support that trial period. When you (inevitably) find Metabase useful, you could also switch to an annual billing plan to get an even better deal.

### Easy to migrate from self-hosted to Metabase Cloud and back

Along the derisking line; it's easy to [migrate from self-hosted to Metabase Cloud](/cloud/docs/migrate/guide) and back again. If you change your mind later, we'll give you a copy of your application database so you can switch back to a self-hosted setup and still have all your Metabase questions, dashboards, collections, etc.

### Metabase Pro on Cloud

If you're going with [Metabase Pro](/pricing/), or could see your org upgrading at some point, the cost is literally the same to host Metabase Pro yourself or use Pro on Metabase Cloud, so you might as well have us do all the work and then bank the savings on infrastructure and ops.

### Worry-free maintenance with world-class support

If you're still on the fence, our success engineers should probably tip you toward Metabase Cloud. Our engineers can recover, change, and upgrade environments much faster (and more reliably) than you'd be able to do on your own (which is a big deal in a production environment). The handling of upgrades alone might be worth it, as we're improving Metabase all the time. Plus you wouldn't have to [worry about things going wrong](https://status.metabase.com/) (and even if there were a problem, it wouldn't be your fault).

## Try Metabase Cloud

That's it. Sign up for a [free trial of Metabase Cloud](https://store.metabase.com/checkout/login-details). And thanks for supporting open-source software.
