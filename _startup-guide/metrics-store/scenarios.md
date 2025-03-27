---
title: "Modeling scenarios"
description: "Changing inputs to model alternative scenarios."
image-hero: /startup-guide/images/scenarios-hero.png
image-og: /startup-guide/images/scenarios-og.png
---

In the [previous module](./projections), we created a single forecast, representing one coherent view of the future. Often you'll want to look at alternatives and ask 'what if' questions. In these cases, you create versions of your forecast and edit them to represent different views of the future, called **scenarios**.

## Why look at different scenarios?

Exploring scenarios can help you in three common situations:

- [Reflecting your uncertainty](#reflecting-your-uncertainty)
- [Comparing different courses of action](#comparing-different-courses-of-action)
- [Understanding 'what it would take' to hit a target](#understanding-what-it-would-take-to-hit-a-target)

### Reflecting your uncertainty

Predicting the future is hard. A simple way to model this uncertainty is to create a few scenarios: for example, pessimistic, baseline, and optimistic.

Going back to our [example of the waterflow in a reservoir](./projections), imagine that you aren’t that confident that the typical person uses ten cubic meters of water per month. Some of your historical data suggests that water usage could be as low as eight cubic meters per month, or as high as twelve cubic meters per month. In this case of range, you could run different scenarios to check if you still have sufficient water supply in each situation.

### Comparing different courses of action

In the reservoir management example, you’re comparing your baseline scenario to an alternative scenario where you supply water to the nearby city, to help you pick between the two courses of action.

Let’s say that in our water reservoir example, you build your model and find out that you have enough water to meet your demand for years to come, even with the expected population growth. Given that your surplus of water, there is a proposal for your area to supply a nearby city which is running into shortages. Before you agree to this, you decide to examine this ‘what if’ using your model, so that you can understand the likely impact. You don’t want to agree to this if it means that your reservoir will be depleted over time and result in a water crisis.

### Understanding "what it would take" to hit a target

This approach is often used for target-setting in a company. Rather than plugging in your inputs to see what would happen, you work back from where you need to be to figure out what it would take to get to where you want to be.

Let’s say you run your baseline scenario and learn that the reservoir won't have enough water to meet the local demand. One of the culprits is water wasted through the leaky pipe network supplying the local residents. You’ve written a proposal to get the pipe network repaired to reduce water waste. But how much do you need to reduce waste to balance your water supply and demand? In this situation you could create some scenarios to work out the minimum reduction in waste that would balance your water budget.

## How to create different scenarios

We'll first cover some [concepts](#scenario-concepts), then put those concepts [into practice](#creating-different-scenarios).

### Scenario concepts

Before we dive into spreadsheet mechanics, let’s cover the concepts of what you do when you update a forecast.

Let’s recap a few ingredients that went into your baseline forecast:

- You have your **historical data**, also known as **actuals**.
- Your **driver** time series are projected forward, one-by-one
- Your **dependent** time series are calculated from your driver time series, based on mathematical **relationships**.
- How you project the driver time series depends on the **[projection method](./projections)** you choose, combined with any numerical **inputs** that go into the projection. For example, you could project the 'water consumed per resident' metric using the constant method, with an input value of 10m^3 per month.

When you create a scenario, you usually change one of these two ingredients:

- **Changing the numerical inputs** used to project your driver time series. Changing inputs is the simplest type of scenario to implement. If you have your model set up well, with inputs separated out into one section, swapping inputs is quick to implement.
- **Changing the projection method** used to project your driver time series. Changing methods can get trickier to implement, but there are usually two (good) reasons to change methods. First is that you aren’t confident how a given driver fundamentally works. Does the time series grow linearly or exponentially? You may need to look at the outcome in both cases. The second reason to change methods is because you want to fundamentally change how something works and model the effects (i.e., see what happens).

Notice that one ingredient you don’t change is the **relationships** between time series. Taken collectively, the relationships between time series in your model are referred to as the model **structure**. Think of the model structure as your understanding of how the system you're modeling _works_. If you haven’t figured out the model structure when creating your baseline scenario, it's probably too early to start looking at different scenarios.

When you create scenarios, you should keep the model structure fixed. That way, generating new scenarios (ideally) comes down to flipping a few controls which change the **numerical inputs**.

There are exceptions to this. Let’s say you are modeling a business, and you want to see the impacts of completely reorganizing the business from a self-serve model to a sales-led model. In that case, you might create a scenario with a fundamentally different model structure, because what you’re really doing is just creating two fundamentally separate models and then comparing their outcomes.

## Creating different scenarios

There are basically two ways to differentiate scenarios:

- [Varying numerical inputs](#creating-scenarios-by-varying-numerical-inputs)
- [Varying projection methods](#creating-scenarios-by-varying-projection-methods)

### Creating scenarios by varying numerical inputs

Recapping, when you build your baseline forecast you set up your model structure, and separate out your numerical inputs.

Creating scenarios then becomes very simple: you simply change the value of the input. Because you have linked your drivers back to your inputs, the change will flow through your model.

You can optionally save a copy of your spreadsheet model at this point, showing the output of the scenario.

### Creating scenarios by varying projection methods

A lot of the time, you can develop your scenarios by varying numerical inputs only. If you _do_ want to vary projection method, you can build this ability into your baseline model.

To do this in a spreadsheet model:

- Update your assumptions area to include two options for your metric: the monthly growth rate (cell B3) and the projection method (cell C3).
- Create a dropdown for cell C3, so that you can select between ‘Linear’ and ‘Exponential’.
- In your driver projection (row c), set up an if formula so that the projection works differently if cell C3 is set to ‘Linear’ or ‘Exponential’.
- The basic syntax for this is:
  `=IF($C3C="Linear", *<formula for a linear projection>*, IF($C$3="Exponential", *<formula for an exponential projection>*, *<error message if no model is selected>*))`.
- Note that an excel formula doesn’t have elseif functionality, so we’re nesting two ifs so that we can include an error message if no projection model is selected.
- The interpretation of the growth rate changes depending on the model:
  - For the linear case, the growth rate is the absolute number of units added each month.
  - For the exponential case, the growth rate is the % growth month-on-month.

|     | A                            | B           | C                                                                                         | D               |
| --- | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------- | --------------- |
| 1   | Assumptions                  |             |                                                                                           |                 |
| 2   | Metric                       | Growth rate | Projection method                                                                         |                 |
| 3   | Metric 1                     | 1           | Linear                                                                                    |                 |
| 4   |                              |             |                                                                                           |                 |
| 5   | Forecast                     |             |                                                                                           |                 |
| 6   | Month                        | January     | February                                                                                  | March           |
| 7   | Actual (A) or Projection (P) | (A)         | (P)                                                                                       | (P)             |
| 8   | Metric 1                     | 10          | =IF($C$3="Linear",B8+$B$3,IF($C$3="Exponential",B8\*(1+$B$3), "Enter projection method")) | Fill C3 across… |

Once you have created this setup in your dropdown, you can toggle between scenarios by updating the values in your input scenarios.
