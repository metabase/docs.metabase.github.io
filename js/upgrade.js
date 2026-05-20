function upgradeUpdateElementsFromURLParams() {
  const url = new URL(window.location);
  const { searchParams } = url;

  const sourcePlan = searchParams.get("source_plan");
  const utmCampaign = searchParams.get("utm_campaign");

  if (sourcePlan === "oss") {
    upgradeUpdateLinksForSourcePlanOSS();

    if (utmCampaign === "cache-granular-controls") {
      upgradeHighlightProOption();
    }
  }

  if (sourcePlan === "starter") {
    upgradeUpdateForSourcePlanStarter();
  }
}

function upgradeHighlightProOption() {
  const $proCard = document.querySelector(".Pricing-Card.pro");
  $proCard.classList.add("highlight");

  const $recommendedForYou = Array.from($proCard.parentNode.children).find(
    (el) => el !== $proCard && el.classList.contains("recommended-for-you"),
  );

  $recommendedForYou.style.visibility = "visible";

  // If we will show only one button in Pro,
  // we need to remove the margin-bottom in Starter
  document.querySelector(".only").style.marginBottom = "0px";
}

function upgradeUpdateForSourcePlanStarter() {
  const starterCard = document.querySelector(".Pricing-Card.starter");
  const upgradeToStarterButton = upgradeGetUpgradeToStarterButton();

  const proCard = document.querySelector(".Pricing-Card.pro");
  const upgradeToProCloudButton = upgradeGetUpgradeToProCloudButton();

  const headline = document.querySelector("h1");
  const subheading = document.querySelector(".Pricing-Subheading");
  const starterTitle = starterCard.querySelector(".Pricing-Title");
  const starterTagline = starterCard.querySelector(".Pricing-Tagline");
  const proTagline = proCard.querySelector(".Pricing-Tagline");
  const starterIntro = starterCard.querySelector(".Pricing-Intro");
  const listItemToRemove = document
    .evaluate(
      "//p[contains(text(),'Your choice of')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    )
    .singleNodeValue.closest("li");

  headline.textContent = "Get the buttoned up version of the Metabase you love";

  subheading.textContent =
    "Advanced features for growing teams to keep things (even more) secure, organized, and under your control.";

  starterTitle.textContent = "BI Basics";

  starterCard.classList.add("current");

  upgradeToStarterButton.textContent = "Your current plan";

  upgradeToStarterButton.setAttribute("disabled", "true");

  upgradeToProCloudButton.href =
    "https://store.metabase.com/account#section=pro-trial";

  upgradeToProCloudButton.classList.remove("outline");

  starterTagline.textContent =
    "Starter gets you pretty far. As you grow, you may need more control over what people see and do";

  proTagline.textContent =
    "Sophisticated features for managing lots of people and compliance";

  starterIntro.textContent = "With Starter, you’ve got:";

  listItemToRemove.remove();

  upgradeHighlightProOption();

  document
    .querySelector(".Pricing-Card.pro .Pricing-CTA a.pro")
    .classList.add("hide");
}

function upgradeInitToggleBillingCycle() {
  document.querySelectorAll(".Pricing-Switcher a").forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      var container = document.querySelectorAll(".Pricing")[0];
      var currModel = container.className.match(/deploy-(.+)/)[1];

      const newModel =
        currModel == "monthly" ? "deploy-annually" : "deploy-monthly";

      container.className = container.className.replace(
        /deploy-(.+)/,
        newModel,
      );

      document
        .querySelectorAll(".plans-selection")
        .forEach(function(plansSelection) {
          if (newModel === "deploy-annually") {
            plansSelection.classList.add("annual");
            plansSelection.classList.remove("monthly");
          } else {
            plansSelection.classList.add("monthly");
            plansSelection.classList.remove("annual");
          }
        });
    });
  });
}

function upgradeUpdateLinksForSourcePlanOSS() {
  const upgradeToStarterButton = upgradeGetUpgradeToStarterButton();
  const upgradeToProSelfHostedButton = upgradeGetUpgradeToProSelfHostedButton();
  const upgradeToProCloudButton = upgradeGetUpgradeToProCloudButton();
  upgradeToStarterButton.href =
    "https://store.metabase.com/checkout/upgrade?plan=starter";
  upgradeToProSelfHostedButton.href =
    "https://store.metabase.com/checkout/upgrade?plan=pro&deployment=self-hosted";
  upgradeToProCloudButton.href =
    "https://store.metabase.com/checkout/upgrade?plan=pro&deployment=cloud";
}

function upgradeGetUpgradeToStarterButton() {
  return document.querySelector(".Pricing-CTA a.starter");
}

function upgradeGetUpgradeToProSelfHostedButton() {
  return document.querySelector(".Pricing-CTA a.pro");
}

function upgradeGetUpgradeToProCloudButton() {
  return document.querySelector(".Pricing-CTA a.pro-cloud");
}

function upgradeInitApplyTooltip() {
  const applyTT = document.querySelectorAll(".apply-tooltip");

  window.tippy(applyTT, {
    duration: [0, 0],
    placement: "auto",
    trigger: "mouseenter click",
    popperOptions: {
      strategy: "fixed",
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "right"],
          },
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: true,
            tether: false,
          },
        },
      ],
    },
  });
}
window.addEventListener("DOMContentLoaded", () => {
  upgradeUpdateElementsFromURLParams();
  upgradeInitToggleBillingCycle();
  upgradeInitApplyTooltip();
});
