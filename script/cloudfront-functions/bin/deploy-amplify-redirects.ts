#!/usr/bin/env bun

// Deploy redirects.json to an AWS Amplify app as its custom rewrite/redirect rules.
// Replaces the `aws amplify update-app --custom-rules "$(jq -c . redirects.json)"` step in
// .github/workflows/update-redirects.yml with a typed SDK call.
//
// Credentials/region come from the environment (the workflow's
// aws-actions/configure-aws-credentials step exports AWS_ACCESS_KEY_ID / _SECRET_ACCESS_KEY /
// _SESSION_TOKEN), which the SDK's default provider chain reads automatically.
//
// Usage:
//   bun script/cloudfront-functions/bin/deploy-amplify-redirects.ts --app-id <id>

import path from "node:path";
import {
  AmplifyClient,
  UpdateAppCommand,
  type CustomRule,
} from "@aws-sdk/client-amplify";
import { Command } from "commander";
import { loadRules } from "../lib/build-docs-redirect-fn";
import { AMPLIFY_RULES, REGION } from "./constants";
import { runCli } from "./cli";

// Read + validate redirects.json as an array of Amplify custom rules ({ source, target,
// status?, condition? }). Fails the deploy on malformed JSON rather than shipping it.
function loadCustomRules(rulesPath: string): CustomRule[] {
  const parsed = loadRules(rulesPath);
  parsed.forEach((rule, i) => {
    if (!rule || typeof rule !== "object") {
      throw new Error(`Rule ${i} in ${rulesPath} is not an object`);
    }
    const r = rule as Record<string, unknown>;
    if (typeof r.source !== "string" || typeof r.target !== "string") {
      throw new Error(`Rule ${i} in ${rulesPath} needs string \`source\` and \`target\``);
    }
  });
  return parsed as CustomRule[];
}

const program = new Command();

program
  .description("Deploy redirects.json to an Amplify app as its custom rules")
  .requiredOption("--app-id <id>", "Amplify app id")
  .action(async (opts: { appId: string }) => {
    const customRules = loadCustomRules(path.resolve(AMPLIFY_RULES));
    const client = new AmplifyClient({ region: REGION });
    await client.send(
      new UpdateAppCommand({ appId: opts.appId, customRules }),
    );
    process.stderr.write(
      `Deployed ${customRules.length} custom rule(s) to Amplify app ${opts.appId}\n`,
    );
  });

runCli(program);
