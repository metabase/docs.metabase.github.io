---
title: "Normalization"
headline: "Normalization"
def: The process of structuring information in a relational database to reduce redundancy.
key-article:
  title: "Data normalization"
  url: /learn/grow-your-data-skills/data-fundamentals/normalization
related-terms:
  - term: Entity key
    slug: entity_key
  - term: Foreign key
    slug: foreign_key
further-reading:
  - title: A short overview of databases
    url: /learn/databases/database-basics
  - title: Data cubes
    url: /learn/databases/data-cube
---

## What is normalization?

**Data normalization** is the process of structuring information within a [relational database](/glossary/relational_database) to reduce redundancy. Normalizing data ensures that the tables in a database function as efficiently as possible, eliminating ambiguity so that each table serve a singular purpose.

When moving from a denormalized database to a normalized one, you'll probably need to break out your existing tables to create additional, smaller tables. Those new tables will have a narrower focus, and will link to other tables through [entity](/glossary/entity_key) and [foreign keys](/glossary/foreign_key). With normalization comes the added benefit of reducing your overall database size and easing database maintenance, since you're no longer storing the same information in several places.

## Example of data normalization

The normalization process is carried out according to [rules](/learn/grow-your-data-skills/data-fundamentals/normalization#rules-of-normalization) that build upon each other, known as normal forms. First normal form (1NF) states that fields should not store multiple values within a single cell, and that each field within a table should be unique. Here's an example:

### Denormalized table

| Product_ID | Product_name     | Product_color1 | Product_color2 |
| ---------- | ---------------- | -------------- | -------------- |
| P001       | Knit cardigan    | Pink           | Maroon         |
| P002       | Bootcut jeans    | Navy           |
| P003       | Linen vest       | Camel          | Off-white      |
| P004       | Running sneakers | Orange         |

You'll notice that we have two fields containing similar information, about product color. To bring this table in accordance with 1NF, we need to break this table out into two separate tables that can be joined together.

### Normalized product name table

| Product_ID | Product_name     |
| ---------- | ---------------- |
| P001       | Knit blazer      |
| P002       | Bootcut jeans    |
| P003       | Linen vest       |
| P004       | Running sneakers |

### Normalized product color table

| Product_ID | Product_color |
| ---------- | ------------- |
| P001       | Pink          |
| P001       | Maroon        |
| P002       | Navy          |
| P003       | Camel         |
| P003       | Off-white     |
| P004       | Orange        |

Check out our Learn article for examples of [2NF](/learn/grow-your-data-skills/data-fundamentals/normalization#second-normal-form-2nf) and [3NF](/learn/grow-your-data-skills/data-fundamentals/normalization#third-normal-form-3nf). While normal forms beyond these three exist, their use is largely theoretical and the first three should be sufficient for most practical database needs.
