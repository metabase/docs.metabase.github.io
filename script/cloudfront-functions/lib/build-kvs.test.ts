import { test, expect } from "bun:test";
import {
  buildKvs,
  ruleToKey,
  ruleToBand,
  diffKvs,
  chunkDiff,
  MAX_VALUE_BYTES,
} from "./build-kvs";
import { validateRule } from "./build-docs-redirect-fn";

const VERSIONS = Array.from({ length: 52 }, (_, i) => `v0.${12 + i}`); // v0.12 … v0.63
const SET = new Set(VERSIONS);

const rule = (o: Record<string, unknown>) => validateRule(o, 0, SET);

test("ruleToKey / ruleToBand strip the version placeholder", () => {
  const r = rule({
    source: "/docs/<version>/a/b",
    minVersion: "0.44",
    maxVersion: "0.51",
    target: "/docs/<version>/c/d",
  });
  expect(ruleToKey(r)).toBe("a/b");
  expect(ruleToBand(r)).toEqual({ t: "c/d", mn: [0, 44], mx: [0, 51] });

  const open = rule({
    source: "/docs/<version>/faq",
    minVersion: "0.63",
    target: "/docs/<version>/",
  });
  expect(ruleToBand(open)).toEqual({ t: "", mn: [0, 63] });
});

test("ruleToKey rejects a version-root source", () => {
  const r = rule({
    source: "/docs/<version>",
    minVersion: "0.44",
    target: "/docs/<version>/x",
  });
  expect(() => ruleToKey(r)).toThrow(/may not be the version root/);
});

test("buildKvs groups bands by key and emits compact JSON values", () => {
  const generated = [
    { source: "/docs/<version>/x", minVersion: "0.44", maxVersion: "0.51", target: "/docs/<version>/y" },
    { source: "/docs/<version>/x", minVersion: "0.52", target: "/docs/<version>/z" },
  ];
  const out = buildKvs([], generated, VERSIONS);
  expect(out["x"]).toBe(
    '[{"t":"y","mn":[0,44],"mx":[0,51]},{"t":"z","mn":[0,52]}]',
  );
});

test("manual bands are emitted before generated ones for the same key", () => {
  const manual = [
    { source: "/docs/<version>/x", minVersion: "0.52", target: "/docs/<version>/manual" },
  ];
  const generated = [
    { source: "/docs/<version>/x", minVersion: "0.44", maxVersion: "0.51", target: "/docs/<version>/gen" },
  ];
  const bands = JSON.parse(buildKvs(manual, generated, VERSIONS)["x"]);
  expect(bands[0].t).toBe("manual");
  expect(bands[1].t).toBe("gen");
});

test("an exact-duplicate band (manual restating generated) is collapsed", () => {
  const same = { source: "/docs/<version>/x", minVersion: "0.52", target: "/docs/<version>/y" };
  const bands = JSON.parse(buildKvs([same], [same], VERSIONS)["x"]);
  expect(bands).toHaveLength(1);
});

test("diffKvs puts only changed/new keys and deletes vanished ones", () => {
  const desired = { a: "1", b: "2", c: "3" };
  const current = { a: "1", b: "OLD", d: "4" };
  expect(diffKvs(desired, current)).toEqual({
    puts: [
      { Key: "b", Value: "2" },
      { Key: "c", Value: "3" },
    ],
    deletes: [{ Key: "d" }],
  });
});

test("diffKvs is a no-op when desired equals current", () => {
  const m = { a: "1", b: "2" };
  expect(diffKvs(m, { ...m })).toEqual({ puts: [], deletes: [] });
});

test("chunkDiff splits writes into batches no larger than size", () => {
  const diff = {
    puts: [
      { Key: "a", Value: "1" },
      { Key: "b", Value: "2" },
      { Key: "c", Value: "3" },
    ],
    deletes: [{ Key: "x" }, { Key: "y" }],
  };
  const batches = chunkDiff(diff, 2);
  expect(batches).toHaveLength(3);
  expect(batches[0]).toEqual({ puts: [{ Key: "a", Value: "1" }, { Key: "b", Value: "2" }], deletes: [] });
  expect(batches[1]).toEqual({ puts: [{ Key: "c", Value: "3" }], deletes: [{ Key: "x" }] });
  expect(batches[2]).toEqual({ puts: [], deletes: [{ Key: "y" }] });
});

test("buildKvs throws when a value exceeds the KVS byte limit", () => {
  // Many distinct targets on one key blow past 1024 bytes.
  const rules = Array.from({ length: 40 }, (_, i) => ({
    source: "/docs/<version>/x",
    minVersion: VERSIONS[i],
    maxVersion: VERSIONS[i],
    target: `/docs/<version>/some/reasonably/long/target/path/number-${i}`,
  }));
  expect(() => buildKvs([], rules, VERSIONS)).toThrow(
    new RegExp(`exceeds ${MAX_VALUE_BYTES} bytes`),
  );
});
