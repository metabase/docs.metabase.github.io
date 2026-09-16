import { checkDeployment } from "./check-deployment.ts";
import {
  appendGithubFile,
  assertOpenCurrentPullRequest,
  deployArguments,
  githubRunUrl,
  previewHostname,
  PROJECT_NAME,
  readPullRequest,
  requireEnvironment,
  runCommand,
  validateDeploymentUrl,
  vercelApi,
  type VercelApi,
} from "./shared.ts";

const PROMOTE_POLL_MS = 5_000;

/** Promotes a production deployment and waits for Vercel to finish moving the domains. */
export async function promote(
  api: VercelApi,
  projectId: string,
  deploymentId: string,
  timeoutMs = 3 * 60_000,
): Promise<void> {
  const { sdk, teamId } = api;
  const deadline = Date.now() + timeoutMs;
  await sdk.projects.requestPromote({ projectId, deploymentId, teamId });
  while (true) {
    const project = await sdk.projects.getProject({
      idOrName: projectId,
      teamId,
    });
    const request = project.lastAliasRequest;
    const status =
      request?.toDeploymentId === deploymentId ? request.jobStatus : undefined;
    if (status === "succeeded") return;
    if (status === "failed" || status === "skipped") {
      throw new Error(`Promotion of ${deploymentId} ${status}`);
    }
    if (Date.now() >= deadline) {
      throw new Error(
        `Promotion of ${deploymentId} is still ${status ?? "pending"}`,
      );
    }
    await Bun.sleep(PROMOTE_POLL_MS);
  }
}

/**
 * Deploys the prebuilt output, checks it, then either points the PR's stable
 * preview address at it or promotes it to production.
 */
export async function main(): Promise<void> {
  const target = process.argv[2];
  if (target !== "preview" && target !== "production") {
    throw new Error("Usage: deploy.ts <preview|production>");
  }
  const env = requireEnvironment([
    "COMMIT_AUTHOR",
    "COMMIT_MESSAGE",
    "GITHUB_REPOSITORY",
    "GITHUB_REPOSITORY_ID",
    "GITHUB_RUN_ATTEMPT",
    "GITHUB_RUN_ID",
    "GITHUB_SERVER_URL",
    "GITHUB_SHA",
    "GITHUB_STEP_SUMMARY",
    "VERCEL_ORG_ID",
    "VERCEL_PROJECT_ID",
    "VERCEL_TEAM_SLUG",
    "VERCEL_TOKEN",
    ...(target === "preview"
      ? ["GH_TOKEN", "PR_BRANCH", "PR_HEAD_SHA", "PR_NUMBER"]
      : ["GITHUB_REF_NAME"]),
  ]);
  const sha = target === "preview" ? env.PR_HEAD_SHA : env.GITHUB_SHA;
  const ref = target === "preview" ? env.PR_BRANCH : env.GITHUB_REF_NAME;
  const pullNumber = target === "preview" ? Number(env.PR_NUMBER) : undefined;
  const output = runCommand(
    "vercel",
    deployArguments(target, {
      repository: env.GITHUB_REPOSITORY,
      repositoryId: env.GITHUB_REPOSITORY_ID,
      ref,
      sha,
      // The workflow passes these from the event payload, so no git history is needed.
      message: env.COMMIT_MESSAGE.split("\n", 1)[0] ?? "",
      author: env.COMMIT_AUTHOR,
      buildSha: env.GITHUB_SHA,
      runUrl: githubRunUrl(env, { attempt: true }),
      pullNumber,
    }),
    { capture: true },
  );
  const deploymentUrl = validateDeploymentUrl(
    output.split(/\s+/).at(-1) ?? "",
  ).origin;
  checkDeployment(deploymentUrl);
  const api = vercelApi({ token: env.VERCEL_TOKEN, teamId: env.VERCEL_ORG_ID });
  const { id: deploymentId } = await api.sdk.deployments.getDeployment({
    idOrUrl: new URL(deploymentUrl).host,
    teamId: api.teamId,
  });

  if (pullNumber === undefined) {
    await promote(api, env.VERCEL_PROJECT_ID, deploymentId);
    appendGithubFile(
      "GITHUB_STEP_SUMMARY",
      `${PROJECT_NAME} production: ${deploymentUrl}`,
    );
    return;
  }

  // Never move the stable address for a PR that closed or moved on mid-build.
  assertOpenCurrentPullRequest(
    await readPullRequest(env.GITHUB_REPOSITORY, pullNumber, env.GH_TOKEN),
    env.PR_HEAD_SHA,
  );
  const previewHost = previewHostname(
    PROJECT_NAME,
    pullNumber,
    env.VERCEL_TEAM_SLUG,
  );
  await api.sdk.aliases.assignAlias({
    id: deploymentId,
    teamId: api.teamId,
    requestBody: { alias: previewHost },
  });
  appendGithubFile(
    "GITHUB_STEP_SUMMARY",
    `${PROJECT_NAME} preview: https://${previewHost}`,
  );
}

if (import.meta.main) await main();
