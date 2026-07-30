---
permalink: /docs/all
layout: new-docs
title: Available Versions
category: ignore
---

# Available docs versions

We version our docs for every major release, with docs for each major release covering each point release. E.g., docs for v0.XX cover v0.XX.1, v0.XX.2, and so on.

For product releases, see the list of [Metabase releases](https://github.com/metabase/metabase/releases).

Versions marked <span class="version__tag version__tag--unsupported">unsupported</span> have passed their end-of-life date. See our [version support policy](/version-support) for details.

{% for version in site.available_versions reversed %}
{% assign support = site.data.version_support[version] %}

- [{{ version }}](/docs/{{ version }}/){% if support.status == "unsupported" %} <span class="version__tag version__tag--unsupported">unsupported</span>{% elsif support.lts %} <span class="version__tag version__tag--lts">lts</span>{% endif %}
{% endfor %}
