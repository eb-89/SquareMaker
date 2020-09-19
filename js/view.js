// TODO: break out this file


import Animator from "./animator.js"
import Menuscreen from "./menuscreen.js"
import Mswpscreen from "./mswpscreen.js"
import Endscreen from "./endscreen.js"
import Timer from "./timer.js"


const View = function(cvs, auxCvs, model) {

  let timer = new Timer();
  Animator.setTimer(timer);

  let ctx = cvs.getContext("2d")
  let auxCtx = auxCvs.getContext("2d");

  Animator.setContext(ctx);

  // prerender
  const ts = 15;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  for (let i = 0; i<10; i++) {

    const text = `${i}`;
    auxCtx.fillStyle = "black";
    auxCtx.setTransform(1, 0, 0, 1, Math.round(cvs.width/model.x)*i, 0);
    auxCtx.fillText(text, (auxCtx.measureText(text).width)/2, ts/2) ;

  }

  let menuscreen = Menuscreen();
  let mswpscreen = Mswpscreen(model, ctx.canvas.width, ctx.canvas.height);
  let endscreen = Endscreen();
  // let currentScreen = screens.MSWP;
  let screen = menuscreen;

  return {
    handleClick: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;
      if (screen.name === "MSWP") {
        screen.handleClick(mouseX, mouseY, function(cell) {
          model.handleAction(cell.x, cell.y)
          if (!model.isRunning()) {
            screen = endscreen;
          }
        });
      } else {
        screen.handleClick(mouseX, mouseY, function(answer) {
          switch(answer) {
            case 'start':
              mswpscreen.getModelData();
              screen = mswpscreen;
            break;
            case 'restart':
              model.start();
              model.init();
              mswpscreen.getModelData();
              screen = mswpscreen;
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

    render: function(timestamp) {
      ctx.setTransform(1, 0, 0, 1,0,0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      timer.update(timestamp);

      screen.render(ctx, auxCvs, timestamp);
    }
  }
}





export default View;