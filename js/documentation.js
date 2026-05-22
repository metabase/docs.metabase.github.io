(function() {
  contentLoaded(window, function() {
    function wrapNode(node) {
      var parent = node.parentNode;

      var wrapper = document.createElement('div');
      var aspectWrapper = document.createElement('div');

      wrapper.classList.add('js-zoom-effect');
      aspectWrapper.classList.add('aspectRatioPlaceholder');

      parent.replaceChild(wrapper, node);
      // set element as child of wrapper
      wrapper.appendChild(aspectWrapper);
      aspectWrapper.appendChild(node);
      return wrapper;
    }

    function lightboxify(img) {
      var w = img.naturalWidth;
      var h = img.naturalHeight;

      img.setAttribute('data-width', w);
      img.setAttribute('data-height', h);
      wrapNode(img);
    }

    var images = document.querySelectorAll('.MB-Page.ZoomImages img:not(.no-zoom)');
    var tables = document.querySelectorAll('.MB-Post table');

    function wrapTable(table) {
      var parent = table.parentNode;

      var wrapper = document.createElement('div');
      wrapper.classList.add('MB-PostTableWrapper');

      parent.replaceChild(wrapper, table);
      wrapper.appendChild(table);
      return wrapper;
    }

    Array.prototype.slice.call(tables).forEach(function(t) {
      wrapTable(t);
    });

    Array.prototype.slice.call(images).forEach(function(img) {
      if (img.complete) {
        lightboxify(img);
      } else {
        img.addEventListener('load', function() {
          lightboxify(img);
        });
      }
    });

    // i am the worst
    setTimeout(function() {
      MediumLightbox('.js-zoom-effect');
    }, 1000);
  });
})();
