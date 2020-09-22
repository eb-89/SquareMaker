const end = function() {
  
  const endBtn= {
    x: 100,
    y: 100,
    w: 200,
    h: 100
  }
  const homeBtn= {
    x: 100,
    y: 200,
    w: 200,
    h: 100
  }
  return {
    name: 'END',
    render: function(ctx, auxCvs) {

      // Now here we have a bunch of magic numbers...
      // TODO: Change this!
      ctx.fillStyle = "red";
      ctx.setTransform(1,0,0,1, endBtn.x, endBtn.y)
      ctx.fillRect(0,0,endBtn.w,endBtn.h);
      ctx.drawImage(auxCvs, 0, 100, 100, 50, (endBtn.w - 100)/2, 0, 100, 50);

      ctx.fillStyle = "orange";
      ctx.setTransform(1,0,0,1, homeBtn.x, homeBtn.y)
      ctx.fillRect(0,0,homeBtn.w,homeBtn.h);
      ctx.drawImage(auxCvs, 0, 150, 100, 50, (homeBtn.w - 100)/2, 0, 100, 50);
      
    },
    handleClick: function(x,y, cb ) {
      if (
        x > endBtn.x 
        && y > endBtn.y 
        && (endBtn.x + endBtn.w > x)
        && (endBtn.y + endBtn.h > y)
      ) {
        cb("restart")
      }
      else if (
        x > homeBtn.x 
        && y > homeBtn.y 
        && (homeBtn.x + homeBtn.w > x)
        && (homeBtn.y + homeBtn.h > y)
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