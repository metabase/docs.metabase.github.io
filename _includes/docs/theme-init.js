// Inlined into <head> by head.html before any stylesheet loads, so the theme
// attribute is present at first paint (no flash of the wrong theme). Rendered
// through Liquid, so keep it free of Liquid tag syntax.
(() => {
  let theme = null;
  try {
    // Same key as new-docs-theme-toggle.js.
    theme = localStorage.getItem("mb-docs-theme");
  } catch {
    /* storage blocked (private mode, disabled cookies) */
  }
  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
})();
