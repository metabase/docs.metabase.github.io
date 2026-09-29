import TopBar from "@/components/chrome/TopBar.astro";
import { TOP_BAR_ID } from "@/constants";
import { renderToDocument } from "@/test/render-astro";
import { Window } from "happy-dom";
import { describe, expect, test } from "vitest";
import { MODAL_STYLE, MODAL_TOP_VAR, positionModal } from "./position-modal";

const docWithTopBarAt = (top: number | null) => {
  const doc = new Window().document as unknown as Document;
  if (top !== null) {
    const bar = doc.createElement("div");
    bar.id = TOP_BAR_ID;
    bar.getBoundingClientRect = () => ({ top }) as DOMRect;
    doc.body.append(bar);
  }
  return doc;
};

const modalTop = (doc: Document) =>
  doc.body.style.getPropertyValue(MODAL_TOP_VAR);

describe("positionModal", () => {
  test("aligns the modal with the top bar", () => {
    const doc = docWithTopBarAt(82);
    positionModal(TOP_BAR_ID, doc);
    expect(modalTop(doc)).toBe("82px");
  });

  test("pins to the viewport once the top bar scrolls away", () => {
    const doc = docWithTopBarAt(-500);
    positionModal(TOP_BAR_ID, doc);
    expect(modalTop(doc)).toBe("0px");
  });

  test("falls back to the viewport top without a top bar", () => {
    const doc = docWithTopBarAt(null);
    positionModal(TOP_BAR_ID, doc);
    expect(modalTop(doc)).toBe("0px");
  });

  test("the injected style reads the same variable", () => {
    expect(MODAL_STYLE).toContain(`var(${MODAL_TOP_VAR}`);
  });
});

test("the docs top bar wraps the search in the shared id", async () => {
  const { doc } = await renderToDocument(TopBar, {
    page: { title: "x", url: "/docs/latest/", version: "latest" },
    showBreadcrumb: false,
  });
  const search = doc.querySelector<HTMLElement>(`#${TOP_BAR_ID} #inkeep`);
  expect(search).not.toBeNull();
  expect(search?.dataset.topBarId).toBe(TOP_BAR_ID);
});
