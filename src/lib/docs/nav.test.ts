import { describe, expect, test } from "vitest";
import { getActiveCategory, getLandingUrl, type Nav } from "./nav";

describe("getLandingUrl", () => {
  test("uses the category's own url", () => {
    expect(
      getLandingUrl({
        name: "Analytics",
        url: "/docs/latest/analytics",
        pages: [{ name: "Questions", url: "/docs/latest/questions/start" }],
      }),
    ).toBe("/docs/latest/analytics");
  });

  test("prefers a docs section with sub-pages", () => {
    expect(
      getLandingUrl({
        name: "Analytics",
        pages: [
          { name: "Tutorials", url: "/learn/metabase-basics" },
          { name: "API", url: "/docs/latest/api" },
          {
            name: "Questions",
            url: "/docs/latest/questions/start",
            pages: [{ name: "Alerts", url: "/docs/latest/questions/alerts" }],
          },
        ],
      }),
    ).toBe("/docs/latest/questions/start");
  });

  test("falls back to any docs url, then to any url", () => {
    expect(
      getLandingUrl({
        name: "Analytics",
        pages: [
          { name: "Tutorials", url: "/learn/metabase-basics" },
          { name: "API", url: "/docs/latest/api" },
        ],
      }),
    ).toBe("/docs/latest/api");

    expect(
      getLandingUrl({
        name: "Analytics",
        pages: [{ name: "Tutorials", url: "/learn/metabase-basics" }],
      }),
    ).toBe("/learn/metabase-basics");
  });

  test("finds urls below unlinked groups", () => {
    expect(
      getLandingUrl({
        name: "Analytics",
        pages: [
          {
            name: "Group",
            pages: [{ name: "Alerts", url: "/docs/latest/questions/alerts" }],
          },
        ],
      }),
    ).toBe("/docs/latest/questions/alerts");
  });

  test("is undefined when nothing is linked", () => {
    expect(getLandingUrl({ name: "Empty" })).toBeUndefined();
    expect(
      getLandingUrl({ name: "Empty", pages: [{ name: "Group" }] }),
    ).toBeUndefined();
  });
});

describe("getActiveCategory", () => {
  const nav: Nav = {
    categories: [
      {
        name: "Analytics",
        pages: [
          {
            name: "Questions",
            url: "/docs/latest/questions/start",
            pages: [{ name: "Alerts", url: "/docs/latest/questions/alerts" }],
          },
        ],
      },
      {
        name: "Embedding",
        pages: [{ name: "Overview", url: "/docs/latest/embedding/start" }],
      },
    ],
  };

  test("finds the category containing the page, at any depth", () => {
    expect(getActiveCategory(nav, "/docs/latest/questions/alerts")?.name).toBe(
      "Analytics",
    );
    expect(getActiveCategory(nav, "/docs/latest/embedding/start")?.name).toBe(
      "Embedding",
    );
  });

  test("is undefined for pages outside the nav", () => {
    expect(getActiveCategory(nav, "/docs/latest/")).toBeUndefined();
  });
});
