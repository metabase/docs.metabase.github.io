---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Data Modeling'
title: 'Data studio'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/data-modeling/data-studio.md'
layout: new-docs
summary: 'Data Studio provides tools to shape and track your data so everyone can trust the numbers.'
redirect_from:
    - /docs/v0.64/data-studio/overview
    - /docs/v0.64/data-studio/start
    - /docs/v0.64/data-modeling/overview
---

# Data Studio

![Data Studio](./images/data-studio.png)

Data Studio provides tools to shape and track your data so everyone can trust the numbers.

- **Create an easy-to-understand semantic layer** to match how people think about your business.
- **Speed up queries** by transforming tables to anticipate usage patterns.
- **View dependency graphs** to identify and fix problems before they impact reports.

## What's in Data Studio

- **[Library](semantic-layer/library)**\*: A curated space for your organization's most trusted analytics content—tables, metrics, and SQL snippets that your data team recommends.
- **[Managing tables](./metadata/managing-tables)**: Add table metadata to make tables easier to work with.
  - **[Segments](./semantic-layer/segments)**: Create saved filters on tables so people can use consistent definitions when building queries.
  - **[Measures](semantic-layer/measures)**: Create saved aggregations on tables so people can use consistent calculations when building queries.
- **[Schema viewer](./tools/schema-viewer)**\*: Visualize relationships between tables as an entity-relationship diagram (ERD).
- **[Dependency graph](./tools/graph)**\*: A visual map of how your content connects, so you can understand the impact of changes before you make them. To find content with broken dependencies, see [Dependency diagnostics](../monitor/dependency-diagnostics).
  - **[Replace data sources](./tools/replace-data-sources)**\*: Swap out a table or model across all content that uses it, in one operation.
- **[Transforms](./transforms/transforms-overview)**: Wrangle your data in Metabase, write the query results back to your database, and reuse them in Metabase as sources for new queries.
- **[Glossary](../exploration-and-organization/data-model-reference#glossary)**: Define terms relevant to your business, both for people and agents trying to understand your data.

\* Available on [Pro and Enterprise plans](/pricing).

## Permissions for Data Studio

The keys to Data Studio are granted only to people in either the Admin or [Data Analysts](../people-and-groups/managing#data-analysts) groups.

There are additional permissions required to run transforms, see [Permissions for transforms](./transforms/transforms-overview#permissions-for-transforms).

## Get to Data Studio

1. Click the **grid** icon in the upper right.
2. Select **Data Studio**.
