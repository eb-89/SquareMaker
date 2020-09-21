const Cell = function(data, width, height, textSize) {
  this.width = width;
  this.height = height;
  this._data = data;
  this.xPos = this._data.x*this.width;
  this.yPos = this._data.y*this.height;
  this.color;
  this.image = undefined;

  this._animation = undefined;


  this._enterListener = true;

  this.x = this._data.x;
  this.y = this._data.y;
}

Cell.prototype.isHidden = function()  { return this._data.isHidden() };
Cell.prototype.getNeighbors = function()  {return this._data.getNeighbors()};
Cell.prototype.isLabeled = function() {return this._data.isLabeled()};
Cell.prototype.isMine = function() {return this._data.isMine()};
Cell.prototype.setColor = function(color) {return this.color = color};
Cell.prototype.getColor = function(color) {return color};

Cell.prototype.draw = function(ctx, auxCvs,timestamp) {

  let neighbors;
  if (!this.isHidden()) {
     this.setColor("darkgray")
     neighbors = this.getNeighbors();
    
  } else {
    if (this.isMine()) {
      this.setColor("red")
    } else {
      this.setColor("brown")
    }
  } 

  ctx.setTransform(1, 0, 0, 1, this.xPos, this.yPos);

  if (this._animation.isRunning) {
    let remaining = this._animation.play(this, timestamp); 
  }

  ctx.fillStyle = this.color;
  ctx.fillRect(0, 0, this.width-1, this.height-1);

  if (neighbors > 0) {
    // Each prerendered box is 50 wide and 50 high
   ctx.drawImage(auxCvs, neighbors*50, 0, 50, 50, 0, 0, this.width, this.height);
  }
};


Cell.prototype.onMouseEnter = function() {
      this._animation.start(1000);

};

Cell.prototype.onMouseExit = function() {

};


export default Cell;