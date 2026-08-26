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

## Web component `metabase-question` attributes

These attributes apply to the `<metabase-question>` web component. For the SDK, see [`StaticQuestion` props](#react-sdk-staticquestion-props) and [`InteractiveQuestion` props](#react-sdk-interactivequestion-props).

{% include_file "{{ dirname }}/eajs/snippets/MetabaseQuestionAttributes.md" snippet="properties" %}

Depending on the framework you're using, you may need to stringify attributes before passing them to the component. And if you surround an attribute's value with double quotes, use single quotes inside it:

```html
<metabase-question
  question-id="1"
  initial-sql-parameters="{ 'productId': '42' }"
  hidden-parameters="['productId']"
></metabase-question>
```

These examples use sequential IDs — the number in the item's URL. On Pro and Enterprise plans, you can use [entity IDs](../installation-and-operation/serialization#entity-ids-work-with-embedding) instead; they stay the same when you [serialize](../installation-and-operation/serialization) content from one Metabase to another, like from staging to production.

## React SDK `StaticQuestion` props

{% include plans-blockquote.html feature="Modular embedding SDK" sdk=true convert_pro_link_to_embedding=true %}

`StaticQuestion` embeds a [view-only chart](./chart#embed-a-view-only-chart).

- [Component](./sdk/api/StaticQuestion)
- [Props](./sdk/api/StaticQuestionProps)

{% include_file "{{ dirname }}/sdk/api/snippets/StaticQuestionProps.md" snippet="properties" %}

## React SDK `InteractiveQuestion` props

{% include plans-blockquote.html feature="Interactive charts" convert_pro_link_to_embedding=true is_plural=true %}

`InteractiveQuestion` embeds an [interactive chart](./chart#embed-an-interactive-chart) or [a query editor](./query-builder).

- [Component](./sdk/api/InteractiveQuestion)
- [Props](./sdk/api/InteractiveQuestionProps)

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

## React SDK `InteractiveQuestion` components

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
- [Dashboard component reference](./dashboard-reference)
- [Modular embedding components](./components)
- [Modular embedding parameters](./parameters)
- [Appearance](./appearance)
