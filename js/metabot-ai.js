// Questions
function initQuestionsGallery() {
  const INTERVAL = 5000;

  const $container = document.querySelector(".questions-gallery");
  if (!$container) {
    return;
  }

  const $allQuestions = $container.querySelectorAll(".question");
  const $allAnswers = $container.querySelectorAll(".answer");
  if ($allQuestions.length !== $allAnswers.length) {
    console.warn(
      "initQuestionsGallery: same count of questions and answers needed.",
    );
  }

  // Cycle
  let index = 0;
  const loopSize = $allQuestions.length;

  function init() {
    // questions
    $allQuestions.forEach(($question, i) => {
      if (i === index) {
        $question.classList.add("display", "fade-in");
      } else {
        $question.classList.remove("fade-in");
        $question.classList.add("fade-out");
      }
      setTimeout(() => $question.classList.add("animate"), 10);
    });

    // answers
    $allAnswers.forEach(($answer, i) => {
      if (i === index) {
        $answer.classList.add("display", "fade-in");
      } else {
        $answer.classList.remove("display", "fade-in");
      }
    });
  }

  function next() {
    const nextIndex = index + 1 === loopSize ? 0 : index + 1;

    // questions
    $allQuestions.forEach(($question, i) => {
      // current question
      if (i === index) {
        $question.parentElement.append($question);
      }

      // next question
      if (i === nextIndex) {
        $question.classList.remove("animate", "fade-out");
        $question.classList.add("display");
        setTimeout(() => $question.classList.add("animate", "fade-in"), 10);
      }
      // other questions
      else {
        $question.classList.remove("animate", "display");
        setTimeout(() => {
          $question.classList.remove("fade-in");
          $question.classList.add("animate", "fade-out");
        }, 10);
      }
    });

    // answers
    $allAnswers.forEach(($answer, i) => {
      // next answer
      if (i === nextIndex) {
        $answer.classList.add("display");
        setTimeout(() => $answer.classList.add("fade-in"), 20);
      }
      // other answers
      else {
        $answer.classList.remove("display", "fade-in");
      }
    });

    // loop
    index = nextIndex;
  }

  init();
  setInterval(next, INTERVAL);
}

document.addEventListener("DOMContentLoaded", function() {
  initQuestionsGallery();
});
