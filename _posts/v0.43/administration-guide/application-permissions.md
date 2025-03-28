---
version: v0.43
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Administration Guide'
title: 'Application permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/administration-guide/application-permissions.md'
layout: docs
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

- [Settings](08-configuration-settings.html)
- [Email](02-setting-up-email.html)
- [Slack](09-setting-up-slack.html)
- [Authentication](10-single-sign-on.html)
- [Maps](20-custom-maps.html)
- [Localization](localization.html)
- [Public sharing](12-public-links.html)
- [Embedding in other applications](13-embedding.html)
- [Caching](14-caching.html)
- [White labeling](15-whitelabeling.html)

## Monitoring access

Monitoring access sets permissions on the following Admin tabs:

- [Tools](../enterprise-guide/tools.html)
- [Auditing](../enterprise-guide/audit.html)
- [Troubleshooting](../troubleshooting-guide/index.html)

## Subscriptions and alerts

This setting determines who can set up:

- [Dashboard subscriptions](../users-guide/dashboard-subscriptions.html)
- [Alerts](../users-guide/15-alerts.html)

People will need to be in groups with either view or edit access to the collection that contains the dashboard or question in order to set up alerts. See [Collection permissions](06-collections.html).