// Looks up support status for a docs version (e.g. "v0.63") against
// _data/major_version_support.json, refreshed nightly from the
// `major_version_support` key of https://static.metabase.com/version-info.json
// by .github/workflows/update-version-support.yml
//
// Mirrors the logic previously provided by
// _plugins/jekyll_version_support_plugin.rb, which built a
// site.data.version_support lookup table at Jekyll build time.
//
// The data file only tracks the most recent majors, so anything older than
// the oldest tracked major is unsupported. Versions with no entry and no
// verdict (such as "latest" and "master") return null.

import majorVersionSupport from "../../../_data/major_version_support.json";

type MajorVersionSupportEntry = {
  major: number;
  released?: string;
  lts?: boolean;
  eol?: string;
};

export type VersionSupport = {
  status: "supported" | "unsupported";
  lts: boolean;
};

const entries = majorVersionSupport as MajorVersionSupportEntry[];
const byMajor = new Map(entries.map((entry) => [entry.major, entry]));
const oldestTracked = Math.min(...byMajor.keys());

// "v0.63" -> 63
const majorOf = (version: string): number | null => {
  const match = /^v\d+\.(\d+)$/.exec(version);
  return match ? Number(match[1]) : null;
};

export const getVersionSupport = (version: string): VersionSupport | null => {
  const major = majorOf(version);
  if (major === null) return null;

  const entry = byMajor.get(major);
  if (!entry) {
    return major < oldestTracked ? { status: "unsupported", lts: false } : null;
  }

  const eol = entry.eol ? new Date(entry.eol) : null;
  const status =
    !eol || eol.getTime() > Date.now() ? "supported" : "unsupported";

  return { status, lts: entry.lts ?? false };
};

// Builds the full version -> support lookup table (e.g. for site.data.version_support
// in the Liquid context), mirroring VersionSupportGenerator#generate.
export const buildVersionSupportTable = (
  availableVersions: string[],
): Record<string, VersionSupport> => {
  const table: Record<string, VersionSupport> = {};
  for (const version of availableVersions ?? []) {
    const support = getVersionSupport(version);
    if (support) table[version] = support;
  }
  return table;
};
