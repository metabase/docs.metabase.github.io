---
version: v0.43
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Administration Guide'
title: 'Application permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/administration-guide/application-permissions.md'
---

# Application permissions

{% include plans-blockquote.html feature="Application permissions" %}

Application settings are useful for granting groups access to some, but not all, of Metabase's administrative features.

To set application permissions, click on the **Gears** icon at the bottom of the navigation sidebar and go to **Admin settings** > **Permissions** > **Application**.

- [Settings access](#settings-access)
- [Monitoring access](#monitoring-access)
- [Subscriptions and alerts](#subscriptions-and-alerts)

## Settings access

Settings access defines which groups can view and edit the settings under the Admin > Settings tab. These settings include:

- [Settings](08-configuration-settings)
- [Email](02-setting-up-email)
- [Slack](09-setting-up-slack)
- [Authentication](10-single-sign-on)
- [Maps](20-custom-maps)
- [Localization](localization)
- [Public sharing](12-public-links)
- [Embedding in other applications](13-embedding)
- [Caching](14-caching)
- [White labeling](15-whitelabeling)

## Monitoring access

Monitoring access sets permissions on the following Admin tabs:

- [Tools](../enterprise-guide/tools)
- [Auditing](../enterprise-guide/audit)
- [Troubleshooting](../troubleshooting-guide/index)

## Subscriptions and alerts

This setting determines who can set up:

- [Dashboard subscriptions](../users-guide/dashboard-subscriptions)
- [Alerts](../users-guide/15-alerts)

People will need to be in groups with either view or edit access to the collection that contains the dashboard or question in order to set up alerts. See [Collection permissions](06-collections).
