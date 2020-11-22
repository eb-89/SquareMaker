
import Menuscreen from "./menu.js"
import Mswpscreen from "./mswpscreen.js"
import Cfgscreen from "./cfgscreen.js"

import Transition from "./transition.js"
import Prerender from "./prerender.js"
import { Canvases } from "./canvases.js"


const View = function(config, model) {

  let ctx = Canvases.getCanvas().getContext("2d")
  let auxCvs = Canvases.getAuxCanvas();

  const prerender = Prerender(auxCvs);
  const transition = Transition();

  // navigation function
  const navigation = function (to) {
    switch(to) {
      case 'start':
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        model.init(config.mcfg);
        mswpscreen.start();

        transition.setActiveScreen(activeScreen)
        transition.onTransition(function () {
          activeScreen = mswpscreen;
          transition.setActiveScreen(mswpscreen)
          //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        });
        transition.startTransition();
      break;
      case 'restart':
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        model.end()
        model.init(config.mcfg);
        mswpscreen.start();
        activeScreen = mswpscreen;
        activeScreen.render();
      break;
      case 'home':
        if (model.isRunning()) {
          model.end();
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        activeScreen = menuscreen;
        menuscreen.render();
      break;
      case 'config':
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        activeScreen = configscreen;
        activeScreen.render();
        break;
    }
  }

  let menuscreen = Menuscreen(config);
  menuscreen.setNavigationHandler(navigation)

  let mswpscreen = Mswpscreen(config, model);
  mswpscreen.setNavigationHandler(navigation)

  let configscreen = Cfgscreen(config);
  configscreen.setNavigationHandler(navigation)

  let activeScreen = menuscreen;

  //model.setOnStateChange(function () {
  //  activeScreen.render();
  //})


  return {
    handleClick: function(evt) {
      if (!transition.isRunning()) {
        activeScreen.handleClick(evt)
        ctx.clearRect(0,0,Canvases.getCanvas().width, Canvases.getCanvas().height);
        activeScreen.render();
      }
    },

    handleMouseMove: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      activeScreen.handleMouseMove(mouseX, mouseY);
    },

    render: function() {
      activeScreen.render();

      if (transition.isRunning()) {
        // transition.update();
        transition.render(ctx);
      }

    }
  }
}

export default View;