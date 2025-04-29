(function() {
  const HASH = "#";

  const TOC_CLASS = "toc";
  const TOC_SELECTOR = `.${TOC_CLASS}`;

  const TITLE_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const POSITION_TOP = 100;

  // main wrapper
  const $tableOfContentsWrapper = document.querySelector(TOC_SELECTOR);
  if (!$tableOfContentsWrapper) {
    console.error(
      `Table of contents, missing container with CSS class: ${TOC_SELECTOR}`,
    );
    return;
  }

  // get all anchor links
  const $anchorLinks = Array.from(
    $tableOfContentsWrapper.querySelectorAll(
      TITLE_TAGS.map((titleTag) => `${titleTag} > a`).join(", "),
    ),
  ).filter(($link) => {
    try {
      const linkHash = getHash($link);
      return !!$tableOfContentsWrapper.querySelector(linkHash);
    } catch (err) {
      console.error(err);
    }

    return false;
  });
  if ($anchorLinks.length === 0) {
    return;
  }

  // utils
  function getHash($link) {
    const linkHref = $link.href || "";
    const linkHrefSplit = linkHref.split(HASH);
    return `${HASH}${linkHrefSplit[linkHrefSplit.length - 1]}`;
  }
  function createList() {
    const $tableOfContentsList = document.createElement("ul");
    $tableOfContentsList.classList.add("table-of-contents__list");
    return $tableOfContentsList;
  }
  function createListItem($anchorLink) {
    const $tableOfContentsListItem = document.createElement("li");
    $tableOfContentsListItem.classList.add("table-of-contents__list__item");
    const $tableOfContentsP = document.createElement("p");
    $tableOfContentsP.classList.add("table-of-contents__text");
    const $anchorLinkClone = $anchorLink.cloneNode(true);
    $tableOfContentsP.appendChild($anchorLinkClone);
    $tableOfContentsListItem.appendChild($tableOfContentsP);
    return $tableOfContentsListItem;
  }
  function getParentNode($node, depth = 1) {
    if (depth === 0) {
      return $node;
    }

    return getParentNode($node.parentNode, depth - 1);
  }

  // viewport
  const isInViewportOffset = 1;
  function isInViewport($node) {
    const rect = $node.getBoundingClientRect();
    return (
      Math.ceil(rect.top + isInViewportOffset) >= POSITION_TOP &&
      rect.left >= 0 &&
      Math.floor(rect.bottom - isInViewportOffset) <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // scroll Y
  let cancelScrollIntoView = null;
  function scrollYTo($node, callback) {
    if (cancelScrollIntoView) {
      cancelScrollIntoView();
    }

    cancelScrollIntoView = scrollIntoView(
      $node,
      {
        align: {
          left: 0,
          top: 0,
          topOffset: POSITION_TOP,
        },
        cancellable: true,
        time: 500,
        maxSynchronousAlignments: 1,
      },
      callback,
    );
  }

  // toc component
  const $tableOfContentsContainer = document.createElement("nav");
  $tableOfContentsContainer.classList.add("container");
  $tableOfContentsContainer.classList.add("table-of-contents");
  $tableOfContentsContainer.classList.add("col-3");
  $tableOfContentsContainer.classList.add("d-none");
  $tableOfContentsContainer.classList.add("d-lg-inline-block");
  const $tableOfContentsTitle = document.createElement("h4");
  $tableOfContentsTitle.classList.add("table-of-contents__title");
  $tableOfContentsTitle.innerHTML = "Table of contents";
  $tableOfContentsContainer.appendChild($tableOfContentsTitle);
  $tableOfContentsWrapper.appendChild($tableOfContentsContainer);

  const TOC_DEPTH_SELECTOR = `${TOC_CLASS}--`;
  const tocDepthClassName = Array.from($tableOfContentsWrapper.classList).find(
    (className) =>
      className.indexOf(TOC_DEPTH_SELECTOR) === 0 &&
      className.length > TOC_DEPTH_SELECTOR.length,
  );
  const tocDepth = tocDepthClassName
    ? parseInt(tocDepthClassName.replace(TOC_DEPTH_SELECTOR, ""))
    : Number.MAX_SAFE_INTEGER;

  // build table of contents
  let $currentListItem = $tableOfContentsContainer; // root
  let $currentList = null;
  let currentDepth = 0;
  $anchorLinks
    .map(($anchorLink) => ({
      depth: TITLE_TAGS.indexOf(
        getParentNode($anchorLink).tagName.toLowerCase(),
      ),
      $anchorLink,
    }))
    .forEach(({ depth, $anchorLink }) => {
      if (depth <= tocDepth) {
        const $tableOfContentsListItem = createListItem($anchorLink);

        if (depth > currentDepth) {
          $currentList = createList();
          $currentListItem.appendChild($currentList);
        } else if (depth < currentDepth) {
          const $newCurrentList = getParentNode(
            $currentListItem,
            currentDepth - depth + 2,
          );
          $currentList =
            $newCurrentList.tagName.toLowerCase() === "ul"
              ? $newCurrentList
              : $currentList;
        }

        $currentList.appendChild($tableOfContentsListItem);
        $currentListItem = $tableOfContentsListItem;
      }

      currentDepth = depth;
    });

  // click
  const $anchorLinksInTOC = $anchorLinks
    .map(($anchorLink) => {
      const linkHash = getHash($anchorLink);
      const $tocAnchorLink = $tableOfContentsContainer.querySelector(
        `a[href="${linkHash}"]`,
      );
      if ($tocAnchorLink) {
        $tocAnchorLink.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const $anchorLinkTitle = getParentNode($anchorLink);
          scrollYTo($anchorLinkTitle, () => {
            if (history.pushState) {
              history.pushState(null, null, linkHash);
            } else {
              window.location.hash = linkHash;
            }
          });
        });
        return $anchorLink;
      }
      return null;
    })
    .filter(($tocAnchorLink) => !!$tocAnchorLink);

  // update rects
  let tableOfContentsWrapperRect = null;
  let tableOfContentsContainerRect = null;
  let bodyRect = null;
  function updateRects() {
    tableOfContentsWrapperRect = $tableOfContentsWrapper.getBoundingClientRect();
    tableOfContentsContainerRect = $tableOfContentsContainer.getBoundingClientRect();
    bodyRect = document.body.getBoundingClientRect();
  }

  // scroll
  let $currentSelectedListItem = null;
  function onScroll() {
    updateRects();

    // sticky top
    if (tableOfContentsWrapperRect.top < POSITION_TOP) {
      if ($tableOfContentsContainer.style.position !== "fixed") {
        $tableOfContentsContainer.style.left = `${tableOfContentsWrapperRect.left -
          bodyRect.left}px`;
        $tableOfContentsContainer.style.position = "fixed";
        $tableOfContentsContainer.style.top = `${POSITION_TOP}px`;
      }
    } else {
      if ($tableOfContentsContainer.style.position !== "absolute") {
        $tableOfContentsContainer.style.left = `0px`;
        $tableOfContentsContainer.style.position = "absolute";
        $tableOfContentsContainer.style.top = `0px`;
      }
    }

    // sticky bottom
    const tableOfContentsWrapperBottom =
      tableOfContentsWrapperRect.top + tableOfContentsWrapperRect.height;
    const containerOffsetBottom =
      tableOfContentsWrapperBottom - bottomLimitOffsetY;
    const containerOffsetBottomToAdd = Math.min(containerOffsetBottom, 0);
    $tableOfContentsContainer.style.transform = `translateY(${containerOffsetBottomToAdd}px)`;

    // selected
    const $visibleAnchorLinks = $anchorLinksInTOC.filter(isInViewport);
    if ($visibleAnchorLinks.length > 0) {
      // current link
      const [$firstVisibleAnchorLinks] = $visibleAnchorLinks;
      const firstAnchorLinkHash = getHash($firstVisibleAnchorLinks);
      const $selectedAnchorLink = $tableOfContentsContainer.querySelector(
        `a[href="${firstAnchorLinkHash}"]`,
      );
      if ($selectedAnchorLink) {
        const $selectedListItem = getParentNode($selectedAnchorLink, 2);

        // remove selected classes
        if (
          $currentSelectedListItem &&
          $currentSelectedListItem !== $selectedListItem
        ) {
          $currentSelectedListItem.classList.remove("selected");
          const $currentSelectedListItemParent = getParentNode(
            $currentSelectedListItem,
            2,
          );
          $currentSelectedListItemParent.classList.remove("selected-parent");
        }

        // add selected classes
        $selectedListItem.classList.add("selected");
        $currentSelectedListItem = $selectedListItem;
        const $currentSelectedListItemParent = getParentNode(
          $currentSelectedListItem,
          2,
        );
        if ($currentSelectedListItemParent.nodeName.toLowerCase() === "li") {
          $currentSelectedListItemParent.classList.add("selected-parent");
        }
      }
    }
  }
  document.addEventListener("scroll", onScroll);

  // resize
  let bottomLimitOffsetY = null;
  function onResize() {
    updateRects();

    // offset
    bottomLimitOffsetY = POSITION_TOP + tableOfContentsContainerRect.height;

    // scroll
    onScroll();
  }
  window.addEventListener("resize", onResize);

  // initialize
  onResize();
})();
