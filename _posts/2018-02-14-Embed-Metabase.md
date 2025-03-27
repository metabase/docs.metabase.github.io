---
title: "Power your Application analytics with Metabase"
date: 2018-02-14 00:10:58
last_updated_at: 2018-02-14 00:10:58
categories: "Using Metabase"
author: Sameer Al-Sakran
image: /images/posts/power-your-application-analytics-with-metabase.jpg
layout: post
---

<div class="blog-callout p2 mb4 bordered rounded">
TL;DR Embed Metabase dashboards in your application to easily provide analytics to your users and iterate faster.
</div>

Users expect increasingly sophisticated analytics and reporting as part of any application.

Whether you are building a SaaS CRM application, an online video site or a blogging site, your users expect to easily look up how many leads a given salesperson closed, how many views their uploads received over time, or what your top referrers are.

Historically, to provide your users with the analytics, you could either build out a custom analytics feature set in your application itself, or use complicated and expensive business intelligence applications.

Metabase now offers a simple, fast way to power your in-application analytics. If you already use Metabase for internally-facing analytics (and you should!), you can quickly reuse reports and dashboards and present them in your application. If you don’t use Metabase, you can easily and quickly create embeddable charts using our graphical interface or by writing SQL queries.

You can embed Metabase into your application either by using a [public link](/docs/latest/embedding/public-links), or if you need a more secure method, by using our [Secure Embedding integration](/docs/latest/administration-guide/13-embedding) in your application's backend server code. Anything that lets you insert an HTML “iframe” can include Metabase powered analytics.

## Why power your analytics using Metabase?

### To iterate faster

While at times you know exactly what kind of reporting users will need as you’re building the application, frequently these needs change, or you learn more about the usage patterns of your users.

When you use Metabase embedded dashboards, you are defining them in our application instead of in source code. This lets you iterate on them much more quickly:

- Embedded dashboards can be tweaked and changed by analysts instead of engineers.
- The cards in a dashboard can be rearranged without re-compiling and deploying the application.
- You can see exactly how the dashboard layout will look with real data instead of fake or staging server data.
- The underlying queries powering cards and dashboards can be fixed independently of the application.
- You can view and modify the cards in application speed rather than application deployment speed.

Using Metabase to create a user-facing stats portion of your application lets you trade off precise UX control for dramatically faster iteration speed. In that way it is similar to launching a mobile HTML site rather than a native app.

### To build analytics gradually

Embedding Metabase charts and dashboards lets you easily build out your applications reporting function. In the early days, you can easily share a dashboard or report with a customer using a public link. This lets you quickly share data in a one-off fashion with specific customers when you don’t know if their specific request should be introduced into your in-application analytics. If users keep asking for the same analysis, take that dashboard or report, parameterize it by customer ID, and then embed it in your application dashboard. You can make minor and gradual changes and you only invest more time in the process after validating a real report with real data to a real customer.

### To be consistent across internal and external analytics

Maintaining consistency in analytics numbers and reconciliation is one of the main time sucks in building analytics systems. By using Metabase dashboards for internal and embedding use, it’s quick and easy to compare definitions, filters, etc. to double check that your internal and externally displayed numbers are consistent. Additionally, by reusing Metrics and Segments defined in Metabase, you preemptively avoid these problems of inconsistent numbers appearing in internal dashboards and your application.

## Free and commercial options

Anyone can use our embedded features for free with unlimited users, pageviews, charts, or dashboards in any application — personal, commercial or otherwise.

All that we ask is that you keep the small, discrete "Powered by Metabase" attribution visible in your embedding application. If you wish to use Metabase embedding for a commercial application and want to remove this, we offer a simple, no-fuss alternative license. You can start off with our attribution, and then remove it when you launch your application or make money.

You can learn more about how this embedding works in our [documentation](/docs/latest/administration-guide/13-embedding) and purchase a license to remove attribution elements at [our store](https://store.metabase.com/product/embedding)

## Frequently asked questions

_Does the AGPL apply to my application when I embed Metabase charts in it?_

No. When you use either the [attribution](/license/embedding) or the paid [no-attribution license](/license/premium_embedding), you are not bound by the APGL.

_Can I get rid of the logo?_

We offer a commercial license that provides a non-AGPL alternative to the attribution license. You’ll help keep the Metabase project going as well as getting customer facing analytics shipped in a fraction of the time it would take to build them in your app.

_Is this secure?_

With our Secure Embedding, all embedding requests must be cryptographically signed by your application’s server and any parameters you mark as required are validated. That request can never be used to retrieve any extra data, and will be expired after a certain time period.

_Do you see my data?_

No, we never see your data. If you opt into sharing anonymous stats with us, we will phone home information about how you are using the Metabase application. However, we never see or transmit the actual data, specific queries or any other sensitive information.

_Is this a hosted service?_

Not at this time. Metabase is super easy to run however, and can be run on Heroku or other managed hosting providers. [Try it out yourself](/start/).

_Will it scale?_

The answer to that is “it depends”. In general, for most embedded SaaS applications a single Metabase server on a decently provisioned host should scale just fine. Especially slow data warehouses, large queries, or high numbers of concurrent users might require specific tuning. Metabase can cache data warehouse queries, can take advantage of an external cache, and offers a number of way to optimize performance.

_Can I embed Metabase charts in my on-premise software product?_

Yes, you can. Please [contact us](/services) to learn more.

_Can I restrict embedded charts by user, or by group?_

Just create a query or dashboard that takes a user or group id filter, and when you embed it in your application, select Secure Embedding. This allows you to require that an embed specify a user id.

_Can I customize the fonts, colors or other attributes of the charts?_

Not at this time. We are actively working to offer up more customization however!

_Can I use SQL in embedded reports?_

Yes!

_Do I need to know SQL to generate reports I can embed in my application?_

No, you can embed reports built in our easy to use graphical interface (see [our documentation](/docs/latest/questions/introduction) for examples)

_Do I need to know how to code to embed Metabase charts in an application?_

Yes. While you can embed public dashboards and questions anywhere HTML is allowed, for secure embedding, you will need to integrate us with your backend server. You can see examples of this [here](https://github.com/metabase/embedding-reference-apps).
