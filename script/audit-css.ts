#!/usr/bin/env bun
/**
 * Finds (and optionally removes) CSS in public/docs/css that no rendered docs
 * page can use.
 *
 * Usage: bun run build && bun script/audit-css.ts [--write] [--safelist a,b]
 *
 * A selector is kept when every class, id and tag it references is found in:
 *  - the built site (_site/**\/*.html, so every docs version counts), or
 *  - a class/id context in first-party JavaScript, Astro components or Liquid
 *    includes (class="…", classList.add(…), className = …, id="…"), or
 *  - a runtime library that injects its own markup (Inkeep, highlight.js, the
 *    GDPR notice, image zoom, anchor.js, checkpoints), matched by prefix.
 * Pseudo-classes/elements and attribute selectors never disqualify a selector,
 * so :hover/:focus/::before variants ride along with their base selector.
 * Selector lists are trimmed to their used members; rules, @media blocks,
 * @keyframes and @font-face that end up unused are dropped.
 *
 * Without --write the pruned files and a report go to tmp/css-audit/.
 */
import fs from "node:fs";
import path from "node:path";
import postcss, { type AtRule, type Rule } from "postcss";
import resolveNestedSelector from "postcss-resolve-nested-selector";
import selectorParser, {
  type Node,
  type Selector,
} from "postcss-selector-parser";

const ROOT = path.join(import.meta.dir, "..");
const SITE = path.join(ROOT, "_site");
const CSS_DIR = path.join(ROOT, "public/docs/css");
const OUT = path.join(ROOT, "tmp/css-audit");
const WRITE = process.argv.includes("--write");
const safelistArg = process.argv.find((a) => a.startsWith("--safelist="));
// new-docs-anchor-links.js adds the heading tag name (h2, h3, …) as a class.
const SAFELIST = new Set([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  ...(safelistArg?.slice("--safelist=".length).split(",") ?? []),
]);
const FILES = [
  "styles.css",
  "main.css",
  "gdpr.css",
  "docs.css",
  "docs-local.css",
  "inkeep.css",
];

// Sources of markup/classes that JavaScript or templates add at runtime.
const DYNAMIC_SOURCES: [string, RegExp][] = [
  ["public/docs/js", /\.js$/],
  ["public/docs/gdpr-cookie-notice/dist", /script\.js$/],
  ["_site/docs/_astro", /\.js$/],
  ["src", /\.(astro|ts)$/],
  ["_includes", /\.(html|js)$/],
];
// Class prefixes owned by libraries whose markup never appears in the build.
const LIBRARY_PATTERNS = [
  /^ikp-/,
  /^hljs/,
  /^language-/,
  /^anchorjs/,
  /^zoom/i,
  /^vjs-/,
  /^video-js/,
  /^gdpr/,
  /^checkpoint/,
  /^tsd-/,
  /^fillout/,
  /^unify/,
  /^highlighter-rouge$/,
  /^no-zoom$/,
];
const STD_TAGS = new Set(
  "html body head title base link meta style script noscript template slot a abbr address area article aside audio b bdi bdo blockquote br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr i iframe img input ins kbd label legend li main map mark menu meter nav object ol optgroup option output p picture pre progress q rp rt ruby s samp search section select small source span strong sub summary sup table tbody td textarea tfoot th thead time tr track u ul var video wbr svg path g circle rect line polyline polygon ellipse text tspan defs use symbol clippath mask pattern lineargradient radialgradient stop filter image foreignobject marker math".split(
    " ",
  ),
);

type Verdict = { used: boolean; missing: string[]; viaDynamic: string[] };

function walkFiles(dir: string, re: RegExp, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(p, re, out);
    else if (re.test(entry.name)) out.push(p);
  }
  return out;
}

// --- 1. tokens present in the rendered site ----------------------------------
const html = {
  tags: new Set<string>(),
  classes: new Set<string>(),
  ids: new Set<string>(),
};
let htmlFiles = 0;
for (const file of walkFiles(SITE, /\.html$/)) {
  const text = fs.readFileSync(file, "utf8");
  htmlFiles++;
  for (const m of text.matchAll(/<([a-zA-Z][\w-]*)/g))
    html.tags.add(m[1]!.toLowerCase());
  for (const m of text.matchAll(/\sclass\s*=\s*(?:"([^"]*)"|'([^']*)')/g))
    for (const c of (m[1] ?? m[2] ?? "").split(/\s+/))
      if (c) html.classes.add(c);
  for (const m of text.matchAll(/\sid\s*=\s*(?:"([^"]*)"|'([^']*)')/g))
    html.ids.add((m[1] ?? m[2] ?? "").trim());
}
if (htmlFiles === 0)
  throw new Error("no built pages in _site; run `bun run build` first");
console.log(
  `scanned ${htmlFiles} built pages: ${html.tags.size} tags, ${html.classes.size} classes, ${html.ids.size} ids`,
);

// --- 2. tokens that scripts and templates add at runtime ---------------------
const dynamic = new Map<string, string>(); // token -> where it was seen
const addTokens = (str: string, why: string) => {
  for (const t of str.split(/[^A-Za-z0-9_-]+/))
    if (t && /^[A-Za-z_-]/.test(t) && !dynamic.has(t)) dynamic.set(t, why);
};
const STRING = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
for (const [dir, re] of DYNAMIC_SOURCES) {
  if (!fs.existsSync(path.join(ROOT, dir))) continue;
  for (const file of walkFiles(path.join(ROOT, dir), re)) {
    const text = fs.readFileSync(file, "utf8");
    const why = path.relative(ROOT, file);
    for (const m of text.matchAll(/\bclass(?:Name)?\s*=\s*(["'])([^"']*)\1/g))
      addTokens(m[2]!, `${why} class=`);
    for (const m of text.matchAll(/\bid\s*=\s*(["'])([^"']*)\1/g))
      addTokens(m[2]!, `${why} id=`);
    for (const m of text.matchAll(/class:list=\{\[([\s\S]*?)\]\}/g))
      for (const s of m[1]!.matchAll(STRING))
        addTokens(s[2]!, `${why} class:list`);
    for (const m of text.matchAll(
      /classList\.(?:add|remove|toggle|contains|replace)\(([^)]*)\)/g,
    ))
      for (const s of m[1]!.matchAll(STRING))
        addTokens(s[2]!, `${why} classList`);
    for (const m of text.matchAll(/\.className\s*=\s*(["'`])([^"'`]*)\1/g))
      addTokens(m[2]!, `${why} className`);
    for (const m of text.matchAll(
      /setAttribute\(\s*(["'])(?:class|id)\1\s*,\s*(["'`])([^"'`]*)\2/g,
    ))
      addTokens(m[3]!, `${why} setAttribute`);
    for (const m of text.matchAll(
      /\b(?:const|let|var)\s+[A-Z_][A-Z0-9_]*\s*=\s*(["'])([A-Za-z_-][\w-]*)\1/g,
    ))
      addTokens(m[2]!, `${why} const`);
  }
}
for (const t of SAFELIST) dynamic.set(t, "safelist");
console.log(`runtime/template tokens: ${dynamic.size}`);

// --- 3. selector evaluation ---------------------------------------------------
const isDynamic = (v: string) =>
  dynamic.has(v) || LIBRARY_PATTERNS.some((p) => p.test(v));

function evalSelectorNode(selector: Selector): Verdict {
  const missing: string[] = [];
  const viaDynamic: string[] = [];
  let used = true;
  for (const node of selector.nodes as Node[]) {
    if (node.type === "class" || node.type === "id") {
      const present = node.type === "class" ? html.classes : html.ids;
      const label = (node.type === "class" ? "." : "#") + node.value;
      if (present.has(node.value)) continue;
      if (isDynamic(node.value)) viaDynamic.push(label);
      else {
        missing.push(label);
        used = false;
      }
    } else if (node.type === "tag") {
      const v = node.value.toLowerCase();
      if (html.tags.has(v) || STD_TAGS.has(v) || v.includes("-")) continue;
      missing.push(v);
      used = false;
    } else if (node.type === "pseudo") {
      const name = node.value.toLowerCase();
      if (
        [
          ":is",
          ":where",
          ":has",
          ":matches",
          ":-webkit-any",
          ":-moz-any",
        ].includes(name) &&
        node.nodes?.length
      ) {
        const inner = node.nodes.map(evalSelectorNode);
        if (!inner.some((i) => i.used)) {
          used = false;
          missing.push(`${name}(${inner.flatMap((i) => i.missing).join(",")})`);
        } else
          viaDynamic.push(
            ...inner.filter((i) => i.used).flatMap((i) => i.viaDynamic),
          );
      }
    }
  }
  return { used, missing, viaDynamic };
}

function evalSelector(selector: string): Verdict {
  // html/body can never be descendants of a `.bootstrap` wrapper element.
  if (/\.bootstrap\s+(?:>\s*)?(?::root|html|body)\b/.test(selector))
    return {
      used: false,
      missing: ["(html/body inside .bootstrap)"],
      viaDynamic: [],
    };
  let ast;
  try {
    ast = selectorParser().astSync(selector);
  } catch {
    return { used: true, missing: [], viaDynamic: [`(unparsed: ${selector})`] };
  }
  const verdicts = ast.nodes.map(evalSelectorNode);
  if (verdicts.some((v) => v.used))
    return {
      used: true,
      missing: [],
      viaDynamic: verdicts.filter((v) => v.used).flatMap((v) => v.viaDynamic),
    };
  return {
    used: false,
    missing: verdicts.flatMap((v) => v.missing),
    viaDynamic: [],
  };
}

// --- 4. prune ------------------------------------------------------------------
const gzip = (s: string) => Bun.gzipSync(Buffer.from(s), { level: 9 }).length;
const pad = (v: string | number, n: number) => String(v).padStart(n);
fs.mkdirSync(OUT, { recursive: true });
const totals = { before: 0, after: 0, gzBefore: 0, gzAfter: 0 };

for (const name of FILES) {
  const file = path.join(CSS_DIR, name);
  const source = fs.readFileSync(file, "utf8");
  const root = postcss.parse(source, { from: file });
  const rules: Rule[] = [];
  root.walkRules((rule) => {
    rules.push(rule);
  });
  const rulesBefore = rules.length;
  const removed: string[] = [];
  const keptViaDynamic: string[] = [];

  for (const rule of rules.reverse()) {
    if (!rule.parent) continue;
    if (
      rule.parent.type === "atrule" &&
      /keyframes$/.test((rule.parent as AtRule).name)
    )
      continue;
    const keep: string[] = [];
    for (const sel of new Set(rule.selectors)) {
      let resolved: string[];
      try {
        resolved = resolveNestedSelector(sel, rule);
      } catch {
        resolved = [sel];
      }
      const verdicts = resolved.map(evalSelector);
      if (verdicts.some((v) => v.used)) {
        keep.push(sel);
        const via = [...new Set(verdicts.flatMap((v) => v.viaDynamic))];
        if (via.length)
          keptViaDynamic.push(
            `${resolved.join(" | ")}    [via: ${via.join(" ")}]`,
          );
      } else {
        removed.push(
          `${resolved.join(" | ")}    [missing: ${[...new Set(verdicts.flatMap((v) => v.missing))].join(" ")}]`,
        );
      }
    }
    if (keep.length === 0) {
      // Drop a comment that sat directly above this rule as its own paragraph.
      const prev = rule.prev();
      const next = rule.next();
      if (
        prev?.type === "comment" &&
        !prev.text.startsWith("!") &&
        (!next || /\n\s*\n/.test(next.raws.before ?? ""))
      )
        prev.remove();
      rule.remove();
    } else if (keep.join() !== rule.selectors.join()) {
      const indent = (rule.raws.before ?? "").split("\n").pop() ?? "";
      rule.selector = keep.join(
        rule.selector.includes("\n") ? `,\n${indent}` : ",",
      );
    }
  }

  // Empty @media/@supports blocks and empty rules.
  let changed = true;
  while (changed) {
    changed = false;
    root.walkAtRules((at) => {
      if (
        /^(media|supports|layer|container)$/.test(at.name) &&
        at.nodes?.every((n) => n.type === "comment")
      ) {
        at.remove();
        changed = true;
      }
    });
    root.walkRules((rule) => {
      if (rule.nodes.length === 0) {
        rule.remove();
        changed = true;
      }
    });
  }
  // @keyframes and @font-face nothing references any more.
  const animations = new Set<string>();
  const values: string[] = [];
  root.walkDecls((decl) => {
    if (!(
      decl.parent?.type === "atrule" &&
      (decl.parent as AtRule).name === "font-face"
    ))
      values.push(decl.value);
    if (/^(-webkit-|-moz-)?animation(-name)?$/.test(decl.prop))
      for (const part of decl.value.split(","))
        for (const token of part.trim().split(/\s+/)) animations.add(token);
  });
  root.walkAtRules(/keyframes$/, (at) => {
    if (!animations.has(at.params.trim().replace(/^["']|["']$/g, ""))) {
      removed.push(`@${at.name} ${at.params}`);
      at.remove();
    }
  });
  const allValues = values.join("\n").toLowerCase();
  root.walkAtRules("font-face", (at) => {
    let family = "";
    at.walkDecls("font-family", (decl) => {
      family = decl.value
        .replace(/^["']|["']$/g, "")
        .trim()
        .toLowerCase();
    });
    if (family && !allValues.includes(family)) {
      removed.push(`@font-face ${family}`);
      at.remove();
    }
  });

  const output = root.toString();
  let rulesAfter = 0;
  root.walkRules(() => {
    rulesAfter++;
  });
  fs.writeFileSync(path.join(OUT, name), output);
  fs.writeFileSync(path.join(OUT, `${name}.removed.txt`), removed.join("\n"));
  fs.writeFileSync(
    path.join(OUT, `${name}.kept-via-runtime.txt`),
    keptViaDynamic.join("\n"),
  );
  if (WRITE) fs.writeFileSync(file, output);
  totals.before += source.length;
  totals.after += output.length;
  totals.gzBefore += gzip(source);
  totals.gzAfter += gzip(output);
  console.log(
    `${name.padEnd(15)} rules ${pad(rulesBefore, 5)} -> ${pad(rulesAfter, 4)}   bytes ${pad(source.length, 7)} -> ${pad(output.length, 6)}   gzip ${pad(gzip(source), 6)} -> ${pad(gzip(output), 5)}   removed selectors ${removed.length}`,
  );
}
console.log(
  `TOTAL           bytes ${totals.before} -> ${totals.after} (${(100 - (totals.after / totals.before) * 100).toFixed(1)}% smaller)   gzip ${totals.gzBefore} -> ${totals.gzAfter}`,
);
console.log(
  WRITE
    ? `wrote pruned files to ${path.relative(ROOT, CSS_DIR)}`
    : `dry run: pruned files and reports in ${path.relative(ROOT, OUT)}`,
);
