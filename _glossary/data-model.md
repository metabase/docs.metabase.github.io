---
title: Data model
headline: Data model
def: Any pattern that organizes and labels information.
related-terms:
  - term: Schema
    slug: schema
  - term: Metadata
    slug: metadata
  - term: Data dictionary
    slug: data_dictionary
  - term: ERD
    slug: erd
further-reading:
  - title: Models in Metabase
    url: /learn/getting-started/models
  - title: Models documentation
    url: /docs/latest/users-guide/models
  - title: "The Data Model page: editing metadata"
    url: /docs/latest/administration-guide/03-metadata-editing
  - title: Common data model mistakes made by startups
    url: /learn/analytics/data-model-mistakes
redirect_from:
  - /glossary/data_model
---

## What is a data model?

The term **data model** is used to describe any pattern that organizes and labels information. People will use "data model" as a generic way to refer to concepts like [schemas](/glossary/schema), [derived tables (views)](/glossary/view), or [ERDs](/glossary/erd).

A good data model helps people find things faster. For example, a mall directory is a data model that organizes information about the stores in the mall. It groups and labels the stores by category or location, and explains how the stores are related to one another by displaying them on a map. This model makes it easier for people to find out where to go, compared to wandering through the mall on their own, or reading through a random list of store names.

## Data modelling example

To make decisions during data modelling, it's best to start by figuring out what people want to look for, and why. Let's say we want to create a data model for storing information about movies, to help people look for new things to watch.

You can think of this data model as a template that can be filled out for any movie. The template should do two things:

1. Represent the parts of a movie that are useful for finding a specific one. For example, people might search for a movie they want to watch by title, director, genre, or actor.

2. Describe the relationships between the parts, so that it is easy to look up one group of information based on another. For example, the template should make sure that any movie title is associated with at least one director.

The simplest type of data model groups related parts together into one template, and includes some information about how to fill it out. For example, the template below can be used as a data model for any movie.

**Movies**

- **Title**: Any text (mandatory).
- **Director**: List of names (mandatory).
- **Genre**: Any text (optional).
- **Cast**: List of names (optional).

The model can be expanded by adding more parts related to movies such as **Release year** or **Run time**. We can also expand on existing parts if they are useful for looking things up. For example, people might want to search for a movie by specific information about the actors in them, such as any acting awards they've won. Since **Cast** only keeps track of actor names, we can split out award information into a new data model.

**Acting Awards**

- **Award**: Name of acting award (mandatory).
- **Award year**: Year (mandatory).
- **Actor**: First name and last name (optional).

Since actor names appear in both models (either under **Cast** or under **Actor**), there is a relationship to connect the **Movies** model and the **Acting Awards** model. When both templates are filled out with real movie and awards information, people will be able to look up a movie by a particular award.

The written templates above are a basic way to think about breaking down information for data models, but there are many best practices that you can follow depending on the use case. You can find examples of common data model formats in the next section.

## Common data models

### Schemas

[Schemas](/glossary/schema) are a conceptual data model. They are used by people who work with databases.

1. Information is represented by named [columns](/glossary/column) and [data types](/glossary/data_type).
2. Relationships are described by structures such as [tables](/glossary/table) or [JSON](/glossary/json) objects.

### ERDs

[ERDs](/glossary/erd) are a visual data model. ERDs are used by people who need to talk about information management and architecture.

1. Information is represented by different shapes, such as rectangles or diamonds.
2. Relationships are described by different lines, such as arrows or dashed lines.

### Metabase models

A [Metabase model](/learn/getting-started/models) is a data model that you can create and save from a [question](/glossary/question) or SQL query.

1. Information is represented by named columns and any associated [metadata](/glossary/metadata).
2. Relationships are described by the logic used in the question or SQL query.

### How people actually use the term data model

You might find that different teams use the term "data model" informally to mean different things:

- People who write SQL may use it to refer to derived tables or views.
- Programmers may use it to refer to a schema or ERD.

## The Data Model in Metabase

If you're a Metabase admin, you'll have access to the [Data Model page](/docs/latest/administration-guide/03-metadata-editing) in Metabase. The changes you make here will affect the way that data appears across all of Metabase.

### What's the difference between the Data Model page and a Metabase model?

- The Data Model sits on top of the raw data warehouse tables connected to Metabase. It is a layer of modelling you can use to clean up the tables that your organization can see. You can think of it as a way to “translate" information between the data world and the business world by assigning human-readable names and saving common definitions of [segments](/glossary/segment) or [metrics](/glossary/metric).

- Metabase models sit on top of the Data Model. They can be created by anyone with permissions to use the underlying database tables.
