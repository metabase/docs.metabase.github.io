---
title: Bubble chart
headline: Bubble chart
def: A data visualization that plots data with three variables.
summary:
aka: Bubble bath
further-reading:
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
  - title: Scatterplot and bubble charts
    url: /docs/latest/questions/visualizations/visualizing-results#scatterplots-and-bubble-charts
redirect_from:
  - /glossary/bubble_chart
---

## What is a bubble chart?

A bubble chart is a way to visualize the correlation between three different variables. It's basically a scatterplot where each plot has put on some weight. You can also use color to display an additional [dimension](/glossary/dimension).

If the set of values used to determine the bubble size includes zero or negative values, bubble charts are probably not a good choice. There are ways around it (like using absolute values), but generally it's hard for people to make sense of bubbles with negative size, for example.

## Bubble chart example

{% include image_and_caption.html url="/glossary/images/bubble-chart/bubble-chart.png" description="<em>Fig. 1</em>. A bubble chart." %}

In figure 1, the bubble chart shows the correlation between the product's average rating (the x-axis) and the product's price (the y-axis). Additionally the size of each point (that is, each bubble) corresponds to the quantity of the product ordered; the higher the quantity, the larger the bubble. We might expect to see some correlation to between average rating, price, and quantity ordered, but the Sample Database included with Metabase is a random dataset, so there isn't any real pattern here.

In figure 2, we've further broken out the plotted bubbles by category, with the color of each bubble corresponding to product categories: Gizmos, Gadgets, Doohickeys, and Widgets.

{% include image_and_caption.html url="/glossary/images/bubble-chart/bubble-chart-color.png" description="<em>Fig. 2</em>. A bubble chart further broken out by product category." %}
