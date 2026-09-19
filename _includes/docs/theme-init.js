// Inlined into <head> by head.html before any stylesheet loads, so the theme
// attribute is present at first paint (no flash of the wrong theme). Keep this
// ES5 and free of Liquid tag syntax: it is rendered through Liquid.
(function () {
  var KEY = "mb-docs-theme";
  var theme = null;
  try {
    theme = window.localStorage.getItem(KEY);
  } catch (e) {
    /* storage blocked (private mode, disabled cookies) */
  }
  if (theme !== "light" && theme !== "dark") {
    theme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
})();
