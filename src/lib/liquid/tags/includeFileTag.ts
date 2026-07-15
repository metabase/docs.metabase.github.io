import fs from "node:fs";
import path from "node:path";
import { type TagToken, type Context, type Liquid } from "liquidjs";

// ---------------------------------------------------------------------------
// {% include_file %} — port of the jekyll_include_plugin gem (v1.3.0), which
// injects (snippets of) source files into the docs. Only the features this
// repo uses are exercised (local files, snippet=), but the full text pipeline
// is ported so output matches the gem line for line.
// ---------------------------------------------------------------------------

const ROOT = process.cwd();

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
  return content;
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

export const registerIncludeFileTag = (engine: Liquid) => {
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
  return engine;
}
