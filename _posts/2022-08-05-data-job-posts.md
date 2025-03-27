---
title: "#jobs #jobs #jobs | Exploring trends in data jobs postings"
summary: "Building a dashboard using data from the dbt Slack to analyze how data jobs have been changing over time."
date: 2022-08-10 00:10:18
last_updated_at: 2022-08-10 00:10:18
categories: "Data explorations"
featured_image: /images/posts/data-job-posts/dashboard.png
image: /images/posts/data-job-posts/dashboard.png
author: The Metabase Team
layout: post
---

We were interested how trends in data jobs have been evolving over time, so we took a look at job postings on one of our favorite communities, [dbt's Slack](https://www.getdbt.com/community/).

Their #jobs channel has had over 100+ job postings per month since 2021, so we pulled the data into Metabase to see if we could find any patterns.

![Data jobs dashboard](/images/posts/data-job-posts/dash.png)

You can explore the [full dashboard](https://metabase-public.metabaseapp.com/public/dashboard/fcd7238a-43c2-4377-b400-7114d03a5155){:target="\_blank"}, or keep reading for our observations and a walk-through of how we built it.

## Observations

The number of job postings appears grew hand-in-hand with [dbt's userbase and their Slack community](https://www.getdbt.com/blog/next-layer-of-the-modern-data-stack/){:target="\_blank"}.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/498eb754-0a88-41b7-81cb-b9f8f36cfe3e"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

Over [40% of job postings](https://metabase-public.metabaseapp.com/public/question/82f93815-d97b-4c39-a8e8-e9ad00f07054){:target="\_blank"} mention the possibility of a remote working arrangement.

[From 2021 onwards](https://metabase-public.metabaseapp.com/dashboard/3-dbt-slack-jobs-channel?date=2021-01-01~){:target="\_blank"}, more than half of the job postings are for remote work, up from [20% for periods before 2021](https://metabase-public.metabaseapp.com/public/dashboard/fcd7238a-43c2-4377-b400-7114d03a5155?date=~2021-01-01){:target="\_blank"}.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/bd128a47-5e88-429f-8543-85109577c77b"
    frameborder="0" width="620"
    height="465"
    allowtransparency
></iframe>

Analytics engineering roles are the fastest growing job in the data space, from 6% in 2019 to 32% in 2022. ([link to chart](https://metabase-public.metabaseapp.com/public/question/96ae9cca-593e-4a7f-b0f6-5b8f16f2ef06))

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/96ae9cca-593e-4a7f-b0f6-5b8f16f2ef06"
    frameborder="0"
    width="620"
    height="465"
    allowtransparency
></iframe>

## How we got the data

### Getting the data into Metabase

1. We used [Phantombuster](https://phantombuster.com/) to pull raw messages from dbt’s #jobs channel into a CSV file.
2. We uploaded the CSV file into a Google Sheet and used [fivetran](https://www.fivetran.com/) to load the .csv data into a table in a Postgres database.
3. Then we connected our Metabase to the postgres database. (You can skip this step if your database is already connected).
4. Then we transformed the data and converted it into a [model](https://metabase-public.metabaseapp.com/public/question/822b6ee8-6131-4740-af00-dc24e5ddca20){:target="\_blank"} in Metabase. If you want, you can download the model's data as a CSV, JSON, or XLSX file.

### Working with the data in Metabase

Because of the unstructured nature of text, we opted for a SQL question (instead of using the graphical query builder)

Some jobs were posted in the channels, others in threads in that channel. We combined those and filtered out replies and comments to the job posting. We used simple `CASE` and `LIKE` statements to extract information like:

- The role,
- Whether the role is remote,
- Any visualization tools mentioned.

Here's the SQL we used to create the model:

```sql
WITH raw_messages
     AS (SELECT CASE
                  WHEN message_url LIKE '%thread_ts=%' THEN
                  Substring(message_url, '.*thread_ts=(.*)')
                  ELSE Substring(message_url,
                       'https://getdbt.slack.com/archives/C7A7BARGT/(.*)'
                       )
                END AS thread_id,
                message_url,
                created_at,
                text,
                username
         FROM   random_datasets.dbt_jobs_scrape_20220802_messages),
     raw_messages_with_order
     AS (SELECT m.*,
                Row_number()
                  OVER(
                    partition BY thread_id
                    ORDER BY created_at ASC) AS post_order
         FROM   raw_messages m),
     combined_messages
     AS (SELECT m1.thread_id,
                m1.message_url,
                m1.created_at,
                m1.username,
                String_agg (m2.text, ' ') AS combined_text
         FROM   raw_messages_with_order m1
                LEFT JOIN raw_messages_with_order m2
                       ON m1.thread_id = m2.thread_id
                          AND m1.username = m2.username
         -- take message from original poster only
         WHERE  m1.post_order = 1
         GROUP  BY m1.thread_id,
                   m1.message_url,
                   m1.created_at,
                   m1.username)
SELECT *,
       -- location
       CASE
         WHEN Lower(Replace(combined_text, 'Is this role remote?', '')) LIKE
              '%remote%'
       THEN true
         WHEN Lower(combined_text) LIKE '%is this role remote? yes%' THEN true
         ELSE false
       END AS is_remote,
       -- BI stack
       CASE
         WHEN Lower(combined_text) LIKE '%metabase%' THEN true
         ELSE false
       END AS stack_includes_metabase,
       CASE
         WHEN Lower(combined_text) LIKE '%looker%' THEN true
         ELSE false
       END AS stack_includes_looker,
       CASE
         WHEN Lower(combined_text) LIKE '%tableau%' THEN true
         ELSE false
       END AS stack_includes_tableau,
       CASE
         WHEN Lower(combined_text) LIKE '%power bi%' THEN true
         ELSE false
       END AS stack_includes_powerbi,
       CASE
         WHEN Lower(combined_text) LIKE '%hex%' THEN true
         ELSE false
       END AS stack_includes_hex,
       CASE
         WHEN Lower(combined_text) LIKE '%qlik%' THEN true
         ELSE false
       END AS stack_includes_qlik,
       -- role
       CASE
         WHEN Lower(combined_text) LIKE '%analyst%' THEN true
         ELSE false
       END AS role_analyst,
       CASE
         WHEN Lower(combined_text) LIKE '%analytics engineer%' THEN true
         ELSE false
       END AS role_analytics_engineer,
       CASE
         WHEN Lower(combined_text) LIKE '%data scien%' THEN true
         ELSE false
       END AS role_data_scientist,
       CASE
         WHEN Lower(combined_text) LIKE '%data engineer%' THEN true
         ELSE false
       END AS role_data_engineer
FROM   combined_messages
WHERE  combined_text IS NOT NULL
```
