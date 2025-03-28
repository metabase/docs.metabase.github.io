---
version: v0.44
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedding introduction'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/introduction.md'
layout: new-docs
redirect_from:
    - /v0.44/administration-guide/13-embedding
---

# Embedding introduction

You can embed Metabase tables, charts, and dashboards—even Metabase's query builder—in your website or application.

[Signed embedding](./signed-embedding) (also known as standalone embedding) and [full-app embedding](./full-app-embedding) are _secure_ ways to share your data with specific groups of people outside of your organization.

If you'd like to share your data with the good people of the internet, you can create a [public link](../questions/sharing/public-links) and embed that directly on your website.

## How embedding works

You'll need to put an iframe on your website to act as a window to your Metabase app. Different configurations of that embedded iframe will let you:

- [set up public access](../questions/sharing/public-links) to charts and dashboards,
- [require sign-in](./signed-embedding) to view personalized versions of those charts and dashboards, or
- [integrate with SSO and data permissions](./full-app-embedding) to enable self-service access to the underlying data.

## Comparison of embedding types

|                                                                                                          | [Public](../questions/sharing/public-links) | [Signed](./signed-embedding) | [Full-app](./full-app-embedding) |
| -------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------- | ----------------------------------- |
| Display charts and dashboards                                                                            | ✅                                             | ✅                              | ✅                                  |
| Display interactive [filter widgets](/glossary/filter_widget)                    | ✅                                             | ✅                              | ✅                                  |
| Restrict data with [locked filters](./signed-embedding-parameters#restricting-data-in-a-signed-embed) | ❌                                             | ✅                              | ❌                                  |
| Restrict data with [sandboxes](../permissions/data-sandboxes)                                         | ❌                                             | ❌                              | ✅                                  |
| Drill-down using the [action menu](/learn/questions/drill-through)               | ❌                                             | ❌                              | ✅                                  |
| Self-serve via [query builder](/glossary/query_builder)                          | ❌                                             | ❌                              | ✅                                  |

## Further reading

- [Strategies for delivering customer-facing analytics](/learn/embedding/embedding-overview).
- [Publishing data visualizations to the web](/learn/embedding/embedding-charts-and-dashboards).
- [Multi-tenant self-service analytics](/learn/embedding/multi-tenant-self-service-analytics).
- [Customizing Metabase's appearance](../configuring-metabase/appearance).

