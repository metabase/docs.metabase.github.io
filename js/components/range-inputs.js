function initRangeInputs() {
  const rangeInputs = document.querySelectorAll("input[type='range']");
  rangeInputs.forEach(initRangeInput);
}

function initRangeInput(rangeInput) {
  updateRangeInputBackground(rangeInput);

  rangeInput.addEventListener("input", (event) =>
    updateRangeInputBackground(event.target),
  );
}

function updateRangeInputBackground(slider) {
  const newLeftSideBackgroundSize =
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

  slider.style.backgroundSize = `${newLeftSideBackgroundSize}% 100%`;
}

document.addEventListener("DOMContentLoaded", function() {
  initRangeInputs();
});
