function startupGuideScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (scrollIndicator) {
    const scrollPercentage =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);

    scrollIndicator.style.width = `${scrollPercentage * 100}%`;
  }
}

window.addEventListener("DOMContentLoaded", startupGuideScrollIndicator);

window.addEventListener("scroll", startupGuideScrollIndicator);
