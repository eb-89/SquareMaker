
import { Canvases } from "./canvases.js"
const menu = function(config) {

  let ctx = Canvases.getCanvas().getContext("2d"); 

  let cvsWidth = Canvases.getCanvas().width;
  let auxCvs = Canvases.getAuxCanvas(); 

  const startBtn= {
    x: (cvsWidth)/2 - 200/2,
    y: 200,
    width: 200,
    height: 100,
    draw: function () {
      ctx.fillStyle = "lightblue";
      ctx.fillRect(this.x,this.y,this.width,this.height);
      const ts = 15;
      ctx.font = `normal normal bold ${ts}px Courier`;
      ctx.fillStyle = "darkblue";
      const text = `Start`;
      ctx.fillText(text, this.x + (this.width - ctx.measureText(text).width)/2, this.y + this.height/2);
    }
  }

  const cfgBtn = {
    x: (cvsWidth)/2 - 200/2,
    y: startBtn.y + startBtn.height + 10,
    width: 200,
    height: 100,
    draw: function () {
      ctx.fillStyle = "lightblue";
      ctx.fillRect(this.x,this.y,this.width,this.height);
      const ts = 15;
      ctx.font = `normal normal bold ${ts}px Courier`;
      const text = `Options`;
      ctx.fillStyle = "darkblue";
      ctx.fillText(text, this.x + (this.width - ctx.measureText(text).width)/2, this.y + this.height/2);
    }
  }
  
  let navigationHandler;

  return {
    render: function() {
      startBtn.draw();
      cfgBtn.draw();

      // Menu text
      const ts = 30;
      ctx.font = `normal normal bold ${ts}px Courier`;
      ctx.fontColor = `blue`;
      const text = `Squares`;
      ctx.fillText(text, (cvsWidth)/2 - (ctx.measureText(text).width)/2, 100 + ts);

    },
    handleClick: function(evt ) {
      const rect = evt.target.getBoundingClientRect();
      const x = evt.clientX - rect.x;
      const y = evt.clientY - rect.y;
      if (
        x > startBtn.x 
        && y > startBtn.y 
        && (startBtn.x + startBtn.width > x)
        && (startBtn.y + startBtn.height > y)
      ) {
        navigationHandler("start")
      }
      if (
        x > cfgBtn.x 
        && y > cfgBtn.y 
        && (cfgBtn.x + cfgBtn.width > x)
        && (cfgBtn.y + cfgBtn.height > y)
      ) {
        navigationHandler("config")
      }
    },

    handleMouseMove: function(x,y) {
      //no-op;
    },
    setNavigationHandler(nav) {
      navigationHandler = nav;
    }
  }
}

export default menu;