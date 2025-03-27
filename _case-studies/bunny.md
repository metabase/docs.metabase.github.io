---
title: "Bunny embeds Metabase in their SaaS platform to give people easy-to-use analytics."
summary: "Bunny transforms the way SaaS companies operate, offering an all-in-one billing and RevOps solution that seamlessly manages billing, quoting, self-service, tenant management, advanced analytics, and revenue recognition with effortless precision."
redirect_from:
  - /case_studies/bunny
company_name: "Bunny"
industry: B2B SaaS
employees: 10+
headquarters: Santa Monica, USA
logo_image: /images/case-studies/bunny-logo.png
key_usecases: Embedded Analytics:/product/embedded-analytics
image: /images/case-studies/bunny-og.png
featured_image: /images/case-studies/bunny-og.png
the_challenge: Bunny, a SaaS company making billing and RevOps easier, had a problem. They wanted to give people top-notch analytics, but building an analytics platform from scratch would be both difficult and time-consuming. They needed a tool that could be put on their servers, present data cleanly, and not make them sync data with another database.
the_solution: They picked Metabase because it showed data the way they wanted, and they were able to run Metabase on their own servers. Bunny used Metabase's features to control who sees what data, and to make the embedded charts and dashboards look like their own brand.
the_results: By embedding Metabase in their SaaS product, Bunny was able to give customers great analytics (with privacy and customization baked in) while at the same time keeping their tech team focused on making their product unique.
blockquote: Metabase has provided a critical component of our product, which gives our customers intuitive analytics while allowing our engineering team to focus on other things that are core to our business.
speaker_name: Thomas Pedersen
speaker_title: CEO & co-founder at Bunny
speaker_photo: /images/case-studies/testimonials/thomas-pedersen.png
---

#### Why Metabase?

[Bunny](https://bunny.com/){:target="\_blank"} embeds Metabase to provide customer-facing analytics in their SaaS app. As second-time SaaS founders, the Bunny team already knew that building their own analytics engine wasn't worth the effort. They already knew exactly what analytics they wanted to show to their customers. They also knew that they wanted their engineers to focus on their product development, and they were looking for a solution to purchase. They had decided on the various dashboards they'd want to provide before selecting a vendor which made the choosing process much easier.
One of Bunny’s engineers looked at solutions they already knew and had experience with plus some newer entrants, which included Metabase.

**“We chose Metabase because we could deploy it on our server and because the visualization options covered our needs both in terms of functionality and finish.”** - says Thomas.

The Bunny team specifically didn’t want to synchronize data to another vendor’s database for several reasons: latency, bandwidth, data privacy and data schema migration challenges. Metabase is deployed directly on their servers on AWS, which gives them the performance and flexibility they were looking for.

#### The data

Bunny hosts their service in AWS/Postgres in two different shards; one for developers and one for production. There is no separate ETL tool as all the data is created directly in Bunny as customers sign up or sales people create deals and subscriptions. Metabase is running on a separate read-only Postgres replica in order to separate analytics queries from transactional workloads.

#### How Bunny team uses Metabase

The Bunny team relies on data permissions in Metabase to control what each of their tenants can see in Metabase. Bunny stamps all records with a `tenant_id`, which the app passes along when someone signs into Metabase via SAML. This ID tells Metabase what data each customer can explore.

Bunny also white-labels Metabase to match their own user interface with custom colors, logos, and so on.

![how bunny embeds metabase](/images/case-studies/bunny-2.gif)

#### The Results

When building a SaaS product, there are many tradeoffs with respect to what to build and what to buy. Bunny wanted to be able to offer their customers world-class analytics without having to invest massive amounts of engineering resources in building and maintaining analytics functionality that would never stack up to a best-of-breed product like Metabase. With Metabase embedded, Bunny can now focus its engineering resources on improving their core product to put themselves ahead of the competition.
