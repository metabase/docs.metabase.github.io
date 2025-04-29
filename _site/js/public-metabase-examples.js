function initRealLifeExamples() {
  const buttons = examplesGetButtons();

  buttons.forEach((button) => {
    button.addEventListener("click", () => examplesHandleButtonClick(button));
  });

  examplesHandleSelectCategory("All");

  examplesMaybeSelectCategoryOnPageLoad();
}

function examplesGetButtons() {
  return document.querySelectorAll(".public-metabase-examples .picker button");
}

function examplesHandleButtonClick(button) {
  const category = button.textContent.trim();

  examplesHandleSelectCategory(category);
}

function examplesHandleSelectCategory(category) {
  const examples = document.querySelectorAll(".entries .entry");
  const buttons = examplesGetButtons();

  buttons.forEach((button) => {
    if (button.textContent.trim() === category) {
      button.classList.add("active");
      examplesMoveHighlightToButton(button);
    } else {
      button.classList.remove("active");
    }
  });

  if (category === "All") {
    examples.forEach((example) => {
      example.classList.remove("hide");
    });
  } else {
    examples.forEach((example) => {
      const exampleHasCategory = examplesCheckIfEntryHasCategory(
        category,
        example,
      );

      if (exampleHasCategory) {
        example.classList.remove("hide");
      } else {
        example.classList.add("hide");
      }
    });
  }
}

function examplesMaybeSelectCategoryOnPageLoad() {
  const params = new URLSearchParams(document.location.search);
  const category = params.get("category");

  if (category) {
    examplesHandleSelectCategory(category);
  }
}

function examplesCheckIfEntryHasCategory(category, example) {
  const exampleCategories = example.getAttribute("data-categories").split(", ");

  return exampleCategories.includes(category);
}

function initExamplesDragPicker() {
  let isDown = false;
  let startX;
  let scrollLeft;
  const slider = document.querySelector(".picker-slider");

  const end = () => {
    isDown = false;
    slider.classList.remove("active");

    const buttons = examplesGetButtons();

    buttons.forEach((button) => {
      button.style.pointerEvents = "all";
    });
  };

  const start = (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = x - startX;
    slider.scrollLeft = scrollLeft - dist;

    const buttons = examplesGetButtons();

    buttons.forEach((button) => {
      button.style.pointerEvents = "none";
    });
  };

  (() => {
    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);

    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchmove", move);

    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
  })();
}

function initExamplesButtonsToDashboards() {
  const buttons = document.querySelectorAll(".entries .entry button");

  buttons.forEach((button) => {
    button.addEventListener("click", examplesHandleButtonClickToDashboard);
  });
}

function examplesHandleButtonClickToDashboard(event) {
  event.preventDefault();

  const button = event.target.closest("button");

  const dashboardURL = button.getAttribute("data-url");

  window.location.href = dashboardURL;
}

function initExampleButtonHoverHighlight() {
  const hoverHighlight = document.querySelector(".hover-highlight");
  const buttons = document.querySelectorAll(".picker button");
  const picker = document.querySelector(".picker");

  hoverHighlight.classList.remove("hidden");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", function(event) {
      examplesMoveHighlightToButton(event.target.closest("button"));
    });
  });

  picker.addEventListener("mouseleave", function() {
    const activeButton = document.querySelector(".picker button.active");

    if (activeButton) {
      examplesMoveHighlightToButton(activeButton);
    }
  });
}

function examplesMoveHighlightToButton(button) {
  const hoverHighlight = document.querySelector(".hover-highlight");

  hoverHighlight.style.marginTop = button.offsetTop + "px";
  hoverHighlight.style.marginLeft = button.offsetLeft + "px";
  hoverHighlight.style.width = button.offsetWidth + "px";
  hoverHighlight.style.height = button.offsetHeight + "px";
}

window.addEventListener("DOMContentLoaded", () => {
  initRealLifeExamples();
  initExamplesDragPicker();
  initExamplesButtonsToDashboards();
  initExampleButtonHoverHighlight();
});
