
import View from "./js/view.js"

// Right now called model
import Model from "./js//mswp.js"

window.onload = init
let cvs;
let ctx;
let view;
let model;

function init() {

  cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", onMouseMove);
  cvs.addEventListener("mouseup", onMouseClick);
  cvs.addEventListener("contextmenu", (evt) => {evt.preventDefault(); } );

  // removes the double click select h1 problem.
  cvs.onselectstart = function () { return false; }

  let auxCvs = document.createElement("canvas");
  auxCvs.setAttribute("width", 1000);
  auxCvs.setAttribute("height", 1000);

  // View options, default
  let viewCfg = {
    colorscheme: {hidden: "red", shown: "yellow"},
    markertype: { type: "flag", color: "green" },
    boardWidth: 300
  }

  // Model options, default
  let modelCfg = {
      dims: {x: 9, y: 9},
      mines: 10
  }

  let config = {
    cvs: cvs,
    auxCvs: auxCvs,
    vcfg: viewCfg,
    mcfg: modelCfg
  }

  model = Model();

  ctx = cvs.getContext('2d');
  view = View(config, model);

  start(view);
}

function onMouseMove(evt) {
  view.handleMouseMove(evt)
}

function onMouseClick(evt) {
  
  switch (evt.button) {
    case 0: 
      view.handleClick(evt, function (x, y) {
        model.handleAction(x, y);
      })
      break;
    case 2:
      view.handleClick(evt, function (x, y) {
        model.mark(x, y);
      })
      break;
  }
}


function start(view) {
  (function loop(timestamp) {

    view.render(timestamp);
    window.requestAnimationFrame(loop)
  }
  )();
}











