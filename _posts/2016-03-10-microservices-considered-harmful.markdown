---
title: "Microservices considered harmful"
date: 2016-03-10 16:10:58
last_updated_at: 2016-03-10 16:10:58
categories: "Analytics and BI"
author: Sameer Al-Sakran
image: /images/posts/microservices-considered-harmful.jpg
layout: post
---

There's a lot of hype around microservices, and monolith-bashing seems to be all the rage on HackerNews and Reddit. It's good to hear DHH bringing some [sanity back into the conversation](https://m.signalvnoise.com/the-majestic-monolith-29166d022228#.g0gglxgxt).

Large companies often have very good reason to aggressively break up applications into Centi, Milli and Micro services. For teams that number in the single or double digits of engineers, this is little short of nuts.

## What (Micro)Services solve

Microservices fundamentally solve the coordination problem in large teams of engineers.

They make it easy to independently deploy different portions of a larger application. They also break up the problem into small units of complexity that can be understood, tested and fixed without needing to understand the entire system.

Once you get a ginormous monolith, breaking it up can also drastically improve developer productivity as compile, lint and testing times are drastically decreased if you’re only working within the scope of a single service.

They also enforce this separation by deployment mechanism, vs convention in using libraries in a single codebase. This makes it harder for people to break encapsulation of your code, by forcing them to use it via a published API.

Cynically, they also solve the perennial problem in corporate politics of having to work well with others. Now you can ignore integration issues and just point to your microservice and say "All tests pass and it works!" and look good on your next review.

## Solve the problems you actually have

So, awesome. Sounds like an awesome solution to the problems of a high functioning, large engineering team at a big complicated place with lots of politics.

Does this describe your current problems? If you're a typical early stage startup, your problems should look like:

- Validate the product services its intended users
- Figure out a customer acquisition strategy and iterate fast on the edges of the product that facilitate this
- Sleep more by making deployment easier and less error prone
- Help the overworked rest of the company do their jobs

So ..... what exactly does breaking an application up into services buy you, again?

## Monoliths are ideal for early stage startups

Deployment is simple. Setup CI, automate deployment and deploy frequently. With monoliths you know if it deployed or not.

System wide changes can be done in one place and you don't need to explicitly version breaking changes because all the code is in one place. This makes it **much** faster to iterate on new features.

Everything is in a single place. While it means there's more to understand, there's a bit of a weird perspective that splitting code across 10+ repos somehow makes it easier to understand the system as a whole. Sure for a junior dev, it's easier to take a look at a single service and understand it. But the idea that creating a mental model of dozens of services is somehow easier than the equivalent modules in a single codebase is nuts. Sure when you get to 1M+ Lines of Code, it gets crazy, but that's not a problem you have right now.

## The analytics consequences of Microservices

So aside from the perennial problem of SOMEONE IS WRONG ON THE INTERNET, why is this on the Metabase blog? Well, primarily because there is a very serious consequence of using microservices on your ability to provide analytics.

If you have a data model that is decoupled, at some point you are going to want to well ... couple it back together so you can analyse what's going on with your business. The main proponents of microservices tend to either be engineers at large companies (who have small armies of data engineers to stitch things back together ... do you?), consultants (where anything that makes an individual consultant look good and racks up billable hours later is a GoodThing), or engineers who don't want to coordinate with others in their company.

This is exacerbated if you stack on the additional insanity of "pick the right database for the job" on top of microservices. Here, you'll suddenly need to have a stable ETL story across all of these shiny little snowflakes.

## Why care?

Well, most of the time when you're an early stage startup, you don't know exactly what to build. You'll have an idea, hopefully some early users and a dream. To improve your product you need to both understand what's going on, what product features are working, what aren't, how users are behaving, etc.

You'll also, by definition, have too few people to do the work. So to run the business, you'll need to make it easy for non-engineers (or in this case anyone other than the person who wrote the microservice) to pull data out.

At some point, the size of the code base will prompt you to break it up into services, and take on all the operational hassles therein. Until then, ride a simple boring monolith as far as you can.

TL;DR - Microservices solve problems you don't have as an early stage startup and make iteration more difficult. Ride a monolith as long as you possibly can.
