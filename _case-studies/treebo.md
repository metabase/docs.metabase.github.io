---
title: "Treebo Hotels makes metrics and KPIs a part of their daily routine with Metabase."
summary: "Treebo Hotels is an Indian budget hotel chain that operates on franchising. As of January 2020, Treebo Hotel has over 600 hotels in 113 cities in India."
redirect_from:
  - /case_studies/treebo
company_name: Treebo Hotels
industry: Travel & Hospitality
employees: 500+
headquarters: Bengaluru, India
key_usecases: Business Intelligence:/product/business-intelligence,Interactive dashboards:/product/interactive-dashboards
logo_image: /images/case-studies/treebo-logo.png
image: /images/case-studies/treebo-hotels-makes-metrics-and-kpis-a-part-of-their-daily-routine-with-metabase.jpg
featured_image: /images/case-studies/treebo-banner.png
the_challenge: Treebo wanted to democratize access to their data and empower their less technical team members with data-driven decisions.
the_solution: Treebo looked at a bunch of different options, but thought Metabase was by easily the best choice, both for speed and price.
the_results: In only a few months after launching Metabase at Treebo, the number of people using Metabase went from just a handful of analysts to more than 400 people on a daily basis. The entire organization became more data-driven, which helped people make more informed decisions across the board.
blockquote: We were pleasantly surprised by the wide Metabase adoption — by technical and business folks alike. After we made Metabase available to everyone, we realized that everybody in the company wanted to look at data.
speaker_name: Shanker Sneh
speaker_title: Architect, Data Platform
speaker_photo: /images/case-studies/testimonials/Treebo-Shanker-Sneh.jpeg
---

[Treebo Hotels](https://www.treebo.com/){:target="\_blank"} is India’s largest budget hotel chain, with over 600 hotels across 110+ cities. With the founding principle of “Good rooms. Good service. Good Price.” Treebo Hotels offers a high-quality travel experience to its customers by providing comfortable and value-for-money accommodation options.

Shanker Sneh, Architect, Data Platform, and his team were looking for a BI solution after doing the initial work to set up their data platform. They had previously been using a very limited portion of the features included in [Tableau Data](/lp/metabase-vs-tableau), but they were trying to empower less technical team members, allow for data-driven decision making, and to democratize access to their data as a way to give themselves a competitive advantage.

#### Why Metabase?

In Sneh’s experience, many BI solutions tend to offer a poor experience for users who can’t write SQL, don’t offer great mobile support, can be slow, and are often prohibitively expensive, especially when trying to give access to the entire company.

Treebo needed a solution that was super fast and easy to use, even for those who don’t know SQL; that would allow them to give data access to everyone in the company at affordable prices; and that enabled exploratory analysis, making it possible for everyone to get answers to their “why” questions.

After exploring lots of other options, Sneh and his team felt that Metabase was “easily the best option when compared to others.”

#### The data

Currently, Treebo has connected Metabase to their Redshift data warehouse, several application RDS read replicas which have not yet been integrated with the data warehouse, and an in-memory datastore for real-time analytics. They also have plans to expose a data lake on S3, via Amazon Redshift Spectrum.

#### How Treebo team uses Metabase

The folks at Treebo use Metabase for lots of things: the company uses it to display organization-wide dashboards to track critical metrics; different teams use pulses and dashboards to keep tabs on their respective important Key Performance Indicators; and individuals use Metabase to perform exploratory analysis for themselves or to share with others. But the most common way employees consume data is through Metabase’s Slack and email reports, which Sneh has found to be very powerful.

Analysts and product managers who are looking for the "why" behind patterns, changes, and trends in the data tend to write SQL queries, whereas business users and higher-ups use the graphical query builder to easily explore. More than seventy percent of Metabase users at Treebo create new questions or explorations on their own, while the rest simply use what’s already been made by others.

Company-wide reports are typically built and/or vetted by the data team, though within teams, analysts and product managers have developed most of the things they needed.

#### The results

In only a few months after launching Metabase at Treebo, the number of people using it went from just a handful of analysts to more than 400 people on a daily basis. Sneh feels this has resulted in the organization becoming more data-driven, enabling smarter decision making across the board.

According to Sneh, Metabase quite rapidly became the thing that powers BI at Treebo. He says,

> **"We were pleasantly surprised by the wide Metabase adoption — by technical and business folks alike. After we made Metabase available to everyone, we realized that everybody in the company wanted to look at data."**
>
> **"With the kind of adoption we have for Metabase, the returns definitely exceeded the tech investment. Folks now have access to data for their operational needs, and our leaders have good data for strategic decision making. Now everybody talks more about facts and less about intuition, gut, prior experience, or perceived trends."**

### Sneh’s advice for others

Sneh says that he and his team started exploring Metabase on the smallest box with just a single user, and then gradually opened Metabase up for the whole organization. He says he’d tell an earlier version of himself that this was a wise choice.

If Sneh could change one thing about their rollout, he probably would’ve more extensively worked out access groups, permissions, and role management, so that any new employee would automatically get the correct access to Metabase depending on their team and role. Metabase’s [LDAP integration](/docs/latest/administration-guide/10-single-sign-on) makes this a snap.
