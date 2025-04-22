const observer = new IntersectionObserver(function(entries) {
  const $video = entries[0].target;
  const videoPlayer = window.videojs.getPlayer($video.id);

  // play
  if (entries[0].isIntersecting === true) {
    // rewind
    try {
      videoPlayer.currentTime(0);
    } catch (err) {
      console.warn("Cannot rewind video");
    }

    // play
    videoPlayer
      .play()
      .then(() => {
        // Nothing atm
      })
      .catch(() => {
        console.warn("Video cannot start:", $video.id);
      });
  }
  // pause
  else {
    try {
      videoPlayer.pause();
    } catch (err) {
      console.warn("Cannot pause video");
    }
  }
});

if (!iOS()) {
  document.querySelectorAll(".pause-observer").forEach(($video) => {
    if ($video.id) {
      window.videojs(
        $video,
        {
          autoplay: false,
          controls: false,
          id: $video.id,
          loop: true,
          muted: true,
          preload: "auto",
        },
        () => {
          observer.observe(document.querySelector(`#${$video.id}`));
        },
      );
    } else {
      console.error("Video tag is missing a unique id");
      console.error($video);
    }
  });
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}
