---
version: v0.61
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: 'Modular embedding SDK - config'
source_url: 'https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/config.md'
layout: new-docs
summary: 'Configure the Metabase modular embedding SDK with MetabaseProvider, set up authentication, handle global events, and reload embedded components.'
---

# Modular embedding SDK - config

{% include plans-blockquote.html feature="Modular embedding SDK" sdk=true %}

## Passing a configuration object to `MetabaseProvider`

To use the SDK in your app, you need to import the `MetabaseProvider` component and provide it with an `authConfig` object.

### `MetabaseProvider`

A component that configures the SDK and provides the Metabase SDK's context and theme.

To pass a theme, use `defineMetabaseTheme`. See [Reuse a saved theme in the SDK](../appearance#reuse-a-saved-theme-in-the-sdk).

#### API Reference

- [Component](./api/MetabaseProvider)
- [Props](./api/MetabaseProviderProps)

#### Example

```typescript
{% include_file "{{ dirname }}/snippets/config/config-base.tsx" %}
```

#### Props

{% include_file "{{ dirname }}/api/snippets/MetabaseProviderProps.md" snippet="properties" %}

## Global event handlers

You can listen for events by defining the `eventHandlers` prop for `MetabaseProvider`.

### `SdkEventHandlersConfig`

Accepts an object where each key is an event type and the corresponding value is the event handler function.

#### API Reference

- [Type](./api/SdkEventHandlersConfig)

#### Example

```typescript
{% include_file "{{ dirname }}/snippets/config/config-with-event-handlers.tsx" snippet="example" %}
```

#### Props

{% include_file "{{ dirname }}/api/snippets/SdkEventHandlersConfig.md" snippet="properties" %}

## Reloading Metabase components

In case you need to reload a Metabase component, for example, your users modify your application data and that data is used to render a question in Metabase. If you embed this question and want to force Metabase to reload the question to show the latest data, you can do so by using the `key` prop to force a component to reload.

```typescript
{% include_file "{{ dirname }}/snippets/config/reload-metabase-provider.tsx" snippet="example" %}
```
