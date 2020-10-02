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

  // Animator.setContext(ctx);
  const prerender = Prerender(auxCvs);

  let cfg = {
    colorscheme: {hidden: "red", shown: "yellow"}
  }

  let mswp_params = {
    cellW: 25,
    cellH: 25,
    auxCvs: prerender.auxCvs,
    glyphs: prerender.numberGlyphs,
    cfg: cfg
  }

  let prerenderCfg = 0; 



  let menuscreen = Menuscreen();
  let mswpscreen = Mswpscreen(ctx, auxCvs, model, mswp_params);
  let endscreen = Endscreen();
  let configscreen = Cfgscreen(cfg);
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
              model.start();
              model.init();
              mswpscreen.getModelData();
              // transition.reset();
              transition.startTransition(function () {
                screen = mswpscreen;
              })

            break;
            case 'restart':
              model.start();
              model.init();
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