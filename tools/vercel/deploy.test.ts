import { describe, expect, test } from "bun:test";
import { promote } from "./deploy.ts";
import type { VercelApi } from "./shared.ts";

describe("promote", () => {
  function fakeApi(productionIds: string[]) {
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
            const id =
              productionIds[Math.min(reads++, productionIds.length - 1)];
            return { targets: { production: { id } } };
          },
        },
      },
    } as unknown as VercelApi;
    return { api, calls };
  }
  test("requests the promotion and returns once production moves", async () => {
    const { api, calls } = fakeApi(["dpl_new"]);
    await promote(api, "prj_docs", "dpl_new");
    expect(calls).toEqual(["promote dpl_new"]);
  });

  test("times out when production never moves", () => {
    expect(
      promote(fakeApi(["dpl_old"]).api, "prj_docs", "dpl_new", 0),
    ).rejects.toThrow("still pending");
  });
});
