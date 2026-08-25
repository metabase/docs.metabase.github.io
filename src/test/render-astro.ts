// Renders a real `.astro` component and hands back a live DOM to run that
// component's client module against. Because both halves see the same rendered
// markup, a template change that drops a `data-*` hook fails the behavior tests
// too — no hand-built mirror to drift out of sync.
//
// Two environment quirks shape this, and are the reason it is worth sharing:
//
//  1. Component tests run in the default `node` environment, NOT `happy-dom`.
//     Under a browser-ish environment Vite takes the client resolve condition and
//     the `.astro` default export comes back as something other than the
//     component factory, so the container renders nothing. So the `Window` is
//     built by hand here instead, and installed as the globals a client module
//     might reach for: `window` (`requestAnimationFrame`, `getComputedStyle`) and
//     `CustomEvent` (happy-dom targets only accept happy-dom events, so Node's
//     own constructor won't do). Both are dropped after each test.
//  2. happy-dom's DOM types are structurally compatible with `lib.dom`'s but not
//     nominally, so the boundary casts below are unavoidable. They are here once
//     rather than in every test file.
//
// happy-dom does no layout, so every box reads 0. Stubbing whatever geometry or
// Web Animations behavior a component needs stays with that component's test.
//
// A component test is named `X.astro.test.ts`, not `X.test.ts` — the filesystem
// is case-insensitive, and the latter collides with `x.ts`'s own casing.
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window as HappyWindow } from "happy-dom";
import { afterEach } from "vitest";

type Container = Awaited<ReturnType<typeof AstroContainer.create>>;
type Renderable = Parameters<Container["renderToString"]>[0];

// One container for the whole file — creating it is the expensive part, and it
// holds no per-render state.
let container: Container | undefined;

afterEach(() => {
  // @ts-expect-error — the node env has no `window`; drop the stand-in.
  delete globalThis.window;
  // @ts-expect-error — restore Node's own `CustomEvent`.
  delete globalThis.CustomEvent;
});

export async function renderToDocument(
  Component: Renderable,
  props: Record<string, unknown>,
  slots?: Record<string, unknown>,
): Promise<{ win: HappyWindow; doc: Document }> {
  container ??= await AstroContainer.create();

  const html = await container.renderToString(Component, { props, slots });

  const win = new HappyWindow();
  win.document.body.innerHTML = html;
  globalThis.window = win as unknown as typeof globalThis.window;
  globalThis.CustomEvent = win.CustomEvent as unknown as typeof CustomEvent;

  return { win, doc: win.document as unknown as Document };
}
