import Marker from "./Marker.js"
import Animator from "./animator.js"

const Cell = function(data,x,y,width,height) {
  this.width = width;
  this.height = height;
  this._data = data;
  this.x = x;
  this.y = y;
  this.marker = new Marker(this.x, this.y, this.width, this.height);
  this._enterListener = true;
  this.datax = this._data.x;
  this.datay = this._data.y;
  this.colors = { hidden: "darkgray", shown: "lightgray" }

  let tl = gsap.timeline({paused: true})
  tl.to(this, {duration: 0.15, ease:"none", x: this.x -3, width: this.width + 6, y: this.y -3, height: this.height + 6});
  
  this.tl = tl;  

}

Cell.prototype.contains = function(x,y) {
  // Implements Clickable
  return  this.x < x 
          && this.y < y 
          && (this.x + this.width > x)
          && (this.y + this.height > y)
};

Cell.prototype.isHidden = function()  { return this._data.isHidden() };
Cell.prototype.getNeighbors = function()  {return this._data.getNeighbors()};
Cell.prototype.isLabeled = function() {return this._data.isLabeled()};
Cell.prototype.isMine = function() {return this._data.isMine()};
Cell.prototype.setColorscheme = function(colors) {
  for (const c in colors) {
    this.colors[c] = colors[c];
  }
};
Cell.prototype.setMarker = function(cfg) {
  this.marker.type = cfg.type;
  this.marker.color = cfg.color;
};
Cell.prototype.setMarker = function(cfg) {
  this.marker.type = cfg.type;
  this.marker.color = cfg.color;
}

Cell.prototype.getColor = function(color) {return color};

Cell.prototype.draw = function(ctx, auxCvs) {


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
      this.marker.draw(ctx, auxCvs);
  }

  if (neighbors > 0) {
   ctx.drawImage(auxCvs, neighbors*50, 0, 50, 50, this.x, this.y, this.width, this.height);
  }
};


Cell.prototype.onMouseEnter = function() {

  // this.animationWidth.direction = 1;
  // this.animationWidth.start(); 

  // this.animationX.direction = 1;
  // this.animationX.start();

  // this.animationY.direction = 1;
  // this.animationY.start();
  // if (!this.tl.paused()) {
    this.tl.play();
  // }
};

Cell.prototype.onMouseExit = function() {
    this.tl.reverse()
};



export default Cell;