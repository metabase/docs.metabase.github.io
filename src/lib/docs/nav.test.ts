import { describe, expect, test } from "vitest";
import {
  getActiveCategory,
  getCategoryByDirectory,
  getCategoryUrl,
  getLandingUrl,
  getPrevNext,
  getSections,
  type Nav,
} from "./nav";

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

  test("falls back to the category listing the page's neighbors", () => {
    expect(
      getActiveCategory(nav, "/docs/latest/questions/unlisted")?.name,
    ).toBe("Analytics");
  });

  test("is undefined for the docs home and pages outside a version", () => {
    expect(getActiveCategory(nav, "/docs/latest/")).toBeUndefined();
    expect(getActiveCategory(nav, "/docs/all")).toBeUndefined();
  });
});

describe("getCategoryByDirectory", () => {
  const nav: Nav = {
    categories: [
      {
        name: "Analytics",
        pages: [
          { name: "Questions", url: "/docs/latest/questions/start" },
          { name: "Basics", url: "/docs/latest/troubleshooting-guide/basics" },
        ],
      },
      {
        name: "Administration",
        pages: [
          { name: "Guide", url: "/docs/latest/troubleshooting-guide/" },
          {
            name: "Sync",
            url: "/docs/latest/troubleshooting-guide/sync#schedules",
          },
        ],
      },
      {
        name: "Embedding",
        pages: [{ name: "Learn", url: "/learn/embedding" }],
      },
    ],
  };

  test("picks the category listing the most pages from the directory", () => {
    expect(
      getCategoryByDirectory(nav, "/docs/latest/troubleshooting-guide/ldap")
        ?.name,
    ).toBe("Administration");
  });

  test("walks up to the nearest directory with listed pages", () => {
    expect(
      getCategoryByDirectory(
        nav,
        "/docs/latest/questions/query-builder/expressions/case",
      )?.name,
    ).toBe("Analytics");
  });

  test("breaks ties in nav order", () => {
    const tied: Nav = {
      categories: [
        { name: "First", pages: [{ name: "A", url: "/docs/latest/x/a" }] },
        { name: "Second", pages: [{ name: "B", url: "/docs/latest/x/b" }] },
      ],
    };
    expect(getCategoryByDirectory(tied, "/docs/latest/x/c")?.name).toBe(
      "First",
    );
  });

  test("stops at the version root", () => {
    expect(
      getCategoryByDirectory(nav, "/docs/latest/CONTRIBUTING"),
    ).toBeUndefined();
    expect(getCategoryByDirectory(nav, "/docs/latest/")).toBeUndefined();
    expect(getCategoryByDirectory(nav, "/docs/all")).toBeUndefined();
  });
});

describe("getPrevNext", () => {
  const category = {
    name: "Analytics",
    pages: [
      {
        name: "Questions",
        url: "/docs/latest/questions/start",
        pages: [
          { name: "Alerts", url: "/docs/latest/questions/alerts" },
          { name: "Alerts setup", url: "/docs/latest/questions/alerts#setup" },
          { name: "Tutorial", url: "/learn/questions" },
        ],
      },
      {
        name: "Group",
        pages: [
          { name: "Charts", url: "/docs/latest/questions/charts" },
          { name: "Alerts again", url: "/docs/latest/questions/alerts" },
        ],
      },
      { name: "Models", url: "/docs/latest/data-modeling/models" },
    ],
  };

  test("follows the nav depth first, skipping non-pages and repeats", () => {
    expect(getPrevNext(category, "/docs/latest/questions/alerts")).toEqual({
      prev: { name: "Questions", url: "/docs/latest/questions/start" },
      next: { name: "Charts", url: "/docs/latest/questions/charts" },
    });
    expect(getPrevNext(category, "/docs/latest/questions/charts")).toEqual({
      prev: { name: "Alerts", url: "/docs/latest/questions/alerts" },
      next: { name: "Models", url: "/docs/latest/data-modeling/models" },
    });
  });

  test("has no prev on the first page and no next on the last", () => {
    expect(getPrevNext(category, "/docs/latest/questions/start").prev).toBe(
      undefined,
    );
    expect(
      getPrevNext(category, "/docs/latest/data-modeling/models").next,
    ).toBe(undefined);
  });

  test("is empty for pages the category doesn't list", () => {
    expect(getPrevNext(category, "/docs/latest/questions/unlisted")).toEqual(
      {},
    );
    expect(getPrevNext(undefined, "/docs/latest/questions/alerts")).toEqual({});
  });
});

describe("getSections", () => {
  test("skips categories with no linked pages and marks the active one", () => {
    const nav: Nav = {
      categories: [
        {
          name: "Analytics",
          pages: [{ name: "Questions", url: "/docs/latest/questions/start" }],
        },
        { name: "Empty", pages: [{ name: "Group" }] },
      ],
    };

    expect(getSections(nav, "/docs/latest/questions/start")).toEqual([
      {
        name: "Analytics",
        href: "/docs/latest/questions/start",
        active: true,
      },
    ]);
  });
});

describe("getCategoryUrl", () => {
  const nav: Nav = {
    categories: [
      {
        name: "Data",
        url: "/docs/latest/data",
        pages: [
          { name: "Tables", url: "/docs/latest/data/tables" },
          {
            name: "Data studio",
            url: "/docs/latest/data-studio/overview",
            pages: [
              { name: "Library", url: "/docs/latest/data-studio/library" },
            ],
          },
        ],
      },
    ],
  };

  test("finds the section by name, ignoring case", () => {
    expect(getCategoryUrl(nav, "Data Studio")).toBe(
      "/docs/latest/data-studio/overview",
    );
  });

  test("only matches sections: second-level nodes with pages", () => {
    expect(getCategoryUrl(nav, "Data")).toBeUndefined();
    expect(getCategoryUrl(nav, "Tables")).toBeUndefined();
  });
});
