---
title: "Question"
headline: "Question"
def: "In Metabase, a question is a query, its results, and its visualization."
key-article:
  title: "Asking questions"
  url: /docs/latest/questions/introduction
related-terms:
  - term: Query builder
    slug: query_builder
  - term: Native query
    slug: native_query
  - term: Dashboard
    slug: dashboard
  - term: Saved question
    slug: saved_question
further-reading:
  - title: Learn track on asking questions in Metabase
    url: /learn/metabase-basics/querying-and-dashboards/questions
  - title: Getting started with Metabase
    url: /learn/getting-started/getting-started
---

## What is a question?

In Metabase, a **question** is a query, its results, and its visualization.

If you're trying to figure something out about your data in Metabase, you're probably either asking a question or viewing a question that someone else on your team created. In everyday usage, question is pretty much synonymous with query.

## What you can do with questions in Metabase

You can ask questions in Metabase using the graphical [query builder](/glossary/query_builder) or the [native query editor](/glossary/native_query_editor), and then do things like:

- Save your question to a [collection](/glossary/collection) so that you can come back to or build on it later.
- Add that question to relevant [dashboards](/glossary/dashboard). Questions on a dashboard are known as [cards](/glossary/card).
- Set up email or Slack [alerts](/glossary/alert) on your question.
- Share the results of your question by [sending links](/learn/metabase-basics/administration/administration-and-operation/guide-to-sharing-data#lightweight-data-inside-the-org) to people on your team — even to questions that you haven't saved.
- [Download the results](/learn/metabase-basics/administration/administration-and-operation/guide-to-sharing-data#export-and-send) of your question as CSV, XLSX, or JSON.
- Convert your [saved question](/glossary/saved_question) to a [model](/glossary/model).

## Example question

Figure 1 shows a question based on Metabase's [Sample Database](/glossary/sample_database) — the average rating of our company's `Products`, broken out by `Category`. Here we've visualized this question as a [bar chart](/glossary/bar-chart):

{% include image_and_caption.html url="/glossary/images/question/example-question.png" description="<em>Fig. 1</em>. An example question with one summarization, visualized as a bar chart." %}

And figure 2 shows what this same question looks like as a [table](/glossary/table):

{% include image_and_caption.html url="/glossary/images/question/example-question-table.png" description="<em>Fig. 2</em>. The same question, visualized as a table." %}

## Questions and the Metabase API

In the [Metabase API](/learn/administration/metabase-api), you can edit and get information about questions in your Metabase instance using the [`api/card`](/docs/latest/api#tag/apicard) route.
