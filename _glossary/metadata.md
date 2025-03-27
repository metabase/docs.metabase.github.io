---
title: "Metadata"
headline: "Metadata"
def: "Information that describes data to make it easier to find, manipulate, and make use of that data."
related-terms:
  - term: Data dictionary
    slug: data_dictionary
further-reading:
  - title: "Data types and metadata"
    url: /learn/grow-your-data-skills/data-fundamentals/data-types-overview
  - title: "The Data model page: editing metadata"
    url: /docs/latest/data-modeling/metadata-editing
---

## What is metadata?

**Metadata** is information that describes data to make it easier to find, manipulate, and make use of that data.

## Metadata examples

Think about a file on your computer, like a digital image or text document. Among many other attributes, that file has a name, file type, extension, size, and timestamps noting when it was created, last opened, and last modified. This is all metadata — none of those attributes are really the file itself, but they do tell you important things about the file. Understanding and keeping track of this metadata tells both you and your computer how that file should be sorted and handled, like indicating to your computer what software to use when opening that file.

Metadata exists beyond the analytics world, and is found pretty much everywhere. It's important in a wide variety of industries, from photography to libraries to broadcast television, since any organization that handles or generates data needs to be able to find and organize it. Metadata is sometimes human-readable (like the title of a book or field names in a database), but can also to be machine-readable, like an XML or JSON file.

## Metadata in relational databases and data warehouses

In a relational database, metadata includes all the information that make up that database's [schema](/glossary/schema), like the following:

- Table names
- Field names
- Entity keys
- Foreign keys
- Data types
- Views
- Integrity constraints

However, there's more to database metadata than just its schema. User information, business definitions, table and field descriptions, database size, and storage information are all important pieces of metadata too. Depending on how your database is configured, you may store some metadata within the database itself (like table and field names), or in a separate file or set of files that contain all of a database's metadata. This is known as a [data dictionary](/glossary/data_dictionary).

In a [data warehouse](/glossary/data_warehouse), metadata acts like an index or table of contents, defining all of the objects stored within that data warehouse, as well as information about the various [ETL](/glossary/etl) jobs that manipulate data so it can be useful for those who need it.

Metadata about an ETL would likely include the name of the job, its purpose, when and how often it runs, which data the job uses, and where that data ends up. And if that job is properly annotated with plenty of useful metadata, it's then easier for you or a coworker to understand what exactly the job does and why.

## Using metadata in Metabase

Metadata plays a big part in Metabase! For example, designating a column's [field type](/glossary/field_type) (itself a form of metadata) gives Metabase an idea of what that field actually means, so Metabase can know how to format that field or what kind of visualization to show you.

[Models](/learn/getting-started/models) make use of metadata too. Annotating columns with a description when creating a model can go a long way in helping people better understand your data. Figure 1 shows how those descriptions show up when hovering over a column in that model:

{% include image_and_caption.html url="/glossary/images/metadata/hover-description.png" description="<em>Fig. 1</em>. Viewing the <strong>Products</strong> table's metadata in the data reference section." %}

Finally, you can always view table metadata in the [data reference section](/docs/latest/questions/native-editor/data-model-reference) of Metabase's [data browser](/learn/getting-started/data-browser). Figure 2 shows the how that looks for the [Sample Database's](/glossary/sample_database) `Products` table. As you can see, this view provides useful information like column names, descriptions, field types, and data types:

{% include image_and_caption.html url="/glossary/images/metadata/metadata-data-reference.png" description="<em>Fig. 2</em>. Viewing the <strong>Products</strong> table's metadata in the data reference section." %}
