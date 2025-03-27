---
title:  "Using variables to reduce ad hoc analysis in Metabase"
redirect_from:
  - /community_posts/using-variables-in-metabase
meta_description: A practical guide on how to use variables in Metabase to reduce ad-hoc queries and empower the team to question data.
date:   2021-11-07 16:10:58
image: /images/community/using-variables-to-reduce-ad-hoc-analysis-in-metabase.jpg
read_time: 3 minutes
category_filters: "Working with Metabase"
organization: "Chris's Medium"
organization_url: https://chris-so.medium.com/
author: Chris So
author_img: /images/community/chris-so.jpeg
author_bio: "Chris is a Data Analyst who loves to explore the possibilities of Databases and SQL. His credo: Never stop learning."
redirect_from:
  - /community_posts/using_variables_in_metabase
---

## Minimizing ad hoc analysis

In our company, we go by the Data Democracy strategy.
This means we actively avoid data silos and share knowledge about our data company-wide. It is fully transparent for everyone.
With Metabase as our BI tool, this becomes really easy and I help people to get on speed with it.
But sometimes there are questions that need a completely new table model in the reporting area of our Data Warehouse.
In most cases, building a new model will be too much effort so I write an ad hoc query in Metabase’s SQL editor.

This can cause lots of tweaking since people are interested in more than one detail.
But most questions arise just after I complete the last query, which consumes lots of resources and my colleagues need to wait until I’m done changing the expression in the WHERE-clause every time.

Those recurring questions have their place and show that people are actually interested in that data. So what if I could enable my colleagues to change the filters themselves, making the overall process more lean, customizable, and user-friendly?

**Well, that’s what I did with variables.**

### Starting with variables in Metabase

Variables in Metabase are a great way to insert user input into existing SQL code. They are initiated with **&#123;&#123;&#125;&#125;** and create a filter widget.
This widget accepts user input and directly places it at the variable’s position. Here’s a simple example:

![SQL query](/images/community/metabase-variables-1.png)

With **[[]]** you make the expression optional.
It’s invisible to the source code as long as nothing is entered into the corresponding filter widget.
It works best when using more than one filter.

![SQL query](/images/community/metabase-variables-2.png)

As you can see, you’re not limited to the number of filter widgets.
If you have a larger query with lots of filtering options, just chain optional clauses together.
If you do so, the best practice is to start your WHERE-block with 1 = 1, since it’s a filter-clause that’s valid and stands on its own.
Hence, if no input to any widget is given, your code will still work.

![SQL query](/images/community/metabase-variables-3.png)

A short side-note: the widget for the dates looks a bit different.
That’s due to the data types.
You can choose between 3 data types that Metabase is natively able to interpret.
For those two widgets I chose “Date”, which creates a clickable date-picker-widget:

![a screenshot with a Metabase date picker](/images/community/chris-so-1.png)

Those are the basics I had to learn and I hope I got you a good and quick overview of those.

And at some point I was like “Hey, this is just text. Like an f-string in Python.”
And so I started experimenting with some SQL functions to manipulate this input.
It turned out that anything goes and so I decided to build some cool stuff like a filter that accepts multiple keywords as input.
If you’re interested in how that works, check out [my detailed post regarding variables on Medium](https://chris-so.medium.com/using-variables-in-metabase-9abb0ce42c4e){:target="_blank"}.
