function initFeatureContainerSetNewVisibleImages() {
  const containers = document.querySelectorAll(
    ".feature-plus-headline-container",
  );

  containers.forEach(featureContainerSetNewVisibleImages);
}

function featureContainerSetNewVisibleImages(container) {
  const buttonsIndexedToImages = container.querySelectorAll(
    "a, button, .swiper-pagination-bullet",
  );

  if (!buttonsIndexedToImages) {
    return;
  }

  buttonsIndexedToImages.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      featureContaineHandleIndexedButtonClick(buttonsIndexedToImages, button);
    });
  });

  const prevButton = container.querySelector(".swiper-button-prev");
  const nextButton = container.querySelector(".swiper-button-next");

  if (!prevButton) {
    return;
  }

  prevButton.addEventListener("click", () => {
    const activeButton = container.querySelector(".active");
    const activeButtonIndex = Array.prototype.indexOf.call(
      buttonsIndexedToImages,
      activeButton,
    );

    if (activeButtonIndex === 0) {
      return;
    }

    featureContaineHandleIndexedButtonClick(
      buttonsIndexedToImages,
      buttonsIndexedToImages[activeButtonIndex - 1],
    );
  });

  nextButton.addEventListener("click", () => {
    const activeButton = container.querySelector(".active");
    const activeButtonIndex = Array.prototype.indexOf.call(
      buttonsIndexedToImages,
      activeButton,
    );

    if (activeButtonIndex === buttonsIndexedToImages.length - 1) {
      return;
    }

    featureContaineHandleIndexedButtonClick(
      buttonsIndexedToImages,
      buttonsIndexedToImages[activeButtonIndex + 1],
    );
  });
}

function featureContaineHandleIndexedButtonClick(buttons, button) {
  const parentElement = button.parentElement;

  const childrenElements = Array.from(parentElement.children).filter(
    (child) => child.tagName !== "DIV",
  );

  const buttonIndex = Array.prototype.indexOf.call(childrenElements, button);

  const itemContainers = button
    .closest(".feature-plus-headline-container")
    .querySelectorAll(".feature-container > div");

  featureContainerSwitchActiveButton(buttons, buttonIndex);
  featureContainerSwitchVisibleImage(itemContainers, buttonIndex);
  makeFeatureContainerColumnsSameHeightIfDesktop(itemContainers);
  featureContainerMaybeUpdatePrevAndNextButtons(buttons, buttonIndex);
}

function featureContainerSwitchActiveButton(buttons, buttonIndex) {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  buttons[buttonIndex].classList.add("active");
}

function featureContainerMaybeUpdatePrevAndNextButtons(buttons, buttonIndex) {
  const prevButton = buttons[0].previousElementSibling;
  const nextButton = buttons[buttons.length - 1].nextElementSibling;

  if (buttonIndex === 0) {
    prevButton.classList.add("swiper-button-disabled");
    nextButton.classList.remove("swiper-button-disabled");
  } else if (buttonIndex === buttons.length - 1) {
    prevButton.classList.remove("swiper-button-disabled");
    nextButton.classList.add("swiper-button-disabled");
  } else {
    prevButton.classList.remove("swiper-button-disabled");
    nextButton.classList.remove("swiper-button-disabled");
  }
}

function featureContainerSwitchVisibleImage(itemContainers, buttonIndex) {
  itemContainers.forEach((itemContainer) => {
    const items = itemContainer.querySelectorAll("img, div.highlight");

    items.forEach((item) => {
      item.classList.remove("show");
    });

    if (items[buttonIndex]) {
      items[buttonIndex].classList.add("show");
    }
  });
}

function featureContainerSetInitialVisibleImages() {
  const containers = document.querySelectorAll(
    ".feature-plus-headline-container",
  );

  containers.forEach((container) => {
    const featureContainer = container.querySelector(".feature-container");

    if (featureContainer) {
      featureContainer.classList.add("initialized");
    }

    const itemContainers = container.querySelectorAll(
      ".feature-container > div",
    );

    makeFeatureContainerColumnsSameHeightIfDesktop(itemContainers);

    itemContainers.forEach((itemContainer) => {
      const elementToShow = itemContainer.querySelector("img, div.highlight");

      if (elementToShow) {
        elementToShow.classList.add("show");
      }
    });
  });
}

function makeFeatureContainerColumnsSameHeightIfDesktop(containers) {
  if (!containers || containers.length < 2) {
    return;
  }

  if (window.innerWidth >= 992) {
    containers[1].style.height = containers[0].offsetHeight + "px";
  } else {
    containers[1].style.height = "auto";
  }
}

function initExampleButtonHoverHighlight() {
  const picker = document.querySelector(".hoverable-toggler");

  const hoverHighlight = document.querySelector(".hover-highlight");

  if (!picker || !hoverHighlight) {
    return;
  }

  const buttons = picker.querySelectorAll("a");

  hoverHighlight.classList.remove("hidden");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", function(event) {
      examplesMoveHighlightToButton(event.target.closest("a"));
    });
  });

  picker.addEventListener("mouseleave", function() {
    const activeButton = document.querySelector(".docs-learn-toggler a.active");

    if (activeButton) {
      examplesMoveHighlightToButton(activeButton);
    }
  });

  // setTimeout to prevent background from moving on page load
  setTimeout(function() {
    picker.classList.add("hoverable");
    docsLearnTogglerRemoveFixedBackgroundColor();
  }, 100);
}

function examplesMoveHighlightToButton(button) {
  const hoverHighlight = document.querySelector(".hover-highlight");

  hoverHighlight.style.left = 0;
  hoverHighlight.style.marginLeft = button.offsetLeft + "px";
  hoverHighlight.style.width = button.offsetWidth + "px";
  hoverHighlight.style.height = button.offsetHeight + "px";
}

// On page load we have CSS to add the light blue background
// below the active link.
// However, this initial one is not animated.
// Once we have the animated hover, we remove the fixed background.
function docsLearnTogglerRemoveFixedBackgroundColor() {
  const activeLink = document.querySelector(".docs-learn-toggler a.active");
  activeLink.classList.add("transparent-background");
}

function initFeatureContainerCarousels() {
  const carousels = document.querySelectorAll(".feature-container-carousel");
  carousels.forEach((carousel) => {
    appendProgressBarsToCarousel(carousel);
  });
}

function appendProgressBarsToCarousel(carousel) {
  const buttons = carousel.querySelectorAll("h4");

  buttons.forEach((button) => {
    const newDiv = document.createElement("div");
    const innerDiv = document.createElement("div");

    innerDiv.classList.add("inner");
    newDiv.appendChild(innerDiv);

    button.closest("div").prepend(newDiv);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  featureContainerSetInitialVisibleImages();
  initFeatureContainerSetNewVisibleImages();
  initExampleButtonHoverHighlight();
  initFeatureContainerCarousels();
});
