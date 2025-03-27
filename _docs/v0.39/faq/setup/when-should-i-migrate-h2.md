---
version: v0.39
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: FAQ
title: 'When Should I Migrate H2'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/faq/setup/when-should-i-migrate-h2.md'
layout: docs
---

# When should I migrate H2 to mySQL or Postgres?

As soon as you’re planning on using Metabase for anything other than testing. H2 is fairly easily corruptible, so it’s better to be safe than sorry when running Metabase in production. The migration is fairly simple, and [full instructions](../../operations-guide/migrating-from-h2.html) are available.
