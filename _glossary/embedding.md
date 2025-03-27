---
title: Embedding
headline: Embedding
def: Placing some functionality of one app inside another. Metabase uses iframes to embed questions, dashboards, or (in some plans) the full Metabase application.
key-article:
  title: "Embedding charts and dashboards in your website"
  url: /learn/embedding/embedding-charts-and-dashboards
related-terms:
  - term: Public embed
    slug: public_embed
  - term: Secure embed
    slug: secure_embed
  - term: Parameter
    slug: parameter
  - term: White labeling
    slug: white_labeling
further-reading:
  - title: Docs on embedding questions and dashboards in other applications
    url: /docs/latest/administration-guide/13-embedding
  - title: Docs on interactive embedding
    url: /docs/latest/embedding/interactive-embedding
  - title: Customer-facing analytics
    url: /learn/metabase-basics/embedding
  - title: GitHub repository with embedding examples
    url: https://github.com/metabase/embedding-reference-apps
---

## What is embedding?

**Embedding** is the process of placing some functionality of one application inside another. In analytics, this usually means integrating data visualizations into a parent application, allowing people to view charts within the context of the their own application. Embedding can save time and resources for the parent app too, allowing teams to draw on existing analytics tools rather than building everything from scratch themselves.

While not the only way to embed something, embedding in Metabase involves using an iframe (an inline frame) to place a [question](/glossary/question), [dashboard](/glossary/dashboard), or (in some [plans](/pricing/)) the full Metabase app within another application.

## Embedding Metabase charts and dashboards

Embedding is more than just placing a static image of a chart into your site or app. Instead, that iframe creates a nested browser within your main browser or app that points to its own, separate URL. This way, the embedded Metabase chart or dashboard stays up to date. When you view an embedded chart, you're still seeing the Metabase chart itself — just nested in the parent application.

Depending on security configurations, your individual embedded charts and dashboards are either [public](/glossary/public_embed) or [secure embeds](/glossary/secure_embed). You can also configure or lock [parameters](/glossary/parameter) to affect what people see on those charts, like in figure 1:

{% include image_and_caption.html url="/glossary/images/embedding/publish-dashboard.gif" description="<em>Fig. 1</em>. Making parameters editable and enabling dark mode before publishing a dashboard for embedding." %}

## Embedding the full Metabase application

{% include plans-blockquote.html feature="Interactive embedding" %}

With some plans, you're able to embed the full Metabase experience within your application. Interactive embedding is particularly useful for [multi-tenant](/glossary/multitenancy) analytics, like providing your customers specific reports that they can view and interact with all while remaining in your app.
