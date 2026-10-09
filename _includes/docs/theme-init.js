// Inlined into <head> by head.html before any stylesheet loads, so the theme
// attribute is present at first paint (no flash of the wrong theme).
// data-theme-preference holds the visitor's choice from the theme options in
// DocsMoreMenu.astro: system (the default, nothing stored), light or dark.
// data-theme holds the theme in use; on system it follows the system theme,
// live. Rendered through Liquid, so keep it free of Liquid tag syntax.
(() => {
  const KEY = "mb-docs-theme";
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const stored = () => {
    try {
      const theme = localStorage.getItem(KEY);
      return theme === "light" || theme === "dark" ? theme : null;
    } catch {
      return null; /* storage blocked (private mode, disabled cookies) */
    }
  };
  const apply = () => {
    const preference = root.dataset.themePreference;
    root.dataset.theme =
      preference === "light" || preference === "dark"
        ? preference
        : systemDark.matches
          ? "dark"
          : "light";
  };

  // For the theme options in DocsMoreMenu.astro.
  window.setDocsTheme = (preference) => {
    root.dataset.themePreference = preference;
    apply();
    try {
      if (preference === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, preference);
    } catch {
      /* storage blocked; the choice lasts for this page only */
    }
  };

  root.dataset.themePreference = stored() ?? "system";
  apply();
  systemDark.addEventListener("change", apply);
})();
