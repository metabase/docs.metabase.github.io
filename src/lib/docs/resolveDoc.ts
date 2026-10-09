// Relative, not `@/`: astro.config.mjs loads this file (via collectRedirects)
// before the alias exists.
import { getVersionSupport } from "./versionSupport";

// Derives a doc's version/slug/URL from its content collection id, since
// docs are stored as `<version>/<slug>.md` but need a canonical
// `/docs/<version>/<slug>` URL for routing, sitemaps, and redirects.
export const resolveDocUrl = ({
  id,
  includeTrailingIndex,
}: {
  id: string;
  includeTrailingIndex?: boolean;
}): { version: string; slug: string; url: string } => {
  let resolvedId = id.replace(/\.html$/, "").replace(/\/README$/, "/index");
  if (!includeTrailingIndex) {
    resolvedId = resolvedId.replace(/\/index$/, "/");
  }
  const separatorIndex = resolvedId.indexOf("/");
  const version =
    (separatorIndex !== -1
      ? resolvedId.slice(0, separatorIndex)
      : resolvedId) || "latest";
  const slug =
    separatorIndex !== -1 ? resolvedId.slice(separatorIndex + 1) : "";
  return { version, slug, url: `/docs/${version}/${slug}` };
};

// Inverse of resolveDocUrl for `.md` docs: maps `/docs/<version>/<slug>` back
// to the collection id, with index pages ending in `/index`.
export const docIdFromUrl = (url: string): string =>
  url.replace(/^\/docs\//, "").replace(/\/$/, "/index");

// Only supported versions publish Markdown versions of their docs. Versions
// the support data has no verdict on ("latest", "master") count as supported.
export const hasMarkdownVersion = (version: string): boolean =>
  getVersionSupport(version)?.status !== "unsupported";

// The Markdown version of a doc page, served by
// `src/pages/docs/[version]/[...slug].md.ts`. Directory-style URLs have no
// filename to hang the extension on, so they map to `index.md`.
export const toMarkdownUrl = (url: string): string =>
  url.endsWith("/") ? `${url}index.md` : `${url}.md`;

// A docs URL's version and the path after it: "/docs/latest/questions/start"
// -> { version: "latest", path: "questions/start" }, and path "" for a
// version's home. Undefined for URLs outside a version (/docs/all, /docs/404).
export const parseDocUrl = (
  url: string,
): { version: string; path: string } | undefined => {
  const match = /^\/docs\/([^/]+)\/(.*)$/.exec(url);
  return match ? { version: match[1], path: match[2] } : undefined;
};

// The same page in another version: "/docs/latest/questions/start" ->
// "/docs/v0.62/questions/start".
export const toVersionUrl = (
  url: string,
  version: string,
): string | undefined => {
  const parsed = parseDocUrl(url);
  return parsed && `/docs/${version}/${parsed.path}`;
};

// Where a link to another version should go from `url`: the same page when
// that version has it (`urls` from getDocUrls, src/lib/docs/docUrls.ts), else
// the version's home.
export const findDocInVersion = (
  urls: ReadonlySet<string>,
  url: string,
  version: string,
): string => {
  const samePage = toVersionUrl(url, version);
  return samePage && urls.has(samePage) ? samePage : `/docs/${version}/`;
};
