---
title:  "Business Intelligence vs Product Analytics"
redirect_from:
  - /community_posts/what-is-the-difference-between-product-analytics-and-business-intelligence
date:   2021-11-08 17:10:58
image: /images/community/business-intelligence-vs-product-analytics.jpg
read_time: 4 minutes
category_filters: "Metrics,Strategy"
organization: Mentat Analytics
organization_url: https://www.mentatanalytics.co/
author: Ali Baghshomali
author_img: /images/community/ali-baghshomali.png
author_bio: Ali is a founder of Mentat Analytics, an [analytics consulting agency](https://mentatanalytics.co/) and a [Metabase Expert](/partners/mentat-analytics){:target="_blank"} specializing in high-growth startups. He's also the creator of Product Analytics Academy, which offers a [product analytics course](https://productanalytics.academy/) for product managers. He previously worked at Bird and BuzzFeed.
redirect_from:
  - /community_posts/what_is_the_difference_between_product_analytics_and_business_intelligence
---


As a consultant that specializes in both business intelligence and analytics, I get this question a lot. It’s a completely valid question and the answer is nuanced, so let’s break it down.

## Business Intelligence vs Analytics: what’s the difference?

I recently worked with a client who needed help building their data stack. They told me they have no insights into their business and gave me a list of their questions. I saw that they wanted to know how many new user registrations they were getting, but they also wanted to know where users were dropping off in the signup flow. They had similar questions about specific features too: for example how many times users published an article, but also if there were any pain points within the article publication process.

### Business Intelligence vs Product Analytics example

This demonstrates the difference between product and business intelligence very well: knowing the total number of new users registered is a business health metric, but whether the registration process is broken is a product-specific insight.

The important thing to remember is that fixing the registration flow using those product-specific insights also affects the total number of newly registered users, which is a business health metric. This is always the case: your product health is generally the biggest factor influencing your business health.

Let’s break this difference down further along two different dimensions: data and tools.

### The data difference between business intelligence and product analytics

Staying with the example I gave, my client’s existing database kept track of every registered user. Otherwise, it wouldn’t be able to recognize previously registered users! But it wasn’t keeping track of users who tried to register and failed somewhere in the process. Why would it, they never became a user so the product doesn’t need to remember them. You could be losing 90% of the people who start that flow and your product database would only show you information about the 10% who made it through.

So in order to get product-specific insights, you need to go further than tracking simply the information that your product needs in order to operate. In this example, we also needed to track how often people simply arrived at the first page of the signup flow. Or tried to input their info but got an error. This is how we get tipped off to issues in the flow that we can fix.

### Tools to help you track product analytics and business intelligence

Product analytics tools like Mixpanel, Amplitude, and Heap serve two purposes: they help you capture the extra data points you need for product insights, but they also have analysis tools that are built around answering product-specific questions. For my client, I used Mixpanel to capture each data point within the signup flow, then used Mixpanel funnel analysis feature to monitor drop-offs within that flow.

### Benefits of product analytics tools

One nice thing about these tools is that you don’t need a database to store the data points. They get sent to the tool directly and are hosted in the cloud. You also don’t need SQL skills to analyze the data since everything can be done through the graphical interface.

### Cons of product analytics tools

One downside to these types of tools is that their numbers are a bit less reliable than what’s in your database. This is because software such as ad-blockers can keep the data points from being tracked. Your database is ultimately the most reliable source of your data. That’s why I also set up my client with a Redshift data warehouse and mounted Metabase on top of the warehouse. That way, I can be sure that business health metrics like their number of registered users are reported accurately. This setup can be used to report on other important metrics like revenue too, which you definitely wouldn’t want to risk under-reporting.

This gave my client the best of both worlds: fast and easy insights into the user’s entire journey throughout the product, but also reliable business health metrics that they can use to make general decisions and share company-wide.
