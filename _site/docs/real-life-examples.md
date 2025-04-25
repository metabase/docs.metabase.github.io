# Creating Example of Metabase in Real Life

## Basic checklist

1. Add a file to directory `_examples`, like `_examples/YYYY-MM-DDsome-name.html`. Please note that pages are ordered from most recent to least recent, according to the prepend date in the filename prefix.

Be sure to add a `permalink` to the frontmatter of the file, like `/examples/some-name/`. Typically, the permalink is the same as the filename, but without the date prefix.

At the bottom of this document you can find a [simulated page](#simulated-page) with components filled in.

### Intro Component

<img src="/images/docs/public-metabase-examples/intro.png" width="400">

This is the left-hand block on an example page.

Place its contents as frontmatter in `_examples/some-name.html`.

- `title`: Druid
- `summary`: a short phrase, no period at the end
- `dashboard_url`: the URL of the dashboard
- `thumbnail`: /images/examples/your-name.png, should be 1164 × 720px including a blue background and a box-shadow under the screenshot
- `categories`: please use the same name as listed in`\_data/public-metabase-example-categories.yml`

### Other Components

Add the components as frontmatter under the key `components` in your html file.

### Title Component

- `component`: title
- `text`: the text

<hr>

### Paragraph

- `component`: paragraph
- `text`: the text

<hr>

### Numbered List

<img src="/images/docs/public-metabase-examples/numbered-list.png" width="500">

- `component`: numbered-list
- `headline`: the headline
- `list-items`: a list of
  - `title`: the title
  - `text`: the text

<hr>

### Testimonial

<img src="/images/docs/public-metabase-examples/testimonial.png" width="500">

- `component`: testimonial
- `text`: the text
- `author`:
  - `name`: author's name
  - `company`: author's company and position, comma-separated
  - `image`: the url

<hr>

### Simulated Page

The yml below has several components.

You can use it as a starting point or reference for your page.

```html
- component: title
  text: Developed vs. Developing World Finance

- component: paragraph
  text: Tracks donations, grants, and expenses, offering a clear view of funds raised versus goals. It shows funding by source and allocation across projects, helping NGOs monitor financial health and plan future fundraising.

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

- component: paragraph
  text: The INDIGO project at Oxford University, which kindly consented to the reproduction of their dataset, has been mapping the development and growth of outcomes funds — and government outcomes commissioning generally — since 2010.

- component: paragraph
  text: Their dataset includes both a snapshot of deployed outcomes as well as a pipeline dataset which provides interesting clues into the outcomes-based financing programmes being developed around the world.

- component: testimonial
  headline: A word from Metabase team
  text: Their dataset includes both a snapshot of deployed outcomes as well as a pipeline dataset which provides interesting clues into the outcomes-based financing programmes being developed around the world.
  author:
    image: /images/events/guests/margaret-rimek.jpeg
    name: Margaret Rimek
    company: Growth & Partnerships, Metabase

- component: numbered-list
  headline: How to use Metabase to build a dashboard like this
  items:
    - title: Skip the custom quote
      text: That's right, no sales calls necessary—just sign up, and get running in under 5 minutes.
    - title: Plugin your database
      text: We connect to the most popular production databases and data warehouses.
    - title: Build your dashboards
      text: Invite your team and start building dashboards—no SQL required.

```
