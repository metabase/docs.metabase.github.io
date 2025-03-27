---
title: "Synctera uses Metabase to improve customer satisfaction and self-service analytics."
summary: "Synctera is a banking and payments platform that helps companies of all sizes build and scale financial products. "
redirect_from:
  - /case_studies/synctera
company_name: "Synctera"
industry: Banking & Finance
employees: 100+
headquarters: San Francisco, USA
logo_image: /images/case-studies/synctera_logo.png
key_usecases: Embedded Analytics:/product/embedded-analytics
image: /images/case-studies/synctera-og.jpg
featured_image: /images/case-studies/synctera1.png
the_challenge: Before Metabase, Synctera used a slow BI solution that lacked customer self-service capabilities and had poor technical support.
the_solution: Metabase allowed both Synctera and their customers to ask their own questions and improved their self-service data culture.
the_results: Metabase improved customer satisfaction, increased self-service analytics capabilities, and saved a lot of time for their analysts.
blockquote: Metabase is the first self-service dashboard platform I’ve been able to deploy after more than a decade of trying.  It’s truly customer-facing and end-user-focused.
speaker_name: Dave Holmes-Kinsella
speaker_title: Head of Data Science at Synctera.
speaker_photo: /images/case-studies/testimonials/dave-synctera.jpeg
---

#### Why Metabase?

Before Metabase, [Synctera](https://synctera.com/){:target="\_blank"}'s team used another BI solution that wasn’t performant enough for them, and it didn’t make it easy for people to self-serve their data questions.

The turning point came when the CEO of Synctera attempted to use one of their customer-facing dashboards and expressed strong dissatisfaction with a cross-tab (pivot table) taking 14 seconds to render. Synctera’s CTO was familiar with Metabase from previous experiences, and they decided to evaluate it. They ended up choosing Metabase because it was:

- Performant
- Browser-based
- Easy to configure and maintain
- User-friendly and simple (focusing on shipping solutions, not tweaking colors)
- Cost-effective
- **“We didn’t know it at the time, but the level of support,”** says Dave.

Synctera’s team had a base set of dashboards they needed to migrate from the previous solution to serve both operations and regulatory reporting. They also wanted to provide their customers with the ability to answer their own questions.

#### The data

Synctera works with banking data, supported by a [cloud-native Ledger](https://synctera.com/post/ledger-as-a-service-the-power-of-using-a-modern-ledger-for-your-financial-product){:target="\_blank"}. This data includes transactions, accounts, and end-user information, together with information relating to disputes, fraud, and compliance activities. The data are sourced from their operational systems, all running on PostgreSQL, and periodically ETL-ed  into BigQuery. A subset of the data is real-time, reported directly out of PostgreSQL.

They maintain a series of intermediate tables that perform three tasks:

- Reshaping the data for subsequent use.
- Providing detailed level data for deep analysis.
- Providing summaries and metrics for top-level dashboards.

By maintaining full visibility into the data, the Synctera team ensures they can accommodate the summary-to-drilldown journey in any dashboard. This approach helps them avoid "dueling spreadsheets," where metrics are calculated differently by people using different tools.

#### How the Synctera team uses Metabase

Synctera’s team uses Metabase in three main ways:

- Their [customer-facing](/learn/customer-facing-analytics){:target="\_blank"} product, [Synctera Insights](https://synctera.com/post/taking-ownership-of-your-data-with-synctera-insights){:target="\_blank"}, is an executive dashboard showing growth in business and program performance across various metrics.
- Their internal product is a dashboard that allows their operations team to manage payment flows, track account balances and monitor case (fraud, disputes, investigations) activity for risk and compliance purposes.
- Their ad-hoc requests come from the Risk and Compliance teams within their company, or from their customers and bank partners.

Synctera’s data team built the initial dashboards, which are used by most of the employees. For product health metrics, the product managers built the dashboards for their respective products.

Synctera’s team operates multiple Metabase - one principal  internal Metabase and one external. The external-facing Metabase is almost exclusively graphically based to support [multi-tenancy](/learn/customer-facing-analytics/multi-tenant-self-service-analytics){:target="\_blank"}. Internally, they typically start by asking questions in SQL. Once they’ve achieved reasonable alignment with their intended audience, they build the data into tables for performance.

Synctera operates a multi-layered security approach to ensure that the right data -- and only the right data --  is available to those who need the information to do their jobs.

**Synctera manages dashboard access in a number of ways, using Metabase’s security models:**

- Globally accessible content, designed for anyone with access to the system.
- Bank-accessible content specific to Synctera bank partners.
- Team content is available within organizations. For example, a bank partner can create and share content for their own team; and these dashboards are invisible to people outside of that organization.

**Synctera manages data access on a shared-view basis:**

- Customers can see information about their own programs.
- Banks can see information about all programs being supported by them.
- Appropriately authorized Synctera employees can see the information.

**Information is additionally restricted based on sensitivity:**

- Certain data sets are highly restricted.
- PII data are masked, tokenized, or redacted in the dashboards and supporting datasets.

Underpinning all these permissions is the sandboxing model of Metabase, which supports multi-tenancy “out of the box”. In this way, people from different organizations–Synctera, bank partners, and customers–can use the same dashboards but with the information automatically scoped as appropriate to each organization

Synctera also uses [official collections and questions](/features/collections){:target="\_blank"} to help people find content that is most relevant to their sphere of activity.

![How synctera embeds metabase](/images/case-studies/synctera-embedding.png)

#### The Results

The initial goal of Synctera’s team was to replace the previous solution with something that was performant, appealing, feature-complete, cost-effective, and supportive of our company’s brand.

**Metabase improved Synctera’s data culture in the following ways:**

- Allowed their external customers to perform their own analytics.
- Enabled their internal customers to conduct ad-hoc analysis.
- Decreased the number of ad-hoc requests, as an analyst can now share a dashboard that people can build on and extend, rather than iterating back and forth.

Synctera’s team specifically values Metabase's technical support.

#### Advice for others

- Read the documentation carefully. It’s quite comprehensive.
- Think carefully about how you’ll help people implement alerts.
- Have a plan for dashboard visibility and lifecycle: use the tools to purge unused content. Or, reduce the content's visibility.
