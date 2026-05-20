function initAWSRegions() {
  const dots = document.querySelectorAll(".aws-region-dot");

  [...dots].forEach((dot) => {
    const region = dot.getAttribute("data-region");

    dot.addEventListener("mouseover", () => {
      document
        .querySelector(`.aws-region-label[data-region=${region}]`)
        .classList.add("visible");
    });

    dot.addEventListener("mouseleave", () => {
      document
        .querySelector(`.aws-region-label[data-region=${region}]`)
        .classList.remove("visible");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initAWSRegions();
});
