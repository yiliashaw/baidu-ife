function init() {
  var width = window.innerWidth;
  var dpr = devicePixelRatio;
  if (width/dpr > 540) {
    width = 540 * dpr;
  }
  document.documentElement.style.fontSize = (width / 100) + 'px';
}
init();
window.onresize = init;
