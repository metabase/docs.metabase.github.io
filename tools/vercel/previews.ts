import {
  findPreviewComment,
  previewRemovedComment,
  updateComment,
} from "./preview-comment.ts";
import {
  appendGithubFile,
  assertClosedPullRequest,
  ifFound,
  matchesPreviewDeployment,
  previewHostname,
  PROJECT_NAME,
  readPullRequest,
  requireEnvironment,
  vercelApi,
  type Deployment,
  type PreviewDeploymentTarget,
  type VercelApi,
} from "./shared.ts";

type PreviewAlias = { id: string; deploymentId?: string };
type Preview = PreviewDeploymentTarget & { api: VercelApi };
type PreviewProject = Omit<Preview, "pullNumber">;

export const DEFAULT_MAX_AGE_DAYS = 14;

/** Deployments created before this timestamp are considered stale. */
export function staleCutoff(maxAgeDays: number, now = Date.now()): number {
  return now - maxAgeDays * 86_400_000;
}

/** Groups deployments by the PR that produced them. */
export function groupByPullRequest(
  deployments: Deployment[],
): Map<number, Deployment[]> {
  const groups = new Map<number, Deployment[]>();
  for (const deployment of deployments) {
    const pullNumber = Number(deployment.meta?.ciPullRequest);
    const group = groups.get(pullNumber) ?? [];
    group.push(deployment);
    groups.set(pullNumber, group);
  }
  return groups;
}

/** Lists this repository's preview deployments, optionally only those created before `until`. */
async function listPreviewDeployments(
  project: PreviewProject,
  options: { until?: number } = {},
): Promise<Deployment[]> {
  const matched = new Map<string, Deployment>();
  let until = options.until;
  do {
    const page = await project.api.sdk.deployments.getDeployments({
      projectId: project.projectId,
      target: "preview",
      limit: 100,
      until,
      teamId: project.api.teamId,
    });
    for (const deployment of page.deployments) {
      const pullNumber = Number(deployment.meta?.ciPullRequest);
      if (!Number.isSafeInteger(pullNumber) || pullNumber <= 0) continue;
      if (!matchesPreviewDeployment(deployment, { ...project, pullNumber })) {
        continue;
      }
      matched.set(deployment.uid, deployment);
    }
    until = page.pagination.next ?? undefined;
  } while (until !== undefined);
  return [...matched.values()];
}

/** Returns the alias when the preview hostname is aliased to this project. */
async function findPreviewAlias(
  project: PreviewProject,
  host: string,
): Promise<PreviewAlias | null> {
  const alias = await ifFound(
    project.api.sdk.aliases.getAlias({
      idOrAlias: host,
      teamId: project.api.teamId,
    }),
  );
  if (!alias) return null;
  if (alias.projectId !== project.projectId) {
    throw new Error("Preview alias does not belong to this project");
  }
  return { id: alias.uid, deploymentId: alias.deploymentId ?? undefined };
}

async function deletePreviewAlias(
  project: PreviewProject,
  aliasId: string,
): Promise<void> {
  await ifFound(
    project.api.sdk.aliases.deleteAlias({
      aliasId,
      teamId: project.api.teamId,
    }),
  );
}

/** Re-reads each deployment before deleting so a stale listing cannot remove the wrong one. */
async function deletePreviewDeployments(
  preview: Preview,
  ids: string[],
): Promise<number> {
  let deleted = 0;
  const { sdk, teamId } = preview.api;
  for (const id of ids) {
    const deployment = await ifFound(
      sdk.deployments.getDeployment({ idOrUrl: id, teamId }),
    );
    if (!deployment) continue;
    if (!matchesPreviewDeployment(deployment, preview)) {
      throw new Error(`Deployment ${id} no longer matches this preview`);
    }
    await ifFound(sdk.deployments.deleteDeployment({ id, teamId }));
    deleted++;
  }
  return deleted;
}

const ENVIRONMENT = [
  "GH_TOKEN",
  "GITHUB_REPOSITORY",
  "GITHUB_REPOSITORY_ID",
  "VERCEL_ORG_ID",
  "VERCEL_PROJECT_ID",
  "VERCEL_TEAM_SLUG",
  "VERCEL_TOKEN",
] as const;

/**
 * Removes a closed PR's alias and every deployment tagged with its number.
 * A reopen queues a fresh deploy behind this job (same concurrency group),
 * so one closed check up front is enough.
 */
async function cleanup(
  env: Record<string, string>,
  project: PreviewProject,
): Promise<string> {
  const { PR_NUMBER } = requireEnvironment(["PR_NUMBER"]);
  const pullNumber = Number(PR_NUMBER);
  const target = {
    repository: env.GITHUB_REPOSITORY,
    pullNumber,
    token: env.GH_TOKEN,
  };
  const preview: Preview = { ...project, pullNumber };
  assertClosedPullRequest(
    await readPullRequest(target.repository, pullNumber, target.token),
  );

  const deployments = await listPreviewDeployments(project);
  const ids = deployments
    .filter((deployment) => matchesPreviewDeployment(deployment, preview))
    .map((deployment) => deployment.uid as string);
  const host = previewHostname(PROJECT_NAME, pullNumber, env.VERCEL_TEAM_SLUG);
  const alias = await findPreviewAlias(project, host);
  if (alias) await deletePreviewAlias(project, alias.id);
  const deleted = await deletePreviewDeployments(preview, ids);

  const existing = await findPreviewComment(target);
  if (existing) {
    await updateComment(target, existing.id, previewRemovedComment());
  }
  return `Removed ${alias ? 1 : 0} ${PROJECT_NAME} preview alias and ${deleted} tagged deployments for PR #${pullNumber}.`;
}

/**
 * Removes preview deployments older than MAX_AGE_DAYS. A closed PR loses its
 * alias and every stale deployment; an open PR keeps whatever its alias serves.
 */
async function sweep(
  env: Record<string, string>,
  project: PreviewProject,
): Promise<string> {
  const maxAgeDays = Number(process.env.MAX_AGE_DAYS) || DEFAULT_MAX_AGE_DAYS;
  const stale = await listPreviewDeployments(project, {
    until: staleCutoff(maxAgeDays),
  });
  const lines: string[] = [];
  for (const [pullNumber, deployments] of groupByPullRequest(stale)) {
    const preview = { ...project, pullNumber };
    const host = previewHostname(
      PROJECT_NAME,
      pullNumber,
      env.VERCEL_TEAM_SLUG,
    );
    const pullRequest = await readPullRequest(
      env.GITHUB_REPOSITORY,
      pullNumber,
      env.GH_TOKEN,
    );
    const closed = pullRequest.state === "closed";
    const alias = await findPreviewAlias(project, host);
    const ids = deployments
      .map((deployment) => deployment.uid as string)
      .filter((id) => closed || id !== alias?.deploymentId);

    if (closed && alias) await deletePreviewAlias(project, alias.id);
    const deleted = await deletePreviewDeployments(preview, ids);
    lines.push(
      `PR #${pullNumber} (${closed ? "closed" : "open"}): removed ${deleted} stale deployments${closed && alias ? " and the preview alias" : ""}.`,
    );
  }
  return lines.length
    ? lines.join("\n")
    : `No ${PROJECT_NAME} preview deployments older than ${maxAgeDays} days.`;
}

export async function main(): Promise<void> {
  const mode = process.argv[2];
  if (mode !== "cleanup" && mode !== "sweep") {
    throw new Error("Usage: previews.ts <cleanup|sweep>");
  }
  const env = requireEnvironment(ENVIRONMENT);
  const project: PreviewProject = {
    api: vercelApi({ token: env.VERCEL_TOKEN, teamId: env.VERCEL_ORG_ID }),
    projectId: env.VERCEL_PROJECT_ID,
    repositoryId: env.GITHUB_REPOSITORY_ID,
  };
  const summary =
    mode === "cleanup"
      ? await cleanup(env, project)
      : await sweep(env, project);
  console.log(summary);
  appendGithubFile("GITHUB_STEP_SUMMARY", summary);
}

if (import.meta.main) await main();
