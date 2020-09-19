const menu = function() {
  

  return {
    render: function(ctx, auxCvs, timestamp) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(100,100,100,200)
    },
    handleClick: function(x,y, cb ) {
      if (
        x > 100 
        && y > 100 
        && (100 + 100 > x)
        && (100 + 200 > y)
      ) {
        cb("start")
      }
    }
  }
}

export default menu;