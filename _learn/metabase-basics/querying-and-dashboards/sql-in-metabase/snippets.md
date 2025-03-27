---
layout: learn_article
date: 2020-07-22 00:15:58
categories: Querying
image: /learn/images/sql-snippets-reuse-and-share-sql-code/highlight-and-save-as-snippet.gif
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/sql-templates/sql-snippets
  - /learn/sql-questions/sql-snippets
  - /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-snippets
  - /learn/grow-your-data-skills/learn-sql/working-with-sql/sql-snippets
  - /learn/metabase-basics/querying-and-dashboards/sql-in-metabase/sql-snippets
---

Snippets allow you to save SQL code as a snippet, and then you or other SQL authors can refer to that snippet in different SQL queries. If you ever need to update that code, you can edit the snippet, and those changes will propagate to all questions) that use that snippet. Anyone with SQL editor permissions for at least one database can use, create, and edit snippets.

![Highlight SQL code and save it as a snippet.](../../../images/sql-snippets-reuse-and-share-sql-code/highlight-and-save-as-snippet.gif)

Snippets are a simple but powerful feature, so let's unpack them. We'll also cover a feature exclusive to [Pro and Enterprise plans](/pricing/) in Metabase: Snippet Folders. These folders and their permissions help you keep your snippets organized, e.g. by database or by type of snippet, and let you grant or deny access to specific folders or subfolders.

## First, a simple Snippet example

Take this short join statement:

```sql
orders AS o
LEFT JOIN products AS p
ON o.product_id = p.id
```

You can highlight that code, name the snippet `Orders and products`, add a helpful description, and summon that snippet in any SQL query using the `snippet:` tag, like so:

```sql
SELECT
    *
FROM
    {% raw %}{{snippet: Orders and products}}{% endraw %}
```

You can also use snippets for common metrics like average order total that take into account quirks of the database. As a trivial example, let's say we know that the account with ID = 1 is a test account, and we don't want that data to skew our average. We can encapsulate that exception in a snippet that we'll call `average order total`.

```sql
(SELECT
    AVG(total)
    FROM
    orders
    WHERE
    id > 1)
```

Then we can use that snippet in a different query where we're looking for products in orders with totals less than the average order total:

```sql
SELECT
    product_id
FROM
    orders
WHERE
    total < {% raw %}{{snippet: average order total}}{% endraw %}
```

That's all it takes to create and use a snippet. Now let's dig in to why they're so useful.

## Why use Snippets?

There are three main use cases for Snippets:

- Standardization: how does your organization define a popular product? Is it by number of units sold? Or by reviews with an average rating greater than 4? You can define those qualifications for a popular product and codify them in a Snippet, `{% raw %}{{snippet: popular products}}{% endraw %}`, and have that code populate in every question that uses that snippet. If down the line this definition needs to change, simply update the snippet's SQL, and the change will propagate to all questions that use that snippet. Similar to how [segments](/docs/latest/data-modeling/segments#creating-a-segment) (a named filter or set of filters) and [metrics](/docs/latest/data-modeling/metrics#creating-a-metric) (a named computation) can standardize analytics in your organization, Snippets offer another way to ensure correctness and consistency across teams.
- Efficiency: Do you find yourself copying and pasting SQL code often? Don't want to bother remembering which foreign keys map to which tables? Write that complicated join once, save it as a snippet, and summon the snippet as needed.
- Education: snippets can level up folks who are new to SQL (or even experienced analysts) by exposing them to your organization's "canonical SQL," or to more efficient or more complex queries. Reading, copying, and building upon quality code is one of the best ways to develop skills. It can also save your organization time: people can copy a snippet's code, modify it to obtain different results, and save that code as a new snippet for others to use.

## Using Snippets

### Snippet sidebar

Metabase's **SQL Editor** has a **snippet sidebar** for viewing, creating, and editing snippets, which you can access by mousing over to the right side of the editor and clicking on the **snippet icon** (three uneven horizontal lines).

![Access the Snippets sidebar by clicking on the snippet icon to the right of the SQL editor.](../../../images/sql-snippets-reuse-and-share-sql-code/snippet-sidebar.gif)

Once you create snippets, you can insert them in the editor using the snippet tag `{% raw %}{{snippet: Orders and products}}{% endraw %}`, or by selecting them from the snippet sidebar:

![Previewing and inserting a snippet from the Snippets sidebar.](../../../images/sql-snippets-reuse-and-share-sql-code/insert-snippet-from-sidebar.gif)

Clicking on a snippet's name in the **snippet sidebar** will insert it at your cursor's current location in the query.

### Editing Snippets

Updating the SQL code of a snippet will update every query that uses that snippet, so make sure to test your code before saving it to avoid breaking people's questions. Of course, if you make a mistake and cause chaos, you can simply correct the code, save the snippet again, and restore order to the universe.

### Snippets and aliases

Note that if you use aliases _in_ your snippet (e.g., `orders AS o`), you'll need to use those aliases _outside_ of the snippet to refer to that data in your query. We recommend that your team has a policy for aliases: either everyone should use tables aliases in their code, or everyone uses the full table names. When in doubt, just use the full table names.

### Archiving Snippets

![You can archive a snippet via the Snippet Edit modal.](../../../images/sql-snippets-reuse-and-share-sql-code/archiving-a-snippet.gif)

Snippets are indestructible: you cannot delete them, but you can archive (and unarchive) them. Archiving a snippet will keep your **snippet sidebar** tidy, as archived snippets do not populate the sidebar. It will also prevent the archived snippet from appearing in the typeahead results in the **SQL Editor**, i.e., the archived snippet won't show up as an autocomplete option when you type `{% raw %}{{snippet: {% endraw %}`. Archiving a snippet does not affect questions that use that snippet, so you can safely archive a snippet without breaking anyone's questions.

## Snippet folders

{% include plans-blockquote.html feature="Snippet controls" %}

[Pro and Enterprise plans](/pricing/) in Metabase include snippet folders and permissions to help keep large numbers of snippets organized. Admins can add snippets to folders and place folders within folders. All snippets will appear in the **snippet sidebar**, including those for other databases (as you might snippetize a string that could be used in multiple databases). You can collect useful snippets for each database in their own folder, and additionally create folders to store snippets relevant to different teams or projects.

![Saving a snippet to a folder.](../../../images/sql-snippets-reuse-and-share-sql-code/save-snippet-to-folder.gif)

Additionally, admins can add permissions to those folders, which control who can view or edit snippets located there:

![Changing a folder](../../../images/sql-snippets-reuse-and-share-sql-code/change-folder-permissions.gif)

Permissions are granted to [groups](/docs/latest/people-and-groups/managing#groups) for each folder, with three permission levels:

- Edit access: view, edit, archive/unarchive snippets.
- View access: view and run snippets.
- No access: cannot view snippets in the sidebar and autocomplete menus. People without access can, however, run queries that include these snippets.

Archiving and unarchiving snippets has no affect on permissions, though you'll need edit access to the folder to archive and unarchive its snippets.

Use folders to keep snippets organized and standardized among and between teams, as well as to keep sensitive snippets visible only to the appropriate groups.

## When to use snippets vs a saved question

How large can a snippet be? In general, if a snippet can be run independently (i.e., you could run it as a query on its own) consider storing that SQL query as a saved question. Reserve snippets for _dependent_ pieces of code. Snippets are also useful for saving strings that are commonly used in queries. For more on when to use snippets, check out [Snippets vs. Saved Questions vs Views](/learn/sql-questions/organizing-sql).

## More info on using Snippets

To learn more about Snippets, check out our detailed documentation:

- [Using Snippets](/docs/latest/questions/native-editor/snippets)
- [Organizing and securing snippets in folders](/docs/latest/permissions/snippets)
