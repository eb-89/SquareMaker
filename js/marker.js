import Animator from "./animator.js"

const Marker = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = undefined;
  this.radius = 10
  this.animationWidth = Animator.Linear(this.radius, 3, 10, 1, true);
  this.animationX = Animator.Linear(this.x, this.x+ 20, 20,1,true);
}


Marker.prototype.draw = function(ctx, auxCvs) {
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(this.x + this.width/2, this.y + this.height/2, this.radius, 0, 2*Math.PI);
  ctx.stroke();
};

Marker.prototype.update = function() { 
  this.animationWidth.update();
  // this.animationX.update();
  this.x = this.animationX.value;
  this.radius = this.animationWidth.value;
}

export default Marker;