import { describe, expect, test } from "bun:test";
import {
  assertClosedPullRequest,
  assertOpenCurrentPullRequest,
  choice,
  deployArguments,
  githubRunUrl,
  isCurrentPullRequest,
  matchesPreviewDeployment,
  previewHostname,
  requireEnvironment,
  validateDeploymentUrl,
  vercelRequest,
} from "./shared.ts";

describe("Vercel deployment helpers", () => {
  test("requires every named environment variable", () => {
    expect(requireEnvironment(["ONE", "TWO"], { ONE: "1", TWO: "2" })).toEqual({
      ONE: "1",
      TWO: "2",
    });
    expect(() => requireEnvironment(["ONE", "TWO"], { ONE: "1" })).toThrow(
      "Missing TWO",
    );
  });

  test("validates a script argument against its choices", () => {
    expect(choice("preview", ["preview", "production"], "deploy.ts")).toBe(
      "preview",
    );
    expect(() =>
      choice(undefined, ["preview", "production"], "deploy.ts"),
    ).toThrow("Usage: deploy.ts <preview|production>");
    expect(() =>
      choice("staging", ["preview", "production"], "deploy.ts"),
    ).toThrow("Usage: deploy.ts <preview|production>");
  });

  test("builds workflow run URLs with an optional attempt", () => {
    const env = {
      GITHUB_SERVER_URL: "https://github.com",
      GITHUB_REPOSITORY: "metabase/docs.metabase.github.io",
      GITHUB_RUN_ID: "1",
      GITHUB_RUN_ATTEMPT: "2",
    };
    expect(githubRunUrl(env)).toBe(
      "https://github.com/metabase/docs.metabase.github.io/actions/runs/1",
    );
    expect(githubRunUrl(env, { attempt: true })).toBe(
      "https://github.com/metabase/docs.metabase.github.io/actions/runs/1/attempts/2",
    );
  });

  test("builds a team-scoped preview hostname", () => {
    expect(previewHostname(42, "metaboat")).toBe(
      "docs-pr-42-metaboat.vercel.app",
    );
    expect(() => previewHostname(42, "Meta Boat")).toThrow("team slug");
  });

  test("rejects stale and closed pull requests", () => {
    const current = { state: "open", head: { sha: "current" } };
    expect(isCurrentPullRequest(current, "current")).toBe(true);
    expect(() =>
      assertOpenCurrentPullRequest(current, "current"),
    ).not.toThrow();
    expect(() =>
      assertOpenCurrentPullRequest({ ...current, state: "closed" }, "current"),
    ).toThrow("outdated");
    expect(() =>
      assertOpenCurrentPullRequest(
        { ...current, head: { sha: "old" } },
        "current",
      ),
    ).toThrow("outdated");
    expect(() => assertClosedPullRequest(current)).toThrow("reopened");
    expect(() =>
      assertClosedPullRequest({ ...current, state: "closed" }),
    ).not.toThrow();
  });

  test("matches only this repository's unpromoted PR deployments", () => {
    const target = {
      projectId: "prj_docs",
      repositoryId: "12345",
      pullNumber: 42,
    };
    const matching = {
      uid: "dpl_1",
      projectId: "prj_docs",
      target: "preview",
      meta: { ciRepositoryId: "12345", ciPullRequest: "42" },
    };
    expect(matchesPreviewDeployment(matching, target)).toBe(true);
    expect(
      matchesPreviewDeployment({ ...matching, target: "production" }, target),
    ).toBe(false);
    expect(
      matchesPreviewDeployment(
        { ...matching, readySubstate: "PROMOTED" },
        target,
      ),
    ).toBe(false);
    expect(
      matchesPreviewDeployment(matching, { ...target, projectId: "prj_other" }),
    ).toBe(false);
    expect(
      matchesPreviewDeployment(matching, { ...target, pullNumber: 43 }),
    ).toBe(false);
  });

  test("tags preview deployments for safe cleanup", () => {
    const common = {
      token: "token",
      repository: "metabase/docs.metabase.github.io",
      repositoryId: "12345",
      ref: "feature",
      sha: "abcdef",
      message: "Change",
      author: "Builder",
      buildSha: "merge-sha",
      runUrl:
        "https://github.com/metabase/docs.metabase.github.io/actions/runs/1/attempts/1",
    };
    const preview = deployArguments("preview", { ...common, pullNumber: 42 });
    expect(preview).not.toContain("--prod");
    expect(preview).toContain("--archive=tgz");
    expect(preview).toContain("ciRepositoryId=12345");
    expect(preview).toContain("ciPullRequest=42");
    expect(preview).toContain("ciBuildSha=merge-sha");
    expect(preview).toContain(
      "ciRunUrl=https://github.com/metabase/docs.metabase.github.io/actions/runs/1/attempts/1",
    );
    const production = deployArguments("production", common);
    expect(production).toContain("--prod");
    expect(production).toContain("--archive=tgz");
    expect(production.some((value) => value.startsWith("ciPullRequest="))).toBe(
      false,
    );
    expect(() => deployArguments("preview", common)).toThrow("PR number");
  });

  test("validates deployment origins", () => {
    expect(validateDeploymentUrl("https://docs-test.vercel.app").origin).toBe(
      "https://docs-test.vercel.app",
    );
    expect(() => validateDeploymentUrl("http://docs-test.vercel.app")).toThrow(
      "HTTPS",
    );
    expect(() =>
      validateDeploymentUrl("https://docs-test.vercel.app/docs"),
    ).toThrow("HTTPS");
  });

  test("scopes Vercel API requests to the team", async () => {
    const credentials = { token: "token", teamId: "team_metaboat" };
    const requests: Array<{ url: string; method?: string }> = [];
    const respond =
      (response: Response) =>
      async (input: string | URL | Request, init?: RequestInit) => {
        requests.push({ url: String(input), method: init?.method });
        expect(new Headers(init?.headers).get("Authorization")).toBe(
          "Bearer token",
        );
        return response;
      };

    const page = await vercelRequest<{ ok: boolean }>(
      "/v7/deployments",
      credentials,
      { query: { limit: "100" } },
      respond(Response.json({ ok: true })),
    );
    expect(page).toEqual({ ok: true });
    expect(requests[0]).toEqual({
      url: "https://api.vercel.com/v7/deployments?teamId=team_metaboat&limit=100",
      method: "GET",
    });

    expect(
      await vercelRequest(
        "/v2/aliases/alias_1",
        credentials,
        { method: "DELETE", missingOK: true },
        respond(new Response(null, { status: 204 })),
      ),
    ).toBeNull();
    expect(requests[1]?.method).toBe("DELETE");

    expect(
      await vercelRequest(
        "/v4/aliases/missing",
        credentials,
        { missingOK: true },
        respond(new Response(null, { status: 404 })),
      ),
    ).toBeNull();
    await expect(
      vercelRequest(
        "/v4/aliases/missing",
        credentials,
        {},
        respond(new Response(null, { status: 404 })),
      ),
    ).rejects.toThrow("Vercel GET /v4/aliases/missing: HTTP 404");
  });
});
