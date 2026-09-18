#!/usr/bin/env bun
/**
 * Seeds _docs/v0.NN from the docs/ folder of every metabase/metabase release.
 *
 * Usage: bun script/seed-docs-history.ts [all]
 *
 * By default only currently-supported major versions are seeded (see
 * _data/major_version_support.json). Pass "all" to seed every version listed
 * in `available_versions` in _config.yml.
 *
 * How it stays fast:
 *  - No checkout. We keep a bare, blobless cache repo in tmp/ and only ever
 *    download the blobs under docs/.
 *  - Blobs are deduplicated across versions and fetched in one request.
 *  - A version is skipped when its docs/ tree id matches the last extraction.
 */
import { $ } from "bun";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REPO_URL =
  process.env.METABASE_REPO_URL ?? "https://github.com/metabase/metabase.git";
const ROOT = join(import.meta.dir, "..");
const CACHE_DIR = join(ROOT, "tmp/metabase-docs.git");
const STAMP_DIR = join(CACHE_DIR, "seeded"); // version -> docs/ tree id
const OUT_DIR = join(ROOT, "_docs");

// v0.44+ have reliable release-x.NN.x branches; older minors use their newest tag.
const FIRST_BRANCH_MINOR = 44;

type Version = { name: string; minor: number }; // { name: "v0.63", minor: 63 }

const git = (...args: string[]) => $`git -C ${CACHE_DIR} ${args}`.quiet();

async function main() {
  const seedAll = process.argv[2] === "all";
  const config = await readConfig();
  const versions = await selectVersions(config, seedAll);
  const refs = await resolveRefs(versions);

  await initCache();
  await fetchRefs(refs);

  const stale = await findStaleVersions(versions);
  if (stale.length > 0) {
    await fetchMissingBlobs(stale.map((s) => s.name));
    await Promise.all(stale.map(extract));
  }

  const copiedLatest = await syncLatest(config.docs_version);

  console.log(
    `seeded ${stale.length}, skipped ${versions.length - stale.length} (unchanged)` +
      (copiedLatest ? `, copied ${config.docs_version} to latest` : ""),
  );
}

// --- 1. which versions ---------------------------------------------------

type Config = { available_versions: string[]; docs_version: string };

async function readConfig() {
  return Bun.YAML.parse(
    await readFile(join(ROOT, "_config.yml"), "utf8"),
  ) as Config;
}

async function selectVersions(
  config: Config,
  seedAll: boolean,
): Promise<Version[]> {
  let versions = config.available_versions.map((name) => ({
    name,
    minor: Number(name.split(".")[1]),
  }));

  if (!seedAll) {
    const support = (await Bun.file(
      join(ROOT, "_data/major_version_support.json"),
    ).json()) as { major: number; eol: string }[];
    const today = new Date().toISOString().slice(0, 10);
    const supported = new Set(
      support.filter((s) => s.eol >= today).map((s) => s.major),
    );
    versions = versions.filter((v) => supported.has(v.minor));
  }
  return versions;
}

// --- 2. version -> remote ref --------------------------------------------

async function resolveRefs(versions: Version[]) {
  const remote =
    await $`git ls-remote --tags --heads ${REPO_URL} 'refs/heads/release-x.*' 'refs/tags/v0.*'`.text();
  const remoteRefs = remote
    .split("\n")
    .map((line) => line.split("\t")[1])
    .filter(Boolean);

  return versions.map((v) => {
    const ref = findRef(v, remoteRefs);
    if (!ref) throw new Error(`No branch or tag found for ${v.name}`);
    return { ...v, ref };
  });
}

function findRef({ minor }: Version, remoteRefs: string[]): string | undefined {
  if (minor >= FIRST_BRANCH_MINOR) {
    const branch = `refs/heads/release-x.${minor}.x`;
    return remoteRefs.includes(branch) ? branch : undefined;
  }
  // Non-prerelease tags only: v0.12.1, v0.12.1.2 (not v0.12.0-rc1 or ^{})
  const tagPattern = new RegExp(`^refs/tags/v0\\.${minor}(\\.\\d+)+$`);
  return remoteRefs
    .filter((ref) => tagPattern.test(ref))
    .sort((a, b) => compareNumeric(a, b))
    .at(-1);
}

function compareNumeric(a: string, b: string) {
  const parts = (ref: string) => ref.split("/").pop()!.slice(1).split(".").map(Number);
  const [pa, pb] = [parts(a), parts(b)];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff) return diff;
  }
  return 0;
}

// --- 3. blobless cache repo ----------------------------------------------

async function initCache() {
  if (existsSync(join(CACHE_DIR, "HEAD"))) return;
  await mkdir(CACHE_DIR, { recursive: true });
  await $`git init --bare -q ${CACHE_DIR}`;
  await git("remote", "add", "origin", REPO_URL);
}

const seedRef = (name: string) => `refs/seed/${name}`;

/** One fetch for all versions: commits + trees only, no file contents. */
async function fetchRefs(refs: { name: string; ref: string }[]) {
  const refspecs = refs.map((r) => `+${r.ref}:${seedRef(r.name)}`);
  await git(
    "fetch", "--depth=1", "--filter=blob:none", "--no-tags",
    "--no-write-fetch-head", "origin", ...refspecs,
  );
}

// --- 4. skip unchanged versions ------------------------------------------

async function findStaleVersions(versions: Version[]) {
  const checks = await Promise.all(
    versions.map(async ({ name }) => {
      const tree = (await git("rev-parse", `${seedRef(name)}:docs`).text()).trim();
      const stampFile = join(STAMP_DIR, name);
      const upToDate =
        existsSync(join(OUT_DIR, name)) &&
        existsSync(stampFile) &&
        (await readFile(stampFile, "utf8")) === tree;
      return upToDate ? null : { name, tree };
    }),
  );
  return checks.filter((c) => c !== null);
}

// --- 5. fetch only the blobs we don't have, in a single request ----------

async function fetchMissingBlobs(names: string[]) {
  const listings = await Promise.all(
    names.map((name) => git("ls-tree", "-r", seedRef(name), "docs").text()),
  );
  // "<mode> blob <oid>\t<path>" -- identical files share an oid across versions
  const oids = new Set(
    listings.flatMap((l) =>
      l.split("\n").filter(Boolean).map((line) => line.split(/\s/)[2]),
    ),
  );

  // GIT_NO_LAZY_FETCH stops cat-file from downloading blobs one at a time.
  const check = await $`git -C ${CACHE_DIR} cat-file --batch-check < ${lines(oids)}`
    .env({ ...process.env, GIT_NO_LAZY_FETCH: "1" })
    .quiet()
    .text();
  const missing = check
    .split("\n")
    .filter((line) => line.endsWith(" missing"))
    .map((line) => line.split(" ")[0]);

  if (missing.length === 0) return;
  console.log(`fetching ${missing.length} blobs`);
  // Same invocation git uses for its own lazy fetches, but batched.
  await $`git -C ${CACHE_DIR} -c fetch.negotiationAlgorithm=noop fetch origin --no-tags --no-write-fetch-head --filter=blob:none --stdin < ${lines(missing)}`.quiet();
}

/** Newline-separated stdin for a shell redirect. */
const lines = (items: Iterable<string>) => new Response([...items].join("\n") + "\n");

// --- 6. extract ----------------------------------------------------------

async function extract({ name, tree }: { name: string; tree: string }) {
  const dest = join(OUT_DIR, name);
  const stamp = join(STAMP_DIR, name);
  await rm(stamp, { force: true }); // an interrupted run must not look complete
  await rm(dest, { recursive: true, force: true });
  await mkdir(dest, { recursive: true });
  await $`git -C ${CACHE_DIR} archive ${seedRef(name)} docs | tar -x --strip-components=1 -C ${dest}`.quiet();
  await mkdir(STAMP_DIR, { recursive: true });
  await writeFile(stamp, tree);
}

// --- 7. latest -----------------------------------------------------------

/** Copies _docs/<docs_version> to _docs/latest unless it's already current. */
async function syncLatest(docsVersion: string) {
  const source = join(OUT_DIR, docsVersion);
  if (!existsSync(source)) {
    throw new Error(
      `docs_version ${docsVersion} was not seeded (is it supported? try "all")`,
    );
  }
  const dest = join(OUT_DIR, "latest");
  const stamp = join(STAMP_DIR, "latest");
  const current = `${docsVersion}:${await readFile(join(STAMP_DIR, docsVersion), "utf8")}`;

  if (existsSync(dest) && existsSync(stamp) && (await readFile(stamp, "utf8")) === current) {
    return false;
  }
  await rm(stamp, { force: true });
  await rm(dest, { recursive: true, force: true });
  await cp(source, dest, { recursive: true });
  await writeFile(stamp, current);
  return true;
}

await main();
