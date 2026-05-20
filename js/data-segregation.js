// Shared function to update images and summaries based on index
function dataSegregationUpdateContent(activeIndex) {
  const hero = document.querySelector(".data-segregation.index-page .hero");
  const desktopImages = hero.querySelectorAll(".images.desktop img");
  const mobileImages = hero.querySelectorAll(".images.mobile img");
  const summaries = hero.querySelectorAll(".summary");

  // Show corresponding desktop image based on button order
  desktopImages.forEach(function(image, imageIndex) {
    if (imageIndex === activeIndex) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });

  // Show corresponding mobile image based on button order
  mobileImages.forEach(function(image, imageIndex) {
    if (imageIndex === activeIndex) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  });

  // Show corresponding summary based on button order
  summaries.forEach(function(summary, summaryIndex) {
    if (summaryIndex === activeIndex) {
      summary.classList.add("show");
    } else {
      summary.classList.remove("show");
    }
  });
}

function dataSegregationMoveHighlightToButton(button) {
  if (!button) return;

  const toggler = button.closest(".hoverable-toggler");
  if (!toggler) return;

  const highlight = toggler.querySelector(".hover-highlight");
  if (!highlight) return;

  // Align highlight with the link's true width (content-based), rather than % widths.
  highlight.style.left = "0px";
  highlight.style.marginLeft = button.offsetLeft + "px";
  highlight.style.width = button.offsetWidth + "px";
  highlight.style.height = button.offsetHeight + "px";
}

// Helper function to remove classes containing a substring
function removeClassesContainingSubstring(element, substring) {
  element.classList.forEach((className) => {
    if (className.includes(substring)) {
      element.classList.remove(className);
    }
  });
}

// Update desktop hoverable-toggler state
function dataSegregationUpdateDesktopToggler(activeIndex) {
  const hoverableToggler = document.querySelector(".hoverable-toggler");
  if (!hoverableToggler) return;

  const buttons = hoverableToggler.querySelectorAll("a");
  const highlight = hoverableToggler.querySelector(".hover-highlight");

  // Update button active states
  buttons.forEach(function(button, buttonIndex) {
    if (buttonIndex === activeIndex) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  // Move hover-highlight to the active button
  if (highlight) {
    // Keep legacy class behavior (used by shared code), but also set precise position/size
    // so the highlight matches content-width links on this page.
    removeClassesContainingSubstring(highlight, "link-");
    highlight.classList.add("link-" + activeIndex);
    dataSegregationMoveHighlightToButton(buttons[activeIndex]);
  }
}

// Update mobile carousel state
function dataSegregationUpdateMobileCarousel(activeIndex) {
  const carouselNav = document.querySelector(
    ".data-segregation.index-page .carousel__nav.mobile",
  );
  if (!carouselNav) return;

  const bullets = carouselNav.querySelectorAll(".swiper-pagination-bullet");
  const prevButton = carouselNav.querySelector(".carousel__nav--left");
  const nextButton = carouselNav.querySelector(".carousel__nav--right");

  // Update active bullet
  bullets.forEach(function(bullet, bulletIndex) {
    if (bulletIndex === activeIndex) {
      bullet.classList.add("active");
    } else {
      bullet.classList.remove("active");
    }
  });

  // Update prev/next button states
  dataSegregationUpdateCarouselButtons(
    prevButton,
    nextButton,
    activeIndex,
    bullets.length,
  );
}

function dataSegregationInitHoverableToggler() {
  const hoverableToggler = document.querySelector(
    ".data-segregation.index-page .hero .hoverable-toggler",
  );
  if (!hoverableToggler) return;

  const buttons = hoverableToggler.querySelectorAll("a");
  const highlight = hoverableToggler.querySelector(".hover-highlight");

  const getActiveButton = () =>
    hoverableToggler.querySelector("a.active") || buttons[0];

  // Position highlight immediately (before shared hoverable-toggler.js enables animation).
  if (highlight) {
    dataSegregationMoveHighlightToButton(getActiveButton());
  }

  buttons.forEach(function(button, buttonIndex) {
    button.addEventListener("click", function(event) {
      event.preventDefault();

      buttons.forEach(function(buttonToDeactivate) {
        buttonToDeactivate.classList.remove("active");
      });
      button.classList.add("active");

      // Update content and sync mobile carousel
      dataSegregationUpdateContent(buttonIndex);
      dataSegregationUpdateMobileCarousel(buttonIndex);

      // Keep highlight aligned with the newly active button.
      if (highlight) {
        dataSegregationMoveHighlightToButton(button);
      }
    });

    button.addEventListener("mouseenter", function() {
      if (highlight) {
        dataSegregationMoveHighlightToButton(button);
      }
    });
  });

  hoverableToggler.addEventListener("mouseleave", function() {
    if (highlight) {
      dataSegregationMoveHighlightToButton(getActiveButton());
    }
  });

  window.addEventListener("resize", function() {
    if (highlight) {
      dataSegregationMoveHighlightToButton(getActiveButton());
    }
  });
}

function dataSegregationInitMobileCarousel() {
  const carouselNav = document.querySelector(
    ".data-segregation.index-page .carousel__nav.mobile",
  );
  if (!carouselNav) return;

  const bullets = carouselNav.querySelectorAll(".swiper-pagination-bullet");
  const prevButton = carouselNav.querySelector(".carousel__nav--left");
  const nextButton = carouselNav.querySelector(".carousel__nav--right");

  // Get initial active index from desktop toggler
  const hoverableToggler = document.querySelector(".hoverable-toggler");
  let activeIndex = 0;
  if (hoverableToggler) {
    const activeButton = hoverableToggler.querySelector("a.active");
    if (activeButton) {
      const buttons = hoverableToggler.querySelectorAll("a");
      activeIndex = Array.from(buttons).indexOf(activeButton);
    }
  }

  // Initialize active bullet
  bullets[activeIndex].classList.add("active");

  // Handle bullet clicks
  bullets.forEach(function(bullet, bulletIndex) {
    bullet.addEventListener("click", function() {
      activeIndex = bulletIndex;

      // Update content and sync desktop toggler
      dataSegregationUpdateContent(activeIndex);
      dataSegregationUpdateDesktopToggler(activeIndex);
      dataSegregationUpdateMobileCarousel(activeIndex);
    });
  });

  // Handle prev button
  if (prevButton) {
    prevButton.addEventListener("click", function() {
      if (activeIndex > 0) {
        activeIndex--;
        // Update content and sync desktop toggler
        dataSegregationUpdateContent(activeIndex);
        dataSegregationUpdateDesktopToggler(activeIndex);
        dataSegregationUpdateMobileCarousel(activeIndex);
      }
    });
  }

  // Handle next button
  if (nextButton) {
    nextButton.addEventListener("click", function() {
      if (activeIndex < bullets.length - 1) {
        activeIndex++;
        // Update content and sync desktop toggler
        dataSegregationUpdateContent(activeIndex);
        dataSegregationUpdateDesktopToggler(activeIndex);
        dataSegregationUpdateMobileCarousel(activeIndex);
      }
    });
  }

  // Initialize button states
  dataSegregationUpdateCarouselButtons(
    prevButton,
    nextButton,
    activeIndex,
    bullets.length,
  );
}

function dataSegregationUpdateCarouselButtons(
  prevButton,
  nextButton,
  activeIndex,
  totalItems,
) {
  if (prevButton) {
    if (activeIndex === 0) {
      prevButton.disabled = true;
      prevButton.style.opacity = "0.5";
      prevButton.style.pointerEvents = "none";
    } else {
      prevButton.disabled = false;
      prevButton.style.opacity = "1";
      prevButton.style.pointerEvents = "auto";
    }
  }

  if (nextButton) {
    if (activeIndex === totalItems - 1) {
      nextButton.disabled = true;
      nextButton.style.opacity = "0.5";
      nextButton.style.pointerEvents = "none";
    } else {
      nextButton.disabled = false;
      nextButton.style.opacity = "1";
      nextButton.style.pointerEvents = "auto";
    }
  }
}

function dataSegregationInitSmoothScroll() {
  const dataSegregationPage = document.querySelector(
    ".data-segregation.index-page",
  );
  if (!dataSegregationPage) return;

  // Find all anchor links within the data-segregation page
  const anchorLinks = dataSegregationPage.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      const visibleCompareContainer = [
        ...document.querySelectorAll(".compare > div"),
      ].filter((el) => el.offsetParent !== null)[0];

      const hash = link.hash;

      if (!hash || hash === "#") return;

      const targetId = hash.substring(1);
      const targetElement = visibleCompareContainer.querySelector(
        "#" + targetId,
      );

      if (targetElement) {
        event.preventDefault();

        // Smooth scroll to the target element
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  dataSegregationInitHoverableToggler();
  dataSegregationInitMobileCarousel();
  dataSegregationInitSmoothScroll();
});
