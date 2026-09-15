import { describe, expect, test } from "bun:test";
import {
  findVercelDeployment,
  previewComment,
  previewRemovedComment,
  readPreviewContext,
} from "./preview-comment.ts";

const MARKER = "<!-- vercel-docs-pr-preview -->";
const REPOSITORY_URL = "https://github.com/metabase/docs.metabase.github.io";
const RUN_URL = `${REPOSITORY_URL}/actions/runs/1`;
const PREVIEW_URL = "https://docs-pr-42-metaboat.vercel.app";
const PROJECT_URL = "https://vercel.com/metaboat/docs";
const PROJECT_CELL = `<a href="${PROJECT_URL}"><sup><img src="https://vercel.com/api/www/avatar?projectId=prj_docs&teamId=team_metaboat&s=32" width="16" height="16" align="middle" alt="" /></sup></a> [docs](${PROJECT_URL})`;
const TABLE_HEADER = [
  "| Project | Deployment | Actions | Updated (UTC) |",
  "| :-- | :-- | :-- | :-- |",
].join("\n");
const COMMIT = `[abcdef1](${REPOSITORY_URL}/commit/abcdef123)`;
const UPDATED = "Sep 14, 2026 11:21pm";

const common = {
  sha: "abcdef123",
  repositoryUrl: REPOSITORY_URL,
  projectId: "prj_docs",
  teamId: "team_metaboat",
  teamSlug: "metaboat",
  runUrl: RUN_URL,
  updatedAt: new Date("2026-09-14T23:21:00Z"),
};

const lookup = {
  projectSlug: "docs",
  teamId: "team_metaboat",
  teamSlug: "metaboat",
  token: "token",
};

describe("preview comment", () => {
  test("renders the building state", () => {
    expect(previewComment({ status: "building", ...common })).toBe(
      [
        MARKER,
        `Deploying commit ${COMMIT}…`,
        "",
        TABLE_HEADER,
        `| ${PROJECT_CELL} | 🟡 [Building](${PROJECT_URL}/deployments) | — | ${UPDATED} |`,
      ].join("\n"),
    );
  });

  test("renders the ready state with the deployment dashboard and footer", () => {
    expect(
      previewComment({
        status: "ready",
        ...common,
        deploymentDashboardUrl: `${PROJECT_URL}/deployment123`,
        previewUrl: PREVIEW_URL,
      }),
    ).toBe(
      [
        MARKER,
        `Commit ${COMMIT} is live at [${PREVIEW_URL}](${PREVIEW_URL})`,
        "",
        TABLE_HEADER,
        `| ${PROJECT_CELL} | 🟢 [Ready](${PROJECT_URL}/deployment123) | [Preview](${PREVIEW_URL}) | ${UPDATED} |`,
        "",
        "<hr>",
        "",
        `Deployed to Vercel via [GitHub Actions](${RUN_URL})`,
      ].join("\n"),
    );
    expect(() => previewComment({ status: "ready", ...common })).toThrow(
      "preview URL",
    );
  });

  test("renders the failed state with and without a prior deployment", () => {
    expect(previewComment({ status: "failed", ...common })).toBe(
      [
        MARKER,
        `Deploying commit ${COMMIT} failed, nothing is deployed for this pull request yet`,
        "",
        TABLE_HEADER,
        `| ${PROJECT_CELL} | 🔴 [Failed](${PROJECT_URL}/deployments) | [Logs](${RUN_URL}) | ${UPDATED} |`,
      ].join("\n"),
    );
    expect(
      previewComment({
        status: "failed",
        ...common,
        previousSha: "123456789",
        previewUrl: PREVIEW_URL,
      }),
    ).toBe(
      [
        MARKER,
        `Deploying commit ${COMMIT} failed, the address still serves commit [1234567](${REPOSITORY_URL}/commit/123456789)`,
        "",
        TABLE_HEADER,
        `| ${PROJECT_CELL} | 🔴 [Failed](${PROJECT_URL}/deployments) | [Preview](${PREVIEW_URL}), [Logs](${RUN_URL}) | ${UPDATED} |`,
      ].join("\n"),
    );
  });

  test("renders the removed state with the marker so it stays updatable", () => {
    expect(previewRemovedComment()).toBe(
      [
        MARKER,
        "The deployment was removed when this pull request closed. Reopening it deploys again at the same address.",
      ].join("\n"),
    );
  });

  test("derives the preview context from the workflow environment", () => {
    const context = readPreviewContext({
      GH_TOKEN: "gh",
      GITHUB_REPOSITORY: "metabase/docs.metabase.github.io",
      GITHUB_RUN_ID: "1",
      GITHUB_SERVER_URL: "https://github.com",
      PR_HEAD_SHA: "abcdef123",
      PR_NUMBER: "42",
      VERCEL_ORG_ID: "team_metaboat",
      VERCEL_PROJECT_ID: "prj_docs",
      VERCEL_TEAM_SLUG: "metaboat",
      VERCEL_TOKEN: "token",
    });
    expect(context.target).toEqual({
      repository: "metabase/docs.metabase.github.io",
      pullNumber: 42,
      token: "gh",
    });
    expect(context.lookup).toEqual(lookup);
    expect(context.comment).toEqual({
      sha: "abcdef123",
      repositoryUrl: REPOSITORY_URL,
      projectId: "prj_docs",
      teamId: "team_metaboat",
      teamSlug: "metaboat",
      runUrl: RUN_URL,
    });
    expect(context.previewHost).toBe("docs-pr-42-metaboat.vercel.app");
    expect(context.previewUrl).toBe(PREVIEW_URL);
  });

  test("resolves a deployment's dashboard URL and commit", async () => {
    const found = await findVercelDeployment(
      "https://docs-abc-metaboat.vercel.app",
      lookup,
      async (input, init) => {
        expect(String(input)).toBe(
          "https://api.vercel.com/v13/deployments/docs-abc-metaboat.vercel.app?teamId=team_metaboat",
        );
        expect(new Headers(init?.headers).get("Authorization")).toBe(
          "Bearer token",
        );
        return Response.json({
          id: "dpl_deployment123",
          meta: { githubCommitSha: "abcdef123" },
        });
      },
    );
    expect(found).toEqual({
      dashboardUrl: `${PROJECT_URL}/deployment123`,
      commitSha: "abcdef123",
    });

    const missing = await findVercelDeployment(
      PREVIEW_URL,
      lookup,
      async () => new Response(null, { status: 404 }),
    );
    expect(missing).toBeNull();
  });
});
