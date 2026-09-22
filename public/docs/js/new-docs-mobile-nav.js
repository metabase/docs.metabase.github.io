// At 992px and below docs-local.css turns the left sidebar (#main-navigation-content)
// into a drawer under the header. This opens and closes it from the header's
// menu button, mirroring the state on <html data-docs-nav="open"> for the CSS
// and on the button's aria-expanded for assistive tech.
(() => {
  const root = document.documentElement;

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("[data-docs-nav-toggle]");
    const nav = document.getElementById("main-navigation-content");
    const backdrop = document.querySelector("[data-docs-nav-close]");
    // Made inert while the drawer is open so Tab and screen readers stay in
    // the header and the drawer instead of reaching the page behind the
    // backdrop.
    const article = document.querySelector(".learn__post");
    if (!toggle || !nav) return; // pages without a sidebar (404)

    const isOpen = () => root.dataset.docsNav === "open";

    const setOpen = (open) => {
      if (open) {
        root.dataset.docsNav = "open";
      } else {
        delete root.dataset.docsNav;
      }
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      if (article) article.inert = open;

      if (!open) return;

      // Bring the current page into view inside the drawer. The drawer is
      // positioned, so it is the link's offsetParent. Only the page list
      // (the direct ul): the sections list above it marks its active
      // section .selected too.
      const current = nav.querySelector(":scope > ul a.selected");
      if (current) {
        nav.scrollTop = Math.max(
          0,
          current.offsetTop - nav.clientHeight / 2 + current.offsetHeight / 2,
        );
      }
      nav.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => setOpen(!isOpen()));

    if (backdrop) {
      backdrop.addEventListener("click", () => setOpen(false));
    }

    // Close on Escape and hand focus back to the button.
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape" || !isOpen()) return;
      setOpen(false);
      toggle.focus();
    });

    // The drawer only exists below 993px; drop the open state (and its body
    // scroll lock) when the viewport grows past it.
    matchMedia("(min-width: 993px)").addEventListener("change", (event) => {
      if (event.matches && isOpen()) setOpen(false);
    });

    // A back/forward cache restore keeps the DOM as it was; start closed.
    window.addEventListener("pageshow", (event) => {
      if (event.persisted && isOpen()) setOpen(false);
    });
  });
})();
