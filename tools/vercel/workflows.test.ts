import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";

const workflowDisplayNames = {
  "deploy-vercel-preview": "Deploy PR preview to Vercel",
  "deploy-vercel-production": "Deploy production to Vercel",
  "cleanup-vercel-preview": "Clean up PR preview on Vercel",
} as const;

type WorkflowName = keyof typeof workflowDisplayNames;

const workflows = Object.fromEntries(
  (Object.keys(workflowDisplayNames) as WorkflowName[]).map((name) => [
    name,
    Bun.YAML.parse(
      readFileSync(
        new URL(`../../.github/workflows/${name}.yml`, import.meta.url),
        "utf8",
      ),
    ),
  ]),
) as Record<WorkflowName, any>;

function step(workflow: any, job: string, name: string): any {
  const found = workflow.jobs[job].steps.find(
    (step: any) => step.name === name,
  );
  if (!found) throw new Error(`Missing step "${name}" in job "${job}"`);
  return found;
}

describe("docs Vercel workflows", () => {
  test("use the reference workflow names", () => {
    for (const [name, displayName] of Object.entries(workflowDisplayNames)) {
      expect(workflows[name as WorkflowName].name).toBe(displayName);
    }
  });

  test("deploy only the docs project", () => {
    expect(Object.keys(workflows["deploy-vercel-preview"].jobs)).toEqual([
      "docs",
    ]);
    expect(Object.keys(workflows["deploy-vercel-production"].jobs)).toEqual([
      "docs",
    ]);
  });

  test("uses production variables for the production build only", () => {
    const preview = workflows["deploy-vercel-preview"];
    const production = workflows["deploy-vercel-production"];
    expect(step(preview, "docs", "Build docs preview").run).not.toContain(
      "--prod",
    );
    expect(step(production, "docs", "Build docs production").run).toContain(
      "--prod",
    );
    expect(production.on.push.branches).toEqual(["master"]);
    expect(preview.env.DEPLOY_ENV).toBe("staging");
    expect(production.env.DEPLOY_ENV).toBe("production");
    expect(preview.env.VERCEL_ORG_ID).toBe("${{ secrets.VERCEL_ORG_ID }}");
    expect(preview.env.VERCEL_TOKEN).toBe("${{ secrets.VERCEL_TOKEN }}");
    expect(preview.env.VERCEL_PROJECT_ID).toBe(
      "${{ vars.VERCEL_DOCS_PROJECT_ID }}",
    );
    expect(preview.env.VERCEL_TEAM_SLUG).toBe("metaboat");
  });

  test("serializes deployment and cleanup for the same PR", () => {
    const preview = workflows["deploy-vercel-preview"];
    const cleanup = workflows["cleanup-vercel-preview"];
    expect(cleanup.concurrency).toEqual(preview.concurrency);
    expect(cleanup.on.pull_request_target.types).toEqual(["closed"]);
    expect(cleanup.jobs.cleanup.steps[0].with.ref).toBe(
      "${{ github.event.repository.default_branch }}",
    );
  });

  test("updates the preview comment throughout the deployment", () => {
    const preview = workflows["deploy-vercel-preview"];
    expect(
      step(preview, "docs", "Check PR is still open and current").run,
    ).toBe("bun tools/vercel/check-pull-request.ts");
    expect(step(preview, "docs", "Update preview comment").run).toBe(
      "bun tools/vercel/update-preview-comment.ts building",
    );
    const failed = step(preview, "docs", "Report failed preview");
    expect(failed.if).toBe("${{ failure() }}");
    expect(failed.run).toBe(
      "bun tools/vercel/update-preview-comment.ts failed",
    );
  });

  test("keeps executable logic out of workflow YAML", () => {
    for (const workflow of Object.values(workflows)) {
      for (const job of Object.values(workflow.jobs) as any[]) {
        for (const step of job.steps) {
          if (step.run) expect(step.run).not.toContain("\n");
        }
      }
    }
  });
});
