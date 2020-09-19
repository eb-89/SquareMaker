
import Grid from "./grid.js"

// Right now called model
import Model from "./mswp.js"

window.onload = init
let cvs;
let ctx;
let grid;
let model;


const jsonlog = function(log, obj) {
  let out = JSON.stringify(obj, function(key, val) {
    return (typeof val === 'function') ? '' + val : val;
  });
  console.log(log, out)
} 

function init() {

  model = Model(30,16,10);
  model.init();
  model.start();

  cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", onMouseMove);
  cvs.addEventListener("mouseup", onMouseClick);
  cvs.addEventListener("contextmenu", (evt) => {evt.preventDefault(); } );



  // removes the double click select h1 problem.
  cvs.onselectstart = function () { return false; }

  let auxCvs = document.createElement("canvas");
  auxCvs.setAttribute("width", 1000);
  auxCvs.setAttribute("height", 1000);

  console.log(auxCvs)
  // let auxCxt = auxCvs.getContext('2d');

  ctx = cvs.getContext('2d');
  grid = Grid(cvs, auxCvs, model);

  start(grid);
}

function onMouseMove(evt) {
  grid.handleMouseMove(evt)
}

function onMouseClick(evt) {
  
  switch (evt.button) {
    case 0: 
      grid.handleClick(evt, function (x, y) {
        model.handleAction(x, y);
      })
      break;
    case 2:
      grid.handleClick(evt, function (x, y) {
        model.mark(x, y);
      })
      break;
  }
}


function start(grid) {
  (function loop(timestamp) {

    grid.render(timestamp);
    window.requestAnimationFrame(loop)
  }
  )();
}











