---
title:  "How I used Metabase with MongoDB to track the performance of my Slack app"
redirect_from:
  - /community_posts/how-i-used-metabase-with-mongodb-to-track-the-performance-of-my-slack-app
meta_description:  Using MongoDB and Metabase to track active users and installations for your Slack app.
date:   2022-04-11 10:10:59
image: /images/community/how-i-used-metabase-with-mongo-db-to-track-the-performance-of-my-slack-app.jpg
read_time: 3 minutes
category_filters: "Working with Metabase"
organization: MeetSlack
organization_url: https://meetslack.com/
author: Adam Charvat
author_img: /images/community/adam-charvat.png
author_bio: Adam is an indie hacker building apps for Slack and Shopify users. He likes rock climbing, snowboarding and helping others reach their full potential. You can find Adam on [LinkedIn](https://www.linkedin.com/in/adamcharvat/){:target="_blank"} and [Twitter](https://twitter.com/adamcharvat){:target="_blank"}.
---

*“Your Slack application was approved and is now live in the App directory.”*

When I received an email saying the above about my first Slack side project, my indie hacker journey kick-started. Indie hackers are usually independent entrepreneurs and developers who work on various side projects with the hope of building profitable businesses.

When developing applications for Slack, you are given the freedom to choose your framework and data store. My application is a standalone Node.js server that stores the necessary user, team and analytics information in MongoDB.

In this post, I’m going to cover how you can use Metabase to understand the metrics and usage of your Slack application.

## Why native Slack metrics are not enough to track your app's performance

Unfortunately, Slack doesn’t give out much information about how your app is used, apart from one sentence at the bottom of your admin panel. The sentence may look like this and is only updated every 24 hours:

*"This app has been installed on 3,756 active workspaces, and used by 19,902 users active within the past 28 days."*

It is clear that this is not enough data to understand the app’s usage, so I looked at ways to build my own data analytics.

## How I used MongoDB and Metabase to get better insights

As mentioned, I’m using a MongoDB to store the user and team data.
How you implement Mongo will depend on the web framework of your choice, but Slack has decent documentation explaining what data is available to you and how you can ask for it programmatically. Similarly, you will need to pick the metrics to save in your database (for example, I track the total number of times a user started a new Google Meet from Slack, and periodically check if the app is still installed in the team workspace).

With the necessary data in place, you can connect Metabase to your database and start building internal dashboards to analyze the app usage.

I like to understand peak times (such as what day of the week brings the most installations), the total number of users, teams and meetings, and I also like to look at the companies that are actively using my application.

Within minutes I was able to set up the right questions in Metabase to group the total installation count by day, week, or month.

This saves indie hackers like me many hours that would need to be spent writing Mongo queries and presenting the data in a nice and understandable format.

![a screenshot with a query on the rows with differences table](/images/community/metabase-for-slack-tracking.png)
