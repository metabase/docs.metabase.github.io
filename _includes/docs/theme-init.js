// Inlined into <head> by head.html before any stylesheet loads, so the theme
// attribute is present at first paint (no flash of the wrong theme). Until the
// visitor picks a theme with the toggle in DocsMoreMenu.astro, which stores it
// under the same key, the page follows the system theme, live. Rendered
// through Liquid, so keep it free of Liquid tag syntax.
(() => {
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const stored = () => {
    try {
      const theme = localStorage.getItem("mb-docs-theme");
      return theme === "light" || theme === "dark" ? theme : null;
    } catch {
      return null; /* storage blocked (private mode, disabled cookies) */
    }
  };
  const system = () => (systemDark.matches ? "dark" : "light");

  root.dataset.theme = stored() ?? system();
  systemDark.addEventListener("change", () => {
    if (!stored()) root.dataset.theme = system();
  });
})();
