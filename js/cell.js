import Marker from "./Marker.js"
import Animator from "./animator.js"

const Cell = function(data, width, height, auxCvs) {
  this.auxCvs = auxCvs;
  this.width = width;
  this.height = height;
  this._data = data;
  this.x = this._data.x*(this.width + 1);
  this.y = this._data.y*(this.height + 1);
  this.color;
  this.marker = new Marker(this.x, this.y, this.width, this.height);
  // this.marker.animation = Animator.spinT();
  this._enterListener = true;

  this.datax = this._data.x;
  this.datay = this._data.y;
  this.animationWidth = Animator.Linear(this.width, this.width + 10, 30, 1, false) 
  this.animationX = Animator.Linear(this.x, this.x - 5, 30, 1, false) 
  this.animationY = Animator.Linear(this.y, this.y - 5, 30, 1, false) 

}

Cell.prototype.isHidden = function()  { return this._data.isHidden() };
Cell.prototype.getNeighbors = function()  {return this._data.getNeighbors()};
Cell.prototype.isLabeled = function() {return this._data.isLabeled()};
Cell.prototype.isMine = function() {return this._data.isMine()};
Cell.prototype.setColor = function(color) {return this.color = color};
Cell.prototype.getColor = function(color) {return color};

Cell.prototype.draw = function(ctx) {

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  let neighbors;
  if (!this.isHidden()) {
     this.setColor("darkgray")
     neighbors = this.getNeighbors();
    
  } else {
    if (this.isMine()) {
      this.setColor("red");
    } else if (this.isLabeled()) {
      this.setColor("darkblue");
    } else {
      this.setColor("brown");
    }
  } 

  if (neighbors > 0) {
    // Each prerendered box is 50 wide and 50 high
   ctx.drawImage(this.auxCvs, neighbors*50, 0, 50, 50, this.x, this.y, this.width, this.height);
  }
};

Cell.prototype.update = function() {
  this.animationWidth.update();
  this.animationX.update();
  this.animationY.update();
  this.width = this.animationWidth.value;
  this.height = this.animationWidth.value;
  this.x = this.animationX.value;
  this.y = this.animationY.value;
}


Cell.prototype.onMouseEnter = function() {
  this.animationWidth.start();
  this.animationX.start();
  this.animationY.start();
};

Cell.prototype.onMouseExit = function() {
  this.animationWidth.stop();
  this.animationX.stop();
  this.animationY.stop();
  this.animationWidth.revert();
  this.animationX.revert();
  this.animationY.revert();
};


export default Cell;