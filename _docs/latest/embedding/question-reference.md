---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: Question component reference
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/question-reference.md
layout: new-docs
summary: >-
  Reference for the metabase-question web component attributes, the
  StaticQuestion and InteractiveQuestion SDK props, and the InteractiveQuestion
  layout components.
latest: true
---

# Question component reference

Reference material for embedding a chart or a query editor: the attributes you can set on the `<metabase-question>` web component, the props you can pass to the SDK's `StaticQuestion` and `InteractiveQuestion` components, and the namespaced components you can use to build your own layout.

For how to set all this up, check out [Embed a chart](./chart) and [Embed the query builder](./query-builder).

## `metabase-question` web component attributes

These attributes apply to the `<metabase-question>` web component. For the SDK, see [`StaticQuestion` props](#staticquestion-props) and [`InteractiveQuestion` props](#interactivequestion-props).

{% include_file "{{ dirname }}/eajs/snippets/MetabaseQuestionAttributes.md" snippet="properties" %}

## `StaticQuestion` props

{% include plans-blockquote.html feature="Modular embedding SDK" sdk=true convert_pro_link_to_embedding=true %}

`StaticQuestion` embeds a [view-only chart](./chart#embed-a-view-only-chart).

{% include_file "{{ dirname }}/sdk/api/snippets/StaticQuestionProps.md" snippet="properties" %}

## `InteractiveQuestion` props

{% include plans-blockquote.html feature="Interactive charts" convert_pro_link_to_embedding=true is_plural=true %}

`InteractiveQuestion` embeds an [interactive chart](./chart#embed-an-interactive-chart) or [a query editor](./query-builder).

{% include_file "{{ dirname }}/sdk/api/snippets/InteractiveQuestionProps.md" snippet="properties" %}

## Customize the layout of an interactive chart

By default, `InteractiveQuestion` comes with a layout that lets people view the question, apply filters and aggregations, and use the query builder:

```typescript
{% include_file "{{ dirname }}/sdk/snippets/questions/customize-interactive-question.tsx" snippet="example-default-interactive-question" %}
```

To build your own layout, use namespaced components inside `InteractiveQuestion` (like `<InteractiveQuestion.Filter />`):

```typescript
{% include_file "{{ dirname }}/sdk/snippets/questions/customize-interactive-question.tsx" snippet="example-customized-interactive-question" %}
```

## `InteractiveQuestion` components

These components are available via the `InteractiveQuestion` namespace (like `<InteractiveQuestion.Filter />`). Use them to [customize the layout](#customize-the-layout-of-an-interactive-chart) of an interactive question.

- [InteractiveQuestion.AlertsButton](./sdk/api/InteractiveQuestion#alertsbutton)
- [InteractiveQuestion.Breakout](./sdk/api/InteractiveQuestion#breakout)
- [InteractiveQuestion.BreakoutDropdown](./sdk/api/InteractiveQuestion#breakoutdropdown)
- [InteractiveQuestion.ChartTypeDropdown](./sdk/api/InteractiveQuestion#charttypedropdown)
- [InteractiveQuestion.ChartTypeSelector](./sdk/api/InteractiveQuestion#charttypeselector)
- [InteractiveQuestion.DownloadWidget](./sdk/api/InteractiveQuestion#downloadwidget)
- [InteractiveQuestion.DownloadWidgetDropdown](./sdk/api/InteractiveQuestion#downloadwidgetdropdown)
- [InteractiveQuestion.Editor](./sdk/api/InteractiveQuestion#editor)
- [InteractiveQuestion.EditorButton](./sdk/api/InteractiveQuestion#editorbutton)
- [InteractiveQuestion.Filter](./sdk/api/InteractiveQuestion#filter)
- [InteractiveQuestion.FilterDropdown](./sdk/api/InteractiveQuestion#filterdropdown)
- [InteractiveQuestion.NavigationBackButton](./sdk/api/InteractiveQuestion#navigationbackbutton)
- [InteractiveQuestion.QuestionSettings](./sdk/api/InteractiveQuestion#questionsettings)
- [InteractiveQuestion.QuestionSettingsDropdown](./sdk/api/InteractiveQuestion#questionsettingsdropdown)
- [InteractiveQuestion.QuestionVisualization](./sdk/api/InteractiveQuestion#questionvisualization)
- [InteractiveQuestion.ResetButton](./sdk/api/InteractiveQuestion#resetbutton)
- [InteractiveQuestion.SaveButton](./sdk/api/InteractiveQuestion#savebutton)
- [InteractiveQuestion.SaveQuestionForm](./sdk/api/InteractiveQuestion#savequestionform)
- [InteractiveQuestion.SqlParametersList](./sdk/api/InteractiveQuestion#sqlparameterslist)
- [InteractiveQuestion.Summarize](./sdk/api/InteractiveQuestion#summarize)
- [InteractiveQuestion.SummarizeDropdown](./sdk/api/InteractiveQuestion#summarizedropdown)
- [InteractiveQuestion.Title](./sdk/api/InteractiveQuestion#title)
- [InteractiveQuestion.VisualizationButton](./sdk/api/InteractiveQuestion#visualizationbutton)

[InteractiveQuestion.BackButton](./sdk/api/InteractiveQuestion#backbutton) is deprecated. Use `InteractiveQuestion.NavigationBackButton` instead.

## Further reading

- [Embed a chart](./chart)
- [Embed the query builder](./query-builder)
- [Modular embedding components](./components)
- [Modular embedding parameters](./parameters)
- [Appearance](./appearance)
