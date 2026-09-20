// theme-init.js (inlined in <head>) has already set data-theme on <html>
// before first paint. This flips it, persists the choice, and announces the
// change to other scripts via a "themechange" event on document.
(() => {
  const KEY = "mb-docs-theme";
  const root = document.documentElement;

  const getTheme = () => (root.dataset.theme === "dark" ? "dark" : "light");

  const hasStoredPreference = () => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored === "light" || stored === "dark";
    } catch {
      return false;
    }
  };

  const syncButtons = (theme) => {
    const label =
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  };

  const applyTheme = (theme, persist) => {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem(KEY, theme);
      } catch {
        /* storage blocked; the choice lasts for this page only */
      }
    }
    syncButtons(theme);
    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  };

  document.addEventListener("DOMContentLoaded", () => {
    syncButtons(getTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        applyTheme(getTheme() === "dark" ? "light" : "dark", true);
      });
    });
  });

  // Follow the OS while the visitor has not chosen explicitly.
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!hasStoredPreference()) applyTheme(e.matches ? "dark" : "light", false);
  });
})();
