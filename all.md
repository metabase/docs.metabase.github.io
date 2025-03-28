---
permalink: /all
layout: new-docs
title: Available Versions
category: ignore
---

# Available docs versions

We version our docs for every major release, with docs for each major release covering each point release. E.g., docs for v0.XX cover v0.XX.1, v0.XX.2, and so on.

For product releases, see the list of [Metabase releases](https://github.com/metabase/metabase/releases).

{% for version in site.available_versions reversed %}

- [{{ version }}](/docs/{{ version }}/)
{% endfor %}
