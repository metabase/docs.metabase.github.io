import {
  appendGithubFile,
  choice,
  deployArguments,
  githubRunUrl,
  positiveInteger,
  requireEnvironment,
  runCommand,
  validateDeploymentUrl,
} from "./shared.ts";

export async function main(): Promise<void> {
  const target = choice(
    process.argv[2],
    ["preview", "production"],
    "deploy.ts",
  );
  const env = requireEnvironment([
    "VERCEL_TOKEN",
    "GITHUB_REPOSITORY",
    "GITHUB_REPOSITORY_ID",
    "GITHUB_RUN_ATTEMPT",
    "GITHUB_RUN_ID",
    "GITHUB_SERVER_URL",
    "GITHUB_SHA",
    "GITHUB_STEP_SUMMARY",
    ...(target === "preview"
      ? ["PR_BRANCH", "PR_HEAD_SHA", "PR_NUMBER"]
      : ["GITHUB_REF_NAME"]),
  ]);
  const sha = target === "preview" ? env.PR_HEAD_SHA : env.GITHUB_SHA;
  const ref = target === "preview" ? env.PR_BRANCH : env.GITHUB_REF_NAME;
  const pullNumber =
    target === "preview"
      ? positiveInteger(env.PR_NUMBER, "PR number")
      : undefined;
  const message = runCommand("git", ["log", "-1", "--format=%s", sha], {
    capture: true,
  });
  const author = runCommand("git", ["log", "-1", "--format=%an", sha], {
    capture: true,
  });
  const output = runCommand(
    "vercel",
    deployArguments(target, {
      token: env.VERCEL_TOKEN,
      repository: env.GITHUB_REPOSITORY,
      repositoryId: env.GITHUB_REPOSITORY_ID,
      ref,
      sha,
      message,
      author,
      buildSha: env.GITHUB_SHA,
      runUrl: githubRunUrl(env, { attempt: true }),
      pullNumber,
    }),
    { capture: true },
  );
  const deploymentUrl = validateDeploymentUrl(output.split(/\s+/).at(-1) ?? "");
  appendGithubFile("GITHUB_OUTPUT", `url=${deploymentUrl.origin}`);
  appendGithubFile(
    "GITHUB_STEP_SUMMARY",
    `Docs ${target} deployment: ${deploymentUrl.origin}`,
  );
}

if (import.meta.main) await main();
