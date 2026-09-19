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
 * Steps: sparse-clone the metabase repo (docs/ only), then for each version
 * check out its branch or tag and copy docs/ to _docs/<version>/.
 */
import { $ } from "bun";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

const REPO_URL =
  process.env.METABASE_REPO_URL ?? "https://github.com/metabase/metabase.git";
const ROOT = join(import.meta.dir, "..");
const CLONE_DIR = join(ROOT, "tmp/metabase");
const OUT_DIR = join(ROOT, "_docs");

// v0.44+ have reliable release-x.NN.x branches; older minors use their newest tag.
const FIRST_BRANCH_MINOR = 44;

type Version = { name: string; minor: number }; // { name: "v0.63", minor: 63 }

const git = (...args: string[]) => $`git -C ${CLONE_DIR} ${args}`.quiet();

async function main() {
  const seedAll = process.argv[2] === "all";
  const config = await readConfig();
  const versions = await selectVersions(config, seedAll);

  await sparseClone();
  const remoteRefs = await listRefs();

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  for (const version of versions) {
    const ref = findRef(version, remoteRefs);
    if (!ref) throw new Error(`No branch or tag found for ${version.name}`);

    console.log(`${version.name} <- ${ref}`);
    await git("checkout", "--force", "--detach", ref);
    await cp(join(CLONE_DIR, "docs"), join(OUT_DIR, version.name), {
      recursive: true,
    });
  }

  await copyLatest(config.docs_version);
  console.log(`seeded ${versions.length} versions`);
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

// --- 2. sparse clone -----------------------------------------------------

/** Fresh clone with full history but no file contents; only docs/ is checked out. */
async function sparseClone() {
  await rm(CLONE_DIR, { recursive: true, force: true });
  await mkdir(join(CLONE_DIR, ".."), { recursive: true });
  await $`git clone --quiet --filter=blob:none --no-checkout ${REPO_URL} ${CLONE_DIR}`;
  await git("sparse-checkout", "set", "docs");
}

async function listRefs() {
  const out = await git(
    "for-each-ref", "--format=%(refname)", "refs/remotes/origin", "refs/tags",
  ).text();
  return out.split("\n").filter(Boolean);
}

// --- 3. version -> ref ---------------------------------------------------

function findRef({ minor }: Version, refs: string[]): string | undefined {
  if (minor >= FIRST_BRANCH_MINOR) {
    const branch = `refs/remotes/origin/release-x.${minor}.x`;
    return refs.includes(branch) ? branch : undefined;
  }
  // Non-prerelease tags only: v0.12.1, v0.12.1.2 (not v0.12.0-rc1)
  const tagPattern = new RegExp(`^refs/tags/v0\\.${minor}(\\.\\d+)+$`);
  return refs.filter((ref) => tagPattern.test(ref)).sort(compareNumeric).at(-1);
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

// --- 4. latest -----------------------------------------------------------

/** Copies _docs/<docs_version> to _docs/latest. */
async function copyLatest(docsVersion: string) {
  const source = join(OUT_DIR, docsVersion);
  if (!existsSync(source)) {
    throw new Error(
      `docs_version ${docsVersion} was not seeded (is it supported? try "all")`,
    );
  }
  await cp(source, join(OUT_DIR, "latest"), { recursive: true });
}

await main();
