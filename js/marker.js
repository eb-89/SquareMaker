import Animator from "./animator.js"

const Marker = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = undefined;
  this.radius = this.width/2 -4
  this.animationRadius = Animator.Linear(this.radius, this.radius-3, 30, 1, true);
}


Marker.prototype.draw = function(ctx, auxCvs) {
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(this.x + this.width/2, this.y + this.height/2, this.radius, 0, 2*Math.PI);
  ctx.stroke();
};

Marker.prototype.update = function() { 
  let time = this.animationRadius.update();
  if (this.animationRadius.isRunning) {
    console.log(this.radius);
  }
  if (time == 29 && this.animationRadius.direction == 1) {
    this.animationRadius.revert();
  }
  if (time == 1 && this.animationRadius.direction == -1) {
    this.animationRadius.revert();
  }
  this.radius = this.animationRadius.value;
}

export default Marker;