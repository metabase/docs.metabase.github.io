---
title: Field
headline: Field
def: Sometimes called a column, a field is an attribute of a database table.
related-terms:
  - term: Column
    slug: column
  - term: Field type
    slug: field_type
further-reading:
  - title: A short overview of databases
    url: /learn/databases/database-basics
  - title: Field filter
    url: /learn/sql-questions/field-filters
  - title: Field types
    url: /docs/latest/users-guide/field-types
---

## What is a field?

A field is an attribute of a record in a database table. You can think of a field like the "heading" of a column, or a label on a container of values. Fields in Metabase also contain [metadata](/glossary/metadata) about the values the field contains (see [Field properties](#field-properties)).

## Example field

`Subtotal` is a field in the `Orders` table in the Sample Database included with Metabase.

{% include image_and_caption.html url="/glossary/images/field/field-example.png" description="<em>Fig. 1</em>. Fields in the Orders table of the Sample Database included with Metabase." %}

The fields in a table define the values each record can have in the table.

## Field properties

In Metabase, fields have four properties:

- Field name
- Field description
- [Data type](/glossary/data_type) (like Integer or Text)
- [Field type](/glossary/field_type) (like Income or Foreign key)

In figure 1, the `Subtotal` field has a field type of Income and a data type of Float, as well as a description: "The raw, pre-tax cost of the order. Note that this might be different in the future from the product price due to promotions, credits, etc."

## Columns vs fields

People usually use the terms "column" and "field" interchangeably. They're technically not the same thing, but it usually doesn't matter. See [Columns vs. Fields](/learn/grow-your-data-skills/data-fundamentals/database-basics#columns-vs-fields).
