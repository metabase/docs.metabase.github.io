---
layout: learn_article
date: 2020-11-11 00:16:05
image: /images/twitter/default.png
categories: Administration
author: The Metabase Team
redirect_from:
  - /learn/organization/organization/collection-permissions
  - /learn/permissions/collection-permissions
---

Collections keep questions, dashboards, and models organized and easy to find. It's helpful to think of collections as folders that store our work. Collection permissions give [groups of people](./strategy#how-to-approach-permissions) access to:

- View or edit the questions, dashboards, or models saved in a collection.
- Edit collection details, such as a collection's name, or where it's saved.

In this tutorial, we'll create collections for a company with teams called Canoes and Sailboats, and set up collection permissions so that:

- Everyone at the company can view, but not edit, the work that's saved in the top-level collection for the company (in Metabase, it's called **Our analytics**---you might think of this as a root directory or a parent folder).
- People on the Canoes team will be able to save, view, and edit work that's shared between team members in the Canoes collection. People on the Sailboats team will get access to their own Sailboats collection.
- The Canoes team will get view-only access to the work saved in the Sailboats collection. The Sailboats team will get view-only access to the Canoes collection.

## Reviewing the default collection permissions

In a fresh, brand new Metabase:

1. Click on the **gear icon** and select **Admin settings** > **Permissions** > **Collections**.
2. Click on **Our analytics** to go to the collection permissions page for the root collection.

From the **Permissions for Our analytics** page, you'll find that **Collection access** is set to **Curate** for the default groups Administrators and All Users.

All Users includes everyone that's added to your Metabase, and the **Curate** permission allows a group to view and edit a collection. So, Metabase's default collection permissions will allow everyone at Boats to view and edit the work that's saved in **Our analytics**.

## Configuring permissions to "Our analytics"

We're going to revoke access to **Our analytics**, because Metabase grants the _most permissive_ level of access across all of the groups that someone belongs to.

You can’t remove people from the All Users group, so if you give All Users **Curate** permissions to **Our analytics**, then that’ll always be the most permissive setting for everyone who uses your Metabase, regardless of any other group that you put people in.

1. Go to **Admin settings** > **Permissions** > **Collections** > **Our analytics**.
2. Click on the dropdown menu at the **All Users** row and **Collection access** column..
3. Select **No access**. Toggle on **Also change sub-collections** so that these permissions apply to all sub-collections nested under **Our analytics**.

![Revoking All Users access to the Our analytics collection and its sub-collections.](../../../images/guide-to-collection-permissions/no-access-our-analytics.png)

## Creating new groups and collections

Next, we'll create groups to match our Canoes and Sailboats teams. Go to **Admin settings** > **People** > **Groups** > [Create a group](/docs/latest/people-and-groups/managing#groups), and call the group "Canoes".

To create a new collection, we'll go to the Metabase homepage and click **+ New** > **Collection**. We'll create two collections named [after our new groups](./strategy#org-chart-based-permissions), and save each of those collections inside **Our analytics**.

## Setting collection permissions

We'll set up collection permissions for the Canoes collection first, so that:

- The Canoes group can view and edit questions, dashboards, and models saved in the Canoes collection.
- The Canoes group can move, re-name, or archive the Canoes collection.
- The Sailboats group can only view the work that's saved in the Canoes collection.

You can navigate back to **Admin settings** and go to the collection permissions page for each collection, or you can set up permissions directly from the Metabase homepage.

1. Click on the Canoes collection in the sidebar.
2. Click on the **lock icon** to open a collection permissions modal.
3. Select **Curate** from the dropdown menu for the **Canoes** row and **Collection access** column.
4. Select **View** from the dropdown menu for the **Sailboats** row and **Collection access** column.
5. Click **Save**.

![Granting different permissions to the Canoes collection.](../../../images/guide-to-collection-permissions/collection-permissions-modal.png)

To set up permissions for the **Sailboats** collection so that the Sailboats group has **Curate** access, but the Canoes group has view-only access:

1. Click on the **Sailboats** collection in the sidebar.
2. Click on the **lock icon** to open a collection permissions modal.
3. Select **Curate** from the dropdown menu for the **Sailboats** row and **Collection access** column.
4. Select **View** from the dropdown menu for the **Canoes** row and **Collection access** column.
5. Click **Save**.

## How collection permissions interact with data permissions

| Collection permissions                                                             | [Data permissions](./data-permissions)                                          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| View the _results_ of a question, dashboard, or model saved in a given collection. | _View and query_ the underlying tables used by a question, dashboard, or model. |

Let's say that our Canoes group has two sets of permissions:

- **Curate** collection permissions to the Canoes collection;
- **Can view** data permissions on the `Orders` table;

If the Canoes collection contains a question created using the `Orders` table, here's what you can expect each permission to allow the Canoes group to do:

| **Curate** the Canoes collection                 | **Can view** permissions to `Orders`                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------ |
| Edit the question title or description.          | View the visualization (the "result") of the question.                         |
| Move or copy the question to another collection. | Change the visualization type of the existing result returned by the question. |

Essentially, the Canoes group will have the ability to interact with the question that's saved in their collection, but they won't be able to query any additional data from the `Orders` table (whether through the question or the data browser).

![Viewing a question saved in an accessible collection with No self-service permissions to the question](../../../images/guide-to-collection-permissions/no-data-access.png)

To allow people to create and edit questions, you can set the Canoes group's **Create query** permissions to **Query builder only** for the `Orders` table. Then Canoes will be able to:

- Use the query builder to change the query used by the question.
- Filter or summarize data from the `Orders` table to update the result returned by the question.
- View the `Orders` table from the link below the question name.

![Viewing a question saved in an accessible collection with Unrestricted permissions to the question](../../../images/guide-to-collection-permissions/full-data-access.png)

## How permissions apply to dashboards with questions from different collections

Let's say that the Canoes group has an updated set of permissions:

- **Curate** collection permissions to the Canoes collection.
- **No access** collection permissions to the Sailboats collection.
- **Can view** data permissions to the `Orders` table.

If all of the questions on a dashboard are also saved in the Canoes collection, the Canoes group will see all of the cards:

![Viewing a dashboard with questions saved in an accessible collection.](../../../images/guide-to-collection-permissions/full-dash-card-access.png)

If one of the questions on a dashboard is saved in the Sailboats collection (even if that question uses the `Orders` table), the Canoes group will see a "locked" card:

![Viewing a dashboard with a locked card caused by a question saved in an inaccessible collection.](../../../images/guide-to-collection-permissions/partial-dash-card-access.png)

Since non-admins aren't aware of groups or permissions, "locked" cards can happen when people with broader permissions try to share their work with people who have more restricted permissions.

For example, let's say that the Pirate Ships group has permissions to help themselves from both of the Canoes and Sailboats collections. If the Pirate Ships group builds a dashboard and shares it with a Canoes group member, the Canoes group member will see locked cards for any questions that are still saved in the Sailboats collection.

To avoid locked cards, we recommend duplicating questions into the collection where you intend to save your dashboard.

## Further reading

- [Collection permissions documentation](/docs/latest/administration-guide/06-collections)
- [Data permissions tutorial](./data-permissions)
- [Data permissions documentation](/docs/latest/administration-guide/data-permissions)
- [Troubleshooting permissions](/docs/latest/troubleshooting-guide/permissions)
- [Keeping your analytics organized](/learn/metabase-basics/administration/administration-and-operation/same-page)
