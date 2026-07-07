// Library for generating the viewer-request CloudFront Function that performs
// version-conditional /docs redirects. The CLI wrapper lives in
// ../bin/build-docs-redirect-fn.ts — this module is pure logic + file loaders so it
// can be unit-tested without touching argv/stdout.
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

// Emit the CloudFront Function source. It embeds the version snapshot + `latest` target
// and reads the rule bands from the associated KeyValueStore at request time.
function buildFunction(versions: string[], latest: string): string {
  const versionsLiteral = `{${versions
    .map((v) => `${JSON.stringify(v)}:1`)
    .join(",")}}`;

  return `// AUTO-GENERATED by script/cloudfront-functions/bin/build-docs-redirect-fn.ts — do not edit by hand.
// Version-conditional /docs redirects for the fronting CloudFront distribution.
// Rule table lives in the associated KeyValueStore (built by build-kvs.ts); this
// function only does the lookup + version-band arithmetic.
import cf from "cloudfront";

var kvs = cf.kvs();

// Snapshot of _config.yml \`available_versions\`. A version only redirects if it exists here.
var VERSIONS = ${versionsLiteral};
// The concrete version that /docs/latest points at (_config.yml \`docs_version\`).
var LATEST = ${JSON.stringify(latest)};

var ROOT_RE = /^\\/docs\\/(v\\d+\\.\\d+|latest|master)$/;
var PAGE_RE = /^\\/docs\\/(v\\d+\\.\\d+|latest|master)\\/(.+?)\\/?$/;
var VERSION_RE = /^v?(\\d+)\\.(\\d+)/;

// Parse an existing version into { major, minor }, resolving the \`latest\` alias.
// Returns null for \`master\` (handled separately) and for versions that do not exist.
function parsed(version) {
  var v = version === "latest" ? LATEST : version;
  if (!VERSIONS[v]) return null;
  var m = VERSION_RE.exec(v);
  return m ? { major: Number(m[1]), minor: Number(m[2]) } : null;
}

// A band is { t: targetPath, mn: [major, minor], mx: [major, minor] | undefined }.
function qualifies(version, band) {
  // \`master\` is bleeding-edge — newer than any concrete maxVersion — so it matches only
  // open-ended bands.
  if (version === "master") return !band.mx;
  var p = parsed(version);
  if (!p) return false;
  if (p.major < band.mn[0] || (p.major === band.mn[0] && p.minor < band.mn[1])) return false;
  if (band.mx && (p.major > band.mx[0] || (p.major === band.mx[0] && p.minor > band.mx[1]))) return false;
  return true;
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: { location: { value: location } },
  };
}

async function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Structural: canonicalize /docs/<version> -> /docs/<version>/ for real versions/aliases.
  var root = ROOT_RE.exec(uri);
  if (root) {
    var known = root[1] === "latest" || root[1] === "master" || !!VERSIONS[root[1]];
    return known ? redirect(uri + "/") : request;
  }

  // Version-conditional page redirects, keyed by the version-stripped path.
  var m = PAGE_RE.exec(uri);
  if (!m) return request;
  var version = m[1];
  var key = m[2];

  var value;
  try {
    value = await kvs.get(key);
  } catch (e) {
    return request; // no rule for this path
  }
  if (!value) return request;

  var bands = JSON.parse(value);
  for (var i = 0; i < bands.length; i++) {
    if (qualifies(version, bands[i])) {
      var location = "/docs/" + version + "/" + bands[i].t;
      // Skip a redirect-to-self (source regex allows an optional trailing slash).
      return location !== uri ? redirect(location) : request;
    }
  }
  return request;
}
`;
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
