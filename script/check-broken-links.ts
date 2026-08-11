// usage: bun script/check-broken-links.ts [output-file]
//
// Checks the built _site directory for broken *internal* links (a/link href,
// img/script/iframe/source/track src). This replaces the old
// `bundle exec htmlproofer` check that ran under Ruby/Bundler, which were
// removed as part of the Jekyll -> Astro migration.
//
// External links are intentionally not checked here (htmlproofer previously
// ran with --disable-external too). script/analyze_links.clj consumes this
// script's output to resolve "missing" internal links against redirects and
// metabase.com, so the report format below must keep matching the
// `internally linking to (/path)` pattern it greps for.

import fs from "node:fs";
import path from "node:path";

const SITE_DIR = path.resolve("_site");
const OUT_FILE = process.argv[2] ?? "htmlproofer.out";

// Ported from the old `htmlproofer --file-ignore` config: don't audit the
// outgoing links of pages under these paths (out of scope / known noisy).
const SOURCE_IGNORE_PATTERNS = [
  /\/community\//,
  /\/start\//,
  /\/plans\//,
  /\/pricing\//,
  /\/docs\/v[^/]*\//,
  /\/docs\/master/,
  /\/home\/new\//,
  /\/docs\/latest\/(contributing|faq)\.html$/,
  /running-metabase-on-elastic-beanstalk/,
];

// Ported from the old `htmlproofer --url-ignore` config: don't check links
// pointing at these targets, no matter where they're linked from.
const TARGET_IGNORE_PATTERNS = [/^\/docs\/latest\/api\//];

// Not a full HTML parser, but good enough for a static, machine-generated
// site: matches the href/src of the tags that can point at another page.
const TAG_RE =
  /<(?:a|link|img|script|iframe|source|track)\b[^>]*?\s(?:href|src)="([^"]*)"[^>]*>/gi;

// A trailing ".xyz" only counts as a file extension if it starts with a
// letter - version-y segments like "v0.37" or "v0.63.1" end in ".37"/".1",
// which are not extensions and should still get index.html/.html resolution.
const EXTENSION_RE = /\.[a-zA-Z][\w-]{0,10}$/;

// OpenGraph is intentionally NOT checked even though it was previously with
// htmlproofer. It was essentially an expensive no-op since OG images are
// served over cdn and external urls are skipped.
const CHECK_OPEN_GRAPH = false;

type BrokenLink = {
  source: string;
  target: string;
};

const isIgnoredSource = (urlPath: string): boolean =>
  SOURCE_IGNORE_PATTERNS.some((re) => re.test(urlPath));

const isIgnoredTarget = (urlPath: string): boolean =>
  TARGET_IGNORE_PATTERNS.some((re) => re.test(urlPath));

// protocol-prefixed (http:, mailto:, tel:, javascript:, ...) or protocol-relative (//host/path)
const isExternal = (url: string): boolean =>
  /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(url);

const listHtmlFiles = (dir: string): string[] => {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
};

const siteUrlPath = (file: string): string =>
  "/" + path.relative(SITE_DIR, file).split(path.sep).join("/");

const candidatePaths = (urlPath: string): string[] => {
  if (urlPath.endsWith("/")) return [`${urlPath}index.html`];
  if (EXTENSION_RE.test(urlPath)) return [urlPath];
  return [`${urlPath}.html`, `${urlPath}/index.html`];
};

const targetExists = (urlPath: string): boolean =>
  candidatePaths(urlPath).some((candidate) =>
    fs.existsSync(path.join(SITE_DIR, candidate)),
  );

const checkFile = (file: string, broken: BrokenLink[]): void => {
  const sourceUrlPath = siteUrlPath(file);
  if (isIgnoredSource(sourceUrlPath)) return;

  const html = fs.readFileSync(file, "utf8");
  const dirUrlPath = path.posix.dirname(sourceUrlPath);

  for (const match of html.matchAll(TAG_RE)) {
    const rawUrl = match[1].trim();
    if (!rawUrl || isExternal(rawUrl)) continue;

    // Existence only depends on the path; fragments/query strings don't
    // point at separate files.
    const urlPath = rawUrl.split("#")[0].split("?")[0];
    if (!urlPath) continue; // pure fragment/query, e.g. href="#section"

    const resolved = urlPath.startsWith("/")
      ? urlPath
      : path.posix.resolve(dirUrlPath, urlPath);

    if (isIgnoredTarget(resolved) || targetExists(resolved)) continue;

    broken.push({ source: sourceUrlPath, target: resolved });
  }
};

const main = (): void => {
  if (!fs.existsSync(SITE_DIR)) {
    console.error(
      `No _site directory found at ${SITE_DIR}. Run script/build first.`,
    );
    process.exit(1);
  }

  const files = listHtmlFiles(SITE_DIR);
  console.log(
    `Checking ${files.length} built pages for broken internal links...`,
  );

  if (CHECK_OPEN_GRAPH) {
    console.error("CHECK_OPEN_GRAPH not implemented.");
    process.exit(1);
  } else {
    console.log("Skipping OpenGraph checks.");
  }

  const broken: BrokenLink[] = [];
  for (const file of files) checkFile(file, broken);

  const lines = broken.map(
    ({ source, target }) =>
      `${source}: internally linking to ${target}, which does not exist`,
  );
  fs.writeFileSync(OUT_FILE, lines.length ? lines.join("\n") + "\n" : "");

  if (broken.length) {
    console.log(`Found ${broken.length} possibly-broken internal link(s):`);
    for (const line of lines) console.log(`  ${line}`);
    process.exitCode = 1;
  } else {
    console.log("No broken internal links found.");
  }
};

main();
