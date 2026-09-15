import {
  findPreviewComment,
  previewRemovedComment,
  updateComment,
} from "./preview-comment.ts";
import {
  appendGithubFile,
  assertClosedPullRequest,
  matchesPreviewDeployment,
  positiveInteger,
  previewHostname,
  readPullRequest,
  requireEnvironment,
  vercelRequest,
  type Deployment,
  type PreviewDeploymentTarget,
  type VercelCredentials,
} from "./shared.ts";

type Alias = { uid?: string; alias?: string; projectId?: string };
type DeploymentPage = {
  deployments?: Deployment[];
  pagination?: { next?: string | number | null };
};
type Preview = PreviewDeploymentTarget & { credentials: VercelCredentials };

async function listPreviewDeploymentIds(preview: Preview): Promise<string[]> {
  const ids = new Set<string>();
  const cursors = new Set<string>();
  let until: string | undefined;
  do {
    const page = await vercelRequest<DeploymentPage>(
      "/v7/deployments",
      preview.credentials,
      {
        query: {
          projectId: preview.projectId,
          limit: "100",
          ...(until ? { until } : {}),
        },
      },
    );
    if (!page) throw new Error("Vercel returned no deployment page");
    for (const deployment of page.deployments ?? []) {
      if (!matchesPreviewDeployment(deployment, preview)) continue;
      if (!deployment.uid) throw new Error("Deployment is missing its ID");
      ids.add(deployment.uid);
    }
    const next = page.pagination?.next;
    until = next == null ? undefined : String(next);
    if (until && cursors.has(until)) {
      throw new Error("Vercel pagination repeated a cursor");
    }
    if (until) cursors.add(until);
  } while (until);
  return [...ids];
}

/** Returns the alias ID when the preview hostname is aliased to this project. */
async function findPreviewAliasId(
  preview: Preview,
  host: string,
): Promise<string | null> {
  const alias = await vercelRequest<Alias>(
    `/v4/aliases/${encodeURIComponent(host)}`,
    preview.credentials,
    {
      missingOK: true,
    },
  );
  if (!alias) return null;
  if (
    alias.projectId !== preview.projectId ||
    alias.alias !== host ||
    !alias.uid
  ) {
    throw new Error("Preview alias does not belong to the docs project");
  }
  return alias.uid;
}

async function deletePreviewAlias(
  preview: Preview,
  aliasId: string,
): Promise<void> {
  await vercelRequest(
    `/v2/aliases/${encodeURIComponent(aliasId)}`,
    preview.credentials,
    {
      method: "DELETE",
      missingOK: true,
    },
  );
}

/** Re-reads each deployment before deleting so a stale listing cannot remove the wrong one. */
async function deletePreviewDeployments(
  preview: Preview,
  ids: string[],
  beforeEach: () => Promise<void>,
): Promise<number> {
  let deleted = 0;
  for (const id of ids) {
    await beforeEach();
    const path = `/v13/deployments/${encodeURIComponent(id)}`;
    const deployment = await vercelRequest<Deployment>(
      path,
      preview.credentials,
      {
        missingOK: true,
      },
    );
    if (!deployment) continue;
    if (!matchesPreviewDeployment(deployment, preview)) {
      throw new Error(`Deployment ${id} no longer matches this preview`);
    }
    await vercelRequest(path, preview.credentials, {
      method: "DELETE",
      missingOK: true,
    });
    deleted++;
  }
  return deleted;
}

export async function main(): Promise<void> {
  const env = requireEnvironment([
    "GH_TOKEN",
    "GITHUB_REPOSITORY",
    "GITHUB_REPOSITORY_ID",
    "PR_NUMBER",
    "VERCEL_ORG_ID",
    "VERCEL_PROJECT_ID",
    "VERCEL_TEAM_SLUG",
    "VERCEL_TOKEN",
  ]);
  const pullNumber = positiveInteger(env.PR_NUMBER, "PR number");
  const target = {
    repository: env.GITHUB_REPOSITORY,
    pullNumber,
    token: env.GH_TOKEN,
  };
  const preview: Preview = {
    credentials: { token: env.VERCEL_TOKEN, teamId: env.VERCEL_ORG_ID },
    projectId: env.VERCEL_PROJECT_ID,
    repositoryId: env.GITHUB_REPOSITORY_ID,
    pullNumber,
  };
  const requireClosed = async () => {
    assertClosedPullRequest(
      await readPullRequest(target.repository, pullNumber, target.token),
    );
  };

  await requireClosed();
  const deploymentIds = await listPreviewDeploymentIds(preview);
  const host = previewHostname(pullNumber, env.VERCEL_TEAM_SLUG);
  const aliasId = await findPreviewAliasId(preview, host);

  await requireClosed();
  if (aliasId) await deletePreviewAlias(preview, aliasId);
  const deleted = await deletePreviewDeployments(
    preview,
    deploymentIds,
    requireClosed,
  );

  await requireClosed();
  const existing = await findPreviewComment(target);
  if (existing) {
    await updateComment(target, existing.id, previewRemovedComment());
  }
  appendGithubFile(
    "GITHUB_STEP_SUMMARY",
    `Removed ${aliasId ? 1 : 0} docs preview alias and ${deleted} tagged deployments for PR #${pullNumber}.`,
  );
}

if (import.meta.main) await main();
