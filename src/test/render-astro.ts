// Runs in the node env on purpose: under happy-dom Vite picks the client resolve
// condition and `.astro` imports stop yielding the component factory.
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { Window as HappyWindow } from "happy-dom";
import { afterEach } from "vitest";

type Container = Awaited<ReturnType<typeof AstroContainer.create>>;
type Renderable = Parameters<Container["renderToString"]>[0];

let container: Container | undefined;

afterEach(() => {
  // @ts-expect-error — node env has no `window`
  delete globalThis.window;
  // @ts-expect-error — restore Node's own `CustomEvent`
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
  // happy-dom targets reject Node's CustomEvent
  globalThis.CustomEvent = win.CustomEvent as unknown as typeof CustomEvent;

  return { win, doc: win.document as unknown as Document };
}
