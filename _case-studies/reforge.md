---
title: How Metabase became the single source of truth for the Reforge team.
summary: Reforge helps people do the best work of their careers. They offer educational programs, networking opportunities, events, and community to help people understand which strategies have worked for the best companies in the world. All programs are led by actual growth practitioners from leading technology companies like Slack, Uber, Tinder, HubSpot, Eventbrite.
redirect_from:
  - /case_studies/reforge
company_name: Reforge
industry: Education
employees: 150+
headquarters: San Francisco, United States
key_usecases: Business Intelligence:/product/business-intelligence,Interactive dashboards:/product/interactive-dashboards
logo_image: /images/case-studies/reforge-logo.jpeg
image: /images/case-studies/reforge-og.jpg
featured_image: /images/case-studies/reforge-cover.jpeg
the_challenge: Before Metabase, for every question the Reforge team had, they ran a query against their database and then put the results in a spreadsheet. While this answered their questions at the time, they felt like they could do a lot better.
the_solution: After having used Looker, Reforge’s Head of Data wanted a lightweight solution to enable the entire company to have access to critical data about the business.
the_results: Metabase was instrumental in democratizing access to Reforge’s data. Now over 75% of employees are leveraging Metabase on a monthly basis.
blockquote: Metabase has allowed us to make data accessible to anyone in the organization, whether it’s for a deep analysis or for a quick status update on an important initiative.
speaker_name: Dan Wolchonok
speaker_title: Head of Data at Reforge
speaker_photo: /images/case-studies/testimonials/dan-wolchonok.jpeg
---

[Reforge](https://www.reforge.com/){:target="\_blank"} helps people do the best work of their careers. They offer educational programs, networking opportunities, events, and community to help people understand which strategies have worked for the best companies in the world. And the programs feature top growth leaders from companies that include Google, Dropbox, LinkedIn, Pinterest, Atlassian, Slack and others.
Reforge was profitable and bootstrapped before they raised their Series A in early 2021. In their first 5 years, they spent \$0 on paid marketing and had no sales reps.

#### Why Metabase?

The Reforge team needed to get straightforward answers to basic questions about how the business was performing, and to get insight into what people were doing within their web application.

In early 2018, Dan Wochonok, Head of Data at Reforge saw how a PM would ask an engineer to write SQL, then the PM would export the results to a spreadsheet to share with others within the company.

After having used [Looker](/lp/metabase-vs-looker) while working at HubSpot, Dan wanted a lightweight solution to help enable the entire company to have access to critical data about the business. That’s how they started using Metabase.

With Metabase, Reforge wanted to build basic dashboards that would let them know how the business was performing. They wanted to understand at a high level what the trends looked like as a starting point.

#### The data

Reforge uses Snowflake as their data warehouse. They replicate data from a production read replica into Snowflake to combine production data with analytical data. They use dbt to build models that combine data from multiple source systems and enable denormalized tables that bring together multiple sources into simple-to-use models for anyone in the organization to query. They’re able to seamlessly run queries that mix and match data between the two systems so that they can use the latest production data with an analysis built on raw event-based data or models computed in the data warehouse.

**Some of the tools they use:**

- Metaplane for data observability
- dbt for modeling and data transformation in the data warehouse.
- Segment for their event pipeline, data governance, and to populate their data warehouse with event level information from sources of data.
- Hightouch for their reverse ETL tool.
- Airflow for any jobs that connect to external services, and to create more sophisticated models and jobs that can’t be created in pure SQL.
- Metabase as their BI tool.

Dan has posted a diagram showing their tooling and how it is connected [here](https://www.linkedin.com/feed/update/urn:li:activity:6963174688554414080/){:target="\_blank"}.

For each tool they use, Reforge team has documentation describing what to use the tool for, and examples to get everyone started.

**In Metabase, Reforge team is looking at:**

- Data warehouse (contains models, analytics sources, production sources)
- Production database read-replica
- Third-party data from tools

#### How Reforge team uses Metabase

In the beginning, Dan set up all the reporting for the team.
He would generate a simple report and then share it with a colleague knowing that it should always be up to date, even if the underlying data is updated. Dan also liked the ability to combine data from multiple databases into the same dashboard, and drag and drop the charts in any configuration you want.

One of the features the team enjoys a lot is the possibility to post questions to Slack or email at a regular interval. It’s a great way to ensure that important metrics are top of mind for the team and that they’re aware of how metrics are performing.

Now, however, Reforge has a team of analysts and data engineers that work with stakeholders across the company to self-serve basic questions and do deeper analyses that require more technical skills.

In Metabase, Reforge measures everything from how they’re performing against their top-line business metrics for the year, down to individual reports on how users and teams are engaging with the platform.

Every department uses Metabase for insight into user behavior, answering customer questions, getting insight to help in the sales process, trends about what content people view the most, and doing advanced analytics through segmented reports, YoY comparisons, and retention charts.

#### The results

With Metabase, Reforge teams were able to get the basic understanding of what’s happening (revenue, engagement, traffic, conversion analysis, retention, behavior on site, popularity of content, etc). Everyone has access to the latest and greatest data sets to help them make better, more-informed decisions.

#### Advice for others

1. Create video tutorials of key elements that are a part of the onboarding material for new employees:

   - The types of questions that can be answered in Metabase
   - The types of data that can be queried from Metabase
   - The dashboards that are useful for various purposes (overall company performance, functional reporting)
   - How to self-serve to get an answer to a question by using the GUI query builder in Metabase
   - How to setup a slack or email subscription for a question or dashboard

2. Monitor how your org is using Metabase. Find out who isn’t using Metabase (and who should be), and look to address their concerns, misunderstandings, or frustrations.

3. Avoid custom SQL in your centralized key reporting

   - Make sure you aren’t dealing with a rats nest of custom SQL questions producing inconsistent results across your org.
     There are multiple ways to avoid this by:
   - build models in Metabase that can re-use logic.
   - build models in a tool like dbt.
   - Nesting questions in Metabase by referencing other questions

4. Leverage the [events feature](/docs/latest/exploration-and-organization/events-and-timelines){:target="\_blank"} in your charts to add context.

5. There is an ecosystem around Metabase making it easy to build upon / connect to other tools (for example, [Metabase & dbt model synchronization](https://pypi.org/project/dbt-metabase/){:target="\_blank"}, [Metabase Python API](https://github.com/vvaezian/metabase_api_python){:target="\_blank"}).
