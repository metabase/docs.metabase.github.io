---
title: "Segment"
headline: "Segment"
def: "A specific subset of a larger group of items, like a certain grouping of customers."
key-article:
  title: "Docs on Segments"
  url: /docs/latest/administration-guide/07-segments-and-metrics
related-terms:
  - term: Metric
    slug: metric
  - term: Filter
    slug: filter
  - term: Snippet
    slug: sql_snippet
  - term: Model
    slug: model
further-reading:
  - title: Keeping your analytics organized
    url: /learn/metabase-basics/administration/administration-and-operation/same-page
---

## What is a segment?

A **segment** is a specific subset of a larger group of items, like a certain grouping of customers. The process of defining and creating these subsets is known as **segmentation**.

For example, you may want to segment your customers based on demographic, recent activity, or some other [attribute](/glossary/attribute).

In Metabase, Segments are named [filters](/glossary/filter) or sets of filters that people can apply to [questions](/glossary/question) asked using the [query builder](/glossary/query_builder). Admins can define segments to get everyone on the same page about which customers count as "New user" or which are a "Churn risk", or however else you want to slice up your data.

If you're partial to [native SQL queries](/glossary/native_query), [SQL snippets](/glossary/sql_snippet) serve a similar purpose as segments do for [GUI questions](/glossary/gui_question), ensuring consistent definitions that people can plug into their queries.

## Example segment in Metabase

Figure 1 shows a look at the `Products` table in Metabase's [Sample Database](/glossary/sample_database). You'll notice that the filter sidebar shows three segments at the top of the list, identifiable by a star icon. With these segments in place, we won't need to recalculate what a high margin, new, or top rated product is each time we want to draw on those definitions.

{% include image_and_caption.html url="/glossary/images/segment/segment-example.png" description="<em>Fig. 1</em>. Three segments that we've added to the <strong>Products</strong> table: high margin, new products, and top rated products." %}
