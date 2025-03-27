---
title: Bug Count
type: kpi
image: /images/opengraph/_dashboards/bug-count.jpg
featured_image: /images/dashboards/bug-count/dashboard.jpg
listing_image: /images/dashboards/dashboard-bug-count.png
summary: Bug count is meant to tell you the average amount of bugs per a designated amount of lines of code. The purpose of this is to see how often end users are likely to encounter a bug and highlight areas of instability. It’s inevitable that bugs will come up, but it’s important to have a realistic outlook on how often that should be happening. Bug count specifically focuses on how often bugs are making it past testing and into deployment. The main goal is to come up with new methods to detect bugs before deployment more often, as it’s more time-consuming to fix a bug than it is to take extra time writing a line of code.
calculate: Bug count is represented in a ratio based on an average. You’ll be creating a ratio based on the total lines of code and the number of bugs detected. For example, let’s say you have 12,000 lines of code and 135 bugs. You want to figure out how many bugs are getting through per 1,000 lines of code. First, we’ll divide 12,000 by 1,000 to get 12. Then, we’ll divide 135 by 12 to get 11.25. That means your bug count is 11.25:1000. This is about average if not below average from what you might see. The average developer creates around 70 bugs per 1000 lines of code, and an average of 15:1000 makes it to end users.
---

- Downtime
- Build Time
- Online Application Performance
- Mean Time to Recovery
- Deployment Frequency
- Change Failure Rate
- Lead Time For Changes
- [Uptime](/dashboards/uptime)
- Error Rate
