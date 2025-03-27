---
title: "Record"
headline: "Record"
def: "A group of related data with the same structure. A relational database stores each record as a row in a table."
aka: ["Row", "Tuple"]
key-article:
  title: "A short overview of databases"
  url: /learn/databases/database-basics
related-terms:
  - term: Relational database
    slug: relational_database
  - term: Table
    slug: table
  - term: Row
    slug: row
---

## What is a record?

A **record** is a group of related data with the same structure. Just like in a traditional spreadsheet, records in a [relational database](/glossary/relational_database) are stored as horizontal [rows](/glossary/row) within a table, and contain values that correspond with that table's fields, or columns.

Records typically reference a single unit, whether that's a customer, an order, a session, or some other object that your database captures. A record in a database is usually identified by its value in that table's [entity key](/glossary/entity_key) field.

## Example record

Let's take a look at the `Orders` table in Metabase's [Sample Database](/glossary/sample_database) (figure 1).

{% include image_and_caption.html url="/glossary/images/record/orders-table.png" description="<em>Fig. 1</em>. The <strong>Orders</strong> table, where each horizontal row is one record, or group of related data." %}

We see the [fields](/glossary/field) in this table (the columns), like `ID`, `User ID`, `Product ID`, `Subtotal`, and so on. Each record has values that correspond with those fields, and together, those related properties make up one record.

For example, we can see that the record (or row) with the `ID` of **8** was an order with a subtotal of $68.23, a discount of $8.65, and was created on June 17, 2019. The record right below it, with an `ID` of **9**, follows the same structure, even though its values differ.

We can click on the `ID` field to get a better view of a record itself, like in figure 2:

{% include image_and_caption.html url="/glossary/images/record/record-8.png" description="<em>Fig. 2</em>. Viewing the individual record for the order with an <strong>ID</strong> of 8." %}
