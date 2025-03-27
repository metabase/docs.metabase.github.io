---
title: "Comparing the most popular open-source charting libraries"
summary: "Discover features from commonly used data visualization libraries, like Chart.js, ECharts, and Nivo."
date: 2024-02-13 00:12:18
last_updated_at: 2024-02-13 00:12:18
categories: "Analytics and BI"
author: The Metabase Team
featured_image: /images/posts/viz-libraries/most-popular-visualization-libraries.jpg
image: /images/posts/viz-libraries/most-popular-visualization-libraries.jpg
layout: post
redirect_from: /blog/most-popular-data-visualization-libraries-embedding
---

Here's a breakdown of some of the most popular charting libraries to help you figure out which library could be best for your embedding project, as well as a discussion about when you should consider a more batteries-included solution.

## Chart.js

[Chart.js](https://www.chartjs.org/) is an open-source JavaScript visualization library that started in 2013 and, over time, has ranked as the most popular charting library according to GitHub stars and npm downloads.

**Chart.js might be right for you if you:**

- Have large data sets. Data is ingested using their internal format, so you can just set `parsing: true` and it'll parse your data for you.
- Need an active dev community to lean on. Check out Chart.js' [Discord channel](https://discord.com/invite/HxEguTK6av) and [resource list](https://github.com/chartjs/awesome).
- Require plugin support. There are plenty of Chart.js-related repos available to test and use. For example, Chart.js has a well-maintained, popular [React components](https://github.com/reactchartjs/react-chartjs-2) library available.

## Visx

The brainchild of Airbnb’s Engineering and Data Science team, [visx](https://airbnb.io/visx) is a collection of expressive, low-level visualization primitives for React.

While visx isn’t technically a visualization library, it helps you build your own charting using visualization primitives. visx bundles D3 and React to give you the bare bones of charting while keeping the animations, theming, and styling you're already using for your app.

**visx might be right for you if you need to:**

- Keep bundle size small. visx offers multiple packages, but you can pick and choose the packages you need.
- Use your own animation library. Other visualization libraries can sometimes impose animations and style that can impede on existing design work.
- Play around and get inspiration first before going all-in. Their [gallery has plenty of cool, lightweight examples](https://airbnb.io/visx/gallery).

## Nivo

[Nivo](https://nivo.rocks/) is built on top of D3 as a set of React components to offer server side rendering and fully declarative charts. [Nivo’s Storybook](https://nivo.rocks/storybook/?path=/docs/bar--docs) offers interactive examples, so you can get a sense of what to build, and their [documentation](https://nivo.rocks/area-bump/) lets you testing out individual components before implementing.

**Nivo might be right for you if you need:**

- Highly customizable, fully declarative, responsive charts.
- A library fully written in React (Nivo isn't the typical wrapper library).
- An active developer community to work with. [Nivo’s Github repo](https://github.com/plouc/nivo) is pretty active and they have a Discourse channel you can join.

## ECharts

[ECharts](https://echarts.apache.org/en/index.html) is an open-source Javascript visualization library maintained by the Apache Software Foundation. Companies like Amazon, Gitlab, and Intel use ECharts to include data visualizations in their products, reports, research papers, etc.

_We're working on incorporating ECharts for Metabase data visualizations, so you can say we're fans of this library, too._

**You may want to use ECharts if you need:**

- "Smart charts". ECharts automatically uses the appropriate animation to represent data changes.
- A multi-rendering solution with cross-platform support. You can render charts in Canvas, SVG, and VML. ECharts has support for PC and mobile browsers, and a node-canvas on Node for server-side rendering.
- Access to many pre-built series beyond basic line, bar, and pie charts. There are 20+ options like box plots, heat maps, funnels, and more. You can plot multiple series on a chart, too.
- To render fully-customized maps. The ECharts map series type supports geoJSON.
- Accessibility features. It's one of the few visualization libraries that has automatically generated chart descriptions and decal patterns for users with disabilities.

## Plotly

Looking for a bundle of open source libraries? With [Plotly](https://plotly.com/graphing-libraries/), you can create interactive charts and maps for Python, R, Julia, and multiple other languages.

**You may want to use Plotly if you need**:

- A library for statistical programming languages. Plotly even has a [MATLAB® library](https://plotly.com/matlab/#fundamentals). Plotly's [fundamentals docs](https://plotly.com/r/#fundamentals) have plenty of code examples, so they're a great place to start if you're still learning the ropes.
- To integrate with [Jupyter notebooks](https://jupyter.org/) or IDEs like [PyCharm](https://www.jetbrains.com/pycharm/), [QtConsole](https://qtconsole.readthedocs.io/en/stable/), or [Spyder](https://www.spyder-ide.org/).
- Standalone HTML files for your application. You can also use [Dash](https://dash.plotly.com/) to add graphs to your existing Python web applications.

## When you might need more than a simple viz library

Visualization libraries are a good option if you’re already deep into component-driven development or have a skilled dev team on hand that can quickly implement and iterate on charts.

However, as you scale, maintaining a visualization library can mean taking on a lot of overhead. For example:

- If you outgrow your visualization library in any way, you'll either need to work with maintainers to add new features or fixes, or pivot to an entirely new visualization library.

- Your dev team will need to handle ad-hoc requests for embedding and charting, or you'll have to find a middle ground, like adding new interfaces and platforms to support teams that aren't as familiar with a visualization library.

In these scenarios, using a Business Intelligence (BI) tool that has features to support both technical and non-technical teams can save you down the line.

## Open-source Business Intelligence tools

[Metabase OSS](/start/oss/) is a free option if you need a quick solution for [embedding](/product/embedded-analytics). You can create, embed, and iterate on charts at scale, in a matter of minutes. Other BI tools, like Apache Superset or Redash, are also open source and offer similar functionality.

Metabase offers some additional free, out-of-the-box features that can cover the bases for most, if not all of your teams:

- A [SQL editor](/docs/latest/questions/native-editor/writing-sql) for your data and dev teams, so they can quickly query against your database without hassle.
- A [data browser](/learn/metabase-basics/getting-started/data-browser) that can act as one centralized place for everyone to explore tables and fields; learn more about your data.
- A [data modeling tool](/docs/latest/data-modeling/models), so your Data team can view schema, edit definition and metadata, and more.
- An [intuitive query builder](/docs/latest/questions/introduction) and [one-click visualization options](/docs/latest/questions/visualizations/visualizing-results#visualization-options) for teams that aren't as familiar with dev or data tooling. Everyone can build and maintain their own charts and visualizations without Eng or Data team support.

To test it out, check out the [OSS installation instructions](/start/oss/).

## More charts and Embedding resources

- [Embedding docs](/docs/latest/embedding/introduction)
- [Embedded analytics React SDK](/docs/latest/embedding/sdk/introduction)
- [Overview of Customer-facing analytics with Metabase](/events/overview-of-customer-facing-analytics-with-metabase)
