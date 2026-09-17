import { describe, expect, test } from "bun:test";
import { promote } from "./deploy.ts";
import type { VercelApi } from "./shared.ts";

describe("promote", () => {
  function fakeApi(statuses: Array<string | undefined>) {
    const calls: string[] = [];
    let reads = 0;
    const api = {
      teamId: "team_metaboat",
      sdk: {
        projects: {
          requestPromote: async (request: { deploymentId: string }) => {
            calls.push(`promote ${request.deploymentId}`);
          },
          getProject: async () => {
            const jobStatus = statuses[Math.min(reads++, statuses.length - 1)];
            return {
              lastAliasRequest: jobStatus
                ? { toDeploymentId: "dpl_new", jobStatus }
                : { toDeploymentId: "dpl_old", jobStatus: "succeeded" },
            };
          },
        },
      },
    } as unknown as VercelApi;
    return { api, calls };
  }
  test("requests the promotion and waits for it to succeed", async () => {
    const { api, calls } = fakeApi(["succeeded"]);
    await promote(api, "prj_docs", "dpl_new");
    expect(calls).toEqual(["promote dpl_new"]);
  });

  test("fails when Vercel reports the promotion failed or times out", async () => {
    await expect(
      promote(fakeApi(["failed"]).api, "prj_docs", "dpl_new"),
    ).rejects.toThrow("failed");
    await expect(
      promote(fakeApi(["in-progress"]).api, "prj_docs", "dpl_new", 0),
    ).rejects.toThrow("still in-progress");
    await expect(
      promote(fakeApi([undefined]).api, "prj_docs", "dpl_new", 0),
    ).rejects.toThrow("still pending");
  });
});
