import { describe, expect, test } from "bun:test";
import { checkDeployment } from "./check-deployment.ts";

describe("checkDeployment", () => {
  test("checks docs and its entry-point redirects with retrying curl requests", () => {
    const calls: Array<{
      command: string;
      args: string[];
      options?: { capture?: boolean };
    }> = [];
    checkDeployment(
      "https://docs-test.vercel.app",
      (command, args, options) => {
        calls.push({ command, args, options });
        const path = new URL(args.at(-1)!).pathname;
        if (path === "/docs/latest" || path === "/docs/images/not_found.svg") {
          return "200\n";
        }
        if (path === "/") {
          return "307\nhttps://docs-test.vercel.app/docs/latest";
        }
        if (path === "/docs") {
          return "301\nhttps://docs-test.vercel.app/docs/latest";
        }
        return args.includes("--write-out")
          ? "404\n"
          : '<div id="error-404">Not found</div>';
      },
    );
    expect(calls.map(({ args }) => args.at(-1))).toEqual([
      "https://docs-test.vercel.app/docs/latest",
      "https://docs-test.vercel.app/",
      "https://docs-test.vercel.app/docs",
      "https://docs-test.vercel.app/docs/images/not_found.svg",
      "https://docs-test.vercel.app/docs/latest/vercel-deployment-404-check",
      "https://docs-test.vercel.app/docs/latest/vercel-deployment-404-check",
    ]);
    expect(
      calls
        .slice(0, 5)
        .every(
          ({ command, args }) =>
            command === "curl" &&
            args.includes("--retry") &&
            args.includes("--write-out"),
        ),
    ).toBe(true);
    expect(calls.slice(0, 4).every(({ args }) => args.includes("--fail"))).toBe(
      true,
    );
    expect(calls[4]?.args).not.toContain("--fail");
    expect(calls.every(({ options }) => options?.capture)).toBe(true);
  });

  test("reports non-200 responses and Vercel Authentication redirects", () => {
    expect(() =>
      checkDeployment("https://docs-test.vercel.app", () => "500"),
    ).toThrow("HTTP 500");
    expect(() =>
      checkDeployment(
        "https://docs-test.vercel.app",
        () =>
          "302\nhttps://vercel.com/sso-api?url=https%3A%2F%2Fdocs-test.vercel.app",
      ),
    ).toThrow("protected by Vercel Authentication");
  });
});
