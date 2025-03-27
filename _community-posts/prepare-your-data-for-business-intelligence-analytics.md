---
title:  "Prepare your data for Business Intelligence Analytics"
redirect_from:
  - /community_posts/prepare-your-data-for-business-intelligence-analytics
meta_description: Data preparation is the process of cleaning and transforming raw data prior to processing and analysis. Learn what 5 steps are needed to prepare your data for Business Intelligence Analytics.
date:   2022-01-07 12:10:58
image: /images/community/prepare-your-data-for-business-intelligence-analytics.jpg
read_time: 2 minutes
category_filters: "Cleaning"
organization: Netguru
organization_url: https://www.netguru.com/
author: Karolina Adamiec
author_img: /images/community/karolina-adamiec.png
author_bio: Karolina is a Business Intelligence Specialist at Netguru, a software development company. You can read more about BI in Netguru [here](https://www.netguru.com/services/business-intelligence){:target="_blank"} or on Netguru’s [Twitter](https://twitter.com/netguru){:target="_blank"}.
---

Being a BI specialist at Netguru, I often encounter data that is not ready to use in analytics. When it happens, I have to rearrange the data to improve its quality and ensure that all dashboards created using these data present meaningful insights. To achieve this, I first prepare the data.

## What is a data preparation process?

Data preparation is the process of cleaning and transforming raw data prior to processing and analysis. It often consists of cleansing, merging different data sources, transforming and aggregating the data.

It can be time-consuming.
However, the outcomes that you gain with this step are crucial to getting the most value later from business intelligence analytics.

### Why is data preparation important?

Raw data tends to be unstructured and messy. For your data to bring value, you need to remove errors so that your visualizations show the true insights. You can optimize your dataset by filtering and aggregating it to ensure your dashboards are more efficient.

Many things can go wrong if you don’t prepare your data before the analysis. For example, you can end up with a few names in one category that have the same meaning, e.g., **“Groceries,”** **“Grocery,”** **“Grocery.”** Another example could be different units of measure used in a column. When you sum it up, you would have the wrong values presented on your dashboards.

Cleaning up the data eliminates those kinds of risks, assuring consistency of the data.

### 5 steps of data preparation

**Identify what data you need for your visualizations.** First, you have to make sure that you know what data you need to build insightful and valuable visualizations.

**Make sure you have access to the needed data.** The next step is to make sure you have access to all the databases and files that contain the data that you identified before. Appropriate security measures have to be applied to prevent any data leakage and unauthorized access.

**Check the data quality and clean your data.** Going further, you have to identify all the issues in your data — nulls, duplicates, field errors. The next step is to fix them, which can be achieved by:

- Handling missing value;
- Filtering outliers and anomalies;
- Converting data to common formats;
- Changing fields to consistent data types;

**Transform the data.** After cleaning the data, you can transform it using operations like merge (join) and append (union). Furthermore, reshaping and data aggregation helps you to summarize the data based on the most relevant fields.

**Load the data.** Finally, you end up with the high-quality data required for building the right visualizations. It then needs to be loaded to a destination easily accessible by the selected BI tool.
