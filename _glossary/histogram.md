---
title: "Histogram"
headline: "Histogram"
def: A chart that displays continuous data using vertical bars that each represent a discrete, equal-sized range.
related-terms:
  - term: Bar chart
    slug: bar_chart
  - term: Bin
    slug: bin
key-article:
  title: Visualize your data as a histogram
  url: /learn/visualization/histograms
further-reading:
  - title: Which chart should you use?
    url: /learn/metabase-basics/querying-and-dashboards/visualization/chart-guide
---

## What is a histogram?

A **histogram** is a chart that displays continuous data using vertical bars that each represent a discrete, equal-sized range. These ranges are called [bins](/glossary/bin).

While bar charts are used to visualize categorical information (like product categories), histograms display information along a spectrum, separated into binned ranges. If your data is numerical — say, price or quantity — consider opting for a histogram.

## Example histogram

You could use a histogram to visualize a count of orders broken down by subtotal, like so:

{% include image_and_caption.html url="/glossary/images/histogram/histogram.png" description="<em>Fig. 1</em>. A histogram showing the distribution of order subtotals." %}

Histograms will only show a thin sliver of white space between each of the bins to indicate that the bars represent bins across a range of continuous values.
