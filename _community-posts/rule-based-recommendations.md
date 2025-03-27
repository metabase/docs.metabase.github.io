---
title:  "Rule-based recommendations"
redirect_from:
  - /community_posts/rule-based-recommendations
meta_description: Rule-based recommendations with no machine learning. Learn how to set up rule-based recommendations using just SQL.
date:   2021-09-26 16:10:58
image: /images/community/rule-based-recommendations.jpg
read_time: 2 minutes
category_filters: "Strategy"
organization: Metabase
organization_url: https://www.metabase.com/
author: Conor Dewey
author_img: /images/community/Conor-Dewey.jpeg
author_bio: Conor is a product manager at Metabase, a startup dedicated to making learning from data easy for everyone. You can read more from Conor at his website at [www.conordewey.com](https://www.conordewey.com){:target="_blank"}.
---

My previous team was building out a new onboarding flow and hit a point where we wanted to do cool things around personalization and recommendations. If you look around, machine learning is seemingly baked into every established product these days. It's really tempting to say "We need machine learning too if we're going to be as successful as the other guys."

But we were a small team and iterating at a rapid pace. We didn't have the time, resources, or need for a top-notch recommendation system. We went a different route, and in our case, I think we got 80-90% of the way there with a simplified approach: Rule-based recommendations with just SQL.

### Best Practices

* Validate the problem: Is this problem worth solving? Make sure there is a significant benefit to offering recommendations or personalization.
* Validate the data: Do certain segments of users behave meaningfully differently from others? If not then you won't be able to make helpful recommendations.
* Decide on a "one-by-one" or "final decision" approach: Apply rules one-by-one in order and stop when one matches or apply all the rules and then make a final decision. In the "one-by-one" scenario, rules are generally expressed as a family of case statements and tend to do really well in deterministic scenarios. In the "final decision" scenario, you are typically considering a number of factors and then returning the best option.
* Create informed rules: Use data analysis and intuition to build out your decision tree or scoring system.
* Write a v1 and iterate on the results: My default tool here is SQL, as it's quick and powerful enough to get the job done. Write up a query that pulls in the data that the product will have at that point, and then applies a series of case statements, either one by one or summing each together, that outputs one or more results.
