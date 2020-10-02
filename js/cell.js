import Marker from "./Marker.js"
import Animator from "./animator.js"

const Cell = function(data, width, height, auxCvs) {
  this.auxCvs = auxCvs;
  this.width = width;
  this.height = height;
  this._data = data;
  this.x = this._data.x*(this.width + 1);
  this.y = this._data.y*(this.height + 1);
  this.marker = new Marker(this.x, this.y, this.width, this.height);
  this._enterListener = true;

  this.datax = this._data.x;
  this.datay = this._data.y;
  this.animationWidth = Animator.Linear(this.width, this.width + 6, 10, 1, false) 
  this.animationX = Animator.Linear(this.x, this.x - 3, 10, 1, false) 
  this.animationY = Animator.Linear(this.y, this.y - 3, 10, 1, false) 
  this.colors = { hidden: "darkgray", shown: "lightgray" }

}

Cell.prototype.isHidden = function()  { return this._data.isHidden() };
Cell.prototype.getNeighbors = function()  {return this._data.getNeighbors()};
Cell.prototype.isLabeled = function() {return this._data.isLabeled()};
Cell.prototype.isMine = function() {return this._data.isMine()};
Cell.prototype.setColorscheme = function(colors) {
  for (const c in colors) {
    // console.log("setting", colors);
    this.colors[c] = colors[c];
  }
  // console.log(this.colors)
};
Cell.prototype.getColor = function(color) {return color};

Cell.prototype.draw = function(ctx) {


  let neighbors;
  if (!this.isHidden()) {
     ctx.fillStyle = this.colors.shown;
     neighbors = this.getNeighbors();
    
  } else {
    if (this.isMine()) {
      ctx.fillStyle = "darkred";
    } else {
      ctx.fillStyle = this.colors.hidden;
    }
  } 

  ctx.fillRect(this.x, this.y, this.width, this.height);

  if (this.isHidden() && this.isLabeled()) {
      this.marker.draw(ctx);
      console.log("drawing");
  }


  if (neighbors > 0) {
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

  this.marker.update();
}


Cell.prototype.onMouseEnter = function() {

  this.animationWidth.direction = 1;
  this.animationWidth.start(); 

  this.animationX.direction = 1;
  this.animationX.start();

  this.animationY.direction = 1;
  this.animationY.start();
};

Cell.prototype.onMouseExit = function() {

  this.animationWidth.direction =  - 1;
  this.animationWidth.start();  

  this.animationX.direction =  - 1;
  this.animationX.start();
  
  this.animationY.direction =  - 1;
  this.animationY.start();

};



export default Cell;