import {
  DOCS_PROJECT,
  GITHUB_ACTIONS_BOT,
  githubRepositoryUrl,
  githubRequest,
  githubRunUrl,
  positiveInteger,
  PREVIEW_COMMENT_MARKER,
  previewHostname,
  requireEnvironment,
  validateDeploymentUrl,
  vercelRequest,
  type Environment,
  type FetchImplementation,
  type VercelCredentials,
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

export type PreviewCommentStatus = "building" | "ready" | "failed";

export type PreviewCommentContext = {
  sha: string;
  repositoryUrl: string;
  projectId: string;
  teamId: string;
  teamSlug: string;
  runUrl: string;
};

export type PreviewCommentOptions = PreviewCommentContext & {
  status: PreviewCommentStatus;
  updatedAt?: Date;
  deploymentDashboardUrl?: string;
  previousSha?: string;
  previewUrl?: string;
};

export type VercelLookup = VercelCredentials & {
  projectSlug: string;
  teamSlug: string;
};

export type VercelDeploymentReference = {
  dashboardUrl: string;
  commitSha?: string;
};

export type PreviewContext = {
  env: Record<string, string>;
  target: CommentTarget;
  lookup: VercelLookup;
  comment: PreviewCommentContext;
  previewHost: string;
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
  const pullNumber = positiveInteger(env.PR_NUMBER, "PR number");
  const previewHost = previewHostname(pullNumber, env.VERCEL_TEAM_SLUG);
  return {
    env,
    target: {
      repository: env.GITHUB_REPOSITORY,
      pullNumber,
      token: env.GH_TOKEN,
    },
    lookup: {
      projectSlug: DOCS_PROJECT,
      teamId: env.VERCEL_ORG_ID,
      teamSlug: env.VERCEL_TEAM_SLUG,
      token: env.VERCEL_TOKEN,
    },
    comment: {
      sha: env.PR_HEAD_SHA,
      repositoryUrl: githubRepositoryUrl(env),
      projectId: env.VERCEL_PROJECT_ID,
      teamId: env.VERCEL_ORG_ID,
      teamSlug: env.VERCEL_TEAM_SLUG,
      runUrl: githubRunUrl(env),
    },
    previewHost,
    previewUrl: `https://${previewHost}`,
  };
}

export async function findVercelDeployment(
  deploymentUrl: string,
  lookup: VercelLookup,
  fetchImplementation: FetchImplementation = fetch,
): Promise<VercelDeploymentReference | null> {
  const deploymentHost = validateDeploymentUrl(deploymentUrl).host;
  const deployment = await vercelRequest<{
    id?: string;
    meta?: { githubCommitSha?: string };
  }>(
    `/v13/deployments/${encodeURIComponent(deploymentHost)}`,
    lookup,
    { missingOK: true },
    fetchImplementation,
  );
  if (!deployment) return null;
  const deploymentId = deployment.id;
  if (!deploymentId?.match(/^dpl_[A-Za-z0-9]+$/)) {
    throw new Error("Vercel deployment is missing its ID");
  }
  return {
    dashboardUrl: `https://vercel.com/${lookup.teamSlug}/${lookup.projectSlug}/${deploymentId.slice(4)}`,
    commitSha: deployment.meta?.githubCommitSha,
  };
}

/** Like findVercelDeployment, but a lookup failure only degrades the comment. */
export async function tryFindVercelDeployment(
  deploymentUrl: string,
  lookup: VercelLookup,
  description: string,
): Promise<VercelDeploymentReference | null> {
  try {
    return await findVercelDeployment(deploymentUrl, lookup);
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
  if (options.status === "building") {
    return `Deploying commit ${commit}…`;
  }
  if (options.status === "failed") {
    if (options.previousSha) {
      const previousCommit = commitLink(options, options.previousSha);
      return `Deploying commit ${commit} failed, the address still serves commit ${previousCommit}`;
    }
    return `Deploying commit ${commit} failed, nothing is deployed for this pull request yet`;
  }
  if (!options.previewUrl) {
    throw new Error("A ready preview comment requires its preview URL");
  }
  return `Commit ${commit} is live at [${options.previewUrl}](${options.previewUrl})`;
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

export function previewComment(options: PreviewCommentOptions): string {
  const projectUrl = `https://vercel.com/${options.teamSlug}/${DOCS_PROJECT}`;
  const avatarUrl = new URL("https://vercel.com/api/www/avatar");
  avatarUrl.searchParams.set("projectId", options.projectId);
  avatarUrl.searchParams.set("teamId", options.teamId);
  avatarUrl.searchParams.set("s", "32");
  const project = `<a href="${projectUrl}"><sup><img src="${avatarUrl}" width="16" height="16" align="middle" alt="" /></sup></a> [${DOCS_PROJECT}](${projectUrl})`;
  const status = {
    building: { emoji: "🟡", label: "Building" },
    ready: { emoji: "🟢", label: "Ready" },
    failed: { emoji: "🔴", label: "Failed" },
  }[options.status];
  const statusUrl =
    options.deploymentDashboardUrl ?? `${projectUrl}/deployments`;
  const actions =
    [
      ...(options.previewUrl ? [`[Preview](${options.previewUrl})`] : []),
      ...(options.status === "failed" ? [`[Logs](${options.runUrl})`] : []),
    ].join(", ") || "—";

  return [
    PREVIEW_COMMENT_MARKER,
    stateSentence(options),
    "",
    "| Project | Deployment | Actions | Updated (UTC) |",
    "| :-- | :-- | :-- | :-- |",
    `| ${project} | ${status.emoji} [${status.label}](${statusUrl}) | ${actions} | ${utcTimestamp(options.updatedAt ?? new Date())} |`,
    ...(options.status === "ready"
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
    "The deployment was removed when this pull request closed. Reopening it deploys again at the same address.",
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

export async function upsertPreviewComment(
  target: CommentTarget,
  options: PreviewCommentOptions,
): Promise<void> {
  const body = previewComment(options);
  const existing = await findPreviewComment(target);
  if (existing) await updateComment(target, existing.id, body);
  else await createComment(target, body);
}
