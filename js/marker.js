

const Marker = function(width, height) {
  this.width = width;
  this.height = height;
  this.image = undefined;
  this.animation = undefined;
}


Marker.prototype.draw = function(ctx, auxCvs) {
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(this.width/2, this.height/2, this.width/2-5, 0, 2*Math.PI);
  ctx.stroke();
};

export default Marker;