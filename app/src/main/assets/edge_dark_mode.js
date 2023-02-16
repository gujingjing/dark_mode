function setDarkMode(){

  loadJS("https://cdn.jsdelivr.net/npm/darkreader@4.9.58/darkreader.min.js",function(){
    DarkReader.setFetchMethod(window.fetch);
  });

}

function loadJS( url, callback ){
  var script = document.createElement('script'),
  fn = callback || function(){};
  script.onload = function(){
      fn();
  };
  script.src = url;
  document.documentElement.appendChild(script);
}

setDarkMode();

function setDark(){
    DarkReader.enable({brightness: 100,contrast: 90,sepia: 10});
}