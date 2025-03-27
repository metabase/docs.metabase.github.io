/* -- Sticky Menu -- */
function stickyHeader() {
  var $header = document.getElementById("stickyNav");
  if ($header) {
    // offset position of navbar
    var sticky = $header.offsetTop + 75;

    if (window.pageYOffset > sticky) {
      $header.classList.add("sticky-nav");
      document.getElementsByTagName("body")[0].style.padding = "400px 0 0 0";
    } else {
      $header.classList.remove("sticky-nav");
      document.getElementsByTagName("body")[0].style.padding = "80px 0 0 0";
    }
  }
}

/* -- Mobile Tabs -- */
("use strict");
function Tabs() {
  var bindAll = function() {
    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < menuElements.length; i++) {
      menuElements[i].addEventListener("click", change, false);
    }
  };

  var clear = function() {
    const menuElements = document.querySelectorAll("[data-tab]");
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove("active");
    }
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    const tiers = document.getElementsByClassName("tier-content");
    for (let i = 0; i < tiers.length; i++) {
      tiers[i].classList.remove("active");
    }
  };
  var change = function(e) {
    e.preventDefault();
    clear();
    e.target.classList.add("active");

    var id = e.currentTarget.getAttribute("data-tab");
    var arr = id;
    var prefix = "tab-";
    arr = arr.replace(prefix, "");
    var content = document.getElementsByClassName(arr);
    for (var i = 0; i < content.length; i++) {
      content[i].classList.add("active");
    }
  };
  bindAll();
}
new Tabs();

/* -- Sticky Mobile Menu -- */
function stickyTabs() {
  var $header = document.getElementById("stickyMobile");
  if ($header) {
    // offset position of navbar
    var sticky = $header.offsetTop;

    if (window.pageYOffset > sticky) {
      $header.classList.add("sticky-nav");
    } else {
      $header.classList.remove("sticky-nav");
    }
  }
}

/* Initiate Functions */
window.onscroll = function() {
  if (window.innerWidth >= 768) {
    stickyHeader();
  } else {
    stickyTabs();
  }
};

document.addEventListener("DOMContentLoaded", function() {
  /* -- Sticky Mobile Menu -- */
  if (window.innerWidth < 768) {
    /* first active default tab */
    var $tabPricingTierOSS = document.getElementById("tab-pricing-tier-oss");
    if ($tabPricingTierOSS) {
      $tabPricingTierOSS.classList.add("active");
    } else {
      window.Sentry.captureMessage("`#tab-pricing-tier-oss` not found");
    }

    var menuElements = document.querySelectorAll("[data-tab]");
    for (var i = 0; i < 1; i++) {
      menuElements[i].classList.add("active");
    }

    var activeCells = document.getElementsByClassName("pricing-tier-oss");
    for (var t = 0; t < activeCells.length; t++) {
      activeCells[t].classList.add("active");
    }

    new Tabs();
  }
});
