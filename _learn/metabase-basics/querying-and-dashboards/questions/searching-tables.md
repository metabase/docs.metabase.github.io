---
layout: learn_article
date: 2020-12-01 00:09:26
modified: 2020-12-01 00:09:26
categories: ["Querying"]
level: Novice
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/basics/questions/searching-tables
  - /learn/analytics/searching-tables
  - /learn/questions/searching-tables
---

{% include youtube.html id='45ltec8BUew' %}

Adding filters to your questions can make searching text in your questions a breeze. You can follow along with the examples in this article using the [Sample Database](/glossary/sample_database) included with each Metabase installation.

## Search within a question

We'll start by clicking the **Browse Data** button, selecting `Sample Database`, and opening the `Products` table.

To search within questions, we use a customizable filter. We'll click the **Filter** button and find the column we want to filter by in the list.

Let's use the column `Title`. There's the dropdown menu next to the column name that currently says `Is`. A popup with the **text filter options** will appear to offer us:

- `Is`
- `Is not`
- `Contains`
- `Does not contain`
- `Is empty`
- `Not empty`
- `Starts with`
- `Ends with`

We'll select `Starts with` and type "rustic" in the search box on the **Filter sidebar**. We'll click **Apply Filter** to add the filter to our question.

![Creating a search widget by adding a filter to a question.](../../../images/searching-your-tables-and-questions/create-search-filter.png)

With the filter applied, our question will only list product titles that start with "rustic".

### Update your search filter

Now that we've added a filter, our search filter is at the top of our table. We can click on the filter description, which says `Title starts with rustic`.

![Close up picture of the question search filter.](../../../images/searching-your-tables-and-questions/search-widget.png)

In the popup, we can use the text box to replace the current search term, for example with "Marble." We can also change how the widget filters the results by clicking the dropdown menu that currently says `Starts with`, for example by changing our **text filter options** to `contains`. We update our search widget from `Title starts with rustic` to `Title contains Marble`, and make the search case sensitive.

![Using the search widget to change what we](../../../images/searching-your-tables-and-questions/updating-search-widget.png)

### Search for multiple values

Filter widgets in Metabase allow you to search for multiple values at the same time. Let's say we want to filter results by products that contain either "Marble", "Clock", or "Wallet". We can click on the filter description again, type "Clock", then comma (this tells Metabase "i'm done typing a value and will now enter another value"), and then "Wallet":

![Search with a filter widget](../../../images/searching-your-tables-and-questions/updating-search-widget.png)

When you use multiple values in the "Contains" filter (and "Starts with", and "Ends with" ) Metabase will search for records that contain any _one_ of those values (an implicit `Or`, not `And`). If you instead want to find records to contain _all_ of those values (for example records that contain both "Marble" _and_ "Clock"), you need to add a filter for each value. Or you could use a custom expression.

### Advanced search with custom expressions

[Custom expressions](/glossary/custom_expression) are a way to make advanced queries with numbers or text. Let's say we want to filter results by products that either are rustic or are clocks. So we want records whose title starts with "Rustic" or ends with "Clock".

Let's create a custom expression by clicking on the filter to edit it once again, clicking on **<**, and selecting **Custom Expression** at the bottom of the sidebar.

If we start typing, we'll see suggestions pop up that we can use in our custom expression.

![The Custom Expression sidebar is open and an expression beginning with `contains()` is visible.](../../../images/searching-your-tables-and-questions/contains-cust-exp.png)

We'll write our base query like so: (`startsWith([Title] , "Rustic")`).

- `startsWith` is the kind of filter we want
- `[Title]` is the column to filter
- `"Rustic"` is the term to filter for

We'll add a space and type `OR`, then we'll write another text search function: `OR endsWith([Title] , "Clock")`, and click **Done**.

![Creating a Custom Expression that searches through the Title column of the Products table for the words](../../../images/searching-your-tables-and-questions/create-custom-expression.png)

## Searching on foreign keys

We can use [foreign keys](/glossary/foreign_key) to search a table based on data from a connected table. To be able to search on foreign keys with strings as well as ID numbers, admins will need to [change the data model settings](/docs/latest/data-modeling/metadata-editing) settings. From the main Metabase navigation bar, click on the **gears icon** to open up the **Admin Panel**, click on the **Data Model tab**, and select `Sample Database`. Next, click on the `Reviews` table and click on the **gears icon** next to the `Product_ID` field.

In our example, the `Product_ID` column is set up as a foreign key, with `search box` filter settings, and a display value of `Title`. This way when we filter on the `Product_ID` we can filter by title instead of ID number, and the table will display the title of each product instead of its ID number.

![In the data model for the Product_ID field in the Reviews table, the admin has saved the Filtering on this field settings as Search box and the Display values as Title.](../../../images/searching-your-tables-and-questions/data-model-info.png)

You can learn more about editing metadata in our [documentation](/docs/latest/data-modeling/metadata-editing).

With our metadata set, we'll be able to filter Reviews by the product title:

1. Click the **Browse > Databases** button, select `Sample Database`, and open the `Reviews` table.
2. Clicking the **Filter** button. This will open the filter editor with all the columns in the `Reviews` and `Products` table
3. Select the `Products` table in the sidebar of the **Filter** editor.
4. Find the `Title` field, type "Practical", and select one of the values in the dropdown, like "Practical Bronze Computer".

![Creating a search widget for the Reviews table using the title of the product instead of the ID.](../../../images/searching-your-tables-and-questions/foreign-key-searching.png)

## Add a search widget to your SQL question

In a normal database, we'd need to craft a new SQL query for every search term, but Metabase makes searching our database easy, even when using SQL queries. All we need to do is insert a [variable](/glossary/variable) in the `WHERE` clause of a query.

In the upper right of the main navigation bar, we'll click on the **pencil icon** to write SQL.

```sql
SELECT *
FROM REVIEWS
[[WHERE UPPER(Body) LIKE UPPER(CONCAT('%', {% raw %}{{search_term}}{% endraw %}, '%'))]]
```

As soon as we start typing within the curly brackets {% raw %}`{{}}`{% endraw %}, the search bar will appear above the SQL input area Metabase will kick out the variables sidebar.

![The SQL Editor with the example query typed into the SQL text area.](../../../images/searching-your-tables-and-questions/sql-q.png)

### SQL question breakdown

In plain English, this SQL query says, "Show me reviews where the body of the review includes the search term, whether or not the two are capitalized in the same way."

Let's break down the elements in line three:

- `[[]]` The brackets make the filter optional. If no search term is supplied to the variable, the query will return unfiltered rows.
- `WHERE` filters the results.
- `UPPER()` capitalizes both the text being searched and the search term, so they will match even if there is a difference in case.
- `BODY` is the column to filter.
- `LIKE` searches for a pattern.
- `CONCAT()` (short for concatenate) combines strings.
- `'%'` A percent symbol is a wild card. If positioned before the search term additional text can come before the term. Wrapping the search term with `%` searches for the term even if it's surrounded by text.
- {% raw %}`{{}}`{% endraw %} The double curly brackets wrap a variable.
- `search_term` The variable that the filter widget will supply with text to search for.

### Variables sidebar

The variable type has selected `Text`, but there are several other options as well:

- Number
- Date
- Field filter

Filters can be both complex and insanely useful; check out [filter widgets](/glossary/filter_widget) and [field filters](/learn/sql-questions/field-filters) to get a sense for the many ways they can provide valuable insights.

Below `Variable type` is `Filter widget label`, which automatically uses the text we type between the curly brackets as our label.

For additional examples and advice on typing SQL queries that support a search widget, click the **Help tab** towards the top of the sidebar.

![The variable type options, creating a new placeholder for the widget label, and scrolling through the](../../../images/searching-your-tables-and-questions/variables-sidebar.png)
