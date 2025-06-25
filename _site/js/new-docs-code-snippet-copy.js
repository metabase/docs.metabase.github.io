function addCopyFunction(copyButton, text) {
  copyButton.addEventListener("click", function() {
    navigator.clipboard.writeText(text);

    const copyWrapper = copyButton.querySelector(".copy-button-copy-wrapper");
    const copiedWrapper = copyButton.querySelector(
      ".copy-button-copied-wrapper",
    );

    copyWrapper.classList.add("d-none");
    copiedWrapper.classList.add("d-flex");

    setTimeout(function() {
      copyWrapper.classList.remove("d-none");
      copiedWrapper.classList.remove("d-flex");
    }, 2000);
  });
}

document.querySelectorAll("code").forEach((codeSnippet) => {
  if (
    codeSnippet.classList.contains("language-plaintext") ||
    codeSnippet.classList.contains("do-not-display-copy-button")
  ) {
    return;
  }

  const parent = codeSnippet.parentNode;
  const wrapper = document.createElement("div");
  wrapper.classList.add("code-snippet-wrapper", "position-relative");
  parent.replaceChild(wrapper, codeSnippet);
  wrapper.appendChild(codeSnippet);

  const copyButton = document.createElement("div");

  const DARKMODE =
    '    <div class="copy-button-copy-wrapper d-flex align-items-center">' +
    '        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '            <path d="M6.5 15.25C5.5335 15.25 4.75 14.4665 4.75 13.5V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.5C14.4665 4.75 15.25 5.5335 15.25 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '            <path d="M17.25 8.75H10.75C9.64543 8.75 8.75 9.64543 8.75 10.75V17.25C8.75 18.3546 9.64543 19.25 10.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V10.75C19.25 9.64543 18.3546 8.75 17.25 8.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "        </svg>" +
    '        <p class="copy-button-copy">Copy</p>' +
    "    </div>" +
    '    <div class="copy-button-copied-wrapper align-items-center gap-1">' +
    '        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8897 6L21 7.09741L10.6165 19L4 11.9572L5.07138 10.8168L10.5761 16.6762L19.8897 6Z" fill="white"/>\n' +
    "        </svg>" +
    "        <p>Copied</p>" +
    "    </div>";

  const LIGHTMODE =
    '    <div class="copy-button-copy-wrapper d-flex align-items-center">' +
    '        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '            <path d="M6.75 15.5C5.7835 15.5 5 14.7165 5 13.75V7C5 5.89543 5.89543 5 7 5H13.75C14.7165 5 15.5 5.7835 15.5 6.75" stroke="#509EE3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    '            <path d="M17.5 9H11C9.89543 9 9 9.89543 9 11V17.5C9 18.6046 9.89543 19.5 11 19.5H17.5C18.6046 19.5 19.5 18.6046 19.5 17.5V11C19.5 9.89543 18.6046 9 17.5 9Z" stroke="#509EE3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n' +
    "        </svg>" +
    '        <p class="copy-button-copy">Copy</p>' +
    "    </div>" +
    '    <div class="copy-button-copied-wrapper align-items-center gap-1">' +
    '        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8897 6L21 7.09741L10.6165 19L4 11.9572L5.07138 10.8168L10.5761 16.6762L19.8897 6Z" fill="#509EE3"/>\n' +
    "        </svg>" +
    "        <p>Copied</p>" +
    "    </div>";

  // If the color is $neutral-15, we should use the dark mode version of the copy button SVG
  const codeElementBackgroundColor = window.getComputedStyle(codeSnippet)
    .backgroundColor;
  const isDarkBackground =
    codeElementBackgroundColor === "rgb(34, 36, 43)" ||
    codeElementBackgroundColor === "#22242b";

  copyButton.innerHTML = isDarkBackground ? DARKMODE : LIGHTMODE;

  copyButton.classList.add("copy-code-button");

  addCopyFunction(copyButton, codeSnippet.innerText);

  wrapper.appendChild(copyButton);
});
