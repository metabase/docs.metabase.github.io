# Creating Landing Pages

## Basic checklist

1. Add a file to directory `_lp`, like `_lp/some-name.html`.
2. Add a `data: some-name` metadata entry to the top of the file created in 1.
3. Add a file to `_data/landing-pages` like `_data/landing-pages/some-name.yml`.
4. Make sure you use the same name in all places marked `some-name` above.
5. Fill out the `yml` file using some of the components listed below, and their APIs.

At the bottom of this document you can find a [simulated page](#simulated-page) with all the components filled out.

## Components

### Header

![image](/images/docs/landing-pages/header.png)

- `-component: header`
- `hide-menu`: true or empty

<hr>

### Hero A

![image](/images/docs/landing-pages/hero-a.png)

- `- component: hero-a`
- `headline`: the headline
- `subheading`: typically a phrase
- `links`: a list of
  - `text`: the text in the link
  - `href`: the URL in the link
  - `extra-classes`: pass custom classes, for example `btn-outline-blue` to make it outlined
- `media`, with entries
  - `type`: use `image`, `video`, or `youtube`
  - `src`: if `type` is `image`, the path and filename. If type is `youtube`, the embed URL, looking like https://www.youtube.com/embed/5ZLtyTU2qIQ.
  - `alt`: if `type` is `image`, an alt string
  - `id`: if `type` is `video`, a string that is unique to the page
  - `poster`: if `type` is `video`, the path and filename for the fallback image, which can be a gif
  - `source_mp4`: if `type` is `video`, the path and filename for the mp4 video
  - `source_webm`: if `type` is `video`, the path and filename for the webm video

<hr>

### Hero B

![image](/images/docs/landing-pages/hero-b.png)

- `- component: hero-b`
- `headline`: the headline
- `subheading`: optional, typically a phrase
- `badge-text`: typically a word or short phrase
- `links`: a list of
  - `text`: the text in the link
  - `href`: the URL in the link
  - `extra-classes`: pass custom classes, for example `btn-outline-blue` to make it outlined
- `media`, with entries
  - `type`: use `image` or `video`
  - `src`: if `type` is `image`, the path and filename. If type is `youtube`, the embed URL, looking like https://www.youtube.com/embed/5ZLtyTU2qIQ.
  - `alt`: if `type` is `image`, an alt string
  - `id`: if `type` is `video`, a string that is unique to the page
  - `poster`: if `type` is `video`, the path and filename for the fallback image, which can be a gif
  - `source_mp4`: if `type` is `video`, the path and filename for the mp4 video
  - `source_webm`: if `type` is `video`, the path and filename for the webm video

<hr>

### Hero C

![image](/images/docs/landing-pages/hero-c.png)

- `- component: hero-c`
- `headline`: the headline
- `subheading`: typically a phrase
- `badge-text`: typically a word or short phrase
- `links`: a list of
  - `text`: the text in the link
  - `href`: the URL in the link
  - `extra-classes`: pass custom classes, for example `btn-outline-blue` to make it outlined
- `cards`: a list of
  - `headline`: the headline
  - `text`: typically a short paragraph
  - `icon`: the prefix for an icon in the `svg-icons` directory

<hr>

### Hero with Embedded Iframe

![image](/images/docs/landing-pages/hero-with-embedded-iframe.png)

- `- component: hero-with-embedded-iframe`
- `headline`: the headline
- `subheading`: typically a phrase
- `embed`: a string of HTML, typically an iframe
- `media`, with entries
  - `type`: use `image` or `video`
  - `src`: if `type` is `image`, the path and filename. If type is `youtube`, the embed URL, looking like https://www.youtube.com/embed/5ZLtyTU2qIQ.
  - `alt`: if `type` is `image`, an alt string
  - `id`: if `type` is `video`, a string that is unique to the page
  - `poster`: if `type` is `video`, the path and filename for the fallback image, which can be a gif
  - `source_mp4`: if `type` is `video`, the path and filename for the mp4 video
  - `source_webm`: if `type` is `video`, the path and filename for the webm video

<hr>

### Customer Logos

![image](/images/docs/landing-pages/customer-logos.png)

- `- component: customer-logos`

<hr>

### Feature Container

![image](/images/docs/landing-pages/feature-container.png)

- `component: feature-container`
- `headline`: the headline
- `subheading`: typically a phrase
- `list-items`: a list of strings or HTML
- `right-hand-list-items`: a list of strings or HTML. These will be displayed in the colored box to the right.
- `media`, with entries
  - `type`: use `image` or `video`
    - `src`: if `type` is `image`, the path and filename. If type is `youtube`, the embed URL, looking like https://www.youtube.com/embed/5ZLtyTU2qIQ.
  - `alt`: if `type` is `image`, an alt string
  - `id`: if `type` is `video`, a string that is unique to the page
  - `poster`: if `type` is `video`, the path and filename for the fallback image, which can be a gif
  - `source_mp4`: if `type` is `video`, the path and filename for the mp4 video
  - `source_webm`: if `type` is `video`, the path and filename for the webm video

<hr>

### Feature Container Reverse

![image](/images/docs/landing-pages/feature-container-reverse.png)

- `component: feature-container-reverse`
- `headline`: the headline
- `subheading`: typically a phrase
- `list-items`: a list of strings or HTML
- `left-hand-list-items`: a list of strings or HTML. These will be displayed in the colored box to the right.
- `media`, with entries
  - `type`: use `image` or `video`
  - `src`: if `type` is `image`, the path and filename. If type is `youtube`, the embed URL, looking like https://www.youtube.com/embed/5ZLtyTU2qIQ.
  - `alt`: if `type` is `image`, an alt string
  - `id`: if `type` is `video`, a string that is unique to the page
  - `poster`: if `type` is `video`, the path and filename for the fallback image, which can be a gif
  - `source_mp4`: if `type` is `video`, the path and filename for the mp4 video
  - `source_webm`: if `type` is `video`, the path and filename for the webm video

<hr>

### Two Checklists

![image](/images/docs/landing-pages/two-checklists.png)

- `component: two-checklists`
- `left-checklist`, with entries
  - `headline`: the headline
  - `subheading`: typically a phrase
  - `list-items`: a list of strings or HTML

- `right-checklist`, with entries
  - `headline`: the headline
  - `subheading`: typically a phrase
  - `list-items`: a list of strings or HTML

<hr>

### Comparison Table

![image](/images/docs/landing-pages/comparison-table.png)

- `component: comparison-table`
- `headline`: the headline
- `subheading`: typically a phrase
- `option1`: header of the table, a word or two
- `option2`: header of the table, a word or two
- `rows`: a list of
  - `text`: a short phrase
  - `option1`: `check` for a tick, or empty, a string or HTML
  - `option2`: `check` for a tick, or empty, a string or HTML
- `link`
  - `text`: the text in the link
  - `href`: the URL in the link

<hr>

### Testimonial

![image](/images/docs/landing-pages/testimonial.png)

- `component: testimonial`
- `testimony`: Typically a paragraph
- `image`, with entries
  - `src`: the path and filename
  - `alt`: an alt string
- `author`: Name of the person
- `role-and-company`: Role of the person in the company, Company

<hr>

### FAQ

![image](/images/docs/shared/faq.png)

- `component: faq`
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

### Three Cards

![image](/images/docs/landing-pages/three-cards.png)

- `component: three-cards`
- `headline`: a short phrase or two
- `cards`: a list of three
  - `icon`: the prefix for an icon in the `svg-icons` directory
  - `headline`: a short phrase or two
  - `text`: can be plain text or HTML

<hr>

### Three Cards with Variable Heights

![image](/images/docs/landing-pages/three-cards.png)

- `component: three-cards-variable-heights`
- `headline`: a short phrase or two
- `cards`: a list of three
  - `image`, with entries
    - `src`: the path and filename
    - `alt`: an alt string
    - `headline`: a short phrase or two
    - `text`: can be plain text or HTML

<hr>

### Full Width Sky Blue

![image](/images/docs/landing-pages/full-width-sky-blue.png)

- `component: full-width-sky-blue`
- `headline`: the headline
- `subheading`: typically a phrase or two
- `image`
  - `src`: the path and filename
- `links`: a list of
  - `text`: the text in the button
  - `href`: the link in the button
  - `extra-classes`: pass custom classes, for example `full-width-sky-blue__cta--clear` to make it outlined
  - `quote`:
  - `avatar`: path and filename of the image
  - `text`: typically a paragraph or two
  - `author`: name of the person
  - `role-and-company`: Role of the person in the company, Company

<hr>

### Feature and Rolling Testimonials

![image](/images/docs/landing-pages/feature-and-rolling-testimonials.png)

- `component: feature-and-rolling-testimonials`
- `headline`: the headline
- `subheading`: typically a phrase or two
- `text-before-list`: typically a phrase
- `list-items`: a list of strings, typically 1 or 2 phrases each

<hr>

### Feature and Rolling Databases

![image](/images/docs/landing-pages/feature-and-rolling-databases.png)

- `component: feature-and-rolling-databases`
- `headline`: the headline
- `subheading`: typically a phrase or two
- `list-items`: a list of strings, typically 1 or 2 phrases each

<hr>

### CTAS

![image](/images/docs/landing-pages/ctas.png)

- `component: ctas`
- `title`: A string or HTML
- `cta`:
  - `text`: the text in the link
  - `href`: the URL in the link
- `items`:
  - `badge`: A word or two
  - `text`: the text in the link
  - `href`: the URL in the link

<hr>

### Event

![image](/images/docs/landing-pages/event.png)

- `component: event`
- `headline`: the headline
- `subheading`: typically a phrase or two
- `slug`: the slug from an event in `\_data/events.yml`.

<hr>

### Try Metabase Footer

![image](/images/docs/shared/try-metabase-footer.png)

- `component: try-metabase-footer`

- `headline`: the headline

- `subheading`: typically a phrase

- `link`
  - `text`: the text in the link
  - `href`: the URL in the link

<hr>

### Footer

![image](/images/docs/landing-pages/footer.png)

- `component: footer`

## Simulated Page

The yml below has several components, each using all the attributes possible.

You can use it as a starting point or reference for your page.

```yml
- component: header
  hide-menu: true

- component: hero-a
  headline: Don't be a bottleneck
  subheading: Fast analytics with the friendly UX and integrated tooling to let your company explore data on their own.
  links:
    - text: Get started
      href: https://store.metabase.com/checkout
      extra-classes: btn-primary
    - text: Watch demo
      href: /demo
      extra-classes: btn-outline-blue
  media:
    type: image
    src: /images/landing-pages/hero-sample-image.png
    alt: An alt for the image

- component: hero-b
  badge-text: CSV Upload
  headline: Upload and analyze your spreadsheets in Metabase
  subheading: Analyze CSV data with Metabase’s query builder. It’s simple enough for anyone on the team to use—no SQL or data expertise needed.
  media:
    type: video
    id: csv-uploads
    source_mp4: /images/product/csv-uploads/csv-uploads.mp4
    poster: /images/product/csv-uploads/csv-uploads.gif
  links:
    - text: Get started
      href: https://store.metabase.com/checkout
      extra-classes: btn-primary
    - text: Watch demo
      href: /demo
      extra-classes: btn-outline-blue

- component: hero-c
  headline: Self-service analytics<br />on your terms
  subheading: The simple but powerful Metabase you love, with tighter security and permissions, interactive embedding, and a reasonable price tag.
  buttons:
    - label: Get started
      href: https://store.metabase.com/checkout
      extra-classes: btn-primary
    - label: Watch demo
      href: /demo
      extra-classes: btn-outline-blue
  cards:
    - icon: coin
      headline: Get a custom quote
      text: Based on your use case and requirements to keep up with you as you scale.
    - icon: document
      headline: No credit card required (to trial, or after)
      text: We’ll work with your procurement team for invoicing and your preferred payment method.
    - icon: modules
      headline: Modular contracts
      text: Get to proof of concept faster with <a href="/product/professional-services">professional services</a>, and onboarding for your whole team.

- component: customer-logos

- component: feature-container
  headline: Set Row-level permissions so people only see data they need to
  subheading: Make privacy a priority with more control over what to show and what to hide in data sandboxes.
  list-items:
    - "<b>Oversee what people can see and do</b> with row-, and column-level permissions."
    - "<b>Manage group permissions</b> manually or via SSO to filter their table views."
    - "<b>Block whole groups of people</b> to keep data in selected databases off-limits."
  media:
    type: video
    id: row-level-permissions
    source_mp4: /images/product/pro/row-level-permissions.mp4" type="video/mp4
    poster: /images/product/pro/row-level-permissions.gif

- component: feature-container-reverse
  headline: Set Row-level permissions so people only see data they need to
  subheading: Make privacy a priority with more control over what to show and what to hide in data sandboxes.
  list-items:
    - "<b>Oversee what people can see and do</b> with row-, and column-level permissions."
    - "<b>Manage group permissions</b> manually or via SSO to filter their table views."
    - "<b>Block whole groups of people</b> to keep data in selected databases off-limits."
  media:
    type: video
    id: csv-uploads
    source_mp4: /images/product/pro/row-level-permissions.mp4" type="video/mp4
    poster: /images/product/pro/row-level-permissions.gif
  media:
    type: video
    id: row-level-permissions-2
    source_mp4: /images/product/pro/row-level-permissions.mp4" type="video/mp4
    poster: /images/product/pro/row-level-permissions.gif

- component: testimonial
  testimony: Advanced permissions and row filtering are essential features for us! They enable us to effortlessly create scalable dashboards that display only the information that a user is authorized to view. Metabase has become an essential tool in our workflow.
  image:
    src: /images/profiles/arthur-benhamou.png
    alt: Photo of Arthur Benhamou
  author: Arthur Benhamou
  role-and-company: Chief Operations Officer, Comptoir de L’or

- component: faq
  items:
    - question: Question 1
      answer: <p>Answer 1</p>
    - question: Question 2
      answer: <p>Answer 2</p>
    - question: Question 3
      answer: <p>Answer 3</p>
    - question: Question 4
      answer: <p>Answer 4</p>
    - question: Question 5
      answer: <p>Answer 5</p>
  contact-box:
    icon: balloon-squarish
    text: Have more questions? We’d be happy to help.
    link:
      text: Contact us
      href: /talk-to-a-person/

- component: three-cards
  headline: Premium service without breaking the bank
  cards:
    - icon: coin
      headline: Get a custom quote
      text: Based on your use case and requirements to keep up with you as you scale.
    - icon: document
      headline: No credit card required (to trial, or after)
      text: We’ll work with your procurement team for invoicing and your preferred payment method.
    - icon: modules
      headline: Modular contracts
      text: Get to proof of concept faster with <a href="/product/professional-services">professional services</a>, and onboarding for your whole team.

- component: full-width-sky-blue
  headline: Ready to get started?
  subheading: Get up and running with a 14-day free trial in 5 minutes. Or get in touch with our sales team to talk to an expert.
  image:
    src: "/images/landing-pages/full-width-sky-blue-sample-image.png"
  links:
  - text: Get started
    href: https://store.metabase.com/checkout
  - text: Watch demo
    href: /demo
    extra-classes: full-width-sky-blue__cta--clear
  quote:
    avatar: /images/profiles/sincera_ian-meyers.png
    text: "Metabase was the embedded solution we were looking for: easy-to-integrate, customizable and performant."
    author: Ian Meyers
    role-and-company: Co-Founder at Sincera

- component: comparison-table
  headline: Wait, isn’t there a free version of Metabase?
  subheading: Sometimes the best things in life are free, like unconditional love, and <a href="/start/oss/">awesome open source software</a>. And sometimes it’s worth paying a little extra for convenience and accessible technical support.
  option1: Competitor
  option2: Metabase
  rows:
    - text: Unlimited questions
      option1: check
      option2: check
    - text: Unlimited charts
      option1: check
      option2: check
    - text: 15+ visualization types
      option1: check
      option2: check
    - text: Scheduled updates and alerts via email and Slack
      option1: check
      option2: check
    - text: Connects to 20+ database types, including CSV upload
      option1: check
      option2: check
    - text: SOC2 Type II Compliance
      option1: check
      option2: check
    - text: Unlimited technical support
      option1: check
      option2: check
  link:
    text: See all features <img src="/images/chevron_blue_right.svg"/>
    href: /pricing/#compare

- component: try-metabase-footer
  headline: Try Metabase Starter 14 days free
  subheading: Pay as you go, or get 10% off with an annual subscription.
  link:
    href: https://store.metabase.com/checkout
    text: Get started

- component: footer
```
