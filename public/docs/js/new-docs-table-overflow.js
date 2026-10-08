// Wide tables. Each table gets a scroll container. When the table is wider
// than the article, a shadow on the right edge shows while columns are
// hidden, the first column sticks (with a shadow once scrolled), and an
// "Expand table" button opens it in a full-window dialog, where the header
// row sticks too. The table moves into the dialog and back, so its ids and
// listeners stay single. src/styles/docs.css styles all of it, keyed on
// .table-overflow-indicator and data-scroll.
(function() {
  // public/docs/images/expand.svg, the image zoom's icon.
  const EXPAND_ICON =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0V5.85945L9.84936 3.70905L7.55816 6L6.00003 4.44204L8.29123 2.15109L6.13991 0H12ZM0 12H5.85962L3.70863 9.84901L5.99988 7.55775L4.44193 5.9998L2.15067 8.29105L0 6.14038V12Z"/>' +
    "</svg>";

  // Metabase's close icon, as in src/lib/markdown/plugins/statusIconHastPlugin.ts.
  const CLOSE_ICON =
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M4.53 3.47a.75.75 0 0 0-1.06 1.06L6.94 8l-3.47 3.47a.75.75 0 1 0 1.06 1.06L8 9.06l3.47 3.47a.75.75 0 1 0 1.06-1.06L9.06 8l3.47-3.47a.75.75 0 0 0-1.06-1.06L8 6.94 4.53 3.47z"/>' +
    "</svg>";

  const tables = [];
  let dialogCount = 0;

  // "none" when nothing is hidden, else which end the scroll is at.
  function updateScrollState(scroller, target) {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const left = scroller.scrollLeft;
    let state = "middle";
    if (max <= 1) {
      state = "none";
    } else if (left <= 1) {
      state = "start";
    } else if (left >= max - 1) {
      state = "end";
    }
    target.dataset.scroll = state;
  }

  function trackScroll(scroller, target) {
    scroller.addEventListener(
      "scroll",
      function() {
        updateScrollState(scroller, target);
      },
      { passive: true },
    );
  }

  function isOpen(record) {
    return record.dialog !== null && record.dialog.open;
  }

  // A named tab stop while the table scrolls, so the arrow keys can scroll a
  // table with no links in it. Safari doesn't make scrollers focusable.
  function setScrollRegion(record, scrolls) {
    const container = record.container;
    if (scrolls) {
      container.tabIndex = 0;
      container.setAttribute("role", "region");
      container.setAttribute(
        "aria-label",
        record.title ? `Table: ${record.title}` : "Table",
      );
    } else {
      container.removeAttribute("tabindex");
      container.removeAttribute("role");
      container.removeAttribute("aria-label");
    }
  }

  function update() {
    tables.forEach(function(record) {
      if (isOpen(record)) {
        // Phones and the band beside the sidebar stack tables into cards
        // (src/styles/docs.css); a turned tablet can land there with the
        // dialog open.
        if (getComputedStyle(record.table.rows[0]).display !== "table-row") {
          record.dialog.close();
        } else {
          updateScrollState(record.scroller, record.body);
        }
        return;
      }

      const overflows =
        record.container.scrollWidth > record.container.clientWidth + 1;
      record.wrapper.classList.toggle("table-overflow-indicator", overflows);
      setScrollRegion(record, overflows);
      if (record.toolbar) {
        record.toolbar.hidden = !overflows;
      }
      updateScrollState(record.container, record.wrapper);
    });
  }

  // Web fonts load after this runs and rewrap the cells, so watch each
  // scroller rather than the window.
  const resizeObserver = new ResizeObserver(update);

  // The nearest heading above the table names it. new-docs-anchor-links.js
  // has already wrapped the h2s and h3s.
  function findTitle(element) {
    for (
      let sibling = element.previousElementSibling;
      sibling;
      sibling = sibling.previousElementSibling
    ) {
      if (sibling.matches("h2, h3, h4")) {
        return sibling.textContent.trim();
      }
      if (sibling.matches(".copy-clip-container")) {
        return sibling.firstElementChild.textContent.trim();
      }
    }
    return "";
  }

  function createDialog(record) {
    const dialog = document.createElement("dialog");
    const header = document.createElement("div");
    const title = document.createElement("div");
    const closeButton = document.createElement("button");
    const body = document.createElement("div");
    const scroller = document.createElement("div");

    dialogCount += 1;
    title.id = `table-expand-title-${dialogCount}`;
    title.className = "table-expand-title";
    title.textContent = record.title || "Table";

    closeButton.type = "button";
    closeButton.className = "table-expand-close";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.autofocus = true;
    closeButton.innerHTML = CLOSE_ICON;

    header.className = "table-expand-header";
    header.append(title, closeButton);

    body.className = "table-expand-body";
    scroller.className = "table-expand-scroll";
    // The dialog's title names it, as setScrollRegion() does in the article.
    scroller.tabIndex = 0;
    body.appendChild(scroller);

    dialog.className = "table-expand-dialog";
    dialog.setAttribute("aria-labelledby", title.id);
    dialog.append(header, body);

    closeButton.addEventListener("click", function() {
      dialog.close();
    });

    // The content fills the dialog, so a click that lands on the dialog
    // itself came from the backdrop. The press must start there too: a text
    // selection dragged out of the table ends on the backdrop as well.
    let pressedBackdrop = false;
    dialog.addEventListener("pointerdown", function(event) {
      pressedBackdrop = event.target === dialog;
    });
    dialog.addEventListener("click", function(event) {
      if (pressedBackdrop && event.target === dialog) {
        dialog.close();
      }
    });

    // Escape closes it natively; every way out ends here.
    dialog.addEventListener("close", function() {
      record.container.appendChild(record.table);
      record.container.style.height = "";
      update();
      if (!record.toolbar.hidden) {
        record.button.focus({ preventScroll: true });
      }
    });

    trackScroll(scroller, body);
    resizeObserver.observe(scroller);

    // Inside the wrapper, so the table keeps the article's table styles; a
    // direct child of .docs-prose would get its max-width.
    record.wrapper.appendChild(dialog);

    record.dialog = dialog;
    record.body = body;
    record.scroller = scroller;
  }

  function openDialog(record) {
    if (!record.dialog) {
      createDialog(record);
    }

    // Hold the table's place, so the page behind doesn't move, and drop the
    // empty place's shadow and tab stop until it comes back.
    record.container.style.height = `${record.container.offsetHeight}px`;
    record.wrapper.dataset.scroll = "none";
    setScrollRegion(record, false);
    record.scroller.appendChild(record.table);
    record.dialog.showModal();
    record.scroller.scrollTo(0, 0);
    updateScrollState(record.scroller, record.body);
  }

  function addExpandButton(record) {
    const toolbar = document.createElement("div");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "table-expand-button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute(
      "aria-label",
      record.title ? `Expand table: ${record.title}` : "Expand table",
    );
    button.innerHTML = `${EXPAND_ICON}<span>Expand table</span>`;
    button.addEventListener("click", function() {
      openDialog(record);
    });

    // Shown by update() while the table overflows.
    toolbar.className = "table-toolbar";
    toolbar.hidden = true;
    toolbar.appendChild(button);
    record.wrapper.parentNode.insertBefore(toolbar, record.wrapper);

    record.toolbar = toolbar;
    record.button = button;
  }

  // setup
  document.querySelectorAll("table").forEach(function(table) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("position-relative");
    table.parentNode.insertBefore(wrapper, table);

    const container = document.createElement("div");
    container.classList.add("mw-100", "table-overflow");
    wrapper.appendChild(container);
    container.appendChild(table);

    const record = {
      table,
      container,
      wrapper,
      title: findTitle(wrapper),
      toolbar: null,
      button: null,
      dialog: null,
      body: null,
      scroller: null,
    };
    tables.push(record);
    trackScroll(container, wrapper);

    // The toolbar and the dialog are styled for the article only.
    if (table.closest(".docs-prose")) {
      addExpandButton(record);
    }

    resizeObserver.observe(container);
  });
})();
