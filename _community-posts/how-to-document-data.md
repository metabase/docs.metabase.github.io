---
title:  "How to document data"
redirect_from:
  - /community_posts/how-to-document-data
meta_description: 5-step framework for easy and effective data documentation.
date:   2022-04-12 10:10:58
image: /images/community/how-to-document-data.jpg
read_time: 3 minutes
category_filters: "Data culture"
organization: Snowboard Software
organization_url: https://www.snowboard.software/
author: Rick Radewagen
author_img: /images/community/rick-radewagen.jpeg
author_bio: Rick Radewagen is a co-founder of Snowboard, a company that helps teams to find, understand and trust their data. Before that he spent many years pumping and crunching data in various organizations. You can find Rick on [LinkedIn](https://www.linkedin.com/in/radewagen/){:target="_blank"}.

---
The goal of documenting data is to help users to find it, understand it, and be confident to use it.

But you don’t need to document everything. Well-modeled data is often self-explanatory.

**“Good code documents itself”** contains a good amount of truth. You should aim to have expressive and consistent names that are self-descriptive. A database called ‘**dbo**’ is not helpful, ‘**sales_prod**’ is better, especially if there is also a ‘**sales_dev**’ and a ‘**finance_prod**’ database.

So documenting starts with naming things, but it does not stop there.

## Use the explicit hierarchy of the database system to build top-down documentation

![a table with 5 steps to follow to document data correclty](/images/community/how-to-document-data.png)

With that users will start to understand the big picture and will be able to navigate your data landscape themselves.

## What to focus on when documenting your data

Document the top 3 levels (system, database, schema) completely. Focus on documenting the top 10% of the most used tables. Establish a process that all new tables/views/models should be created with at least minimal documentation (during the creation, it is the easiest to document).

Documenting all columns is usually only worth it for data products or widely used reporting tables. But for these, you should be rigorous. If a column is not worth documenting, it should not be part of the table.

In practice, it can be hard to choose the right words. Should I refer to **customer** or **account** or **company** or **user** or **site?** Does everybody understand the acronyms we use in our team?

To tackle challenges like these your documentation system ideally supports you with a glossary, where you can define important terms once and reference them in the documentation.

### Tips

- Use expressive and consistent names;
- Document top-down and most used;
- One sentence is usually enough;
- Make documentation part of the development process;
- Use #definitions in a business glossary;
