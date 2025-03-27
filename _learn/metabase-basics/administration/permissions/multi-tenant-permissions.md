---
layout: learn_article
date: 2021-12-16 00:12:40
categories: Enterprise
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/permissions/multi-tenant-permissions
---

## Single schema with multiple customers (commingled data)

If all your customer data is in the same schema and on the same tables (often referred to as "data commingling"):

| Tenant ID | Column 1 | Column 2 |
| --------- | -------- | -------- |
| A         | ...      | ...      |
| B         | ...      | ...      |
| C         | ...      | ...      |

[Data sandboxing](/docs/latest/enterprise-guide/data-sandboxes) is the way to go. Most organizations that use Metabase to deliver multi-tenant analytics will use:

- [Row-restricting sandboxes](/learn/permissions/data-sandboxing-row-permissions) (aka basic sandboxes) to hide rows from Tenants that don't match their Tenant ID.
- [Column-restricting sandboxes](/learn/permissions/data-sandboxing-column-permissions) (custom sandboxes) to hide columns from specific tenants.

You can also configure SSO with data sandboxing permissions so that people get the right level of row and column access from their very first login. To learn more about how multi-tenant permissions and embedding work together, see [Securing data with SSO and data sandboxing](/learn/metabase-basics/embedding/securing-embeds).

### Restricting rows based on tenant ID

Let's say that you have a table called **Data** that looks like this:

| Tenant ID | Marvelous Metrics | Insane Insights |
| --------- | ----------------- | --------------- |
| A         | ...               | ...             |
| B         | ...               | ...             |
| C         | ...               | ...             |

You can create a [basic sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) to display a filtered version of **Data** to different tenants based on a Tenant ID. That means Tenant A will see the rows where the **Tenant ID** column has the value "A", and Tenant B will see the rows where the **Tenant ID** column has the value "B", and so on.

Here's how the basic sandbox will work:

1. You'll create a group, for example "Sandboxed Tenants", and add people's Metabase accounts to that group.
2. For each person's account, you'll [add a user attribute](/docs/latest/people-and-groups/managing#adding-a-user-attribute) like "Tenant ID", with the user attribute value set to "A", "B", or "C".
3. Once you've set up a group with user attributes, [create a basic sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) from your **Admin settings** > **Permissions**.

The basic sandbox will display the **Data** table with a filter applied to the **Tenant ID** column. The filter value will get dynamically set based on each person's login. For example, an account with the user attribute "Tenant ID" set to "A" will see the **Data** table filtered on `Tenant ID = A`.

### Restricting columns based on tenancy

Now, imagine that your **Insane Insights** column is a premium feature, and Tenant B is the only customer paying to see these **Insane Insights**. Tenant A and C are saving money, so they'll only be able to see **Marvelous Metrics**.

| Tenant ID | Marvelous Metrics | Insane Insights                   |
| --------- | ----------------- | --------------------------------- |
| A         | ...               | {% include svg-icons/cross.svg %} |
| B         | ...               | ...                               |
| C         | ...               | {% include svg-icons/cross.svg %} |

In this situation, you can leave Tenant A in the [basic sandbox from the row-restricting example](#restricting-rows-based-on-tenant-id). But you'll need to move Tenant A and C to a [custom sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) --- which will let you restrict columns in addition to rows.

Here's how you'll set up a custom sandbox to selectively hide columns (in addition to restricting tenants to their own rows):

1. Create a group called "Metrics-Only Tenants".
2. Move (or add) people from Tenant A and Tenant C to the "Metrics-Only Tenants" group.
   > When you're sandboxing the **Data** table in different ways for different groups, make sure that each Metabase account only belongs to a single group --- either "Sandboxed Tenants" OR "Metrics-Only Tenants".
3. For each person's Metabase account, you'll have to [add a user attribute](/docs/latest/people-and-groups/managing#adding-a-user-attribute) like "Tenant ID", with the user attribute value set to "A", "B", or "C".
4. Next, you'll create a SQL question using **Data** table like this:

   ```sql
   SELECT marvelous_metrics
   FROM tenants
   WHERE tenant_id = {%raw%} {{ tenant_user_attribute }} {%endraw%}
   ```

5. Save the SQL question as "Marvelous Metrics".
6. [Create a custom sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) using the "Metrics-Only Tenants" group and "Marvelous Metrics" SQL question.

The custom sandbox will display the "Marvelous Metrics" SQL question (in place of the original **Data** table) to people in the "Metrics-Only Tenants" group.

For example, someone with the user attribute "Tenant ID" set to "A" will only see the **Marvelous Metrics** column from the **Data** table, filtered to rows where the **Tenant ID** column has the value A.

## Multiple schemas (one schema per customer)

If your customer data is stored in separate tables in the same schema or different schemas within one database, like this:

**Tenant A's schema**

| Tenant A | Column 1 | Column 2 |
| -------- | -------- | -------- |
| Row 1    | ...      | ...      |
| Row 2    | ...      | ...      |
| Row 3    | ...      | ...      |

**Tenant B's schema**

| Tenant B | Column 1 | Column 2 |
| -------- | -------- | -------- |
| Row 1    | ...      | ...      |
| Row 2    | ...      | ...      |
| Row 3    | ..       | ...      |

You'll get to choose between:

- [Granting self-service or view-only access to a schema](#granting-customers-self-service-or-view-only-access-to-their-schema).
- [Granting native SQL access to a schema](#granting-customers-native-sql-access-to-their-schema).

Unlike commingled data, one-schema-per-customer (antisocial?) data are incompatible with sandboxes, because a sandbox can only assign permissions at the row and column level, not the schema level.

### Granting customers self-service or view-only access to their schema

Let's say that you have a single database that contains ten different tables, and each of these tables corresponds to one customer (in this case, different companies). Our goal is to make sure that each customer can only access the table that contains their own information.

**Note**: The method below assumes that your customers do not need access to Metabase's native SQL editor and will instead use the [query builder](/docs/latest/questions/introduction) to ask questions.

1. If you haven't already, [connect your data source](/docs/latest/administration-guide/01-managing-databases) to Metabase.

2. In the **Admin settings** > **Permissions** > **Data**, block the All Users group's access to the database.

3. In the **Admin settings** > **People**, create a [group](/docs/latest/people-and-groups/managing#groups) for your first customer. You may only need one group for each company, but if your customers want some of their employees to be able to ask questions and others to only view them, you'll need to create multiple groups per customer so that you can set different levels of permissions. Naming your groups according to some defined convention can help you stay organized — consider something like **Company A (Self-service)** and **Company A (View only)**.

4. Return to the **Permissions** > **Data** > **Databases** page, then grant your newly created group access to the table that corresponds with the correct customer. If you want your customers to be able to ask questions and create dashboards _within_ their table, change their **Create query** permissions to **Query builder**. In this context, the Create queries access refers to the table, not the database as a whole.

   If your customers have some employees who should only _view_ data (rather than have self-service access), you'll need to create collections to house those specific questions and dashboards. See [collection permissions](./collection-permissions).

   Avoid granting your groups access to the native SQL editor, as this native query editing allows people to query tables that they can't see in Metabase and shouldn't have access to.

5. [Invite your first user](/docs/latest/people-and-groups/managing#creating-an-account), adding them to the appropriate group in the process. If you're using [SSO](/docs/latest/administration-guide/10-single-sign-on) to handle account creation, you won't need to manually invite users.

6. Repeat steps 3–5 to add the user accounts for each of your ten customers.

If you grant a group access to all tables within a database and later modify your database to include a new table, Metabase will default to giving that group access to the new table. However, if you've scoped each group's permissions to a single table — like we did above — Metabase will default to hiding any new tables that you add.

### Granting customers native SQL access to their schema

Since Metabase's SQL editor requires unrestricted access to your database as a whole, enabling it with the above method would let your customers query tables that don't belong to them. If native SQL queries are a must for your customers:

1. Create a user account at the database level — not in Metabase — for your first customer. This user account should only have permission to access their specific tables or schema within the database. For example, if you have a Postgres database, you'll need to add a user to your database via psql. In Postgres you'll then give them permissions only to the table(s) you want the customer to see.

2. In Metabase, [add a connection to your database](/docs/latest/administration-guide/01-managing-databases) with the user account you just created in your database.

3. Make a new [group](/docs/latest/people-and-groups/managing#groups) in Metabase. Grant that group access to your newly added database — i.e., the connection that corresponds to that customer's schema. Since the user role at the database level dictates what your customer can view, you can grant the group **Can view** access to the database and **Query builder and native** access along with it.

   People who belong to that group will be able to see all the tables in Metabase that the Postgres user (or whatever database you're using) has access to in the database. If you want to hide a table later on, you'll need to change permissions in the database itself, not in Metabase. Even if you hid a table in Metabase, a person with native access could still query them.

4. Invite your first user, adding them to the appropriate group in the process. If you're using [SSO](/docs/latest/administration-guide/10-single-sign-on) to handle account creation, you won't need to manually invite users.

5. Repeat steps 1–4 for the rest of your customers. In Metabase, it will look like you've added as many databases as you have customers.

### Creating sandbox permissions programmatically

If you're catering to hundreds or thousands of customers, consider scripting the permissions process using the [Metabase API](/docs/latest/api). If you need to set up a new Metabase instance or want to replicate the same dashboards and saved questions for each of your customers, the [serialization feature](/docs/latest/enterprise-guide/serialization) (available on [Pro and Enterprise plans](/pricing)), can help speed things along. Keep in mind that serialization does _not_ include permissions settings, so you'll need to either script or manually configure which groups can access each table.

## Further reading

- [Embed Metabase in your app to deliver multi-tenant, self-service analytics](/learn/embedding/multi-tenant-self-service-analytics)
- [Serialization: preloading dashboards in a new Metabase instance](/learn/administration/serialization)
- [Working with the Metabase API](/learn/administration/metabase-api)
