Object.defineProperty(window, "NightMode", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: { enabled: false }
});

const NIGHT_MODE_INVERT_FILTER_CSS = "brightness(80%) invert(100%) hue-rotate(180deg)";

const NIGHT_MODE_STYLESHEET =`html {-webkit-filter: hue-rotate(180deg) invert(100%) !important;}iframe,img,video {-webkit-filter: ${NIGHT_MODE_INVERT_FILTER_CSS} !important;}`;

var styleElement;

function getStyleElement() {
  if (styleElement) {
    return styleElement;
  }

  styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.appendChild(document.createTextNode(NIGHT_MODE_STYLESHEET));

  return styleElement;
}

function applyInvertFilterToChildBackgroundImageElements(parentNode) {
  parentNode.querySelectorAll("[style*=\"background\"]").forEach(function(el) {
    if ((el.style.backgroundImage || "").startsWith("url")) {
      applyInvertFilterToElement(el);
    }
  });
}

function applyInvertFilterToElement(el) {
  invertedBackgroundImageElements.push(el);
  el.__NightMode_originalFilter = el.style.webkitFilter;
  el.style.webkitFilter = NIGHT_MODE_INVERT_FILTER_CSS;
}

function removeInvertFilterFromElement(el) {
  el.style.webkitFilter = el.__NightMode_originalFilter;
  delete el.__NightMode_originalFilter;
}

var invertedBackgroundImageElements = null;

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        applyInvertFilterToChildBackgroundImageElements(node);
      }
    });
  });
});

Object.defineProperty(window.NightMode, "setEnabled", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: function(enabled) {
    if (enabled === window.NightMode.enabled) {
      return;
    }

    window.NightMode.enabled = enabled;

    var styleElement = getStyleElement();

    if (enabled) {
      invertedBackgroundImageElements = [];

      document.documentElement.appendChild(styleElement);

      applyInvertFilterToChildBackgroundImageElements(document);

      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      return;
    }

    observer.disconnect();

    invertedBackgroundImageElements.forEach(removeInvertFilterFromElement);

    var styleElementParentNode = styleElement.parentNode;
    if (styleElementParentNode) {
      styleElementParentNode.removeChild(styleElement);
    }

    invertedBackgroundImageElements = null;

    var computedBackgroundColor = getComputedStyle(document.documentElement)["background-color"];
    if (computedBackgroundColor === "rgba(0, 0, 0, 0)") {
      document.documentElement.style.backgroundColor = "#fff";
    }
  }
});