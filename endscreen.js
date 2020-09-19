const end = function() {
  

  return {
    render: function(ctx, auxCvs, timestamp) {
      ctx.fillStyle = "red";
      ctx.fillRect(100,100,100,200)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const ts = 30;
      ctx.font = `normal normal bold ${ts}px Courier`;
      const endText = "You hit a mine"
      ctx.fillStyle = "black";
      ctx.fillText(endText, (ctx.canvas.clientWidth - ctx.measureText(endText).width)/2, ctx.canvas.height/2) ;
      
    },
    handleClick: function(x,y, cb ) {
      if (
        x > 100 
        && y > 100 
        && (100 + 100 > x)
        && (100 + 200 > y)
      ) {
        cb("restart")
      }
    }
  }
}

export default end;