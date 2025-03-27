---
title: Filter
headline: Filter
def: A filter is a predicate expression that limits the results of a query based on some stated criteria.
related-terms:
  - term: Predicate
    slug: predicate
  - term: Question
    slug: question
  - term: Filter widget
    slug: filter_widget
  - term: Field filter
    slug: field_filter
  - term: Linked filter
    slug: linked_filter
  - term: Cross-filtering
    slug: cross_filtering
further-reading:
  - title: Filtering documentation
    url: /docs/latest/questions/query-builder/filters
  - title: Getting started with Metabase
    url: /learn/getting-started/getting-started
  - title: Adding filters to dashboards with SQL questions
    url: /learn/dashboards/filters
  - title: Linking filters in dashboards
    url: /learn/metabase-basics/querying-and-dashboards/dashboards/linking-filters
  - title: "Cross-filtering: using a chart to update a dashboard filter"
    url: /learn/dashboards/cross-filtering
---

## What is a filter?

A **filter** is a [predicate expression](/glossary/predicate) that limits the results of a query based on some stated criteria.

For example, you may want to limit the [records](/glossary/record) in your `Orders` table so that you only see orders where the value of the `Total` field is over 100. We can use a predicate expression, `Total > 100`, to filter the orders. For each record, the query evaluates whether that expression resolves true or false, and narrows the results accordingly. So in this case if the record has a total greater the 100, that record is included in the results.

In [SQL](/glossary/sql), queries are filtered using the `WHERE` clause, like `WHERE Total > 100`. You can also filter [aggregations](/glossary/aggregation) in SQL using the `HAVING` clause, like `HAVING AVG(rating) > 3.5`.

## Filters in Metabase

- [Filter the results of your questions](/docs/latest/questions/query-builder/filters).
- Add [filters to your dashboards](/docs/latest/dashboards/filters).
- Set up [cross-filtering](/learn/dashboards/cross-filtering) so dashboard filters update when someone clicks on a [card](/glossary/card).
- [Link filters](/learn/metabase-basics/querying-and-dashboards/dashboards/linking-filters) on a dashboard to limit results based on the value of another filter.
- Configure smart [field filters](/glossary/field_filter) in [native SQL queries](/glossary/native_query) that know which filtering options to present based on [field type](/glossary/field_type) and column data.
- Create [filter widgets](/glossary/filter_widget) that act as a search function on a dashboard, like for a [lookup tool](/learn/metabase-basics/querying-and-dashboards/dashboards/build-a-record-lookup-tool).

## Example filter in Metabase

Figure 1 shows the `Products` table in Metabase's [Sample Database](/glossary/sample_database), with a filter added that narrows the results to only include products where the `Title` field contains the word "Hat":

{% include image_and_caption.html url="/glossary/images/filter/filter-hat.png" description="<em>Fig. 1</em>. A question in Metabase with one filter added." %}
