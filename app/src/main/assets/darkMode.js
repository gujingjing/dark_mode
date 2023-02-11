
function myJsFunction(data) {
    alert("myJsFunction:" + data);
}

function sayHi() {
    var element1 = document.getElementById("input1");
    element1.style.height = "150px";
    element1.style.background = "green";
}

function f2() {
    var ip1Ele = document.getElementsByClassName("inp1")[0];
    ip1Ele.style.color = "white";
    ip1Ele.style.fontSize = "35px";
}

const NIGHT_MODE_INVERT_FILTER_CSS = 'brightness(80%) invert(100%) hue-rotate(180deg)';
const NIGHT_MODE_STYLESHEET ='html {-webkit-filter: hue-rotate(180deg) invert(100%) !important;}iframe,video {-webkit-filter: ${NIGHT_MODE_INVERT_FILTER_CSS} !important;}';

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        applyInvertFilterToChildBackgroundImageElements(node);
      }
    });
  });
});

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

var darkCSS;

function setDarkModeCSS(css){
    darkCSS=css;
}

function setDarkMode() {
    const styles = document.createElement('style');
    styles.innerText = NIGHT_MODE_STYLESHEET;
    document.documentElement.appendChild(styles);
    applyInvertFilterToChildBackgroundImageElements(document);
    observer.observe(document.documentElement, {
            childList: true,
            subtree: true
          });
    alert("setDarkMode:");
}

function applyInvertFilterToChildBackgroundImageElements(parentNode) {
  parentNode.querySelectorAll("[style*=\"background\"]").forEach(function(el) {
    if ((el.style.backgroundImage || "").startsWith("url")) {
      console.log(el.className);
      applyInvertFilterToElement(el);
    }
  });
}

  function applyInvertFilterToElement(el) {
    el.style.setProperty('-webkit-filter', NIGHT_MODE_INVERT_FILTER_CSS, 'important');
  }
