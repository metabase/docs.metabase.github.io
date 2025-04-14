function initPricingFAQ() {
  const $questions = document.querySelectorAll(".faq-question");

  $questions.forEach(($question) => {
    $question.addEventListener("click", () => {
      $question.classList.toggle("open");
      $question.nextSibling.nextSibling.classList.toggle("open");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initPricingFAQ();
});
