# Creating Data Sources

Data Sources pages use components where we add all the content, and templated contents where all the text is already set, except certain variables. Typically, these variables will be database names.

## Basic checklist

1. Add a file to directory `_data-sources`, like `_data-sources/some-name.md`.
2. Add a `data: some-name` frontmatter entry to the file created in 1.
3. Add a `layout: data-sources-new` frontmatter entry to the file created in 1.
4. Add a `website: name.ext` frontmatter entry to the file created in 1.
5. Add a file to `_data/data-sources` like `_data/data-sources/some-name.yml`.
6. Make sure you use the same name in all places marked `some-name` above.
7. Fill out the `yml` file using some of the components listed below, and their APIs.

At the bottom of this document you can find a [simulated page](#simulated-page) with all the components filled out.

### Hiding a link on index page

If you want to hide a link on the index page, add `hide: true` to the frontmatter of the file in `_data-sources/some-name.md`.

### Regular components (you add all the content)

### Intro Component

<img src="/images/docs/data-sources/intro.png" width="400">

This is the left-hand block on the page.

This is the only component whose contents are not in the `.yml` file.

Place its contents as frontmatter in `_data-sources/some-name.md`.

- `title`: Druid
- `data_source`: Druid
- `summary`: a short phrase, no period at the end
- `image`: /images/datasources/some-name.png
- `logo_image`: /images/datasources/circle/some-name.png
- `full_logo_image`: /images/datasources/some-name.png
- `connector`: Official Connector or Partner Connector, or Community Connector
- `doc_link`: typically /docs/latest/databases/connections/some-name
- `website`: the website URL, like https://www.metabase.com

### Yaml Components

Use the components below in `_data/data-sources/some-name.yml`.

#### Title, text and checkmarked list

<img src="/images/docs/data-sources/title-text-and-checks.png" width="500">

- `component`: title-text-and-checks
- `headline`:
  - `text`: the text
  - `is_large`: optional, set to `true` to make the heading larger
- `subheading`: one paragraph
- `list-items`: a list of strings

<hr>

#### Two Checklists

<img src="/images/docs/data-sources/two-checklists.png" width="500">

- `- component`: two-checklists
- `top-checklist`, with entries
  - `headline`: the headline
  - `list-items`: a list of strings
- `bottom-checklist`, with entries
  - `are-list-items-available`: `true`, `false`, or ommitted. If `true`, list item icons will be a checkmark. If `false` or ommitted, they will be an ×.
  - `headline`: the headline
  - `icon`: the prefix for an icon in the `_includes/svg-icons` directory
  - `list-items`: a list of strings
  - `tooltip`: a string

<hr>

#### Two Checklists with Features for All Data Sources

<img src="/images/docs/data-sources/two-checklists-with-features-for-all-data-sources.png" width="500">

- `- component`: two-checklists-with-features-for-all-data-sources
- `bottom-checklist`, with entries
  - `are-list-items-available`: `true`, `false`, or ommitted. If `true`, list item icons will be a checkmark. If `false` or ommitted, they will be an ×.
  - `icon`: the prefix for an icon in the `_includes/svg-icons` directory
  - `tooltip`: a string
  - `list-items`: a list of strings

<hr>

#### Carousel

<img src="/images/docs/data-sources/carousel.png" width="500">

- `component`: carousel
- `items`: list of one of two types
  - `type`: youtube
  - `id`: only the id of the video, like: OK-eq5obu3o
  - `type`: image
  - `src`: path and filename
  - `alt`: alt text

<hr>

#### FAQ

<img src="/images/docs/shared/faq.png" width="500">

- `component`: faq
- `items`: a list of
  - `question`: Text or HTML
  - `answer`: Please wrap each paragraph with a `<p>` tag.
- `contact-box`:
  - `icon`: the prefix for an icon in the `svg-icons` directory
  - `text`: a short phrase or two.
  - `link`:
    - `text`: the text in the link
    - `href`: the URL in the link

<hr>

#### Try Metabase Footer

![image](/images/docs/shared/try-metabase-footer.png)

- `component`: try-metabase-footer
- `headline`: the headline
- `subheading`: typically a phrase
- `link`
  - `text`: the text in the link
  - `href`: the URL in the link

### Templated components (you only add the database name or other variables)

#### Keep everything in your own cluster

- `component`: keep-everything-in-your-cluster
  `db`: the database name

It will render as (content only):

```html
  <h2>Keep everything in your own cluster</h2>
  <p>Self-host Metabase and {{ component.db }} to keep everything on your terms. Get your token and go. Both are open source, with optional cloud-hosting.</p>
```

#### Easy-to-use data exploration tools

- `component`: easy-to-use-data-exploration-tools
  `db`: the database name
  `list-items`: a list of strings

It will render as (content only):

```html
  <h2>Easy-to-use data exploration tools for people of all levels</h2>
  <p>Get business intelligence tool with friendly UX that lets everyone make sense of your data in {{ component.db }}.</p>

  <ul class="checklist-outline">
    <li>Interactive dashboards that load as fast as {{ component.db }} does with click-to-explore functionality.
    <li>Click to drill through on interactive charts and dashboards, zoom in on timelines or areas of interest, and break out for.</li>
    <li>Ask questions with nothing more than clicks in the Query Builder - no SQL required. (or use the SQL editor if that’s more your style).</li>
    <li>Set up models and metrics to give less technical team mates metadata rich starting points, with trickier stuff like joins taken care of.</li>
  </ul>
```

#### In-warehouse Analytics

- `component`: in-warehouse-analytics
  `db`: the database name

It will render as (content only):

```html
  <h2>In-warehouse {{ component.db }} analytics without extracting data</h2>
  <p>Metabase runs direct queries in {{ component.db }} without extracts, so your reports are always up-to-date with your {{ component.db }} data and don’t require moving large data sets.</p>
```

#### Share data with your team or your customers

- `component`: share-data-with-your-team

It will render as (content only):

```html
  <h1>Share data with your team or your customers, easily</h1>
  <p>Put dashboards and charts in front of people with as much interactivity and room to pull threads (or as little) as you want.</p>

  <ul class="checklist-outline">
    <li>Customer-facing analytics is just a snippet away. Embed all of Metabase in your app, or just a dashboard.</li>
    <li>Export charts and dashboards to PDF, CSV, or share via a public link.</li>
    <li>Set up subscriptions for regularly scheduled updates. Even to people without a Metabase login.</li>
    <li>Get alerts when things change unexpectedly.</li>
  </ul>
```

#### Give data access with granularity<

- `component`: give-data-access-with-granularity
  `db`: the database name

It will render as (content only):

```html
  <h1>Give data access with granularity</h1>
  <p>For people of all levels to make sense of your data in MongoDB</p>

  <ul class="checklist-outline">
    <li>Granular permissions for viewing and querying data, so people can see (and do) what they need to and nothing else.</li>
    <li>Manage people and permissions with SSO to map permissions to user groups and attributes.</li>
    <li>Detailed usage analytics lets you see who did what when, for compliance, performance.</li>
  </ul>
```

### Simulated Page

The yml below has several components.

You can use it as a starting point or reference for your page.

```yml
- component: title-text-and-checks
  headline:
    text: Analyze data in your MongoDB
    is_large: true
  subheading: If you’re using MongoDB, you’re probably working with large, diverse - and possibly distributed - data sets. Metabase lets your whole team visualize and explore your data in Mongo. Run MongoDB native queries and analyze non-tabular data. With in-built schema inference and native syntax support, you can plug into MongoDB with no custom connectors required.
  list-items:
    - "Analyze vast amounts of data with a querying layer that sits on top of your data warehouse so your reports run as quick as Mongo."
    - "Metabase lets everyone in your team visualize, query, and run reports without technical skills or needing to ask your data team for help."

- component: carousel
  items:
    - type: youtube
      id: OK-eq5obu3o
    - type: image
      src: /images/stats-dashboard.svg
      alt: Metabase MongoDB analytics
    - type: youtube
      id: LgPiQdkV4g8
    - type: image
      src: https://placehold.co/1600x900
      alt: Metabase MongoDB analytics
    - type: image
      src: /images/stats-dashboard.svg
      alt: Metabase MongoDB analytics

- component: title-text-and-checks
  headline:
    text: Easy-to-use data exploration tools for people of all levels
  subheading: For people of all levels to make sense of your data in MongoDB
  list-items:
    - "Interactive dashboards that load as fast as Mongo does with click-to-explore functionality."
    - "Metabase detects the shape of your data in MongoDB to anticipate visualization needs and drill throughs for things like time-series data."
    - "Set up models and metrics to let your team ask questions and learn from your data in MongoDB without SQL or unique syntax."

- component: title-text-and-checks
  headline:
    text: Give data access with granularity
  subheading: For people of all levels to make sense of your data in MongoDB
  list-items:
    - "Granular permissions for viewing and querying data, so people can see (and do) what they need to and nothing else."
    - "Manage people and permissions with SSO to map permissions to user groups and attributes."
    - "Detailed usage analytics lets you see who did what when, for compliance, performance."

- component: title-text-and-checks
  headline:
    text: Share data with your team or your customers, easily
  subheading: For people of all levels to make sense of your data in MongoDB
  list-items:
    - "Customer-facing analytics is just a snippet away. Embed all of Metabase in your app, or just a dashboard."
    - "Export charts and dashboards to PDF, CSV, or share via a public link."
    - "Set up subscriptions for regularly scheduled updates. Even to people without a Metabase login."
    - "Get alerts when things change unexpectedly."

- component: title-text-and-checks
  headline:
    text: MongoDB analytics without extracting data
    is_large: true
  subheading: Metabase runs direct queries in your MongoDB without extracts, so your reports are always up-to-date with your MongoDB data.

- component: two-checklists
  top-checklist:
    headline: Metabase features with MongoDB
    list-items:
      - Unlimited queries, charts, and dashboards
      - Static embedding powered by Metabase
      - Send dashboards and reports via email and Slack
      - Connect to multiple data sources and integrations
      - Single sign on via SAML, LDAP, or JWT
      - Interactive embedding with white label customization
  bottom-checklist:
    list-heading: Not available with MongoDB
    tooltip: As a NoSQL database, some Metabase features, like pivot tables, data sandboxing, and saved questions as data sources aren’t available with MongoDB. You can access these features with any other SQL databases.
    are-list-items-available: false
    list-items:
      - Pivot tables
      - Data sandboxing
      - Saved questions as data sources

- component: title-text-and-checks
  headline:
    text: Keep everything in your own cluster
  subheading: Self-host Metabase and ClickHouse to keep everything on your terms. Get your token and go. Both are open source, with optional cloud hosting.

- component: faq
  items:
    - question: What’s the best business intelligence tool to connect to MongoDB?
      answer: <p>Metabase is best suited for businesses that need a straightforward way for everyone in the team to self-serve analytics without having to rely too heavily on your data team. It's BI that your team will actually enjoy using, at the right price for your scale.</p>
    - question: How does Metabase connect to MongoDB?
      answer: <p>Credit where it’s due - Domo can be a good fit for larger enterprises or orgs with more extensive data analysis needs, deep pockets, and a lower need for everyone in the org to be able to jump in and run their own reports. It’s got a lot of bells and whistles - and depending on the maturity of your org, your use case and needs, it may be more than you need.</p>
    - question: Can I use permissions from the MongoDB database in Metabase?
      answer: <p>Metabase is trusted by over 60,000 companies with their analytics, from startups who need their first business intelligence tool through to Enterprises. Metabase open source is the go-to choice for founders and solo-developers to let their teams get answers from data on their own so they’re not running the same reports once a month. Metabase Pro and Enterprise is generally chosen by CTOs, CPOs, Heads of Data who have been there, done that with every other BI tool on the market and need a way to make self-service analytics actually happen.</p>
    - question: How can you visualize tables in MongoDB?
      answer: <p>Both Metabase and Domo cater to internal analytics, as well as interactive embedded analytics for customers.</p><p>Metabase is ideal for quick, intuitive data exploration that lets people in your company click around in interactive dashboard and visualizations to learn from data, or create queries with or without SQL.</p><p>Domo may be better suited for complex data analysis and putting detailed visualizations in front of customers.</p>
    - question: How can you query data in MongoDB?
      answer: <p>Metabase is open source with affordable plans available for additional security and governance features, cloud deployment, and fast, unlimited technical help from engineers.</p><p>Domo's pricing is generally higher with user and consumption-based billing and various pricing tiers depending on the use case.</p>
    - question: How to create dashboards using MongoDB?
      answer: <p>Metabase and Domo both let data analysts work in SQL; and less technically savvy people ask questions without SQL. Metabase's intuitive Query Builder lets non-technical or data savvy people put together analyses with clicks - no SQL necessary. Analysts and data people who prefer to write SQL can fill their boots in the SQL editor.</p>

- component: try-metabase-footer
  headline: Try Metabase Starter 14 days free
  subheading: Connect to your MongoDB to Metabase, set up in 5 minutes, and start uncovering insights from your data straight out of the box.
  link:
    href: https://store.metabase.com/checkout
    text: Get started
```
