import type { VercelConfig } from "@vercel/config/v1";
import amplifyRedirects from "./redirects.json";
import { parseAmplifyRedirects } from "./tools/vercel/redirects";

const redirects = parseAmplifyRedirects(amplifyRedirects).map((redirect) =>
  redirect.destination === "/docs/latest"
    ? { ...redirect, destination: "/docs/latest/" }
    : redirect,
);

export const config = {
  framework: "astro",
  installCommand: "bun install --frozen-lockfile",
  buildCommand: "bun script/seed-docs-history.ts all && bun run build",
  outputDirectory: "_site",
  cleanUrls: true,
  redirects: [
    { source: "/", destination: "/docs/latest/", permanent: false },
    { source: "/docs/latest", destination: "/docs/latest/", permanent: true },
    { source: "/docs/", destination: "/docs/latest/", statusCode: 301 },
    ...redirects,
  ],
  headers: [
    {
      source: "/",
      has: [{ type: "host", value: { suf: ".vercel.app" } }],
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    },
    {
      source: "/:path*",
      has: [{ type: "host", value: { suf: ".vercel.app" } }],
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    },
    {
      source: "/",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "frame-ancestors 'self'",
        },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "frame-ancestors 'self'",
        },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
  ],
  git: { deploymentEnabled: false },
} satisfies VercelConfig;
