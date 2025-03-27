---
title:  "A data catalog endeavor: The Why and the How"
redirect_from:
  - /community_posts/a-data-catalog-endeavor-the-why-and-the-how
meta_description: Data Catalog. All you need to know about choosing and building one.
date:   2021-11-17 17:10:58
image: /images/community/a-data-catalog-endeavor_-the-why-and-the-how.jpg
read_time: 5 minutes
category_filters: "Strategy,Data culture"
organization: Meisterlabs
organization_url: https://www.meisterlabs.com/
author: Juan Sebastián Suarez Valencia
author_img: /images/community/juan-sebastian.jpeg
author_bio: Juan Sebastian is a data engineer at MeisterLabs, a company that creates collaboration tools for modern teams all over the world with millions of customers and billions of events created. You can reach him at [Linkedin](https://www.linkedin.com/in/juansebastianmd/){:target="_blank"}.
---

## What is a data catalog?

After I joined Meisterlabs as a data engineer I quickly realized how hard it was to onboard new members into a data team. There are so many tables, definitions, or systems that run and it’s very difficult to keep track of all of them.

Here’s where a data catalog comes to the rescue. What is it? It is an organized inventory of data assets in the company that allows you to index, understand and rely on the data assets that you manage.

![an image showing how Data Catalog structure usually looks like: directories with description](/images/community/data-catalog.png)

Having a data catalog is very important and yet many companies don’t have one.

I like to compare having a data catalog for a company as doing a workout for the human body.
A lot of people know that doing a workout is good for your health, but without an instant effect, it's hard to grasp how much effort you are willing to put in order to start doing so.
The same goes for a data catalog. If you don’t know what you are extracting from it, you won’t make an investment.

Getting started is quite difficult, and the more you wait, the more difficult it is because you have much more data to document.

Last but not least, the major problem of not disposing of certain tools is that you don’t know what you are missing out on until you have it. Imagine the time before the printing press, how would you know how other people did something that you want to learn? Furthermore, how would you share the same information with someone else?

Now that we live in an era where digital information exists, we can’t imagine our lives without it.

## What are the benefits of having a data catalog?

After discovering and implementing a data catalog, we have managed to see all the benefits this tool has to offer.

Below you can find a list of benefits a Data Catalog has provided us with:

**Discoverability:** When you hire a new member of your data team (or when another team of your organization needs some information about the data), it’s much easier to provide them with a tool like a search engine that points to the right data source.

**Data governance:** You can define which tables, views, or even specific columns in your dataset can be managed by specific persons in your organization. Be careful, the actual configuration of data access needs to be done in the data source itself.

**Reliability:** When the data is more accessible and understandable by the people in your organization it creates transparency. And transparency builds trust.

**Freshness:** Keep the stakeholders up to date and let them know if your data meets SLA.

**Relationship:** Some data catalogs allow you to create lineage views of your data. They also connect your data visualization tools with the underlying SQL requests so you can see how often your data is being joined and manipulated.

**Purpose:** By creating a “data dictionary” you allow people to quickly understand why some datasets were created in the first place and how they are used now.

**Compliance:** If you know which tables have privacy-sensitive information it’s much easier to help the stakeholders, like the product team or the legal department, to guarantee data compliance with local regulations like RGPD.

## How to choose a data catalog?

If you and your company have already reached the point when you know the benefits of a data catalog, it’s important to select the right criteria in order to choose one among the multiple options that exist out there.

Here are the criteria we use at Meister:

**Pricing:** What are you paying for? This is highly correlated with your data structure. In the case of an Open Source alternative, you need to anticipate the internal resources (engineers/time) to set up and maintain the infrastructure.

**Must have features:** In our case, the lineage or data freshness were must-have features of a data catalog.

**Return on investment:** One overlooked item is the return on investment. I would suggest that you ask yourself this question as soon as possible. This will define the amount of time and money that you are willing to put into the choice.
How much time do you spend looking for the information that the data catalog has? This is very important and yet very hard to estimate. For example, when you onboard a new data analyst, how much time does he/she spend to understand the data assets of the company? Another example is the consequences of the fact that two departments of the company don’t have the same definition of “a customer” or “monthly revenue”.

**Interoperability:** Another element is how well is the data catalog interconnected with the different tools that you use at your company. People hate to write the same information in many different systems. Your data catalog should communicate with your other tools. For example, if you use Metabase, your data catalog should be able to recover the queries and the usage of your dashboards.

**User experience:** How easy is it to manipulate the data catalog?

## What’s next?

Even after you have made your choice and started using the data catalog, you need to know that **the benefits of the tool are correlated to the time that you spend using it.** It’s important that you accept it and plan accordingly.
