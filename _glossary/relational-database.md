---
title: "Relational database"
headline: "Relational database"
aka: ["Relational database management system", "RDBMS"]
def: "A collection of tabular data, or the application that manages the storage and retrieval of tabular data."
key-article:
  title: "A short overview of databases"
  url: /learn/databases/database-basics
related-terms:
  - term: Column
    slug: column
  - term: Row
    slug: row
  - term: Field
    slug: field
  - term: Record
    slug: record
  - term: Table
    slug: table
  - term: Normalization
    slug: normalization
  - term: Schema
    slug: schema
  - term: ERD
    slug: erd
further-reading:
  - title: Database fundamentals track
    url: /learn/databases
redirect_from:
  - /glossary/relational_database
---

## What is a relational database?

A **relational database** is a collection of tabular data, or the application that manages the storage and retrieval of tabular data. Relational databases contain [tables](/glossary/table), made up of [columns](/glossary/column) (also known as [fields](/glossary/field)) and [rows](/glossary/row) (also known as [records](/glossary/record)).

You'll establish relationships between tables in a database by assigning a single field to two or more tables. For one of those tables, that field will be designated as an [entity key](/glossary/entity_key), while for the other(s) it'll be a [foreign key](/glossary/foreign_key). With these relationships in place, you can query data (probably using [SQL](/glossary/sql)) across tables without having to reorganize or duplicate that data.

Introduced in the early 1970s, relational databases remain a (if not _the_) dominant model for structuring data today. While technically a relational database refers to your data itself and a **relational database management system (RDBMS)** refers to the software application you use to manage that data, in reality people use the terms interchangeably. The relational model is so prevalent that in many contexts, the word "database" itself implies a relational one, unless otherwise specified.

## Example relational database

Metabase's [Sample Database](/glossary/sample_database) (the one you see used in examples throughout our [docs](/docs/latest/) and [tutorials](/learn/)) is an [H2](/docs/latest/administration-guide/databases/h2) relational database. Figure 1 shows a look at the four tables in the Sample Database:

{% include image_and_caption.html url="/glossary/images/relational-database/tables-in-sample-db.png" description="<em>Fig. 1</em>. Metabase's Sample Database (a relational database) contains four tables: <strong>Products</strong>, <strong>Orders</strong>, <strong>People</strong>, and <strong>Reviews</strong>." %}
