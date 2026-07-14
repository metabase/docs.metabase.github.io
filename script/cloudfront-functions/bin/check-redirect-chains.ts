#!/usr/bin/env bun

// Gate: fail the build if the /docs redirect table encodes any multi-hop chain (A -> B -> C,
// where the browser follows two 301s) or loop (A -> B -> A). The runtime function is
// single-hop, so it never follows these itself — but a real browser does, which is slow and
// bad for SEO, and a loop never terminates. It builds the merged (manual + generated) KVS
// payload the same way the deploy does, then follows every redirect through the real compiled
// handler.
//
// Unlike the deploy (which reads the committed generated-redirects.json), it rescans the docs
// tree, so it catches chains even when that committed file is stale. Runs locally; no AWS.
//
// Usage:
//   bun script/cloudfront-functions/bin/check-redirect-chains.ts [--docs-dir _docs] [--versions _config.yml]

import path from "node:path";
import { Command } from "commander";
import {
  loadDocsVersion,
  loadVersions,
} from "../lib/build-docs-redirect-fn";
import { buildKvsFromDocsTree } from "../lib/build-kvs";
import { findChains, formatChain } from "../lib/check-chains";
import { DOCS_DIR, MANUAL_RULES, VERSIONS_CONFIG } from "./constants";
import { runCli } from "./cli";

const PRINT_CAP = 25;

const program = new Command();
program
  .description("Fail on multi-hop /docs redirect chains and loops")
  .option("--docs-dir <path>", "path to the _docs collection", DOCS_DIR)
  .option("--versions <path>", "path to _config.yml", VERSIONS_CONFIG)
  .action(async (opts: { docsDir: string; versions: string }) => {
    const versionsPath = path.resolve(opts.versions);
    const versions = loadVersions(versionsPath);
    const latest = loadDocsVersion(versionsPath);

    // Same build path as the deploy: manual rules win, generated rules fill in the rest.
    const { kvs } = buildKvsFromDocsTree(
      path.resolve(opts.docsDir),
      path.resolve(MANUAL_RULES),
      versions,
    );

    const chains = await findChains(kvs, versions, latest);
    const loops = chains.filter((c) => c.kind === "loop");
    const hops = chains.filter((c) => c.kind === "chain");

    chains.slice(0, PRINT_CAP).forEach((c) => console.error(formatChain(c)));
    if (chains.length > PRINT_CAP) {
      console.error(`… and ${chains.length - PRINT_CAP} more (showing first ${PRINT_CAP}).`);
    }

    console.log(
      `\nChecked ${Object.keys(kvs).length} redirect source(s): ` +
        `${hops.length} chain(s), ${loops.length} loop(s).`,
    );
    if (chains.length > 0) {
      console.error(
        `::error::${hops.length} multi-hop redirect chain(s) and ${loops.length} loop(s) — collapse each to a single hop.`,
      );
      process.exit(1);
    }
    console.log("CHAINS OK — every redirect resolves in a single hop.");
  });

runCli(program);
