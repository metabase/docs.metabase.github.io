---
layout: learn_article
date: 2020-12-01 00:35:58
modified: 2020-12-01 00:35:58
categories: ["Reporting"]
level: Advanced
image: /learn/images/adding-filters-to-dashboards-with-sql-questions/finished-dashboard.png
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/dashboards/filters
  - /learn/dashboards/filters
  - /learn/metabase-basics/querying-and-dashboards/dashboards/filters
---

{% include youtube.html id='itNp4cHktlw' %}

This article covers how to create dashboard widgets to filter data in [native queries](/glossary/native_query). Selecting a value in the dashboard filter will update the results in the SQL question.

![A dashboard with a SQL question wired up to a filter.](../../../images/adding-filters-to-dashboards-with-sql-questions/dashboard-with-filter-widget.png)

The goal here is to understand how to connect dashboard filter widgets to a special variable type, called a field filter, that we insert into the SQL code of our questions.

We'll cover two examples: one date filter (up next), and one [text filter with a dropdown list](#connecting-a-sql-question-to-a-dropdown-filter-widget-on-a-dashboard).

## Adding a field filter variable to a SQL question

Let's start with a question written in SQL that shows the orders per month from the [Sample Database](/glossary/sample_database) included with Metabase. From any Metabase page, in the upper right on the navigation bar, click **+ New** and select **SQL query** (or **Native query**).

![A question written in SQL showing orders per month, visualized as a line chart.](../../../images/adding-filters-to-dashboards-with-sql-questions/question-without-variable.png)

Here's the SQL code:

```sql
SELECT DATE_TRUNC('Month', CREATED_AT) AS "Created",
       COUNT(*) AS "Number of orders"
FROM orders
GROUP BY "Created"
ORDER BY "Created" ASC
```

Now, we're talking about filtering data, and astute readers might already recognize that we don't have a filter statement in our SQL code. There is no `WHERE` clause. Meaning: even if we were to add this question to a dashboard, and add a filter widget to that dashboard, that filter would have no effect on our SQL question, because there would be no designated place in our code for the widget to insert its value.

Let's fix that by adding a special variable to our SQL question known as a **Field Filter**. Field Filters are a special type of variable that map the variable to a [field](/learn/grow-your-data-skills/data-fundamentals/database-basics#columns-vs-fields) (or column) in a table.

Here's the SQL code we'll add:

```sql
{% raw %}
WHERE {{created_at}}
{% endraw %}
```

You may notice the lack of an `=` operator in the `WHERE` clause. This abbreviated syntax exists because Field Filters handle some SQL code for you under the hood. For more on what's going on here, check out [Field Filters](/learn/sql-questions/field-filters).

With the `WHERE` clause in place, our code looks like this:

```sql
{% raw %}
SELECT DATE_TRUNC('Month', CREATED_AT) AS "Created",
       COUNT(*) AS "Number of orders"
FROM orders
WHERE {{created_at}}
GROUP BY "Created"
ORDER BY "Created" ASC
{% endraw %}
```

Now that we have our variable in our SQL code, we need to tell Metabase how to use the variable. When we add a variable to our code, Metabase will slide out the **Variables sidebar**. We'll set the `Variable type` to `Field Filter`, then map that variable to a field in our database so Metabase can know what kind of filter widget it should add to the question. In this case, we'll map the variable to the `created_at` field of the `orders` table.

![Setting the variable type for our SQL variable created_at to Field Filter, then setting the Field to map to option to the created_at field (column) of the orders table.](../../../images/adding-filters-to-dashboards-with-sql-questions/field-filter-created-at.png)

Note that we can call the SQL variable whatever we want, but in order for the dashboard filter to work, we must map the variable to the appropriate field.

For now, we'll leave the filter widget label as `Created at`, and leave the **Required?** toggle alone. If the variable's filter widget lacks a value, Metabase will run the question as if the `WHERE` clause didn't exist.

We can also select a filter widget type, though this widget will only apply to our question. Let's select the `Date filter` type.

Let's **Save** our question. We'll call it `Number of orders per month - SQL`.

Before we add our question to a dashboard, let's take a quick detour.

## A detour on data types

When we select the `created_at` field, Metabase knows that the field type is a `Creation timestamp` (note the **calendar icon**). You can learn about the types of fields (columns) each table has by browsing your data.

![View information about your data by clicking on Browse Data from the top navigation bar, selecting your database---in this case, Sample Database---clicking on the information icon next to a table, and clicking on the book icon to learn about this table.](../../../images/adding-filters-to-dashboards-with-sql-questions/learn-about-this-table.png)

![Viewing information on the fields in the Orders table of the Sample Database.](../../../images/adding-filters-to-dashboards-with-sql-questions/data-browser.png)

Administrators can edit the field type, as well as other [metadata](/glossary/metadata) settings, in the **Data Model tab** of the **Admin Panel**. To learn more, check out our [documentation on metadata editing](/docs/latest/administration-guide/03-metadata-editing).

## Connecting a dashboard filter widget to a field filter variable

So we have our SQL question with a Field Filter variable in a `WHERE` clause, and it's time to add that question to a dashboard.

Next, we'll need to:

- Create a dashboard.
- Add our question to a dashboard.
- Add a filter widget to that dashboard.
- Connect that dashboard filter widget to the field filter variable in our SQL question.

Let's [create a dashboard](/docs/latest/dashboards/introduction#how-to-create-a-dashboard) (we'll give our dashboard the wildly unimaginative name `Dashboard with filter widgets`).

Then we'll [add our SQL question to the dashboard](/docs/latest/dashboards/introduction#adding-or-saving-questions-to-a-dashboard).

Next, we're going to [add a filter widget to our dashboard](/docs/latest/dashboards/filters#adding-a-filter-or-parameter). Click on the **pencil** icon to enter Dashboard edit mode, then:

- Click on the **filter icon** to add a filter widget to the dashboard.
- Under `What do we want to filter`, we'll select `Time`.
- For `What kind of filter?`, we'll select `Date filter`.
- Next, we'll need to connect our widget to the Field Filter variable in our question. Click on the dropdown menu in the center of our question, and select our `Created At` Field Filter variable.
- Click the **Done** button at the top of the screen.
- Then **Save** the dashboard.

![Adding a Date filter (Time → All options) to a dashboard, and connecting the filter widget to the Field Filter variable, Created at in our SQL question.](../../../images/adding-filters-to-dashboards-with-sql-questions/column-to-filter-on.png)

Now we're all wired up, and we're ready to test out our new Date filter. This particular widget type gives us an abundance of options. Let's look at orders for the past six months.

![Using a dashboard filter to filter orders for the last six months.](../../../images/adding-filters-to-dashboards-with-sql-questions/orders-last-six-months.png)

## Connecting a SQL question to a dropdown filter widget on a dashboard

Let's say we want to have a dashboard filter widget to filter products by category, and we want people to be able to select the available categories from a dropdown list. To set this up, we'll put a field filter variable in our SQL query, and map it to the `category` field in the `products` table. Then we'll map the dashboard filter to that variable. Let's walk through it.

![A dashboard with a dropdown filter connected to a SQL question card.](../../../images/adding-filters-to-dashboards-with-sql-questions/dropdown-example.png)

First, create a dashboard. Let's call it "Dashboard with SQL question and dropdown filter" (so our mission is clear). Save the dashboard.

Next, ask a new Native/SQL question to get all fields from the `products` table. To filter products by category, we'll include a variable in brackets that we'll call `category`:

```sql
{%raw%}
SELECT
  *
FROM
  products
WHERE {{category}}
{%endraw%}
```

In the variable side menu the Metabase kicks out, we'll configure this variable like so:

- **Variable type**: Field filter.
- **Field to map to:** the Category field in the Products table.
- **Filter widget type**: String.
- **Filter widget label**: Category (or whatever you want).
- **How should users filter on this variable**: Dropdown list.
- **Required**: No.
- **Default filter value**: leave blank (so no product categories are filtered by default).

![Creating a SQL question that includes a field filter mapped to the products.category field. The field filter variable is then connected to a filter widget that](../../../images/adding-filters-to-dashboards-with-sql-questions/dropdown-field-filter.png)

Save the question and add it to your dashboard. Edit your dashboard, and add a Text or Category filter.

![Adding a text or category filter widget to a dashboard.](../../../images/adding-filters-to-dashboards-with-sql-questions/add-a-dashboard-filter-text-or-category.png)

Select **Is** so people select one or more values from a list or search box.

![Setting up a dropdown dashboard filter connected to a field filter variable in a SQL question.](../../../images/adding-filters-to-dashboards-with-sql-questions/dashboard-dropdown-filter.png)

Map the dashboard filter widget to the Category variable on the question card. Make sure the **How should people filter on this column** option is set to "Dropdown list".

Click **Done** at the bottom of the sidebar, then save your dashboard. You should be good to go.

## Further reading

- [Create filter widgets for charts using SQL variables](/learn/sql-questions/sql-variables)
- [Field Filters: create smart filter widgets for SQL questions](/learn/sql-questions/field-filters)
- [SQL parameters](/docs/latest/users-guide/13-sql-parameters)
- [Dashboards](/docs/latest/users-guide/07-dashboards)
- [Dashboard filters](/docs/latest/users-guide/08-dashboard-filters)
- [The Data Model page: editing metadata](/docs/latest/administration-guide/03-metadata-editing)
