---
version: doc-update-detection
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Embedded analytics SDK - questions'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/questions.md'
description: 'How to embed charts in your app with the Embedded analytics SDK.'
---

# Embedded analytics SDK - questions

{% include plans-blockquote.html feature="Embedded analytics SDK" sdk=true %}

There are different ways you can embed questions:

- [Static question](#embedding-a-static-question). Embeds a chart. Clicking on the chart doesn't do anything.
- [Interactive question](#embedding-an-interactive-question). Clicking on the chart gives you the drill-through menu.
- [Query builder](#embedding-the-query-builder-for-creating-new-questions). Embeds the graphical query builder without a pre-defined query.

## Embedding a static question

You can embed a static question using the `StaticQuestion` component.

Docs: [StaticQuestion](./api/StaticQuestion)

![Static question](../images/static-question.png)

The component has a default height, which can be customized by using the `height` prop. To inherit the height from the parent container, you can pass `100%` to the height prop.

```typescript
{% include_file "{{ dirname }}/snippets/questions/static-question.tsx" %}
```

## Embedding an interactive question

You can embed an interactive question using the `InteractiveQuestion` component.

Docs: [InteractiveQuestion](./api/InteractiveQuestion)

![Interactive question](../images/interactive-question.png)

```typescript
{% include_file "{{ dirname }}/snippets/questions/interactive-question.tsx" %}
```

## Pass SQL parameters to SQL questions with `initialSqlParameters`

You can pass parameter values to questions defined with SQL via the `initialSqlParameters` prop, in the format of `{parameter_name: parameter_value}`. Learn more about [SQL parameters](../../questions/native-editor/sql-parameters).

```typescript
{% include_file "{{ dirname }}/snippets/questions/initial-sql-parameters.tsx" snippet="example" %}
```

`initialSqlParameters` can't be used with questions built using the query builder.

## Customizing interactive questions

By default, the Embedded analytics SDK provides a default layout for interactive questions that allows you to view your questions, apply filters and aggregations, and access functionality within the query builder.

Here's an example of using the `InteractiveQuestion` component with its default layout:

```typescript
{% include_file "{{ dirname }}/snippets/questions/customize-interactive-question.tsx" snippet="example-default-interactive-question" %}
```

To customize the layout, use namespaced components within the `InteractiveQuestion` component. For example:

```typescript
{% include_file "{{ dirname }}/snippets/questions/customize-interactive-question.tsx" snippet="example-customized-interactive-question" %}
```

## Interactive question components

These components are available via the `InteractiveQuestion` namespace (e.g., `<InteractiveQuestion.Filter />`).

Docs:
- [InteractiveQuestion.BackButton](./api/InteractiveQuestion#backbutton)
- [InteractiveQuestion.Breakout](./api/InteractiveQuestion#breakout)
- [InteractiveQuestion.BreakoutDropdown](./api/InteractiveQuestion#breakoutdropdown)
- [InteractiveQuestion.ChartTypeDropdown](./api/InteractiveQuestion#charttypedropdown)
- [InteractiveQuestion.ChartTypeSelector](./api/InteractiveQuestion#charttypeselector)
- [InteractiveQuestion.Editor](./api/InteractiveQuestion#editor)
- [InteractiveQuestion.EditorButton](./api/InteractiveQuestion#editorbutton)
- [InteractiveQuestion.Filter](./api/InteractiveQuestion#filter)
- [InteractiveQuestion.FilterDropdown](./api/InteractiveQuestion#filterdropdown)
- [InteractiveQuestion.QuestionSettings](./api/InteractiveQuestion#questionsettings)
- [InteractiveQuestion.QuestionSettingsDropdown](./api/InteractiveQuestion#questionsettingsdropdown)
- [InteractiveQuestion.QuestionVisualization](./api/InteractiveQuestion#questionvisualization)
- [InteractiveQuestion.ResetButton](./api/InteractiveQuestion#resetbutton)
- [InteractiveQuestion.SaveButton](./api/InteractiveQuestion#savebutton)
- [InteractiveQuestion.SaveQuestionForm](./api/InteractiveQuestion#savequestionform)
- [InteractiveQuestion.Summarize](./api/InteractiveQuestion#summarize)
- [InteractiveQuestion.SummarizeDropdown](./api/InteractiveQuestion#summarizedropdown)
- [InteractiveQuestion.DownloadWidget](./api/InteractiveQuestion#downloadwidget)
- [InteractiveQuestion.DownloadWidgetDropdown](./api/InteractiveQuestion#downloadwidgetdropdown)
- [InteractiveQuestion.Title](./api/InteractiveQuestion#title)

## Interactive question plugins

You can use [plugins](./plugins) to add custom functionality to your questions.

### `mapQuestionClickActions`

This plugin allows you to add custom actions to the click-through menu of an interactive question. You can add and
customize the appearance and behavior of the custom actions.

```typescript
{% include_file "{{ dirname }}/snippets/questions/interactive-question-plugins.tsx" snippet="example" %}
```

## Prevent people from saving changes to an `InteractiveQuestion`

To prevent people from saving changes to an interactive question, or from saving changes as a new question, you can set `isSaveEnabled={false}`:

```tsx
{% include_file "{{ dirname }}/snippets/questions/disable-question-save.tsx" %}
```

## Embedding the query builder for creating new questions

![Query builder](../images/query-builder.png)

You can embed the query builder for creating new questions by passing the `questionId="new"` prop to the `InteractiveQuestion` component. You can use the [`children` prop](#customizing-interactive-questions) to customize the layout for creating new questions.

```tsx
{% include_file "{{ dirname }}/snippets/questions/new-question.tsx" %}
```

To customize the question editor's layout, use the `InteractiveQuestion` component [directly with a custom `children` prop](#customizing-interactive-questions).
