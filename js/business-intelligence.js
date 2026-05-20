function initBusinessIntelligenceScrollCarousel() {
  window.gsap.registerPlugin(window.ScrollTrigger);

  const spacer = document.querySelector(".desktop.spacer");
  const footer = document.querySelector(".try-metabase-footer");
  const steps = document.querySelectorAll(
    ".feature-container-carousel > div > div",
  );
  const carousel = steps[0].closest(".feature-container-carousel");
  const images = carousel.querySelectorAll(":scope > div:last-child > *");

  const callbacks = {
    onEnter: () => {
      spacer.classList.add("fixed");
      footer.classList.add("invisible");
    },
    onEnterBack: () => {
      spacer.classList.add("fixed");
      spacer.classList.remove("after-leave-back");
      footer.classList.add("invisible");
    },
    onLeave: () => {
      spacer.classList.remove("fixed");
      spacer.classList.add("after-leave-back");
      footer.classList.remove("invisible");
    },
    onLeaveBack: () => {
      spacer.classList.remove("fixed");
      footer.classList.remove("invisible");
    },
    onUpdate: (self) => {
      const progress = self.progress;
      const stepCount = steps.length;
      const rawIndex = progress * stepCount;
      const activeIndex =
        Math.floor(rawIndex) > stepCount - 1
          ? stepCount - 1
          : Math.floor(rawIndex);
      const sectionProgress = rawIndex - activeIndex;

      steps.forEach((step, i) => {
        const inner = step.querySelector(".inner");

        step.classList.toggle("expanded", i === activeIndex);
        images.forEach((image) => image.classList.remove("show"));
        images[activeIndex].classList.add("show");

        if (i === activeIndex && inner) {
          inner.style.height = `${sectionProgress * 100}%`;
        } else if (inner) {
          inner.style.height = i < activeIndex ? `100%` : `0%`;
        }

        if (activeIndex === stepCount - 1) {
          images[i].closest("div").classList.add("centered");
        } else {
          images[i].closest("div").classList.remove("centered");
        }
      });
    },
  };

  window.ScrollTrigger.matchMedia({
    "(min-width: 769px) and (max-height: 1299px)": function() {
      window.ScrollTrigger.create({
        trigger: ".feature-container-carousel.desktop",
        start: "top top",
        end: "+=3000",
        pin: true,
        pinSpacing: false,
        scrub: true,
        ...callbacks,
      });
    },
  });

  window.ScrollTrigger.matchMedia({
    "(min-width: 769px) and (min-height: 1300px)": function() {
      window.ScrollTrigger.create({
        trigger: ".feature-container-carousel-container",
        start: "top-=160 top",
        end: "+=3000",
        pin: true,
        pinSpacing: false,
        scrub: true,
        ...callbacks,
      });
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initBusinessIntelligenceScrollCarousel();
});
