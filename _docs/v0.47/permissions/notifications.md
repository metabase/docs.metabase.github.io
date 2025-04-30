---
version: v0.47
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Permissions
title: 'Notification permissions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/permissions/notifications.md'
layout: new-docs
---

# Notification permissions

Notifications in Metabase include [alerts](../questions/sharing/alerts) and [dashboard subscriptions](../dashboards/subscriptions#setting-up-a-dashboard-subscription).

Notification **recipients** can see whatever the notification **creator** can see. For example, if:

- Beau creates a subscription to a dashboard saved in their [personal collection](../exploration-and-organization/collections#your-personal-collection).
- Beau adds Anya to the dashboard subscription.
- Anya will see the dashboard in her email, even though she doesn't have permissions to view that dashboard in Beau's personal collection.

## All accounts

From [Account settings](../people-and-groups/account-settings), all accounts can:

- Create [alerts](../questions/sharing/alerts) and [dashboard subscriptions](../dashboards/subscriptions#setting-up-a-dashboard-subscription).
- Add new recipients to dashboard subscriptions that they own. Non-admins can only add themselves to alerts.
- Unsubscribe from any alert or subscription.

When a notification creator adds new recipients to an alert or subscription, Metabase will display data to the recipients using the **creator's** [data permissions](../permissions/data) and [collection permissions](../permissions/collections).

## Sandboxed accounts

Same as [all accounts](#all-accounts), but **people using sandboxed accounts will only see themselves in the list of recipients** when creating an alert or subscription.

## Admins

{% include plans-blockquote.html feature="Auditing tools" %}

From Metabase's [auditing tools](../usage-and-performance-tools/audit#subscriptions-and-alerts), admins can:

- View all subscriptions and alerts
- Add or remove recipients from an existing subscription or alert
- Delete subscriptions or alerts

Admins can add recipients without changing the permissions of the alert or subscription. For example, if an admin adds Anya to a subscription created by Beau, Anya will receive emails with the same data that the Beau can see.

## More control over email options

On [Enterprise](/product/enterprise) and [Pro](/product/pro) plans, Admins can:

- Limit email recipients to [approved domains for notifications](../configuring-metabase/email#approved-domains-for-notifications).
- [Limit which recipients Metabase suggests](../configuring-metabase/email#suggest-recipients-on-dashboard-subscriptions-and-alerts) when people set up a subscription or alert.

## Further reading

- [Dashboard subscriptions](../dashboards/subscriptions)
- [Alerts](../questions/sharing/alerts)
- [Auditing](../usage-and-performance-tools/audit)
