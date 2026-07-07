#!/usr/bin/env bun

// Deploy the version-conditional /docs redirect CloudFront Function + its associated
// KeyValueStore. Replaces the "Build KVS payload", "Ensure KeyValueStore exists",
// "Publish changed KVS keys", "Publish CloudFront Function", and "Associate function with
// the /docs* behavior" shell steps of .github/workflows/update-docs-redirect-fn.yml with
// one typed SDK flow.
//
// The redirect table (KVS payload) and the small function source are built in-process from
// the same tested lib/ used by the build-* CLIs — no intermediate JSON files, no jq, no
// pagination-by-bash. AWS credentials/region come from the environment (the workflow's
// aws-actions/configure-aws-credentials step), which the SDK default provider chain reads.
//
// Steps: build payload + function code (size-guarded) -> ensure the KVS exists (poll to
// READY) -> write only the changed keys (batched, ETag re-threaded per write) ->
// create/update + publish the function -> point the distribution's /docs* viewer-request at
// the LIVE function (skipped when --dist-id is empty).
//
// Usage:
//   bun script/cloudfront-functions/bin/deploy-redirect-fn.ts \
//     --fn-name <name> --kvs-name <name> [--dist-id <id>]

import path from "node:path";
import {
  CloudFrontClient,
  CreateFunctionCommand,
  CreateKeyValueStoreCommand,
  DescribeFunctionCommand,
  DescribeKeyValueStoreCommand,
  GetDistributionConfigCommand,
  NoSuchFunctionExists,
  paginateListKeyValueStores,
  PublishFunctionCommand,
  UpdateDistributionCommand,
  UpdateFunctionCommand,
  type FunctionAssociation,
  type FunctionConfig,
} from "@aws-sdk/client-cloudfront";
import {
  CloudFrontKeyValueStoreClient,
  DescribeKeyValueStoreCommand as DescribeKvsDataCommand,
  paginateListKeys,
  UpdateKeysCommand,
} from "@aws-sdk/client-cloudfront-keyvaluestore";
// Side-effect import: the KVS data plane signs with SigV4a, and @aws-sdk/signature-v4-multi-region
// only *dispatches* to an implementation registered in smithy's container. Importing this package
// registers its pure-JS SignatureV4a; without it, signing throws "Neither CRT nor JS SigV4a
// implementation is available" at the first ListKeys/UpdateKeys call.
import "@aws-sdk/signature-v4a";
import { Command } from "commander";
import { chunkDiff, diffKvs, generateKvs } from "../lib/build-kvs";
import { generate, MAX_FN_BYTES } from "../lib/build-docs-redirect-fn";
import {
  GENERATED_RULES,
  MANUAL_RULES,
  REGION,
  VERSIONS_CONFIG,
} from "./constants";
import { runCli } from "./cli";

const COMMENT = "Version-conditional /docs redirects";
const FN_RUNTIME = "cloudfront-js-2.0";
const DOCS_PATH_PATTERN = "/docs*";
// CloudFront KVS caps operations per UpdateKeys call.
const KVS_CHUNK = 50;

const log = (msg: string) => process.stderr.write(`${msg}\n`);
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Resolve a KeyValueStore ARN by name (paginating the control-plane list), creating it and
// waiting for READY on first run.
async function ensureKvs(cf: CloudFrontClient, name: string): Promise<string> {
  for await (const page of paginateListKeyValueStores({ client: cf }, {})) {
    const hit = page.KeyValueStoreList?.Items?.find((s) => s.Name === name);
    if (hit?.ARN) return hit.ARN;
  }

  log(`Creating KeyValueStore ${name}`);
  const created = await cf.send(
    new CreateKeyValueStoreCommand({ Name: name, Comment: COMMENT }),
  );
  // Wait for it to leave PROVISIONING before we associate/write.
  for (let i = 0; i < 40; i++) {
    const desc = await cf.send(new DescribeKeyValueStoreCommand({ Name: name }));
    if (desc.KeyValueStore?.Status === "READY") break;
    await sleep(5000);
  }
  const arn = created.KeyValueStore?.ARN;
  if (!arn) throw new Error(`Could not resolve KeyValueStore ARN for ${name}`);
  return arn;
}

// Write only the keys that changed.
async function syncKeys(
  kv: CloudFrontKeyValueStoreClient,
  kvsArn: string,
  desired: Record<string, string>,
): Promise<void> {
  // Assemble the live store's current keys into a { key: value } map (paginated).
  const current: Record<string, string> = {};
  for await (const page of paginateListKeys({ client: kv }, { KvsARN: kvsArn })) {
    for (const item of page.Items ?? []) {
      if (item.Key !== undefined && item.Value !== undefined) current[item.Key] = item.Value;
    }
  }

  const diff = diffKvs(desired, current);
  const batches = chunkDiff(diff, KVS_CHUNK);
  if (batches.length === 0) {
    log("KVS already in sync; no key writes.");
    return;
  }

  // The ETag rotates on every write, so re-thread it through each batch.
  let etag = (await kv.send(new DescribeKvsDataCommand({ KvsARN: kvsArn }))).ETag;
  for (const batch of batches) {
    if (!etag) throw new Error(`Missing KVS ETag for ${kvsArn}`);
    etag = (
      await kv.send(
        new UpdateKeysCommand({
          KvsARN: kvsArn,
          IfMatch: etag,
          Puts: batch.puts,
          Deletes: batch.deletes,
        }),
      )
    ).ETag;
  }
  log(
    `Applied ${batches.length} KVS batch(es): ${diff.puts.length} put(s), ${diff.deletes.length} delete(s).`,
  );
}

// Create (first run) or update the DEVELOPMENT function, then publish DEVELOPMENT -> LIVE.
async function publishFunction(
  cf: CloudFrontClient,
  fnName: string,
  kvsArn: string,
  code: Uint8Array,
): Promise<void> {
  const config: FunctionConfig = {
    Comment: COMMENT,
    Runtime: FN_RUNTIME,
    KeyValueStoreAssociations: {
      Quantity: 1,
      Items: [{ KeyValueStoreARN: kvsArn }],
    },
  };

  let devEtag: string | undefined;
  try {
    devEtag = (
      await cf.send(new DescribeFunctionCommand({ Name: fnName, Stage: "DEVELOPMENT" }))
    ).ETag;
  } catch (err) {
    // CloudFront throws this when the function does not exist yet (first run).
    if (!(err instanceof NoSuchFunctionExists)) throw err;
  }

  // create/update returns the fresh ETag we need to publish — no extra DescribeFunction.
  const pubEtag = devEtag
    ? (
        await cf.send(
          new UpdateFunctionCommand({
            Name: fnName,
            IfMatch: devEtag,
            FunctionConfig: config,
            FunctionCode: code,
          }),
        )
      ).ETag
    : (
        await cf.send(
          new CreateFunctionCommand({ Name: fnName, FunctionConfig: config, FunctionCode: code }),
        )
      ).ETag;

  if (!pubEtag) throw new Error(`No DEVELOPMENT ETag for function ${fnName}`);
  await cf.send(new PublishFunctionCommand({ Name: fnName, IfMatch: pubEtag }));
  log(`Published function ${fnName}`);
}

// Point the distribution's /docs* viewer-request at the function's LIVE ARN, preserving any
// other event-type associations. No-op when already wired.
async function associateFunction(
  cf: CloudFrontClient,
  distId: string,
  fnName: string,
): Promise<void> {
  // A distribution always invokes a function's LIVE version, so association only needs to
  // happen once per env: subsequent deploys detect the existing wiring and no-op.
  const fnArn = (
    await cf.send(new DescribeFunctionCommand({ Name: fnName, Stage: "LIVE" }))
  ).FunctionSummary?.FunctionMetadata?.FunctionARN;
  if (!fnArn) throw new Error(`No LIVE ARN for function ${fnName}`);

  const res = await cf.send(new GetDistributionConfigCommand({ Id: distId }));
  const config = res.DistributionConfig;
  const etag = res.ETag;
  if (!config || !etag) throw new Error(`Could not read distribution config for ${distId}`);

  const docs = config.CacheBehaviors?.Items?.find((b) => b.PathPattern === DOCS_PATH_PATTERN);
  if (!docs) throw new Error(`Distribution ${distId} has no ${DOCS_PATH_PATTERN} cache behavior`);

  const existing = docs.FunctionAssociations?.Items ?? [];
  const current =
    existing.find((a) => a.EventType === "viewer-request")?.FunctionARN ?? "";
  if (current === fnArn) {
    log(`Already associated (${fnArn}); nothing to do.`);
    return;
  }
  log(`Re-pointing ${DOCS_PATH_PATTERN} viewer-request: '${current || "<none>"}' -> '${fnArn}'`);

  // Replace only the viewer-request association on /docs*, preserving other event types.
  const items: FunctionAssociation[] = [
    ...existing.filter((a) => a.EventType !== "viewer-request"),
    { FunctionARN: fnArn, EventType: "viewer-request" },
  ];
  docs.FunctionAssociations = { Quantity: items.length, Items: items };

  await cf.send(
    new UpdateDistributionCommand({ Id: distId, IfMatch: etag, DistributionConfig: config }),
  );
  log(`Associated ${fnName} with ${DOCS_PATH_PATTERN} viewer-request on ${distId}`);
}

const program = new Command();

program
  .description("Deploy the /docs redirect CloudFront Function + KeyValueStore")
  .requiredOption("--fn-name <name>", "CloudFront Function name")
  .requiredOption("--kvs-name <name>", "CloudFront KeyValueStore name")
  .option("--dist-id <id>", "fronting distribution id (skip association when empty)")
  .action(async (opts: { fnName: string; kvsName: string; distId?: string }) => {
    // Build the desired KVS payload + function source in-process (validates the rule files).
    const desired = generateKvs(
      path.resolve(MANUAL_RULES),
      path.resolve(GENERATED_RULES),
      path.resolve(VERSIONS_CONFIG),
    );
    const code = Buffer.from(generate(path.resolve(VERSIONS_CONFIG)), "utf8");
    log(`Function size: ${code.length} bytes (CloudFront limit: ${MAX_FN_BYTES})`);
    if (code.length > MAX_FN_BYTES) {
      throw new Error(`Function is ${code.length} bytes, over the ${MAX_FN_BYTES}-byte limit`);
    }

    const cf = new CloudFrontClient({ region: REGION });
    const kv = new CloudFrontKeyValueStoreClient({ region: REGION });

    const kvsArn = await ensureKvs(cf, opts.kvsName);
    await syncKeys(kv, kvsArn, desired);
    await publishFunction(cf, opts.fnName, kvsArn, code);

    const distId = opts.distId?.trim();
    if (distId) {
      await associateFunction(cf, distId, opts.fnName);
    } else {
      log("No distribution ID for this env; skipping association.");
    }
  });

runCli(program);
