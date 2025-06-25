function upgradeUpdateElementsFromURLParams() {
  const url = new URL(window.location);
  const { searchParams } = url;

  const sourcePlan = searchParams.get("source_plan");
  const utmCampaign = searchParams.get("utm_campaign");

  const $starterCard = document.querySelector(".Pricing-Card.oss-tier-starter");
  const $upgradeToStarterButton = document.querySelector(
    ".Pricing-CTA a.oss-tier-starter",
  );

  const $proCard = document.querySelector(".Pricing-Card.oss-tier-pro");
  const $upgradeToProCloudButton = document.querySelector(
    ".Pricing-CTA a.oss-tier-pro-cloud",
  );

  if (sourcePlan === "oss") {
    if (utmCampaign === "cache-granular-controls") {
      highlightProOption();
    }
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

    $upgradeToProCloudButton.href =
      "https://store.metabase.com/account#section=pro-trial";

    $upgradeToProCloudButton.classList.remove("outline");

    $starterTagline.textContent =
      "Starter gets you pretty far. As you grow, you may need more control over what people see and do";

    $proTagline.textContent =
      "Sophisticated features for managing lots of people and compliance";

    $starterIntro.textContent = "With Starter, you’ve got:";

    $listItemToRemove.remove();

    highlightProOption();

    document
      .querySelector(".Pricing-Card.oss-tier-pro .Pricing-CTA a.oss-tier-pro")
      .classList.add("hide");
  }
}

function highlightProOption() {
  const $proCard = document.querySelector(".Pricing-Card.oss-tier-pro");
  $proCard.classList.add("highlight");
  const $recommendedForYou = Array.from($proCard.parentNode.children).find(
    (el) => el !== $proCard && el.classList.contains("recommended-for-you"),
  );

  $recommendedForYou.style.visibility = "visible";

  // If we will show only one button in Pro,
  // we need to remove the margin-bottom in Starter
  document.querySelector(".only").style.marginBottom = "0px";
}

window.addEventListener("DOMContentLoaded", () => {
  upgradeUpdateElementsFromURLParams();
});
