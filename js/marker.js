

const Marker = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = undefined;
}


Marker.prototype.draw = function(ctx, auxCvs) {
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2-5, 0, 2*Math.PI);
  ctx.stroke();
};

export default Marker;