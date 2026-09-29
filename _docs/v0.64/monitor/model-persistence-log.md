---
version: v0.64
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Monitor
title: 'Model persistence log'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/monitor/model-persistence-log.md'
layout: new-docs
summary: 'View the status of persisted models and refresh their cached results.'
---

# Model persistence log
 
The Model persistence log lists your [persisted models](../data-modeling/models/model-persistence) and the status of their refreshes.
 
To open the Model persistence log:
 
1. Open [Monitor](./start).
2. In the left sidebar, click **Model persistence log**.

For each persisted model, Metabase shows the:

- **Model**: The [model](../data-modeling/models/models) being persisted
- **Collection**: The collection that contains the model
- **Status**: The status of the last refresh
- **Last run at**: When the model's results were last refreshed
- **Created by**: Who created the persisted model

Click a model's name to open the model, or its collection to open the collection.

To rerun a model's query and update its results, click the **refresh** icon at the end of the model's row.
