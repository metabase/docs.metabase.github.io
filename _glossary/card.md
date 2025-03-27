---
title: Card
headline: Card
def: A component of a dashboard that displays data or text.
related-terms:
  - term: Dashboard
    slug: dashboard
  - term: Text card
    slug: text_card
further-reading:
  - title: Building dashboards track
    url: /learn/dashboards
  - title: Best practices for BI dashboards
    url: /learn/metabase-basics/querying-and-dashboards/dashboards/bi-dashboard-best-practices
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
  - title: Fun with Markdown in your dashboards
    url: /learn/metabase-basics/querying-and-dashboards/dashboards/markdown
  - title: Working with the Metabase API
    url: /learn/administration/metabase-api
---

## What is a card?

A **card** is a component of a [dashboard](/glossary/dashboard) that displays data or text.

Metabase dashboards are made up of cards, with each card displaying some data (visualized as a table, chart, map, or number) or text (like headings, descriptive information, or relevant links).

## Cards and questions

Cards on a dashboard are more than just mini versions of the [questions](/glossary/question) you've asked. If you're adding [saved questions](/glossary/saved_question) to a dashboard and calling it a day, you may be missing out on a lot that cards can do.

You can [combine multiple saved questions in a single card](/docs/latest/dashboards/multiple-series#combining-two-saved-questions), as long as they share a [dimension](/glossary/dimension).

Your cards don't have to contain different questions either. It may be useful to put include same card on a dashboard multiple times, like if you want to visualize one question as both a [line chart](/glossary/line_chart) and a [bar chart](/glossary/bar-chart).

## Editing cards on a dashboard

When editing a dashboard, you can:

- [Arrange and resize cards](/docs/latest/dashboards/introduction#arranging-dashboard-cards) on the dashboard's grid.
- [Change a card's visualization options](/docs/latest/dashboards/introduction#changing-a-cards-visualization-settings) without affecting the underlying question.
- Connect cards to [dashboard filters](/docs/latest/users-guide/08-dashboard-filters) to filter the question's results.
- Set a card's [click behavior](/docs/latest/dashboards/interactive#customizing-click-behavior) to change what happens when someone clicks on a card.

And while it's great for those cards on your dashboards to look slick and visually appealing, it's more important that you're conveying the information that people need to see, without too much added fluff.

## Example of cards on a dashboard

The dashboard in figure 1 includes [text cards](/glossary/text_card) that act as headings and descriptions, as well as cards with [numbers](/learn/metabase-basics/querying-and-dashboards/visualization/chart-guide#static-numbers), [trends](/docs/latest/questions/visualizations/visualizing-results#trends), a [line chart](/glossary/line_chart), and a [region map](/glossary/region_map):

{% include image_and_caption.html url="/glossary/images/card/card-example.png" description="<em>Fig. 1</em>. Cards with questions and text on a dashboard." %}

## Cards and the Metabase API

In the [Metabase API](/learn/administration/metabase-api), the [`api/card`](/docs/latest/api#tag/apicard) route refers to questions, rather than cards on a dashboard.

You can still use the API to edit and get information about the cards on your dashboards (like with [`api/dashboard`](/docs/latest/api#tag/apidashboard)), but keep that distinction in mind, and check out the [API documentation](/docs/latest/api) for a full list of routes and endpoints.
