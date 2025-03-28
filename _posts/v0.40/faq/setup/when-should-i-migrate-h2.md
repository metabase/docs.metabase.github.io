---
version: v0.40
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: FAQ
title: 'When Should I Migrate H2'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/faq/setup/when-should-i-migrate-h2.md'
layout: docs
---

# When should I migrate from H2 to MySQL or Postgres?

As soon as you plan to use Metabase for anything other than testing: H2 is neither as fast or as robust as production database systems. The migration is fairly simple; please see [this guide][migrate-off-h2] for instructions.

[migrate-off-h2]: ../../operations-guide/migrating-from-h2.html
