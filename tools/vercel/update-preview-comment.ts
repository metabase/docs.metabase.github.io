import {
  readPreviewContext,
  tryFindVercelDeployment,
  upsertPreviewComment,
} from "./preview-comment.ts";
import { choice, isCurrentPullRequest, readPullRequest } from "./shared.ts";

export async function main(): Promise<void> {
  const status = choice(
    process.argv[2],
    ["building", "failed"],
    "update-preview-comment.ts",
  );
  const { env, target, lookup, comment, previewUrl } = readPreviewContext();
  const pullRequest = await readPullRequest(
    target.repository,
    target.pullNumber,
    target.token,
  );
  if (!isCurrentPullRequest(pullRequest, env.PR_HEAD_SHA)) return;

  const deploymentUrl = process.env.DEPLOYMENT_URL?.trim();
  const currentDeployment = deploymentUrl
    ? await tryFindVercelDeployment(deploymentUrl, lookup, "failed deployment")
    : null;
  const previousDeployment =
    status === "failed"
      ? await tryFindVercelDeployment(previewUrl, lookup, "previous deployment")
      : null;

  await upsertPreviewComment(target, {
    ...comment,
    status,
    deploymentDashboardUrl: currentDeployment?.dashboardUrl,
    previousSha: previousDeployment?.commitSha,
    previewUrl: previousDeployment ? previewUrl : undefined,
  });
}

if (import.meta.main) await main();
