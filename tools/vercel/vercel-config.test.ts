import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";
import { config } from "../../vercel";
import {
  isTrailingSlashRedirect,
  parseAmplifyRedirects,
  toVercelRedirects,
} from "./redirects";

const redirectsJson = readFileSync(
  new URL("../../redirects.json", import.meta.url),
  "utf8",
);

describe("docs Vercel configuration", () => {
  test("derives its redirects directly from redirects.json", () => {
    expect(config.redirects).toEqual([
      { source: "/", destination: "/docs/latest/", permanent: false },
      {
        source: "/docs/latest",
        destination: "/docs/latest/",
        permanent: true,
      },
      ...parseAmplifyRedirects(JSON.parse(redirectsJson)).map((redirect) =>
        redirect.destination === "/docs/latest"
          ? { ...redirect, destination: "/docs/latest/" }
          : redirect,
      ),
    ]);
  });

  test("copies meaningful Amplify redirects without slash-normalization hacks", () => {
    expect(
      toVercelRedirects([
        { source: "/old", status: "301", target: "/new" },
        {
          source: "/docs/<version>/<*>",
          status: "301",
          target: "/archive/<version>/<*>",
        },
        { source: "/page/", status: "301", target: "/page" },
        { source: "/<*>", status: "404-200", target: "/docs/404.html" },
      ]),
    ).toEqual([
      { source: "/old", destination: "/new", statusCode: 301 },
      {
        source: "/docs/:version/:path*",
        destination: "/archive/:version/:path*",
        statusCode: 301,
      },
    ]);
  });

  test("normalizes paths and destinations without creating extra hops", () => {
    expect(
      toVercelRedirects([
        { source: "docs", status: "301", target: "/docs/latest/" },
        { source: "/other/", status: "301", target: "/elsewhere/" },
        {
          source: "/external",
          status: "301",
          target: "https://example.com/path/",
        },
      ]),
    ).toEqual([
      { source: "/docs", destination: "/docs/latest", statusCode: 301 },
      { source: "/other", destination: "/elsewhere", statusCode: 301 },
      {
        source: "/external",
        destination: "https://example.com/path/",
        statusCode: 301,
      },
    ]);
  });

  test("recognizes only identity trailing-slash redirects", () => {
    expect(
      isTrailingSlashRedirect({
        source: "/page/",
        status: "301",
        target: "/page",
      }),
    ).toBe(true);
    expect(
      isTrailingSlashRedirect({
        source: "/old/",
        status: "301",
        target: "/new",
      }),
    ).toBe(false);
  });

  test("protects every route from indexing and cross-origin framing", () => {
    const noIndexRules = config.headers?.filter(({ has }) => has);
    expect(noIndexRules?.map(({ source }) => source)).toEqual(["/", "/:path*"]);
    expect(
      noIndexRules?.every(
        ({ has, headers }) =>
          has?.[0]?.type === "host" &&
          has[0].value.suf === ".vercel.app" &&
          headers.some(
            ({ key, value }) => key === "X-Robots-Tag" && value === "noindex",
          ),
      ),
    ).toBe(true);

    const frameRules = config.headers?.filter(({ has }) => !has);
    expect(frameRules?.map(({ source }) => source)).toEqual(["/", "/:path*"]);
    expect(
      frameRules?.every(({ headers }) =>
        headers.some(
          ({ key, value }) =>
            key === "Content-Security-Policy" &&
            value === "frame-ancestors 'self'",
        ),
      ),
    ).toBe(true);
    expect(
      frameRules?.every(({ headers }) =>
        headers.some(
          ({ key, value }) =>
            key === "X-Frame-Options" && value === "SAMEORIGIN",
        ),
      ),
    ).toBe(true);
  });

  test("rejects malformed Amplify redirect files", () => {
    expect(() => parseAmplifyRedirects({})).toThrow(
      "Amplify redirects must be a JSON array",
    );
    expect(() => parseAmplifyRedirects([{ source: "/old" }])).toThrow(
      "Invalid Amplify redirect at index 0",
    );
  });
});
