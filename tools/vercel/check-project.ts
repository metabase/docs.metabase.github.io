import { readFileSync } from "node:fs";

type VercelProject = {
  settings?: { rootDirectory?: string | null };
};

export function assertDocsProjectRoot(project: VercelProject): void {
  if (!project.settings || project.settings.rootDirectory !== null) {
    throw new Error(
      "Set this Vercel project's Root Directory to the repository root; CI runs from the repository root.",
    );
  }
}

export function main(): void {
  const project = JSON.parse(
    readFileSync(".vercel/project.json", "utf8"),
  ) as VercelProject;
  assertDocsProjectRoot(project);
}

if (import.meta.main) main();
