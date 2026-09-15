import {
  assertOpenCurrentPullRequest,
  positiveInteger,
  readPullRequest,
  requireEnvironment,
} from "./shared.ts";

export async function main(): Promise<void> {
  const env = requireEnvironment([
    "GH_TOKEN",
    "GITHUB_REPOSITORY",
    "PR_HEAD_SHA",
    "PR_NUMBER",
  ]);
  const pullRequest = await readPullRequest(
    env.GITHUB_REPOSITORY,
    positiveInteger(env.PR_NUMBER, "PR number"),
    env.GH_TOKEN,
  );
  assertOpenCurrentPullRequest(pullRequest, env.PR_HEAD_SHA);
}

if (import.meta.main) await main();
