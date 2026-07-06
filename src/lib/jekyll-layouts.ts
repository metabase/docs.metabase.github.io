import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";
import type { Template } from "liquidjs";
import { engine, site, jekyll } from "./docs-liquid";

// Renders a page through Jekyll's layout mechanism: the content is inserted
// into its layout via {{ content }}, and layouts chain upward through the
// `layout:` key in their front matter (new-docs → default_new). The layout
// templates in _layouts/ are used verbatim — includes resolve from _includes/
// through the same LiquidJS engine as the markdown pass.

const ROOT = process.cwd();

interface ParsedLayout {
  frontmatter: Record<string, any>;
  template: Template[];
}

const layoutCache = new Map<string, ParsedLayout>();

function loadLayout(name: string): ParsedLayout {
  let layout = layoutCache.get(name);
  if (!layout) {
    const raw = fs.readFileSync(
      path.join(ROOT, "_layouts", `${name}.html`),
      "utf8"
    );
    const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
    layout = {
      frontmatter: fmMatch
        ? ((loadYaml(fmMatch[1]) as Record<string, any>) ?? {})
        : {},
      template: engine.parse(fmMatch ? raw.slice(fmMatch[0].length) : raw),
    };
    layoutCache.set(name, layout);
  }
  return layout;
}

export async function renderJekyllPage(
  layoutName: string,
  contentHtml: string,
  page: Record<string, unknown>
): Promise<string> {
  let content = contentHtml;
  let name: string | undefined = layoutName;
  while (name) {
    const { frontmatter, template } = loadLayout(name);
    content = await engine.render(template, {
      content,
      page,
      site,
      jekyll,
      layout: frontmatter,
    });
    name = frontmatter.layout;
  }
  return content;
}
