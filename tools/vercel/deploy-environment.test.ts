import { describe, expect, test } from "bun:test";
import { resolveLiquidEnvironment } from "../../src/lib/liquid/liquidRenderer.ts";

describe("Vercel deployment environment", () => {
  test("uses DEPLOY_ENV for preview and production builds", () => {
    expect(
      resolveLiquidEnvironment({
        DEPLOY_ENV: "staging",
        NODE_ENV: "production",
      }),
    ).toBe("staging");
    expect(
      resolveLiquidEnvironment({
        DEPLOY_ENV: "production",
        NODE_ENV: "production",
      }),
    ).toBe("production");
  });

  test("falls back to NODE_ENV and then development", () => {
    expect(resolveLiquidEnvironment({ NODE_ENV: "test" })).toBe("test");
    expect(resolveLiquidEnvironment({})).toBe("development");
  });
});
