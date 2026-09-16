import {
  appendGithubFile,
  assertOpenCurrentPullRequest,
  GITHUB_ACTIONS_BOT,
  githubRepositoryUrl,
  githubRequest,
  githubRunUrl,
  ifFound,
  isCurrentPullRequest,
  PREVIEW_COMMENT_MARKER,
  previewHostname,
  PROJECT_NAME,
  readPullRequest,
  requireEnvironment,
  vercelApi,
  type Deployment,
  type Environment,
  type VercelApi,
} from "./shared.ts";

export type Comment = {
  id: number;
  body?: string;
  user?: { login?: string };
};

export type CommentTarget = {
  repository: string;
  pullNumber: number;
  token: string;
};

type Project = { name: string; id: string };

export type PreviewRowStatus = "building" | "ready" | "failed";

export type PreviewRow = {
  project: Project;
  status: PreviewRowStatus;
  previewUrl: string;
  deploymentDashboardUrl?: string;
  /** Set on a failed row when the preview address still serves an older commit. */
  previousSha?: string;
};

export type PreviewCommentContext = {
  sha: string;
  repositoryUrl: string;
  teamId: string;
  teamSlug: string;
  runUrl: string;
};

export type PreviewCommentOptions = PreviewCommentContext & {
  row: PreviewRow;
  updatedAt?: Date;
};

export type VercelDeploymentReference = {
  dashboardUrl: string;
  commitSha?: string;
};

export type PreviewContext = {
  env: Record<string, string>;
  target: CommentTarget;
  api: VercelApi;
  project: Project;
  comment: PreviewCommentContext;
  previewUrl: string;
};

const PREVIEW_ENVIRONMENT = [
  "GH_TOKEN",
  "GITHUB_REPOSITORY",
  "GITHUB_RUN_ID",
  "GITHUB_SERVER_URL",
  "PR_HEAD_SHA",
  "PR_NUMBER",
  "VERCEL_ORG_ID",
  "VERCEL_PROJECT_ID",
  "VERCEL_TEAM_SLUG",
  "VERCEL_TOKEN",
] as const;

export function readPreviewContext(
  environment: Environment = process.env,
): PreviewContext {
  const env = requireEnvironment(PREVIEW_ENVIRONMENT, environment);
  const pullNumber = Number(env.PR_NUMBER);
  return {
    env,
    target: {
      repository: env.GITHUB_REPOSITORY,
      pullNumber,
      token: env.GH_TOKEN,
    },
    api: vercelApi({ token: env.VERCEL_TOKEN, teamId: env.VERCEL_ORG_ID }),
    project: { name: PROJECT_NAME, id: env.VERCEL_PROJECT_ID },
    comment: {
      sha: env.PR_HEAD_SHA,
      repositoryUrl: githubRepositoryUrl(env),
      teamId: env.VERCEL_ORG_ID,
      teamSlug: env.VERCEL_TEAM_SLUG,
      runUrl: githubRunUrl(env),
    },
    previewUrl: `https://${previewHostname(PROJECT_NAME, pullNumber, env.VERCEL_TEAM_SLUG)}`,
  };
}

/** Turns a deployment read from Vercel into what the comment needs from it. */
export function deploymentReference(
  deployment: Pick<Deployment, "meta"> & { id: string },
  location: { teamSlug: string; project: string },
): VercelDeploymentReference {
  // Dashboard URLs use the deployment ID without its `dpl_` prefix.
  return {
    dashboardUrl: `https://vercel.com/${location.teamSlug}/${location.project}/${deployment.id.slice(4)}`,
    commitSha: deployment.meta?.githubCommitSha,
  };
}

export async function findVercelDeployment(
  deploymentUrl: string,
  api: VercelApi,
  location: { teamSlug: string; project: string },
): Promise<VercelDeploymentReference | null> {
  const deployment = await ifFound(
    api.sdk.deployments.getDeployment({
      idOrUrl: new URL(deploymentUrl).host,
      teamId: api.teamId,
    }),
  );
  return deployment ? deploymentReference(deployment, location) : null;
}

/** Like findVercelDeployment, but a lookup failure only degrades the comment. */
export async function tryFindVercelDeployment(
  deploymentUrl: string,
  api: VercelApi,
  location: { teamSlug: string; project: string },
  description: string,
): Promise<VercelDeploymentReference | null> {
  try {
    return await findVercelDeployment(deploymentUrl, api, location);
  } catch (error) {
    console.warn(`Could not resolve the ${description}: ${error}`);
    return null;
  }
}

function commitLink(options: PreviewCommentContext, sha: string): string {
  return `[${sha.slice(0, 7)}](${options.repositoryUrl}/commit/${sha})`;
}

function stateSentence(options: PreviewCommentOptions): string {
  const commit = commitLink(options, options.sha);
  const { row } = options;
  if (row.status === "building") return `Deploying commit ${commit}…`;
  if (row.status === "failed") return `Deploying commit ${commit} failed`;
  return `Commit ${commit} is live at [${row.previewUrl}](${row.previewUrl})`;
}

function utcTimestamp(date: Date): string {
  if (Number.isNaN(date.valueOf())) throw new Error("Expected a valid date");
  const month = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  const hour = date.getUTCHours();
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const meridiem = hour >= 12 ? "pm" : "am";
  const displayHour = hour % 12 || 12;
  return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()} ${displayHour}:${minute}${meridiem}`;
}

const STATUS = {
  building: { emoji: "🟡", label: "Building" },
  ready: { emoji: "🟢", label: "Ready" },
  failed: { emoji: "🔴", label: "Failed" },
} as const;

function tableRow(
  options: PreviewCommentOptions,
  row: PreviewRow,
  updated: string,
): string {
  const projectUrl = `https://vercel.com/${options.teamSlug}/${row.project.name}`;
  const avatarUrl = new URL("https://vercel.com/api/www/avatar");
  avatarUrl.searchParams.set("projectId", row.project.id);
  // The avatar endpoint answers 400 without the owning team.
  avatarUrl.searchParams.set("teamId", options.teamId);
  avatarUrl.searchParams.set("s", "32");
  const project = `<a href="${projectUrl}"><sup><img src="${avatarUrl}" width="16" height="16" align="middle" alt="" /></sup></a> [${row.project.name}](${projectUrl})`;
  const status = STATUS[row.status];
  const statusUrl = row.deploymentDashboardUrl ?? `${projectUrl}/deployments`;
  // A failed row keeps its Preview link only while an older deployment still serves it.
  const hasPreview =
    row.status === "ready" || (row.status === "failed" && row.previousSha);
  const actions =
    [
      ...(hasPreview ? [`[Preview](${row.previewUrl})`] : []),
      ...(row.status === "failed" ? [`[Logs](${options.runUrl})`] : []),
    ].join(", ") || "—";
  return `| ${project} | ${status.emoji} [${status.label}](${statusUrl}) | ${actions} | ${updated} |`;
}

export function previewComment(options: PreviewCommentOptions): string {
  const { row } = options;
  const updated = utcTimestamp(options.updatedAt ?? new Date());
  const note =
    row.status === "failed" && row.previousSha
      ? `Preview still serves commit ${commitLink(options, row.previousSha)}.`
      : undefined;

  return [
    PREVIEW_COMMENT_MARKER,
    stateSentence(options),
    "",
    "| Project | Deployment | Actions | Updated (UTC) |",
    "| :-- | :-- | :-- | :-- |",
    tableRow(options, row, updated),
    ...(note ? ["", note] : []),
    ...(row.status === "ready"
      ? [
          "",
          "<hr>",
          "",
          `Deployed to Vercel via [GitHub Actions](${options.runUrl})`,
        ]
      : []),
  ].join("\n");
}

export function previewRemovedComment(): string {
  return [
    PREVIEW_COMMENT_MARKER,
    "The deployments were removed when this pull request closed. Reopening it deploys again at the same address.",
  ].join("\n");
}

async function listComments(target: CommentTarget): Promise<Comment[]> {
  const comments: Comment[] = [];
  for (let page = 1; ; page++) {
    const { data } = await githubRequest<Comment[]>(
      `/repos/${target.repository}/issues/${target.pullNumber}/comments?per_page=100&page=${page}`,
      target.token,
    );
    comments.push(...data);
    if (data.length < 100) return comments;
  }
}

export async function findPreviewComment(
  target: CommentTarget,
): Promise<Comment | undefined> {
  const comments = await listComments(target);
  return comments.find(
    (comment) =>
      comment.user?.login === GITHUB_ACTIONS_BOT &&
      comment.body?.includes(PREVIEW_COMMENT_MARKER),
  );
}

export async function updateComment(
  target: CommentTarget,
  commentId: number,
  body: string,
): Promise<void> {
  await githubRequest(
    `/repos/${target.repository}/issues/comments/${commentId}`,
    target.token,
    {
      method: "PATCH",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    },
  );
}

async function createComment(
  target: CommentTarget,
  body: string,
): Promise<void> {
  await githubRequest(
    `/repos/${target.repository}/issues/${target.pullNumber}/comments`,
    target.token,
    {
      method: "POST",
      body: JSON.stringify({ body }),
      headers: { "Content-Type": "application/json" },
    },
  );
}

/** Creates or updates the preview comment for this PR. */
export async function upsertPreviewComment(
  target: CommentTarget,
  body: string,
): Promise<void> {
  const existing = await findPreviewComment(target);
  if (existing) await updateComment(target, existing.id, body);
  else await createComment(target, body);
}

/**
 * What a project's row shows once its deploy job has finished. The stable
 * preview address only moves after a deployment passed its checks, so serving
 * the PR's head commit means success and anything else means failure.
 */
export function previewRowFor(
  project: Project,
  previewUrl: string,
  deployment: VercelDeploymentReference | null,
  sha: string,
): PreviewRow {
  if (deployment?.commitSha === sha) {
    return {
      project,
      status: "ready",
      previewUrl,
      deploymentDashboardUrl: deployment.dashboardUrl,
    };
  }
  return {
    project,
    status: "failed",
    previewUrl,
    previousSha: deployment?.commitSha,
  };
}

/** Posts the build status, then reports what the stable preview address serves. */
export async function main(): Promise<void> {
  const mode = process.argv[2];
  if (mode !== "start" && mode !== "finish") {
    throw new Error("Usage: preview-comment.ts <start|finish>");
  }
  const { env, target, api, project, comment, previewUrl } =
    readPreviewContext();
  const pullRequest = await readPullRequest(
    target.repository,
    target.pullNumber,
    target.token,
  );

  if (mode === "start") {
    assertOpenCurrentPullRequest(pullRequest, env.PR_HEAD_SHA);
    const row: PreviewRow = {
      project,
      status: "building",
      previewUrl,
    };
    await upsertPreviewComment(target, previewComment({ ...comment, row }));
    return;
  }

  // A newer push will update the comment from its own preview job.
  if (!isCurrentPullRequest(pullRequest, env.PR_HEAD_SHA)) return;
  const deployment = await tryFindVercelDeployment(
    previewUrl,
    api,
    { teamSlug: comment.teamSlug, project: project.name },
    `${project.name} preview`,
  );
  const row = previewRowFor(project, previewUrl, deployment, comment.sha);
  await upsertPreviewComment(target, previewComment({ ...comment, row }));
  appendGithubFile(
    "GITHUB_STEP_SUMMARY",
    `${project.name} preview (${row.status}): ${previewUrl}`,
  );
}

if (import.meta.main) await main();
