---
title: "Metabase at Stoodi"
summary: A look into how Stoodi, a Brazilian online education platform, uses Metabase.
company_name: Stoodi
industry:
employees:
headquarters:
logo_image: /images/case-studies/retargetly-logo.png
image: /images/twitter/stoodi.png
permalink: /case-studies/stoodi
---

- At [Stoodi](https://www.stoodi.com.br/), Metabase took off when people outside of the Data Science team found out how powerful it was to have access to the company's data.
- They have a few different data sources connected, from a data lake running Presto, to a Redshift data warehouse, to a relational Postgres DB.
- People at Stoodi use Metabase to track conversion rates, metrics like MAU, WAU, and DAU, and even to evaluate sales and double check transactions.

#### About Stoodi

Based in São Paulo, Brazil, [Stoodi](https://www.stoodi.com.br/) is an educational online platform which helps high school students get in to their dream college. The 80-person company is growing fast, and is part of Kroton, the largest private educational company in the world.

#### Why Metabase?

Jones Madruga leads the Data Science team at Stoodi. Before he and his team started using Metabase, Jones says they were "basically running queries in our relational database, exporting to Excel and building static reports." But they were looking to empower users to create their own queries, reports, and dashboards, and to make the company's most important numbers available to every employee. After evaluating several other business intelligence products, they chose Metabase.

#### About their data

Stoodi uses Metabase to query three different data sources: their data lake through an EMR cluster running Presto, and accessing their data in S3 buckets; their data warehouse on Redshift; and a relational database on Postgres. They've also spun up another instance of Metabase to analyze the application database of their main Metabase instance to better understand how their teammates are using it.

#### Rolling Metabase out

Connecting your data to a BI product like Metabase for the first time can be eye opening. In Jones' case, he says his team realized quite quickly that they had a lot of meaningful data that they weren't using. "A lot of insights and information that could help product development or marketing campaigns were already there, but weren't being used because it was difficult to access them."

So Jones and his team set out to give everyone at Stoodi access to these insights and data, and they quickly discovered that most of their colleagues at Stoodi were more than willing to learn how to use Metabase. "Having access to data was making their work better, so they really engaged in our efforts to spread Metabase," says Jones. "I didn't expect them to be so eager to have access to data. They weren't afraid of trying things out and making mistakes. At first, most of the time they didn't save their questions because they knew they would be visible to everyone. But now with [Personal Collections](/blog/0.30), I expect they will be creating more questions."

Interestingly, Jones says they also learned that the biggest challenge in democratizing access to data didn't really have to do with technology or BI tools at all, but with making the concepts understandable to everyone, so that when they refer to "subscribers" or "active users" everybody's understanding is the same. To help with this problem, Metabase allows you to annotate and describe all of your tables, fields, and dashboards, and gives you the ability to create canonical definitions of your key metrics and segments to make sure everyone is referring to the same thing.

#### How they're using Metabase now

Besides the Data Science team, the Marketing, Product, and Sales teams are currently the heaviest Metabase users at Stoodi. They use Metabase daily to create their own questions and to track conversion rates, sales numbers, and metrics like MAU, WAU, and DAU. Their Finance team (with some help from the Data Science team) even built out a financial model in Metabase that they use to double check transactions and evaluate sales.

These teams primarily use Metabase's graphical query builder, or request help from the Data Science team when trying to answer more complex questions. As a rule of thumb, official questions and complex ones are the responsibility of the Data Science team. For everything else, Jones says that "users have the power and the ability to create, test, delete, and validate their own questions." After six months of using Metabase, Stoodi now has more than 700 saved questions and roughly 40 dashboards, about a quarter of which were created and are maintained by the Data Science team.

Stoodi's Metabase users aren't expected to know SQL. Instead, the Data Science team prefers to set up ETL jobs to create more intuitive tables, and then make those available in the data warehouse. From there, it's easy to ask questions just using the graphical query builder. But Stoodi also decided to start an internal Data Science Ambassadors program, where employees can volunteer to receive more advanced training in Metabase and basic SQL so they can help their teams to validate questions they create. On top of that, using the Metabase application database, Jones and his team created a ranking based on the number of questions created by each user. According to Jones, "It was a nice way to prompt them to try making their own questions. Kind of like a 'Metabase user of the month.'"

As far as dashboards go, Stoodi has two main types. Their official ones, created by the Data Science team, have their canonical numbers and metrics, and are available to everyone in the company. Other unofficial dashboards are created by their users and are typically used to track things like quarterly goals. Around the office, they also have three screens running their "TV Dashboard" which has some real-time numbers about sales and company goals.

#### Jones' advice for others

To get a feel for Metabase and for your data, it makes sense to connect Metabase to whatever data you have, whatever shape it's in. But Jones advises you to wait on moving forward with a larger rollout until you have a more denormalized data warehouse connected to Metabase. If you instead expose your less technical users to a highly normalized database, Jones believes you might give them a mistaken impression of how easy (or not) it is to explore data in Metabase.
