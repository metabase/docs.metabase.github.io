import { describe, expect, test } from "bun:test";
import {
  deploymentReference,
  previewComment,
  previewRemovedComment,
  previewRowFor,
  readPreviewContext,
} from "./preview-comment.ts";

const MARKER = "<!-- vercel-docs-pr-preview -->";
const REPOSITORY_URL = "https://github.com/metabase/docs.metabase.github.io";
const RUN_URL = `${REPOSITORY_URL}/actions/runs/1`;
const TABLE_HEADER = [
  "| Project | Deployment | Actions | Updated (UTC) |",
  "| :-- | :-- | :-- | :-- |",
].join("\n");
const COMMIT = `[abcdef1](${REPOSITORY_URL}/commit/abcdef123)`;
const UPDATED = "Sep 14, 2026 11:21pm";

const docs = { name: "docs", id: "prj_docs" };
const DOCS_URL = "https://docs-pr-42-metaboat.vercel.app";

function projectCell(project: { name: string; id: string }): string {
  const projectUrl = `https://vercel.com/metaboat/${project.name}`;
  return `<a href="${projectUrl}"><sup><img src="https://vercel.com/api/www/avatar?projectId=${project.id}&teamId=team_metaboat&s=32" width="16" height="16" align="middle" alt="" /></sup></a> [${project.name}](${projectUrl})`;
}

const common = {
  sha: "abcdef123",
  repositoryUrl: REPOSITORY_URL,
  teamId: "team_metaboat",
  teamSlug: "metaboat",
  runUrl: RUN_URL,
  updatedAt: new Date("2026-09-14T23:21:00Z"),
};

describe("preview comment", () => {
  test("renders the Building state", () => {
    expect(
      previewComment({
        ...common,
        row: {
          project: docs,
          status: "building",
          previewUrl: DOCS_URL,
        },
      }),
    ).toBe(
      [
        MARKER,
        `Deploying commit ${COMMIT}…`,
        "",
        TABLE_HEADER,
        `| ${projectCell(docs)} | 🟡 [Building](https://vercel.com/metaboat/docs/deployments) | — | ${UPDATED} |`,
      ].join("\n"),
    );
  });

  test("renders the ready state with the preview link, dashboard and footer", () => {
    expect(
      previewComment({
        ...common,
        row: {
          project: docs,
          status: "ready",
          previewUrl: DOCS_URL,
          deploymentDashboardUrl:
            "https://vercel.com/metaboat/docs/deployment123",
        },
      }),
    ).toBe(
      [
        MARKER,
        `Commit ${COMMIT} is live at [${DOCS_URL}](${DOCS_URL})`,
        "",
        TABLE_HEADER,
        `| ${projectCell(docs)} | 🟢 [Ready](https://vercel.com/metaboat/docs/deployment123) | [Preview](${DOCS_URL}) | ${UPDATED} |`,
        "",
        "<hr>",
        "",
        `Deployed to Vercel via [GitHub Actions](${RUN_URL})`,
      ].join("\n"),
    );
  });

  test("reports failure while retaining the previous preview link", () => {
    const row = {
      project: docs,
      status: "failed" as const,
      previewUrl: DOCS_URL,
      previousSha: "123456789",
    };
    expect(previewComment({ ...common, row })).toBe(
      [
        MARKER,
        `Deploying commit ${COMMIT} failed`,
        "",
        TABLE_HEADER,
        `| ${projectCell(docs)} | 🔴 [Failed](https://vercel.com/metaboat/docs/deployments) | [Preview](${DOCS_URL}), [Logs](${RUN_URL}) | ${UPDATED} |`,
        "",
        `Preview still serves commit [1234567](${REPOSITORY_URL}/commit/123456789).`,
      ].join("\n"),
    );
    const withoutPrevious = previewComment({
      ...common,
      row: { ...row, previousSha: undefined },
    });
    expect(withoutPrevious).toContain(`[Logs](${RUN_URL})`);
    expect(withoutPrevious).not.toContain("[Preview]");
    expect(withoutPrevious).not.toContain("still serves");
  });

  test("renders the removed state with the marker so it stays updatable", () => {
    expect(previewRemovedComment()).toBe(
      [
        MARKER,
        "The deployments were removed when this pull request closed. Reopening it deploys again at the same address.",
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
      VERCEL_PROJECT_ID: docs.id,
      VERCEL_TEAM_SLUG: "metaboat",
      VERCEL_TOKEN: "token",
    });
    expect(context.target).toEqual({
      repository: "metabase/docs.metabase.github.io",
      pullNumber: 42,
      token: "gh",
    });
    expect(context.api.teamId).toBe("team_metaboat");
    expect(context.project).toEqual(docs);
    expect(context.comment).toEqual({
      sha: "abcdef123",
      repositoryUrl: REPOSITORY_URL,
      teamId: "team_metaboat",
      teamSlug: "metaboat",
      runUrl: RUN_URL,
    });
    expect(context.previewUrl).toBe(DOCS_URL);
  });

  test("derives a row from what the preview address serves", () => {
    const deployment = {
      dashboardUrl: "https://vercel.com/metaboat/docs/deployment123",
      commitSha: "abcdef123",
    };
    expect(previewRowFor(docs, DOCS_URL, deployment, "abcdef123")).toEqual({
      project: docs,
      status: "ready",
      previewUrl: DOCS_URL,
      deploymentDashboardUrl: deployment.dashboardUrl,
    });
    expect(previewRowFor(docs, DOCS_URL, deployment, "fedcba987")).toEqual({
      project: docs,
      status: "failed",
      previewUrl: DOCS_URL,
      previousSha: "abcdef123",
    });
    expect(previewRowFor(docs, DOCS_URL, null, "abcdef123")).toEqual({
      project: docs,
      status: "failed",
      previewUrl: DOCS_URL,
      previousSha: undefined,
    });
  });

  test("reduces a deployment to its dashboard URL and commit", () => {
    const location = { teamSlug: "metaboat", project: "docs" };
    expect(
      deploymentReference(
        { id: "dpl_deployment123", meta: { githubCommitSha: "abcdef123" } },
        location,
      ),
    ).toEqual({
      dashboardUrl: "https://vercel.com/metaboat/docs/deployment123",
      commitSha: "abcdef123",
    });
  });
});
