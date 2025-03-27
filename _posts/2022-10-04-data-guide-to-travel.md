---
title: "The data guide to travel"
summary: "We scraped some data from Google Maps to find out what the top attractions are in the world’s most visited destinations."
date: 2022-10-04 00:10:18
last_updated_at: 2022-10-04 00:10:18
categories: "Data explorations"
featured_image: /images/posts/data-guide-to-travel/globe.jpg
image: /images/posts/data-guide-to-travel/globe.jpg
author: The Metabase Team
layout: post
---

We've been dreaming of one last trip before the end of 2022. There's a million places to explore, each with their own set of must-see attractions. So we decided to dive into the data to see if we could find the perfect itinerary.

## Observations

Check out our [data guide to travel dashboard](https://metabase-public.metabaseapp.com/public/dashboard/bc2e023d-06b7-4a16-98b7-e1bd71b13623){:target="\_blank"}, or read on to learn what we've found.

## The Data

For this exploration, we worked with data scraped from Google Maps to find the top-rated attractions in the world's most visited destinations.

### Top 100 City Destinations in 2019

We took the **Top 100 City Destinations in 2019** from [Euromonitor International’s city arrivals research](https://go.euromonitor.com/white-paper-travel-2019-100-cities.html){:target="\_blank"}. To account for the pandemic completely skewing travel data, we opted to analyze travel stats for 2019.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/e610d0f6-2329-4dce-bea5-0d45c7f504ba"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

### Attractions

We then took the top ten destinations and used [phantombuster](https://phantombuster.com/){:target="\_blank"} to scrape attractions data from Google Maps for those destinations.

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/3d0546a8-7ebd-4e56-85fe-3485a7879ccb"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

As usual, the raw data needed some cleaning before we could analyze it. We had to transform the data and convert it into [models in Metabase](/learn/data-modeling/models). And of course this travel data is affected by where people are traveling _from_: the global distribution of people, as well as economic factors - not everyone has the means to travel - will affect where people travel _to_. For example, given that about 40% of us live in Asia, we'd expect to find travel destinations in Asia seeing a lot of traffic.

### Top city destinations - 2019

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/719a7354-0f36-481b-8950-2daf605033bb"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

The most visited destinations in 2019 were:

- Hong Kong
- Bangkok
- Macau
- Singapore
- London

Bangkok, Macau, and Singapore were each seeing over 5% year-over-year growth in number of visitors. Hong Kong saw the largest drop in visitors in 2019 at -8.7%. Visitors to London remained pretty stable (cheers).

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/897e90f7-d749-4da6-8558-a76fa579dc40"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/88fd6a2d-6e84-491d-8943-f22783bb2fcd"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

We then grouped the top 100 destinations into regions:

- **Asia** took the biggest share in the top 100 destinations accounting for 51% of the cities. Furthermore, a whopping 420M visitors or 60% of all visits were to Asia. No surprise here, as Asia has by far the largest population.
- **Europe** represented the second largest region for travelers, with the 29% of European cities in the list attracting 172M visitors - that's one out of four travelers.
- 19% of cities were located in **Americas, Africa, and Oceania** regions. These destinations only accounted for 15% of total visitors.
- **Africa** saw the highest growth among all regions. Despite only 4 cities making the top 100 destinations, these destinations saw 17% growth from 2018 to 2019!

### 📍 **Scraping Google Maps for cool places**

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/5f35d038-54ff-43ba-bc70-d8dc278d4f38"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

Based on the top ten destinations, we went on to scrape attractions data from Google Maps to find interesting places we could visit. We wanted to see if there were any significant differences in the number of contributors and ratings in these destinations.

- We found that cities in **Europe** and **America** tend to have a higher number of contributors, and hence more reviews available for different attractions.
- There wasn't as much of a clear spread in the ratings for different regions, like the spread we saw in the number of reviews. Among the top ten destinations, attractions in **London** received the highest average rating at 4.56 and **Macau** received the lowest rating at 4.16.

### Types of attractions

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/d2466ac9-357a-43a3-b248-2ba312399fd6"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

Then we wanted to see **which types of attractions** we can visit in each of these places. For example:

- **Bangkok** is known for its Buddhist temples 📿,
- **Istanbul** for its mosques 🕌
- **London** for its museum 🦖
- **New York** for its parks 🌲.

### Attractions that received the highest ratings in each destination

<iframe
    src="https://metabase-public.metabaseapp.com/public/question/1307845f-aa20-4972-a849-a3644444f143"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>

We also look at the type of **attraction that received the highest rating** in each destinations.

- Theme parks: **Dubai** and **Hong Kong** 🎢.
- City parks: **London** and **New York** .
- Beautiful mosques: **Istanbul** or **Kuala Lumpur**.

**✈️** We hope this data guide to travel will help inspire your next trip! Feel free to download the cleaned-up data as CSV, JSON, or XLSX to explore the data on your own (click on the links below and look for the download button in the bottom right).

- [Top city destinations - 2019](https://metabase-public.metabaseapp.com/public/question/7f3e14c4-de85-45a3-b661-e214e583102f)
- [Google Maps - Attractions](https://metabase-public.metabaseapp.com/public/question/f6b6ef6c-f9ae-4833-8f91-2d638ca42648)
