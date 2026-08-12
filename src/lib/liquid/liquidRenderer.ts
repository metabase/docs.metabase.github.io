import fs from "node:fs";
import path from "node:path";
import { buildVersionSupportTable } from "@/lib/docs/versionSupport";
import { compose } from "@/lib/fn";
import { Liquid, ParseError, TokenizationError } from "liquidjs";
import YAML from "yamljs";
import { registerCustomIncludeTag } from "./tags/customIncludeTag";
import { registerIncludeFileTag } from "./tags/includeFileTag";

// Old markdown docs sometimes contain text that merely looks like Liquid
// (e.g. "{{#...}}" used to describe template tag syntax) but isn't valid
// Liquid. Jekyll/Ruby rendered these as blank rather than failing the build,
// so on a syntax error we cut out just the offending "{{ }}"/"{% %}" span and
// retry, instead of taking down the whole page.
const stripInvalidLiquidSpan = (
  source: string,
  err: unknown,
): string | null => {
  if (!(err instanceof TokenizationError) && !(err instanceof ParseError)) {
    return null;
  }

  let { begin, end } = err.token;
  if (!(source.startsWith("{{", begin) || source.startsWith("{%", begin))) {
    const outputOpen = source.lastIndexOf("{{", begin);
    const tagOpen = source.lastIndexOf("{%", begin);
    let openStart = outputOpen;
    let closer = "}}";
    if (tagOpen > outputOpen) {
      openStart = tagOpen;
      closer = "%}";
    }
    if (openStart === -1) return null;
    const closeIdx = source.indexOf(closer, end);
    if (closeIdx === -1) return null;
    begin = openStart;
    end = closeIdx + closer.length;
  }

  return source.slice(0, begin) + source.slice(end);
};

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

const siteConfig = YAML.parse(
  fs.readFileSync(path.join(ROOT, "_config.yml"), "utf8"),
);

const baseCtx = {
  site: {
    ...siteConfig,
    data: {
      ...loadDataDir(path.join(ROOT, "_data")),
      version_support: buildVersionSupportTable(siteConfig.available_versions),
    },
  },
  jekyll: {
    environment: process.env.NODE_ENV || "development",
  },
};

let liquidEngine: Liquid;

// Remove multiple newlines between elements so satteri doesn't turn them into code snippets.
// Needed to preserve previous behavior (which used jekyll + kramdown).
const collapseBlankLines = (html: string): string =>
  html.replace(/>([ \t]*\r?\n){2,}[ \t]*</g, ">\n<");

export const getLiquidRenderer = ({
  page,
  dirname,
}: {
  page: Record<string, unknown>;
  dirname: string;
}) => {
  if (!liquidEngine) {
    liquidEngine = new Liquid({
      root: [INCLUDES_ROOT],
      jekyllInclude: true,
      jekyllWhere: true,
      strictVariables: false, // TODO: Would be nice to flip this to true
      cache: import.meta.env.MODE === "production",
    });
    compose(
      registerIncludeFileTag,
      registerCustomIncludeTag(collapseBlankLines),
    )(liquidEngine);
  }

  const ctx = {
    ...baseCtx,
    page,
    dirname,
  };

  return {
    render: async (
      html: string,
      { include }: { include?: Record<string, unknown> } = {},
      { maxSyntaxErrors = 0 }: { maxSyntaxErrors?: number } = {},
    ) => {
      let source = html;
      for (let attempt = 0; attempt < maxSyntaxErrors + 1; attempt++) {
        try {
          return await liquidEngine.parseAndRender(source, {
            ...ctx,
            include,
          });
        } catch (err) {
          const stripped = stripInvalidLiquidSpan(source, err);
          if (stripped === null) throw err;
          console.warn(
            `[liquid] Ignoring invalid Liquid syntax in ${dirname}: ${
              (err as Error).message
            }`,
          );
          source = stripped;
        }
      }
      throw new Error(
        `[liquid] Too many invalid Liquid syntax errors in ${dirname}`,
      );
    },
  };
};

export type LiquidRenderer = ReturnType<typeof getLiquidRenderer>;
