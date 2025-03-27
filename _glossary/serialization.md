---
title: "Serialization"
headline: "Serialization"
def: "The process of storing the state of an application or other object as a file so that it can be reloaded (or deserialized) later."
further-reading:
  - title: "Serialization: preloading dashboards in a new Metabase instance"
    url: /learn/administration/serialization
  - title: Docs on serialization
    url: /docs/latest/installation-and-operation/serialization
  - title: Metabase at scale
    url: /learn/administration/metabase-at-scale
---

## What is serialization?

**Serialization** is the process of storing the state of an application or other object as a file, so that it can be reloaded (or deserialized) later. In the serialization process, that complex object gets converted to a stream of data, one that's much easier to transfer over a network or copy to a new instance. Think of serialization like taking a snapshot of some application, but with the power to turn that flattened snapshot back into a live object whenever you're ready.

Serialization comes in handy if you need to manage multiple instances of an app, like development or staging instances in addition to the ones you use for production. Serialization can also be used to customize an initial state of an application, like preloading a Metabase instance with connection details to a database, predefined groups, [dashboards](/glossary/dashboard), and so on.

## Serialization in Metabase

{% include plans-blockquote.html feature="Serialization" self-hosted-only=true %}

Metabase's serialization feature lets you capture and export the contents of your Metabase so that you can reload them into another instance — or several.

Those Metabase artifacts you capture when serializing are collectively known as a data dump, containing YAML files that hold your [collections](/glossary/collection), dashboards, [saved questions](/glossary/saved_question), and some system settings.
