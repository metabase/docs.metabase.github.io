import { describe, expect, test } from "vitest";
import { toShortVersion } from "./versionSupport";

describe("toShortVersion", () => {
  test("drops the leading 0. from a major version", () => {
    expect(toShortVersion("v0.64")).toBe("v64");
    expect(toShortVersion("v0.9")).toBe("v9");
  });

  test("keeps names without a major as is", () => {
    expect(toShortVersion("latest")).toBe("latest");
    expect(toShortVersion("master")).toBe("master");
  });
});
