---
title: "Variable"
headline: "Variable"
def: "Any value in a program or query that can change. In Metabase, variables in SQL queries get enclosed in double braces."
related-terms:
  - term: Parameter
    slug: parameter
  - term: Native query
    slug: native_query
  - term: SQL
    slug: sql
further-reading:
  - title: "Create filter widgets for charts using SQL variables"
    url: /learn/sql-questions/sql-variables
---

## What is a variable?

A **variable** is any value in a program or query that can change. In [SQL](/glossary/sql), declaring a variable allows you to temporarily store a single value while running a query.

[Parameters](/glossary/parameter) are a type of variable, but not all variables are parameters. When people talk about parameters, they're usually referring specifically to variables that get modified by the end user of a dashboard or report, rather within the text of a query itself.

## Example variable in Metabase

In Metabase, variables are placeholders in [SQL queries](/glossary/native_query) for values that people can change without needing to rewrite the query itself. Using variables allows you to [filter](/glossary/filter) your data, often by adding a [filter widget](/glossary/filter_widget) above that question in the [SQL editor](/glossary/native_query_editor).

Variables get enclosed in double braces, like this: `{% raw %}{{variable_name}}{% endraw %}`. In the example below, we create a variable to filter based on the `Source` field in the [Sample Database's](/glossary/sample_database) `People` table:

```sql
SELECT *
FROM people
WHERE source = {% raw %}{{source}}{% endraw %}
```

When you include a variable in your query (in this case `{% raw %}{{source}}{% endraw %}`), Metabase adds a filter widget above the SQL editor, like in figure 1. Since the filter widget maps to the variable we created, we can plug different values into it to filter for different sources.

{% include image_and_caption.html url="/glossary/images/variable/variable-example-source.png" description="<em>Fig. 1</em>. The filter widget above the query editor maps to the variable wrapped between double braces." %}
