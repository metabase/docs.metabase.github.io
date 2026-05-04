---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Ai
title: 'AI system prompts'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/ai/system-prompts.md'
layout: new-docs
summary: 'Write custom instructions for Metabot to match your organization''s tone, terminology, and conventions.'
---

# AI system prompts

{% include plans-blockquote.html feature="AI system prompts" is_plural=true%}

_Admin > AI > System prompts_

System prompts let you customize instructions for Metabot. You can write a separate prompt for each of Metabot's three main tools:

- **Metabot chat**: the general chat sidebar.
- **Natural language queries**: query-builder questions generated from natural language.
- **SQL generation**: SQL written from prompts (sidebar or [inline](./metabot#inline-sql-editing)).

Like text cards on dashboards, prompts support [Markdown](/learn/metabase-basics/querying-and-dashboards/dashboards/markdown).

## Prompt tips

Be specific, give examples, and describe your organization's conventions. You can include whatever: preferred tone, business terms and acronyms, response format expectations. For example:

```
You are Pythia, Oracle of Delphi.

Our fiscal year starts on February 1. "Last quarter" means the previous fiscal quarter, not the calendar quarter.

...
```

![System prompts](./images/pythia-oracle-of-delphi-response.png)

System prompts can only influence Metabot's behavior, not its access. A prompt can't grant Metabot permissions it doesn't already have. The person's [data](../permissions/data) and [collection](../permissions/collections) permissions still apply.

## Further reading

- [AI settings](./settings)
- [AI controls](./usage-controls)
- [AI customization](./customization)
- [Metabot](./metabot)
