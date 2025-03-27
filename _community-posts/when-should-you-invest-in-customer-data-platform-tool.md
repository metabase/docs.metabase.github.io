---
title:  "When should you invest in Customer Data Platform (CDP) tool?"
redirect_from:
  - /community_posts/when-should-you-invest-in-customer-data-platform-tool
meta_description: Learn what is Customer Data Platform tool and when it is needed.
date:   2022-06-29 10:10:58
image: /images/community/when-should-you-invest-in-cdp-tool.jpg
read_time: 3 minutes
category_filters: "Strategy,Data culture"
organization: Mentat Analytics
organization_url: https://www.mentatanalytics.co/
author: Ali Baghshomali
author_img: /images/community/ali-baghshomali.png
author_bio: Ali is the creator of [Product Analytics Academy](https://www.mentatanalytics.co/academy){:target="_blank"}, an online school that provides data courses for product managers. He previously worked on the data teams at Bird and Buzzfeed.
---

A lot of people ask me: **“Should I spend the money to get Segment or am I fine without it?”** It’s a valid question, and the answer can differ case by case, but first let’s recap what these tools do.

## Why use a Customer Data Platform tool?

If you want robust product analytics, you’re likely going to use a product intelligence platform like Mixpanel, Amplitude, or Heap. These types of tools rely on data captured in your product in the form of “events” and “properties”, each of which represent an action by your users. This raw event data can then be turned into charts and insights using the UI of the tool.

To capture these events and properties, your developers need to insert custom snippets of code throughout your product. What those snippets contain, and where the developers should place them, differs depending on your product and how people interact with it. There are other tool categories that use the event data in this format, such as Braze, a customer engagement tool. These tools want to know when users took specific actions so they can send an email or push notification to that user. Or you might want to send the same data to a data warehouse like Redshift or BigQuery so you can use Metabase to dig into the details and have your product dashboards side-by-side with your business dashboards. At this point your product can become bulky, with tons of code snippets for data capture and the different libraries used for each. This is where Customer Data Platform tools like Segment or Rudderstack comes in.

## What is Customer Data Platform tool?

The official name for tools like Segment and Rudderstack is “Customer Data Platform”, but an easier-to-understand name would be “Event Router”. Their value is simple and clear: instead of doing the work to send events and properties to each tool separately and cluttering up your code in the process, send it to the event router once and the data platform will reroute the data to whatever tools you want, no new code required. That means less time spent adding new tools, less chance of making errors, and a bunch of useful features that let you QA the data, aggregate it in more interesting ways, etc.

## When to implement Customer Data Platform tool?

These tools clearly provide value, so my general answer to the question that started this post is “yes”. The real question, then, is “_when_ should you start using customer data platform?” The rule of thumb I tell my clients is this: as soon as you find yourself with three or more destinations for event data in your roadmap, you should invest in setting up a customer data platform.

Example: if you have a mobile attribution tool like Adjust, a product analytics tool like Mixpanel, and now you’re planning a data warehouse like Bigquery, then that’s a good time to add a customer data platform like Segment. Obviously, the "right" answer differs case by case. If money isn’t a concern, then you should consider setting up an event router alongside your first destination. Otherwise, wait until you are juggling three destinations for your event data before investing in a customer data platform.
