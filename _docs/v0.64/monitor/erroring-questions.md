---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Monitor
title: 'Erroring questions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/monitor/erroring-questions.md'
layout: new-docs
summary: 'See which questions returned errors when last run, and rerun them as you troubleshoot.'
redirect_from:
    - /docs/v0.64/enterprise-guide/tools
    - /docs/v0.64/usage-and-performance-tools/tools
---

# Erroring questions

{% include plans-blockquote.html feature="Erroring questions" %}

The Erroring questions page lists the questions that returned an error the last time they ran.

To open Erroring questions:

1. Open [Monitor](./start).
2. In the left sidebar, click **Erroring questions**.

For each question, Metabase shows the:

- Error message
- Database that returned the error
- Collection that contains the question

You can search by question, error, database, or collection.

To check whether you've fixed an error, select one or more questions and rerun them.
