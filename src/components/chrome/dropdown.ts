// Open and close for the docs chrome dropdowns (DocsVersionSelector.astro,
// DocsMoreMenu.astro). Each marks its root `data-dropdown` and its trigger
// `data-dropdown-trigger`, and imports this module, which Astro bundles once.
// The trigger's aria-expanded is the open state; the components style off it
// (`aria-expanded:`, `group-aria-expanded:`, `peer-aria-expanded:`).
const initDropdown = (root: HTMLElement, trigger: HTMLElement) => {
  const isOpen = () => trigger.getAttribute("aria-expanded") === "true";

  const setOpen = (open: boolean) => {
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  };

  trigger.addEventListener("click", () => setOpen(!isOpen()));

  // Clicks inside the menu leave it open (the theme item), and a click on
  // another dropdown's trigger closes this one.
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target as Node)) setOpen(false);
  });

  // A null relatedTarget means focus went to the body (Safari does not
  // focus links on click); the document click handler covers that case.
  root.addEventListener("focusout", (event) => {
    const next = event.relatedTarget as Node | null;
    if (next && !root.contains(next)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    if (root.contains(document.activeElement)) trigger.focus();
  });
};

document.querySelectorAll<HTMLElement>("[data-dropdown]").forEach((root) => {
  const trigger = root.querySelector<HTMLElement>("[data-dropdown-trigger]");
  if (trigger) initDropdown(root, trigger);
});
