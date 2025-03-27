---
title:  "How we used OKRs for the data science team to improve our data stack"
redirect_from:
  - /community_posts/how-we-used-okrs-to-improve-our-data-stack
meta_description: Self-service Analytics. How we used OKRs to make data accessible to everyone in the company.
date:   2022-04-28 10:10:58
image: /images/community/how-we-used-okrs-for-the-data-science-team-to-improve-our-data-stack.jpg
read_time: 5 minutes
category_filters: "Data culture,Strategy"
organization: Agrando
organization_url: https://agrando.com/en-de
author: Thomas Schmidt
author_img: /images/community/thomas-schmidt.jpeg
author_bio: Thomas is the Lead Data Scientist at Agrando, a company that makes regional agricultural structures fit for the future with the power of digitization. You can find Thomas on [LinkedIn](https://www.linkedin.com/in/thomas-heinz-schmidt/){:target="_blank"} and on Twitter at [@somtom91](https://twitter.com/somtom91){:target="_blank"}.
---

**“Can you give me data for X?”** - a question Data Scientists might receive quite often - as so did our team.

Even though, in most of the cases, the data people are asking for is not what people actually need, it was a sign that something was odd.

We realized that one of the reasons we received those questions was that we failed to implement the basis for self-service analytics. We needed to face the truth and acknowledge the problems at hand:

- We did a bad job at educating people on how to use and analyze data;
- Combining data for analysis was not possible for non-engineers or people without database and SQL knowledge because of bad integrations between different data sources;
- Data Science became the bottleneck for data driven decisions and were even preventing them when we were too slow;

## What are OKRs and why we decided to use them for our Data Science team

A strategy shift towards more data accessibility and enabling self-serving analytics needed to happen and we needed a framework to properly align the team and be able to measure our progress. During that time our company started looking into [OKRs (objectives and key results)](https://en.wikipedia.org/wiki/OKR){:target="_blank"}. OKRs are a goal-setting methodology for teams that helps you to set measurable goals. The key idea is that you define **ambitious goals** which can be measured by **3-5 key results** each where the following template can be used:

I will *[objective]* measured by *[key result]*.

Our Data Science team wanted to become pioneers and give the framework a try.
**Some of the reasons why we chose that road were:**

- We wanted to define goals together as a team in order to increase alignment and goal ownership;
- We wanted to be able to measure our progress in a transparent way;
- Our daily work should be closely connected to the goals we want to achieve;

We set together and analyzed the current situation to derive objectives and key results. Our goal was to lay the foundation for bigger steps in the future and start off setting up a data warehouse structure with pre-joined and processed tables which are easy to analyze for our business users. Thus, an example objective we set ourselves was  **“Data is accessible to everyone in the company”**.

## Using Metabase dashboards to track OKR progress for data science

**This included the following key results we used to measure our success:**

- All new questions in Metabase only use the data warehouse;
- Questions in Metabase are stored in a clean structure;
- All warehouse tables have a description;
- All columns of tables in the warehouse layer for business users have a description;

Those sound like pretty basic key results at first sight.
However, they turned out to play a key role in measuring basic accessibility.

We created a Dashboard in Metabase to measure our progress and look at the data during our weekly OKR progress check-ins:

![a screenshot from Metabase where OKR are used](/images/community/metabase-okr.png)

### The steps we took to set up the OKR dashboard in Metabase

Disclaimer: The following steps are tailored for a warehouse setup with BigQuery and a Metabase instance running with a Postgres database

1. Connect Metabase with your BigQuery project ([docs](/docs/latest/administration-guide/databases/bigquery){:target="_blank"})
2. Connect Metabase to the Postgres database where your Metabase data is stored ([docs on how to connect to a Postgres DB](/docs/latest/administration-guide/databases/postgresql){:target="_blank"})
3. Create the questions you want to see in your dashboard (compare to the template queries below)
4. Combine all newly created questions in a [dashboard](/docs/latest/users-guide/07-dashboards){:target="_blank"}.

### Query Templates

Here are some query templates that can get you started in case you want to build something similar. To make it work for you, you might want to replace some variables in the following queries:

`<YOUR_DATA_REGION>`: The region where your data is stored e.g. `region-europe-west1`
`<YOUR_GOOGLE_PROJECT_NAME>`: Your google cloud project name

### Percent of dbt warehouse tables with description

Shows the progress of warehouse tables and views created with dbt which have a description.

**We used this SQL query for that:**

```sql
WITH descriptions AS (
  SELECT
    table_name,
    1 AS has_description,
  FROM `<YOUR_DATA_REGION>.INFORMATION_SCHEMA.TABLE_OPTIONS`
  WHERE
    option_name = 'description'
    AND option_value <> '""'
    AND table_schema LIKE 'dbt%'
)

SELECT
  SUM(COALESCE(has_description, 0)) / COUNT(*) AS ratio
FROM `<YOUR_DATA_REGION>.INFORMATION_SCHEMA.TABLES`
LEFT JOIN descriptions USING(table_name)
WHERE
  table_catalog = '<YOUR_GOOGLE_PROJECT_NAME>'
  AND table_schema = 'dbt_marts'
```

### Percent of warehouse columns with descriptions

Shows the progress of warehouse table columns that have a description.

**We used this SQL query for that:**

```sql
SELECT
  SUM(IF(description IS NOT NULL AND description != '', 1, 0)) /
    COUNT(*) AS ratio,
FROM `<YOUR_DATA_REGION>.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS`
WHERE
  table_catalog = '<YOUR_DATA_REGION>'
  AND table_schema = 'dbt_marts'
```

### Newly created Metabase questions per data source

Shows the share of newly created questions per month and data source. Excludes questions that use the Metabase database.

**We used the query builder for that:**

![a screenshot of Metabase query interface](/images/community/okr-metabase-2.png)
![a screenshot of Metabase query interface](/images/community/okr-metabase-3.png)

### Outcome

Despite having still a long way to go, we saw a great impact on our work already. One example you can see in the dashboard is that the newly created questions almost exclusively use the new warehouse instead of the old database now. Especially the team alignment through the OKR framework helped us improve our data stack and to take huge steps towards enabling self-serving analytics in our company.
