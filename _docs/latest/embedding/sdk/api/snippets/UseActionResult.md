---
version: v0.63
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: Embedding
title: UseActionResult
source_url: >-
  https://github.com/metabase/metabase/blob/master/docs/embedding/sdk/api/snippets/UseActionResult.md
layout: new-docs
latest: true
---

**`Expand`**

## Type Parameters

<!-- [<snippet type-parameters>] -->

| Type Parameter                                                                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------- |
| `TParameters` _extends_ [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `unknown`\> |
| `TKind` _extends_ [`ActionKind`](./api/ActionKind) \| `undefined`                                                                       |

<!-- [<endsnippet type-parameters>] -->

## Properties

<!-- [<snippet properties>] -->

| Property                               | Type                                                                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="error"></a> `error`             | [`ActionExecuteError`](./api/ActionExecuteError) \| `null`                                                                                                                                                  | Last thrown error, normalized to the public `ActionExecuteError` shape, or `null`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| <a id="execute"></a> `execute`         | (`parameters`: `TParameters`) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`ActionResultForKind`](./api/ActionResultForKind)\<`TKind`\> \| `null`\> | Trigger the action with the given parameters. Returns the response body on success AND throws on failure — the same error is stored in `error` for render-time consumers. Resolves to the discriminated `result` shape (see `ActionResultForKind<TKind>`); when `TKind` is omitted it resolves to `AnyActionResult`, narrowable via `"<key>" in r`. Resolves to `null` (without making a request) when `actionId` is `null` or the SDK is not yet initialized — guard the host-side caller with `if (!actionId) return;` if these cases are reachable. |
| <a id="isexecuting"></a> `isExecuting` | `boolean`                                                                                                                                                                                                      | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| <a id="reset"></a> `reset`             | () => `void`                                                                                                                                                                                                   | Clear `result` and `error`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| <a id="result"></a> `result`           | [`ActionResultForKind`](./api/ActionResultForKind)\<`TKind`\> \| `null`                                                                                                                                     | Last response, or `null` before first call and after `reset()`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

<!-- [<endsnippet properties>] -->
