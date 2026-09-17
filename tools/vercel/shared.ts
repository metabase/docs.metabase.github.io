import { appendFileSync } from "node:fs";
import { Vercel } from "@vercel/sdk";
import { VercelError } from "@vercel/sdk/models/vercelerror.js";

export const PROJECT_NAME = "docs";

export const GITHUB_ACTIONS_BOT = "github-actions[bot]";
export const PREVIEW_COMMENT_MARKER = "<!-- vercel-docs-pr-preview -->";

export type Environment = Record<string, string | undefined>;
export type PullRequest = {
  state?: string;
  head?: { sha?: string };
};
export type Deployment = {
  uid?: string;
  projectId?: string;
  target?: string | null;
  readySubstate?: string;
  meta?: Record<string, string | undefined>;
};
export type VercelCredentials = { token: string; teamId: string };
export type PreviewDeploymentTarget = {
  projectId: string;
  repositoryId: string;
  pullNumber: number;
};

export function requireEnvironment(
  names: readonly string[],
  environment: Environment = process.env,
): Record<string, string> {
  return Object.fromEntries(
    names.map((name) => {
      const value = environment[name]?.trim();
      if (!value) throw new Error(`Missing ${name}`);
      return [name, value];
    }),
  );
}

export function githubRepositoryUrl(env: Record<string, string>): string {
  return `${env.GITHUB_SERVER_URL}/${env.GITHUB_REPOSITORY}`;
}

export function githubRunUrl(
  env: Record<string, string>,
  options: { attempt?: boolean } = {},
): string {
  const runUrl = `${githubRepositoryUrl(env)}/actions/runs/${env.GITHUB_RUN_ID}`;
  return options.attempt
    ? `${runUrl}/attempts/${env.GITHUB_RUN_ATTEMPT}`
    : runUrl;
}

export async function githubRequest<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<{ data: T; response: Response }> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) {
    throw new Error(
      `GitHub ${options.method ?? "GET"} ${path}: HTTP ${response.status}`,
    );
  }
  return { data: (await response.json()) as T, response };
}

/** A configured Vercel SDK client plus the team every call is scoped to. */
export type VercelApi = { sdk: Vercel; teamId: string };

export function vercelApi(credentials: VercelCredentials): VercelApi {
  return {
    sdk: new Vercel({ bearerToken: credentials.token }),
    teamId: credentials.teamId,
  };
}

/** Resolves an SDK call to null when Vercel reports the resource missing. */
export async function ifFound<T>(call: Promise<T>): Promise<T | null> {
  try {
    return await call;
  } catch (error) {
    if (error instanceof VercelError && error.statusCode === 404) return null;
    throw error;
  }
}

export async function readPullRequest(
  repository: string,
  pullNumber: number,
  token: string,
): Promise<PullRequest> {
  const { data } = await githubRequest<PullRequest>(
    `/repos/${repository}/pulls/${pullNumber}`,
    token,
  );
  return data;
}

export function isCurrentPullRequest(
  pullRequest: PullRequest,
  expectedSha: string,
): boolean {
  return pullRequest.state === "open" && pullRequest.head?.sha === expectedSha;
}

export function assertOpenCurrentPullRequest(
  pullRequest: PullRequest,
  expectedSha: string,
): void {
  if (!isCurrentPullRequest(pullRequest, expectedSha)) {
    throw new Error(
      "This preview is outdated or the PR is closed; skipping deployment.",
    );
  }
}

export function assertClosedPullRequest(pullRequest: PullRequest): void {
  if (pullRequest.state !== "closed") {
    throw new Error("PR was reopened; stopping preview cleanup.");
  }
}

export function previewHostname(
  project: string,
  pullNumber: number,
  teamSlug: string,
): string {
  return `${project}-pr-${pullNumber}-${teamSlug}.vercel.app`;
}

export function matchesPreviewDeployment(
  deployment: Deployment,
  target: PreviewDeploymentTarget,
): boolean {
  return (
    deployment.projectId === target.projectId &&
    (deployment.target == null || deployment.target === "preview") &&
    deployment.readySubstate !== "PROMOTED" &&
    deployment.meta?.ciRepositoryId === target.repositoryId &&
    deployment.meta?.ciPullRequest === String(target.pullNumber)
  );
}

export function deployArguments(
  target: "preview" | "production",
  values: {
    repository: string;
    repositoryId: string;
    ref: string;
    sha: string;
    message: string;
    author: string;
    buildSha: string;
    runUrl: string;
    pullNumber?: number;
  },
): string[] {
  const [owner, repo] = values.repository.split("/");
  const args = ["deploy", "--prebuilt", "--archive=tgz", "--yes"];
  // Production deployments get their domains only after the post-deploy checks pass.
  if (target === "production") args.push("--prod", "--skip-domain");
  const metadata: Record<string, string> = {
    githubDeployment: "1",
    ciRepositoryId: values.repositoryId,
    githubCommitOrg: owner ?? "",
    githubCommitRepo: repo ?? "",
    githubCommitRef: values.ref,
    githubCommitSha: values.sha,
    githubCommitMessage: values.message,
    githubCommitAuthorName: values.author,
    ciBuildSha: values.buildSha,
    ciRunUrl: values.runUrl,
  };
  if (values.pullNumber !== undefined) {
    metadata.ciPullRequest = String(values.pullNumber);
  }
  for (const [key, value] of Object.entries(metadata)) {
    args.push("--meta", `${key}=${value}`);
  }
  return args;
}

export type CommandRunner = (
  command: string,
  args: string[],
  options?: { capture?: boolean },
) => string;

export const runCommand: CommandRunner = (command, args, options = {}) => {
  const result = Bun.spawnSync([command, ...args], {
    stdout: options.capture ? "pipe" : "inherit",
    stderr: "inherit",
    env: process.env,
  });
  if (result.exitCode !== 0) {
    throw new Error(
      `${command} ${args[0] ?? ""} exited with ${result.exitCode}`,
    );
  }
  return options.capture ? (result.stdout?.toString().trim() ?? "") : "";
};

export function appendGithubFile(variable: string, value: string): void {
  const path = process.env[variable];
  if (!path) return;
  appendFileSync(path, `${value}\n`);
}

export function validateDeploymentUrl(value: string): URL {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("Expected a bare HTTPS deployment origin");
  }
  return url;
}
