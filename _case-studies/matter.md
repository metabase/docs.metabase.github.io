---
title: "Matter saves 30% of their growth budget, making data-informed decisions with Metabase."
summary: "Matter is a free Slack app that helps teams to recognize each other with Kudos, rewards, and continuous feedback – all inside Feedback Friday."
redirect_from:
  - /case_studies/matter
company_name: "Matter"
industry: "IT & Software"
employees: 10+
headquarters: San Francisco, USA
key_usecases: Business Intelligence:/product/business-intelligence,Interactive dashboards:/product/interactive-dashboards
logo_image: /images/case-studies/matter-logo.png
image: /images/case-studies/matter-saves-30%-of-their-growth-budget,-making-data-informed-decisions-with-metabase.jpg
featured_image: /images/case-studies/matter-banner.png
the_challenge: Matter didn’t have a defined process for making the company’s data available to team members. Accessing data was a complex task that usually involved some database connection troubleshooting. Once Matter identified and prioritized their North Star metrics, they started looking for a BI tool.
the_solution: One of Matter’s team members who had used Metabase before recommended it. Installation was easy, and they were able to start building their first reports right away.
the_results: The entire Matter team adopted Metabase. Their explorations with Metabase helped them uncover bugs, adjust acquisition budgets, and track important metrics. Among other insights, Matter was able to save 30% of their growth budget, and reallocate it for more effective returns.
blockquote: With Metabase we were able to identify that weekend times did not perform well for user acquisition. This allowed us to more effectively spend 30% of our growth budget on more effective time periods.
speaker_name: Sam Lepak
speaker_title: Head of Growth at Matter
speaker_photo: /images/case-studies/testimonials/Matter-Sam-Lepak.jpeg
---

[Matter](https://matterapp.com/){:target="\_blank"} helps teams create a feedback-focused culture with Kudos, rewards, and constructive feedback, all inside their free Slack app. Matter has been voted Product Hunt's social impact product of the year.
<br>

#### Why Metabase?

Prior to using Metabase, Matter didn’t have a streamlined process for giving team members access to product data. They had a lot of unanswered questions about their data and it was difficult to access. Getting access to the database usually took some troubleshooting, and writing the queries to answer questions with data wasn’t easy either.

Combined with an increased focus on acquisition and north star metrics, Matter knew they needed a BI solution.

Before Metabase, some team members had used Google Data Studio, [Tableau](/lp/metabase-vs-tableau), and [Looker](/lp/metabase-vs-looker). However, they ultimately decided to go with Metabase due to multiple factors (pricing, setup time, integrations, short learning curve).

Matter team is using a self-hosted Metabase version on AWS, with a read-only replica of their Postgres server. When Matter’s CTO saw it was a Java application, he was preparing for a really onerous installation process, but he was pleasantly surprised at how easy it was to install and configure.

#### The data

The Matter team is interested in product usage data, particularly in the context of user acquisition, retention, engagement, monetization, and referral.
They store data in AWS RDS Postgres and multiplex some application-level events to third-party services with a pipeline that uses AWS SQS and NodeJS lambdas with Serverless.

#### How Matter uses Metabase

The entire Matter team uses Metabase and everyone has access to their north star metric reports. After building their first dashboards, they started digging further into their data. With the help of Metabase they got more clarity and were able to identify some previously hidden trends.

Company-wide dashboards are usually prepared by the engineering team. However, each team (growth, product, engineering, etc.) can write reports to answer their own questions. For example, the growth team will look at day-over-day results to spot fluctuations in acquisition performance, the product team will analyze opportunities for retention and engagement improvement, or the design team can look at common user flows such as onboarding completion rate.

#### The results

By bringing more awareness to their data, Matter has inspired more team members to dig into the data and discover more opportunities for growth and improvement. It’s also just brought a lot of excitement to the company and been a general boost for morale.

Each week they have a planning meeting where they discuss their growth and monitor their metrics. So far, Metabase helped Matter uncover bugs, tailor their acquisition budgets to high-value periods, and made it easy to share their key metrics with stakeholders.

#### Advice for others

Sam Lepak, Head of Growth at Matter says:

> **“The best time to integrate Metabase was yesterday. The next best time is now. Data can be a black box for most teams, so it’s best to tackle this head-on and know your North Star numbers so you can stay honest and ask yourself, “does this move the needle?”. Diving deep into the data isn’t always easy, however, it’s a critical component to success for any business.”**

Sam also suggests determining your north star metrics and creating a company-wide dashboard so that everyone has clear visibility and knows where to view them. In addition to aligning the team, it’s a way to spark curiosity; it’ll encourage the teams to start exploring data more and more on their own.
