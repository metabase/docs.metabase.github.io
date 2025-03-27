---
title: "A machine to model your finances"
description: "This four-part guide walks you through a simple, scalable setup for a metrics store in Metabase, which will help you make sense of your business with the data that you have."
image-hero: /startup-guide/images/metrics-hero.png
image-og: /startup-guide/images/metrics-og.png
---

For context, you can **think of a metrics store as just a set of time series that describes your startup**. The metrics store contains the models and metrics that are fundamental to understanding your business.

We'll cover what problems a metrics setup should solve for, and what questions you should be able to use your metrics store to answer. Then we'll recommend a particular setup that you can run with or adapt to your needs.

## The setup

The particular setup we recommend goes like this:

![Metrics store to spreadsheets](/startup-guide/images/metrics-store-to-spreadsheet.png)

You use Metabase as your metrics store to keep your models and metrics clean and reliable, and then you import that data into a spreadsheet template to play around with projections and scenarios.

There's a fair amount of setup involved, but that's the gist of it.

## What this particular setup offers

- **Data freshness**. Data will be up to date in a reasonable timeframe, ideally daily.
- **Data consistency**. A metrics store consolidates data, so that the numbers you use for historicals, projections, and alternative scenarios in your spreadsheet will the be same numbers everyone uses for reporting. This is particularly important when your company grows and teams require more data. With a metrics store, everyone can work from the same base set of numbers, and you avoid the messy proliferation of spreadsheets, each with their set of slightly different numbers.
- **Data prioritization**. The idea behind a metrics store is to canonize metrics for your startup. The metrics the store contains will be your startup's most important numbers for gauging the health of your startup and identifying areas where you can improve.
- **Data flexibility**. The store will be capable of handling data for any arbitrary domain.

## Sections of this guide

Here's a preview of what we'll cover in this guide:

### Module 1: Using Metabase as a metrics store

In this module, you'll learn how to:

- Connect Metabase to your data.
- Build and save models in Metabase. This will help you pull together the data you need to answer your startup's most frequently asked and important questions.
- Identify key metrics to start your metrics store.

See [Using Metabase as a metrics store](./models).

### Module 2: Importing metrics to a spreadsheet

Learn which settings to enable in Metabase, how to set up your spreadsheet, and import metrics from your metric store.

See [Importing metrics to a spreadsheet](./importing-metrics-to-a-spreadsheet).

### Module 3: Creating projections

We'll walk through how historical data is used to project future outcomes, like increasing revenue or decreasing costs.

See [Projections](./projections).

### Module 4: Modeling scenarios

Last, we'll talk about scenarios and how you can plug in numbers to model alternative situations. For example, if you'll have enough resources to meet demands for years to come.

See [Scenarios](./scenarios).
