// Multi-hop redirect chain / loop detector for the /docs redirect table.
//
// The emitted CloudFront Function is single-hop by design (one kvs.get, returns on the
// first qualifying band — see build-docs-redirect-fn.ts). But nothing stops the *table*
// from encoding, for the same version, both A -> B and B -> C: the function answers each
// hop correctly, yet the BROWSER follows two separate 301s (a real multi-hop chain, bad
// for SEO/latency) or, for A -> B -> A, an infinite redirect loop.
//
// This module reuses the exact runtime logic — it compiles the real handler with
// `compileForSimulation` over the merged (manual + generated) KVS payload and follows the
// `Location` a browser would follow. If a source 301s more than once it's a chain; if the
// walk revisits a URI it's a loop. Findings for the same hop-signature are collapsed
// across the versions they fire in so the report stays readable.

import {
  compileForSimulation,
  VERSION_PLACEHOLDER,
} from "./build-docs-redirect-fn";
import { stripDocsVersion } from "./generate-redirects";

export interface RedirectChain {
  kind: "chain" | "loop";
  // Version-stripped hop paths, e.g. ["a", "b", "c"] ("" = version root). For a loop the
  // repeated head is included as the last element so the cycle is visible.
  paths: string[];
  // Affected versions (available_versions order, with "master" last).
  versions: string[];
  // Human label for the affected versions, e.g. "v0.53–v0.55" or "v0.60+".
  versionRange: string;
  // Version-stripped final target ("" = version root) — the page a chain should collapse
  // to. Empty for loops (no stable terminus).
  finalTarget: string;
}

// Strip `/docs/<version>/<rest>` down to `<rest>` ("" = version root). Every URI we follow
// carries the `/docs/<version>/` prefix, so this always matches; fall back to the raw URI.
function stripVersion(uri: string): string {
  return stripDocsVersion(uri)?.rest ?? uri;
}

// Rotate a pure cycle (closes on its head: paths[last] === paths[0]) so the smallest node
// starts it. A -> B -> A and B -> A -> B then share one signature instead of being reported
// once per entry point. Non-pure walks (a tail leading into a cycle) are left untouched.
function canonicalLoop(paths: string[]): string[] {
  if (paths.length < 2 || paths[paths.length - 1] !== paths[0]) return paths;
  const cycle = paths.slice(0, -1); // drop the repeated closing node
  let min = 0;
  for (let i = 1; i < cycle.length; i++) if (cycle[i] < cycle[min]) min = i;
  const rotated = [...cycle.slice(min), ...cycle.slice(0, min)];
  return [...rotated, rotated[0]];
}

// Follow the redirects a browser would follow from `startUri`, using the real handler.
// Returns the visited URIs and whether the walk is a multi-hop chain, a loop, or neither.
async function follow(
  handler: (event: { request: { uri: string } }) => Promise<any>,
  startUri: string,
): Promise<{ uris: string[]; kind: "chain" | "loop" | "none" }> {
  const uris = [startUri];
  const seen = new Set([startUri]);
  let cur = startUri;
  // The seen-set already bounds the walk; the cap is a belt-and-suspenders backstop.
  for (let i = 0; i < 100; i++) {
    const r = await handler({ request: { uri: cur } });
    if (!r || r.statusCode !== 301) break; // terminal — the browser stops here
    const next: string = r.headers.location.value;
    uris.push(next);
    if (seen.has(next)) return { uris, kind: "loop" };
    seen.add(next);
    cur = next;
  }
  // hops == 1 is a normal single redirect; only 2+ hops is a user-visible chain.
  return { uris, kind: uris.length - 1 >= 2 ? "chain" : "none" };
}

// Render the set of affected versions as contiguous runs over `versions` order, e.g.
// "v0.53–v0.55" or "v0.60+" (a run reaching the newest version, which `master` extends).
export function describeVersions(
  affected: string[],
  versions: string[],
): string {
  const order = new Map(versions.map((v, i) => [v, i]));
  const newest = versions[versions.length - 1];
  const hasMaster = affected.includes("master");
  const indices = affected
    .filter((v) => order.has(v))
    .map((v) => order.get(v)!)
    .sort((a, b) => a - b);

  const parts: string[] = [];
  let masterFolded = false;
  for (let i = 0; i < indices.length; ) {
    let j = i;
    while (j + 1 < indices.length && indices[j + 1] === indices[j] + 1) j++;
    const startV = versions[indices[i]];
    const endV = versions[indices[j]];
    if (endV === newest && hasMaster) {
      parts.push(`${startV}+`); // open-ended: covers newest, master, and future versions
      masterFolded = true;
    } else if (i === j) {
      parts.push(startV);
    } else {
      parts.push(`${startV}–${endV}`);
    }
    i = j + 1;
  }
  if (hasMaster && !masterFolded) parts.push("master");
  return parts.join(", ");
}

// Detect every multi-hop chain and loop in the merged KVS payload. Probes each source key
// against every version (plus `master`, which matches only open-ended bands) and collapses
// findings that share a hop-signature across the versions they fire in.
export async function findChains(
  kvs: Record<string, string>,
  versions: string[],
  latest: string,
): Promise<RedirectChain[]> {
  const handler = compileForSimulation(kvs, versions, latest);
  const probeVersions = [...versions, "master"];
  const keys = Object.keys(kvs);

  // signature -> { kind, paths, finalTarget, versions:Set }
  const bySig = new Map<
    string,
    {
      kind: "chain" | "loop";
      paths: string[];
      finalTarget: string;
      versions: Set<string>;
    }
  >();

  for (const version of probeVersions) {
    for (const key of keys) {
      const { uris, kind } = await follow(handler, `/docs/${version}/${key}`);
      if (kind === "none") continue;
      const paths =
        kind === "loop"
          ? canonicalLoop(uris.map(stripVersion))
          : uris.map(stripVersion);
      const sig = `${kind}\x00${paths.join("\x01")}`;
      let entry = bySig.get(sig);
      if (!entry) {
        entry = {
          kind,
          paths,
          finalTarget: kind === "chain" ? paths[paths.length - 1] : "",
          versions: new Set(),
        };
        bySig.set(sig, entry);
      }
      entry.versions.add(version);
    }
  }

  const order = new Map(versions.map((v, i) => [v, i]));
  const versionRank = (v: string) =>
    v === "master" ? Infinity : (order.get(v) ?? Infinity);

  const out: RedirectChain[] = [...bySig.values()].map((e) => ({
    kind: e.kind,
    paths: e.paths,
    versions: [...e.versions].sort((a, b) => versionRank(a) - versionRank(b)),
    versionRange: describeVersions([...e.versions], versions),
    finalTarget: e.finalTarget,
  }));

  // Deterministic ordering for reviewable output: by the full hop path.
  out.sort((a, b) => {
    const ka = a.paths.join("\x01");
    const kb = b.paths.join("\x01");
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
  return out;
}

// Render one finding as a GitHub-annotated (`::error::`) block: the hop path plus, for a
// chain, the collapse fix (point the head's redirect_from straight at the final page).
export function formatChain(c: RedirectChain): string {
  const uri = (p: string) =>
    p === ""
      ? `/docs/${VERSION_PLACEHOLDER}/`
      : `/docs/${VERSION_PLACEHOLDER}/${p}`;
  const path = c.paths.map(uri).join(" -> ");

  if (c.kind === "loop") {
    return (
      `::error::LOOP ${path} (${c.versionRange})\n` +
      `  fix: remove the cyclic redirect_from so the source resolves to a real page.`
    );
  }

  const hops = c.paths.length - 1;
  const head = c.paths[0];
  const final = c.finalTarget || "/";
  return (
    `::error::CHAIN ${path} (${hops} hops, ${c.versionRange})\n` +
    `  fix: point redirect_from for \`${head}\` straight at the final page \`${final}\` ` +
    `(add \`- ${uri(head)}\` to the redirect_from of the page now served at \`${final}\`), ` +
    `instead of the intermediate hop.`
  );
}
