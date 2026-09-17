import { describe, expect, test } from "bun:test";
import {
  DEFAULT_MAX_AGE_DAYS,
  groupByPullRequest,
  staleCutoff,
} from "./previews.ts";

describe("preview deployment sweep", () => {
  test("groups deployments by the PR that produced them", () => {
    const groups = groupByPullRequest([
      { uid: "dpl_a", meta: { ciPullRequest: "42" } },
      { uid: "dpl_b", meta: { ciPullRequest: "7" } },
      { uid: "dpl_c", meta: { ciPullRequest: "42" } },
    ]);
    expect([...groups.keys()]).toEqual([42, 7]);
    expect(groups.get(42)?.map((deployment) => deployment.uid)).toEqual([
      "dpl_a",
      "dpl_c",
    ]);
  });

  test("treats deployments older than the retention window as stale", () => {
    const now = Date.UTC(2026, 8, 15);
    expect(staleCutoff(DEFAULT_MAX_AGE_DAYS, now)).toBe(Date.UTC(2026, 8, 1));
    expect(staleCutoff(1, now)).toBe(Date.UTC(2026, 8, 14));
  });
});
