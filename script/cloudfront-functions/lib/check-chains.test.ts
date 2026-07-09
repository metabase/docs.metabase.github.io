// Unit tests for the multi-hop chain / loop detector. Each case hand-builds a KVS payload
// (the same { key: JSON-band-array } shape build-kvs.ts emits) and asserts what findChains
// reports, so the tests exercise the real compiled handler without touching the docs tree.
import { test, expect } from "bun:test";
import { findChains, describeVersions, formatChain } from "./check-chains";

const V = ["v0.50", "v0.51", "v0.52", "v0.53", "v0.54", "v0.55"];
const LATEST = "v0.55";

// A KVS value: one or more bands for a source key.
type Band = { t: string; mn: [number, number]; mx?: [number, number] };
const kvs = (m: Record<string, Band[]>): Record<string, string> =>
  Object.fromEntries(Object.entries(m).map(([k, v]) => [k, JSON.stringify(v)]));

test("A -> B -> C is one chain finding pointing at the final page", async () => {
  const chains = await findChains(
    kvs({
      a: [{ t: "b", mn: [0, 50] }],
      b: [{ t: "c", mn: [0, 50] }], // c is not a key -> terminal
    }),
    V,
    LATEST,
  );
  expect(chains).toHaveLength(1);
  expect(chains[0].kind).toBe("chain");
  expect(chains[0].paths).toEqual(["a", "b", "c"]);
  expect(chains[0].finalTarget).toBe("c");
  // Open-ended bands fire for every version and for master.
  expect(chains[0].versionRange).toBe("v0.50+");
});

test("A -> B -> A is reported as a loop (rotations deduped to one finding)", async () => {
  const chains = await findChains(
    kvs({
      a: [{ t: "b", mn: [0, 50] }],
      b: [{ t: "a", mn: [0, 50] }],
    }),
    V,
    LATEST,
  );
  expect(chains).toHaveLength(1);
  expect(chains[0].kind).toBe("loop");
  expect(chains[0].paths).toEqual(["a", "b", "a"]);
  expect(chains[0].finalTarget).toBe("");
});

test("a clean single hop is not flagged", async () => {
  const chains = await findChains(
    kvs({ a: [{ t: "b", mn: [0, 50] }] }), // b terminal
    V,
    LATEST,
  );
  expect(chains).toEqual([]);
});

test("redirect-to-self is not a false positive (runtime self-guard)", async () => {
  const chains = await findChains(
    kvs({ a: [{ t: "a", mn: [0, 50] }] }),
    V,
    LATEST,
  );
  expect(chains).toEqual([]);
});

test("non-overlapping bands do not chain", async () => {
  const chains = await findChains(
    kvs({
      a: [{ t: "b", mn: [0, 50], mx: [0, 52] }], // only v0.50–v0.52
      b: [{ t: "c", mn: [0, 55] }], // only v0.55+
    }),
    V,
    LATEST,
  );
  expect(chains).toEqual([]);
});

test("overlapping bands chain only within the overlap range", async () => {
  const chains = await findChains(
    kvs({
      a: [{ t: "b", mn: [0, 50], mx: [0, 55] }], // v0.50–v0.55 (bounded: not master)
      b: [{ t: "c", mn: [0, 53] }], // v0.53+
    }),
    V,
    LATEST,
  );
  expect(chains).toHaveLength(1);
  expect(chains[0].paths).toEqual(["a", "b", "c"]);
  expect(chains[0].versions).toEqual(["v0.53", "v0.54", "v0.55"]);
  // Bounded max (v0.55) means master is excluded, so no open-ended "+" label.
  expect(chains[0].versionRange).toBe("v0.53–v0.55");
});

test("describeVersions renders runs, open-ended, and master", () => {
  expect(describeVersions(["v0.50", "v0.51", "v0.52"], V)).toBe("v0.50–v0.52");
  expect(describeVersions(["v0.53"], V)).toBe("v0.53");
  // A run reaching the newest version plus master collapses to "v0.54+".
  expect(describeVersions(["v0.54", "v0.55", "master"], V)).toBe("v0.54+");
  // A gap splits into two runs.
  expect(describeVersions(["v0.50", "v0.52", "v0.53"], V)).toBe(
    "v0.50, v0.52–v0.53",
  );
});

test("formatChain emits a ::error:: annotation with the hop path and collapse fix", () => {
  const text = formatChain({
    kind: "chain",
    paths: ["a", "b", "c"],
    versions: ["v0.53", "v0.54", "v0.55"],
    versionRange: "v0.53–v0.55",
    finalTarget: "c",
  });
  expect(text).toContain("::error::CHAIN");
  expect(text).toContain("/docs/<version>/a -> /docs/<version>/b -> /docs/<version>/c");
  expect(text).toContain("2 hops");
  expect(text).toContain("`c`"); // names the final page to collapse to
});
