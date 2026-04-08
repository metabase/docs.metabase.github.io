---
version: master
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Permissions
title: 'Application permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/permissions/application.md'
layout: new-docs
summary: 'Grant groups access to Metabase''s administrative features like settings, monitoring tools, and notifications.'
redirect_from:
    - /docs/master/administration-guide/application-permissions
---

# Application permissions

{% include plans-blockquote.html feature="Application permissions" %}

Application settings are useful for granting groups access to some, but not all, of Metabase's administrative features.

To set application permissions, go to the top right of the screen and click the **grid** icon > **Admin** > **Permissions** > **Application**.

## Settings access

Settings access defines which groups can view and edit the settings under the Admin > Settings tab. These settings include:

- [Settings](../configuring-metabase/settings)
- [Email](../configuring-metabase/email)
- [Slack](../configuring-metabase/slack)
- [Webhooks](../configuring-metabase/webhooks)
- [Maps](../configuring-metabase/custom-maps)
- [Localization](../configuring-metabase/localization)
- [Appearance](../configuring-metabase/appearance)
- [Public sharing](../embedding/public-links)
- [Embedding in other applications](../embedding/start)
- [Caching](../configuring-metabase/caching)

## Monitoring access

Monitoring access sets permissions for the following:

- [Tools](../usage-and-performance-tools/tools)
- [Troubleshooting](../troubleshooting-guide/index)

## Subscriptions and alerts

This setting determines who can create:

- [Dashboard subscriptions](../dashboards/subscriptions)
- [Alerts](../questions/alerts)

People will need to be in groups with either view or edit access to the collection that contains the dashboard or question in order to set up alerts. See [Collection permissions](../permissions/collections).

To prevent people from creating alerts and subscriptions, set the "Subscriptions and alerts" permission to "No".
