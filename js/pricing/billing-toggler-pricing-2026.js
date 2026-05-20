function initPricingBillingSwitcher() {
  const togglers = document.querySelectorAll(".js-billing-toggler");
  togglers.forEach(function(toggler) {
    toggler.addEventListener("change", function(e) {
      togglers.forEach(function(otherToggler) {
        if (e.currentTarget !== otherToggler) {
          otherToggler.checked = e.currentTarget.checked;
        }
      });
      window.dispatchEvent(
        new CustomEvent("billing", {
          detail: { billing: e.currentTarget.checked ? "annual" : "monthly" },
        }),
      );
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  initPricingBillingSwitcher();
});
