/* eslint-disable-next-line no-unused-vars */
function useCustomHeaderCheckoutLink(checkoutLink) {
  const link = document.querySelector(".navigation-header #get-started-btn");

  if (link) {
    link.href = checkoutLink;
  }
}
