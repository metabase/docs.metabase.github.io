#!/usr/bin/env bun

// CLI wrapper around ../lib/generate-redirects.ts. Scans the _docs tree for
// `redirect_from` frontmatter and writes the version-banded rule table (same schema as
// conditional-redirects.json) to --out.
//
// Usage:
//   bun script/cloudfront-functions/bin/generate-redirects.ts \
//     [--docs-dir <path>] [--versions <path>] [--out <path>]

import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";
import { loadVersions } from "../lib/build-docs-redirect-fn";
import { generate } from "../lib/generate-redirects";
import { DOCS_DIR, GENERATED_RULES, VERSIONS_CONFIG } from "./constants";
import { runCli } from "./cli";

const program = new Command();

program
  .description(
    "Generate the version-banded /docs redirect table from redirect_from frontmatter",
  )
  .option("--docs-dir <path>", "path to the _docs collection", DOCS_DIR)
  .option(
    "--versions <path>",
    "path to the _config.yml that declares available_versions",
    VERSIONS_CONFIG,
  )
  .option("--out <path>", "write the rule table here", GENERATED_RULES)
  .action((opts: { docsDir: string; versions: string; out: string }) => {
    const versions = loadVersions(path.resolve(opts.versions));
    const rules = generate(path.resolve(opts.docsDir), versions);
    const json = JSON.stringify(rules, null, 2) + "\n";
    const resolved = path.resolve(opts.out);
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, json);
    process.stderr.write(`Wrote ${rules.length} rules to ${opts.out}\n`);
  });

runCli(program);
