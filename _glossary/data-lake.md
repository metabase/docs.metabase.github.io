---
title: Data lake
headline: Data lake
def: A data lake is a place to store both structured and unstructured information, typically as files or blobs.
key-article:
  title: Data warehouse vs data lake vs data mart
  url: /learn/databases/data-mart-data-warehouse-data-lake
related-terms:
  - term: Data warehouse
    slug: data_warehouse
further-reading:
  - title: Which data warehouse should you use?
    url: /learn/analytics/which-data-warehouse
redirect_from:
  - /glossary/data_lake
---

## What is a data lake?

A **data lake** is a place to store both structured and unstructured information, typically as files or blobs. You can think of a data lake as a dumping ground for all of your data, regardless of structure, format, or intended use. The idea of a "lake" is largely marketing jargon, but the aquatic comparison comes from the idea that information in a data lake flows in a more "natural" state than that of the more rigid and hierarchical [data warehouse](/glossary/data_warehouse). And because they can hold raw data that doesn't need to adhere to a specific [schema](/glossary/schema), data lakes tend to be cost-effective when scaling to store substantial amounts of information (into the petabytes).

Since there's no need to define a schema at the start, data lakes can be straightforward to set up; you can load data in for a specific use or just to keep it on hand for the future, even if you aren't yet sure what kinds of queries you'll need to run on it. However, once you do get things set up, configuring the tools you'll need to actually make your data lake useful can get complex and expensive — typically requiring the expertise of data engineers. Those engineers will set up [ETLs](/glossary/etl) as needed, or even train machine learning models on parts of your data lake.

Data lakes rely on a [schema-on-read system](/glossary/schema#schema-on-write-vs-schema-on-read), meaning data only gets verified against a schema once it's pulled from that data lake for querying, rather than when it's first written. This does mean, however, that pulling from and making use of a data lake takes more work. And just because a data lake allows for greater flexibility doesn't mean you should thrown all data governance out the window; the information that goes into your lake should still be of good quality, cleaned and annotated so that your ETLs or query engine (and by extension, the people who need the data) can make good use of it.

## When to use a data lake

If you need to analyze huge volumes of semi-structured and/or unstructured information (like if you're an IoT company) then a data lake may be a good fit. Since there's no need to enforce an overarching schema when data is written, data lakes can also be an effective solution if you're dealing with many different types of data sources at once — like streaming data, structured application databases, data from IoT devices, social media, or web traffic.

Ultimately, organizations with complex data needs may not rely exclusively on a data lake or a data warehouse (or even a [data lakehouse](/glossary/data_lakehouse)), and instead construct data architectures that can incorporate both, taking into account the organization's overall strategy, the needs of the people who'll use it, and the types of queries those people will need to execute.

## Setting up a data lake

Let's say you want to set up a data lake. In broad strokes, the process will look something like this:

1. **Choose a cloud storage provider.** There are data lake services out there that can help you set up the various layers and tools you'll need, but at its core your "lake" is your storage layer — wherever you're keeping that structured and unstructured data together (like in AWS S3 or Microsoft Azure).

2. **Identify your data sources.** These may be structured (like an [application database](/glossary/application-database)), semi-structured (like XML or [JSON](/glossary/json) files), or unstructured (like social media posts, images, or text documents).

3. **Clean up and ingest data from those sources.** At this stage, you'll annotate those data sources (especially the semi-structured and unstructured ones), adding metadata and tagging and classifying them based on the types of questions you're likely to ask of that data. Once that data has been cleaned up, those annotated copies get loaded into your data lake, probably in a columnar format like parquet that's better for analytical queries.

4. **Create ETLs as needed and query your data lake.** Because of their mix of formats and often-unstructured nature, engineers and data scientists are usually the ones directly accessing a data lake. People like your data analysts will query the data lake through the use of query engines like Presto or SparkSQL, which run ETLs over the data lake, structuring it on a regular schedule so the data can be queried via SQL. Those queries get executed on the cleaned-up, annotated, columnar copies of your data, rather than on the raw data sources themselves (both the raw data and the cleaned-up date are stored in your data lake).
