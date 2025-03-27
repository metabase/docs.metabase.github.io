---
title: Embedded analytics
headline: Embedded analytics
def: Using third-party software to include charts and dashboards in your application that customers can query.
aka:
  - Embedded dashboards
  - Embedded charts
key-article:
  title: Embedding
  url: /docs/latest/embedding/start
further-reading:
  - title: Embedding - How to share data outside of your organization
    url: https://www.metabase.com/learn/metabase-basics/embedding
redirect_from:
  - /glossary/embedded_analytics
---

## What is Embedded Analytics?

Embedded analytics refers to using third-party software in your application to allow your users to query their data. Embedded analytics can refer to the simple insertion of static charts in your app (usually via an iframe), but embedded analytics usually refers to a more interactive experience where people can view and create charts, tables, and dashboards, and in general explore their data on their own. Embedded analytics is more than simply using a charting library in your app; the analytics software should be able to work with SSO, manage groups and permissions, and even data modeling, all of which make it easier to incorporate analytics into your product.

Software that provides embedded analytics usually allows you to [white-label](./white_labeling) the charts and dashboards so that they look like they belong in your app.

Organizations typically embed analytics with a third-party tool (like Metabase), rather than build the analytics themselves, because 1) it's often cheaper (in both the short and long term), and 2) you provide a better user experience than you would were you to build your own solution. Analytics gets very complicated very quickly, and most people would rather devote resources to their core business than try to roll their own analytics in house.

## Embedded analytics example

Check out a demo of three different sites, each with embedded analytics that uses Metabase under the hood. (You can toggle between sites on the nav in the upper right.)

[metaba.se/sdk-demo](https://metaba.se/sdk-demo).
