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

// start dark mode
const NIGHT_MODE_INVERT_FILTER_CSS = "brightness(80%) invert(100%) hue-rotate(180deg)";

const NIGHT_MODE_STYLESHEET =
`html {
  -webkit-filter: hue-rotate(180deg) invert(100%) !important;
}
img,video {
  -webkit-filter: ${NIGHT_MODE_INVERT_FILTER_CSS} !important;
}`;

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

function setDarkMode(){
//    var styleElement = getStyleElement();
    // Apply the NightMode CSS to the document.
//    document.documentElement.appendChild(styleElement);

    const styles = document.createElement('style')
    styles.innerText=NIGHT_MODE_STYLESHEET
    document.documentElement.appendChild(styles)
}