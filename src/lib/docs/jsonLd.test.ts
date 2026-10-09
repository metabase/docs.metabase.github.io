import { describe, expect, test } from "vitest";
import type { Crumb } from "./breadcrumbs";
import { buildDocJsonLd } from "./jsonLd";

const site = new URL("https://www.metabase.com");
const docUrls = new Set([
  "/docs/latest/",
  "/docs/latest/questions/start",
  "/docs/latest/questions/alerts",
]);
const home = { name: "Home", url: "/docs/latest/" };
const questions = { name: "Questions", url: "/docs/latest/questions/start" };

const build = (
  page: Parameters<typeof buildDocJsonLd>[0]["page"],
  breadcrumbs: Crumb[] = [home, questions],
) => JSON.parse(buildDocJsonLd({ site, page, breadcrumbs, docUrls }));

describe("buildDocJsonLd", () => {
  test("describes the page as a versioned TechArticle", () => {
    const [article] = build({
      title: "Alerts",
      url: "/docs/latest/questions/alerts",
      version: "v0.63",
      meta_description: "Get notified.",
    })["@graph"];

    expect(article).toMatchObject({
      "@type": "TechArticle",
      headline: "Alerts",
      description: "Get notified.",
      url: "https://www.metabase.com/docs/latest/questions/alerts",
      version: "63",
    });
  });

  test("ends the breadcrumb trail with the page", () => {
    const [, breadcrumbs] = build({
      title: "Alerts",
      url: "/docs/latest/questions/alerts",
    })["@graph"];

    expect(breadcrumbs.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.metabase.com/docs/latest/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Questions",
        item: "https://www.metabase.com/docs/latest/questions/start",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Alerts",
        item: "https://www.metabase.com/docs/latest/questions/alerts",
      },
    ]);
  });

  test("drops crumbs without a page and doesn't repeat the landing page", () => {
    const missing = { name: "FAQ", url: "/docs/latest/faq/start" };
    const unlinked = { name: "Questions" };

    expect(
      build({ title: "Alerts", url: "/docs/latest/questions/alerts" }, [
        home,
        missing,
      ])["@graph"][1].itemListElement.map(({ name }: { name: string }) => name),
    ).toEqual(["Home", "Alerts"]);
    expect(
      build({ title: "Questions", url: "/docs/latest/questions/start" }, [
        home,
        questions,
      ])["@graph"][1].itemListElement.map(({ name }: { name: string }) => name),
    ).toEqual(["Home", "Questions"]);
    expect(
      build({ title: "Overview", url: "/docs/latest/questions/" }, [
        home,
        unlinked,
      ])["@graph"][1].itemListElement.map(({ name }: { name: string }) => name),
    ).toEqual(["Home", "Overview"]);
  });

  test("can't close the script element it sits in", () => {
    const json = buildDocJsonLd({
      site,
      page: { title: "</script><b>", url: "/docs/latest/x" },
      breadcrumbs: [],
      docUrls,
    });
    expect(json).not.toContain("<");
    expect(JSON.parse(json)["@graph"][0].headline).toBe("</script><b>");
  });
});
