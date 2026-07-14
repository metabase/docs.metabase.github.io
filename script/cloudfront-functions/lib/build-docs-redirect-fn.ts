// Library for generating the viewer-request CloudFront Function that performs
// version-conditional /docs redirects. The function is built in-process at deploy time by
// ../bin/deploy-redirect-fn.ts — this module is pure logic + file loaders so it can be
// unit-tested without touching argv/stdout.
//
// The function *body* is real, editable source in ./docs-redirect-fn.js; `buildFunction`
// reads it and injects only the version snapshot (`VERSIONS` + `LATEST`) — there is no
// transpile or bundle step, just that substitution.
//
// The redirect *table* no longer lives inside the function code (there are ~400 rules,
// which blow the 10 KB CloudFront Functions limit). Instead it lives in an associated
// CloudFront KeyValueStore, keyed by the version-stripped source path, and built by
// ./build-kvs.ts from conditional-redirects.json (hand-authored) +
// generated-redirects.json (derived from redirect_from frontmatter). This module only
// emits the small function that does the lookup and the version-band arithmetic.
//
// Qualification has two gates: the version must exist (a member of `available_versions`
// from _config.yml — `latest` resolves to `docs_version`, `master` is bleeding-edge and
// matches only open-ended bands), and it must fall within the band's inclusive
// [min, max] range (max optional/open-ended), comparing major then minor. The emitted
// function embeds a snapshot of `available_versions` + `docs_version`, so it must be
// regenerated when a new version ships, and must stay within the CloudFront Functions
// limits (<10 KB, cloudfront-js-2.0, KVS reads only).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yamljs";

export const VERSION_PLACEHOLDER = "<version>";

// CloudFront Functions code-size limit. Owned here next to the code that emits the
// function so callers (the deploy bin, the test) share one source of truth; enforcing it
// at build time fails the build rather than the live publish.
export const MAX_FN_BYTES = 10240;

export interface ParsedVersion {
  label: string;
  major: number;
  minor: number;
}

// A rule after validation: `source`/`target` proven to be strings and the version band
// parsed. This is what the KVS builder consumes.
export interface ValidatedRule {
  source: string;
  target: string;
  min: ParsedVersion;
  max: ParsedVersion | null;
}

// Parse _config.yml once into its raw shape. The `loadVersions`/`loadDocsVersion`
// accessors and `generate` derive their fields from a single parse instead of re-reading
// the file per field.
function loadConfig(ymlPath: string): {
  available_versions?: unknown;
  docs_version?: unknown;
} {
  return (
    (yaml.load(ymlPath) as {
      available_versions?: unknown;
      docs_version?: unknown;
    }) ?? {}
  );
}

// Validate + extract `available_versions` from an already-parsed config.
function versionsFrom(
  config: { available_versions?: unknown },
  ymlPath: string,
): string[] {
  const versions = config.available_versions;
  if (!Array.isArray(versions) || versions.length === 0) {
    throw new Error(
      `${ymlPath} must declare a non-empty \`available_versions\` list`,
    );
  }
  if (!versions.every((v) => typeof v === "string")) {
    throw new Error(`${ymlPath} \`available_versions\` must be a list of strings`);
  }
  return versions as string[];
}

// Resolve `docs_version` (the concrete version /docs/latest points at) from an
// already-parsed config, defaulting to the newest available version when absent.
function docsVersionFrom(
  config: { docs_version?: unknown },
  versions: string[],
): string {
  const dv = config.docs_version;
  if (typeof dv === "string" && /^v?\d+\.\d+/.test(dv)) {
    return parseVersion(dv, 0, "docs_version").label;
  }
  return versions[versions.length - 1];
}

// Read the authoritative list of documentation versions from _config.yml's
// `available_versions` (an ordered list of `v0.NN` strings). This is the source of truth
// for "does this version exist" — the emitted function only redirects versions that
// appear here (plus the `latest`/`master` aliases, handled separately).
export function loadVersions(ymlPath: string): string[] {
  return versionsFrom(loadConfig(ymlPath), ymlPath);
}

// Read `docs_version` (the concrete version that `/docs/latest` points at) from
// _config.yml. Defaults to the newest `available_versions` entry when absent.
export function loadDocsVersion(ymlPath: string): string {
  const config = loadConfig(ymlPath);
  return docsVersionFrom(config, versionsFrom(config, ymlPath));
}

// Read and parse a redirects config (a JSON array of raw, still-untrusted rules).
export function loadRules(configPath: string): unknown[] {
  const rules: unknown = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (!Array.isArray(rules)) {
    throw new Error(`${configPath} must contain a JSON array`);
  }
  return rules;
}

// Parse a version string such as "0.52" (also accepts "v0.52" / "v0.52.1") into the
// pieces the band arithmetic needs. Metabase's major is always 0/1. `field` names the
// property for error messages. Returns { label: "v0.52", major: 0, minor: 52 }.
export function parseVersion(
  value: unknown,
  index: number,
  field: string,
): ParsedVersion {
  if (typeof value !== "string") {
    throw new Error(
      `Rule ${index} \`${field}\` must be a version string like "0.52", got: ${JSON.stringify(value)}`,
    );
  }
  const m = value.match(/^v?(\d+)\.(\d+)/);
  if (!m) {
    throw new Error(
      `Rule ${index} has an invalid \`${field}\`: ${JSON.stringify(value)}`,
    );
  }
  return { label: `v${m[1]}.${m[2]}`, major: Number(m[1]), minor: Number(m[2]) };
}

// True when `a` is at or after `b`, comparing major then minor.
export function gte(a: ParsedVersion, b: ParsedVersion): boolean {
  return a.major > b.major || (a.major === b.major && a.minor >= b.minor);
}

// The version-stripped path of a `/docs/<version>/...` source or target. Returns "" for a
// bare `/docs/<version>` or `/docs/<version>/` (the version root). Throws if the string
// does not carry the `<version>` placeholder in the standard prefix position.
export function stripPlaceholderPath(value: string, field: string): string {
  const prefix = `/docs/${VERSION_PLACEHOLDER}`;
  if (value !== prefix && !value.startsWith(`${prefix}/`)) {
    throw new Error(
      `\`${field}\` must start with ${prefix}/ : ${JSON.stringify(value)}`,
    );
  }
  return value.slice(prefix.length).replace(/^\//, "").replace(/\/+$/, "");
}

export function validateRule(
  rule: unknown,
  index: number,
  versionSet: Set<string>,
): ValidatedRule {
  if (!rule || typeof rule !== "object") {
    throw new Error(`Rule ${index} is not an object`);
  }
  const r = rule as Record<string, unknown>;
  if (typeof r.source !== "string") {
    throw new Error(`Rule ${index} is missing a string \`source\``);
  }
  if (typeof r.target !== "string") {
    throw new Error(`Rule ${index} is missing a string \`target\``);
  }
  const min = parseVersion(r.minVersion, index, "minVersion");
  if (!versionSet.has(min.label)) {
    throw new Error(
      `Rule ${index} \`minVersion\` (${min.label}) is not in available_versions`,
    );
  }
  // `maxVersion` is optional; when present it must exist and not be below `minVersion`.
  let max: ParsedVersion | null = null;
  if (r.maxVersion !== undefined) {
    max = parseVersion(r.maxVersion, index, "maxVersion");
    if (!versionSet.has(max.label)) {
      throw new Error(
        `Rule ${index} \`maxVersion\` (${max.label}) is not in available_versions`,
      );
    }
    if (!gte(max, min)) {
      throw new Error(
        `Rule ${index} has \`maxVersion\` (${max.label}) below \`minVersion\` (${min.label})`,
      );
    }
  }
  return { source: r.source, target: r.target, min, max };
}

// The deployed function body, kept as real source next to this module so it stays
// lintable/highlightable instead of a giant escaped template literal.
const FN_SOURCE_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "docs-redirect-fn.js",
);

// Replace the single line matching `re` in `src`, throwing if it isn't found. Guards against a
// placeholder rename silently shipping an empty versions snapshot to production. The injected
// `line` never carries the `@@BUILD:@@` marker, so an unchanged result means `re` didn't match.
function replaceOnce(src: string, re: RegExp, line: string): string {
  const next = src.replace(re, line);
  if (next === src) {
    throw new Error(
      `${FN_SOURCE_PATH} is missing the ${re} injection line — did a placeholder get renamed?`,
    );
  }
  return next;
}

// Emit the CloudFront Function source: read the real ./docs-redirect-fn.js body and inject the
// version snapshot + `latest` target. The rule bands are read from the associated KeyValueStore
// at request time, so nothing else is templated in.
function buildFunction(versions: string[], latest: string): string {
  const versionsLiteral = `{${versions
    .map((v) => `${JSON.stringify(v)}:1`)
    .join(",")}}`;

  const src = fs.readFileSync(FN_SOURCE_PATH, "utf8");
  const withVersions = replaceOnce(
    src,
    /^.*@@BUILD:VERSIONS@@.*$/m,
    `var VERSIONS = ${versionsLiteral};`,
  );
  return replaceOnce(
    withVersions,
    /^.*@@BUILD:LATEST@@.*$/m,
    `var LATEST = ${JSON.stringify(latest)};`,
  );
}

// Orchestrator: read the version snapshot from _config.yml and return the emitted source.
export function generate(versionsPath: string): string {
  const config = loadConfig(versionsPath);
  const versions = versionsFrom(config, versionsPath);
  return buildFunction(versions, docsVersionFrom(config, versions));
}

export type SimulatedHandler = (event: {
  request: { uri: string };
}) => Promise<any>;

// Compile the emitted function source into a runnable `handler` for local simulation
// (unit tests + the parity gate). The emitted source opens with
// `import cf from "cloudfront";`, which `new Function` can't execute, so strip that line
// and inject a mock `cf` whose `kvs().get(k)` reads from `data`, throwing on a miss
// exactly like the real KeyValueStore. Keeps the CloudFront host contract (the import to
// strip, the kvs miss semantics) in one place instead of copied per call site.
export function compileForSimulation(
  data: Record<string, string>,
  versions: string[],
  latest: string,
): SimulatedHandler {
  const src = buildFunction(versions, latest).replace(
    /^import cf from "cloudfront";$/m,
    "",
  );
  const cf = {
    kvs: () => ({
      get: async (k: string) => {
        if (!(k in data)) throw new Error("KeyNotFound");
        return data[k];
      },
    }),
  };
  return new Function("cf", `${src}\nreturn handler;`)(cf) as SimulatedHandler;
}
