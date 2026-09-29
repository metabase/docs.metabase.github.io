(function() {
  const $tables = document.querySelectorAll("table");

  // resize
  function onResize() {
    $tables.forEach(($table) => {
      const $container = $table.parentNode;
      const $wrapper = $container.parentNode;

      // overflow gradient
      if (
        $container.getBoundingClientRect().width <
        $table.getBoundingClientRect().width
      ) {
        $wrapper.classList.add("table-overflow-indicator");
      } else {
        $wrapper.classList.remove("table-overflow-indicator");
      }
    });
  }

  // setup
  $tables.forEach(($table) => {
    const $parent = $table.parentNode;

    // table position
    const tableIndex = Array.prototype.indexOf.call($parent.children, $table);
    const $nextChild = $parent.children[tableIndex];

    // wrapper
    const $wrapper = document.createElement("div");
    $wrapper.classList.add("position-relative");
    $parent.insertBefore($wrapper, $nextChild);

    // container
    const $container = document.createElement("div");
    $container.classList.add("mw-100");
    $container.classList.add("table-overflow");
    $wrapper.appendChild($container);
    $container.appendChild($table);

    // table styles
    $table.classList.add("mb-0");
  });
  window.addEventListener("resize", onResize);
  onResize();
})();
