---
title:  "Three methods for solving the dirty data dilemma"
redirect_from:
  - /community_posts/3-methods-for-solving-the-dirty-data-dilemma
meta_description:
date:   2023-06-05 16:10:58
image: /images/community/3-methods-of-solving-the-dirty-data-problem.jpg
read_time: 3 minutes
category_filters: "Working with Metabase,Cleaning"
organization: Kaleidoscope Data
organization_url: https://www.kaleidoscopedata.com/metabase-expert-certified-partner
author: Kyle Napierkowski
author_img: /images/community/kyle-kaleidoscope-data.jpeg
author_bio: Kyle is a Managing Partner at Kaleidoscope Data, a data consultancy and a [Metabase Expert](https://www.metabase.com/partners/kaleidoscope-data){:target="_blank"} that helps startups & SMBs of 50-150 employees take their business to the next level of scale. [Learn more](https://www.kaleidoscopedata.com/datacleaning){:target="_blank"} about how their AI product normalization tools can help improve your data quality.
---

In a data-driven world, businesses need accurate and clean data to make informed decisions. Clean data is essential for reliable insight, efficient operations, and ultimately, success.

Dirty data remains a significant challenge for many as it can lead to inaccurate analyses and misguided decision-making. In this article, we’ll explore three approaches to cleaning so you can make the most of your data.

## Use models in Metabase

One of the best ways to implement data cleaning procedures in Metabase is to develop a model that represents the data based on particular criteria. [Models](/learn/metabase-basics/getting-started/models){:target="_blank"} are a fundamental building block in Metabase. They can be compared to derived tables or specialized saved questions, serving as the starting point for new analysis. Models can be built on SQL or query builder questions, allowing for the inclusion of customized and computed columns.

### Advantages of models in Metabase

- **User Friendly:** Requires minimal technical expertise. Quickly and easily clean data directly within the analytics platform.
- **Empower Your Experts:** Models give domain experts control over defining and refining business problems, allowing them to make changes without going through the data team. This flexibility ensures that different teams can have their own models.

### Disadvantages of models in Metabase

- **Limited Scale/Complexity:** May not be suitable for complex data cleaning scenarios or large-scale data processing.

### Example

Let's consider a sample dataset of sales transactions for an online store. The raw data might look like this:

![A sample of uncleaned dataset](/images/community/dirty-data-dilemma-1.png)

In this dataset, there are several issues that need to be addressed. To address them, you can implement  patterns or functions in Metabase:

1. **Inconsistent product names:** Use [regexextract](/docs/latest/questions/query-builder/expressions/regexextract){:target="_blank"} to standardize  product names by removing brand names and keeping only the product model.
Example pattern: `REGEXEXTRACT([Product], '^(?:Apple|Nike|Dell|Adidas) (.*)$')`

2. **Missing payment method information:** Implement a function that checks for missing payment method values and replaces them with a default value or a placeholder.
Example [function](/docs/latest/questions/query-builder/expressions/coalesce){:target="_blank"}: `COALESCE([PaymentMethod], 'Not Provided')`

The cleaned dataset should look like this:

![The cleaned dataset](/images/community/dirty-data-dilemma-2.png)

## Clean data in your transformation pipeline

You can ensure that cleaned data is stored and readily available for analysis by creating a SQL query for your data transformation pipeline. This can help reduce the need for additional data manipulation late down the line.

Data transformation pipelines offer a robust and scalable solution for data cleaning, particularly when dealing with large, complex data sets or multiple sources. However, you must consider the technical expertise required to implement and maintain this method effectively.

Implementing data cleaning within a data transformation pipeline typically requires collaboration between data engineers and analysts. Analysts may work with business stakeholders to collect requirements and define rules. Data engineers may design and set up the pipeline, and write the transformations needed to clean and structure the data. These rules can include filtering out irrelevant data, standardizing formats, handling missing values, and merging data from multiple sources.

### Advantages of a transformation pipeline

- **Smarter:** Can handle complex data cleaning scenarios and scale effectively as your data grows.
- **Saves Time:** By automating the data cleaning process, you can reduce errors and save time that would have been spent on manual data cleaning.
- **Addresses Root Cause:** Actually fixes the underlying issues with the source data instead of applying bandages.

### Disadvantages of a transformation pipeline

- **Increased Cost + Complexity:** Requires technical expertise and can be more resource-intensive than using patterns or functions. May result in increased costs and complexity, especially at smaller organizations with limited resources.
- **More Overhead:** Can be time-consuming and may require ongoing maintenance as business requirements change.

### Example of a transformation pipeline

Here is a sample dataset of customer orders.

![A sample of uncleaned dataset](/images/community/dirty-data-dilemma-3.png)

In this example, there are several issues that need to be cleaned up:

1. Inconsistent formatting in the `CustomerName` field (e.g., underscores instead of spaces)

2. Missing data in the `CustomerName` field (NULL value)

3. Incorrect delimiter in the `Email` field for row 5 (comma instead of period)

4. Inconsistent date format in the `PurchaseDate` field for row 5

You can use SQL to clean the data. Here's an example of how to do this:

```sql
-- Create a temporary table with cleaned data
CREATE TEMPORARY TABLE cleaned_orders AS
SELECT
  OrderID,
  -- Replace underscores with spaces and handle NULL values in the CustomerName field
  COALESCE(NULLIF(REPLACE(CustomerName, '_', ' '), ''), 'Unknown') AS CleanedCustomerName,
  -- Replace comma with period in the Email field
  REPLACE(Email, ',', '.') AS CleanedEmail,
  ProductID,
  -- Standardize the date format in the PurchaseDate field
  STR_TO_DATE(PurchaseDate, '%Y-%m-%d') AS CleanedPurchaseDate
FROM
  raw_orders;
```

The cleaned dataset would look like this:

![The cleaned dataset](/images/community/dirty-data-dilemma-4.png)

## Use AI to clean data

AI is transforming the way we approach data cleaning. Advanced algorithms and machine learning techniques, in particular Large Language Models such as OpenAI’s ChatGPT models, can automate the data cleaning processes.

### Advantages of using AI

- **Automation:** AI services can automatically identify and correct errors, inconsistencies, and anomalies in your data. This automation not only saves time but also reduces the risk of human error during the data cleaning process.

- **Scale:** AI services are designed to handle large datasets quickly and efficiently. This means that even as your business grows and generates more data, AI-powered data cleaning solutions can scale to meet your needs without compromising on accuracy or speed.

- **Improves Over Time:** One of the most impressive aspects of AI services is their ability to learn and improve over time. As the AI system processes more data, it becomes better at identifying patterns and making intelligent decisions, ultimately leading to more accurate and efficient data cleaning.

- **Domain expertise:** If your organization has access to domain experts, their insights can be invaluable in creating tailored data cleaning rules or guiding the implementation of AI-driven solutions.

### Disadvantages of using AI

- **Initial Investment:** Implementing AI services for data cleaning may require an initial investment in technology and resources. However, the long-term benefits of improved data quality and reduced manual labor can outweigh these costs.

- **Human Oversight/Validation:** While AI services can automate much of the data cleaning process, some level of human oversight and validation is still necessary. It's essential to have a team that understands the nuances of your data and can make informed decisions when required.

### Example of using AI

A more complex example of data cleaning that AI can perform is identifying and resolving inconsistencies in clothing product attributes across multiple data sources. This often involves understanding the context, semantics, and relationships between different attributes such as color, size, and style.

Sample dataset:

![A sample of uncleaned dataset](/images/community/dirty-data-dilemma-5.png)

In this sample dataset, the product attributes from three different data sources are inconsistent and need to be standardized for an online clothing store. Traditional cleaning may struggle to identify and resolve these inconsistencies effectively due to varying terminology, order, and structure of the attributes.

However, an AI-powered solution can analyze the context, semantics, and relationships between the different attributes and map them to a standardized set of attributes. For example, AI could recognize that "Women's Dress, Blue, Size M", "Female, Dress, M, Blu", and "Dress, Medium, Woman, Color: Blue" all refer to the same product attributes and map them to a single, standardized format such as "Gender: Female, Category: Dress, Color: Blue, Size: Medium".

The cleaned dataset would look like this:

![The cleaned dataset](/images/community/dirty-data-dilemma-6.png)

Now we can split out the product attributes into separate columns for even easier analysis.

![The cleaned dataset](/images/community/dirty-data-dilemma-7.png)

### Which approach should you take?

The best data cleaning method for your business depends on various factors such as the type and quality of data, dataset size and complexity, available resources, and specific business goals. It is crucial to test and assess different cleaning methods before selecting one to integrate into your tech stack. Often, companies utilize a mix of the methods mentioned above. Check if the data sources are compatible with your preferred method and ensure that you have the necessary resources to execute the chosen solution effectively.
