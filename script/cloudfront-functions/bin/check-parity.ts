#!/usr/bin/env bun

// Parity gate for retiring jekyll-redirect-from: every `redirect_from` old URL in the
// _docs tree must still 301 through the emitted CloudFront Function + KVS. A "regression"
// (the function KEEPS a URL jekyll would have redirected) fails the build — that URL would
// 404 once the plugin is gone. A different-but-still-redirecting target is reported as an
// intentional override (a manual rule improving the hop) and does NOT fail.
//
// This simulates the function locally against the real KVS payload; it does not hit AWS.
// The final pre-cutover check should additionally diff against the built jekyll _site.
//
// Usage:
//   bun script/cloudfront-functions/bin/check-parity.ts [--docs-dir _docs] [--versions _config.yml]

import path from "node:path";
import { Command } from "commander";
import {
  compileForSimulation,
  loadDocsVersion,
  loadRules,
  loadVersions,
} from "../lib/build-docs-redirect-fn";
import { buildKvs } from "../lib/build-kvs";
import { collectPairs, computeBands } from "../lib/generate-redirects";
import { DOCS_DIR, MANUAL_RULES, VERSIONS_CONFIG } from "./constants";
import { runCli } from "./cli";

const program = new Command();
program
  .option("--docs-dir <path>", "path to the _docs collection", DOCS_DIR)
  .option("--versions <path>", "path to _config.yml", VERSIONS_CONFIG)
  .action(async (opts: { docsDir: string; versions: string }) => {
    const docsDir = path.resolve(opts.docsDir);
    const versionsPath = path.resolve(opts.versions);
    const versions = loadVersions(versionsPath);
    const latest = loadDocsVersion(versionsPath);

    // Scan the docs tree once; reuse the observations for both the rule table and the check.
    const pairs = collectPairs(docsDir);
    const manual = loadRules(path.resolve(MANUAL_RULES));
    const generated = computeBands(pairs, versions);
    const kvs = buildKvs(manual, generated, versions);
    const handler = compileForSimulation(kvs, versions, latest);

    let regressions = 0;
    let overrides = 0;
    let selfRefs = 0;
    for (const { version, srcPath, tgtPath } of pairs) {
      const uri = `/docs/${version}/${srcPath}`;
      const expected = tgtPath === "" ? `/docs/${version}/` : `/docs/${version}/${tgtPath}`;
      // A `redirect_from` that names the page's own URL: jekyll serves the real page (the
      // stub loses the path collision), so the function correctly KEEPING it is parity.
      if (expected === uri) {
        selfRefs++;
        continue;
      }
      const r = await handler({ request: { uri } });
      if (!r || r.statusCode !== 301) {
        regressions++;
        if (regressions <= 25) console.error(`REGRESSION (would 404): ${uri} -> ${expected}`);
        continue;
      }
      const got = r.headers.location.value;
      if (got !== expected) {
        overrides++;
        // Cap the printed noise (like the regression branch) but keep counting all.
        if (overrides <= 25) {
          console.error(`override: ${uri}\n  frontmatter -> ${expected}\n  function    -> ${got}`);
        }
      }
    }

    console.log(
      `\nChecked ${pairs.length} redirect_from sources: ${regressions} regression(s), ` +
        `${overrides} override(s), ${selfRefs} self-reference(s) (page serves itself).`,
    );
    if (regressions > 0) {
      console.error(`::error::${regressions} redirect(s) would 404 after removing jekyll-redirect-from`);
      process.exit(1);
    }
    console.log("PARITY OK — every redirect_from source still 301s.");
  });

runCli(program);
