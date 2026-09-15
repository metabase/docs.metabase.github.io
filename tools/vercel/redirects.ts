export interface AmplifyRedirect {
  source: string;
  status: string;
  target: string;
}

export interface VercelRedirect {
  source: string;
  destination: string;
  statusCode: 301;
}

function isAmplifyRedirect(value: unknown): value is AmplifyRedirect {
  if (typeof value !== "object" || value === null) return false;
  const rule = value as Record<string, unknown>;
  return (
    typeof rule.source === "string" &&
    typeof rule.status === "string" &&
    typeof rule.target === "string"
  );
}

export function isTrailingSlashRedirect(rule: AmplifyRedirect): boolean {
  return (
    rule.source !== "/" &&
    rule.source.endsWith("/") &&
    rule.source.slice(0, -1) === rule.target
  );
}

function canonicalPath(path: string): string {
  if (path === "/" || /^https?:\/\//.test(path)) return path;
  return path.replace(/\/+$/, "");
}

function toVercelPattern(pattern: string): string {
  return pattern.replaceAll("<*>", ":path*").replace(/<([^>]+)>/g, ":$1");
}

function toVercelPath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const absolutePath = path.startsWith("/") ? path : `/${path}`;
  return toVercelPattern(canonicalPath(absolutePath));
}

export function toVercelRedirects(rules: AmplifyRedirect[]): VercelRedirect[] {
  const redirects = new Map<string, VercelRedirect>();
  for (const rule of rules) {
    if (rule.status !== "301" || isTrailingSlashRedirect(rule)) continue;
    const source = toVercelPath(rule.source);
    const destination = toVercelPath(rule.target);
    if (source === destination || redirects.has(source)) continue;
    redirects.set(source, { source, destination, statusCode: 301 });
  }
  return [...redirects.values()];
}

export function parseAmplifyRedirects(value: unknown): VercelRedirect[] {
  if (!Array.isArray(value)) {
    throw new TypeError("Amplify redirects must be a JSON array");
  }
  for (const [index, rule] of value.entries()) {
    if (!isAmplifyRedirect(rule)) {
      throw new TypeError(`Invalid Amplify redirect at index ${index}`);
    }
  }
  return toVercelRedirects(value);
}
