---
layout: learn_article
author: "The Metabase Team"
redirect_from:
  - /learn/metabase-basics/getting-started/mongodb
---

{% include youtube.html id='3TU9IXRlH24' %}

For this tutorial, we’ll use a free MongoDB Atlas cluster and a free trial of Metabase Cloud to build a dashboard exploring the MongoDB sample data.

![Better dashboard](../../images/mongodb/better-dashboard.png)

## Step 1: Create a MongoDB Atlas cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create an account.

2. Create a free M0 cluster. Check the "Preload sample dataset" box to get the sample data loaded into your cluster -- we'll work with it in this tutorial.

   ![MongoDB conenction string](../../images/mongodb/create-cluster.png)

If you see a cluster connection popup after creating a cluster, you can close it for now. While the cluster is being provisioned, let’s create a Metabase Cloud instance that will connect to the cluster.

## Step 2: Set up Metabase

1. Get started from [https://www.metabase.com/cloud](/cloud/) . You’ll be asked to create a Metabase Store account.
2. Select the Starter plan. Don’t worry: whatever plan you select, you’ll get a free 14-day trial, and you can always change or cancel your plan later.
3. Select the alias and region for your Metabase:

   **Alias**: the URL you'll use to log in to your Metabase.

   **Region** is the region where your Metabase will be hosted ([you can change it later](/docs/latest/cloud/change-region)).

4. It’ll take about 2 mins to set up your Metabase. (In the meantime, you can [configure network access for your Atlas cluster](#step-3-configure-your-atlas-cluster-to-allow-connections-from-your-metabase)). Once your Metabase is ready, you’ll be asked to create a separate account for this new Metabase (separate from your Metabase Cloud store account).

You can enter your database details on the Metabase setup screen, but let's skip that step for now and add a database later.

## Step 3: Configure your Atlas cluster to allow connections from your Metabase

To make sure Metabase can read the data in your cluster, you’ll need to allow access from the IP addresses used by your Metabase.

In your Atlas cluster settings, go to **Network access** and add the [Metabase Cloud IP addresses](/docs/latest/cloud/ip-addresses-to-whitelist) corresponding to the region you selected.

![IP allowlist](../../images/mongodb/ip-allowlist.png)

## Step 4: Get the MongoDB connection information

To connect Metabase to MongoDB, you’ll need to get either the connection string or connection parameters. For a database in an Atlas cluster, the connection string option is more convenient.

1. In your Atlas cluster interface, click on **Connect** and select **Drivers**
2. Find the connection string in the **"Add your connection string in your application code"**
   ![MongoDB connection string](../../images/mongodb/connection-string.png)

   This connection will be for the entire Atlas cluster, but Metabase needs a specific database to connect to.

3. Edit the connection string to add the database name after `/`:

   ```sh
   mongodb+srv://metabot:metapass@metabase-magic.a5ej7.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=metabase-magic
   ```

Here we used the `sample_mflix` database preloaded in the Atlas cluster.

## Step 5: Connect Metabase to MongoDB

You can connect Metabase to your MongoDB while you’re setting up your Metabase, or connect your database after Metabase initializes by going to **Admin Settings → Databases**.

In the connection interface, click on "Paste the connection string" and paste the connection string (remember to replace the `<password>` placeholder with your password!):

![Metabase connection](../../images/mongodb/metabase-connection-interface.png)

If you have ay trouble connecting, check out our [MongoDB conenction docs](/docs/latest/databases/connections/mongodb) and the [connection troubleshooting guide](/docs/latest/troubleshooting-guide/db-connection).

## Step 5: See your data

Once Metabase connects to your MongoDB, you can start exploring your data in Metabase. If you’re still in Admin mode, click **Exit Admin** in the top right corner.

In the left navigation sidebar, go to Browse → Databases and find your newly added database and the collections in it. If you connected to the `sample_mflix` database, you should see collections like Movies, Theaters, Comments, and others.

![Movies database](../../images/mongodb/browse-databases.png)

Click on a collection to see its contents:

![view tables](../../images/mongodb/view-table.png)

Metabase will present MongoDB documents in a tabular format. From this view, you can start exploring data. For example, try clicking on a header and filtering data:

![Filter by header](../../images/mongodb/column-header.png)

To work with more complicated documents, you can use Metabase's query builder.

## Step 6: Build a query without writing code

Metabase comes with an graphical query builder that lets you explore your data without writing any code.

To start with the query builder, click on the “+ New” button in top right corner and select “Question”. “Questions” in Metabase are what we call queries and their visualizations.

Metabase will parse the JSON structure of MongoDB data and let you filter, summarize, join, and sort on individual fields.

For example, we can use the sample movie data preloaded in the Atlas cluster to see if people rate newer movies lower than old ones. The `Movies` collection includes IMDB data that look like this:

```json
{
  "rating": 7.4,
  "votes": 9847,
  "id": 439
}
```

Let’s build a query to compute the average of IMBD movie rating for every year in the last 50 years:

![Query builder question](../../images/mongodb/qb-question.png)

For more on the query builder, check out our step-by-step tutorial on how to [ask a question in the query builder](/learn/metabase-basics/getting-started/ask-a-question).

Notice that Metabase recognizes the subfields in the "IMDB" field and lets you create summaries by those subfields.

To preview the results in a table, click the "play" button next to the Summarize block.

## Step 7: Create a chart

To create a chart, click **Visualize**.

![Time series of rating by year](../../images/mongodb/first-chart.png)

To customize the chart, click on the settings **gear** icon in the bottom left. For example, to add a trend line, switch to “Display” tab and toggle on “Trend line”.

To emphasize the change in ratings, you can edit the y-axis range in the "Axes" tab.

![Chart settings](../../images/mongodb/chart-settings.png)

Looks like older movies indeed get better ratings!

Once you're happy with your chart, save it to a collection by clicking on the “Save” button at the top right corner. This way you'll be able to revisit it later, share it, and add it to dashboards.

## Step 8: Drill through the data

Charts built with the query builder are interactive: you can refine or drill through the data. Try the following:

- Click and drag to select a section of the time series to zoom in on; Metabase will restrict the date range.
- Click on a data point and select "See these movies" to see individual movies from a specific year and their ratings.
- Click on a data point and select "Filter by this data" to get all the Movies with the higher rating.

## Step 9: Querying with the MongoDB query language

Metabase converts every question you create in the query builder into a MongoDB query. You can see the query it generates in the query builder by clicking on the “View the native query” button in the top right corner, and you convert any query builder question to a MongoDB query.

![CNative query in the QB](../../images/mongodb/qb-native-query.png)

You can also create native MongoDB queries from scratch: click on “+ New → Native query” in the top left corner, select your database, collection, and start coding.

For example, the sample movie collection has data about movie genres in the `Genres` array. You can unwind the array and compute the average movie runtime by genre:

```mongoql
[
  { $unwind: "$genres" },
  {
    $group: {
      _id: {
        genres: "$genres",
      },
      avg: {
        $avg: "$runtime",
      },
    },
  },
  {
    $project: {
      _id: false,
      genre: "$_id.genres",
      avg: true,
    },
  },
];
```

Run the query and visualize the result by clicking on “Visualization” button in the bottom left corner. For example, you can visualize the results as a bar chart:

![Native query chart](../../images/mongodb/native-query.png)

Remember to save your question so you can add it to a dashboard!

## Next steps

Here some things you can try in Metabase next:

- [Create a dashboard](/docs/latest/dashboards/introduction):
- [Share your work](/learn/metabase-basics/getting-started/sharing-work)
- [Create models](/learn/metabase-basics/getting-started/models)
- [Set up permissions](/learn/metabase-basics/administration/permissions/data-permissions)
- [Embed Metabase](/docs/latest/embedding/introduction)
