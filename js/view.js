// TODO: break out this file


import Animator from "./animator.js"
import Menuscreen from "./menuscreen.js"
import Mswpscreen from "./mswpscreen.js"
import Endscreen from "./endscreen.js"
import Transition from "./transition.js"
import Prerender from "./prerender.js"
import Cfgscreen from "./cfgscreen.js"


const View = function(cvs, auxCvs, model) {

  let ctx = cvs.getContext("2d")
  let auxCtx = auxCvs.getContext("2d");

  const prerender = Prerender(auxCvs);

  // View options, default
  let viewCfg = {
    colorscheme: {hidden: "red", shown: "yellow"},
    markertype: { type: "circle", color: "green" }
  }

  // Model options, default
  let modelCfg = {
      dims: {x: 10, y: 10},
      mines: 20
  }

  let mswp_params = {
    cellW: 25,
    cellH: 25,
    auxCvs: prerender.auxCvs,
    glyphs: prerender.numberGlyphs,
    cfg: viewCfg
  }

  let prerenderCfg = 0; 



  let menuscreen = Menuscreen();
  let mswpscreen = Mswpscreen(ctx, auxCvs, model, mswp_params);
  let endscreen = Endscreen();
  let configscreen = Cfgscreen(modelCfg, viewCfg);
  // let currentScreen = screens.MSWP;
  let screen = menuscreen;

  let transition = Transition(ctx);

  return {
    handleClick: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;
      if (screen.name === "MSWP") {
        screen.handleClick(mouseX, mouseY, function(cell) {
          switch (evt.button) {
            case 0: 
              model.handleAction(cell.datax, cell.datay);
              if (!model.isRunning()) {
                screen = endscreen;
              }
              break;
            case 2:
              model.mark(cell.datax, cell.datay);
              if (cell.isLabeled()) {
                cell.marker.animationRadius.start();
              } else {
                cell.marker.animationRadius.stop();
                cell.marker.animationRadius.reset();
              }
              break;
          }

          if (!model.isRunning()) {
            screen = endscreen;
          }
        });
      } else {
        screen.handleClick(mouseX, mouseY, function(answer) {
          switch(answer) {
            case 'start':
              model.init(modelCfg);
              model.start();
              mswpscreen.getModelData();
              // transition.reset();
              transition.startTransition(function () {
                screen = mswpscreen;
              })

            break;
            case 'restart':
              model.init(modelCfg);
              model.start();
              mswpscreen.getModelData();
              screen = mswpscreen;
            break;
            case 'home':
              model.end();
              screen = menuscreen;
            break;
            case 'config':
              screen = configscreen;
              break;
          }
        });
      }
 
    },

    handleMouseMove: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      screen.handleMouseMove(mouseX, mouseY);
    },

    render: function() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


      screen.render(ctx, auxCvs);

      if (transition.isRunning) {
        transition.update();
        transition.render(ctx);
      }

    }
  }
}


export default View;