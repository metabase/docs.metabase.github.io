document.addEventListener("DOMContentLoaded", () => {
  const $cloudHeroToggleCheckbox = document.getElementById(
    "cloudHeroToggleCheckbox",
  );
  const $cloudHeroToggleList = document.getElementById("cloudHeroToggleList");

  function onChange(e) {
    clearTimeout(initTimeout);

    if (e.target.checked) {
      $cloudHeroToggleList.classList.remove("animate");
    } else {
      $cloudHeroToggleList.classList.add("animate");
    }
  }

  // init
  $cloudHeroToggleCheckbox.addEventListener("change", onChange);
  const initTimeout = setTimeout(() => {
    $cloudHeroToggleList.classList.add("animate-1");
    $cloudHeroToggleList.classList.add("animate");
  }, 500);
});
