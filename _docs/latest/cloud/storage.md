---
title: Metabase Cloud Storage
version: latest
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Cloud
layout: new-docs
latest: true
---

# Metabase Cloud Storage

If you have data stored in spreadsheets, and you don't have a data warehouse, Metabase Cloud Storage has you covered.

## How Metabase Cloud Storage works

Metabase Cloud Storage is a feature you can add on to your Metabase Cloud plan (and it's only available for plans on Metabase Cloud).

Once added, you'll see an **Add data** bar in the left navigation bar. Click on it and select **Upload a spreadsheet**.

![Add data](./images/add-data.png)

You can upload a `.csv` or `.tsv` file.

Learn more about [uploads](/docs/latest/exploration-and-organization/uploads).

### Metabase Cloud Storage uses ClickHouse

Under the hood, Metabase Cloud Storage uses [ClickHouse](/data-sources/clickhouse) to store your data.

### Writing SQL queries on data stored in Metabase Cloud Storage

For the SQL dialect supported by ClickHouse, check out [ClickHouse's SQL reference](https://clickhouse.com/docs/en/sql-reference).

## How to get Metabase Cloud Storage

How you set up Metabase Cloud storage depends on whether you already have a Metabase Cloud instance.

### New cloud customers

New customers can sign up for a [Metabase Cloud instance with storage](https://store.metabase.com/checkout?dwh=1).

### Existing cloud customers

Current customers can add storage through Metabase Store.

1. Log in to [Metabase Store](https://store.metabase.com/)
2. In the **Instances** section, click **Add Storage** for the instance that you'd like to add storage to.
3. Choose how much Storage you would like to add. You can start with 500K stored rows per month and add more Storage later.

## Metabase Cloud Storage pricing

Pricing depends on how much data you need to store. See the section on Storage on our [pricing page](/pricing/).

## Syncing Google Sheets with Metabase

If you set up Metabase Cloud Storage, you can [sync Google Sheets with your Metabase](./google-sheets).
