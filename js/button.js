function Button(x,y,width,height, idx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.handler = undefined;
  this.selected;
  this.idx = idx;
  this.color = "blue";
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
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Button.prototype.setOnClickHandler = function(handler) {
  this.handler = handler;
}

export default Button;