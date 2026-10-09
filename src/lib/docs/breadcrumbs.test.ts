import { describe, expect, test } from "vitest";
import { getDocBreadcrumbs } from "./breadcrumbs";
import type { Nav } from "./nav";

describe("getDocBreadcrumbs", () => {
  const page = { show_category_breadcrumb: true };
  const empty: Nav = { categories: [] };

  test("links the category to its nav section", () => {
    const nav: Nav = {
      categories: [
        {
          name: "Data",
          pages: [
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
    expect(
      getDocBreadcrumbs(
        {
          ...page,
          url: "/docs/latest/data-studio/library",
          category: "Data Studio",
        },
        nav,
      ),
    ).toEqual([
      { name: "Home", url: "/docs/latest/" },
      { name: "Data Studio", url: "/docs/latest/data-studio/overview" },
    ]);
  });

  test("falls back to the directory's start page", () => {
    expect(
      getDocBreadcrumbs(
        {
          ...page,
          url: "/docs/latest/questions/alerts",
          category: "Questions",
        },
        empty,
      ),
    ).toEqual([
      { name: "Home", url: "/docs/latest/" },
      { name: "Questions", url: "/docs/latest/questions/start" },
    ]);
  });

  test("keeps the page's version", () => {
    expect(
      getDocBreadcrumbs(
        {
          ...page,
          url: "/docs/v0.62/configuring-metabase/fonts",
          category: "Configuring metabase",
        },
        empty,
      ),
    ).toEqual([
      { name: "Home", url: "/docs/v0.62/" },
      {
        name: "Configuring metabase",
        url: "/docs/v0.62/configuring-metabase/start",
      },
    ]);
  });

  test.each([
    ["troubleshooting-guide", "/docs/latest/troubleshooting-guide/"],
    ["api", "/docs/latest/api-documentation"],
  ])("knows the %s landing page", (dir, url) => {
    expect(
      getDocBreadcrumbs(
        { ...page, url: `/docs/latest/${dir}/y`, category: "Category" },
        empty,
      )[1],
    ).toEqual({ name: "Category", url });
  });

  test("is only home when the category crumb is off", () => {
    expect(
      getDocBreadcrumbs(
        {
          url: "/docs/latest/introduction",
          category: "Table of Contents",
          show_category_breadcrumb: false,
        },
        empty,
      ),
    ).toEqual([{ name: "Home", url: "/docs/latest/" }]);
  });
});
