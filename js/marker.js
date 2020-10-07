import Animator from "./animator.js"

const Marker = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.image = undefined;
  this.radius = this.width/2 -4
  this.animationRadius = Animator.Linear(this.radius, this.radius-3, 30, 1, true);
  this.type = "circle"
  this.color="green"
}


Marker.prototype.draw = function(ctx) {
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  switch (this.type) {
    case "circle": 
      ctx.arc(this.x + this.width/2, this.y + this.height/2, this.radius, 0, 2*Math.PI);
      break;
    case "square":
      ctx.strokeStyle = this.color;
      ctx.rect(this.x+2, this.y+2, this.width-4, this.height-4);
      break;
  }
  ctx.stroke();
};

Marker.prototype.update = function() { 
  let time = this.animationRadius.update();
  if (time == 29 && this.animationRadius.direction == 1) {
    this.animationRadius.revert();
  }
  if (time == 1 && this.animationRadius.direction == -1) {
    this.animationRadius.revert();
  }

  this.radius = this.animationRadius.value;
}

export default Marker;