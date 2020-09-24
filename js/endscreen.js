const end = function() {
  
  const endBtn= {
    x: 100,
    y: 100,
    width: 200,
    height: 100
  }
  const homeBtn= {
    x: 100,
    y: 200,
    width: 200,
    height: 100
  }
  return {
    name: 'END',
    render: function(ctx, auxCvs) {

      // Now here we have a bunch of magic numbers...
      // TODO: Change this!
      // ctx.setTransform(1,0,0,1, endBtn.x, endBtn.y)
      ctx.fillStyle="blue";
      ctx.fillRect(endBtn.x, endBtn.y,endBtn.width,endBtn.height);
      ctx.drawImage(auxCvs, 0, 100, 100, 50, endBtn.x + (endBtn.width - 100)/2, endBtn.y, 100, 50);

      ctx.fillStyle="magenta";
      // ctx.setTransform(1,0,0,1, homeBtn.x, homeBtn.y)
      ctx.fillRect(homeBtn.x, homeBtn.y,homeBtn.width,homeBtn.height);
      ctx.drawImage(auxCvs, 0, 150, 100, 50, homeBtn.x + (homeBtn.width - 100)/2, homeBtn.y, 100, 50);
      
    },
    handleClick: function(x,y, cb ) {
      if (
        x > endBtn.x 
        && y > endBtn.y 
        && (endBtn.x + endBtn.width > x)
        && (endBtn.y + endBtn.height > y)
      ) {
        cb("restart")
      }
      else if (
        x > homeBtn.x 
        && y > homeBtn.y 
        && (homeBtn.x + homeBtn.width > x)
        && (homeBtn.y + homeBtn.height > y)
      ) {
        cb("home")
      }

    },
    handleMouseMove: function (x,y) {
      // no-op;
    }
  }
}

export default end;