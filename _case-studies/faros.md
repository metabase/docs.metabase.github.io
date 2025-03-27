---
title: "How Faros.ai embeds Metabase into their multi-tenant SaaS product."
summary: "Faros AI is an engineering operations platform that brings all engineering data in one place to give engineering leaders a single-pane view of their entire software development lifecycle."
redirect_from:
  - /case_studies/faros
company_name: "Faros AI"
industry: IT & Software
employees: 20+
headquarters: San Francisco, California
key_usecases: Embedded Analytics:/product/embedded-analytics
logo_image: /images/case-studies/faros-logo.png
image: /images/case-studies/faros.jpg
featured_image: /images/case-studies/faros.jpg
the_challenge: For Faros AI, Business Intelligence is the main channel through which their customers get value from the product. Faros AI was looking for a BI solution that would be not just embeddable in their application, but also support all their needs.
the_solution: They chose Metabase due to its simplicity, easy integration, multi-tenancy support, and powerful visualization capabilities.
the_results: Metabase helped Faros AI save engineering resources so they could focus on the core business of building a Connected Engineering Operations Platform.
blockquote: Metabase was easy to integrate, had first-class multi-tenancy support, and it quickly became the main way Faros AI customers interact with their SaaS Engineering Operations data platform.
speaker_name: Thomas Gerber
speaker_title: Engineering Lead at Faros.ai
speaker_photo: /images/case-studies/thomas-gerber.jpeg
---

#### Why Metabase

The BI layer is the main channel for [Faros AI](https://www.faros.ai?utm_source=Metabase&utm_medium=Referral&utm_campaign=MetabaseCaseStudy){:target="\_blank"} to deliver value to its customers. As a data platform, they wanted people to be able to explore data, ask questions, build charts and dashboards, and share them on a daily basis.

Faros AI looked at several BI solutions that could be embedded in their application, and they needed a solution that supported multi-tenancy. _“For example, if you help people auto-complete certain filters when they build their query, it’s important not to leak values other tenants may have for that field.”_ - says Thomas.
With Metabase, Faros AI had a working, multi-tenant prototype they could experiment with in just a few days.

**Since Metabase is open source, Faros AI looked under the hood and felt confident that:**

- Metabase’s security model and multi-tenancy support were robust.
- They could contribute to Metabase’s open-source codebase if they wanted to.
- Metabase was constantly [adding new features](/releases){:target="\_blank"} that would benefit Faros AI customers as well.

Previously, Faros AI’s leadership spent 5 years at Salesforce building its AI infrastructure, so they understand how hard multi-tenancy is to get right. Metabase’s first-class multi-tenant support is what convinced them to choose the tool.

#### The data

Faros AI provides ELT, APIs, BI, and automation for engineering operations data. Engineering Operations data covers everything software engineers interact with on a daily basis: Tasks, Epics, Pull Requests, Builds, Deployments, Incidents, Services, etc.

Faros AI connects the dots between those engineering data sources, which gives visibility and insight into one’s engineering processes.

They keep their data in a PostgreSQL database and use Airbyte for ELT, Hasura for GraphQL AP, and dbt for transformations.

#### How Faros AI uses Metabase

Faros AI uses interactive embedding of Metabase for its multi-tenant SaaS product.

![how faros embeds metabase](/images/case-studies/faros-embedding-gif.gif)

More specifically, Faros self-hosts a full, [white-labaled](/docs/latest/enterprise-guide/whitelabeling){:target="\_blank"} Metabase instance and [embeds](/docs/latest/embedding/interactive-embedding){:target="\_blank"} it in their application. They set up [SSO with JWT](/docs/latest/people-and-groups/authenticating-with-jwt){:target="\_blank"} to link users in their application with their embedded Metabase instance, and attached tenant and user attributes to signed tokens.

Finally, they use those attributes to [sandbox the data](/docs/latest/enterprise-guide/data-sandboxes){:target="\_blank"} in their tables to ensure users can only see the data:

- Of their own tenant,
- That they have permission to view.

One of the main use cases of Faros AI EngOps platform is to provide visibility and insights into how engineering operations and processes are performing. For example, DORA metrics.

![how faros embeds metabase](/images/case-studies/faros-2.png)

#### The results

**Faros’ embedding of Metabase enabled:**

- People to explore and query the data, and build relevant dashboards that capture their company’s idiosyncrasies through a simple UI interface.
- Faros to create powerful dashboards for new product lines (Value Stream Analysis, Engineering Productivity, etc.). These dashboards act as templates that encourage different kinds of customers–from analysts to executives to developers–to build their own versions.

**People use Faros.ai to:**

- [Zoom into the underlying data](/docs/latest/dashboards/interactive){:target="\_blank"} by simply clicking on the charts.
- [Create their own metrics and charts](/docs/latest/questions/introduction){:target="\_blank"} in Metabase from scratch or from the template charts, without the need for SQL.

Faros has spent very few engineering cycles on Metabase since its integration. Those resources were instead spent on its core business of building a Connected Engineering Operations Platform.

![how faros embeds metabase](/images/case-studies/faros-3.png)

#### Advice for others

_“Multi-tenancy/sandboxing is hard, and something you can’t afford to get wrong. Do not slap multi-tenancy on top of an existing BI product. Unless BI tools are your core business, something will inevitably get past you. You’re better off using a tool that has first-class support for it.”_, - says Thomas.
