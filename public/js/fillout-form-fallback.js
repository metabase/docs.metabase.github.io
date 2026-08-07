function initFilloutFormFallback() {
  const filloutContainers = document.querySelectorAll("[data-fillout-id]");

  if (filloutContainers.length === 0) {
    return;
  }

  filloutContainers.forEach((container) => {
    let fallbackContainer = container.nextElementSibling;
    if (
      !fallbackContainer ||
      !fallbackContainer.classList.contains("fillout-fallback")
    ) {
      fallbackContainer = document.createElement("div");
      fallbackContainer.className = "fillout-fallback";
      fallbackContainer.style.display = "none";

      const computedStyle = window.getComputedStyle(container);
      fallbackContainer.style.width =
        container.style.width || computedStyle.width || "100%";
      fallbackContainer.style.height =
        container.style.height || computedStyle.height || "500px";
      if (container.style.marginLeft) {
        fallbackContainer.style.marginLeft = container.style.marginLeft;
      }

      // Get email from data attribute or default to sales@metabase.com
      const email = "sales@metabase.com";
      const fallbackText = "Unable to load form. Please contact us directly:";

      fallbackContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 2rem; text-align: center;">
          <p style="margin-bottom: 1rem; color: #333;">${fallbackText}</p>
          <a href="mailto:${email}" style="font-size: 1.125rem; font-weight: 600; color: #509ee3; text-decoration: none;">
            ${email}
          </a>
        </div>
      `;

      container.parentNode.insertBefore(
        fallbackContainer,
        container.nextSibling,
      );
    }

    // Track if form loaded successfully
    let formLoaded = false;
    let errorDetected = false;
    const startTime = Date.now();

    // Strategy 1: Check for iframe load
    const checkForIframe = setInterval(() => {
      const iframe = container.querySelector("iframe");
      if (iframe) {
        // Iframe exists - check if it's actually loaded
        iframe.addEventListener("load", () => {
          formLoaded = true;
          clearInterval(checkForIframe);
        });

        // Also check for error on iframe
        iframe.addEventListener("error", () => {
          if (!formLoaded) {
            errorDetected = true;
            clearInterval(checkForIframe);
            showFallback(container, fallbackContainer);
          }
        });

        // If iframe exists, assume it's loading (give it time)
        setTimeout(() => {
          if (!errorDetected) {
            formLoaded = true;
            clearInterval(checkForIframe);
          }
        }, 2000);
      }

      // Strategy 2: Timeout - if no iframe after 5 seconds, show fallback
      const elapsed = Date.now() - startTime;
      if (elapsed > 5000 && !container.querySelector("iframe") && !formLoaded) {
        errorDetected = true;
        clearInterval(checkForIframe);
        showFallback(container, fallbackContainer);
      }
    }, 500);

    // Strategy 3: Listen for error events on script tags
    const scriptTags = document.querySelectorAll(
      'script[src*="fillout.com/embed"]',
    );
    scriptTags.forEach((scriptTag) => {
      scriptTag.addEventListener("error", () => {
        if (!formLoaded && !errorDetected) {
          errorDetected = true;
          clearInterval(checkForIframe);
          showFallback(container, fallbackContainer);
        }
      });
    });

    // Clean up interval after 10 seconds max
    setTimeout(() => {
      clearInterval(checkForIframe);
      if (!formLoaded && !errorDetected && !container.querySelector("iframe")) {
        errorDetected = true;
        showFallback(container, fallbackContainer);
      }
    }, 10000);
  });
}

function showFallback(container, fallbackContainer) {
  container.style.display = "none";
  fallbackContainer.style.display = "block";
}

document.addEventListener("DOMContentLoaded", initFilloutFormFallback);
