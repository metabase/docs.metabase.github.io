export interface Env {
  DOCS_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // TODO: Use static assets for supported versions, only use the worker for getting old versions from r2
    const url = new URL(request.url);
    const path = url.pathname.replace(/^\/+|\/+$/g, "");
    const parts = path.split("/");

    if (parts[0] !== "docs" && parts[0] !== "previews") {
      return new Response("Not Found", { status: 404 });
    }

    let prefix = "";
    let version = "";
    let fileKey = "";

    if (parts[0] === "previews") {
      // Path: /previews/pr-102/v0.63/getting-started
      const [_, prId, ver, ...rest] = parts;
      prefix = `previews/${prId}`;
      version = ver;
      fileKey = rest.join("/");
    } else {
      // Path: /docs/v0.63/getting-started
      const [_, ver, ...rest] = parts;
      version = ver;
      fileKey = rest.join("/");
    }

    // Handle index.html resolution for directory roots
    if (!fileKey || fileKey.endsWith("/")) {
      fileKey += "index.html";
    } else if (!fileKey.includes(".")) {
      fileKey += "/index.html";
    }

    const objectKey = prefix
      ? `${prefix}/${version}/${fileKey}`
      : `docs/${version}/${fileKey}`;
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
