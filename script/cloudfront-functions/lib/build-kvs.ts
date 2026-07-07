// Builds the CloudFront KeyValueStore payload consumed by the emitted redirect function
// (see build-docs-redirect-fn.ts). Merges the hand-authored manual rules
// (conditional-redirects.json) with the generated rules (generated-redirects.json,
// derived from redirect_from frontmatter) into a map keyed by the version-stripped
// source path.
//
// Value format (kept compact — CloudFront KVS caps values at 1024 bytes):
//   key   = "administration-guide/ssh-tunnel"   (the path after /docs/<version>/)
//   value = JSON string of bands, e.g.
//           [{"t":"databases/ssh-tunnel","mn":[0,44],"mx":[0,51]},
//            {"t":"databases/ssh-tunnel","mn":[0,52]}]
//   where `t` is the version-stripped target ("" = version root), `mn`/`mx` are the
//   inclusive [major, minor] band bounds, and an absent `mx` means open-ended.
//
// Manual rules are emitted FIRST for their key so they win over any generated band the
// function checks afterwards. Byte limits (512 key / 1024 value) are enforced here so a
// bad rule fails the build rather than the live KVS write.

import {
  loadRules,
  loadVersions,
  stripPlaceholderPath,
  validateRule,
  type ValidatedRule,
} from "./build-docs-redirect-fn";

const MAX_KEY_BYTES = 512;
export const MAX_VALUE_BYTES = 1024;

export interface KvsBand {
  t: string;
  mn: [number, number];
  mx?: [number, number];
}

// The version-stripped source path used as the KVS key.
export function ruleToKey(rule: ValidatedRule): string {
  const key = stripPlaceholderPath(rule.source, "source");
  if (key === "") {
    throw new Error(`rule source may not be the version root: ${rule.source}`);
  }
  return key;
}

export function ruleToBand(rule: ValidatedRule): KvsBand {
  const band: KvsBand = {
    t: stripPlaceholderPath(rule.target, "target"),
    mn: [rule.min.major, rule.min.minor],
  };
  if (rule.max) band.mx = [rule.max.major, rule.max.minor];
  return band;
}

// Merge manual + generated rules into the keyed KVS payload. `manualRules` come first per
// key, so the function checks them first and they win; exact-duplicate bands are collapsed
// so a manual rule that restates a generated one costs nothing.
export function buildKvs(
  manualRules: unknown[],
  generatedRules: unknown[],
  versions: string[],
): Record<string, string> {
  const versionSet = new Set(versions);
  const byKey = new Map<string, KvsBand[]>();

  const add = (rules: unknown[]) => {
    rules.forEach((raw, i) => {
      const rule = validateRule(raw, i, versionSet);
      const key = ruleToKey(rule);
      const band = ruleToBand(rule);
      let bands = byKey.get(key);
      if (!bands) byKey.set(key, (bands = []));
      const serialized = JSON.stringify(band);
      if (!bands.some((b) => JSON.stringify(b) === serialized)) bands.push(band);
    });
  };

  add(manualRules); // manual first → checked first by the function
  add(generatedRules);

  const out: Record<string, string> = {};
  for (const key of [...byKey.keys()].sort()) {
    if (Buffer.byteLength(key) > MAX_KEY_BYTES) {
      throw new Error(`KVS key exceeds ${MAX_KEY_BYTES} bytes: ${key}`);
    }
    const value = JSON.stringify(byKey.get(key));
    if (Buffer.byteLength(value) > MAX_VALUE_BYTES) {
      throw new Error(
        `KVS value for "${key}" exceeds ${MAX_VALUE_BYTES} bytes (${Buffer.byteLength(value)})`,
      );
    }
    out[key] = value;
  }
  return out;
}

export interface KvsDiff {
  puts: Array<{ Key: string; Value: string }>;
  deletes: Array<{ Key: string }>;
}

// Compute the minimal set of writes to turn the live store (`current`) into `desired`:
// put every key whose value changed or is new, delete every key that is gone. Keeping the
// write small is the whole point of committing generated-redirects.json — a nightly run
// that moves one page touches a handful of keys, not all ~400.
export function diffKvs(
  desired: Record<string, string>,
  current: Record<string, string>,
): KvsDiff {
  const puts: Array<{ Key: string; Value: string }> = [];
  for (const [Key, Value] of Object.entries(desired)) {
    if (current[Key] !== Value) puts.push({ Key, Value });
  }
  const deletes: Array<{ Key: string }> = [];
  for (const Key of Object.keys(current)) {
    if (!(Key in desired)) deletes.push({ Key });
  }
  puts.sort((a, b) => (a.Key < b.Key ? -1 : 1));
  deletes.sort((a, b) => (a.Key < b.Key ? -1 : 1));
  return { puts, deletes };
}

// Split a diff into request batches no larger than `size` write operations each (CloudFront
// KVS caps the number of keys per UpdateKeys call). Puts are packed first, then deletes.
export function chunkDiff(diff: KvsDiff, size: number): KvsDiff[] {
  // Puts and deletes self-discriminate: only a put carries a `Value`.
  const ops = [...diff.puts, ...diff.deletes];
  const isPut = (o: (typeof ops)[number]): o is { Key: string; Value: string } =>
    "Value" in o;
  const batches: KvsDiff[] = [];
  for (let i = 0; i < ops.length; i += size) {
    const slice = ops.slice(i, i + size);
    batches.push({
      puts: slice.filter(isPut),
      deletes: slice.filter((o) => !isPut(o)),
    });
  }
  return batches;
}

// Orchestrator: read both rule files + the version snapshot and return the KVS payload.
// A missing generated file is treated as empty so the function can be built before the
// first generation run.
export function generateKvs(
  manualPath: string,
  generatedPath: string,
  versionsPath: string,
): Record<string, string> {
  const manual = loadRules(manualPath);
  const generated = safeLoadRules(generatedPath);
  return buildKvs(manual, generated, loadVersions(versionsPath));
}

function safeLoadRules(p: string): unknown[] {
  try {
    return loadRules(p);
  } catch (err) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}
