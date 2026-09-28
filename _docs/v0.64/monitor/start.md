---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: Monitor
title: Monitor
source_url: 'https://github.com/metabase/metabase/blob/master/docs/monitor/start.md'
layout: new-docs
summary: 'Monitor contains Metabase''s troubleshooting and observability tools, so you can find and fix problems with your content and your Metabase.'
---

# Monitor

Monitor contains Metabase's troubleshooting and observability tools. Use it to find and fix problems with your content, like broken dependencies and failing questions. You can also check on the work Metabase performs in the background, like syncs and alerts.

To open Monitor:

1. Click the **grid** icon in the upper right.
2. Select **Monitor**.

## What's in Monitor

Monitor contains three sections:

- [Content management](#content-management)
- [Logs and activity](#logs-and-activity)
- [AI auditing](#ai-auditing)

### Content management

- **[Dependency diagnostics](./dependency-diagnostics)**\*: Find content with broken dependencies, and content that nothing else references.
- **[Erroring questions](./erroring-questions)**\*: See questions that returned an error the last time they ran.
- **[Alerts management](./alerts-management)**: View and manage every alert in your Metabase, including failing and ownerless alerts.

\* Available on [Pro and Enterprise plans](/pricing). On other plans, these tabs show an upgrade page.

### Logs and activity

- **[Background tasks](./background-tasks)**: See the status of the tasks and runs Metabase performs in the background, including syncs, alerts, and notifications.
- **[Scheduled jobs](./scheduled-jobs)**: View the recurring work Metabase performs on a schedule, like cache refreshes, model persistence refreshes, and health checks.
- **[Application logs](./application-logs)**: View Metabase's logs, and configure how much information Metabase logs.
- **[Model persistence log](./model-persistence-log)**: View the status of persisted models and refresh their cached results.

### AI auditing

The AI auditing tabs are only available on [Pro and Enterprise plans](/pricing).

- **[Usage stats](../ai/usage-auditing#usage-stats)**: See AI feature usage, including tokens and messages.
- **[Conversations](../ai/usage-auditing#conversations)**: Review people's conversations with Metabot.
- **MCP analytics**: See usage of the [Metabase MCP server](../ai/mcp).
- **[CLI analytics](./cli-analytics)**: See which operations the [Metabase CLI](../installation-and-operation/metabase-cli) runs against your Metabase.

## Permissions for Monitor

Who can see each Monitor page depends on their group:

- **Admin group** can view every page.
- **[Data Analysts](../people-and-groups/managing#data-analysts) group** can view Dependency diagnostics.\*
- **Groups with [Monitoring access](../permissions/application#monitoring-access)** can view every page except Dependency diagnostics and Alerts management.\*

\* On OSS, only admins can view Monitor. The Data Analysts group and the Monitoring access permission are only available on [Pro and Enterprise plans](/pricing).
