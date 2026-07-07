import { test, expect } from "bun:test";
import fs from "fs";
import os from "os";
import path from "path";
import {
  compileForSimulation,
  parseVersion,
  validateRule,
  gte,
  stripPlaceholderPath,
  loadVersions,
  loadDocsVersion,
  loadRules,
  generate,
  MAX_FN_BYTES,
  type SimulatedHandler as Handler,
} from "./build-docs-redirect-fn";
import { buildKvs } from "./build-kvs";

// The set of versions that "exist" — mirrors _config.yml `available_versions`.
const VERSIONS = Array.from({ length: 51 }, (_, i) => `v0.${12 + i}`); // v0.12 … v0.62
const LATEST = "v0.62";

// Compile the emitted function against a mock KeyValueStore (see compileForSimulation),
// defaulting versions/latest to the mirror above.
function compile(
  data: Record<string, string>,
  versions: string[] = VERSIONS,
  latest: string = LATEST,
): Handler {
  return compileForSimulation(data, versions, latest);
}

// Build the KVS payload from rules, exactly as production does, then compile the function.
function compileRules(rules: any[], versions: string[] = VERSIONS): Handler {
  return compile(buildKvs([], rules, versions), versions);
}

async function result(handler: Handler, uri: string): Promise<any> {
  const r = await handler({ request: { uri } });
  if (r && r.statusCode === 301) return { redirect: r.headers.location.value };
  return { keep: true, uri: r.request && r.request.uri };
}

// The contributing rules — the same shape build-kvs receives (no trailing-slash rule;
// that is now structural/inline in the function).
const RULES = [
  {
    source: "/docs/<version>/contributing",
    minVersion: "0.44",
    maxVersion: "0.51",
    target: "/docs/<version>/developers-guide/contributing",
  },
  {
    source: "/docs/<version>/contributing",
    minVersion: "0.52",
    target: "/docs/<version>/CONTRIBUTING",
  },
  {
    source: "/docs/<version>/developers-guide/contributing",
    minVersion: "0.52",
    target: "/docs/<version>/CONTRIBUTING",
  },
];

test("lowercase contributing routes to the right target per version band", async () => {
  const h = compileRules(RULES);
  expect((await result(h, "/docs/v0.30/contributing")).keep).toBeTruthy();
  expect((await result(h, "/docs/v0.43/contributing")).keep).toBeTruthy();
  expect(await result(h, "/docs/v0.44/contributing")).toEqual({
    redirect: "/docs/v0.44/developers-guide/contributing",
  });
  expect(await result(h, "/docs/v0.51/contributing")).toEqual({
    redirect: "/docs/v0.51/developers-guide/contributing",
  });
  expect(await result(h, "/docs/v0.52/contributing")).toEqual({
    redirect: "/docs/v0.52/CONTRIBUTING",
  });
  expect(await result(h, "/docs/v0.62/contributing")).toEqual({
    redirect: "/docs/v0.62/CONTRIBUTING",
  });
});

test("developers-guide contributing redirects only from v0.52", async () => {
  const h = compileRules(RULES);
  expect(
    (await result(h, "/docs/v0.45/developers-guide/contributing")).keep,
  ).toBeTruthy();
  expect(
    (await result(h, "/docs/v0.51/developers-guide/contributing")).keep,
  ).toBeTruthy();
  expect(await result(h, "/docs/v0.52/developers-guide/contributing")).toEqual({
    redirect: "/docs/v0.52/CONTRIBUTING",
  });
});

test("latest resolves to docs_version; master matches only open-ended bands", async () => {
  const h = compileRules(RULES);
  // latest -> v0.62, which is >= 0.52 -> CONTRIBUTING.
  expect(await result(h, "/docs/latest/contributing")).toEqual({
    redirect: "/docs/latest/CONTRIBUTING",
  });
  // master matches the open-ended band, not the bounded v0.44–v0.51 one.
  expect(await result(h, "/docs/master/contributing")).toEqual({
    redirect: "/docs/master/CONTRIBUTING",
  });
  expect(await result(h, "/docs/master/developers-guide/contributing")).toEqual({
    redirect: "/docs/master/CONTRIBUTING",
  });
});

test("latest/master do NOT match a rule that is only bounded", async () => {
  const h = compileRules([RULES[0]]); // only the v0.44–v0.51 band
  expect((await result(h, "/docs/latest/contributing")).keep).toBeTruthy();
  expect((await result(h, "/docs/master/contributing")).keep).toBeTruthy();
});

test("a version that does not exist is kept even if numerically in band", async () => {
  const h = compileRules(RULES);
  expect((await result(h, "/docs/v0.99/contributing")).keep).toBeTruthy();
  expect(
    (await result(h, "/docs/v0.99/developers-guide/contributing")).keep,
  ).toBeTruthy();
});

test("every redirect resolves in a single hop (no chaining)", async () => {
  const h = compileRules(RULES);
  const sources = [
    "/docs/v0.44/contributing",
    "/docs/v0.52/contributing",
    "/docs/v0.62/contributing",
    "/docs/latest/contributing",
    "/docs/v0.52/developers-guide/contributing",
  ];
  for (const uri of sources) {
    const first = await result(h, uri);
    expect(first.redirect).toBeTruthy();
    expect((await result(h, first.redirect)).keep).toBeTruthy();
  }
});

test("optional trailing slash on the source is matched", async () => {
  const h = compileRules(RULES);
  expect(await result(h, "/docs/v0.62/developers-guide/contributing/")).toEqual({
    redirect: "/docs/v0.62/CONTRIBUTING",
  });
  expect(await result(h, "/docs/v0.44/contributing/")).toEqual({
    redirect: "/docs/v0.44/developers-guide/contributing",
  });
});

test("unrelated and partial paths are kept", async () => {
  const h = compileRules(RULES);
  expect((await result(h, "/docs/v0.62/databases/connecting")).keep).toBeTruthy();
  expect(
    (await result(h, "/docs/v0.62/developers-guide/contributing-guidelines")).keep,
  ).toBeTruthy();
  expect((await result(h, "/docs/nightly/contributing")).keep).toBeTruthy();
});

test("manual rules win over a generated band on the same key", async () => {
  // Generated says foo -> generated-target; the manual rule overrides to manual-target.
  const manual = [
    { source: "/docs/<version>/foo", minVersion: "0.52", target: "/docs/<version>/manual-target" },
  ];
  const generated = [
    { source: "/docs/<version>/foo", minVersion: "0.52", target: "/docs/<version>/generated-target" },
  ];
  const h = compile(buildKvs(manual, generated, VERSIONS));
  expect(await result(h, "/docs/v0.62/foo")).toEqual({
    redirect: "/docs/v0.62/manual-target",
  });
});

test("structural: version root gets a canonical trailing slash, only for known versions", async () => {
  const h = compileRules(RULES);
  expect(await result(h, "/docs/v0.62")).toEqual({ redirect: "/docs/v0.62/" });
  expect(await result(h, "/docs/v0.12")).toEqual({ redirect: "/docs/v0.12/" });
  expect(await result(h, "/docs/latest")).toEqual({ redirect: "/docs/latest/" });
  expect(await result(h, "/docs/master")).toEqual({ redirect: "/docs/master/" });
  // Non-version single segments and below-floor versions are left untouched.
  expect((await result(h, "/docs/all")).keep).toBeTruthy();
  expect((await result(h, "/docs/nightly")).keep).toBeTruthy();
  expect((await result(h, "/docs/v0.11")).keep).toBeTruthy();
});

test("the already-slashed version root does not redirect to itself", async () => {
  const h = compileRules(RULES);
  expect((await result(h, "/docs/v0.62/")).keep).toBeTruthy();
  expect((await result(h, "/docs/latest/")).keep).toBeTruthy();
  expect((await result(h, "/docs/master/")).keep).toBeTruthy();
});

// ---- helpers ----

test("parseVersion accepts real-world version strings", () => {
  expect(parseVersion("0.52", 0, "minVersion")).toEqual({ label: "v0.52", major: 0, minor: 52 });
  expect(parseVersion("v0.52", 0, "minVersion")).toEqual({ label: "v0.52", major: 0, minor: 52 });
  expect(parseVersion("v0.52.1", 0, "minVersion")).toEqual({ label: "v0.52", major: 0, minor: 52 });
  expect(parseVersion("1.62", 0, "minVersion")).toEqual({ label: "v1.62", major: 1, minor: 62 });
});

test("parseVersion throws on non-strings and malformed values", () => {
  expect(() => parseVersion(52, 0, "minVersion")).toThrow(/must be a version string/);
  expect(() => parseVersion("fifty-two", 0, "minVersion")).toThrow(/invalid `minVersion`/);
});

test("gte compares major then minor", () => {
  const v = (s: string) => parseVersion(s, 0, "x");
  expect(gte(v("0.52"), v("0.44"))).toBe(true);
  expect(gte(v("0.44"), v("0.52"))).toBe(false);
  expect(gte(v("0.52"), v("0.52"))).toBe(true);
  expect(gte(v("1.0"), v("0.99"))).toBe(true);
});

test("stripPlaceholderPath strips the /docs/<version>/ prefix; root -> ''", () => {
  expect(stripPlaceholderPath("/docs/<version>/a/b", "source")).toBe("a/b");
  expect(stripPlaceholderPath("/docs/<version>/a/b/", "source")).toBe("a/b");
  expect(stripPlaceholderPath("/docs/<version>/", "target")).toBe("");
  expect(stripPlaceholderPath("/docs/<version>", "target")).toBe("");
  expect(() => stripPlaceholderPath("/docs/v0.62/a", "source")).toThrow(/must start with/);
});

test("validateRule enforces the rule shape and version band", () => {
  const set = new Set(VERSIONS);
  const ok = {
    source: "/docs/<version>/x",
    minVersion: "0.52",
    target: "/docs/<version>/y",
  };
  expect(validateRule(ok, 0, set)).toEqual({
    source: "/docs/<version>/x",
    target: "/docs/<version>/y",
    min: { label: "v0.52", major: 0, minor: 52 },
    max: null,
  });
  expect(() => validateRule({ ...ok, source: 5 }, 0, set)).toThrow(/string `source`/);
  expect(() => validateRule({ ...ok, minVersion: "0.99" }, 0, set)).toThrow(
    /not in available_versions/,
  );
  expect(() =>
    validateRule({ ...ok, minVersion: "0.52", maxVersion: "0.44" }, 0, set),
  ).toThrow(/below `minVersion`/);
});

test("loadRules reads a JSON array and rejects non-arrays", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "redirect-fn-rules-"));
  const arr = path.join(dir, "rules.json");
  fs.writeFileSync(arr, JSON.stringify([{ source: "/docs/<version>/x" }]));
  expect(loadRules(arr)).toEqual([{ source: "/docs/<version>/x" }]);
  const obj = path.join(dir, "obj.json");
  fs.writeFileSync(obj, JSON.stringify({ not: "an array" }));
  expect(() => loadRules(obj)).toThrow(/must contain a JSON array/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("loadVersions and loadDocsVersion read _config.yml", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "redirect-fn-yml-"));
  const good = path.join(dir, "good.yml");
  fs.writeFileSync(good, "available_versions:\n  - v0.51\n  - v0.52\ndocs_version: v0.52\n");
  expect(loadVersions(good)).toEqual(["v0.51", "v0.52"]);
  expect(loadDocsVersion(good)).toBe("v0.52");

  // docs_version falls back to the newest available version when absent.
  const noDv = path.join(dir, "no-dv.yml");
  fs.writeFileSync(noDv, "available_versions:\n  - v0.51\n  - v0.52\n");
  expect(loadDocsVersion(noDv)).toBe("v0.52");

  const empty = path.join(dir, "empty.yml");
  fs.writeFileSync(empty, "available_versions: []\n");
  expect(() => loadVersions(empty)).toThrow(/non-empty `available_versions`/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("generate emits a compilable function that stays under 10 KB", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "redirect-fn-gen-"));
  const versionsPath = path.join(dir, "config.yml");
  fs.writeFileSync(
    versionsPath,
    "available_versions:\n  - v0.61\n  - v0.62\ndocs_version: v0.62\n",
  );
  const output = generate(versionsPath);
  expect(output.includes("async function handler(event)")).toBeTruthy();
  expect(output.includes('LATEST = "v0.62"')).toBeTruthy();
  expect(Buffer.byteLength(output)).toBeLessThanOrEqual(MAX_FN_BYTES);
  fs.rmSync(dir, { recursive: true, force: true });
});
