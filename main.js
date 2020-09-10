
import Grid from "./grid.js"

window.onload = init
let cvs;
let ctx;

function init() {

  const grid = Grid(15,15,30,30, "purple");
  grid.setDefaultColor("green");

  cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", grid.handleMouseMove);
  ctx = cvs.getContext('2d');

  start(grid);
}


function start(grid) {
  (function loop(timestamp) {

    grid.render(ctx, timestamp);
    window.requestAnimationFrame(loop)
  }
  )();
}











