const menu = function() {

  const startBtn= {
    x: 100,
    y: 100,
    w: 200,
    h: 100
  }
  
  return {
    name: 'MENU',
    render: function(ctx, auxCvs, timestamp) {
      ctx.fillStyle = "yellow";
      ctx.setTransform(1,0,0,1, startBtn.x, startBtn.y)
      ctx.fillRect(0,0,startBtn.w,startBtn.h);
      // Now here we have a bunch of magic numbers...
      // TODO: Change this!
      ctx.drawImage(auxCvs, 0, 50, 100, 50, (startBtn.w - 100)/2, 0, 100, 50);
      ctx.setTransform(1,0,0,1, (ctx.canvas.width - 150)/2, 50)
      ctx.drawImage(auxCvs, 0, 200, 150, 50, 0, 0, 150, 50);
    },
    handleClick: function(x,y, cb ) {
      if (
        x > startBtn.x 
        && y > startBtn.y 
        && (startBtn.x + startBtn.w > x)
        && (startBtn.y + startBtn.h > y)
      ) {
        cb("start")
      }
    },

    handleMouseMove: function(x,y) {
      //no-op;
    }
  }
}

export default menu;