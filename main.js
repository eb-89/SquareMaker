
import View from "./js/view.js"

// Right now called model
import Model from "./js//mswp.js"

window.onload = init
let cvs;
let ctx;
let view;
let model;


const jsonlog = function(log, obj) {
  let out = JSON.stringify(obj, function(key, val) {
    return (typeof val === 'function') ? '' + val : val;
  });
  console.log(log, out)
} 

function init() {

  model = Model(16,16,30);
  // model.init();
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
  view = View(cvs, auxCvs, model);

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











