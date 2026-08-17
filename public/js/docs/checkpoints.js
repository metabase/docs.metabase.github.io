function initDocEmbedding() {
  const headers = document.querySelectorAll('[id^="checkpoint"]');

  headers.forEach((header, index) => {
    cleanHeaderText(header);

    const headerContainer = header.closest("div");
    const elementBeforeHeaderContainer = headerContainer.previousElementSibling;

    const checkpointContainer = populateCheckpointContainer(
      headerContainer,
      index,
      [...headers].length,
    );

    elementBeforeHeaderContainer.insertAdjacentElement(
      "afterend",
      checkpointContainer,
    );
  });
}

function populateCheckpointContainer(
  headerContainer,
  checkpointIndex,
  checkpointCount,
) {
  const elementsToWrap = [headerContainer];

  const checkpointContainer = document.createElement("div");
  checkpointContainer.classList.add("checkpoint");

  appendTitle(
    headerContainer,
    checkpointContainer,
    checkpointIndex,
    checkpointCount,
  );

  const contentContainer = appendContentContainer(checkpointContainer);

  appendCheckmarks(contentContainer);
  appendContent(contentContainer, elementsToWrap);
  appendButton(contentContainer);
  appendChevron(contentContainer);

  return checkpointContainer;
}

function appendContentContainer(container) {
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("checkpoint__content-container");
  container.appendChild(contentContainer);

  return contentContainer;
}

function appendCheckmarks(container) {
  container.insertAdjacentHTML("beforeend", checkmark);
  container.insertAdjacentHTML("beforeend", greenCheckmark);

  initHandleCheckmarkClick(container);
}

function appendTitle(
  headerContainer,
  checkpointContainer,
  checkpointIndex,
  checkpointCount,
) {
  const checkpointCounter = document.createElement("h6");

  const sectionTitle = getSectionTitle(headerContainer);

  checkpointCounter.textContent = `Checkpoint ${checkpointIndex +
    1}/${checkpointCount}: ${sectionTitle}`;

  checkpointContainer.appendChild(checkpointCounter);

  checkpointContainer.setAttribute("aria-label", sectionTitle);
}

function getSectionTitle(header) {
  let sectionTitle;
  let previousElement = header;

  while (!sectionTitle) {
    previousElement = previousElement.previousElementSibling;

    const H2 = previousElement.querySelector("h2");

    if (H2) {
      sectionTitle = H2.textContent;
    }
  }

  return sectionTitle;
}

function appendContent(checkpointContainer, elementsToWrap) {
  const paragraphContainer = document.createElement("div");
  paragraphContainer.classList.add("checkpoint__content");

  while (
    elementsToWrap[elementsToWrap.length - 1].nextElementSibling.tagName === "P"
  ) {
    elementsToWrap.push(
      elementsToWrap[elementsToWrap.length - 1].nextElementSibling,
    );
  }

  const [header, ...paragraphs] = elementsToWrap;

  checkpointContainer.appendChild(header);

  paragraphs.forEach((paragraph) => {
    paragraphContainer.appendChild(paragraph);
  });

  checkpointContainer.appendChild(paragraphContainer);
}

function appendButton(checkpointContainer) {
  const button = document.createElement("button");
  button.classList.add("Button", "Button--primary", "rounded-3");
  button.textContent = "Yes, it worked!";

  checkpointContainer.querySelector(".checkpoint__content").appendChild(button);

  button.addEventListener("click", () => {
    handleButtonClick(button);
  });
}

function appendUndoButton(checkpointContainer) {
  const button = document.createElement("button");
  button.classList.add("undo");
  button.textContent = "Undo";

  checkpointContainer.querySelector(".checkpoint__content").appendChild(button);

  button.addEventListener("click", () => {
    handleButtonClick(button);
  });
}

function appendChevron(checkpointContainer) {
  const chevron = document.createElement("img");
  chevron.src = "/images/chevron.svg";
  chevron.classList.add("checkpoint__chevron");

  checkpointContainer.appendChild(chevron);

  initHandleChevronClick(chevron);
}

function handleButtonClick(button) {
  const container = button.closest(".checkpoint");

  const isChecked = container
    .querySelector(".checkpoint__checkmark.unchecked")
    .classList.contains("hide");

  if (isChecked) {
    uncheckCheckpoint(container);
  } else {
    checkCheckpoint(container);
  }
}

function checkCheckpoint(container) {
  container.querySelector(".checkpoint__content").classList.add("hidden");

  container.querySelector(".checkpoint__chevron").classList.add("show");

  container
    .querySelector(".checkpoint__checkmark.unchecked")
    .classList.toggle("hide");
  container
    .querySelector(".checkpoint__checkmark.checked")
    .classList.toggle("hide");

  updateSubNavigationContent(container);

  setTimeout(() => {
    container.querySelector("button").remove();
    appendUndoButton(container);
  }, 1000);
}

function uncheckCheckpoint(container) {
  container.querySelector(".checkpoint__content").classList.remove("hidden");

  container.querySelector(".checkpoint__chevron").classList.remove("show");

  setTimeout(() => {
    container
      .querySelector(".checkpoint__chevron")
      .classList.remove("inverted");
  }, 1000);

  container
    .querySelector(".checkpoint__checkmark.unchecked")
    .classList.toggle("hide");
  container
    .querySelector(".checkpoint__checkmark.checked")
    .classList.toggle("hide");

  updateSubNavigationContent(container);

  container.querySelector("button").remove();
  appendButton(container);
}

function initHandleCheckmarkClick(container) {
  const checkmarks = container.querySelectorAll(".checkpoint__checkmark");

  checkmarks.forEach((checkmark) => {
    checkmark.addEventListener("click", () => {
      handleButtonClick(container);
    });
  });
}

function updateSubNavigationContent(container) {
  const sectionTitle = container.getAttribute("aria-label");

  const xpath = `//a[text()='${sectionTitle}']`;
  const matchingElement = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;

  if (matchingElement.classList.contains("completed")) {
    matchingElement.classList.remove("completed");
    matchingElement.querySelector("img").remove();
  } else {
    matchingElement.classList.add("completed");

    const checkmark = document.createElement("img");
    checkmark.src = "/images/icons/green-checkmark.svg";
    matchingElement.insertAdjacentElement("beforeend", checkmark);
  }
}

function initHandleChevronClick(chevron) {
  chevron.addEventListener("click", () => {
    const container = chevron.closest("div");

    container.querySelector(".checkpoint__content").classList.toggle("hidden");

    container
      .querySelector(".checkpoint__chevron")
      .classList.toggle("inverted");
  });
}

function cleanHeaderText(header) {
  const headerTextWithoutPrefix = header.textContent.replace(
    "CHECKPOINT: ",
    "",
  );

  const newHeaderText =
    headerTextWithoutPrefix[0].toUpperCase() + headerTextWithoutPrefix.slice(1);

  header.textContent = newHeaderText;
}

const checkmark = `<svg class="checkpoint__checkmark unchecked" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewbox="0 0 45 28"><circle cx="13.883" cy="13.59" r="12" stroke="#8FC1ED" stroke-width="2"/><g clip-path="url(#a)"><path fill="#8FC1ED" fill-rule="evenodd" d="M18.952 9.182a1.048 1.048 0 0 1 1.482 1.482l-7.587 7.587c-.41.41-1.073.41-1.482 0l-4.032-4.032a1.048 1.048 0 1 1 1.482-1.482l3.291 3.291 6.846-6.846Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M7.026 6.733H20.74v13.714H7.026z"/></clipPath></defs></svg>`;

const greenCheckmark = `<svg class="checkpoint__checkmark checked hide" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewbox="0 0 45 28"><circle cx="13.883" cy="14.881" r="12" fill="#80B946" stroke="#80B946" stroke-width="2"/><g clip-path="url(#a)"><path fill="#fff" fill-rule="evenodd" d="M18.952 10.474a1.048 1.048 0 1 1 1.481 1.482l-7.586 7.587c-.41.409-1.073.409-1.482 0L7.333 15.51a1.048 1.048 0 1 1 1.482-1.482l3.29 3.291 6.847-6.846Z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M7.026 8.024H20.74v13.714H7.026z"/></clipPath></defs></svg>
`;

window.addEventListener("DOMContentLoaded", () => {
  initDocEmbedding();
});
