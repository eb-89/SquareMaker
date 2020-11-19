import { Button } from "./button.js";
import { BackButton, resetButton } from "./button.js";
import { Timer } from "./timer.js";
import { Canvases } from "./canvases.js";
import { Mine } from "./mine.js";

const Bar = function(config, model) {
  
  const ctx = Canvases.getCanvas().getContext("2d"); 
  const auxCvs = Canvases.getAuxCanvas() 
  const cvsWidth = Canvases.getCanvas().width;

  let back = new BackButton(10,10, 30, 30)
  let restart = new resetButton(50,10, 30, 30)
  let mine =  new Mine(Canvases.getCanvas().width - 70, 10, 30, 30,)
  let minesLeft = {
    x: Canvases.getCanvas().width - 40,
    y: 10,
    width: 30,
    height: 30,
    draw: function() {

      mine.draw();

      ctx.fillStyle = "white";
      ctx.font = `normal normal bold 20px Courier`

      let ml = model.getMinesLeft();
      ctx.fillText((ml).toString(), this.x+5, this.y+this.height-10, this.width, this.height)
    }
  }

  let timer = new Timer(Math.round((Canvases.getCanvas().width - 200)/2),10,200,35);

  let navigationHandler;
  
  const returnObj =  {
    draw() {
      ctx.fillStyle= "cyan";
      ctx.fillRect(0,0, cvsWidth, 50)
      timer.setSeconds(model.getSeconds());
      timer.setMinutes(model.getMinutes());
      timer.draw();

      back.draw(ctx);
      restart.draw(ctx);
      minesLeft.draw();
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
  
  model.setOnTick( function() {
    returnObj.draw();
  })

  return returnObj;

}

export default Bar