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
  console.log(codeSnippet);
  console.log(codeSnippet.innerHTML.length)
  if (
    codeSnippet.classList.length === 0 ||
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
  copyButton.innerHTML =
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
  copyButton.classList.add("copy-code-button");

  addCopyFunction(copyButton, codeSnippet.innerText);

  wrapper.appendChild(copyButton);
});
