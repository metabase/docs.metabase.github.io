---
title: Row
headline: Row
def: A single group of related data within a table.
aka: ["Record", "Tuple"]
related-terms:
  - term: Record
    slug: record
  - term: Column
    slug: column
  - term: Field
    slug: field
  - term: Table
    slug: table
  - term: Relational database
    slug: relational_database
further-reading:
  - title: A short overview of databases
    url: /learn/databases/database-basics

---

## What is a row?

A **row** is a single group of related data within a [table](/glossary/table). [Relational databases](/glossary/relational_database) contain tables with rows and [columns](/glossary/column) (also known as [records](/glossary/record) and [fields](/glossary/field), respectively).

Columns are vertical, and hold a list of values all from the same field. Rows are your horizontal elements in a table. The values in a row belong to different fields, but all refer to a single unit (like a row that contains information about one customer or one order).

## Row vs. record vs. tuple

Technically speaking, a row is the underlying logical grouping of related data in a table, while a record refers to that same grouping within the context of an application. When it comes to inserting, updating, or deleting in [SQL](/glossary/sql), you're dealing with rows, not records. This is a pretty subtle distinction though, and most people use these terms interchangeably. You'll sometimes see **tuple** used as well, which is a mathematical term for the same concept.

## Example row in Metabase

Figure 1 shows the `Products` table in Metabase's [Sample Database](/glossary/sample_database), with one row highlighted. This row contains information from several different fields, each value relating to one of the products in our inventory (in this case, the Enormous Aluminum Shirt).

{% include image_and_caption.html url="/glossary/images/row/example-row.png" description="<em>Fig. 1</em>. A row in the <strong>Products</strong> table." %}
