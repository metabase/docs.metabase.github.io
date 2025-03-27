---
title: "Collection"
headline: "Collection"
def: A set of items in Metabase, including questions, models, dashboards, and other collections.
related-terms:
  - term: Our analytics
    slug: our_analytics
  - term: Personal collection
    slug: personal_collection
key-article:
  title: Collections documentation
  url: /docs/latest/users-guide/collections
further-reading:
  - title: Working with collection permissions
    url: /learn/permissions/collection-permissions
  - title: Keeping your analytics organized
    url: /learn/metabase-basics/administration/administration-and-operation/same-page
---

## What is a collection?

In Metabase, a **collection** is a set of items — [questions](/glossary/question), [models](/glossary/model), [dashboards](/glossary/dashboard), and subcollections — that are stored together for some organizational purpose. You can think of collections like folders within a file system. The root collection in Metabase is called **Our Analytics**, and it holds every other collection that you and others at your organization create.

You may keep a collection titled "Operations" that holds all of the questions, dashboards, and models that your organization’s ops team uses, so people in that department know where to find the items they need to do their jobs. And if there are specific items within a collection that your team uses most frequently, you can pin those to the top of the collection page for easy reference. Pinned questions in a collection will also render a preview of their visualization.

{% include image_and_caption.html url="/glossary/images/collection/collection-page.png" description="<em>Fig. 1</em>. A look at a collection in Metabase." %}

Administrators can set [collection permissions](/docs/latest/administration-guide/06-collections) to determine which collections (and by extension, their contents) are viewable by which groups in Metabase.

In addition to the top-level Our Analytics collection and whatever collections your organization creates, each Metabase user has their own [Personal collection](/glossary/personal_collection). These are semi-private, in that admin users can view the contents of everyone’s personal collections. Personal collections are a good place to store questions and dashboards that you haven’t quite perfected yet, and you can move them to a public collection whenever you’re ready.
