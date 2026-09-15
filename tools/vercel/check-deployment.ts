import {
  requireEnvironment,
  runCommand,
  validateDeploymentUrl,
} from "./shared.ts";

export function checkDeployment(
  deploymentUrl: string,
  runner = runCommand,
): void {
  const origin = validateDeploymentUrl(deploymentUrl);
  const checks = [
    { path: "/docs/latest", status: "200", redirectUrl: "" },
    {
      path: "/",
      status: "307",
      redirectUrl: new URL("/docs/latest", origin).href,
    },
    {
      path: "/docs",
      status: "307",
      redirectUrl: new URL("/docs/latest", origin).href,
    },
  ];
  for (const check of checks) {
    const response = runner(
      "curl",
      [
        "--silent",
        "--show-error",
        "--fail",
        "--retry",
        "6",
        "--retry-all-errors",
        "--retry-delay",
        "5",
        "--output",
        "/dev/null",
        "--write-out",
        "%{http_code}\n%{redirect_url}",
        "--max-time",
        "30",
        new URL(check.path, origin).href,
      ],
      { capture: true },
    );
    const [status, redirectUrl = ""] = response.split("\n", 2);
    if (status !== check.status || redirectUrl !== check.redirectUrl) {
      if (redirectUrl.startsWith("https://vercel.com/sso-api?")) {
        throw new Error(
          `Docs route ${check.path} is protected by Vercel Authentication; preview deployments must be publicly accessible`,
        );
      }
      throw new Error(
        `Docs route ${check.path} returned HTTP ${status}${redirectUrl ? ` redirecting to ${redirectUrl}` : ""}`,
      );
    }
  }
}

export async function main(): Promise<void> {
  const env = requireEnvironment(["DEPLOYMENT_URL"]);
  checkDeployment(env.DEPLOYMENT_URL);
}

if (import.meta.main) await main();
