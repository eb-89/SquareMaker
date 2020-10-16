import Button from "./button.js";

const Bar = function(config, model) {
  
  const ctx = config.cvs.getContext('2d')

  let back = new Button(10,10, 30, 30)
  let restart = new Button(50,10, 30, 30)

  let navigationHandler;
  
  return {
    draw(ctx, auxCvs) {
      ctx.fillStyle="cyan";
      ctx.fillRect(0,0, config.cvs.width, 50)
      back.draw(ctx, auxCvs);
      restart.draw(ctx, auxCvs);
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