---
title: "Query builder"
headline: "Query builder"
def: "The graphical interface for asking questions in Metabase."
key-article:
  title: Documentation on asking questions in Metabase
  url: /docs/latest/questions/introduction
related-terms:
  - term: Question
    slug: question
  - term: GUI question
    slug: gui_question
further-reading:
  - title: Getting started with Metabase
    url: /learn/getting-started/getting-started
  - title: Asking questions course in Learn Metabase
    url: /learn/metabase-basics/querying-and-dashboards/questions
redirect_from:
  - /glossary/query_builder
---

## What is the query builder?

In Metabase, the **query builder** is the graphical interface for asking questions.

If you aren't a [SQL](/glossary/sql) person or just prefer to analyze your data using buttons and dropdowns instead of code, the query builder's got you covered. And if you aren't exactly sure what you're trying to figure out about that data, those buttons and dropdowns can give you some ideas, like listing options for the filters and groupings you can add to your starting [table](/glossary/table), [model](/glossary/model), or [saved question](/glossary/saved_question).

## Asking questions with Metabase's query builder

There are a couple ways you can use the query builder to ask questions about your data:

1. Start from the [data browser](/learn/getting-started/data-browser). Add [filters](/glossary/filter) and summarizations using the sidebars to the right of your data visualization.

2. Create your question from scratch using the query builder interface. The query builder offers more flexibility for constructing a question: in addition to the regular filtering and summarization options, you can use [custom expressions](/glossary/custom_expression) to create more sophisticated filters and aggregations. You can also [join tables](/glossary/join), create [custom columns](/glossary/custom_column), and preview your results at each step before visualizing the final product.

These paths aren't mutually exclusive — you can start in the data browser, visualize your data, use the sidebars to tweak your question, open the query builder to make additional changes, and so on.

## Example: using the query builder

We'll use the query builder to construct a question using Metabase's [Sample Database](/glossary/sample_database). Let's say we want to know how our large orders (that is, orders with a `Subtotal` greater than \$100) are broken out by `Product → Category`. Figure 1 shows how we'd construct this question in the query builder:

{% include image_and_caption.html url="/glossary/images/query-builder/notebook-editor.png" description="<em>Fig. 1</em>. Asking a question using the query builder." %}

Once we visualize our question, let's add another filter so we're only viewing full-price orders (orders where there was no discount applied). Figure 2 shows what our query builder looks like just before adding that second filter:

{% include image_and_caption.html url="/glossary/images/query-builder/second-filter.png" description="<em>Fig. 2</em>. Adding a second filter while visualizing our data in the query builder." %}
