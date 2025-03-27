---
title: "Want to retire early? Save more money"
summary: "Japan and Korea’s high average savings rates drive shorter times to reach financial independence."
date: 2022-08-30 00:10:18
last_updated_at: 2022-08-30 00:10:18
categories: "Data explorations"
featured_image: /images/posts/fire-calculator/hero.png
image: /images/posts/fire-calculator/hero.png
author: The Metabase Team
layout: post
---

The FIRE (Financial Independence Retire Early) movement has been a growing trend in recent years. While there are plenty of FIRE calculators to help you figure out how long it would take you to retire early, we were curious to see how geography affected those calculations. Read about our exploration below (or skip right to the [FIRE calculator](https://metabase-public.metabaseapp.com/public/dashboard/ec25ca01-00bf-4057-86a5-5faae03beb9d)).

We were able to gather open datasets on the internet and pulled them into Metabase to help us find the answers.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/753a2403-7e12-4e0c-904b-fcecd9dd4278"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

[Years to Retire by Country](https://metabase-public.metabaseapp.com/public/question/753a2403-7e12-4e0c-904b-fcecd9dd4278) — The y-axis shows the number of years the average citizens of these countries can reach FIRE. The bubble size represents the projected networth in \$.

## Observations

- According to the latest [personal savings rate statistics](https://tradingeconomics.com/country-list/personal-savings), people in Eastern Asian countries like Japan and South Korea are able to reach FIRE the fastest (in 14 years for Japan, and in 25 years for South Korea). Both nations boast the highest savings rate.
- Despite having one of the highest average incomes in the world, North Americans will take the longest to reach FIRE (55 years for Canada and 65 years for the US).
- While some nations have better pension plans for their citizens (especially in Northern Europe and Australia), we weren’t able to find any correlation between years to retire vs. the quality of the pension plans (higher pension index values are better). We'd assumed that people in countries with better pensions plans would have lower savings rates (the thinking here being that, because they could rely on their pensions, they could afford a higher spending rate), but the data didn't support this assumption.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/847b7eb0-d55b-497b-a3af-7323b7d0e66a"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

[Years to Retire vs Pension Index Value](https://metabase-public.metabaseapp.com/public/question/847b7eb0-d55b-497b-a3af-7323b7d0e66a). There was no correlation between **Years to Retire** and **Pension Index Value**.

## Calculate how long it'll take you to retire early

![When can I retire?](/images/posts/fire-calculator/fire-calculator.gif)

The calculations above are based on national average. To achieve FIRE faster, you should shoot for better than the average. This [calculator](https://metabase-public.metabaseapp.com/public/dashboard/ec25ca01-00bf-4057-86a5-5faae03beb9d?%2524_annual_income=45000&%2524_annual_expenses=42700&%2524_current_portfolio_value=0&annual_roi=0.05) can help you estimate how long it would take you to FIRE.

### Here’s the SQL we used

```sql
WITH savings_rate_income_by_country
     AS (SELECT s.country
                AS
                country
                   ,
                s.savings_rate
                   AS savings_rate,
                i.average_monthly_net_salary_after_tax_
                AS
                   net_monthly_salary,
                i.average_monthly_net_salary_after_tax_ * 12
                AS
                   annual_income,
                i.average_monthly_net_salary_after_tax_ * 12 * ( 1 -
                s.savings_rate )
                AS
                annual_expense
         FROM   random_datasets.income_savings_rate_oecd_personal_savings_rate s
                INNER JOIN
                random_datasets.income_savings_rate_numbeo_monthly_salary
                i
                        ON s.country = i.country_name),
     years_elapsed
     AS (SELECT country,
                savings_rate,
                annual_income,
                annual_expense,
                Generate_series(1, 100)        AS year,
                annual_income - annual_expense AS annual_contribution
         FROM   savings_rate_income_by_country),
     compound_interest
     AS (SELECT a.*,
                b.annual_contribution * Power(( 1 + 0.05 ), a.year - b.year + 1)
                -
                b.annual_contribution AS compound_interest
         FROM   years_elapsed a
                LEFT JOIN years_elapsed b
                       ON a.year >= b.year
                          AND a.country = b.country
         ORDER  BY a.year),
     yoy_networth_table
     AS (SELECT country,
                savings_rate,
                annual_income,
                annual_expense,
                year,
                annual_contribution,
                Sum(annual_contribution) AS total_contribution,
                Sum(compound_interest)   AS total_interest,
                Sum(annual_contribution)
                + Sum(compound_interest) AS networth
         FROM   compound_interest
         GROUP  BY country,
                   savings_rate,
                   annual_income,
                   annual_expense,
                   year,
                   annual_contribution
         ORDER  BY year)
SELECT c.region                      AS "Region",
       y.country                     AS "Country",
       p.overall_pension_index_value AS "Pension Index Value",
       y.savings_rate                AS "Savings Rate",
       y.annual_income               AS "Annual Income",
       y.annual_expense              AS "Annual Expenses",
       Min(y.year)                   AS "Years to Retire",
       Min(y.networth)               AS "Projected Net Worth"
FROM   yoy_networth_table y
       LEFT JOIN random_datasets.countries_with_regional_codes c
              ON c.NAME = y.country
       LEFT JOIN random_datasets.income_savings_rate_global_pension_index_2021 p
              ON p.country = y.country
WHERE  y.networth * 0.04 >= y.annual_expense
GROUP  BY c.region,
          y.country,
          p.overall_pension_index_value,
          y.savings_rate,
          y.annual_income,
          y.annual_expense
```

 <iframe
    src="https://metabase-public.metabaseapp.com/public/question/ace63ba1-74f8-4e99-9eed-a3314435f84e"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

View the table for [Years to retire by country](https://metabase-public.metabaseapp.com/public/question/ace63ba1-74f8-4e99-9eed-a3314435f84e).

## Data Sources

- [Personal Savings Rate](https://tradingeconomics.com/country-list/personal-savings)
- [Average Net Salary](https://www.numbeo.com/cost-of-living/)
- [Global Pension Index 2021](https://www.mercer.com/our-thinking/global-pension-index-2021.html)
