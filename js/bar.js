import { Button } from "./button.js";
import { BackButton, resetButton } from "./button.js";
import { Timer } from "./timer.js";

const Bar = function(config, model) {
  
  const ctx = config.cvs.getContext('2d')

  let back = new BackButton(10,10, 30, 30)
  let restart = new resetButton(50,10, 30, 30)

  let timer = new Timer((config.cvs.width - 200)/2,10,50,50);


  let navigationHandler;
  
  return {
    draw(ctx, auxCvs) {
      ctx.fillStyle="cyan";
      ctx.fillRect(0,0, config.cvs.width, 50)
      back.draw(ctx, auxCvs);
      restart.draw(ctx, auxCvs);

      timer.setSeconds(model.getSeconds());
      timer.setMinutes(model.getMinutes());
      timer.draw(ctx, config.auxCvs);
    },
    handleClick(evt) {
      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      if (back.contains(mouseX,mouseY)) {
        navigationHandler("home");
      }
      if (restart.contains(mouseX,mouseY)) {
        navigationHandler("restart");
      }
    },
    setNavigationHandler(nav) {
      navigationHandler = nav;
    }

  }

}

export default Bar