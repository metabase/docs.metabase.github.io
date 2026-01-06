---
version: v0.58
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Modular embedding SDK - collections
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/collections.md
layout: new-docs
summary: >-
  Embed Metabase collection browser in your application using the
  MetabaseProvider SDK component.
latest: true
---

# Modular embedding SDK - collections

{% include plans-blockquote.html feature="Modular embedding SDK" sdk=true %}

## Embedding a collection browser

You can embed Metabase's collection browser so that people can explore items in your Metabase from your application.

### `CollectionBrowser`

#### API Reference

- [Component](./api/CollectionBrowser)
- [Props](./api/CollectionBrowserProps)

#### Example

```tsx
{% include_file "{{ dirname }}/snippets/collections/collection-browser.tsx" %}
```

#### Props

{% include_file "{{ dirname }}/api/snippets/CollectionBrowserProps.md" snippet="properties" %}

## Hide the collection picker and hard code the collection you want people to save stuff to

With static questions, you set a specific collection as the collection people can save items to, so that they don't have bother picking a collection. To hard-code a collection:

1. Set `isSaveEnabled` to true.
2. Set `targetCollection` to the collection ID you want people to save items to.

For more options, see [Question props](./questions).
