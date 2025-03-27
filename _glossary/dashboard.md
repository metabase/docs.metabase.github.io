---
title: Dashboard
headline: Dashboard
def: A data visualization tool that holds important charts and text, collected and arranged on a single screen.
related-terms:
  - term: Card
    slug: card
  - term: Dashboard subscription
    slug: dashboard_subscription
  - term: Question
    slug: question
  - term: Collection
    slug: collection
  - term: Custom destination
    slug: custom_destination
  - term: Cross-filtering
    slug: cross_filtering
  - term: Text card
    slug: text_card
further-reading:
  - title: Building dashboards guide in Learn Metabase
    url: /learn/dashboards
  - title: Dashboard documentation
    url: /docs/latest/dashboards/start
  - title: Example Metabase dashboards
    url: /dashboards/
---

## What is a dashboard?

A **dashboard** is a data visualization tool that holds important charts and text, collected and arranged on a single screen. Dashboards provide a high-level, centralized look at [KPIs](/glossary/kpi) and other business [metrics](/glossary/metric), and can cover everything from overall business health to the success of a specific project or campaign.

The term comes from the automotive dashboard, which — like its business intelligence counterpart — provides status updates and warnings about important functions (just for things like low brake fluid instead of how your recent marketing campaign performed).

## Dashboard vs. report

Dashboards aren't exactly the same as reports, though you'll sometimes hear people refer to dashboards as reports. The difference is that dashboards tend to be easier to read and understand at a glance, while traditional reports provide a more detailed look at a subject.

Unlike traditional reports, dashboards are viewable on a single screen and often incorporate some interactive elements. You're probably not going to print out a dashboard to read, which would make a lot more sense for a traditional report that draws on static, historical data. However, just like with traditional reports, you can send out updated dashboards according to a set schedule, like with [dashboard subscriptions](/glossary/dashboard_subscription) in Metabase.

## Dashboards in Metabase

In Metabase, dashboards are made up of [cards](/glossary/card) that contain either [questions](/glossary/question) or [text](/glossary/text_card). You have a lot of options when creating and editing dashboards in Metabase, like:

- [Arranging and resizing cards](/docs/latest/dashboards/introduction#arranging-dashboard-cards) to fit your desired dashboard design.
- Making your dashboards [interactive](/docs/latest/dashboards/interactive) by setting [custom click behavior](/learn/metabase-basics/querying-and-dashboards/dashboards/custom-destinations) and linking one dashboard to another.
- Adding [filter widgets](/glossary/filter_widget) and wiring them up to specific [fields](/glossary/field) on individual cards.
- [Using Markdown](/learn/metabase-basics/querying-and-dashboards/dashboards/markdown) to annotate your dashboard with text or GIFs.
- [Sharing your dashboard](/learn/embedding/embedding-charts-and-dashboards) with a link or by embedding it in your website or app.

## Example dashboard

Figure 1 shows an example of a dashboard in Metabase with three question cards and three filter widgets. If someone inputs a customer ID, customer name, or date into one of the filter widgets, the charts will adjust accordingly to fit reflect that added filter.

{% include image_and_caption.html url="/glossary/images/dashboard/dashboard.png" description="<em>Fig. 1</em>. A dashboard with three question cards, and three filter widgets." %}
