import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";

type AmplifyRule = {
  source: string;
  status: string;
  target: string;
};

type VercelRedirect = {
  source: string;
  destination: string;
  permanent?: boolean;
  statusCode?: number;
};

const amplifyRules = JSON.parse(
  readFileSync(new URL("../../redirects.json", import.meta.url), "utf8"),
) as AmplifyRule[];
const vercelConfig = JSON.parse(
  readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"),
) as { redirects: VercelRedirect[]; trailingSlash?: boolean };

function canonicalPath(path: string): string {
  if (path === "/" || /^https?:\/\//.test(path)) return path;
  return path.replace(/\/+$/, "");
}

function amplifyPathToVercel(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const absolutePath = path.startsWith("/") ? path : `/${path}`;
  return canonicalPath(absolutePath).replace(/<([^>]+)>/g, ":$1");
}

describe("Vercel redirects", () => {
  test("copies meaningful Amplify 301 rules without slash-normalization hacks", () => {
    expect(vercelConfig.trailingSlash).toBe(false);

    const expected = new Map<string, VercelRedirect>();
    for (const rule of amplifyRules) {
      if (rule.status !== "301") continue;
      const source = amplifyPathToVercel(rule.source);
      const destination = amplifyPathToVercel(rule.target);
      if (source === destination) continue;
      expected.set(source, { source, destination, statusCode: 301 });
    }

    const copied = vercelConfig.redirects.filter(
      ({ source }) => source !== "/",
    );
    expect(copied).toEqual([...expected.values()]);
    expect(copied.every(({ source }) => !source.endsWith("/"))).toBe(true);
  });

  test("keeps the root redirect as a docs-only Vercel rule", () => {
    expect(vercelConfig.redirects.find(({ source }) => source === "/")).toEqual(
      {
        source: "/",
        destination: "/docs/latest",
        permanent: false,
      },
    );
  });
});
