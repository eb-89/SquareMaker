import Marker from "./Marker.js"

const Cell = function(data, width, height) {
  this.width = width;
  this.height = height;
  this._data = data;
  this.x = this._data.x*this.width;
  this.y = this._data.y*this.height;
  this.color;
  this.marker = new Marker(this.width, this.height);

  this._animation = undefined;


  this._enterListener = true;

  this.datax = this._data.x;
  this.datay = this._data.y;
}

Cell.prototype.isHidden = function()  { return this._data.isHidden() };
Cell.prototype.getNeighbors = function()  {return this._data.getNeighbors()};
Cell.prototype.isLabeled = function() {return this._data.isLabeled()};
Cell.prototype.isMine = function() {return this._data.isMine()};
Cell.prototype.setColor = function(color) {return this.color = color};
Cell.prototype.getColor = function(color) {return color};

Cell.prototype.draw = function(ctx, auxCvs) {

  ctx.setTransform(1, 0, 0, 1, this.x, this.y);

  let neighbors;
  if (!this.isHidden()) {
     this.setColor("darkgray")
     neighbors = this.getNeighbors();
    
  } else {
    if (this.isMine()) {
      this.setColor("red");
    } else if (this.isLabeled()) {
      this.marker.draw(ctx, auxCvs);
    } else {
      this.setColor("brown");
    }
  } 



  if (this._animation) {
    let remaining = this._animation.play(this); 
  }

  ctx.fillStyle = this.color;
  ctx.fillRect(0, 0, this.width-1, this.height-1);

  if (neighbors > 0) {
    // Each prerendered box is 50 wide and 50 high
   ctx.drawImage(auxCvs, neighbors*50, 0, 50, 50, 0, 0, this.width, this.height);
  }
};


Cell.prototype.onMouseEnter = function() {
  if (!this._animation.isRunning) {
      this._animation.start();
  }

};

Cell.prototype.onMouseExit = function() {
      this._animation.stop();
};


export default Cell;