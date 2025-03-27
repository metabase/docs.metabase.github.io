---
title: "The startup's guide to financial modeling"
description: "We took (most of) what we've learned about financial modeling while building our company, and packaged up the knowledge so other startups can find their footing faster."
image-hero: /startup-guide/images/guide-hero.png
image-og: /startup-guide/images/guide-og.png
---

## The package and the guides

We put together a guide on how to set up a metrics store with Metabase, as well as a guide to financial modeling concepts for subscription-based businesses.

We also built a [package](./package/setup) that can set up a metrics store for you, and a [financial modeling template](https://docs.google.com/spreadsheets/d/1wG1p-wj9k3AxLeZcRvTVNgxJdiEaOXof-0heoHGkvpM/edit?usp=sharing) that you can use to import your metrics into. To use this package, you'll need to tick a fairly large set of boxes, but even if you can't use it, we hope you can still poke around and adapt the setup for your own needs.

Here are the main sections:

- [How to set up a metrics store with Metabase](#how-to-set-up-a-metrics-store-with-metabase)
- [Financial modeling for startups](#financial-modeling-for-startups)
- [A package and template for financial modeling](#a-package-and-template-for-financial-modeling)

But first, why does any of this matter?

## Financial modeling is inevitable

If you're trying to get a startup off the ground, at some point you're going to have to:

- Estimate revenue.
- Plan for headcount.
- Fill out insurance forms.
- Pitch to investors.
- Have at least some sense of where you're at, and where you're going.
- Deal with other situations where people ask for the actual numbers in play.

You can think of this guide as the startup's (or dirtbag's) guide to financial modeling. And it can get you pretty far. If the scale of financial planning ranges from 0-100, where 0 is "I don't know where to start" and 100 is Financial Planning & Analysis at a major, multinational corporation, this guide could maybe get you to 50. By the time you can afford to hire people to sort this stuff out, you'll at least have a solid foundation to build upon, and a better understanding of how to figure out where you should be putting your limited resources.

## How to set up a metrics store with Metabase

The metrics store setup we’ll walk you through will allow you to:

- Identify metrics to help you understand the current state of your business.
- Project those metrics into the future to help you plan.
- Identify the different drivers or levers of your business.
- Use those drivers to explore alternative scenarios based on changes you can make to those drivers. That is, how you can figure out where you can make the most impactful changes to your business.

This guide is useful for startups in general, and subscription-based businesses in particular.

See [Metabase as a metrics store](./metrics-store/overview).

## Financial modeling for startups

We also give a tour of the basic concepts involved in financial modeling, with a focus on subscription-based startups. We cover enough ground to give you a conversational understanding of financial modeling with, say, investors and accountants.

Check out [Financial modeling](./financial-modeling/overview).

## A package and template for financial modeling

We built a package that you can use to automagically build a metrics store in Metabase. You can then import data from that metrics store into a financial modeling template so that you can tinker around with projections and scenarios. Depending on your tech stack, this package may be able to set up a metrics store for you. But even if the package doesn't quite fit your setup, you can still poke around the code and adapt it to your company's specific financial models.

Check out [Financial modeling package](./package/setup).
