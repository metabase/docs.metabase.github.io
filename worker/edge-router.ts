export interface Env {
  DOCS_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Path: e.g. /docs/v0.63/getting-started
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    const parts = path.split("/");

    if (parts[0] !== "docs") {
      return new Response("Not Found", { status: 404 });
    }

    const [_, ver, ...rest] = parts;
    const version = ver;
    let fileKey = rest.join("/");

    // Handle index.html resolution for directory roots
    if (!fileKey || fileKey.endsWith("/")) {
      fileKey += "index.html";
    } else if (!fileKey.includes(".")) {
      fileKey += "/index.html";
    }

    const objectKey = `docs/${version}/${fileKey}`;
    const object = await env.DOCS_BUCKET.get(objectKey);

    if (!object) {
      return new Response("Page Not Found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    if (object.httpEtag) {
      headers.set("etag", object.httpEtag);
    }

    return new Response(object.body, { headers });
  },
};
