---
title: "Metabase at Paychex"
summary: A look at how Metabase is used at Paychex, a leading provider of solutions for human capital management.
company_name: Paychex
industry:
employees:
headquarters:
logo_image: /images/case-studies/n26-logo.png
image: /images/twitter/paychex.png
permalink: /case-studies/paychex
---

- [Paychex](https://www.paychex.com/) is using Metabase to bring greater visibility to their software development life cycle (SLDC) phases with near real-time dashboards.
- They view Metabase being open source as a plus for its customizability and low barrier to entry.
- Common uses are:
  - Keeping track of build/test/deploy and quality status in real-time
  - Observing trends and bottlenecks in the SDLC
  - Visibility into what is currently deployed across the various DEV/TEST/PROD environments

#### Metabase at Paychex

Founded in 1971 and based in Rochester, NY, Paychex is a leading provider of integrated human capital management solutions for payroll, benefits, human resources, and insurance services to small and mid-size companies. They employ approximately 14,300 individuals, with over 1,500 IT professionals making up their IT department alone. Paychex serves more than 650,000 clients in the U.S. and Europe.

#### Why Metabase

Metabase found its way into Paychex through the Software Lifecycle Engineering Organization. The team has always looked for self-service solutions to better enable their software development teams, and to help reduce the time, cost, and risks in delivering software. To that end, Matt Cipollone (Manager, Enterprise Build Automation), Mark Richardson (Solution Lead), and the rest of the SLE team were looking for a way to bring greater visibility to the software development life cycle (SDLC) phases through near real-time dashboards. The goal was to be able to observe actual trends and bottlenecks to focus on the right improvement opportunities, and to drive the right conversations every day. Matt says, "Metabase was our choice to enter this space for many reasons, and it’s been working out great."

Mark adds that the fact Metabase is open source was a plus: "We preferred open source as it would provide a low barrier to entry (cost and setup) and an easy way to customize the product as needed." The team at Paychex was already familiar with using and contributing back to open source projects, and have since added some great features to Metabase, including the ability to duplicate dashboards.

#### How they're using Metabase

While many companies and teams use Metabase for traditional business intelligence, Paychex is primarily using it to get answers about things happening in real-time. Specifically, the IT organization leverages Metabase to keep track of the status and trends of their SDLC pipeline. For example, they have Metabase questions that check if regression tests are passing, to see what is currently deployed in a specific environment, and to see what the pass/fail trends for tests, builds, and deployments have been over the last few days.

Because they're using Metabase this way, the structure of the data they're querying looks more like a normalized application database than an analytics database. In-house data collection processes pull data that's changed from external SDLC tools every five minutes, with data from each tool being put into a separate table.

So far, the main users of Metabase at Paychex are IT professionals who are involved in this SLDC pipeline in some way, including all Development managers. In a few cases, the Development managers enlisted some SQL experts to build dashboards for them.

There's no question that for many tricky queries, the power and flexibility of writing SQL is hard to beat. So, while many of the questions Paychex's users rely on are based on SQL, they've started to do a number of things to make it easier for users who are less comfortable with SQL to make use of Metabase's easy graphical query builder, such as:

- Creating tables storing precomputed data to improve performance and custom views to stitch together data into more user friendly groupings.
- Adding a column in certain situations with comma-separated values which can be filtered on using the "contains" filter as a way to enable easier filtering in cases of one-to-many relationships.

That being said, most of Paychex's current users can write their own questions, and Paychex provides training for those who can't. Additionally, they keep an internal FAQ of common practices and tips for using Metabase.

#### Lessons learned

When asked what advice he would give to others who are contemplating or beginning a Metabase rollout, Mark said:

"In general, I would say the biggest tip is to keep it simple and only report on data that is useful. My slogan is: ‘A dashboard is not useful unless it gets used.’ BI and reporting products look nice and are easy to sell and generate excitement, but making a dashboard with data that is meaningful and actionable takes a lot of thought. I’ve seen people create questions and dashboards that look cool but don’t provide actionable information. One of my favorite things to ask people to stimulate thought is, ‘What are you going to do with that data?’"

And when it comes to your data model Mark suggests that you "Keep it as simple as possible. Favor simplicity if it covers most cases instead of complicated models to cover every case."
