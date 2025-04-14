function upgradeUpdateElementsFromURLParams() {
  const url = new URL(window.location);
  const { searchParams } = url;

  const sourcePlan = searchParams.get("source_plan");

  const $starterCard = document.querySelector(".Pricing-Card.oss-tier-starter");
  const $upgradeToStarterButton = document.querySelector(
    ".Pricing-CTA a.oss-tier-starter",
  );

  const $proCard = document.querySelector(".Pricing-Card.oss-tier-pro");
  const $upgradeToProButton = document.querySelector(
    ".Pricing-CTA a.oss-tier-pro",
  );

  if (sourcePlan === "oss") {
    $upgradeToStarterButton.href =
      "https://store.metabase.com/checkout?plan=starter";

    $upgradeToProButton.href = "https://store.metabase.com/checkout?plan=pro";
  }

  if (sourcePlan === "starter") {
    const $headline = document.querySelector("h1");
    const $subheading = document.querySelector(".Pricing-Subheading");
    const $starterTitle = $starterCard.querySelector(".Pricing-Title");
    const $starterTagline = $starterCard.querySelector(".Pricing-Tagline");
    const $proTagline = $proCard.querySelector(".Pricing-Tagline");
    const $starterIntro = $starterCard.querySelector(".Pricing-Intro");
    const $listItemToRemove = document
      .evaluate(
        "//p[contains(text(),'Your choice of')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      )
      .singleNodeValue.closest("li");

    $headline.textContent =
      "Get the buttoned up version of the Metabase you love";

    $subheading.textContent =
      "Advanced features for growing teams to keep things (even more) secure, organized, and under your control.";

    $starterTitle.textContent = "BI Basics";

    $starterCard.classList.add("current");

    $upgradeToStarterButton.textContent = "Your current plan";

    $upgradeToStarterButton.setAttribute("disabled", "true");

    $upgradeToProButton.href =
      "https://store.metabase.com/account#section=pro-trial";

    $starterTagline.textContent =
      "Starter gets you pretty far. As you grow, you may need more control over what people see and do";

    $proTagline.textContent =
      "Sophisticated features for managing lots of people and compliance";

    $starterIntro.textContent = "With Starter, you’ve got:";

    $listItemToRemove.remove();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  upgradeUpdateElementsFromURLParams();
});
