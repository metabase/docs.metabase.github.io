---
title:  "Why statistics do not always summarize data well"
redirect_from:
  - /community_posts/how-underlying-data-can-distort-your-statistics-compression-values
meta_description:  Always look at underlying data or the distribution before judging whether your compression of the data actually makes sense.
date:   2022-03-14 10:10:59
image: /images/community/why-statistics-do-not-always-summarize-data-well.jpg
read_time: 3 minutes
category_filters: "Statistics"
organization: Datafold
organization_url: https://www.datafold.com/
author: Matt David
author_img: /images/community/Matt-David.png
author_bio: Matt has been working in data for the past 8 years. He is currently the Director of Growth at [Datafold](https://www.datafold.com/){:target="_blank"}, and previously worked in data-related roles at Atlassian, Chartio, and Udacity. He is focused on helping more people use data effectively. You can find Matt on [LinkedIn](https://www.linkedin.com/in/matthewcharlesdavid/){:target="_blank"}.
---

I've taught thousands of students about data and if there's one concept I hope they've retained, it's that summary statistics such as averages and medians compress information. Summary statistics take a set of numbers and try to represent them all with a single number.

The question is, as an analyst, are you comfortable with that compression? Do you feel like the statistic accurately represents the underlying data?

**Let's look at two sets of numbers, Scenario 1 and Scenario 2 showing how often users are using a feature per day:**

![a table with 2 data distribution scenarios](/images/community/matt-david-1.png)

Both scenarios have an average of 3.

So should we say that on average in both scenarios users on average are using the feature 3 times per day?

For the first scenario, 3 feels like a fair compression of the data because the data is fairly [normally distributed](https://en.wikipedia.org/wiki/Normal_distribution){:target="_blank"}. As an analyst though it’s still good to know what the maximum and minimum values are if you get asked more in-depth questions about the users’ behavior.

For the second Scenario, “3” feels completely inaccurate compression because the distribution of the data is highly skewed and you may consider 11 to be an outlier that should be excluded. If we excluded 11, 1 would be a very appropriate summary stat for scenario 2 since all underlying numbers were 1. If we don't exclude 11 we would need to provide more context whenever presenting 3 as the summary stat because we really have one user (user 5) using the feature a lot and the rest not using it regularly.

With small data sets such as this example, we can look at the data itself to judge the fairness of a summary statistic but when the amount of data you are trying to compress gets big it is best to look at distributions to determine whether a stat fairly represents the data.

Every time you report a statistic, please look at the underlying data or the distribution to judge whether your compression of the data makes sense or not.
