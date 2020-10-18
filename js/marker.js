const Marker = function(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color= color;
  this.type;
}


Marker.prototype.draw = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;

  const x = this.x;
  const y = this.y;
  const w = this.width;
  const h = this.height;
  
  switch (this.type) {
    case "flag": 

      ctx.beginPath();
      ctx.moveTo(x + w/6 ,y+h);
      ctx.lineTo(x + w - w/6 , y+h)
      ctx.lineTo(x + w/2, y + h*(4/5));
      ctx.fill();

      ctx.lineWidth=2
      ctx.beginPath();
      ctx.moveTo(x + w/2, y+h - 3);
      ctx.lineTo(x + w/2, y+3);
      ctx.closePath();
      ctx.stroke()

      ctx.beginPath();
      ctx.rect(x + w/2, y + 3, w/3, h/6);
      ctx.closePath();
      ctx.fill();

      break;
    case "triangle":

      ctx.beginPath();
      ctx.moveTo(x + 3 ,y+h);
      ctx.lineTo(x + w - 3 , y+h)
      ctx.lineTo(x + w/2, y + h/5);
      ctx.fill();

      break;
  }
};

export default Marker;