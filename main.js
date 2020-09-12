
import Grid from "./grid.js"

// Right now called model
import Model from "./mswp.js"

window.onload = init
let cvs;
let ctx;
let grid;


const jsonlog = function(log, obj) {
  let out = JSON.stringify(obj, function(key, val) {
    return (typeof val === 'function') ? '' + val : val;
  });
  console.log(log, out)
} 

function init() {

  Model.init();
  
  grid = Grid(15, 15, 30, 30, "purple", Model);

  cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", onMouseMove);
  cvs.addEventListener("click", onMouseClick);

  // removes the double click select h1 problem.
  cvs.onselectstart = function () { return false; }

  ctx = cvs.getContext('2d');

  start(grid);
}

function onMouseMove(evt) {
  grid.handleMouseMove(evt)
}

function onMouseClick(evt) {
  grid.handleMouseClick(evt, function (x, y) {
    Model.expand(x, y);
  })
}


function start(grid) {
  (function loop(timestamp) {

    grid.render(ctx, timestamp);
    window.requestAnimationFrame(loop)
  }
  )();
}











