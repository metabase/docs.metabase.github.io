---
title: "The metrics store that the financial modeling package creates"
description: "We'll walk through the models that the financial modeling package creates when setting up a metrics store in your Metabase."
image-hero: /startup-guide/images/model-walkthrough-hero.png
image-og: /startup-guide/images/model-walkthrough-og.png
---

This section gives some context around the models and questions that the [`dap create`](/startup-guide/package/setup) command creates, so even if the package doesn't work for you, you'll still have examples that you can iterate on.

The `dap` command assumes that you're using data from Stripe.

## Overview of the models

The package creates some foundational models based on the raw data imported into a PostgreSQL data warehouse. The package then builds on those foundational models to aggregate that data for:

- Annual recurring revenue (ARR)
- Trialers
- Customers

Once the package has those models, it creates two questions that bundle up these metrics: one question to export the latest metrics, and another to export quarterly metrics.

From there, you can import that data into the [Financial modeling template](https://docs.google.com/spreadsheets/d/1wG1p-wj9k3AxLeZcRvTVNgxJdiEaOXof-0heoHGkvpM/edit?usp=sharing) and start playing around with it.

## Foundational models

First, the package takes the raw data ingested from Stripe, cleans it up, and saves the results as models: the `Stripe price` model, and the `Stripe customer` model. These models just clean up and coalesce the values from the data that Fivetran imports from Stripe.

- [Stripe price model SQL](https://github.com/metabase/financial-modeling-package/blob/main/sqls/stripe_price.sql). Brings together raw data from the Stripe `price` and `product` tables.
- [Stripe customer model SQL](https://github.com/metabase/financial-modeling-package/blob/main/sqls/stripe_customer.sql). Brings together data from the Stripe `customer` and `card` tables.

The package builds on these models, and pulls in more raw Stripe data to round out the set of foundational models.

- [Stripe subscription item model](https://github.com/metabase/financial-modeling-package/blob/main/sqls/stripe_subscription_item.sql). This model builds on the Stripe price model, and brings in raw data from the Stripe `tier` and `subscription_item` tables.
- [Stripe subscription model](https://github.com/metabase/financial-modeling-package/blob/main/sqls/stripe_subscription.sql). This model builds on the Stripe subscription item model and Stripe customer model we built above. It also incorporates data from the Stripe `subscription` raw table.
- [Strip invoice model](https://github.com/metabase/financial-modeling-package/blob/main/sqls/stripe_invoice.sql). This model brings together data from the Stripe `invoice` table, and the `customer` and `subscription` models.

## Calculating revenue

On top of our Stripe invoice and Stripe subscription models, the package can calculate revenue. This Revenue model includes the following columns:

```console
id
customer_name
recognized_at
month
amount
is_actual
is_auto_renewal
product_name
billing_cycle
stripe_customer_id
stripe_subscription_id
stripe_product_id
```

See the [SQL for the Revenue model](https://github.com/metabase/financial-modeling-package/blob/main/sqls/revenue.sql).

## Aggregating monthly and quarterly metrics

With the above models defined, the package can then aggregate key monthly metrics:

- [Monthly ARR](https://github.com/metabase/financial-modeling-package/blob/main/sqls/monthly_arr.sql) from the Revenue model.
- [Monthly customers](https://github.com/metabase/financial-modeling-package/blob/main/sqls/monthly_customers.sql) from the Revenue model.
- [Monthly trialers](https://github.com/metabase/financial-modeling-package/blob/main/sqls/monthly_trialers.sql) from the Subscription model.

Then, based on those monthly metrics, the package calculates the quarterly totals:

- [Quarterly ARR](https://github.com/metabase/financial-modeling-package/blob/main/sqls/quarterly_arr.sql) from Monthly ARR.
- [Quarterly customers](https://github.com/metabase/financial-modeling-package/blob/main/sqls/quarterly_customers.sql) from Monthly customers.
- [Quarterly trialers](https://github.com/metabase/financial-modeling-package/blob/main/sqls/quarterly_trialers.sql) from Monthly trialers.

## Creating public questions to import into your financial model template

With all of our models in place, the package then creates two questions in Metabase and makes them available via public links. By making the links public, the [Financial model template](https://docs.google.com/spreadsheets/d/1wG1p-wj9k3AxLeZcRvTVNgxJdiEaOXof-0heoHGkvpM/edit?usp=sharing) (the Google Sheet) will be able to visit the public link and import the data as a CSV file.

- [Exported latest metrics](https://github.com/metabase/financial-modeling-package/blob/main/sqls/public/exported_latest_metrics.sql)
- [Exported quarterly metrics](https://github.com/metabase/financial-modeling-package/blob/main/sqls/public/exported_quarterly_metrics.sql)

These questions union a bunch of the metrics we're interested in, which we can then pivot in the Financial model template:

```console
quarter
quarter_name
metric
value
```

The metrics include:

```console
Annual Contract Value
ARR Quarterly Expansion Rate
ARR % Quarterly growth
ARR % YoY growth
Avg Monthly Customer Churn Rate
Beginning ARR
Beginning customers
Churn ARR
Churn customers
Contraction ARR
Customers % Quarterly growth
Customers % YoY growth
Ending ARR
Ending customers
Expansion ARR
New ARR
New customers
Trialer % Quarterly growth
Trial Quarterly Conversion Rate
```

> While these links are "public", the URLs Metabase are virtually unguessable. But keep in mind that anyone with the link could view the data available at that URL.
