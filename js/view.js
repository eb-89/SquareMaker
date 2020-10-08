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

  // navigation function
  const navigation = function (to) {
    switch(to) {
      case 'start':
        model.init(modelCfg);
        model.start();
        mswpscreen.getModelData();
        // transition.reset();
        transition.startTransition(function () {
          activeScreen = mswpscreen;
        })
      break;
      case 'restart':
        model.init(modelCfg);
        model.start();
        mswpscreen.getModelData();
        activeScreen = mswpscreen;
      break;
      case 'home':
        model.end();
        activeScreen = menuscreen;
      break;
      case 'config':
        activeScreen = configscreen;
        break;
    }
  }

  let menuscreen = Menuscreen();
  menuscreen.setNavigationHandler(navigation)

  let mswpscreen = Mswpscreen(ctx, auxCvs, model, mswp_params);
  mswpscreen.setNavigationHandler(navigation)

  let configscreen = Cfgscreen(modelCfg, viewCfg);
  configscreen.setNavigationHandler(navigation)

  let activeScreen = menuscreen;

  let transition = Transition(ctx);

  return {
    handleClick: function(evt) {
      activeScreen.handleClick(evt)
    },

    handleMouseMove: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      activeScreen.handleMouseMove(mouseX, mouseY);
    },

    render: function() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


      activeScreen.render(ctx, auxCvs);

      if (transition.isRunning) {
        transition.update();
        transition.render(ctx);
      }

    }
  }
}


export default View;