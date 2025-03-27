---
title: "Metabase expert CaseWhen helps Linstol become more data-driven."
summary: "Linstol, the largest supplier of headphones/earbuds in the world (bigger than Samsung), embeds Metabase in their web portal to stay on top of their inventories."
redirect_from:
  - /case_studies/linstol
company_name: "Linstol"
industry: Travel & Hospitality
employees: 30+
headquarters: Naples, Florida
logo_image: /images/case-studies/linstol-logo.png
key_usecases: Business Intelligence:/product/business-intelligence,Interactive dashboards:/product/interactive-dashboards
image: /images/case-studies/linstol-og.jpg
featured_image: /images/case-studies/linstol-cover-2.jpg
the_challenge: Linstol needed a more efficient way to manage product inventories and customer data, as their existing manual processes were time-consuming and lacked real-time insights.
the_solution: Linstol hired Metabase expert CaseWhen to implement Metabase, automating data processes and embedding real-time dashboards directly into their internal web portal, which made it easier for teams to work with their data.
the_results: By using Metabase, Linstol increased operational efficiency by 50% for Account Managers, improved inventory management, and made data-driven decision-making easier across the company.
blockquote: Metabase speeds up operational tasks for Account Managers by 50%. It can tell managers exactly when inventories need to be replenished, which saves a lot of work related to avoiding inventory depletion.
speaker_name: Matthew Dunham-Novoa
speaker_title: Process Innovation Manager at Linstol
speaker_photo: /images/case-studies/matthew-dunhan.jpeg
---

[Linstol](https://linstol.com/){:target="\_blank"} is a company that designs, manufactures, and supplies various amenity products and passenger comfort items for airlines. These items include headphones, amenity kits, skin care, blankets, and other in-flight products. Linstol works with airlines to create custom solutions that align with each airline's brand and passenger needs.

#### Why Metabase?

Linstol needed a more efficient way to manage product inventories across its customers and warehouse locations. Account Managers previously relied on a transaction-based web portal that displayed customer sales orders, manufacturer purchase orders, and inventory forecasts in a table format. While the web portal provided detailed information, it made it challenging to quickly answer key questions, such as:

- "Do we have enough inventory for this product right now?"
- "When will we run out of inventory at the current usage rate?"
- "Is this customer's usage of the product increasing or decreasing?"

As Linstol grew and customer demand increased, manually finding answers to these questions became time-consuming and inefficient. The company needed a solution to automate these processes and improve customer service.

Linstol chose Metabase based on recommendations from developers who had previously used the platform. While Linstol was aware of other BI tools like Looker, they were seeking a more cost-effective solution with robust features. The Linstol team primarily chose Metabase because of its ability to embed directly into their internal web portal, in addition to Metabase’s attractive price point, ease of use, and sleek design.

Due to limited resources, building a custom analytics solution in-house wasn't an option for Linstol.
**“We’re a lean team and building was not an option, plus Metabase’s pricing made the decision easy.”**, says Matthew.

To set up Metabase, Linstol hired [CaseWhen](/partners/casewhen){:target="\_blank"}, a Metabase expert based in Berlin specializing in data and business intelligence. Austin from CaseWhen helped Linstol improve their Account Managers' web portal with simple yet powerful visualizations, making it easier for them to use the data they already had.

What Austin did:

- Helped define source-of-truth KPIs across account management.
- Worked with engineering to bring in additional data points from the backend needed for front-end reporting.
- Built a lineage of reporting tables to surface these KPIs in the team’s very first Data Warehouse.
- Set up custom data validation checks and alerting through Metabase’s [alerts feature](/docs/latest/questions/alerts){:target="\_blank"}.

#### The data

Linstol analyzes the following data:

- Products
- Customers (e.g., airlines)
- Transactions
- Sales orders (from customers)
- Purchase orders (to manufacturers)
- Warehouse inventory levels
- Product usage patterns

MoneyWorks is the main inventory management tool used by Account Managers. Data from MoneyWorks is replicated to a PostgreSQL database, where it is transformed and displayed on an internal web portal. Metabase allows Account Managers to quickly access comprehensive data and trends, which are not visible in MoneyWorks.

The web portal includes Metabase dashboards based on the same PostgreSQL database, providing additional insights. People can also access more dashboards directly through Metabase’s interface.

#### How Linstol team uses Metabase

Linstol embeds Metabase dashboards directly into its internal web portal so that  Account Managers have everything they need in one place. These real-time dashboards provide insights into product movement and inventory levels, which improves efficiency in supply-chain decisions.

For reporting, Linstol uses Metabase's query builder with pre-modeled tables for easy dashboard creation. For operational needs, Linstol runs PostgreSQL functions through Metabase's SQL editor to fetch real-time data.

As data complexity grows, Linstol uses Metabase Alerts to monitor data quality and automatically notify Account Managers of issues. This setup ensures proactive data validation.

Metabase provides Linstol with real-time data access for daily operations, batch data for reporting, and automated alerts for critical data checks.

![Example of Linstol dashboard made with Metabase](/images/case-studies/linstol-metabase-dashboard.jpg)

#### The results

Without Metabase, Linstol would still be manually pulling data in Numbers or Excel and lacking an integrated overview in their web portal. Account Managers would rely on scanning through rows of data and making educated guesses.

While experienced Account Managers could work with the raw data, training new Account Managers on this outdated system was challenging. Metabase's visualizations and alerts have made it easier to work with their data, increasing productivity and standardizing decision-making processes across the team.

Metabase adoption was quick because the advantages were clear. The visualizations embedded in the web portal met Linstol’s needs, aligning perfectly with their vision for a comprehensive data solution.
