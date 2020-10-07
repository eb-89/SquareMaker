const menu = function() {

  const startBtn= {
    x: 100,
    y: 200,
    width: 200,
    height: 100
  }
  const cfgBtn= {
    x: 100,
    y: startBtn.y + startBtn.height + 10,
    width: 200,
    height: 100
  }
  
  return {
    name: 'MENU',
    render: function(ctx, auxCvs) {
      ctx.fillStyle = "lightblue";

      ctx.fillRect(startBtn.x,startBtn.y,startBtn.width,startBtn.height);
      // Now here we have a bunch of magic numbers...
      // TODO: Change this!
      ctx.fillRect(startBtn.x, startBtn.y, 100, 50);
      ctx.drawImage(auxCvs, 0, 50, 100, 50, startBtn.x + (startBtn.width - 100)/2, startBtn.y, 100, 50);
      ctx.drawImage(auxCvs, 0, 50, 100, 50, cfgBtn.x + (cfgBtn.width - 100)/2, cfgBtn.y, 100, 50);

      // Title
      ctx.drawImage(auxCvs, 0, 200, 150, 50, (ctx.canvas.width-150)/2, 20, 150, 50);
    },
    handleClick: function(x,y, cb ) {
      if (
        x > startBtn.x 
        && y > startBtn.y 
        && (startBtn.x + startBtn.width > x)
        && (startBtn.y + startBtn.height > y)
      ) {
        cb("start")
      }
      if (
        x > cfgBtn.x 
        && y > cfgBtn.y 
        && (cfgBtn.x + cfgBtn.width > x)
        && (cfgBtn.y + cfgBtn.height > y)
      ) {
        cb("config")
      }
    },

    handleMouseMove: function(x,y) {
      //no-op;
    }
  }
}

export default menu;