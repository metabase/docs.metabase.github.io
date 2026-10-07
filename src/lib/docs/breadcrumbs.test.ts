import { describe, expect, test } from "vitest";
import { getDocBreadcrumbs } from "./breadcrumbs";

describe("getDocBreadcrumbs", () => {
  const page = { show_category_breadcrumb: true, title: "Alerts" };

  test("links the category to its start page", () => {
    expect(
      getDocBreadcrumbs({
        ...page,
        url: "/docs/latest/questions/alerts",
        category: "Questions",
      }),
    ).toEqual([
      { name: "Home", url: "/docs/latest/" },
      { name: "Questions", url: "/docs/latest/questions/start" },
    ]);
  });

  test("keeps the page's version", () => {
    expect(
      getDocBreadcrumbs({
        ...page,
        url: "/docs/v0.62/configuring-metabase/fonts",
        category: "Configuring metabase",
      }),
    ).toEqual([
      { name: "Home", url: "/docs/v0.62/" },
      {
        name: "Configuring metabase",
        url: "/docs/v0.62/configuring-metabase/start",
      },
    ]);
  });

  test.each([
    ["Troubleshooting guide", "/docs/latest/troubleshooting-guide/"],
    ["Api", "/docs/latest/api-documentation"],
  ])("knows the %s landing page", (category, url) => {
    expect(
      getDocBreadcrumbs({ ...page, url: "/docs/latest/x/y", category })[1],
    ).toEqual({ name: category, url });
  });

  test("names a README's category without linking it", () => {
    expect(
      getDocBreadcrumbs({
        ...page,
        title: "README",
        url: "/docs/latest/questions/",
        category: "Questions",
      }),
    ).toEqual([{ name: "Home", url: "/docs/latest/" }, { name: "Questions" }]);
  });

  test("is only home when the category crumb is off", () => {
    expect(
      getDocBreadcrumbs({
        url: "/docs/latest/introduction",
        title: "Introduction",
        category: "Table of Contents",
        show_category_breadcrumb: false,
      }),
    ).toEqual([{ name: "Home", url: "/docs/latest/" }]);
  });
});
