---
version: v0.43
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Enterprise Guide'
title: 'Admin tools'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/enterprise-guide/tools.md'
layout: docs
---

# Admin tools

{% include plans-blockquote.html features="Admin tools" %}

The Admin **Tools** tab contains features for troubleshooting questions. To get to the Admin tools sections, click on the **Gears** icon at the bottom of the navigation sidebar, and go to **Admin settings** > **Tools**.

## Questions that errored when last run

Metabase will list the questions that returned errors, including the:

- Error message,
- Database that returned the error,
- Collection that houses the question that errored.

You can select and rerun multiple questions at a time while you troubleshoot to see whether you've resolved their errors.