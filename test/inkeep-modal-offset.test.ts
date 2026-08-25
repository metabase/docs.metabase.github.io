import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";

// GRO-841. The Inkeep widget renders into a shadow root and fixes its modal at
// `top: 5%`, which made the gap under our fixed header scale with the viewport
// (46px at 920px tall, 24px at 473px, and the panel ran off the bottom on short
// screens). `public/css/inkeep.css` is the only lever we have over that shadow
// DOM, so these assertions pin the offset to the header, not to the viewport.
// The same file ships from metabase/metabase.github.io as
// `apps/marketing-jekyll/css/inkeep.css`; keep the two in sync.
const STYLESHEET = "../public/css/inkeep.css";

const source = readFileSync(
  fileURLToPath(new URL(STYLESHEET, import.meta.url)),
  "utf8",
);

const declarations = (selector: string): Record<string, string> => {
  const block = source.match(
    new RegExp(`^${selector.replace(/[.\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`, "m"),
  );
  if (!block) throw new Error(`no \`${selector}\` rule in ${STYLESHEET}`);

  return Object.fromEntries(
    block[1]
      .split(";")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const colon = line.indexOf(":");
        return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
      }),
  );
};

describe(".ikp-modal__content", () => {
  const decls = declarations(".ikp-modal__content");

  test("offsets the modal from the header, not the viewport", () => {
    expect(decls.top).toBeDefined();
    expect(decls.top).toContain("var(--navigation-header-height");
  });

  test("uses no viewport-proportional term in `top`", () => {
    expect(decls.top ?? "").not.toMatch(/\d+\s*(%|vh|dvh|svh|lvh|vmin|vmax)/);
  });

  test("leaves a constant gap under the header", () => {
    const gap = decls.top?.match(/\+\s*(\d+)px/);
    expect(
      gap,
      `expected a fixed px gap in \`top: ${decls.top}\``,
    ).not.toBeNull();
    expect(Number(gap?.[1])).toBeGreaterThan(0);
  });

  test("does not reintroduce the margin-top offset", () => {
    expect(decls["margin-top"]).toBeUndefined();
  });

  test("stays inside the viewport on short screens", () => {
    expect(decls["max-height"]).toBeDefined();
    expect(decls["max-height"]).toContain("var(--navigation-header-height");
  });
});
