---
title: "SQL Cheatsheet: Five simple SQL commands to get started in data analytics"
summary: "SQL cheatsheet for data exploration: discover five basic SQL commands and functions to get started with data analysis."
date: 2021-11-18 00:12:18
last_updated_at: 2021-11-18 00:12:18
categories: "Analytics and BI"
image: /images/posts/sql-cheatsheet_-five-simple-sql-commands-to-get-started-in-data-analytics.jpg
author: The Metabase Team
redirect_from: /blog/sql-cheatsheet-simple-sql-commands-to-get-started-in-data-analytics
layout: post
---

We built Metabase so you can explore and learn from data without needing to know SQL. But sometimes, when you’re wrangling a big, complicated question, a little bit of SQL can go a long way. So we’ve collected 5 SQL commands and functions for your copy-paste-ing convenience.

If you’re already familiar with SQL, feel free to jump right into the cheatsheet below, but if you’re just getting started, we recommend checking out [our guide on SQL best practices](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices).

## 1. SQL Command: count(distinct)

### What is the SQL command count(distinct)

The SQL command `count(distinct)` is used to return the number of unique values in a column or expression.

### How to use count(distinct)

Use `count(distinct)` to return the number of wholly unique data points such as number of employees, locations, customers, etcetera.

```sql
COUNT( DISTINCT <expression>)
```

For example, you might want to count the number of different cities the customer lives in. To follow along on Metabase, you can open the [SQL editor](/docs/latest/questions/native-editor/writing-sql), select the [Sample Dataset](/glossary/sample_database) and run this query:

```sql
SELECT count(distinct city) as cities
FROM people
```

Your return would look like: 1966 (a number).

To be precise, you’ll get a column with a single value:

```bash
| CITIES |
|--------|
| 1966   |
```

### Real world example: count(distinct)

Analysts use `count(distinct)` when counting the number of unique visitors who exhibit behaviors on a website. For example, assume we have a website_intents table that maps cookies with some behaviour in the website:

```bash
| COOKIE_ID | IS_VISIT_LANDING_PAGE | IS_VISIT_CHECKOUT | … |
|-----------|-----------------------|-------------------| … |
| abc000    | 1                     | 0                 | … |
| abc001    | 1                     | 1                 | … |
| abc002    | 1                     | 0                 | … |
```

Here’s the query to get number of unique cookies from users that made it to the top of the checkout funnel:

```sql
SELECT count(distinct
                case
                    when is_visit_checkout = True then cookie_id
                    else null
                end) as visited_checkout
FROM website_intents
```

## 2. SQL Command: date_trunc()

### What is the SQL command date_trunc()

Shortens (truncates) a timestamp to a particular granularity, from microseconds to millenium.

The SQL command `date_trunc()` is used to “truncate” an interval based on hour, day, week or month and provides an actionable and more precise interval or timestamp.

### How to use date_trunc()

Use `date_trunc()` to remove unnecessary information from a timestamp or time interval.

```sql
DATE_TRUNC(granularity, timestamp)
```

For example, you might want to truncate a timestamp down to the hour:

```sql
SELECT date_trunc('hour', timestamp '2021-11-4 12:29:05')
```

Your return would look like: 2021-11-4 12:00:00.

### Real world example: date_trunc()

Analysts use `date_trunc()` to compare trends across multiple months, weeks, or days. With `date_trunc()` you can easily look at behavior rates over a specific period of time, like seeing how many customers created an account last month, compared to previous months. For example, let’s assume we want to get all the orders created in 2018 from your Orders table (coming from the Sample Dataset). Your query might looks like this:

```sql
SELECT count(distinct id) as total_order_2018
FROM ORDERS
WHERE DATE_TRUNC('year', created_at) = timestamp '2018-1-01 00:00:00'
```

Your return would like this:

```bash
| TOTAL_ORDER_2018 |
|------------------|
| 5834             |
```

Want to go further? Check out our other resource to discover more in-depth examples of and use cases for this command: [Dates in SQL](/learn/grow-your-data-skills/learn-sql/working-with-sql/dates-in-sql).

## 3. SQL Command: coalesce()

### What is the SQL command coalesce()

Evaluates lists to find non-null values; that is, data points with known values.

The SQL command `coalesce()` is used primarily during data cleaning and aggregation processes to fill null values and make datasets more business-friendly and easier to read.

## How to use coalesce()

Use `coalesce()` to find or standardize non-null information by setting 2 or more parameters.

```sql
COALESCE(<expression>, [<expression>, …])
```

Example:

```sql
SELECT coalesce(null, value1, value2, value3, null)
```

Your return would look like: value1.

### Real world example: coalesce()

Analysts use `coalesce()` to clean and aggregate datasets and make them more business-friendly. For example, identifying empty fields and replacing them with an empty label like “none”. Suppose you have a table of customers with missing phone numbers, marked by “null”.

```bash
| CUSTOMER_ID | PHONE_NUMBER | … |
|-------------|--------------| … |
| abc000      | 1111111      | … |
| abc001      | null         | … |
| abc002      | 2222222      | … |
```

Using `coalesce()`, here’s the query to replace the null value with “none”:

```sql
SELECT customer_id,
      COALESCE(phone_number, 'none') AS phone_number
FROM client
```

Which yields:

```bash
| CUSTOMER_ID | PHONE_NUMBER | … |
|-------------|--------------| … |
| abc000      | 1111111      | … |
| abc001      | none         | … |
| abc002      | 2222222      | … |
```

## 4. SQL Command: case

### What is the SQL command case

Returns a value when specific conditions are met by data points within a larger data set.

The SQL command `case` is used for organizing data based on tangible parameters, generating categories or sorting data points into categories, or generating actionable information from various data.

### How to use: case

Use `case` to generate an actionable result based on a specific parameter.

```sql
CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    WHEN conditionN THEN resultN
    ELSE result
END
```

For example, you might want to categorize each score with a short message:

```sql
case
   when score > 9 then 'awesome'
   when score < 5 then 'bad'
   else 'ok'
end as message
```

If no conditions are met, `case when` will result in `else`.

Your return would look like:

```bash
| SCORE | MESSAGE |
|-------|---------|
| 10    | awesome |
| 4     | bad     |
| 7     | ok      |
```

### Real world example: case

The SQL command `case` can be particularly helpful in analyzing funnels, especially in mapping funnel stages and organizing client lists based on their position within a funnel.

For example, do you remember the website_intents table we showcased in the "Real world example: count(distinct)" example? Suppose we have a pageviews table that tracks the web pages visited for each session:

```bash
| SESSION_ID | PAGE_URL_PATH | … |
|------------|---------------| … |
| abc000     | /landing-page | … |
| abc001     | /landing-page2| … |
| abc002     | /checkout     | … |
```

Here’s what a query to get that result might look like:

```sql
SELECT id,
    case
        when(
           page_url_path = '/landing-page.html'
           or page_url_path = '/landing-page2.html'
           or page_url_path = '/landing-page3.html'
        ) then 1 else 0
    end as is_visit_landing_page,
    case
        when(
           page_url_path like '/checkout%'
           or page_url_path like '/checkout-new%'
           or page_url_path like '/checkout-enterprise%'
        ) then 1 else 0
    end as is_visit_checkout,
    ...
FROM pageviews
```

Which yields:

```bash
| SESSION_ID | PAGE_URL_PATH | IS_VISIT_LANDING_PAGE |  IS_VISIT_CHECKOUT | … |
|------------|---------------|-----------------------|--------------------| … |
| abc000     | /landing-page | 1                     | 0                  | … |
| abc001     | /landing-page2| 1                     | 0                  | … |
| abc002     | /checkout     | 0                     | 1                  | … |
```

## 5. SQL Command: row_number()

### What is the SQL command row_number()

Orders rows within a partition by assigning each a precise position within the sequence. It starts from 1 and numbers the rows according to the ORDER BY part of the window statement.

The SQL command `row_number()` is used to quickly and precisely organize information within a dataset based on parameters which you specify.

_Please note that `row_number()` is not supported by every database._

### How to use: row_number()

Use `row_number()` to change the sequence of a list.

```sql
ROW_NUMBER() OVER (
    [PARTITION BY partition_column, ... ]
    ORDER BY sort_column [ASC | DESC], ...
)
```

For example, you might want to reorder a list of accounts by their creation time:

```sql
SELECT account_created_at,
       row_number() over(
           order by account_created_at
       ) as row
FROM accounts
```

Your return would look like:

```bash
| ROW | ACCOUNT_CREATED_AT |
|-----|--------------------|
| 1   | 2021-01-14         |
| 2   | 2021-05-09         |
| 3   | 2021-08-22         |
```

### Real world example: “row_number()”

Analysts use `row_number()`, to organize the order of information in lists. For example, sorting a list of customer information to rank orders based on time to see how purchase value has changed over time. Suppose you have a table of customer information:

```bash
| PLAN | ACCOUNT_CREATED_AT | … |
|------|--------------------| … |
| free | 2021-01-14         | … |
| pro  | 2021-02-20         | … |
| free | 2021-05-09         | … |
| pro  | 2021-07-24         | … |
| free | 2021-08-22         | … |
```

Using `row_number()`, we can organize the customer information based on creation time for each plan subscription:

```sql
SELECT plan,
       account_created_at,
       row_number() over(
           partition by plan
           order by account_created_at
       ) as row
FROM accounts
```

Your return would look like:

```bash
| PLAN | ROW | ACCOUNT_CREATED_AT | … |
|------|-----|--------------------| … |
| free | 1   | 2021-01-14         | … |
| free | 2   | 2021-05-09         | … |
| free | 3   | 2021-08-22         | … |
| pro  | 1   | 2021-02-20         | … |
| pro  | 2   | 2021-07-24         | … |
```

## Final Thoughts: Getting started with SQL Basics

With Metabase you don’t need SQL to explore data—but if you’re working on something complex, a few simple commands can take your analysis to the next level. We hope this cheatsheet gives you a few ideas of new ways to explore. If you want to add more SQL into your repertoire, check out our guide to [SQL best practices](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices).

Cheers,

The Metabase Team
