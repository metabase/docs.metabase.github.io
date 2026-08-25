import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { GAP } from "./header-offset";
import { baseConfig, configFor, deepLinkQuery } from "./search";

const noop = () => {};

describe("deepLinkQuery", () => {
  test.each([
    ["https://www.metabase.com/search?query=dashboard", "dashboard"],
    ["https://www.metabase.com/search?query=", ""],
    ["https://www.metabase.com/search", ""],
    ["https://www.metabase.com/docs/latest/?query=dashboard", ""],
    ["https://www.metabase.com/learn/?query=dashboard", ""],
  ])("%s yields %j", (href, expected) => {
    expect(deepLinkQuery(new URL(href))).toBe(expected);
  });
});

describe("configFor", () => {
  test("opens the modal pre-filled on a /search deep link", () => {
    const config = configFor(
      new URL("https://www.metabase.com/search?query=dashboard"),
      noop,
    );

    expect(config.modalSettings).toMatchObject({
      isOpen: true,
      shortcutKey: "k",
    });
    expect(config.searchSettings).toMatchObject({ defaultQuery: "dashboard" });
  });

  test("leaves the modal closed everywhere else", () => {
    const config = configFor(new URL("https://www.metabase.com/learn/"), noop);

    expect(config).toBe(baseConfig);
    expect(config.modalSettings).not.toHaveProperty("isOpen");
  });
});

describe("shadow styles", () => {
  const styles = baseConfig.baseSettings?.theme?.styles ?? [];

  test("are inlined, so no stylesheet has to be served at a fixed URL", () => {
    expect(styles.map((style) => style.type)).toEqual(["style", "style"]);
  });

  // Vite's SSR pass empties `.css?raw`, so the config's `value` reads blank here
  // even though the client build inlines it. Assert the file itself instead.
  const css = readFileSync(
    fileURLToPath(new URL("./inkeep-shadow.css", import.meta.url)),
    "utf8",
  );

  test("offset the modal from the published header height", () => {
    expect(css).toContain("top: var(--inkeep-modal-top, 101px)");
    expect(css).not.toContain("margin-top: var(--navigation-header-height");
  });

  test("carry no viewport-proportional offset", () => {
    const rule = css.match(/\.ikp-modal__content[^{]*\{([^}]*)\}/);

    expect(rule?.[1]).toBeDefined();
    expect(rule?.[1]).not.toMatch(/top:[^;]*\d+\s*(%|vh|svh|lvh|vmin|vmax)/);
  });

  test("keep the fallback in step with the gap the offset module adds", () => {
    expect(css).toContain(`var(--inkeep-modal-top, ${77 + GAP}px)`);
  });

  // The widget's own `data-[mobile]:inset-0[data-mobile]` is (0,2,0); a bare class
  // loses `top` to it but keeps `max-height`, which strands a dead strip on phones.
  test("opt out below the widget's mobile breakpoint", () => {
    expect(css).toContain(".ikp-modal__content:not([data-mobile])");
  });
});
