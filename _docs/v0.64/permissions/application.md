---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Permissions
title: 'Application permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/permissions/application.md'
layout: new-docs
summary: 'Grant groups access to Metabase''s administrative features like settings, monitoring tools, and notifications.'
redirect_from:
    - /docs/v0.64/administration-guide/application-permissions
---

# Application permissions

{% include plans-blockquote.html feature="Application permissions" %}

Application settings are useful for granting groups access to some, but not all, of Metabase's administrative features.

To set application permissions, go to the top right of the screen and click the **grid** icon > **Admin** > **Permissions** > **Application**.

## Settings access

Settings access defines which groups can view and edit the settings under the Admin > Settings tab. These settings include:

- [Settings](../configuring-metabase/settings)
- [Domains](../configuring-metabase/domains)
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

People in groups with Monitoring access can view:

- [Monitor](../monitor/start), including:
  - [Erroring questions](../monitor/erroring-questions)
  - [Background tasks](../monitor/background-tasks)
  - [Scheduled jobs](../monitor/scheduled-jobs)
  - [Application logs](../monitor/application-logs) (read-only)
  - [Model persistence log](../monitor/model-persistence-log)
- The **Help** tab in Admin
- [Troubleshooting](../troubleshooting-guide/index)

The following Monitor pages aren't included in Monitoring access:

- [Dependency diagnostics](../monitor/dependency-diagnostics): Available to admins and people in the [Data Analysts](../people-and-groups/managing#data-analysts) group
- [Alerts management](../monitor/alerts-management): Available to admins only

## Subscriptions and alerts

This setting determines who can create:

- [Dashboard subscriptions](../dashboards/subscriptions)
- [Alerts](../questions/alerts)

People will need to be in groups with either view or edit access to the collection that contains the dashboard or question in order to set up alerts. See [Collection permissions](../permissions/collections).

To prevent people from creating alerts and subscriptions, set the "Subscriptions and alerts" permission to "No".
