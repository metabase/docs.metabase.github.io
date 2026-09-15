import type { VercelConfig } from "@vercel/config/v1";
import amplifyRedirects from "./redirects.json";
import { parseAmplifyRedirects } from "./tools/vercel/redirects";

const redirects = parseAmplifyRedirects(amplifyRedirects);

export const config = {
  framework: "astro",
  installCommand: "bun install --frozen-lockfile",
  buildCommand: "bun run build",
  outputDirectory: "_site",
  cleanUrls: true,
  trailingSlash: false,
  redirects: [
    { source: "/", destination: "/docs/latest", permanent: false },
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
