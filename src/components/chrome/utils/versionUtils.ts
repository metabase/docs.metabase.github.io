import type { VersionSupport } from "@/lib/docs/versionSupport";
import type { VersionsInfo } from "@/pages/docs/versions.json";

let versionsPromise: Promise<VersionsInfo>;

export const fetchVersions = () => {
  versionsPromise ??= fetch("/docs/versions.json").then((res) => res.json());
  return versionsPromise;
};

export const renderVersionNotice = (
  pageVersion: string | null | undefined,
  versionSupport: Record<string, VersionSupport>,
  docsVersion: string,
): string => {
  const latest = pageVersion === docsVersion;
  if (!pageVersion || latest) {
    return "";
  }
  const support = versionSupport[pageVersion];
  if (support?.status == "unsupported") {
    return `<blockquote class="version-unsupported-notice">
      Version ${pageVersion} of Metabase is
      <strong><a class="text-purple" href="/version-support">no longer supported</a></strong>.
      Check out the
      <a class="text-purple" href="/docs/latest/">
        docs for the current stable version, Metabase ${docsVersion}.
      </a>
    </blockquote>`;
  } else {
    return `<blockquote>
      These are the docs for Metabase ${pageVersion}. Check out the
      <a class="text-purple" href="/docs/latest/">
        docs for the current stable version, Metabase ${docsVersion}.
      </a>
    </blockquote>`;
  }
};

export const renderVersionListItems = (
  pageVersion: string | null | undefined,
  versionSupport: Record<string, VersionSupport>,
  availableVersions: string[],
): string => {
  const items = [...availableVersions]
    .reverse()
    .slice(0, 10)
    .filter((v) => v !== pageVersion)
    .map((v) => {
      const support = versionSupport[v];
      const tag =
        support?.status === "unsupported"
          ? `<span class="version__tag version__tag--unsupported">unsupported</span>`
          : support?.lts
            ? `<span class="version__tag version__tag--lts">lts</span>`
            : "";
      return `<li><a href="/docs/${v}/"><div class="version__dropdown--item"><span>${v}</span>${tag}</div></a></li>`;
    })
    .join("");

  return `${items}<li><a href="/docs/all">See more</a></li>`;
};
