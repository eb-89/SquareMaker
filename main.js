
import grid from "./grid.js"

window.onload = init
let cvs;
let ctx;

function init() {
  cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", grid.handleMouseMove);
  ctx = cvs.getContext('2d');
  grid.init(15,15,30,30, "blue");
  loop();
}


function loop(timestamp) {

  grid.render(ctx);
  window.requestAnimationFrame(loop)
}









