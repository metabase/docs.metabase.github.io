---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: false
category: 'Data Modeling'
title: 'Data modeling overview'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/data-modeling/start.md'
layout: new-docs
redirect_from:
    - /docs/v0.64/data-modeling
---

# Data modeling overview

Metabase provides tools for organizing your data and making it easier for people to understand. You can use Metabase to:

- [Transform your data into a shape appropriate for analytics](transforms/transforms-overview)
- [Create authoritative, validated data sources](semantic-layer/library)
- [Build a semantic layer to standardize definitions and metrics for people and AI](semantic-layer/metrics)
- [Track lineage and dependencies of data and queries](tools/graph)
- [Configure metadata, formatting, and display options for columns and tables](metadata/metadata-editing)
- [Swap data sources in bulk](tools/replace-data-sources)

## [Data Studio](data-studio)

[Data Studio](data-studio) is a set of tools to shape and surface the data your analytics depends on. You can use Data Studio to transform data, build your semantic layer, and track data lineage.

## [Transforms](transforms/transforms-overview)

Use [Transforms](transforms/transforms-overview) to preprocess, clean, and shape your data, then write the results back into your database on a schedule.

You can write transforms in [SQL](transforms/query) or [Python](transforms/python), create [scheduled data pipelines](transforms/jobs-and-runs), and [inspect results of transforms](transforms/inspector).

## Metadata

Use table settings and metadata to make it easier for people to work with your data: 

- [Configure table visibility, types, and owners](metadata/managing-tables)
- [Edit table and column descriptions](metadata/metadata-editing)
- [Configure filter and display settings for columns](metadata/metadata-editing#field-behavior)
- [Set formatting defaults](metadata/formatting)

## Semantic layer

Create standard, curated data sources, definitions, and metrics to help both people on your team and AI understand your data.

The [Library](semantic-layer/library) is a place to curate company-wide authoritative tables and [metrics](semantic-layer/metrics) that you want people to use to start their own explorations.

[Measures](semantic-layer/measures) and [segments](semantic-layer/segments) are saved calculations and saved filters, respectively, that people can use instead of reinventing "ARR" or "Active users" in every query.

The [Glossary](semantic-layer/glossary) is the place to define your business-specific terms.

## [Dependency graph](tools/graph)

Track where every number on every chart comes from. The [dependency graph](tools/graph) traces lineage through transforms, questions, measures and segments, metrics, and dashboards.

## [Schema viewer](tools/schema-viewer)

See the entity-relationship diagram for your database.

## [Replace data sources](tools/replace-data-sources)

Bulk-replace a table, model, or question with another one across your entire Metabase.

## [Editable tables](editable-tables)

With [editable tables](editable-tables), admins can edit data in tables directly from Metabase.

## [Models](models/models)

> Consider using [Transforms](transforms/transforms-overview) instead of models.

Models curate data from another table or tables from the same database to anticipate the kinds of questions people will ask of the data. You can think of them as a special kind of saved question meant to be used as the starting point for new questions.
