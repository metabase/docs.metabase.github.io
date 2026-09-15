import { checkDeployment } from "./check-deployment.ts";
import {
  readPreviewContext,
  tryFindVercelDeployment,
  upsertPreviewComment,
} from "./preview-comment.ts";
import {
  appendGithubFile,
  assertOpenCurrentPullRequest,
  readPullRequest,
  requireEnvironment,
  runCommand,
  validateDeploymentUrl,
} from "./shared.ts";

export async function main(): Promise<void> {
  const { env, target, lookup, comment, previewHost, previewUrl } =
    readPreviewContext();
  const { DEPLOYMENT_URL } = requireEnvironment(["DEPLOYMENT_URL"]);
  const pullRequest = await readPullRequest(
    target.repository,
    target.pullNumber,
    target.token,
  );
  assertOpenCurrentPullRequest(pullRequest, env.PR_HEAD_SHA);

  const deploymentUrl = validateDeploymentUrl(DEPLOYMENT_URL).origin;
  checkDeployment(deploymentUrl);
  runCommand("vercel", [
    "alias",
    "set",
    deploymentUrl,
    previewHost,
    "--scope",
    lookup.teamId,
    "--token",
    lookup.token,
  ]);
  const deployment = await tryFindVercelDeployment(
    deploymentUrl,
    lookup,
    "preview deployment",
  );

  await upsertPreviewComment(target, {
    ...comment,
    status: "ready",
    deploymentDashboardUrl: deployment?.dashboardUrl,
    previewUrl,
  });
  appendGithubFile("GITHUB_STEP_SUMMARY", `Docs preview: ${previewUrl}`);
}

if (import.meta.main) await main();
