---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Monitor
title: 'Alerts management'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/monitor/alerts-management.md'
layout: new-docs
summary: 'View and manage every alert in your Metabase, including failing and ownerless alerts.'
redirect_from:
    - /docs/v0.64/installation-and-operation/alert-management
---

# Alerts management

The Alerts management page lists every [alert](../questions/alerts) in your Metabase. Use this page to find and fix failing or ownerless alerts. Alerts management doesn't include [dashboard subscriptions](../dashboards/subscriptions).

Alerts management is only available to admins.

To open Alerts management:

1. Open [Monitor](./start).
2. In the left sidebar, click **Alerts management**.

The page has three tabs:

- **All alerts**: Every alert in your Metabase.
- **Failing**: Alerts whose last check or send attempt failed or was abandoned.
- **Ownerless**: Alerts whose owner's account was deactivated. Metabase marks deactivated owners with a ghost icon.

For each alert, Metabase shows the:

- **ID**: The alert's unique identifier.
- **Question**: The question that triggers the alert.
- **Owner**: The person who created the alert.
- **Channel**: Where the alert sends notifications (email, Slack, or webhook).
- **Last checked**: The timestamp for when Metabase last ran the alert's question.
- **Last send attempt**: The timestamp for when Metabase last tried to send the alert. Alerts that have never met their condition show **Never**.

If a check or send attempt failed, Metabase displays an error icon next to the timestamp.

To find a specific alert, search by question or owner. Click **Filter** to filter alerts by channel, last send attempt status, owner status, or email recipient.

## Delete alerts or change owner

To delete alerts or reassign them to a new owner:

1. Select the checkbox next to each alert. To select all alerts, select the checkbox in the header row.
2. In the action bar, click **Delete** or **Change owner**.
3. If you click **Change owner**, select the new owner from the list.

To deselect the alerts, click **Clear**.

## Alert details

To view more information about an alert, click on the alert's row to open the sidebar, which displays:

- Error messages for failing alerts.
- Link to the question that triggers the alert.
- **Check history**: The status of the alert's recent checks.
- **Send history**: The status of the alert's recent send attempts.

Use the up and down arrows at the top of the sidebar to move between alerts in the list.

To edit the alert, click the **pencil** icon at the top of the sidebar.

## Further reading

- [Usage analytics](../usage-and-performance-tools/usage-analytics)
- [Dashboard subscriptions](../dashboards/subscriptions)
- [Setting up email](../configuring-metabase/email)
- [Setting up Slack](../configuring-metabase/slack)
- [Setting up webhooks](../configuring-metabase/webhooks)
