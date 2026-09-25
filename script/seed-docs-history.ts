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
 * Every run builds _docs fresh, same as CI. How it stays fast:
 *  - No checkout. We use a throwaway bare, blobless repo in tmp/ and only
 *    download the blobs under docs/.
 *  - Blobs are deduplicated across versions and fetched in one request.
 */
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { $ } from "bun";

const REPO_URL =
  process.env.METABASE_REPO_URL ?? "https://github.com/metabase/metabase.git";
const ROOT = join(import.meta.dir, "..");
const REPO_DIR = join(ROOT, "tmp/metabase-docs.git");
const OUT_DIR = join(ROOT, "_docs");

// v0.44+ have reliable release-x.NN.x branches; older minors use their newest tag.
const FIRST_BRANCH_MINOR = 44;

type Version = { name: string; minor: number }; // { name: "v0.63", minor: 63 }

const git = (...args: string[]) => $`git -C ${REPO_DIR} ${args}`.quiet();

async function main() {
  const seedAll = process.argv[2] === "all";
  const config = await readConfig();
  const versions = await selectVersions(config, seedAll);
  const refs = await resolveRefs(versions);

  await initRepo();
  try {
    await fetchRefs(refs);
    const names = versions.map((v) => v.name);
    await fetchBlobs(names, config.docs_version);
    await rm(OUT_DIR, { recursive: true, force: true });
    await Promise.all(names.map((name) => extract(name, config.docs_version)));
  } finally {
    await rm(REPO_DIR, { recursive: true, force: true });
  }

  await copyLatest(config.docs_version);

  console.log(
    `seeded ${versions.length} versions, copied ${config.docs_version} to latest`,
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
  const parts = (ref: string) =>
    ref.split("/").pop()!.slice(1).split(".").map(Number);
  const [pa, pb] = [parts(a), parts(b)];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff) return diff;
  }
  return 0;
}

// --- 3. blobless repo ---------------------------------------------------

async function initRepo() {
  // Clears leftovers from an interrupted run.
  await rm(REPO_DIR, { recursive: true, force: true });
  await mkdir(REPO_DIR, { recursive: true });
  await $`git init --bare -q ${REPO_DIR}`;
  await git("remote", "add", "origin", REPO_URL);
}

const seedRef = (name: string) => `refs/seed/${name}`;

/** One fetch for all versions: commits + trees only, no file contents. */
async function fetchRefs(refs: { name: string; ref: string }[]) {
  const refspecs = refs.map((r) => `+${r.ref}:${seedRef(r.name)}`);
  await git(
    "fetch",
    "--depth=1",
    "--filter=blob:none",
    "--no-tags",
    "--no-write-fetch-head",
    "origin",
    ...refspecs,
  );
}

// --- 4. fetch every docs/ blob in a single request -----------------------

async function fetchBlobs(names: string[], docsVersion: string) {
  const listings = await Promise.all(
    names.map((name) => git("ls-tree", "-r", seedRef(name), "docs").text()),
  );
  // "<mode> blob <oid>\t<path>" -- identical files share an oid across versions.
  // Cloud docs only end up in _docs/latest/cloud (see copyLatest), so there's
  // no point fetching docs/cloud blobs for any version but the current one.
  const oids = new Set(
    listings.flatMap((listing, i) =>
      listing
        .split("\n")
        .filter(Boolean)
        .filter(
          (line) =>
            names[i] === docsVersion ||
            !line.split("\t")[1]?.startsWith("docs/cloud/"),
        )
        .map((line) => line.split(/\s/)[2]),
    ),
  );

  console.log(`fetching ${oids.size} blobs`);
  // Same invocation git uses for its own lazy fetches, but batched.
  await $`git -C ${REPO_DIR} -c fetch.negotiationAlgorithm=noop fetch origin --no-tags --no-write-fetch-head --filter=blob:none --stdin < ${lines(oids)}`.quiet();
}

/** Newline-separated stdin for a shell redirect. */
const lines = (items: Iterable<string>) =>
  new Response([...items].join("\n") + "\n");

// --- 5. extract ----------------------------------------------------------

async function extract(name: string, docsVersion: string) {
  const dest = join(OUT_DIR, name);
  await mkdir(dest, { recursive: true });

  // Cloud docs only belong in _docs/latest/cloud (see copyLatest), so skip
  // them here for every version except the one copyLatest copies from.
  const pathspec = name === docsVersion ? [] : [":!docs/cloud"];

  // Not piped: a pipeline only reports the last command's exit code, so a
  // failed `git archive` would leave a truncated tree that looks complete.
  const tarball = `${dest}.tar`;
  await git("archive", "-o", tarball, seedRef(name), "docs", ...pathspec);
  await $`tar -x -f ${tarball} --strip-components=1 -C ${dest}`.quiet();
  await rm(tarball);
}

// --- 6. latest -------------------------------------------------------------

/**
 * Copies _docs/<docs_version> to _docs/latest. Cloud docs only live in
 * _docs/latest/cloud (cloud is always on the newest version), so once copied,
 * they're dropped from _docs/<docs_version>.
 */
async function copyLatest(docsVersion: string) {
  const source = join(OUT_DIR, docsVersion);
  if (!existsSync(source)) {
    throw new Error(
      `docs_version ${docsVersion} was not seeded (is it supported? try "all")`,
    );
  }
  await cp(source, join(OUT_DIR, "latest"), { recursive: true });
  await rm(join(source, "cloud"), { recursive: true, force: true });
}

await main();
