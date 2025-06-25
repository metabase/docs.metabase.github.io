document.addEventListener("DOMContentLoaded", function() {
  // const closeFormButton = document.getElementById("close-form-button");

  // TODO: Unify selectors below at HTML level, for JS and CSS reason
  const ctaWrapper =
    document.getElementById("right-hand-newsletter-subscribe-form-container") ||
    document.querySelector(".right-hand-newsletter-subscribe-form-container");
  const contentContainer =
    document.querySelector(".content-container") ||
    document.querySelector(".learn__post__content");

  const isLearn = contentContainer.classList.contains("learn__post__content");

  const [scrollStart, scrollEnd] = isLearn ? [-800, 500] : [600, 200];

  /*
  const isBlogPostNewsLetterClosed = localStorage.getItem(
    "isBlogPostNewsLetterClosed",
  );
  if (isBlogPostNewsLetterClosed === "true") {
    ctaWrapper.classList.add("d-none");
  }

  closeFormButton.addEventListener("click", function() {
    ctaWrapper.classList.add("d-none");

    localStorage.setItem("isBlogPostNewsLetterClosed", "true");
  });
  */

  window.addEventListener("scroll", function() {
    if (!ctaWrapper || !contentContainer) {
      return;
    }

    const rect = contentContainer.getBoundingClientRect();

    const top = rect.top;
    const bottom = document.documentElement.clientHeight - rect.bottom;

    if (top <= scrollStart && bottom <= -scrollEnd) {
      ctaWrapper.classList.add("newsletter-enter");
      ctaWrapper.parentElement.classList.add("newsletter-enter");
    } else {
      ctaWrapper.classList.remove("newsletter-enter");
      ctaWrapper.parentElement.classList.remove("newsletter-enter");
    }
  });
});
