
import View from "./js/view.js"

// Right now called model
import Model from "./js//mswp.js"
import { Canvases } from "./js/canvases.js"

window.onload = init
let view;
let model;

function init() {

  let cvs = document.getElementById("jscvs");
  cvs.addEventListener("mousemove", onMouseMove);
  cvs.addEventListener("mouseup", onMouseClick);
  cvs.addEventListener("contextmenu", (evt) => {evt.preventDefault(); } );

  // removes the double click select h1 problem.
  cvs.onselectstart = function () { return false; }

  let auxCvs = document.createElement("canvas");
  auxCvs.setAttribute("width", 1000);
  auxCvs.setAttribute("height", 1000);


  Canvases.setCanvas(cvs);
  Canvases.setAuxCanvas(auxCvs);

  let viewCfg = {
    cellSize: 17,
    colorscheme: {}
  }

  let modelCfg = {}

  // Defaults are set in config screen code.
  let config = {
    vcfg: viewCfg,
    mcfg: modelCfg
  }

  model = Model();
  view = View(config, model);

  view.render();
}

function onMouseMove(evt) {
  view.handleMouseMove(evt)
}

function onMouseClick(evt) {
  view.handleClick(evt)
}







