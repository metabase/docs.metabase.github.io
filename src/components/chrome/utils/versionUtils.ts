import type { VersionSupport } from "@/lib/docs/versionSupport";
import type { VersionsInfo } from "@/pages/docs/versions.json";

let versionsPromise: Promise<VersionsInfo>;

export const VERSIONS_STORAGE_KEY = "docs-versions";

export const fetchVersions = () => {
  versionsPromise ??= fetch("/docs/versions.json")
    .then((res) => res.json())
    .then((data: VersionsInfo) => {
      try {
        localStorage.setItem(VERSIONS_STORAGE_KEY, JSON.stringify(data));
      } catch {}
      return data;
    });
  return versionsPromise;
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
