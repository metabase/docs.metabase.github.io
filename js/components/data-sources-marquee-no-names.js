function dataSourcesMarqueeNoNames() {
  const marquee = document.querySelector(".data-sources-marquee-no-names");

  if (!marquee) return;

  const container = marquee.closest(".data-sources-marquee-container");

  const links = marquee.querySelectorAll("a");

  links.forEach((link) => {
    const divToPlaceLabel = container.querySelector("div:nth-of-type(3)");

    link.addEventListener("mouseenter", () => {
      divToPlaceLabel.textContent = link.getAttribute("data-name");
      divToPlaceLabel.classList.add("show");
    });

    link.addEventListener("mouseleave", () => {
      divToPlaceLabel.classList.remove("show");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  dataSourcesMarqueeNoNames();
});
