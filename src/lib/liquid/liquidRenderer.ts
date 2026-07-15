import fs from "node:fs";
import path from "node:path";
import { Liquid, type LiquidOptions } from "liquidjs";
import YAML from "yamljs";
import { registerIncludeFileTag } from "./tags/includeFileTag";

const ROOT = process.cwd();
const INCLUDES_ROOT = path.join(ROOT, "_includes");

const loadDataDir = (dir: string): Record<string, unknown> => {
  const data: Record<string, any> = {};
  if (!fs.existsSync(dir)) return data;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      data[entry.name] = loadDataDir(full);
    } else if (/\.(yml|yaml)$/.test(entry.name)) {
      data[entry.name.replace(/\.(yml|yaml)$/, "")] = YAML.parse(
        fs.readFileSync(full, "utf8"),
      );
    } else if (entry.name.endsWith(".json")) {
      data[entry.name.replace(/\.json$/, "")] = JSON.parse(
        fs.readFileSync(full, "utf8"),
      );
    }
  }
  return data;
};

// Renders Jekyll's `_includes/*.html` partials, matching Jekyll's Liquid
// dialect: `{% include foo.html param="x" %}` style tags and `include.param`
// lookups inside the partial.
export const getLiquidRenderer = (
  {
    page,
    dirname,
  }: {
    page: Record<string, unknown>;
    dirname: string;
  },
  options?: LiquidOptions,
) => {
  const liquidEngine = new Liquid({
    root: [INCLUDES_ROOT],
    jekyllInclude: true,
    jekyllWhere: true,
    strictVariables: false, // TODO: Can we flip this to true?
    ...options,
  });

  registerIncludeFileTag(liquidEngine);

  const ctx = {
    page,
    dirname,
    site: {
      ...YAML.parse(fs.readFileSync(path.join(ROOT, "_config.yml"), "utf8")),
      data: loadDataDir(path.join(ROOT, "_data")),
    },
    jekyll: {
      environment: process.env.NODE_ENV || "development",
    },
  };

  return {
    render: (
      html: string,
      { include }: { include?: Record<string, unknown> } = {},
    ) => {
      return liquidEngine.parseAndRender(html, {
        ...ctx,
        include,
      });
    },
  };
};

export type LiquidRenderer = ReturnType<typeof getLiquidRenderer>;
