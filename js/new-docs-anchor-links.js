function htmlToElement(html) {
  const $template = document.createElement("template");
  html = html.trim();
  $template.innerHTML = html;
  return $template.content.firstChild;
}

function addCopyToClipboardLogic($element, link) {
  const copyToClipboardWrapper = $element.querySelector(
    ".copy-to-clipboard-wrapper",
  );
  const copiedToClipboardWrapper = $element.querySelector(
    ".copied-to-clipboard-wrapper",
  );
  let copyToClipboardTimeout = null;
  let copyToClipboardFadeTimeout = null;

  $element.addEventListener("mouseenter", function() {
    copyToClipboardWrapper.classList.remove("invisible");
    copyToClipboardWrapper.style.opacity = "1";
  });
  $element.addEventListener("mouseleave", function() {
    copyToClipboardWrapper.classList.add("invisible");
    copyToClipboardWrapper.style.opacity = "0";
  });

  $element.onclick = function(event) {
    event.preventDefault();
    navigator.clipboard.writeText(link);

    if (copyToClipboardTimeout) {
      clearTimeout(copyToClipboardTimeout);
      clearTimeout(copyToClipboardFadeTimeout);
      copyToClipboardTimeout = null;
      copyToClipboardFadeTimeout = null;
    }
    copyToClipboardWrapper.classList.add("invisible");
    copyToClipboardWrapper.style.opacity = "0";

    copiedToClipboardWrapper.classList.remove("invisible");
    copiedToClipboardWrapper.style.opacity = "1";
    copyToClipboardTimeout = setTimeout(function() {
      copiedToClipboardWrapper.classList.add("invisible");
    }, 1200);
    copyToClipboardFadeTimeout = setTimeout(function() {
      copiedToClipboardWrapper.style.opacity = "0";
    }, 1000);
  };
}

const copyToClipboardHTML =
  '<a class="copy-clip position-relative d-flex justify-content-center ms-2 hover-pointer" title="Copy to clipboard">\n' +
  '                           <svg class="share-button" width="32" height="32" viewBox="0 0 32 32" fill="#C6C9D2" xmlns="http://www.w3.org/2000/svg">\n' +
  '                               <path fill-rule="evenodd" clip-rule="evenodd" d="M19.2939 9.17106C19.5246 8.93228 19.8004 8.74183 20.1054 8.61081C20.4104 8.47978 20.7385 8.41082 21.0704 8.40793C21.4024 8.40505 21.7316 8.4683 22.0388 8.59401C22.3461 8.71971 22.6252 8.90534 22.8599 9.14007C23.0947 9.3748 23.2803 9.65393 23.406 9.96117C23.5317 10.2684 23.595 10.5976 23.5921 10.9296C23.5892 11.2615 23.5202 11.5896 23.3892 11.8946C23.2582 12.1996 23.0677 12.4754 22.8289 12.7061L19.0789 16.4561C18.6101 16.9247 17.9744 17.188 17.3114 17.188C16.6485 17.188 16.0128 16.9247 15.5439 16.4561C15.3082 16.2284 14.9924 16.1024 14.6647 16.1052C14.3369 16.1081 14.0234 16.2395 13.7917 16.4713C13.5599 16.703 13.4284 17.0166 13.4256 17.3443C13.4228 17.6721 13.5487 17.9878 13.7764 18.2236C14.7141 19.1609 15.9856 19.6875 17.3114 19.6875C18.6373 19.6875 19.9088 19.1609 20.8464 18.2236L24.5964 14.4736C25.5072 13.5305 26.0112 12.2675 25.9998 10.9566C25.9884 9.64557 25.4626 8.39151 24.5355 7.46447C23.6085 6.53743 22.3544 6.01158 21.0434 6.00019C19.7325 5.9888 18.4695 6.49277 17.5264 7.40356L15.6514 9.27856C15.5321 9.39387 15.4368 9.5318 15.3713 9.6843C15.3058 9.83681 15.2713 10.0008 15.2699 10.1668C15.2684 10.3328 15.3001 10.4974 15.3629 10.651C15.4258 10.8046 15.5186 10.9442 15.6359 11.0616C15.7533 11.1789 15.8929 11.2717 16.0465 11.3346C16.2001 11.3974 16.3647 11.4291 16.5307 11.4276C16.6967 11.4262 16.8607 11.3917 17.0132 11.3262C17.1657 11.2607 17.3036 11.1654 17.4189 11.0461L19.2939 9.17106ZM13.0439 15.4211C13.5128 14.9524 14.1485 14.6891 14.8114 14.6891C15.4744 14.6891 16.1101 14.9524 16.5789 15.4211C16.6942 15.5404 16.8322 15.6357 16.9847 15.7012C17.1372 15.7667 17.3012 15.8012 17.4672 15.8026C17.6332 15.8041 17.7978 15.7724 17.9514 15.7096C18.105 15.6467 18.2446 15.5539 18.3619 15.4366C18.4793 15.3192 18.5721 15.1796 18.635 15.026C18.6978 14.8724 18.7294 14.7078 18.728 14.5418C18.7266 14.3758 18.6921 14.2118 18.6266 14.0593C18.5611 13.9068 18.4658 13.7689 18.3464 13.6536C17.4088 12.7162 16.1373 12.1896 14.8114 12.1896C13.4856 12.1896 12.2141 12.7162 11.2764 13.6536L7.52644 17.4036C7.04889 17.8648 6.66798 18.4165 6.40593 19.0265C6.14389 19.6366 6.00596 20.2927 6.00019 20.9566C5.99442 21.6205 6.12093 22.2788 6.37233 22.8933C6.62374 23.5078 6.995 24.0661 7.46447 24.5355C7.93393 25.005 8.49219 25.3763 9.10667 25.6277C9.72115 25.8791 10.3796 26.0056 11.0434 25.9998C11.7073 25.994 12.3634 25.8561 12.9735 25.5941C13.5835 25.332 14.1352 24.9511 14.5964 24.4736L16.4714 22.5986C16.5908 22.4833 16.6861 22.3453 16.7516 22.1928C16.8171 22.0403 16.8516 21.8763 16.853 21.7103C16.8544 21.5443 16.8228 21.3797 16.76 21.2261C16.6971 21.0725 16.6043 20.9329 16.4869 20.8156C16.3696 20.6982 16.23 20.6054 16.0764 20.5425C15.9228 20.4797 15.7582 20.4481 15.5922 20.4495C15.4262 20.4509 15.2622 20.4854 15.1097 20.5509C14.9572 20.6164 14.8192 20.7117 14.7039 20.8311L12.8289 22.7061C12.5983 22.9448 12.3225 23.1353 12.0175 23.2663C11.7124 23.3973 11.3844 23.4663 11.0524 23.4692C10.7205 23.4721 10.3913 23.4088 10.0841 23.2831C9.77682 23.1574 9.49769 22.9718 9.26295 22.737C9.02822 22.5023 8.84259 22.2232 8.71689 21.9159C8.59118 21.6087 8.52793 21.2795 8.53082 20.9476C8.5337 20.6156 8.60267 20.2876 8.73369 19.9825C8.86471 19.6775 9.05517 19.4017 9.29394 19.1711L13.0439 15.4211Z"/>\n' +
  "                           </svg> \n" +
  '                            <div class="copy-to-clipboard-wrapper visible invisible">\n' +
  '                                <div class="caret"></div>\n' +
  '                                <div class="copied-to-clipboard">Copy link to this section</div>\n' +
  "                            </div>\n" +
  '                            <div class="copied-to-clipboard-wrapper visible invisible">\n' +
  '                                <div class="caret"></div>\n' +
  '                                <div class="copied-to-clipboard">Copied to clipboard</div>\n' +
  "                            </div>\n" +
  "                        </a>";

function hasParentLink($node) {
  var $parent = $node.parentNode;
  if (!$parent) {
    return false;
  }

  var nodeName = $parent.nodeName.toLowerCase();
  if (nodeName === "a") {
    return true;
  } else if (nodeName === "body") {
    return false;
  }

  return hasParentLink($parent);
}

document.querySelectorAll("h2, h3").forEach(($header) => {
  const linkHash = `#${$header.id}`;
  const isWrappedInLink = hasParentLink($header);

  const $parent = $header.parentNode;

  const $wrapper = document.createElement("div");
  $wrapper.classList.add("copy-clip-container", $header.tagName.toLowerCase());
  $parent.replaceChild($wrapper, $header);

  $wrapper.appendChild($header);

  // headings with links don't get bottom borders
  if (isWrappedInLink || $header.innerHTML.indexOf("<a ") > -1) {
    $wrapper.classList.add("no-border-bottom");
  }

  const $copyToClipboardElement = htmlToElement(copyToClipboardHTML);
  $wrapper.appendChild($copyToClipboardElement);

  const link = getLink($copyToClipboardElement, linkHash);

  addCopyToClipboardLogic($copyToClipboardElement, link);

  const headerMarginBottom = window.getComputedStyle($header).marginBottom;
  $copyToClipboardElement.style.setProperty(
    "margin-bottom",
    headerMarginBottom,
  );
});

function getLink(element, linkHash) {
  const isSearchResult = element.closest("#search-results");

  if (isSearchResult) {
    return element.closest("li").querySelector("a").href;
  }

  return location.href.indexOf("#") > -1
    ? location.href.replace(location.hash, linkHash)
    : `${location.href}${linkHash}`;
}
