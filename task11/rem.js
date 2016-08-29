function init() {
  var width = window.innerWidth;
  var dpr = devicePixelRatio;
  var meta = document.querySelector('meta[name="viewport"]');
  var scale = 1/dpr;
  meta.setAttribute('content', 'initial-scale=' + scale);
  if (width/dpr > 540) {
    width = 540 * dpr;
  }
  document.documentElement.style.fontSize = (width / 100) + 'px';


}

init();
window.onresize = init;
