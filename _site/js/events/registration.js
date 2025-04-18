function initRegistrationPopup() {
  const $registrationPopup = document.querySelector(".registration-popup");

  const $registrationButton = document.querySelector(".hero .registration");
  if ($registrationButton) {
    $registrationButton.addEventListener("click", () => {
      $registrationPopup.classList.add("show");
    });
  }

  const $closePopupButton = $registrationPopup.querySelector(".close-popup");
  if ($closePopupButton) {
    $closePopupButton.addEventListener("click", () => {
      $registrationPopup.classList.remove("show");
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initRegistrationPopup();
});
