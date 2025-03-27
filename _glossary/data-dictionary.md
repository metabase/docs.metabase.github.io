---
title: Data dictionary
headline: Data dictionary
def: A document that describes the tables, fields, and other elements in a database and explains their meaning and origin.
related-terms:
  - term: Metadata
    slug: metadata
  - term: Data reference
    slug: data_reference
  - term: Schema
    slug: schema
  - term: Data model
    slug: data_model
further-reading:
  - title: "Exploring data with Metabase's data browser"
    url: /learn/metabase-basics/getting-started/data-browser
  - title: "Data reference documentation"
    url: /docs/latest/questions/native-editor/data-model-reference
redirect_from:
  - /glossary/data_dictionary
---

## What is a data dictionary?

A **data dictionary** is a document that describes the tables, fields, and other elements in a database and explains their meaning and origin. Data dictionaries are repositories for a database's [metadata](/glossary/metadata), storing the administrative information that people need to understand and make use of that data. Think of them like a typical dictionary, but instead of every word in a language, data dictionaries contains definitions and about the objects that make up your database.

An up-to-date and comprehensive data dictionary helps make sure that everyone stays on the same page about what certain fields or tables mean in practice. Data dictionaries can also help make sure that different departments are all using those terms consistently.

Data dictionaries are usually a separate file or set of files stored alongside the database they describe. While some aspects of your database's data dictionary may be accessible to all database users (like important descriptions that everyone needs to know), other parts may only be viewable by database administrators (like technical details about the physical implementation of your database).

## Data dictionary in Metabase

In Metabase, the [data reference](/glossary/data_reference) section acts as a data dictionary.

## What goes in a data dictionary?

Data dictionaries collect and store metadata associated with a database, usually information like:

- Table and field descriptions
- Data types
- Integrity constraints
- Naming conventions
- Locations of files

While the exact formatting of your data dictionary will depend on your organization and the complexity of your dataset, it's common for data dictionaries to be formatted as a table or series of tables, with fields for metadata like field name, description, data type, character length, and whether null values are permitted. You can make a data catalog with a simple spreadsheet, within your [relational database](/glossary/relational_database) software, or even as a text document.

## Data dictionary vs. schema vs. data catalog

There's some overlap here with a database's schema, but generally speaking a schema defines the structure of the database and how tables and their fields fit together, while a data dictionary provides contextual information about that data.

Maybe you've heard about data catalogs too, another similar concept. Some organizations utilize data catalogs to better facilitate discovery and analysis of their data; they're like data dictionaries with some added features and functionality, taking things a step further than the traditional document-based data dictionary.
