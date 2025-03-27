---
layout: learn_article
date: 2021-01-07 00:15:58
categories: Organization
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/sql-templates/organizing-sql
  - /learn/sql-questions/organizing-sql
  - /learn/grow-your-data-skills/learn-sql/working-with-sql/organizing-sql
---

This article gives an overview of the tools Metabase provides to keep your SQL code organized, and provides some guidance for when to reach for one tool over another.

There are two main tools to organize your SQL code: snippets and saved questions. We'll also talk about database views to distinguish their use from saved questions in Metabase, though views are specific to your database (i.e., they are not part of Metabase).

Both snippets and saved questions serve as templates that you can inject into other SQL questions. As for which to use and when, the rule of thumb is this: use snippets for small, commonly used fragments of SQL, and use saved SQL questions for any code that you'd want to execute by itself.

## Snippets and folders

Use [Snippets](/learn/metabase-basics/querying-and-dashboards/sql-in-metabase/snippets) for critical or frequently-used SQL code. Snippets should be short, reusable lines of SQL.

![Example snippet using the Sample Database included with Metabase.](../../../images/organizing-sql/snippet-example.png)

Just as you can define official aggregations and filters as [metrics and segments](/docs/latest/data-modeling/segments-and-metrics) using the **Query Builder**, you can use Snippets to codify KPIs and filters. For example, you may want to store exactly how you calculate revenue, or what constitutes an active user. Save that SQL code as a snippet, add a description (you could even include your contact info in case anyone has questions), and everyone on your team will now be able to reference that crystallized SQL in your snippet:

```sql
SELECT *
FROM users
WHERE {% raw %}{{ snippet: Active Users }}{% endraw %} AND {% raw %}{{ snippet: Adults }}{% endraw %}
```

Snippets can be crucial to consolidating and standardizing your code. If at any point you refine what constitutes an active user, you only need to update the `Active Users` snippet, and the change will propagate to every question that uses that snippet.

Metabase Enterprise Edition additionally allows you to [organize Snippets into folders](/docs/latest/enterprise-guide/sql-snippets) much like collections organize questions and dashboards. You can set permissions on these folders to restrict access to sensitive SQL, or simply to ensure that users don't have to wade through folders irrelevant to their domain.

![Creating a snippet folder in Metabase Enterprise Edition.](../../../images/organizing-sql/snippet-folder.png)

If you find yourself writing a long snippet, and that snippet returns a set of a results (i.e., the snippet isn't just a `WHERE` clause---it's a query in its own right), consider saving the query as a question for others to reference in their queries.

## Saved questions as building blocks

For larger chunks of SQL code that are of interest by themselves, consider saving that code as a question. That is, after all, what most people do with Metabase: they ask questions.

Questions can be grouped together in dashboards, but they can also be used as building blocks for bigger queries, just like you could pull together multiple snippets in a query.

Suppose you write a query and save it as a question. You can inject it in another query like this:

```sql
SELECT *
FROM {%raw%}{{#123}}{%endraw%}
```

where the `123` is the question's ID. You could also use the question as a Common Table Expression (CTE):

```sql
WITH active_users AS {%raw%}{{#123}}{%endraw%}
SELECT *
FROM Active Users
```

Saved questions are a low-effort way to modularize your analysis. The biggest advantage of modularizing your queries via saved questions (as opposed to Snippets) is that you can run saved questions independently and see their results, which makes questions much easier to debug than snippets.

You could, alternatively, simply duplicate a question and build from the previous question, but this duplication comes at a cost. You now have the same code in two questions; if you later find an error in one question, you'll also have to correct the error in the other question - assuming you remember that they share the same code. By simply referring to a saved question, you'd only need to update the code in one place.

For example, if you're a startup, you'll likely have data on users scattered across normalized tables. In Metabase, you can join those tables in various ways to create a set of questions that your users will be interested in, which allows them to build off those results, referencing those questions in their own queries to slice the data in a particular way.

## Database views

If you're thinking that saved questions seem a lot like views in a database, you're right. The advantage with a question is that you don't need to be an admin to create them, and you can create questions on the fly and nest them in other questions. The disadvantage is that a question is a Metabase construct, and you won't get the performance optimizations of a view native to your database (if there are any). Also, when referring to another question in your SQL code, keep in mind that you can only access the results of the question: you can't access the query itself, meaning you can't reference any variables that might be present in it.

If you find that people are often referring to a question in Metabase as the foundation for their queries, consider talking to your database admin about creating a materialized view that returns the same result set as that saved question. The advantage of a materialized view is that the database won't have to recompute the results each time; the materialized view will behave a lot like an actual table in a database.

Using other saved questions in SQL templates is great for when you don't have access to create views in the database, or if you're just exploring your data and don't want to create views.

## As you grow, push business logic further up the pipeline

Much of analytics is simply slicing the data in different ways to get a better feel for the stories it can tell. As you find your analytics footing, you won't necessarily know which slices of the data are going to help you make the best decisions for your company.

As your organization's analytics setup matures, you'll want to push business logic further up the pipeline, so that the tables that people find in Metabase group together logical units of your business. Curating and building on a core set of saved questions is an easy way to sort out which data matters the most to your organization.

In general, the easier it is for people to analyze your data, the more productive of an organization you'll be. See [Common data model mistakes startups make](/learn/analytics/data-model-mistakes) to learn more.
