---
title: "How we enriched customer contact and organization data"
summary: "To improve self-service at Metabase, we used open-source tools like dlt to automate contact enrichment and tailor data models for different teams."
date: 2024-09-25 00:05:05
last_updated_at: 2024-09-25 00:05:05
categories: "Analytics and BI"
author: Max Zheng
featured_image: /images/posts/data-enrichment.jpg
image: /images/posts/data-enrichment.jpg
layout: post
---

We wanted to get more context for the data we collect, so we shopped around for data enrichment services. These companies can contextualize your data with more details. For example, given a domain name, a third-party enrichment service can give you the domain's associated company name, its size, industry, and so on.

Data enrichment is a typical practice for growing companies, and certainly for large companies. But before you go shopping for enrichment services, you should have a known set of problems to solve (or goals to achieve), that enrichment can help with. For Metabase, we wanted to enrich our customer contacts for two reasons:

1. **To keep in touch with our customers.** Enrichment can alert us to job changes for contacts that may impact our relationship. For example, if a contact transitions to another job within or outside the company, we may want to reach out to congratulate them and make sure we're in touch with whomever is taking over the relationship so that important product comms don't get lost.
2. **To gain a better understanding of organization size and industry,** which can help us tailor our marketing and product efforts to make sure we're building Metabase to solve the kinds of problems these segments face.

## Evaluation of service providers

There are surprisingly many service providers for data enrichment, each with its own pros and cons. While we considered various LinkedIn data dump providers, we decided against using them, as we shouldn't store that kind of data in our data warehouse. We also didn't evaluate Clearbit, since it's no longer available as a standalone service.

TL;DR: [Apollo.io](https://www.apollo.io/){:target="\_blank"} offered the best coverage, pricing, and features for our use cases.

| Criteria / Provider                                    | LinkedIn Sales Navigator                                                                                                                                                                                                       | Crunchbase                                                                                                                 | Lusha                                             | Apollo                                                                                                                                     | CommonRoom                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Job History / LinkedIn Profile**                     | Best available, but UI access only; [API access is limited](https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api?context=linkedin%2Fconsumer%2Fcontext){:target="\_blank"}                        | Not available                                                                                                              | Not available                                     | Good / Looks recent                                                                                                                        | Mostly good, but some missing recent job changes                                                                                                                                                                                                                                                                                                |
| **Firmographic, such as industry size, industry, etc** | Good. Search is UI only; [API access is limited](https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api?context=linkedin%2Fconsumer%2Fcontext){:target="\_blank"}                                   | Good, but about 70% (high/med) to 80% (low confidence) coverage for 100 recent contacts                                    | Ok. Coverage is about 26% for 100 recent contacts | Great at 80% coverage using domain match for 100 recent contacts                                                                           | Seems to be available mostly for company size, but industry is spotty and coverage is about ~60% for recent 100 contacts                                                                                                                                                                                                                        |
| **Demographic, such as job title, etc**                | Great / Everything on LinkedIn Profile. Search is UI only; [API access is limited](https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api?context=linkedin%2Fconsumer%2Fcontext){:target="\_blank"} | Limited to select key people, like execs                                                                                   | Ok. Coverage is about 26% for recent 100 contacts | Good at 60% coverage for name, 50% for title / history for 100 recent contacts                                                             | Yes, but: 1\. Coverage is limited to ~60% for org and ~30% for job title based on 100 recent contacts                                                                                                                                                                                                                                           |
| **Export to data warehouse**                           | Only integration with CRM, such as [Salesforce or HubSpot](https://business.linkedin.com/sales-solutions/partners/find-a-partner?selectedFilter=crm#){:target="\_blank"} with limited capabilities (differs per CRM)           | Enterprise plan supports dataset download. API can do exact domain/name and fuzzy search. 200 calls per minute, 1000 limit | CSV upload / download via UI or API               | API or CSV (UI) Contact enrichment is slow at 0.5 secs per call — that's 1.4 hours per 10k records. API offers bulk download, 10 at a time | Recurring/custom export for Enterprise plan only, otherwise manually via UI. Any field visible on the filter/browse screen can be exported via UI                                                                                                                                                                                               |
| **Cost**                                               | Core: $960 per person/year Advanced with CRM integration: $1600 per person/year                                                                                                                                                | API: $10k per year with 30% buy-now discount. CSV Export of all 3m+ companies: $50k with 50% buy-now discount              | About $20k to $25k per year for 100k contacts     | $400 per month for 10k enrichments via API. 4¢ per record. $3k per month for 100k enrichments. 3¢ per record. More plan options            | Many [plans from free to Enterprise](https://www.commonroom.io/pricing/){:target="\_blank"} based on # of contacts and features: 1\. Free up to 500 contacts / 50 orgs 2. Starter at $625/mo up to 35k contacts. 3. Team at $1250/mo up to 100k contacts 4. Enterprise at custom pricing with export to data warehouse feature. \$50k+ per year |

## Continuous enrichment

With the service provider selected, we used [dlt](https://dlthub.com/){:target="\_blank"} and [Apollo.io’s API](https://www.apollo.io/product/api){:target="\_blank"} to enrich new contacts hourly based on priority—prioritizing new contacts before updating existing ones, and so on.

Here's a code snippet in Python that:

1. Gets a list of emails from a prioritized list of contacts from our data warehouse
2. Calls Apollo's API to enrich those contacts.
3. Then saves the enriched information back in another table in our data warehouse.

```Python
def enrich_contact(self, postgres_connect_string, to_schema):
    pipeline = dlt.pipeline(pipeline_name='enrich_contact', destination='postgres', dataset_name=to_schema,
                            credentials=postgres_connect_string)

    @dlt.resource(write_disposition='merge', primary_key='email')
    def enriched_contact():
        with pipeline.sql_client() as psql:
            with psql.execute_query("select email from prioritized_contact") as cursor:
                emails = cursor.fetchall()

        for (email,) in emails:
            enriched = self.people_match(email)  # Call Apollo's "people/match" API
            yield enriched['person']

    print(pipeline.run(enriched_contact))
```

## Modeling for self-service analytics

We added the enriched data, such as organization size and industry, to our customer and contact models. For organization size, we grouped the data into a few categories to simplify analysis for our teams.

```SQL
, case
    when estimated_employees <= 50 then 'Micro'
    when estimated_employees <= 200 then 'Small'
    when estimated_employees <= 1000 then 'Medium'
    when estimated_employees <= 10000 then 'Enterprise'
    when estimated_employees > 10000 then 'Mega Enterprise'
  end as organization_size
```

In our contact model, we also added `left_company_at` to indicate when a contact left the customer organization. This field makes it easy to find out which organizations we should reach out to so that they can stay up to date on important product communications.

## Final thoughts on data enrichment

Enriching our data has already proved valuable. One interesting insight from the enriched data is that our customers come from a mix of micro to mega organizations. Our teams have already used this data to better understand our customers and monitor job changes.

We're now discussing how to use enrichment for additional purposes, such creating ideal customer profiles to make the most of our marketing efforts.

But enrichment isn't free, so we'll continue to evaluate the value we gain relative to the cost and iterate accordingly. And we hope this post can help you shop for an enrichment service that fits your needs.
