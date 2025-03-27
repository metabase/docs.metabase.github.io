---
layout: learn_article
date: 2022-08-17
categories: Analytics engineering
image: /learn/images/data-modeling/analytics-engineering.png
author: The Metabase Team
redirect_from:
  - /learn/data-modeling/fact-table
  - /learn/metabase-basics/querying-and-dashboards/data-modeling/fact-table
---

The goal of data modeling is to make retrieving data _fast_ (for the engine that processes the queries), and _easy_ (for the people that write those queries).

Most [data warehousing practices][best-practices-data-warehousing] are meant to emphasize speed. **Analytics engineering** (a term [popularized by dbt][analytics-engineering-dbt], and sometimes bundled into the term **full-stack analytics**) is the process of modeling data for usability. Even if that's not what you call it, you're probably practicing analytics engineering whenever you need to put together a [curated dataset][models-learn], a [segment or metric][segment-metric-docs], or a [dashboard][dashboard-learn] for someone else.

This tutorial shows you how to apply an analytics engineering approach to a dataset at the data warehouse level---and more specifically, to a certain kind of dataset called a **fact table**.

## Introduction

**Dimension tables** contain a snapshot of data at a point in time, such as the number of partially-finished mugs you have at the end of your work day.

```plaintext
| time                | total mugs |
|---------------------|------------|
| 2022-08-16 17:30:00 | 3          |
```

**Fact tables** contain a history of information, such as the rate at which you've been drinking your coffee throughout the day.

```plaintext
| time                | mug      | coffee remaining |
|---------------------|----------|------------------|
| 2022-08-16 08:00:00 | 1        | 100%             |
| 2022-08-16 08:01:00 | 1        | 0%               |
| 2022-08-16 09:00:00 | 2        | 100%             |
| 2022-08-16 12:00:00 | 3        | 100%             |
| 2022-08-16 12:30:00 | 3        | 99%              |
| 2022-08-16 17:30:00 | 3        | 98%              |
```

Fact and dimension tables are used together in a [star schema][star-schema] (or the closely related [snowflake schema][snowflake-schema]) to organize information in a data warehouse.

You may want to build a fact table if:

- Your data sources (the systems that generate data, such as your application database) only store a current snapshot of information by saving it over the previous snapshot.

- You're creating a [dataset to power embedded analytics][embedding-mistakes] for your customers. Standalone fact tables are great for self-serve analytics, because they can cover a [wide range of use cases](#testing-the-fact-table-with-common-use-cases) without relying on joins.

But before we get started, let's add one more mug of caffeine to your daily total---we've got a lot ahead of us!

```plaintext
| time                | total mugs |
|---------------------|------------|
| CURRENT_TIMESTAMP() | n+1        |
```

## Overview

In this tutorial, we’ll be working with a dimension table that we'll call `account`, like a dimension table that you might get from a CRM. Let's assume this `account` dimension table stores the current state of our customers, with the current state being updated by our application.

The `account` table looks something like this:

```plaintext
| id               | country     | type       | status    |
|------------------|-------------|------------|-----------|
| 941bfb1b2fdab087 | Croatia     | Agency     | Active    |
| dbb64fd5c56e7783 | Singapore   | Partner    | Active    |
| 67aae9a2e3dccb4b | Egypt       | Partner    | Inactive  |
| ced40b3838dd9f07 | Chile       | Advertiser | Test      |
| ab7a61d256fc8edd | New Zealand | Advertiser | Inactive  |
```

**[Part 1: Designing the fact table](#designing-the-fact-table)**

To design a fact table schema based on `account`, we'll need to consider the kinds of analytics questions that people might ask about changes to customer accounts over time. Since the `account` table contains a `status` field, we can answer questions such as:

- [How many new accounts were added each month?](#new-accounts)
- [How many accounts churned (became inactive) each month?](#churned-accounts)
- [What's the churn rate by customer cohort?](#advanced-use-case-cohort-table)

**[Part 2: Implementing the fact table](#initializing-the-fact-table)**

To create `fact_account` from the data stored in `account`, we'll write a SQL script to:

1. Initialize `fact_account` with today’s `account` data.
2. Get a snapshot of the rows in `account` (assuming it gets updated by another system).
3. Compare each day’s `account` snapshot against the historical data in `fact_account`.
4. Insert a new row into `fact_account` for each account that has changed since the previous day’s snapshot.

**[Part 3: Testing the fact table with common use cases](#testing-the-fact-table-with-common-use-cases)**

To check if our fact table is useful in practice, we'll set it up with Metabase and try to answer all three of our sample analytics questions.

**[Part 4: Improving fact table performance](#improving-fact-table-performance)**

The last section of this tutorial gives you an idea of what it'll look like to iterate on your fact table as it scales to accommodate more history (and more questions!).

## How to follow along with this tutorial

If you want to apply the steps below to your own data, we recommend working with a dimension table that gets updated regularly by your source system, and a database or data warehouse of your choice.

In this tutorial, we’re using Firebolt to test out [their partner driver][firebolt-driver] with Metabase. Firebolt is a data warehouse that employs some [slightly modified SQL DDL][firebolt-ddl] to load data in a [format that's designed to make queries run faster][firebolt-architecture].

If you're following along with your own data, your SQL syntax probably won't match the sample code exactly. For more information, you can check out the [reference guides for common SQL dialects][sql-reference-guides].

## Designing the fact table

### A basic fact schema

First, we’ll draft up a schema for our fact table, which we'll call `fact_account`. Putting a schema in a visual reference like the table shown below can make it easier to validate whether `fact_account` will support the queries we want to make (i.e., the analytics questions that people want to answer). A visual reference also doubles as a helpful resource later on for anyone who is new to `fact_account`.

In this example, we’re going to keep all of the original columns from `account`. If we need to omit any columns, we can always hide those columns via the [Data Model page][data-model-page-learn] in Metabase. Hiding columns in Metabase is less disruptive compared to excluding too many columns from our schema at the start, as we'd have to regenerate the schema each time we need to restore columns.

We’ll also include a new column called `updated_at` to indicate the timestamp that a row was inserted to the table. In practice, `updated_at` can be used to approximate the date or time that a change was made to an account.

This addition is based on the assumption that all of the `account` attributes can change, except for `id`. For example, the status of a given account can change from `Active` to `Inactive`, or the `Type` of the account from `Partner` to `Advertiser`.

**Basic `fact_account` schema example**

```plaintext
| Column name     | Data type | Description                                                  | Expected values                                   |
|-----------------|-----------|--------------------------------------------------------------|---------------------------------------------------|
| id              | varchar   | The unique id of a customer account.                         | 16 character string                               |
| status          | varchar   | The current status of the account.                           | Active, Inactive, or Test                         |
| country         | varchar   | The country where the customer is located.                   | Any of the "English short names" used by the ISO. |
| type            | varchar   | The type of account.                                         | Agency, Partner, or Advertiser                    |
| updated_at      | datetime  | The date a row was added to the table                        |                                                   |
```

### A better fact schema

To check the usability of the schema, we'll write out a pseudo-SQL query for one of our analytics questions:

```sql
-- How many new accounts have been added each month?

WITH new_account AS (
    SELECT
        id,
        MIN(updated_at) AS first_added_at -- Infer the account creation date
    FROM
        fact_account
    GROUP BY
        id
)
SELECT
    DATE_TRUNC('month', first_added_at) AS report_month,
    COUNT(DISTINCT id) AS new_accounts
FROM
    new_account
GROUP BY
    report_month;
```

The current `fact_account` schema needs an extra step to get (or estimate) the "creation" timestamp for each account (in this case, estimation is necessary for the accounts that were already active _before_ we started keeping a history).

It’ll be much easier to answer questions about “new accounts” if we simply add a column for an account's creation date to the `fact_account` schema. But adding columns will increase the complexity of the table (the time it takes for someone to understand and query it), as well as the complexity of the SQL script (the time it takes to update the table).

To help us decide whether it’s worth adding a column to our `fact_account` schema, we’ll consider whether the creation timestamp can be used for other types of analytics questions about accounts.

The creation timestamp of an account can also be used to calculate:

- The age of an account.
- The time to an important event (such as the number of days it takes for an account to churn or become inactive).

These metrics can be applied to interesting use cases such as [reducing customer churn][churn-example] or [calculating LTV][ltv-learn], so it's probably worth including in `fact_account`.

We'll add the column `is_first_record` to keep our schema streamlined. This column will flag the row which corresponds to an account’s earliest entry in the fact table.

If you're planning to make a fact table to simplify self-serve (such that the fact table includes information that's usually captured in a dimension table), you can also add a column for `is_latest_record`. This column will help people filter `fact_account` for current data (in addition to historical data), so that they can use the same table to quickly answer questions such as: "how many active accounts do we have to date?".

Using this convention can make for slower queries but easier adoption when rolling out self-serve for the first time (so people don't have to remember the joins between fact and dimension tables).

**A better `fact_account` schema**

```plaintext
| Column name     | Data type | Description                                                         | Expected values                                   |
|-----------------|-----------|---------------------------------------------------------------------|---------------------------------------------------|
| id              | varchar   | The unique id of a customer account.                                | 16 character string                               |
| status          | varchar   | The current status of the account.                                  | "Active", "Inactive", "Test", or "Trial"          |
| country         | varchar   | The country where the customer is located.                          | Any of the "English short names" used by the ISO. |
| type            | varchar   | The type of account.                                                | "Agency", "Partner", or "Advertiser"              |
| ...             | ...       | ...                                                                 |                                                   |
| updated_at      | datetime  | The date a row was added to the table                               |                                                   |
| is_first_record | boolean   | TRUE if this is the first record in the table for a given id        |                                                   |
| is_latest_record| boolean   | TRUE if this is the most current record in the table for a given id |                                                   |
```

## Initializing the fact table

To implement the fact schema, we’ll start by creating an empty `fact_account` table to store the `account` table snapshots over time.

We’re working with a Firebolt data warehouse, so we're going to create the fact table from the [Firebolt console][firebolt-console]. We'll select **SQL Workspace** > **New Script**, and write:

```sql
-- Create an empty fact_account table in your data warehouse.

CREATE FACT TABLE IF NOT EXISTS fact_account
(
    id                  varchar
    status              varchar
    country             varchar
    type                varchar
    updated_at          timestamp
    is_first_record     boolean
    is_latest_record    boolean
);
```

Note that Firebolt's DDL includes the `FACT` keyword (it can be excluded in standard SQL DDL).

If you’re creating fact tables in the same SQL script that you’re using to ingest data, you can follow the well-commented [SQL script templates](https://docs.firebolt.io/using-the-sql-workspace/using-the-sql-workspace.html#using-script-templates) from the **Import Script** button on the collapsible right sidebar.

Next, we’ll populate `fact_account` with everything that’s in the current account table. You can include these statements in the same SQL script that creates the fact table:

```sql
-- Put an initial snapshot of data from "account" into "fact_account".
-- Add "quality of life" columns to make the data model nicer to work with.

INSERT INTO fact_account (
    SELECT
        *,
        CURRENT_TIMESTAMP() AS updated_at,
        is_first_record = TRUE,
        is_latest_record = TRUE
    FROM
        account);
```

## Loading the fact table incrementally

To update `fact_account` with regular snapshots from `account`, we’ll write another SQL script to:

1. Query `account` for a current snapshot of the data.
2. Compare the current data against the last updated data in `fact_account`.
3. Insert rows into `fact_account` for records that have changed since the last snapshot.

You'll need to save and schedule this SQL script outside of your data warehouse, using tools like [dbt][dbt] or [Dataform][dataform]. For more information, check out the [Transforming data][transforming-data] section of our ETL, ELT, and Reverse ETLs tutorial in Learn.

```sql
-- Add the latest snapshot from the account table.
-- This assumes that account is regularly updated from the source system.

INSERT INTO fact_account
SELECT
    *,
    is_first_record = TRUE
FROM
    account
WHERE
    id = id
    AND CURRENT_TIMESTAMP() <> updated_at ();

-- Update the rows from the previous snapshot, if applicable.

WITH previous_snapshot AS (
    SELECT
        id,
        ROW_NUMBER() OVER (PARTITION BY id ORDER BY updated_at DESC) AS row_number
    FROM
        fact_account
    WHERE
        is_first_record = TRUE)
UPDATE
    fact_account fa
SET
    is_latest_record = FALSE
FROM
    previous_snapshot ps
WHERE
    ps.row_number = 2;
```

## Testing the fact table with common use cases

Here's what we would expect `fact_account` to look like after it starts getting populated with daily snapshots of `account`:

```plaintext
| id               | country   | type       | status    | updated_at          | is_first_record | is_latest_record |
|------------------|-----------|------------|-----------|---------------------|-----------------|------------------|
| 941bfb1b2fdab087 | Croatia   | Agency     | Active    | 2022-02-04 09:02:09 | TRUE            | FALSE            |
| 941bfb1b2fdab087 | Croatia   | Partner    | Active    | 2022-07-10 14:46:04 | FALSE           | TRUE             |
| dbb64fd5c56e7783 | Singapore | Partner    | Active    | 2022-05-10 02:42:07 | TRUE            | FALSE            |
| dbb64fd5c56e7783 | Singapore | Partner    | Inactive  | 2022-07-14 14:46:04 | FALSE           | TRUE             |
| ced40b3838dd9f07 | Chile     | Advertiser | Test      | 2022-07-02 06:22:34 | TRUE            | TRUE             |
```

Now, we can put our fact table into Metabase to see how it does at answering our example analytics questions:

- [How many new accounts were added each month?](#new-accounts)
- [How many accounts churned (became inactive) each month?](#churned-accounts)
- [What's the churn rate by customer cohort?](#advanced-use-case-cohort-table)

### Setting up Metabase

If you don’t have your database set up with Metabase already, you can set things up in just a few minutes:

1. [Download and install Metabase][download-metabase], or sign up for a [free trial of Metabase Cloud](https://store.metabase.com/).
2. [Add the database][add-database] with your fact table.
   > If you're following this tutorial using Firebolt, you'll need the username and password that you use to log into the [Firebolt console][firebolt-console], as well as the database name (listed on the console homepage).
3. From the top right of the Metabase home page, click **New** > **Question**.

### New accounts

Let's say we want to know the total number of new accounts that were added last month.

This kind of result would work with self-serve use cases such as:

- A ["static number" visualization][static-number-viz].
- A [progress bar][progress-bar-viz] visualization to measure last month's new accounts against a goal number.

People can self-serve a metric like "new accounts added in the past month" from Metabase's [query builder](/learn/metabase-basics/getting-started/ask-a-question) using these steps:

1. Go to **New** > **Question**.
2. Select `fact_account` as the starting data.
3. From **Pick the metric you want to see**, select **Number of distinct values of** > **ID**.
4. From the **Filter** button, click **Is First Record** and select "Is" (default setting), with the value "True".
5. From the **Filter** button, click **Status** and select "Is Not", with the value "Test".
6. Click **Last Updated At** and select "Last Month".

Or, they can self-serve the same value from any SQL IDE (including the Metabase [SQL editor][sql-editor]) using a snippet like this:

```sql
SELECT
    COUNT(DISTINCT id) AS new_accounts
FROM
    fact_account
WHERE
    is_first_record = TRUE
    AND status <> "Test"
    AND DATE_TRUNC('month', updated_at) = DATE_TRUNC('month', CURRENT_TIMESTAMP) - INTERVAL '1 MONTH';
```

### Churned accounts

In addition to new accounts that are added to our business, we also want to keep track of churned accounts that were lost. This time, instead of limiting our results to last month's data, we'll get a monthly summary table like this:

```plaintext
| report_month | churned_accounts |
|--------------|------------------|
| 2022-05-01   | 23               |
| 2022-06-01   | 21               |
| 2022-07-01   | 16               |
```

This kind of result can help people self-serve:

- A [bar][bar-chart] or [line chart][line-chart] to plot the change in `churned_accounts` for each `report_month`.
- A ["trend" visualization][trend-viz] to show the percentage change in the number of churned accounts, month over month.
- A [saved question or model][saved-question-model] that can be joined to other tables on `report_month`. This enables people to use the `churned_accounts` column in [calculations with other columns][custom-expressions] that aren't found in `fact_account`.

People can self-serve the "monthly churned accounts" summary table from Metabase's [query builder](/learn/metabase-basics/getting-started/ask-a-question) by following these steps:

1. Go to **New** > **Question**.
2. Select `fact_account` as the starting data.
3. From **Pick the metric you want to see**, select **Number of distinct values of** > **ID**.
4. From **Pick a column to group by**, select **Updated At: Month**.
5. Click the **Filter** button.
6. Click **Status** and select **True**.

They can also get the results from any SQL IDE (including Metabase's [SQL editor][sql-editor]) using a query like this:

```sql
SELECT
    DATE_TRUNC('month', updated_at) AS report_month,
    COUNT(DISTINCT id) AS churned_accounts
FROM
    fact_account
WHERE
    status = 'inactive';
```

### Advanced use case: cohort table

A cohort table is one of the most complex use cases that can be powered by a well-designed fact table. These tables measure [churn rate][churn-rate] as a function of account age, and can be used to identify groups of customers that are especially successful or unsuccessful.

We want to get a result like this:

```plaintext
| age | churned_accounts | total_accounts | churn_rate |
| --- | ---------------- | -------------- | ---------- |
| 1   | 21               | 436            | = 21 / 436 |
| 2   | 26               | 470            | = 26 / 470 |
| 3   | 18               | 506            | = 18 / 506 |
```

Since this is an advanced use case, we'll focus on showing you how the "shape" of the `fact_account` table can be changed into a cohort table. These steps can be done in Metabase by creating a series of saved SQL questions that build upon one another.

1. Create a saved question that gets `first_added_month` and `churned_month` for each account:

   **Sample result**

   ```plaintext
   | id               | first_added_month | churned_month |
   | ---------------- | ----------------- | ------------- |
   | 941bfb1b2fdab087 | 2022-02-01        | null          |
   | dbb64fd5c56e7783 | 2022-05-01        | 2022-07-01    |
   | 67aae9a2e3dccb4b | 2022-07-01        | null          |
   ```

   **Snippet**

   ```sql
    SELECT
        id,
        CASE WHEN is_first_record = TRUE
             THEN DATE_TRUNC('month', updated_at)
             END AS first_added_month,
        CASE WHEN status = 'inactive'
             THEN DATE_TRUNC('month', updated_at)
             ELSE NULL
             END AS churned_month
    FROM
        fact_account;
   ```

2. Join the saved question from step 1 to a column that has one row per month. You can do this in SQL by generating a series (or you may be able to use an existing table in your data warehouse). Take note of the join conditions on the months.

   **Sample result**

   ```plaintext
   | id               | first_added_month | churned_month | report_month | age | is_churned |
   |------------------|-------------------|---------------|--------------|-----|------------|
   | dbb64fd5c56e7783 | 2022-05-01        | 2022-07-01    | 2022-05-01   | 1   | FALSE      |
   | dbb64fd5c56e7783 | 2022-05-01        | 2022-07-01    | 2022-06-01   | 2   | FALSE      |
   | dbb64fd5c56e7783 | 2022-05-01        | 2022-07-01    | 2022-07-01   | 3   | TRUE       |
   ```

   **Snippet**

   ```sql
    WITH date_series AS (
        SELECT
            *
        FROM
            GENERATE_SERIES('2022-01-01'::date, '2022-12-31'::date, '1 month'::interval) report_month
    )
    SELECT
        *,
        age,
        CASE WHEN s.churned_month = d.report_month
             THEN TRUE ELSE FALSE
             END AS is_churned
    FROM
        step_1 s
        FULL JOIN date_series d
        ON d.report_month >= s.first_added_month
        AND (d.report_month <= s.churned_month
            OR d.report_month <= CURRENT_TIMESTAMP::date);
   ```

3. Your result from step 2 can now be aggregated from the query builder into the final result (you can calculate the churn rate using a custom column).

   **Sample result**

   ```plaintext
   | age | churned_accounts | total_accounts | churn_rate |
   | --- | ---------------- | -------------- | ---------- |
   | 1   | 21               | 436            | = 21 / 436 |
   | 2   | 26               | 470            | = 26 / 470 |
   | 3   | 18               | 506            | = 18 / 506 |
   ```

   **Snippet**

   ```sql
    SELECT
        age,
        COUNT(DISTINCT CASE WHEN is_churned = TRUE
                            THEN id END)  AS churned_accounts,
        COUNT(DISTINCT CASE WHEN is_churned = FALSE
                            THEN id END)  AS total_accounts,
        churned_accounts / total_accounts AS churn_rate
    FROM
        step_2
    GROUP BY
        age;
   ```

## Improving fact table performance

Once we have a working fact table in production, we'll want to pay attention to how it scales as:

- The table gets updated with more history.
- More people start running queries against the table in parallel.

Let's say that the churn logic becomes very popular, such that our `fact_account` becomes a dependency (and bottleneck) for many downstream dashboards and aggregations.

To improve the performance of queries against the fact table, we'll want to pre-calculate aggregations against the columns most commonly used in churn calculations.

There are a few ways to do this in SQL databases:

- [Add indexes](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster#index-frequently-queried-columns) to the columns that are used most often in `GROUP BY` statements.
- [Create views](/learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster#aggregate-data-ahead-of-time-with-summary-tables) of the summarized (pre-aggregated) data.

In our Firebolt data warehouse, we can combine both of these optimizations using [aggregating indexes][firebolt-agg-indexes]. Defining aggregation indexes tells your the Firebolt engine to create additional tables (under the hood) that should be referenced instead of the main fact table when a SQL query asks to apply a certain aggregation over a given column.

Aggregating indexes can also be included in the SQL script that you use to initialize and load the fact table (but it's easier to choose the _right_ indexes after you've had a chance to observe how people use the table in practice).

Here's an example of a Firebolt aggregating index that helps speed up the count of cumulative and current churned accounts over different reporting periods:

```sql
CREATE AGGREGATING INDEX IF NOT EXISTS churned_accounts ON fact_account
(
    updated_at,
    DATE_TRUNC('day', updated_at),
    DATE_TRUNC('week', updated_at),
    DATE_TRUNC('month', updated_at),
    DATE_TRUNC('quarter', updated_at),
    COUNT(DISTINCT CASE WHEN status = 'inactive' then id end),
    COUNT(DISTINCT CASE WHEN status = 'inactive' AND is_latest_record = TRUE then id end)
);
```

## Further reading

Learn more about data modeling, data warehousing, and working with SQL:

- [Models in Metabase][models-learn]
- [Common data model mistakes made by startups][data-model-mistakes]
- [Best practices for data warehousing][best-practices-data-warehousing]
- [Which data warehouse should you use?][data-warehouse-learn]
- [Working with SQL][sql-learn]

[add-database]: /docs/latest/databases/connecting#adding-a-database-connection
[analytics-engineering-dbt]: https://www.getdbt.com/what-is-analytics-engineering/#what-is-an-analytics-engineer
[bar-chart]: /learn/metabase-basics/querying-and-dashboards/visualization/bar-charts
[best-practices-data-warehousing]: /learn/metabase-basics/administration/administration-and-operation/making-dashboards-faster#organize-data-to-anticipate-common-questions
[churn-example]: /learn/grow-your-data-skills/analytics/push-and-pull
[churn-rate]: /learn/grow-your-data-skills/learn-sql/working-with-sql/ltv-with-metabase
[custom-expressions]: /learn/metabase-basics/querying-and-dashboards/questions/custom-expressions
[dashboard-learn]: /learn/metabase-basics/querying-and-dashboards/dashboards/bi-dashboard-best-practices
[data-model-mistakes]: /learn/grow-your-data-skills/analytics/data-model-mistakes
[data-model-page-learn]: /docs/latest/data-modeling/metadata-editing
[data-warehouse-learn]: /learn/grow-your-data-skills/data-landscape/which-data-warehouse
[dataform]: https://www.dataform.co/
[dbt]: https://www.getdbt.com/
[download-metabase]: /docs/latest/operations-guide/installing-metabase
[embedding-mistakes]: /learn/grow-your-data-skills/analytics/embedding-mistakes
[firebolt-agg-indexes]: https://www.firebolt.io/blog/simplicity-and-power-of-agg-indexes-at-scale
[firebolt-architecture]: https://docs.firebolt.io/architecture-overview.html#storage-layer
[firebolt-console]: https://app.firebolt.io/
[firebolt-ddl]: https://docs.firebolt.io/sql-reference/commands/
[firebolt-driver]: https://github.com/firebolt-db/metabase-firebolt-driver
[line-chart]: /learn/metabase-basics/querying-and-dashboards/visualization/line-charts
[ltv-learn]: /learn/grow-your-data-skills/learn-sql/working-with-sql/ltv-with-metabase
[models-learn]: /learn/metabase-basics/getting-started/models
[progress-bar-viz]: /docs/latest/questions/visualizations/visualizing-results#progress-bars
[saved-question-model]: /docs/latest/questions/native-editor/referencing-saved-questions-in-queries
[segment-metric-docs]: /docs/latest/data-modeling/segments-and-metrics
[snowflake-schema]: https://en.wikipedia.org/wiki/Snowflake_schema
[sql-editor]: /glossary/native_query_editor
[sql-learn]: /learn/grow-your-data-skills/learn-sql/working-with-sql
[sql-reference-guides]: /learn/grow-your-data-skills/learn-sql/debugging-sql/sql-syntax
[star-schema]: /glossary/schema#star-schema
[static-number-viz]: /docs/latest/questions/visualizations/visualizing-results#numbers
[transforming-data]: /learn/grow-your-data-skills/analytics/etl-landscape
[trend-viz]: /docs/latest/questions/visualizations/visualizing-results#trends
