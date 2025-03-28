---
version: v0.52
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Permissions
title: 'Permissions introduction'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/permissions/introduction.md'
layout: new-docs
redirect_from:
    - /v0.52/administration-guide/05-setting-permissions
---

# Permissions introduction

There are always going to be sensitive bits of information in your data, and thankfully Metabase provides a rich set of tools to ensure that people on your team only see the data they’re supposed to.

If instead you're wondering about what data Metabase the company can see, check out our page on [data privacy and security](/security).

## Key points regarding permissions

- Permissions are granted to [groups](../people-and-groups/managing#groups), not people.
- People can be in more than one group.
- If a person is in multiple groups, they will have the _most permissive_ access granted to them across all of their groups. For example, if a person is in three groups, and any one of those groups has Curate access to a collection, then that person will have curate access to that collection.

## What you can set permissions on

- [Data permissions](#data-permissions)
- [Collection permissions](#collection-permissions)
- [Application permissions](#application-permissions)
- [SQL snippet folder permissions](#sql-snippet-folder-permissions)

### Data permissions

[Data permissions](./data) allow you to set permissions on database and their schemas and tables.

- [View data](./data#view-data-permissions)
- [Create queries](./data#create-queries-permissions)
- [Download results](./data#download-results-permissions)
- [Manage database](./data#manage-database-permissions)

### Collection permissions

[Collection permissions][collections] dictate which groups can view/edit items in collections, including:

- Questions
- Dashboards
- Models
- Events
- Timelines

### Application permissions

[Application permissions](./application) (available on [Pro and Enterprise plans](/pricing)) dictate access to Metabase application-level features, including:

- **Settings**: The Settings tab in the Admin panel.
- **Monitoring access**: The Tools and Troubleshooting tabs in the Admin panel.
- **Subscriptions and Alerts**. Which groups can create/edit dashboard subscriptions and alerts.

### SQL snippet folder permissions

For plans that include [SQL Snippet Folders][sql-snippet-folders], you can also set permissions on those folders.

## Changing permissions

Whenever you change permissions for a group, make sure you:

- Save your changes.
- Click yes to confirm your choices.

## Further reading

- [Managing people and groups](../people-and-groups/managing)
- [Permissions guide][permissions]
- [Troubleshooting permissions][troubleshooting-permissions]

[collections]: ../exploration-and-organization/collections
[dashboard-subscriptions]: ../dashboards/subscriptions
[data-permissions]: ./data
[data-sandboxing]: ./data-sandboxes
[permissions]: /learn/metabase-basics/administration/permissions
[sandbox-columns]: /learn/metabase-basics/administration/permissions/data-sandboxing-column-permissions
[sandbox-rows]: /learn/metabase-basics/administration/permissions/data-sandboxing-row-permissions
[slack-integration]: ../configuring-metabase/slack
[sql-snippet-folders]: ../questions/native-editor/sql-snippets
[troubleshooting-permissions]: ../troubleshooting-guide/permissions
