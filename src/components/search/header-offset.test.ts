// @vitest-environment happy-dom
import { beforeEach, describe, expect, test } from "vitest";
import { GAP, MODAL_TOP, modalTop, publishHeaderOffset } from "./header-offset";

const HEADER_HEIGHT = 82;
const BANNER_HEIGHT = 48;

const build = (bannerHeight = 0): Document => {
  document.documentElement.innerHTML =
    '<body><header class="bootstrap"><div class="navigation-header"></div></header></body>';

  const header = document.querySelector("header.bootstrap") as HTMLElement;
  header.getBoundingClientRect = () =>
    ({ bottom: HEADER_HEIGHT + bannerHeight }) as DOMRect;

  return document;
};

beforeEach(() => {
  document.documentElement.style.removeProperty(MODAL_TOP);
});

describe("modalTop", () => {
  test.each([
    [82, "106px"],
    [130, "154px"],
    [90, "114px"],
    [0, "24px"],
  ])("%ipx header becomes %s", (height, expected) => {
    expect(modalTop(height)).toBe(expected);
  });

  test("rounds subpixel heights", () => {
    expect(modalTop(81.6)).toBe(`${82 + GAP}px`);
  });

  test("never returns a negative offset", () => {
    expect(modalTop(-40)).toBe(`${GAP}px`);
  });
});

describe("publishHeaderOffset", () => {
  test("clears the header, not the declared variable", () => {
    const doc = build();

    expect(publishHeaderOffset(doc)).toBe("106px");
    expect(doc.documentElement.style.getPropertyValue(MODAL_TOP)).toBe("106px");
  });

  test("tracks the promo banner, which the header height does not include", () => {
    expect(publishHeaderOffset(build(BANNER_HEIGHT))).toBe("154px");
  });

  test("follows the banner being dismissed mid-session", () => {
    const doc = build(BANNER_HEIGHT);
    publishHeaderOffset(doc);

    const header = doc.querySelector("header.bootstrap") as HTMLElement;
    header.getBoundingClientRect = () => ({ bottom: HEADER_HEIGHT }) as DOMRect;

    expect(publishHeaderOffset(doc)).toBe("106px");
  });

  test("leaves the CSS fallback alone when there is no header", () => {
    document.documentElement.innerHTML = "<body></body>";

    expect(publishHeaderOffset(document)).toBeNull();
    expect(document.documentElement.style.getPropertyValue(MODAL_TOP)).toBe("");
  });

  test("never redefines --navigation-header-height", () => {
    const doc = build();
    publishHeaderOffset(doc);

    expect(
      doc.documentElement.style.getPropertyValue("--navigation-header-height"),
    ).toBe("");
  });
});
