---
permalink: /docs/latest/paid-features/
layout: new-docs
title: Pro and Enterprise features
hide_right_hand_newsletter_subscribe_widget: true
---

# Pro and Enterprise features

This page lists the paid features included with the Enterprise Edition of Metabase used in both the Pro and Enterprise plans. See [Pricing](/pricing/).

{% for section in site.data.feature-comparison %}

{% comment %}
To be included, a section must contain at least one enterprise-only feature.
{% endcomment %}

{% if section.heading != "Pricing" and section.heading != "Support and License" %}
{% for row in section.rows %}
{% if row.oss == false and row.enterprise == true %}

## {{section.heading}}

{{section.description}}

{% break %}

{% endif %}
{% endfor %}

{% for row in section.rows %}
{% if row.oss !=true and row.oss != "Unlimited" and row.oss != "N/A" %}

### {{row.name}}

{{row.details}} {% if row.link %}[Learn more]({{row.link}}).{% endif %}

{% endif %}
{% endfor %}
{% endif %}
{% endfor %}
