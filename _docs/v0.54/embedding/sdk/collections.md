---
version: v0.54
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedded analytics SDK - collections'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/collections.md'
layout: new-docs
---

# Embedded analytics SDK - collections

{% include plans-blockquote.html feature="Embedded analytics SDK" sdk=true %}

You can embed Metabase's collection browser so that people can explore items in your Metabase from your application.

Docs: [CollectionBrowser](./api/CollectionBrowser)

## Example embedding code with `CollectionBrowser`

```tsx
{% include_file "{{ dirname }}/snippets/collections/collection-browser.tsx" %}
```

## Hide the collection picker and hard code the collection you want people to save stuff to

With static questions, you set a specific collection as the collection people can save items to, so that they don't have bother picking a collection. To hard-code a collection:

1. Set `isSaveEnabled` to true.
2. Set `targetCollection` to the collection ID you want people to save items to.

For more options, see [Question props](./questions).
