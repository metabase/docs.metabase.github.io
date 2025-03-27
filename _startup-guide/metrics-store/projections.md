---
title: Creating projections
description: "Extending your historical data into the future."
image-hero: /startup-guide/images/projections-hero.png
image-og: /startup-guide/images/projections-og.png
---

## Getting started on your projections

You’ve now imported your data from your Metabase metrics store into a spreadsheet. This forms your historical data (or in financial jargon, your ‘actuals’).

In most models, the next step is to create your **projections** (also known as **forecasts**). Note that forecasts are based on the expected course of action, and projections are based on various hypothetical situations (but the terms are often used interchangeably).

## What is a projection? Why make one?

When you create a projection, you’re trying to predict how some system will play out in the future. Common examples are:

- The weather forecast: a prediction of the weather in a certain geography over the coming days.
- Predicting the spread of an epidemic by modeling the number of infected patients over time.
- Modeling the customer growth of a business.

There are usually two reasons to create a projection:

1. **To decide how to _react_ to the outcome.** Armed with an accurate weather forecast, I can decide whether to go hiking tomorrow or not. Or in more extreme situations, I can decide whether to evacuate ahead of an impending hurricane.
2. **To decide how to _influence_ the outcome.** It’s difficult to influence tomorrow’s weather, but there are some outcomes you can influence. If you’re deciding whether to spend that extra \$100k on a marketing campaign _today_, understanding how likely it is to impact customer numbers in _the future_ could help you decide whether that campaign is worth the investment.

Projections are usually based on two elements:

1. Historical observations.
2. Understanding how the system works.

Projections are fundamentally different to guessing. You could guess if there were going to be a hurricane tomorrow, but that guess isn’t going to be a great reason to decide whether to evacuate your home.

Instead, you’d prefer to rely on a weather forecast, which meteorologists base on detailed observations of past and current weather conditions, combined with a (sophisticated) understanding of how weather patterns evolve. Forecasts can be wrong, of course, but the better the forecast, the lower the chances of being wrong.

## Example: forecasting water levels in a reservoir

In the following two modules on projections and scenarios, we’ll illustrate concepts with an example: managing the water levels in a reservoir.

Imagine you’re the manager of the water reservoir in your area. Local residents use the water in the reservoir for drinking, laundry, water balloon fights, and so on. Rivers and canals replenish the reservoir over time.

As a responsible reservoir manager, you monitor the water levels. You also want to forecast how the water levels change over time.

Projecting reservoir levels may seems like a random example, but bear with us. Water flowing in and out of a reservoir happens to be a good parallel for customers flowing in and out of a subscription business.

The basic math for the water in your reservoir at the end of the month is:

> Ending water level = Starting water level + inflow of rainwater (from rivers) - outflow of water (to residents)

Let’s say you’ve got a good handle on the average amount of water that flows in each month. You’re interested in forecasting the _outflow_ part.

Your basic math for this is:

> outflow of water = local population \* water use per resident

In a spreadsheet model you would set this up as:

| Month                                 | Jan     | Feb     | March   |
| ------------------------------------- | ------- | ------- | ------- |
| Local population                      | 100,000 | 100,000 | 100,000 |
| Monthly water use per resident, cu. m | 10      | 10      | 10      |
| Total monthly water outflow, cu. m    | 1m      | 1m      | 1m      |

## How to create a forecast

Usually, you’d start with a single forecast, which is your central view of the future.

Going back to our spreadsheet model, we already have a bunch of actuals imported from Metabase. Using our reservoir example, our spreadsheet looks something like this:

| Month                                 | Jan     | Feb     | March   |
| ------------------------------------- | ------- | ------- | ------- |
| Actual (A) or Projection (P)          | (A)     | (A)     | (A)     |
| Local population                      | 100,000 | 100,000 | 100,000 |
| Monthly water use per resident, cu. m | 10      | 10      | 10      |
| Total monthly water outflow, cu, m    | 1m      | 1m      | 1m      |

We have 3 time series (population, water use, and total water outflow). To create our forecast, we need to project each of these time series forward.

### Identify and model your driver time series

How do you project these time series forward? Going back to the reason you’re creating the forecast in the first place, the number you want to know is the monthly water outflow. But outflow is difficult to forecast in isolation. Usually you’d break outflow down into its component parts until you get to something you _can_ predict.

In our case, we’ve broken down our metric into:

> outflow of water = local population \* water use per resident

We can predict the last two variables in this equation with reasonable accuracy:

- You look at local studies, and historically the local population has grown by 6% per year and is expected to continue doing so (roughly 0.5% per month, ignoring compounding).
- When you look back at your past data and compare water usage to the population, you observe that water use per resident has been fairly constant at 10 cubic meters per year.

With this knowledge, you can forecast these two **driver** time series.

| Month                                 | March   | April   | May     |
| ------------------------------------- | ------- | ------- | ------- |
| Actual (A) or Projection (P)          | (A)     | (P)     | (P)     |
| Local population                      | 100,000 | 100,500 | 101,000 |
| Monthly water use per resident, cu. m | 10      | 10      | 10      |
| Total monthly water outflow, cu, m    | 1m      | ?       | ?       |

From here, you can forecast your **dependent** time series, the total monthly water outflow, with the following formulas (see the equation column):

| Month                                 | March   | April   | May     | Equation |
| ------------------------------------- | ------- | ------- | ------- | -------- |
| Actual (A) or Projection (P)          | (A)     | (P)     | (P)     |          |
| Local population                      | 100,000 | 100,500 | 101,000 | A        |
| Monthly water use per resident, cu. m | 10      | 10      | 10      | B        |
| Total monthly water outflow, cu, m    | 1m      | 1.005m  | 1.01m   | A \* B   |

To recap, we started with what we want to know, our **dependent** time series (monthly water outflow), and broke outflow down into components which we can forecast independently, these components are our **driver** time series.

### What makes a good driver time series?

Fundamentally, a **driver** time series needs to be something which you can forecast independently. There is an element of judgment here. For the local population, let’s assume you have reliable sources for the 6% growth per year figure. It seems reasonable to leave it at that.

But if you can’t directly forecast the drivers you’ve selected, you need to break them down into their own driver time series. For example, you may want to break down water use per resident into its own drivers:

> water use per resident = drinking water per resident + average area back yard per resident \* water use per unit area of backyard

Notice that you can keep going here, breaking down drivers further and further. The decision of how far to go will determine the sophistication of your model. But there is a tradeoff here. Typically, the more sophisticated your model, the more time you will spend building, updating, and debugging it---work that may not yield better predictions.

It can also be helpful to select drivers which you can influence. For example, in a financial model, the cost of a product is a good driver because you determine how much the product costs. Moreover, you’re likely to _want_ to see the impact of price changes, so it's a good idea to use product cost as a driver.

## Methods for projecting driver time series

Let's cover how to create a projection for a **baseline** model. That is, you’re trying to project your drivers as faithfully as possible, based on how they’ve behaved in the past. In the [next module](./scenarios) we’ll talk about what to do if you want to deviate from this baseline (e.g., if you're look at using scenarios to create alternative views of the future.)

There are a few common **projection methods** used to forecast drivers in spreadsheet models.

### Constant method

The constant method assumes your driver doesn’t change with time.

One way to implement the constant method is to assume that the number will have the same, single, absolute value over time:

| Month                        | March | April | May |
| ---------------------------- | ----- | ----- | --- |
| Actual (A) or Projection (P) | (A)   | (P)   | (P) |
| Driver metric                | 10    | 10    | 10  |

To use the constant method in a spreadsheet model:

- Write the absolute value of your metric in an input cell at the top of the sheet (in this case cell B2)
- Link the driver projection cells back to that input cell

|     | A                            | B     | C     | D     |
| --- | ---------------------------- | ----- | ----- | ----- |
| 1   | Assumptions                  |       |       |       |
| 2   | Metric 1 value:              | 10    |       |       |
| 3   |                              |       |       |       |
| 4   | Forecast                     |       |       |       |
| 5   | Month                        | March | April | May   |
| 6   | Actual (A) or Projection (P) | (A)   | (P)   | (P)   |
| 7   | Driver metric                | 10    | =$B$2 | =$B$2 |

Alternatively, you can do use the constant method by taking the average of recent periods. Common ranges to take are the last 12, 6 or 3 months.

| Month                        | January | February | March | April | May |
| ---------------------------- | ------- | -------- | ----- | ----- | --- |
| Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)   | (P) |
| Driver metric                | 9       | 11       | 10    | 10    | 10  |

To do this in a spreadsheet model:

- Use the average formula in the projection cells, referring back to the trailing cells
- Lock the reference using \$ signs in your formula (as shown below) and fill it across

|     | A                            | B       | C        | D     | E                 | F                 |
| --- | ---------------------------- | ------- | -------- | ----- | ----------------- | ----------------- |
| 1   | Assumptions                  |         |          |       |                   |                   |
| 2   | Metric 1 value:              | 10      |          |       |                   |                   |
| 3   |                              |         |          |       |                   |                   |
| 4   | Forecast                     |         |          |       |                   |                   |
| 5   | Month                        | January | February | March | April             | May               |
| 6   | Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)               | (P)               |
| 7   | Driver metric                | 9       | 11       | 10    | =AVERAGE($B2:$D2) | =AVERAGE($B2:$D2) |

### Moving window method

The moving window method assumes your future metrics change at the same rate as your recent metrics.

A mix of actuals and projections are used to make the next projection. For example, you can take a **moving average** of the three previous months:

| Month                        | January | February | March | April | May  |
| ---------------------------- | ------- | -------- | ----- | ----- | ---- |
| Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)   | (P)  |
| Driver metric                | 10      | 15       | 20    | 15    | 16.6 |

A three-month moving average projection will take the average of the last three actuals, if those exist (e.g., the April projection). But if those months haven’t happened yet, the projection will take the average of actuals _and_ projections (e.g., the May projection).

To use the moving window method in a spreadsheet model:

- Use the average formula in the projection cells, referring back to the trailing cells.
- Fill it across, without using the \$ to lock the cell reference.

|     | A                            | B       | C        | D     | E               | F               |
| --- | ---------------------------- | ------- | -------- | ----- | --------------- | --------------- |
| 1   | Assumptions                  |         |          |       |                 |                 |
| 2   | Metric 1 value:              | 10      |          |       |                 |                 |
| 3   |                              |         |          |       |                 |                 |
| 4   | Forecast                     |         |          |       |                 |                 |
| 5   | Month                        | January | February | March | April           | May             |
| 6   | Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)             | (P)             |
| 7   | Driver metric                | 9       | 11       | 10    | =AVERAGE(B2:D2) | =AVERAGE(C2:E2) |

### Linear growth method

With the linear growth method, you can project your numbers growing at a fixed rate. For our model of water demand, you might want to consider the number of car wash businesses in your area. On average, one new car wash is opened every four months, or 0.25 car washes per month.

Your driver time series might look like this:

| Month                        | January | February | March | April | May  |
| ---------------------------- | ------- | -------- | ----- | ----- | ---- |
| Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)   | (P)  |
| Car wash businesses          | 35      | 35       | 35    | 35.25 | 35.5 |

> Whether you should round fractional numbers is a matter of personal style. Some modelers will lose their minds if you suggest that there’s such a thing as a quarter of car wash, but often leaving numbers unrounded won’t impact the results of the model.

To do this in a spreadsheet model:

- Create an input cell at the top, with the amount your metric increases by each month. If your model works on a quarterly or annual basis, use the amount your metric increases per quarter or per year.
- In your time series projection cell, you’re going to build the formula shown below:
  - `=$D7$`: Here you’re referring back to the last number of our actuals, the starting point of your projection.
  - `+COUNTA($E6:E6) * $B$2`: Here you’re multiplying the number of new car washes per month by the number of months in your projection. Notice that you’re locking the reference to the first part of the range `$E6:E6` with the `$`, so that as your range expands, and the number of months counted goes up.
- Fill the formula across to the right.

|     | A                            | B       | C        | D     | E                              | F                              |
| --- | ---------------------------- | ------- | -------- | ----- | ------------------------------ | ------------------------------ |
| 1   | Assumptions                  |         |          |       |                                |                                |
| 2   | New car washes per month     | 0.25    |          |       |                                |                                |
| 3   |                              |         |          |       |                                |                                |
| 4   | Forecast                     |         |          |       |                                |                                |
| 5   | Month                        | January | February | March | April                          | May                            |
| 6   | Actual (A) or Projection (P) | (A)     | (A)      | (A)   | (P)                            | (P)                            |
| 7   | Driver metric                | 35      | 36       | 36    | =$D$7 + COUNTA($E6:E6) * $B\$2 | =$D$7 + COUNTA($E6:F6) * $B\$2 |

### Exponential growth method

Some metrics will naturally grow in an exponential fashion. That is, each month you’ll add on a fixed percentage of the previous month’s value. To illustrate the exponential growth effect in our water usage example, let’s assume the local population grows by 5% per month.

| Month                        | March   | April   | May     |
| ---------------------------- | ------- | ------- | ------- |
| Actual (A) or Projection (P) | (A)     | (P)     | (P)     |
| Population                   | 100,000 | 105,000 | 110,250 |

In this example, April’s value represents a 5% increase on May’s value and so on.

To model exponential growth in a spreadsheet:

- Create an input cell at the top, with the monthly growth rate for your metric. If your model works on a quarterly or annual basis, this amount would be a quarterly or annual growth rate.
- In your time series projection cell, you'd multiply the previous cell’s value by 1 + `monthly growth rate`. You'd add the one so that you're multiplying the previous cell’s value by 105%, not 5%.
- Fill the formula across to the right.

|     | A                              | B       | C        | D       | E               | F               |
| --- | ------------------------------ | ------- | -------- | ------- | --------------- | --------------- |
| 1   | Assumptions                    |         |          |         |                 |                 |
| 2   | Population monthly growth rate | 5%      |          |         |                 |                 |
| 3   |                                |         |          |         |                 |                 |
| 4   | Forecast                       |         |          |         |                 |                 |
| 5   | Month                          | January | February | March   | April           | May             |
| 6   | Actual (A) or Projection (P)   | (A)     | (A)      | (A)     | (P)             | (P)             |
| 7   | Driver metric                  | 100,000 | 105,000  | 110,250 | =D7 \* (1+$B$2) | =E7 \* (1+$B$2) |

### Pulling out your assumptions

There are **assumptions** in most of these methods. For example, the number of new car washes added per month, or the local population growth rate. It's good modeling practice to create an **assumptions** (or **input**) section at the top of your model, and link your formulas back to these cells.

This section gives you a single place to update your assumptions, without having to go through and edit each individual formula. Writing numerical inputs directly into formulas is known as ‘hard coding’ and is seen as a bad practice as it makes models tricky to update.

Imagine you hard-code a number into one formula, then you fill that value across 50 cells in a row. Then you do that for all 100 rows in your model, where each row has its own inputs. If you want to change one input number, you have to comb through every row, updating the numbers, and then make sure you didn't leave any instances of the old number. Compare that to having to update a single input cell.

Having your assumptions in one place will come in handy when it comes to looking at [scenarios in the next module](./scenarios).
