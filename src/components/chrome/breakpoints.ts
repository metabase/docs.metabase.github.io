// Below the theme's lg breakpoint the docs chrome switches to its mobile
// layout. docs.css emits the breakpoint on :root (`@theme static`), so
// scripts read it instead of repeating the value.
const lg = getComputedStyle(document.documentElement)
  .getPropertyValue("--tw-breakpoint-lg")
  .trim();

export const belowLg = matchMedia(`(width < ${lg})`);
