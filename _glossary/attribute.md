---
title: Attribute
headline: Attribute
def: An attribute is a property that describes or identifies some entity. In some Metabase plans, user attributes are used to restrict which data people can access.
related-terms:
  - term: Field
    slug: field
  - term: Column
    slug: column
  - term: SSO
    slug: sso
further-reading:
  - title: "Authenticating with Google Sign-In or LDAP"
    url: "/docs/latest/administration-guide/10-single-sign-on"
  - title: "Data sandboxing: setting row-level permissions"
    url: /learn/permissions/data-sandboxing-row-permissions
  - title: "Advanced data sandboxing: limiting access to columns"
    url: /learn/permissions/data-sandboxing-column-permissions
---

## What is an attribute?

An **attribute** is a property that describes or identifies some entity.

People in the data world use "attribute" in a few different contexts, so we'll do our best to disambiguate here. Basically, an attribute is a characteristic of _something_. That something might be a table, but attribute could also refer to a characteristic of a specific record, like [user attributes](#user-attributes-in-metabase) in Metabase.

## Attributes in relational databases

In [relational databases](/glossary/relational_database), people often use attribute synonymously with [column](/glossary/column) or [field](/glossary/field), like how a product's `Category` is an attribute of (or describes) that product. This usage of attribute comes up a lot within the context of [data modeling](/glossary/data_model) and when designing [entity relationship diagrams](/glossary/erd).

## Example attribute

Here's a look at the `People` table in Metabase's [Sample Database](/glossary/sample_database), which includes fields like `ID`, `Name`, `Address`, `City`, `State`, and so on:

{% include image_and_caption.html url="/glossary/images/attribute/attribute-people-table.png" description="<em>Fig. 1</em>. A look at the <strong>People</strong> table." %}

Each of these fields is an attribute — the values in those fields describe something about the record they're associated with, in this case a "person" in the `People table`.

## User attributes in Metabase

{% include plans-blockquote.html feature="Sync user attributes" %}

Attribute can also refer to a distinct [variable](/glossary/variable) value that gets associated with a certain user, like a `User_ID`. That structure is known as a **key-value pair**, sometimes referred to as an attribute-value pair.

In Metabase, [some plans](/pricing/) allow you to set user attributes yourself (or pass them to Metabase via [SSO](/glossary/sso)). You can use these user attributes to set up [custom destinations](/learn/metabase-basics/querying-and-dashboards/dashboards/custom-destinations) on a dashboard, for example by using a user ID to [parameterize](/glossary/parameter) a URL when that user clicks on a chart.

User attributes are also an important part of [data sandboxes](/docs/latest/enterprise-guide/data-sandboxes), which give you granular control over the data that people using your Metabase instance can access. Since data sandboxes are associated with individual users, setting distinct user attributes lets Metabase know exactly how to filter a table depending on who views it.
