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
    { path: "/docs/latest/", status: "200", redirectUrl: "" },
    {
      path: "/docs/latest",
      status: "308",
      redirectUrl: new URL("/docs/latest/", origin).href,
    },
    {
      path: "/",
      status: "307",
      redirectUrl: new URL("/docs/latest/", origin).href,
    },
    {
      path: "/docs",
      status: "301",
      redirectUrl: new URL("/docs/latest/", origin).href,
    },
    {
      path: "/docs/",
      status: "301",
      redirectUrl: new URL("/docs/latest/", origin).href,
    },
    { path: "/docs/images/not_found.svg", status: "200", redirectUrl: "" },
    {
      path: "/docs/latest/vercel-deployment-404-check",
      status: "404",
      redirectUrl: "",
    },
  ];
  for (const check of checks) {
    const response = runner(
      "curl",
      [
        "--silent",
        "--show-error",
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
      if (
        status === "401" ||
        redirectUrl.startsWith("https://vercel.com/sso-api?")
      ) {
        throw new Error(
          `Docs route ${check.path} is protected by Vercel Authentication; preview deployments must be publicly accessible`,
        );
      }
      throw new Error(
        `Docs route ${check.path} returned HTTP ${status}${redirectUrl ? ` redirecting to ${redirectUrl}` : ""}`,
      );
    }
  }

  const notFoundBody = runner(
    "curl",
    [
      "--silent",
      "--show-error",
      "--retry",
      "6",
      "--retry-all-errors",
      "--retry-delay",
      "5",
      "--max-time",
      "30",
      new URL("/docs/latest/vercel-deployment-404-check", origin).href,
    ],
    { capture: true },
  );
  if (!notFoundBody.includes('id="error-404"')) {
    throw new Error("Docs route returned Vercel's default 404 page");
  }
}

export async function main(): Promise<void> {
  const env = requireEnvironment(["DEPLOYMENT_URL"]);
  checkDeployment(env.DEPLOYMENT_URL);
}

if (import.meta.main) await main();
