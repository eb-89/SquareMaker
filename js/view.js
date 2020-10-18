
import Menuscreen from "./menuscreen.js"
import Mswpscreen from "./mswpscreen.js"
import Cfgscreen from "./cfgscreen.js"

import Transition from "./transition.js"
import Prerender from "./prerender.js"


const View = function(config, model) {

  let ctx = config.cvs.getContext("2d")
  let auxCtx = config.auxCvs.getContext("2d");

  const prerender = Prerender(config.auxCvs);
  const transition = Transition(ctx);

  // navigation function
  const navigation = function (to) {
    switch(to) {
      case 'start':
        model.init(config.mcfg);
        mswpscreen.start();

        transition.onTransition(function () {
          activeScreen = mswpscreen;
        });
        transition.startTransition();
      break;
      case 'restart':
        model.end()
        model.init(config.mcfg);
        mswpscreen.start();
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

  let menuscreen = Menuscreen(config);
  menuscreen.setNavigationHandler(navigation)

  let mswpscreen = Mswpscreen(config, model);
  mswpscreen.setNavigationHandler(navigation)

  let configscreen = Cfgscreen(config);
  configscreen.setNavigationHandler(navigation)

  let activeScreen = menuscreen;

  let count = 0;

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

      activeScreen.render();

      if (transition.isRunning()) {
        // transition.update();
        transition.render(ctx);
      }

    }
  }
}

export default View;