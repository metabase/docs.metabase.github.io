---
version: v0.46
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Permissions
title: 'Application permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/permissions/application.md'
layout: new-docs
redirect_from:
    - /docs/v0.46/administration-guide/application-permissions
---

# Application permissions

{% include plans-blockquote.html feature="Application permissions" %}

Application settings are useful for granting groups access to some, but not all, of Metabase's administrative features.

To set application permissions, got to the top right of the screen and click on the **gear** icon > **Admin settings** > **Permissions** > **Application**.

## Settings access

Settings access defines which groups can view and edit the settings under the Admin > Settings tab. These settings include:

- [Settings](../configuring-metabase/settings)
- [Email](../configuring-metabase/email)
- [Slack](../configuring-metabase/slack)
- [Authentication](../people-and-groups/start)
- [Maps](../configuring-metabase/custom-maps)
- [Localization](../configuring-metabase/localization)
- [Appearance](../configuring-metabase/appearance)
- [Public sharing](../questions/sharing/public-links)
- [Embedding in other applications](../embedding/start)
- [Caching](../configuring-metabase/caching)

## Monitoring access

Monitoring access sets permissions on the following Admin tabs:

- [Tools](../usage-and-performance-tools/tools)
- [Auditing](../usage-and-performance-tools/audit)
- [Troubleshooting](../troubleshooting-guide/index)

## Subscriptions and alerts

This setting determines who can set up:

- [Dashboard subscriptions](../dashboards/subscriptions)
- [Alerts](../questions/sharing/alerts)

People will need to be in groups with either view or edit access to the collection that contains the dashboard or question in order to set up alerts. See [Collection permissions](../permissions/collections).
