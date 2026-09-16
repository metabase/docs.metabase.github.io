import { readFileSync } from "node:fs";
import { describe, expect, test } from "bun:test";

const workflowDisplayNames = {
  "deploy-vercel": "Deploy to Vercel",
  "cleanup-vercel-previews": "Clean up PR previews on Vercel",
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

const deploy = workflows["deploy-vercel"];
const cleanupWorkflow = workflows["cleanup-vercel-previews"];
const testWorkflow = Bun.YAML.parse(
  readFileSync(
    new URL("../../.github/workflows/test.yml", import.meta.url),
    "utf8",
  ),
) as any;
const { preview, production } = deploy.jobs;
const { cleanup, sweep } = cleanupWorkflow.jobs;

function step(job: any, name: string): any {
  const found = job.steps.find((step: any) => step.name === name);
  if (!found) throw new Error(`Missing step "${name}"`);
  return found;
}

describe("Vercel workflows", () => {
  test("use the reference workflow names", () => {
    for (const [name, displayName] of Object.entries(workflowDisplayNames)) {
      expect(workflows[name as WorkflowName].name).toBe(displayName);
    }
  });

  test("deploys only docs with no matrix or project lookup", () => {
    expect(Object.keys(deploy.jobs)).toEqual(["preview", "production"]);
    expect(Object.keys(cleanupWorkflow.jobs)).toEqual(["cleanup", "sweep"]);
    for (const workflow of [deploy, cleanupWorkflow]) {
      expect(workflow.env.VERCEL_PROJECT_NAME).toBeUndefined();
      expect(workflow.env.VERCEL_PROJECT_ID).toBe(
        "${{ vars.VERCEL_DOCS_PROJECT_ID }}",
      );
      expect(workflow.env.VERCEL_PROJECTS).toBeUndefined();
      for (const job of Object.values(workflow.jobs) as any[]) {
        expect(job.strategy).toBeUndefined();
        expect(
          job.steps.some(
            (step: any) => step.name === "Resolve the Vercel project ID",
          ),
        ).toBe(false);
      }
    }
  });

  test("runs preview jobs for pull requests and production for master", () => {
    expect(deploy.on.pull_request.branches).toEqual(["master"]);
    expect(deploy.on.push.branches).toEqual(["master"]);
    expect(preview.if).toContain("github.event_name == 'pull_request'");
    expect(preview.if).toContain(
      "github.event.pull_request.head.repo.full_name == github.repository",
    );
    expect(production.if).toContain("github.event_name != 'pull_request'");
    expect(production.if).toContain("github.ref == 'refs/heads/master'");
    expect(deploy.permissions).toEqual({ contents: "read" });
    expect(preview.permissions).toEqual({
      contents: "read",
      "pull-requests": "write",
    });
  });

  test("names the deployment jobs plainly", () => {
    expect(preview.name).toBe("Deploy preview");
    expect(production.name).toBe("Deploy production");
    for (const job of [preview, production, cleanup, sweep]) {
      expect(job.name).not.toContain("${{");
    }
  });

  test("builds and deploys each target with one script call", () => {
    expect(step(preview, "Build preview").run).toBe("vercel build");
    expect(step(preview, "Deploy preview").run).toBe(
      "bun tools/vercel/deploy.ts preview",
    );
    expect(step(production, "Build production").run).toBe(
      "vercel build --prod",
    );
    expect(step(production, "Deploy production").run).toBe(
      "bun tools/vercel/deploy.ts production",
    );
    for (const job of [preview, production]) {
      expect(
        step(job, "Check the Vercel project root is repository root").run,
      ).toBe("bun tools/vercel/check-project.ts");
    }
    expect(preview.env.DEPLOY_ENV).toBe("staging");
    expect(production.env.DEPLOY_ENV).toBe("production");
    expect(deploy.env.VERCEL_ORG_ID).toBe("${{ secrets.VERCEL_ORG_ID }}");
    expect(deploy.env.VERCEL_TOKEN).toBe("${{ secrets.VERCEL_TOKEN }}");
    expect(deploy.env.VERCEL_TEAM_SLUG).toBe("metaboat");
  });

  test("runs tooling tests in CI rather than the deployment jobs", () => {
    expect(
      testWorkflow.jobs["test-build"].steps.some(
        (entry: any) => entry.run === "bun run test-vercel",
      ),
    ).toBe(true);
    for (const job of [preview, production]) {
      expect(
        job.steps.some((entry: any) => entry.run === "bun run test-vercel"),
      ).toBe(false);
    }
  });

  test("reports the preview in the same job, including after build failure", () => {
    const start = step(preview, "Post the preview comment");
    const finish = step(preview, "Update the preview comment");
    expect(start.run).toBe("bun tools/vercel/preview-comment.ts start");
    expect(start.id).toBe("preview-comment");
    expect(finish.run).toBe("bun tools/vercel/preview-comment.ts finish");
    expect(finish.if).toContain("always()");
    expect(finish.if).toContain("steps.preview-comment.outcome == 'success'");
    expect(preview.steps.indexOf(start)).toBeLessThan(
      preview.steps.indexOf(step(preview, "Build preview")),
    );
    expect(preview.steps.at(-1)).toBe(finish);
    for (const step of production.steps) {
      expect(String(step.run ?? "")).not.toContain("comment");
    }
  });

  test("serializes deployment and cleanup for the same PR and project", () => {
    expect(cleanup.concurrency.group).toBe(preview.concurrency.group);
    expect(preview.concurrency["cancel-in-progress"]).toBe(true);
    expect(cleanup.concurrency["cancel-in-progress"]).toBe(false);
    expect(production.concurrency["cancel-in-progress"]).toBe(false);
    expect(cleanupWorkflow.on.pull_request_target.types).toEqual(["closed"]);
    expect(cleanup.if).toContain("github.event_name == 'pull_request_target'");
    expect(cleanup.if).toContain(
      "github.event.pull_request.head.repo.full_name == github.repository",
    );
    expect(step(cleanup, "Check out trusted cleanup code").with.ref).toBe(
      "${{ github.event.repository.default_branch }}",
    );
    expect(cleanup.steps.at(-1).run).toBe(
      "bun tools/vercel/previews.ts cleanup",
    );
  });

  test("sweeps stale previews on a schedule from the default branch", () => {
    expect(cleanupWorkflow.on.schedule).toEqual([{ cron: "0 7 * * *" }]);
    expect(cleanupWorkflow.on.workflow_dispatch).toBeDefined();
    expect(sweep.if).toContain("github.event_name != 'pull_request_target'");
    expect(sweep.env.MAX_AGE_DAYS).toBe("14");
    expect(sweep.steps[0].with.ref).toBe(
      "${{ github.event.repository.default_branch }}",
    );
    expect(sweep.steps.at(-1).run).toBe("bun tools/vercel/previews.ts sweep");
    expect(sweep.permissions).toEqual({
      contents: "read",
      "pull-requests": "read",
    });
  });

  test("deploys from a shallow checkout with commit metadata from the event", () => {
    for (const job of [preview, production]) {
      const checkout = job.steps.find((step: any) =>
        String(step.uses ?? "").startsWith("actions/checkout@"),
      );
      expect(checkout.with["fetch-depth"]).toBeUndefined();
      expect(job.env.COMMIT_MESSAGE).toBeDefined();
      expect(job.env.COMMIT_AUTHOR).toBeDefined();
    }
  });

  test("installs the workspace before running any tooling script", () => {
    for (const workflow of Object.values(workflows)) {
      for (const job of Object.values(workflow.jobs) as any[]) {
        const names = job.steps.map((step: any) => step.name);
        const firstScript = names.findIndex((_name: string, index: number) =>
          String(job.steps[index].run ?? "").startsWith("bun tools/"),
        );
        if (firstScript === -1) continue;
        expect(names.indexOf("Install workspace packages")).toBeGreaterThan(-1);
        expect(names.indexOf("Install workspace packages")).toBeLessThan(
          firstScript,
        );
      }
    }
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
