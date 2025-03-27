(function() {
  const $featureCards = document.querySelectorAll(".feature-card");
  Array.from($featureCards)
    .map(($featureCard) => $featureCard.querySelector(".lottie-animation"))
    .filter(($lottieAnimation) => !!$lottieAnimation)
    .forEach(($lottieAnimation) => {
      const $animationContainer = $lottieAnimation.parentNode;
      $animationContainer.addEventListener("mouseenter", () => {
        $lottieAnimation.play();
      });

      $animationContainer.addEventListener("mouseleave", () => {
        $lottieAnimation.stop();
        $lottieAnimation.seek(0);
      });

      $animationContainer.addEventListener("click", () => {
        $lottieAnimation.togglePlay();
      });
    });
})();

(function() {
  const $featureCards = document.querySelectorAll(".constant-animation");
  Array.from($featureCards)
    .map(($featureCard) => $featureCard.querySelector(".lottie-animation"))
    .filter(($lottieAnimation) => !!$lottieAnimation)
    .forEach(($lottieAnimation) => {
      $lottieAnimation.play();
    });
})();

function initFeatureCardHover() {
  const $articles = document.querySelectorAll(".feature-card__wrapper");

  $articles.forEach(($article) => {
    const $imageWrapper = $article.querySelector(
      ".feature-card__image-wrapper",
    );
    const $animationWrapper = $article.querySelector(
      ".feature-card__animation-wrapper",
    );

    if ($animationWrapper) {
      if (!$animationWrapper.classList.contains("gif")) {
        return;
      }

      $article.addEventListener("mouseenter", () => {
        $imageWrapper.classList.add("hide");
        $animationWrapper.classList.add("show");
      });

      $article.addEventListener("mouseleave", () => {
        $imageWrapper.classList.remove("hide");
        $animationWrapper.classList.remove("show");
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  initFeatureCardHover();
});
