---
title: Custom expression
headline: Custom expression
def: A formula in Metabase that uses functions and mathematical operators to allow for more complicated questions, similar to a formula in spreadsheet software.
related-terms:
  - term: Query builder
    slug: query_builder
  - term: Notebook editor
    slug: notebook_editor
  - term: Custom column
    slug: custom_column
further-reading:
  - title: "Custom expressions in the notebook editor"
    url: /learn/metabase-basics/querying-and-dashboards/questions/custom-expressions
  - title: "Docs on using custom expressions"
    url: /docs/latest/questions/query-builder/expressions
  - title: "List of expressions in Metabase"
    url: /docs/latest/questions/query-builder/expressions-list
redirect_from:
  - /glossary/custom_expression
---

## What is a custom expression?

A **custom expression** in Metabase is a formula that uses functions and mathematical operators to allow for more complicated questions, similar to a formula in spreadsheet software. You can include custom expressions in [questions](/glossary/question) asked via Metabase's [query builder](/glossary/query_builder).

Custom expressions give those [GUI questions](/glossary/gui_question) more power and flexibility, without requiring you to write a full [SQL query](/glossary/native_query). You can write custom expressions to create [custom columns](/glossary/custom_column), or to create more advanced [filters](/glossary/filter) and [aggregations](/glossary/aggregation).

## Example custom expression in Metabase

The example below shows the creation of a custom column that categorizes `Orders` according to their `Subtotal` using the [case](/docs/latest/questions/query-builder/expressions-list#case) function.

{% include image_and_caption.html url="/glossary/images/custom-expression/notebook-editor.png" description="<em>Fig. 1</em>. Writing a custom expression in the notebook editor." %}

Figure 2 shows the resulting table, with our new custom column on the right:

{% include image_and_caption.html url="/glossary/images/custom-expression/custom-column.png" description="<em>Fig. 2</em>. The resulting <strong>Order size</strong> column created using a custom expression." %}
