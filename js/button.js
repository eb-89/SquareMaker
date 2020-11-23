export function Button(x,y,width,height, idx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.handler = undefined;
  this.selected;
  this.idx = idx;
  this.color = "blue";
  this.bordercolor = "darkgray"
}

Button.prototype.contains = function(x,y) {
  // implements clickable
  return  this.x < x 
          && this.y < y 
          && (this.x + this.width > x)
          && (this.y + this.height > y)
};

Button.prototype.onClick = function() {
  this.handler(this.idx);
};

Button.prototype.draw = function(ctx,auxCvs) {
  ctx.fillStyle = this.color;
  ctx.strokeStyle = this.bordercolor;
  ctx.lineWidth = "4";

  const r = 5;

  ctx.beginPath()
  ctx.arc(this.x + r, this.y + r, r, Math.PI, 3/2*Math.PI);
  ctx.arc(this.x + this.width - r, this.y + r, r, 3/2*Math.PI, 0);
  ctx.arc(this.x + this.width - r, this.y + this.height - r, r, 0, 1/2*Math.PI);
  ctx.arc(this.x + r, this.y + this.height - r, r, 1/2*Math.PI, Math.PI);
  ctx.closePath()
  ctx.stroke();

};

Button.prototype.setOnClickHandler = function(handler) {
  this.handler = handler;
}


export function BackButton(x,y,width,height, idx) {
  Button.call(this, x,y,width,height, idx);
}

BackButton.prototype = Object.create(Button.prototype)
BackButton.prototype.draw = function(ctx,auxCvs) {

  let arrowWidth = 4; 
  ctx.fillStyle = "white";

  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.fill();
  // ctx.beginPath();
  ctx.strokeStyle = this.color
  ctx.beginPath();
  ctx.moveTo(this.x + 5, this.y + (this.height)/2)
  ctx.lineTo(this.x + this.width -5, this.y + (this.height)/2)
  ctx.closePath();
  ctx.lineWidth = arrowWidth;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(this.x + 3, this.y + (this.height)/2)
  ctx.lineTo(this.x + 9, this.y + (this.height)/2 - 8)
  ctx.lineTo(this.x + 9, this.y + (this.height)/2 + 8)
  ctx.fillStyle = this.color;
  ctx.fill();

} 


export function resetButton(x,y,width,height, idx) {
  Button.call(this, x,y,width,height, idx);
}

resetButton.prototype = Object.create(Button.prototype)
resetButton.prototype.draw = function(ctx,auxCvs) {

  let arrowWidth = 3; 
  ctx.fillStyle = "white"

  ctx.fillRect(this.x, this.y, this.width, this.height);
  // ctx.fill();
  // ctx.beginPath();
  ctx.strokeStyle = this.color
  ctx.lineWidth = arrowWidth;
  ctx.beginPath();
  ctx.arc(this.x + this.width/2, this.y + this.height/2, 8, 0, Math.PI*2*(7/8))
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = this.color
  ctx.moveTo(this.x + this.width - 5, this.y + (this.height)/2 + 1);
  ctx.lineTo(this.x + this.width - 5 - 4, this.y + (this.height)/2 + 1);
  ctx.lineTo(this.x + this.width - 5-2, this.y + (this.height)/2- 2);
  ctx.closePath();
  ctx.stroke();


} 
