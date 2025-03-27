---
title: Audit log
headline: Audit log
def: A record of activity and performance in a Metabase, available to admins in some plans.
key-article:
  title: Auditing your users and data
  url: /learn/permissions/auditing
further-reading:
  - title: Audit logs documentation
    url: /docs/latest/usage-and-performance-tools/audit
  - title: Admin overview
    url: /learn/metabase-basics/administration/administration-and-operation/guide
  - title: Managing people in Metabase
    url: /learn/administration/managing-people
redirect_from:
  - /glossary/audit_log
---

## What is an audit log?

{% include plans-blockquote.html feature="Audit logs" %}

An **audit log** is a record of activity and performance in a Metabase, available to admins in [some Metabase plans](/pricing/). Audit logs give admins an overview of how people are interacting with their Metabase — which [questions](/glossary/question) are most popular, who's looking at which [dashboards](/glossary/dashboard), what [alerts](/glossary/alert) people have set up, and others.

## Example audit log

Figure 1 shows an example audit log page, found in the **Admin panel** > **Audit** section:

{% include image_and_caption.html url="/glossary/images/audit-log/audit-log-example.png" description="<em>Fig. 1</em>. Example of an audit log." %}

The charts show which questions are most popular and which take the longest to load; identifying which questions and dashboards are slowest to load can help inform changes that you may want to make, like adjusting your [cache settings](/docs/latest/administration-guide/14-caching) or [optimizing SQL queries](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices).

## What can audit logs tell you?

Audit logs contain info about:

- [How team members are using Metabase](/docs/latest/usage-and-performance-tools/audit#people)
- [Databases you've connected to Metabase](/docs/latest/usage-and-performance-tools/audit#data)
- [Questions that people are asking and viewing](/docs/latest/usage-and-performance-tools/audit#questions)
- [Dashboard popularity and performance](/docs/latest/usage-and-performance-tools/audit#dashboards)
- [Data that people are downloading and exporting](/docs/latest/usage-and-performance-tools/audit#downloads)
