---
title: "We put questions inside your questions"
date: 2017-07-27 00:10:58
last_updated_at: 2017-07-27 00:10:58
categories: "Using Metabase"
author: Sameer Al-Sakran
image: /images/posts/we-put-questions-inside-your-questions.jpg
layout: post
---

![Yo Dawg! We heard you like questions do we put questions inside your questions](/images/nested_dolls.JPG)

The Metabase query builder lets you run simple queries on a single table in your database. Within this fundamental idiom, we've added the ability to pull in information from tables linked by Foreign Keys, modify the columns, and create new columns based on mathematical expressions. However, this has been the core pattern we've held to, and it has had some payoffs in terms of usability.

We’ve found that while it doesn’t provide as much power as some other tools, it does let 80% of non-technical users ask 20% of their questions while everything else out there is focused on letting an elite 5% of the company ask 80% of their questions.

Building on this, with our new release, you can now use a saved question as a “table” in our query builder.

## Why’s this useful?

The obvious use case is to aggregate or slice and dice the results of another question, e.g. “the average of daily revenue." More interestingly, you can use saved questions — either GUI or SQL ones — as a starting point for a new question.

This lets you use SQL to generate a complicated intermediate result (a.k.a. a subquery) and then use it in the query builder.

Other tools force you to either make really monstrous SQL templates, or use a weird YAML proprietary language to generate “heavy” artifacts that your non-technical users can use. But with nested questions, you can use standard SQL to create these subqueries and then use the query builder. If done with some foresight, this means you can use lightweight, vanilla SQL and the query builder to expose interfaces that would have otherwise required lots of weird SQL or YAML.

## What about joins?

Now, if you want to ask a question that involves two or more tables, use a join in the nested sub-question. Rather than creating a complex interface to facilitate joins, you can just use standard SQL. While the intricacies of inner, outer, left, right, up, down and all around joins are indeed subtle and can be complicated, the actual SQL syntax is fairly simple. Rather than reinvent a graphical wheel, we figure anyone who knows the difference between a left inner and right outer join also knows some SQL.

## Does this mean you won’t be adding more powerful features to the query builder?

Not at all. We have a lot in store for the query builder! We’ll be pushing pretty hard on exposing more functionality for both non-technical users and technical users in the coming releases. They’ll focus on the things that SQL isn’t so hot at rather than the things SQL does really well. We’ll also be redesigning the interface to make it even more accessible to non-technical users, making it easier for them to find common starting points for their questions.

## Won’t this be slow?

That depends. It’s possible for you to generate a slow query, but it would have been slow if you had used an explicit subquery as well, and we’ve found that our users tend to use those fairly often.

## What if my users run too many compound queries and slow things down?

This means your users are finding value in running those queries, and you should optimize them. The path to optimization is turning the subquery into a materialized view, and if that is slow (e.g., on inserts), split that off into a batch or streaming transformation process that produces a similar table. We suggest keeping the same table name, as that would let you potentially replace the queries in place.

## What’s next?

We suggest you give nested queries a spin and give us some feedback. We have a number of open issues where we are discussing next steps and improvements:

- [The ability to use nested queries in SQL?](https://github.com/metabase/metabase/issues/5579)
- [The ability to manually specify the metadata for nested queries?](https://github.com/metabase/metabase/issues/5593)
- [Carry through foreign keys in nested SQL queries.](https://github.com/metabase/metabase/issues/5595)
- [Improved automatic scanning of query results to populate our metadata.](https://github.com/metabase/metabase/issues/5594)
- [Ability to create a materialized view of a question.](https://github.com/metabase/metabase/issues/5596)

If one or more of these would significantly simplify your life, please chime in on the issues. We prioritize feature enhancements based on how many of our users also think they’re good ideas.
