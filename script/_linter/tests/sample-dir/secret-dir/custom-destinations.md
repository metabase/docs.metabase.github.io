---
layout: learn_article
title: "Custom destinations: choose what happens when people click on charts in your dashboard"
summary: "You can set up dashboard cards to send people to dashboards, saved questions, and URLs, and use values from the card to update filters at the destination, or parameterize links to external sites."
date: 2020-10-28 00:16:26
modified: 2020-12-01 00:16:26
categories: ["Reporting"]
level: Intermediate
image: /images/twitter/default.png
author: The Metabase Team
redirect_from:
  - /learn/building-analytics/dashboards/custom-destinations.html
---

<div class="learn-toc" markdown="1">
- [Customizing click behavior](#customizing-click-behavior)
- [Custom destination](#custom-destination)
- [Add navigation with text boxes](#add-navigation-with-text-boxes)
- [Recap](#recap)
</div>

Metabase provides some simple building blocks that let you customize what happens when someone clicks on a chart on your dashboard. You can combine these primitives to create crackpots through your reports, with dashboards updating subsequent dashboards, and even sending people to external sites.

For this article, we'll focus on one of the options for customizing click behavior: **Go to a custom destination**. We'll walk through a scenario using Metabase's Sample Dataset to show you how custom destinations work, and show you some neat tricks to create interactive experiences.

Here's the user experience we want to create: we have two dashboards: an **Orders Overview** dashboard, and a **Product Details** dashboard. When someone views our Orders Overview dashboard, they should be able to click on a product and have Metabase take them to a Product Detail dashboard that updates based on which product the user clicked. Once people reach the Product Detail dashboard, Metabase should be able to send people to different external URLs based on which product category they click.

So here's our starting point: the Orders Overview dashboard:

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/orders-overview.png" description="<em>Fig. 1</em>. The <strong>Orders Overview</strong> dashboard." %}

Which we'll link to (and update) the **Product Detail** dashboard.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/product-details.png" description="<em>Fig. 2</em>. The <strong>Product Detail</strong> dashboard." %}

Then we'll show how we can link to an external website. Just as an example, we'll use the [search results page](https://www.metabase.com/search?query=interactive+dashboards) for Metabase docs, and search for the product the user clicked.

Here's the full clickpath:

Orders overview dashboard -> Product detail dashboard -> External site

See the GIF in figure 3 to see the clickpath in action:

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/clickpath.gif" description="<em>Fig. 4</em>. A clickpath from the <strong>Orders overview</strong> dashboard to the <strong>Product detail</strong> dashboard, to the Metabase docs search page for the clicked category: Widget." %}

### Customizing click behavior

Let's start with the Orders overview dashboard. We can add custom click behaviors to each question card on this dashboard, but let's focus on just adding a custom destination to one card. Let's say we want to set up the **Orders** card (the card containing a table of orders), so that when someone clicks on the `Product ID` column, Metabase will 1) send them to the Product detail page, and 2) plug in the filter on the Product Detail dashboard with the `Product ID` of the product the user clicked.

So, starting from the Orders Overview page, we'll click on the **pencil** icon to enter dashboard editing mode.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/edit-dashboard.png" description="<em>Fig. 4</em>. Click the <strong>pencil</strong> icon to enter dashboard edit mode." %}

Next, we'll hover over the card that we want to customize. A menu will appear to the top right. Click on the **Click behavior** menu (it's the icon with the mouse pointer on a card - see figure 5).

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/click-behavior-icon.png" description="<em>Fig. 5</em>. Hover over the card you want to customize, and click on the <strong>Click behavior</strong> icon." %}

Metabase will slide out a sidebar for you to set up what happens when someone clicks on this table.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/click-behavior-for-each-column.png" description="<em>Fig. 6</em>. For cards with tables, you can customize click behavior for each column. For questions composed using the query builder, the default click behavior is to <strong>Open the action menu</strong>." %}

Let's get a lay of the land (figure 6):

- Top left: a **Date filter**. You can customize settings for this filter by clicking on the **gears** icon.
- Card grid: since we selected **Click behavior** for the **Orders** card, Metabase highlights its **On click** label in blue. We can select the on-click behavior on another card by clicking the card's label.
- Top right: the main editing menu, with options to add a question, text box, or filter.
- Right sidebar: options for customizing the on-click behavior for the current card.

Since we used the query builder to compose the Orders question, Metabase set the default click behavior to **Open the action menu**, which allows people to [drill through the data](/learn/basics/questions/drill-through.html).

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/click-behavior-product-id.png" description="<em>Fig. 7</em>. Click behavior for the <strong>Product ID</strong> column. Defaults to <strong>Open the action menu</strong>." %}

Let's change the click behavior to send people to our Product detail dashboard.

Tables and custom destinations make a particularly great combo, because we can set different custom destinations for each column in a table. To set up our example, we're just going to set up the click behavior for a single column. We're going to set a custom destination on the Orders question card so that when people click on a value in the `Product ID` column, Metabase will 1) send them to the Product Detail dashboard and 2) filter that dashboard by the clicked `Product ID`.

Here are our options (as shown in figure 7 above):

- Open the action menu (default for questions composed with the query-builder).
- Go to a custom destination.
- Update a dashboard filter.

We'll select **Go to a custom destination**:

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/custom-destination-options.png" description="<em>Fig. 8</em>. There are three main options for custom destinations: <strong>Dashboard</strong>, <strong>Saved question</strong>, or <strong>URL</strong>." %}

Metabase will present three options for custom destinations: Dashboard, Saved question, or URL. To send people to the Product Detail dashboard, we'll select the **Dashboard** option, and select our Product Detail dashboard.

So here's a checkpoint (figure 9):

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/link-to-product-detail.png" description="<em>Fig. 9</em>. We have the <strong>Product ID</strong> column set to <strong>Go to a custom destination</strong>, which we've set up to link to the <strong>Product detail</strong> dashboard.
 " %}

So far we have the `Product ID` column set to **Go to a custom destination**, which we've set up to link to the **Product detail** dashboard.

But we're not quite done setting up this link. Next, we want to **Pass values to this dashboard's filters**. In figure 9 you'll notice a list of Available filters. These filters are filters at the destination. In this case, the Product detail dashboard has two filters: **Product title** and **Product ID**, that we can pass values to.

Select the **Values you can reference** to see a list of values we can pass to the filters at our destination.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/reference-values.png" description="<em>Fig. 10</em>. Click on the <strong>Values you can reference</strong> dropdown to see values you can pass to a destination filter." %}

Notice that you can pass values from any of the columns in the table, not just the `Product ID` column. You can also pass values from dashboard filters, which, in the case of the Orders overview dashboard, is the lone Date filter. For our use case, we'll pass the value from the `Product ID` column.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/pass-product-id.png" description="<em>Fig. 11</em>. Passing the value from the <strong>Product ID</strong> column to the ID filter at the destination dashboard. " %}

Metabase will provide a summary:

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/custom-destination-summary.png" description="<em>Fig. 12</em>. Summary of the click behavior we've set up: Go to a custom destination, which we're set to be the Product detail dashboard, and pass the value from the <strong>Product ID</strong> column to the ID filter on the Product detail dashboard." %}

Here, Metabase is confirming that we've set up the click behavior for the `Product ID` column to:

- Go to a custom destination.
- Link to the Product detail dashboard.
- Pass the value from the `Product ID` column to the **ID** filter on the Product detail dashboard.

Let's try it out: From the Orders overview, we'll click on the Product ID column, and Metabase takes us to the Product detail dashboard, with the value `14` plugged into the **ID** filter.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/overview-to-detail.gif" description="<em>Fig. 13</em>. Clicking on the <strong>Product ID</strong> column in the Orders overview dashboard sends you to the Product detail page and plugs the <strong>Product ID</strong> value (in this case 14, the ID for Awesome Concrete Shoes) into the ID filter on the Product detail dashboard. " %}

## Custom destination ERROR

Next, we'll set up the Product detail dashboard so that when people click on the Product Category card, Metabase will send them to an external site, and parameterize the URL with the value from the card. We can send them to any external site, but for this example we'll send them to the search page for Metabase docs, just so you can see the parameterization in action (and because reading our documentation will make you a better person).

So, here's our Product detail dashboard again:

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/product-details.png" description="<em>Fig. 14</em>. Product detail dashboard, showing details for the classic Lightweight Wool Computer." %}

As before, we'll go to dashboard edit mode, hover over the **Product category** card, and select **Click behavior**.

This time, we'll see a slightly different menu:

- Do nothing
- Go to a custom question
- Update a dashboard filter

The reason there is a **Do nothing** option is because the Product category question is written in SQL, and SQL questions don't include the action menu. And here's where we show you a neat trick. If we look at the card's question, **Product**, we'll see that it's a simple SQL query with two [field filters](/learn/building-analytics/sql-templates/field-filters.html).

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/product-category-question.png" description="<em>Fig. 15</em>. Product category question written in SQL." %}

```
select CATEGORY
from PRODUCTS
where
    {%raw%}{{TITLE}}{%endraw%} and
    {%raw%}{{ID}}{%endraw%}
```

Here's the trick: if we set up the visualization to be **Number**, the dashboard card will operate like a variable text card, changing its text based on the value in the filter. In fact, that's what we've done for the **Product** card.

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/details-for-awesome-concrete-shoes.png" description="<em>Fig. 16</em>. Product question written in SQL." %}

You can use `concat` to create strings that update based on the filter's value.

```
select concat('Details for ', TITLE)
from PRODUCTS
where
    {%raw%}{{TITLE}}{%endraw%} and
    {%raw%}{{ID}}{%endraw%}
```

Let's return to setting up a custom destination for the **Product category** question. When we select URL, we'll enter our URL, and we'll include parameters by wrapping them in double braces, like so: {%raw%}{{parameter}}{%endraw%}. In this case, we'll use `Category` as a parameter in the URL:

```
https://www.metabase.com/search?query={%raw%}{{Category}}{%endraw%}
```

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/enter-a-url.png" description="<em>Fig. 17</em>. Modal for entering a custom URL. You can use double braces to enclose parameters." %}

You can view the **Values you can reference** dropdown to see the full list of values you can use as parameters in your URL. You can use any (or all) of the values in the URL, including repeated use of the same value.

## Add navigation with text boxes

Another trick: in addition to [adding context for your dashboards](/learn/building-analytics/dashboards/markdown.html), you can use text cards to add helpful navigation links to your dashboards.

You may have spotted the text card with the text "Return to Orders overview":

{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/helpful-navigation-link.png" description="<em>Fig. 18</em>. Using a text card to add a helpful navigation link." %}

It's a simple text card with a link back to the Orders overview dashboard, just a convenience for your readers to make it easy to browse through your clickpath. You can center the text on the card, and use Markdown to create the link.

## Recap

We've shown you how to set up a simple click path:

Orders overview dashboard -> Product detail dashboard -> External site

But that's just one clickpath. You can customize behavior for each question card on your dashboard! For example, you could create a State detail dashboard and customize click behavior on the map of the United States so that Metabase sends people to the State detail dashboard, filtered by the clicked state.

Questions built using Metabase's query builder will default to the action menu, which lets users [drill through the data](/learn/basics/questions/drill-through.html), but for SQL questions, we recommend customizing a destination (where it makes sense).

[Metabase Enterprise](https://www.metabase.com/enterprise/scale/) customers even have the option to pass user attributes into URLs or destination filters, allowing you to tailor experiences for specific users.

So get creative with setting up clickpaths through your data, and share any tricks you come up with on [our forum](https://discourse.metabase.com/t/programmatically-create-questions/12109).
