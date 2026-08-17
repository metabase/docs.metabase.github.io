/* global hljs */

const CLASSES_TO_SKIP_HIGHLIGHTING = ["language-sh", "language-plaintext"];

window.addEventListener("DOMContentLoaded", () => {
  const $codeBlocks = document.querySelectorAll(".highlighter-rouge");
  if ($codeBlocks) {
    $codeBlocks.forEach((codeBlock) => {
      const shouldSkipHighlighting = CLASSES_TO_SKIP_HIGHLIGHTING.some(
        (classToSkipHighlighting) =>
          codeBlock.className.includes(classToSkipHighlighting),
      );

      const regex = /language-[a-zA-Z]+/;
      const lang = codeBlock.className.match(regex)[0];

      const $code = codeBlock.querySelector("code");
      if ($code) {
        if (shouldSkipHighlighting) {
          $code.classList.add("no-highlight");
        } else {
          if (lang) {
            $code.classList.add(lang);
          }
        }
      }
    });

    if (typeof hljs === "undefined") {
      return;
    }

    hljs.configure({ ignoreUnescapedHTML: true });

    hljs.highlightAll();
  }
});
