---
layout: learn_article
date: 2023-05-31 00:00:00
categories: jekyll update
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/permissions/data-sandboxing-use-cases
---

## Managing permissions in a multi-tenant environment

If you're [embedding Metabase](/docs/latest/embedding/introduction) for [multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics), you can use sandboxes to make sure tenant A won't be able to see tenant B's data, and vice versa.

Sandboxes are excellent at managing permissions for complex org structures, even if you only have one customer. For example, if your customer is a university, that university could require different permissions for different groups:

- **Admins** should be able to see data from all students.
- **Students** should only see their own data, but not the data of other students.
- **Professors** should see the data from multiple students (the ones that they teach), but not all students.

In this scenario, you'd create separate [groups](/docs/latest/people-and-groups/managing#groups) for your Admins, Students, and Professors, and then assign those groups to data sandboxes. You'll then configure each sandbox to automatically display a different set of rows or columns to each group.

Your sandbox setup will look a bit different depending on whether your tenant data is commingled into one schema or not --- you can compare the options using our [Multi-tenant permissions](./multi-tenant-permissions) article.

If you're ready to tinker with sandboxing yourself, try the [data sandboxing examples](/docs/latest/permissions/data-sandbox-examples), or have a look in the [data sandboxing docs](/docs/latest/permissions/data-sandboxes).

## Restricting the email recipient list in a dashboard subscription

Some members of our community use sandboxes to lock down email addresses in Metabase. When creating a [dashboard subscription](/docs/latest/dashboards/subscriptions), a person in a sandboxed group will only see their own email address in the list of recipients.

Say you have a group of **Professors** who need to send dashboard subscription emails to their respective **Students**. If you put the **Students** group in a sandbox, you'll automatically prevent students from:

- Sending subscription emails to their **Professors**.
- Seeing the email addresses of other students.

If you only want to restrict email lists without necessarily hiding any rows or columns from a group, use a [custom sandbox](/docs/latest/permissions/data-sandboxes#custom-data-sandboxes-use-a-saved-question-to-create-a-custom-view-of-a-table) and set the custom sandbox's SQL question to `SELECT * FROM table`.

## Selectively granting access to sensitive data

If you work with sensitive information, like financial or medical data, you can use sandboxes to:

- Let specific teams see sensitive data on a need-to-know basis.
- Hide that sensitive data from everyone else.

For example, say you work in telemedicine, and you have a **Patient Chat** table that records the interactions between a nurse and a telemedicine patient in a schema like this:

| Nurse ID | Start Time | End Time | Transcript |
| -------- | ---------- | -------- | ---------- |
| ...      | ...        | ...      | ...        |

To ensure that nurses can see the full records (including the **Transcript** column) for their own chats, but not the chats of other nurses:

- Create a **Nurse** group with a user attribute for "Nurse ID", and add your nurses to the group.
- Set up a [basic sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) for the **Nurse** group and **Patient Chat** table so that nurses can only see rows that match their Nurse ID.

Then, to restrict the columns of the chat table, so that everyone else at the company can see the **Nurse ID**, **Start Time**, and **End Time** of a chat, but not the sensitive **Transcript**:

- Create a **Non-Nurse** group and add non-nurse employees to the group.
- Set up a [custom sandbox](/docs/latest/permissions/data-sandboxes#types-of-data-sandboxes) for the **Non-Nurse** group and **Patient Chat** table that hides the sensitive **Transcript** column.

## Displaying custom data formats to different groups

A lesser-known use case for sandboxes is that you can use them to format data for different groups.

For example, you can display a table's currency in:

- Pounds (£) for people in a **United Kingdom** group.
- Yen (¥) for people in a **Japan** group.

Or maybe you want to display a column of datetimes in:

- 24-hour format for people in a **Military** group.
- 12-hour format for people in a **Non-Military** group.

You can do your custom formatting in a SQL question, then display that SQL question in a [custom sandbox](/docs/latest/permissions/data-sandboxes#custom-data-sandboxes-use-a-saved-question-to-create-a-custom-view-of-a-table).

## Creating custom hyperlinks

Sandboxes let you display custom URLs and hyperlink text to people in different groups. Custom URLs are especially useful when paired with a [custom landing page](/docs/latest/configuring-metabase/appearance#landing-page).

For example, if you've created separate data onboarding guides for your **Data Engineers** and **Product Managers** groups, you can display different hyperlinks with different destinations to each group, such as:

- A [data engineer guide](https://your-company-wiki.com/data/marketing) that goes to `https://your-company-wiki.com/data-engineers`.
- A [product manager guide](https://your-company-wiki.com/data/product-manager) that goes to `https://your-company-wiki.com/product-managers`.

Learn more in our Markdown tutorial: [Creating a custom URL with a sandboxing attribute](/learn/metabase-basics/querying-and-dashboards/dashboards/markdown#custom-url-with-a-sandboxing-attribute).

And remember, if you only need the sandbox to format data without restricting anything, use a [custom sandbox](/docs/latest/permissions/data-sandboxes#custom-data-sandboxes-use-a-saved-question-to-create-a-custom-view-of-a-table) and set the sandbox's SQL question to `SELECT * FROM table`.

## Further reading

- [Managing people in Metabase](/docs/latest/people-and-groups/managing)
- [Strategies for delivering customer-facing analytics](/learn/metabase-basics/embedding/overview)
- [Multi-tenant self-service analytics](/learn/metabase-basics/embedding/multi-tenant-self-service-analytics)
