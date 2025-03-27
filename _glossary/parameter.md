---
title: "Parameter"
headline: "Parameter"
def: "A special type of variable that specifies an input to a query."
related-terms:
  - term: Variable
    slug: variable
  - term: Filter widget
    slug: filter_widget
further-reading:
  - title: "Creating SQL templates"
    url: /docs/latest/users-guide/13-sql-parameters
  - title: "Dashboard filters"
    url: /docs/latest/users-guide/08-dashboard-filters
  - title: "Custom destinations: choose what happens when people click on charts in your dashboard"
    url: /learn/metabase-basics/querying-and-dashboards/dashboards/custom-destinations
---

## What is a parameter?

A **parameter** is a special type of variable that specifies an input to a query.

Setting a parameter lets end users input a value (like in a dashboard or report) to change what data that query returns, typically filtering by a [measure](/glossary/measure) or [dimension](/glossary/dimension). The parameter passes that value through to the query being run, and the results of that query will depend on whatever value that person entered.

## Parameter vs. variable vs. argument

You may see "parameter" used interchangeably with "variable" or "argument," so it's worth pointing out some distinctions here. A parameter is a type of variable; it's just one where some specific input value gets passed along to the program or query being run. Not all variables are parameters, though — you may also have variables that are set within your program or query and can't be modified by anyone on the other side.

An argument refers to the value itself that gets passed along when your program or query runs. For example, if you set a parameter as `{% raw %}{{productID}}{% endraw %}`, and enter a value of `34`, your argument is 34. A parameter defines that there will be an input value, but the input value itself is the argument.

So yes, technically these terms all differ, but it's okay to use them interchangeably, as long as you're generally referring to a place or container to pass values into so you can filter results.

## Parameters in Metabase

In Metabase, you can set a parameter using a filter widget or via a URL. Parameters come into play in Metabase in a few different ways:

### SQL templates

By adding parameters to SQL queries in Metabase, you can create [SQL templates](/docs/latest/users-guide/13-sql-parameters) that add [filter widgets](/glossary/filter_widget) to those queries, allowing people to easily change that parameter's value when they run that query.

If we wanted to create a SQL template on a query that counted the number of customers in each state using the [Sample Database's](/glossary/sample_database) `People` table, we'd use:

```sql
SELECT count(*)
FROM people
WHERE state = {%raw%}{{State}}{%endraw%}
```

By wrapping `{%raw%}{{State}}{%endraw%}` in double curly brackets, we've created a parameter that adds a filter widget to this question, letting people input the state they want without needing to change the text of the query itself, like in figure 1:

{% include image_and_caption.html url="/glossary/images/parameter/parameter-sql-template.png" description="<em>Fig. 1</em>. Creating a SQL template that adds a filter widget to a query." %}

### Dashboard filters

[Dashboard filters](/docs/latest/users-guide/08-dashboard-filters) let you set parameters that get applied to a dashboard. For example, you can create a dashboard filter that lets people input a `State` value and link that that filter to the `State` column in the questions or cards on your dashboard. Then when people enter the value they want (like North Carolina, shown in figure 2), they'll see those cards change accordingly.

{% include image_and_caption.html url="/glossary/images/parameter/parameter-dashboard-filter.png" description="<em>Fig. 2</em>. A dashboard with a filter applied on the <strong>State</strong> column." %}

When you enter a value into a dashboard filter, you'll notice that the URL changes to include that value.

### Custom destinations

You can also insert parameters into a URL to dictate what happens when people click on a chart in a dashboard. For example, you can set a [custom destination](/learn/metabase-basics/querying-and-dashboards/dashboards/custom-destinations) by using values from the card's results to construct a URL that directs people to another dashboard or external site with that ID as part of the URL.

Maybe you have a dashboard containing questions that track how different products in your inventory have sold, and a dashboard filter that lets people input the product they want to check in on. You could take things a step further by passing that product's ID onto a custom destination, parameterizing a URL with that ID value and sending people to that product's page on your website. When you visit that site, its URL may look something like this:

```url
https://www.your-website.com/products/id?productID=34
```

In this case, that `productID=34` in the URL is your parameter.

### Embedding

When [embedding](/docs/latest/administration-guide/13-embedding) Metabase questions and dashboards in your app, you can set parameters to customize what different users see when viewing those embeds.
