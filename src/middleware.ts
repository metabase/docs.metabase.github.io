import { defineMiddleware } from "astro:middleware";

/**
 * Dev-only Jekyll proxy: if Astro can't handle a request (404), proxy it to
 * Jekyll so both run on the "same" port during migration. Removable once
 * everything is migrated.
 */

const JEKYLL_PORT = 4002;

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Astro handled it.
  if (response.status !== 404) return response;

  // In prod, return Astro's own 404 response. In dev, fall through to the
  // Jekyll proxy so unmigrated routes still resolve.
  if (!import.meta.env.DEV) return response;

  try {
    const { pathname, search } = context.url;
    return await fetch(`http://localhost:${JEKYLL_PORT}${pathname}${search}`);
  } catch {
    return response;
  }
});
