const GITHUB_STARS_ENDPOINT =
  "https://api.github.com/repos/metabase/metabase/stargazers/count";

type GitHubStarsResponse = {
  count: number;
};

let githubStarsPromise: Promise<number> | undefined;

export function formatGithubStars(count: number) {
  return `${Math.ceil(count / 100) / 10}k`;
}

export function getGithubStars() {
  githubStarsPromise ??= fetchGithubStars();

  return githubStarsPromise;
}

async function fetchGithubStars() {
  const headers = new Headers({
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
  });

  if (process.env.GITHUB_TOKEN) {
    headers.set("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);
  }

  const response = await fetch(GITHUB_STARS_ENDPOINT, { headers });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `GitHub stars request failed (${response.status}): ${body.slice(0, 200)}`,
    );
  }

  const data = (await response.json()) as GitHubStarsResponse;

  if (!Number.isInteger(data.count) || data.count < 0) {
    throw new Error("GitHub stars response did not contain a valid count");
  }

  return data.count;
}
