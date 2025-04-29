// Instructions
//
// Basic usage:
// add class "tabs-with-timer" to the container
// have buttons with class "tabs-with-timer__button" which will correspond to the contents with class "tabs-with-timer__content"
//
// Loading page with a specific tab open:
// add attr "data-slug" to each button
// in the url, add ?start-at-tab=slug-of-the-button
// where "slug-of-the-button" is the value of the "data-slug" attr
//
// Disable autoplay:
// add attr "data-disable-autoplay" to the container
(function() {
  const HEADER_HEIGHT = document
    .querySelector(".navigation-header")
    .getBoundingClientRect().height;

  const TABS_WITH_TIMER_NAMESPACE = "tabs-with-timer";
  const TABS_DURATION_PREFIX_NAMESPACE = `${TABS_WITH_TIMER_NAMESPACE}__button--`;

  const TABS_WITH_TIMER_SELECTOR = `.${TABS_WITH_TIMER_NAMESPACE}`;
  const TABS_BUTTON_SELECTOR = `${TABS_WITH_TIMER_SELECTOR}__button`;
  const TABS_CONTENT_SELECTOR = `${TABS_WITH_TIMER_SELECTOR}__content`;

  const DEFAULT_DURATION = 30000;
  const READY_CLASS = "ready";
  const SELECTED_CLASS = "selected";

  var observer = new IntersectionObserver(function(entries) {
    const $video = entries[0].target;
    const $videoID = $video.id;
    var $videoPlayer = window.videojs($videoID);
    if (entries[0].isIntersecting === true) {
      $videoPlayer.ready(function() {
        if ($videoPlayer.paused()) {
          $videoPlayer.play();
        }
      });
    } else {
      $videoPlayer.ready(function() {
        $videoPlayer.pause();
      });
    }
  });

  function readyContent($buttons, $contents, selectedIndex) {
    $buttons.forEach(($button, index) => {
      if (index === selectedIndex) {
        $button.classList.add(READY_CLASS);
      } else {
        $button.classList.remove(READY_CLASS);
      }
    });

    $contents.forEach(($content, index) => {
      // create video player if any
      const $video = $content.querySelector(".autoplay-video");
      if ($video && !$content.videoPlayer) {
        $content.videoPlayer = window.videojs($video, {
          autoplay: false,
          controls: false,
          id: $video.id,
          loop: true,
          muted: true,
          playsinline: true,
          preload: "auto",
        });

        $content.videoPlayer.currentTime(0);
        observer.unobserve($video);
      }

      if (index === selectedIndex) {
        $content.classList.add(READY_CLASS);
      } else {
        $content.classList.remove(READY_CLASS);
      }
    });
  }

  function selectContent($buttons, $contents, selectedIndex, callback) {
    readyContent($buttons, $contents, selectedIndex);

    $buttons.forEach(($button, index) => {
      if (index === selectedIndex) {
        $button.classList.add(SELECTED_CLASS);
        $button.parentElement.classList.add(SELECTED_CLASS);
      } else {
        $button.classList.remove(SELECTED_CLASS);
        $button.parentElement.classList.remove(SELECTED_CLASS);
      }
    });

    $contents.forEach(($content, index) => {
      if (index === selectedIndex) {
        $content.classList.add(SELECTED_CLASS);
      } else {
        $content.classList.remove(SELECTED_CLASS);
      }
    });

    const $content = $contents[selectedIndex];

    // animation
    const $animation = $content.querySelector(".lottie-animation");
    if ($animation) {
      $animation.seek(0);
      $animation.play();
    }

    // video
    const $video = $content.querySelector(".autoplay-video");
    if ($video) {
      observer.observe($video);
    }

    // used for queueing next tabs
    if (callback && typeof callback === "function") {
      callback();
    }
  }

  const isTopInViewportOffset = 1;
  function isTopInViewport($node) {
    const rect = $node.getBoundingClientRect();
    return !!(Math.ceil(rect.top + isTopInViewportOffset) >= HEADER_HEIGHT);
  }

  document
    .querySelectorAll(TABS_WITH_TIMER_SELECTOR)
    .forEach(($tabsWithTimerComponent) => {
      const $buttons = $tabsWithTimerComponent.querySelectorAll(
        TABS_BUTTON_SELECTOR,
      );

      const $contents = $tabsWithTimerComponent.querySelectorAll(
        TABS_CONTENT_SELECTOR,
      );

      if ($buttons.length !== $contents.length) {
        console.error("Tabs with timer: tabs and contents are not matching");
      }

      // ready first content
      readyContent($buttons, $contents, 0);

      // queue
      let timeout = null;
      function queueCallback(callback, duration = DEFAULT_DURATION) {
        if ($tabsWithTimerComponent.hasAttribute("data-disable-autoplay")) {
          return;
        }

        if (timeout) {
          clearTimeout(timeout);
        }

        if (callback) {
          timeout = setTimeout(callback, duration);
        }
      }

      function queueContent(index) {
        // duration
        const $button = $buttons[index];
        if ($button) {
          const durationClassName = $button.className
            .split(" ")
            .find(
              (theClass) =>
                theClass.indexOf(TABS_DURATION_PREFIX_NAMESPACE) === 0,
            );
          let duration = null;
          if (durationClassName) {
            duration =
              parseInt(
                durationClassName.replace(TABS_DURATION_PREFIX_NAMESPACE, ""),
              ) * 1000;
          }

          // select content
          selectContent(
            $buttons,
            $contents,
            index,
            // queue next content
            queueCallback(() => {
              const selectedIndex =
                index === $buttons.length - 1 ? 0 : index + 1;
              queueContent(selectedIndex);
            }, duration || DEFAULT_DURATION),
          );
        } else {
          console.warn(
            `${TABS_WITH_TIMER_NAMESPACE} error: undefined button at index ${index}`,
          );
        }
      }

      // click
      $buttons.forEach(($button, index) => {
        $button.addEventListener("click", () => {
          queueContent(index);
        });
      });

      function startAtTab() {
        const urlParams = new URLSearchParams(window.location.search);
        const tabToStart = urlParams.get("start-at-tab");

        if (tabToStart) {
          const $tabToStart = document.querySelector(
            `button[data-slug=${tabToStart}]`,
          );

          if ($tabToStart) {
            $tabToStart.click();
            return;
          }
        }

        queueContent(0);
      }

      // window
      function onScroll() {
        const areTabsInViewport = isTopInViewport($tabsWithTimerComponent);
        if (areTabsInViewport) {
          document.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          startAtTab();
        }
      }
      document.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onScroll);
      window.addEventListener("DOMContentLoaded", () => {
        startAtTab();
      });
    });
})();
