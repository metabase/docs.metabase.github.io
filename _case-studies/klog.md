---
title: "How KLog uses Metabase to deliver shipping reports to their clients."
summary: KLog provides freight-forwarding services and a digital platform for international commerce administration. KLog.co is a bootstrapped business, and they’ve already served over 3,000 clients to yield $100M in Revenue.
redirect_from:
  - /case_studies/klog
company_name: KLog
industry: Logistics & Transportation
employees: 150+
headquarters: Santiago, Chile
key_usecases: Business Intelligence:/product/business-intelligence, Embedded Analytics:/product/embedded-analytics
logo_image: /images/case-studies/klog-logo.png
image: /images/case-studies/klog-og.png
featured_image: /images/case-studies/klog-cover.jpeg
the_challenge: Before Metabase, KLog team was using [Power BI](/lp/metabase-vs-power-bi), but they weren't satisfied with its embedding capabilities, the data management made it slow, and they found it difficult to collaborate on queries.
the_solution: "When KLog team found Metabase, they liked that they could write queries that other people in the company could filter, summarize, and generally explore. Metabase’s embedding capabilities made it possible to have only one solution for both internal and external use cases: they could embed dashboards for their clients with the same tool they use to create reports for themselves."
the_results: Metabase has given more people access to KLog’s data, and they've been using it to make better decisions. KLog’s clients also love how fast they can iterate on their dashboards, as they don't need to rely on developers to make the changes.
blockquote: With Metabase, we were able to quickly explore our payments-due dataset, and from there find ways to optimize our collection process. We didn't need to wait hours or days for new visualizations; we could make new charts ourselves with the query editor, and that helped us find new ways to increase our payment ratios.
speaker_name: Nicolás Rivas
speaker_title: Head of Data at KLog.co
speaker_photo: /images/case-studies/testimonials/nicolas-rivas.jpeg
---

[KLog](https://klog.co/){:target="\_blank"} is a bootstrapped business with over \$100M USD in Revenue and more than 4500 clients. KLog provides an international commerce platform where clients can follow their shipments, and manage all their importing or exporting processes.

#### Why Metabase?

KLog’s platform had some reports done in [Power BI](/lp/metabase-vs-power-bi), but they found that the embedding limitations of Power BI didn't have the flexibility they needed to show their clients the information they needed exactly where they needed it. Internally, their reports were often inaccurate, inconsistent, and hard to access, which motivated the creation of the Data & Business Intelligence team at the beginning of 2022.

Power BI wasn’t flexible enough for embedding on the platform, and KLog realized that maintaining two different tools for internal and external reporting would be inefficient. KLog wanted a scalable solution where they would have better control over the transformations they made to their data.

KLog's data team didn’t want to build their own solution (they work under the ethos of “Don't reinvent the wheel, integrate”). They chose Metabase because:

- Metabase is open source,
- They could easily embed it into their app,
- And Metabase could connect to their databases without needing to download the data somewhere first.

KLog’s team first heard about Metabase on Reddit, [r/dataengineering](https://www.reddit.com/r/dataengineering){:target="\_blank"}, and it was exactly what they needed.

#### The data

KLog’s builds their data warehouse using transactional data from their platform. Their warehouse contains web app data, finance data from their ERP, and data from their Data Lake that comes from API subscriptions to track shipping containers.

#### How KLog team uses Metabase

KLog team uses Metabase for both internal reports and embedded custom reporting for their clients.

Internally, Finance and Sales use Metabase for dashboards and tracking KPIs. The Data & BI team uses Metabase the most, and Product and Tech use it for reporting and ad hoc queries as well.

KLog team built an embedded dashboard that could scale to every client. They set up the parameters within the embedding code in their platform to get the ID of the client that logged in, so each client got to see a dashboard with their own data.

Clients see important information regarding their shipments, the shipments' current locations, and when the shipments are expected to arrive. Clients can filter by date, type, provider, ports, etc. This interactivity gives clients an overview of incoming cargo, which helps them manage their inventory efficiently.

KLog team still uses [Power BI](/lp/metabase-vs-power-bi) sometimes, but they want to extend Metabase so that it completely replaces Power BI for internal reporting, and also that it becomes the only tool for report embedding on their platform. Analytics is a big part of KLog’s value proposition, and they want to provide accurate, actionable, and attractive analytics to their 4500+ clients, from small importers to huge LATAM retailers.

![how KLog embeds metabase](/images/case-studies/klog-1.png)

![how KLog embeds metabase](/images/case-studies/klog-2.png)

#### The results

Metabase has made it easier to access internal reports, so that everyone at the company agrees on metrics and performance. Metabase also makes it easier to create reports for their clients, so that they don't need to spend development time on them, as Analysts and Product Managers can create their own reports.

Specifically, models were very useful for KLog to set a publicly available source of truth about different data sets. People can start their queries from models, and if they don't know what a column means, they can easily access a description about the column. Models really help KLog’s team get closer to their vision of self-service analytics inside the company.

#### Advice for others

_It was great when we found out about Models, and that we could share them with the company. We now use models as a mini data-catalog, helping our employees to self-serve on their reporting needs.”_, - says Nicolás.

Nicolas encourages people to explore all the ways SQL Queries, Questions, Models, and Dashboards relate to each other as in which cases one can apply filters is very important to know from the beginning.
