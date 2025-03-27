---
title:  "Managing streaming analytics pipelines with dbt, Materialize and Metabase"
redirect_from:
  - /community_posts/managing-streaming-analytics-pipelines-with-dbt-materialize-and-metabase
meta_description: Explore how to use dbt to manage and document the process of building a streaming analytics pipeline with Materialize and Metabase
date:   2022-06-08 11:10:58
image: /images/community/streaming-analytics-with-materialize-and-metabase.jpg
read_time: 3 minutes
category_filters: "Working with Metabase"
organization: Materialize
organization_url: https://materialize.com/
author: Marta Paes
author_img: /images/community/marta-paes.png
author_bio: Marta is a Senior DevEx Engineer at Materialize, a company that makes building with real-time data as easy as possible. Before finding her mojo in streaming systems and developer experience, she worked as a DWH Engineer for 4+ years. You can reach her on Twitter at [@morsapaes](https://twitter.com/morsapaes){:target="_blank"}.
---

In a previous post, we broke down how to [build a streaming analytics pipeline](/community-posts/streaming-analytics-with-materialize-and-metabase){:target="_blank"} with Materialize and Metabase. The TL;DR is that you can write some SQL against streaming data sources, let Materialize efficiently maintain your results up-to-date as new data arrives, and keep your dashboards light and fresh. This time around, we’re going to explore how to use [dbt](https://docs.getdbt.com/docs/introduction){:target="_blank"} to manage and document this workflow end-to-end.

## Transforming streaming data with dbt

As  much as you want to run your analytics non-stop, one thing you probably don’t want is to let go of the tools that make you productive in batch. What if you could manage your streaming analytics pipelines using the exact same tooling? Although dbt was built with batch in mind, it’s flexible enough as a framework to serve as a unified transformation layer on top of both batch and streaming backends; as long as that backend is SQL-based, what’s running under the covers becomes an implementation detail.

We’ve built the [dbt-materialize adapter](https://github.com/MaterializeInc/materialize/tree/main/misc/dbt-materialize){:target="_blank"} to bring streaming transformations (and beyond) to dbt. If this looks familiar…

```sql
{% raw %}
 {{ config(
    materialized ='materializedview'
) }}
SELECT fi.icao24,
       manufacturername,
       model,
       operator,
       origin_country,
       time_position,
       longitude,
       latitude
FROM {{ ref('stg_flight_information') }} fi
JOIN {{ ref('stg_icao_mapping') }} icao ON fi.icao24 = icao.icao24
{% endraw %}
```

…that’s all there is: you define your business logic as dbt models using SQL and some Jinja, deploy the pipeline (once), and Materialize keeps things up and running for you. For use cases that would otherwise require you to redeploy your models multiple times a day ($$), maintain complex incremental logic and make some serious trade-offs to optimize for speed (like, say, correctness), using a dedicated streaming database like Materialize [can take you further, faster](https://materialize.com/introducing-dbt-materialize/){:target="_blank"}.

## Documenting streaming analytics pipelines

More than standardizing how we reason about and manage analytics workflows, dbt made documentation cool again (well, was it ever really cool before dbt?). With a few YAML files, you can bring data governance to your streaming pipelines, speeding up life-saving processes like data discovery and lineage, and even [ensure that your metrics stay put](https://github.com/dbt-labs/dbt-core/issues/4071){:target="_blank"}. If the tendency is to treat your dbt projects as the source of truth for business logic and documentation, shouldn’t your BI tool just…get in sync?

## How to sync dbt and Metabase

The [dbt-metabase](https://github.com/gouline/dbt-metabase){:target="_blank"} plugin is a great starting point if you’re looking to bring dbt and Metabase closer together. For example, you can use it to:

### Document Metabase items as dbt exposures

Getting a good understanding of the end-to-end dependencies of a dbt project requires also being able to track dependencies that are external to it, like Metabase questions and dashboards. One way to track these dependencies in the DAG is to declare any use of models downstream as [exposures](https://docs.getdbt.com/docs/building-a-dbt-project/exposures/){:target="_blank"} (notice the orange node!), which you can generate automatically using the plugin:

![a screenshot with a Metabase date picker](/images/community/marta-paes-lineage-graph.png)

### Propagate dbt metadata to the Metabase data model

If you’re already documenting your data model in dbt, the plugin also allows you to derive the Metabase [data model](/glossary/data_model){:target="_blank"} from existing model properties and configurations, like table and column descriptions, semantic type definitions and other useful metadata that helps create a shared context between data producers and consumers:

![a screenshot with a Metabase date picker](/images/community/marta-paes-metabase-admin.png)

There’s a lot more to explore when it comes to managing streaming analytics pipelines with dbt, so if you’re curious to get your hands down, check out [the sample demo](https://github.com/MaterializeInc/mz-hack-day-2022/tree/main/sample_project){:target="_blank"} used to create the examples above and the [Materialize documentation](https://materialize.com/docs/integrations/dbt/).
