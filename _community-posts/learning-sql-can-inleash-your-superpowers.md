---
title:  "Learning SQL can unleash your superpowers"
redirect_from:
  - /community_posts/learning-sql-can-inleash-your-superpowers
meta_description: Read why SQL can be importnant skill for your career and how to start learning it.
date:   2022-05-4 10:10:58
image: /images/community/learning-sql-can-unleash-your-superpowers.jpg
read_time: 3 minutes
category_filters: "Careers"
organization: Sana Benefits
organization_url: https://sanabenefits.com/
author: Alex Dou
author_img: /images/community/alex-dou.png
author_bio: Alex is a Product Manager at Sana Benefits, a health insurance company operating in Texas. You can find Alex on [LinkedIn](https://www.linkedin.com/in/alexdou/){:target="_blank"}.

---

I think that learning [SQL](/glossary/sql){:target="_blank"} is an important skill for most desk workers. Regardless of where you are in your career, knowing SQL can be an immense help.

Furthermore, I believe it’s important for companies to have employees who can write SQL, as this enables employees to make better decisions faster. This also requires that companies set up an environment for safe SQL querying.

## How knowing SQL helped me

My first job was functionally a Support role. However, I was lucky enough to have the ability to write SQL against an effectively live database, grab data, make decisions, and increase our leverage. Using that SQL skill, I jumped over into an Analyst role, which then got me into my current role in Product Management.

## Benefits of learning SQL

- You don’t have to wait for Data Analysts for a straight-forward query, they may never get to it, because higher-priority asks keep supplanting yours.
- Your working relationship with Engineers will improve if you put effort into understanding the shape of the data (e.g. detailed asks for event tracking instead of “analytics pls”).
- Having SQL on your resume can help you snag a promotion or your next job.

## Here are a few use cases to show how SQL can help with the common tasks

- **Customer Support** - A customer reports a bug, and you want to see who else is affected so Product can prioritize the bug. Normally this would go to an analyst or engineer, but in a lot of cases can be achieved with a `SELECT`, `JOIN`, and a few `WHERE` clauses.

- **Marketing** - An email mistakenly gets sent out and you need to figure out which companies were affected to let the Account Managers know. This can also be determined with a `SELECT`, `JOIN`, and a few `WHERE` clauses.

## Ways writing SQL can go wrong

1) You WILL need to first check that your company/local environment is set up for you to write SQL easily, iteratively, and safely. If the only way available to you is to query against the product database, I would recommend talking to the analytics people first.
The reason for this is that you’re going to write some bad queries (I do it all the time), and what you DON’T want is for a bad query to take down production.

2) You should also watch out for incorrect interpretations of the data. It’s tempting and dangerously easy to get a number and say “that’s it, I’ve found The Answer.”
Data Analysis is 20% querying the data; 80% cleaning, validating, presenting, getting asked “have you considered X”, realizing “oh s—, I didn’t”, and going back and re-analyzing.
When you’re first starting out, you should work in close concert with someone on your team who is literate in analysis. Having an extra pair of eyes on your queries can be a huge help  as you build your analysis muscles.

## How to get started

I recommend starting with free online SQL courses. From my experience, it’s the fastest way to actually start running live queries against real, business-like data.

Once you get the hang of things, start querying your own company data.

**Here’s a possible pathway:**

1) Start by `SELECT`-ing * from a table that you know well. If you’re in Sales, dig into a table in the Salesforce database. If you’re in Support, query from the Customers or Users table.

2) Include  `WHERE` clauses to filter your data. If you’re in Sales, use WHERE to target prospects in your region. For Support, use `WHERE` to find a list of Customers who have started in the last year.

Throughout this process, check-in with a Data Analyst at your company. It may feel like you’re wasting their time, but in my experience, most Data Analysts will relish the opportunity to coach other folks on how to query the data themselves.

As you work through this, you can also check [Metabase Learn about SQL Best Practices](/learn/grow-your-data-skills/learn-sql/working-with-sql/sql-best-practices){:target="_blank"}.
z
