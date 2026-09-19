// Light/dark theme toggle for the docs header. theme-init.js (inlined in
// <head>) has already set data-theme on <html> from localStorage or the OS
// preference; this script flips it, persists the choice, keeps the toggle
// button's ARIA state in sync, and tells other scripts via a "themechange"
// event on document.
(function () {
  var KEY = "mb-docs-theme";
  var root = document.documentElement;
  var media = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  function getTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function hasStoredPreference() {
    try {
      var stored = window.localStorage.getItem(KEY);
      return stored === "light" || stored === "dark";
    } catch (e) {
      return false;
    }
  }

  function syncButtons(theme) {
    var label =
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
    });
  }

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try {
        window.localStorage.setItem(KEY, theme);
      } catch (e) {
        /* storage blocked; the choice lasts for this page only */
      }
    }
    syncButtons(theme);
    document.dispatchEvent(
      new CustomEvent("themechange", { detail: { theme: theme } }),
    );
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncButtons(getTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        applyTheme(getTheme() === "dark" ? "light" : "dark", true);
      });
    });
  });

  // Follow the OS while the visitor has not chosen explicitly.
  if (media) {
    var onChange = function (event) {
      if (!hasStoredPreference()) {
        applyTheme(event.matches ? "dark" : "light", false);
      }
    };
    if (media.addEventListener) {
      media.addEventListener("change", onChange);
    } else if (media.addListener) {
      media.addListener(onChange);
    }
  }
})();
