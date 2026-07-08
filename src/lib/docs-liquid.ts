import fs from "node:fs";
import path from "node:path";
import { Liquid, type TagToken, type Context } from "liquidjs";
import { load as loadYaml } from "js-yaml";

// Reproduces Jekyll's processing order for _docs: Liquid runs over the raw
// markdown text (with `site`/`page`/`dirname` context) before markdown
// parsing. `dirname` is what _plugins/jekyll_dirname_payload_plugin.rb
// injects: "/" + the file's directory relative to the repo root (so it
// includes the "_docs" prefix).

const ROOT = process.cwd();

// Mirror of Jekyll's site.data: _data/** mapped to a nested object keyed by
// directory names and file basenames (e.g. _data/docs/nav/latest.yml →
// site.data.docs.nav.latest).
function loadDataDir(dir: string): Record<string, any> {
  const data: Record<string, any> = {};
  if (!fs.existsSync(dir)) return data;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      data[entry.name] = loadDataDir(full);
    } else if (/\.(yml|yaml)$/.test(entry.name)) {
      data[entry.name.replace(/\.(yml|yaml)$/, "")] = loadYaml(
        fs.readFileSync(full, "utf8")
      );
    } else if (entry.name.endsWith(".json")) {
      data[entry.name.replace(/\.json$/, "")] = JSON.parse(
        fs.readFileSync(full, "utf8")
      );
    }
  }
  return data;
}

export const site: Record<string, any> = {
  ...(loadYaml(fs.readFileSync(path.join(ROOT, "_config.yml"), "utf8")) as Record<
    string,
    any
  >),
  data: loadDataDir(path.join(ROOT, "_data")),
};

export const jekyll = {
  // TODO: Maybe use NODE_ENV or something?
  environment: process.env.JEKYLL_ENV || "development",
};

export const engine = new Liquid({
  root: [path.join(ROOT, "_includes")],
  // Jekyll-style includes: unquoted filename, params exposed as include.*
  jekyllInclude: true,
  cache: true,
});

// Jekyll's slugify filter (default mode): lowercase, non-alphanumeric runs
// become single hyphens, trimmed at both ends.
export function slugify(str: unknown): string {
  return String(str ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

engine.registerFilter("slugify", slugify);

// ---------------------------------------------------------------------------
// {% include_file %} — port of the jekyll_include_plugin gem (v1.3.0), which
// injects (snippets of) source files into the docs. Only the features this
// repo uses are exercised (local files, snippet=), but the full text pipeline
// is ported so output matches the gem line for line.
// ---------------------------------------------------------------------------

const SNIPPET_PREFIX: string =
  site?.jekyll_include_plugin?.snippet_prefix ?? "...";

const lines = (text: string) => text.split(/(?<=\n)/);
const isBlank = (line: string) => /^\s*$/.test(line);

function pickSnippet(text: string, name: string): string {
  let content = "";
  let started = false;
  let ended = false;
  for (const line of lines(text)) {
    if (new RegExp(`\\[<snippet\\s+${name}>\\]`).test(line)) {
      if (started) throw new Error(`Snippet '${name}' occurred twice`);
      started = true;
    } else if (new RegExp(`\\[<endsnippet\\s+${name}>\\]`).test(line)) {
      ended = true;
      break;
    } else if (/\[<(end)?snippet\s+[^>]+>\]/.test(line)) {
      continue;
    } else if (started) {
      content += line;
    }
  }
  if (!started) throw new Error(`Snippet '${name}' has not been found`);
  if (!ended) throw new Error(`End of the snippet '${name}' has not been found`);
  if (!content) throw new Error(`Snippet '${name}' appears to be empty`);
  if (SNIPPET_PREFIX === "") return content;
  const indent = /^\s*/.exec(content)![0];
  return `${indent}${SNIPPET_PREFIX}\n${content}`;
}

function removeAllSnippets(text: string): string {
  return lines(text)
    .filter((line) => !/\[<(end)?snippet\s+[^>]+>\]/.test(line))
    .join("");
}

function removeIgnoredLines(text: string): string {
  let ignoring = false;
  return lines(text)
    .filter((line) => {
      if (/^\s*\/\/\s*\[<ignore>\]/.test(line)) return void (ignoring = true);
      if (/^\s*\/\/\s*\[<endignore>\]/.test(line)) return void (ignoring = false);
      return !ignoring;
    })
    .join("");
}

// Lines tagged [<lang>] are kept (marker stripped) when they match the page's
// lang, dropped otherwise. No _docs page sets `lang`, so tagged lines drop.
function renderComments(text: string, lang: string | undefined): string {
  let out = "";
  for (const line of lines(text)) {
    if (lang && new RegExp(`\\[<${lang}>\\]`).test(line)) {
      out += line.replace(new RegExp(`\\[<${lang}>\\]\\s*`), "");
    } else if (/\[<\w+>\]/.test(line)) {
      continue;
    } else {
      out += line;
    }
  }
  return out;
}

function removeExcessiveNewlines(text: string): string {
  return text.replace(/^(\s*\r?\n)*/, "").trimEnd();
}

function removeExcessiveIndentation(text: string): string {
  let lowest: number | null = null;
  for (const line of lines(text)) {
    if (isBlank(line)) continue;
    const indent = /^\s*/.exec(line)![0].length;
    if (lowest === null || indent < lowest) lowest = indent;
  }
  if (lowest === null || lowest === 0) return text;
  return lines(text)
    .map((line) => (isBlank(line) ? line : line.slice(lowest!)))
    .join("");
}

engine.registerTag("include_file", {
  parse(tagToken: TagToken) {
    this.markup = tagToken.args;
  },
  async render(ctx: Context) {
    // The gem renders the tag markup as Liquid first ({{ dirname }} etc.)
    const rendered = (
      await engine.parseAndRender(this.markup, ctx.getAll())
    ).trim();
    const match = /^"?([^\s"]+)"?((?:\s+[-\w]+="[^"]+")*)\s*$/.exec(rendered);
    if (!match) {
      throw new Error(`Can't parse include_file tag params: ${this.markup}`);
    }
    const [, filePath, paramStr] = match;
    const params: Record<string, string> = {};
    for (const [, key, value] of paramStr.matchAll(/([-\w]+)="([^"]+)"/g)) {
      params[key] = value;
    }

    let text = fs.readFileSync(path.join(ROOT, filePath), "utf8");
    text = params.snippet
      ? pickSnippet(text, params.snippet)
      : removeAllSnippets(text);
    text = removeIgnoredLines(text);
    text = removeExcessiveNewlines(text);
    text = removeExcessiveIndentation(text);
    text = renderComments(text, ctx.getSync(["page", "lang"]) as any);
    if (params.syntax) text = `\`\`\`${params.syntax}\n${text}\n\`\`\``;
    return text;
  },
});

// ---------------------------------------------------------------------------
// Kramdown recognizes a raw HTML block by tracking real tag nesting and keeps
// it open until the block's own tags balance back out, so a blank line left
// behind by a no-op Liquid tag (e.g. {% assign %}) inside an _include never
// ends the block. Astro's markdown pipeline (remark/micromark, CommonMark)
// uses a simpler rule for the same "block-level tag" HTML blocks: raw text is
// consumed line-by-line until the first blank line, full stop. Liquid-rendered
// includes routinely leave such artifact blank lines (control tags render to
// nothing but keep their own line), which then get misread by micromark as
// ending the HTML block early — e.g. an indented `<p>` right after the blank
// line starts a new block and, being indented 4+ spaces, becomes a code block.
// This reproduces Kramdown's tag-balance behavior: blank lines are dropped
// while a block-level tag's nesting hasn't returned to zero, so micromark
// never sees them and only encounters real blank lines once a block is
// legitimately finished.
// ---------------------------------------------------------------------------

const HTML_BLOCK_TAGS = new Set([
  "address", "article", "aside", "base", "basefont", "blockquote", "body",
  "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir",
  "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form",
  "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header",
  "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem",
  "nav", "noframes", "ol", "optgroup", "option", "p", "param", "section",
  "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr",
  "track", "ul",
]);

const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);

// Matches one HTML tag anywhere in the text. `[^>]` (a negated class, unlike
// `.`) matches newlines, so this also finds tags whose attributes are spread
// across multiple lines (as Prettier formats them).
const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*?(\/)?>/g;

function findHtmlBlockRanges(text: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  let depth = 0;
  let blockStart = -1;
  TAG_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TAG_RE.exec(text))) {
    const [full, closing, rawName, selfClose] = match;
    const name = rawName.toLowerCase();
    if (selfClose || VOID_TAGS.has(name)) continue;
    if (depth === 0) {
      if (closing || !HTML_BLOCK_TAGS.has(name)) continue;
      const lineStart = text.lastIndexOf("\n", match.index) + 1;
      if (match.index - lineStart > 3) continue; // CommonMark's ≤3-space rule
      blockStart = lineStart;
      depth = 1;
    } else {
      depth += closing ? -1 : 1;
      if (depth === 0) {
        ranges.push([blockStart, match.index + full.length]);
        blockStart = -1;
      }
    }
  }
  return ranges;
}

function collapseHtmlBlockBlankLines(text: string): string {
  const ranges = findHtmlBlockRanges(text);
  if (ranges.length === 0) return text;
  let rangeIdx = 0;
  let offset = 0;
  return lines(text)
    .filter((line) => {
      const start = offset;
      offset += line.length;
      while (rangeIdx < ranges.length && ranges[rangeIdx][1] <= start) rangeIdx++;
      const inBlock =
        rangeIdx < ranges.length &&
        ranges[rangeIdx][0] <= start &&
        start < ranges[rangeIdx][1];
      return !(inBlock && isBlank(line));
    })
    .join("");
}

export async function renderDocsLiquid(
  body: string,
  filePath: string,
  frontmatter: Record<string, unknown>
): Promise<string> {
  const rel = path.relative(ROOT, path.resolve(ROOT, filePath));
  const dir = path.dirname(rel).split(path.sep).join("/");
  const rendered = await engine.parseAndRender(body, {
    site,
    jekyll,
    page: frontmatter,
    dirname: dir === "." ? "/" : `/${dir}`,
  });
  return collapseHtmlBlockBlankLines(rendered);
}
