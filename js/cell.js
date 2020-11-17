import { Canvases } from "./canvases.js"
import { Mine } from "./mine.js"

export const Cell = function(data, x,y, width,height) {
  this.width = width;
  this.height = height;
  this._data = data;
  this.x = x;
  this.y = y;
  this._enterListener = true;
  this.datax = this._data.x;
  this.datay = this._data.y;
  this.colors = { hidden: "brown", shown: "magenta" }
  this.backgroundColor = "red";
  this.mark;
  this.mine;
  this.neighbors;
  this.falseFlag;

  this.tl = gsap.timeline({paused: true});  
  this.tl.to(
    this, 
    {
      duration: 0.15, 
      ease:"none", 
      onUpdate: () => {this.draw()},
      x: this.x -3, 
      width: this.width + 6, 
      y: this.y -3, 
      height: this.height + 6
    }

  );

}

Cell.prototype.contains = function(x,y) {
  // Implements Clickable
  return  this.x < x 
          && this.y < y 
          && (this.x + this.width > x)
          && (this.y + this.height > y)
};


Cell.prototype.setMarker = function(bol) {
  this.marker = bol;
};

Cell.prototype.setMine = function(bol) {
  this.mine = bol;
};

Cell.prototype.setNeighbors = function(n) {
  this.neighbors = n;
};

Cell.prototype.setFalseFlag = function(bol) {
  this.falseFlag = bol;
};

Cell.prototype.setColorscheme = function(colors) {
  for (const c in colors) {
    this.colors[c] = colors[c];
  }
};



Cell.prototype.drawNeighbors = function(neighbors) {
  const ctx = Canvases.getCanvas().getContext('2d');
  const auxCvs = Canvases.getAuxCanvas();
  let blueshade = (255 - Math.round((255/8)*neighbors)).toString(16);
  if (blueshade.length == 1) {
    blueshade = "0"+blueshade;
  }
  ctx.fillStyle = `#${blueshade}${blueshade}FF`;
  ctx.fill();
  if (neighbors > 0) {
   ctx.drawImage(auxCvs, neighbors*50, 0, 50, 50, this.x, this.y, this.width, this.height);
  }
}

Cell.prototype.drawFrame = function(ctx) {
  ctx.lineWidth = 2;
  let  ix = this.x + ctx.lineWidth/2;
  let  iy = this.y + ctx.lineWidth/2;
  let  iw = this.width - ctx.lineWidth;
  let  ih = this.height - ctx.lineWidth;
  ctx.beginPath();
  ctx.moveTo(ix + Math.round(iw/6), iy);
  ctx.lineTo(ix + iw, iy);
  ctx.lineTo(ix + iw, iy + ih);
  ctx.lineTo(ix, iy + ih);
  ctx.lineTo(ix, iy + Math.round(ih/6));
  ctx.closePath();

  ctx.strokeStyle="gray"
  ctx.stroke();
}


Cell.prototype.drawMarker = function(ctx) {
  
  let  x = this.x;
  let  y = this.y;
  let  w = this.width;
  let  h = this.height;

  ctx.fillStyle = "red"
  ctx.beginPath();
  ctx.moveTo(x + 3 ,y+h);
  ctx.lineTo(x + w - 3 , y+h)
  ctx.lineTo(x + w/2, y + h/5);
  ctx.closePath();
  ctx.fill();

}

Cell.prototype.drawFalseFlag = function(ctx) {
  ctx.fillStyle = "pink"
  ctx.fill();

}

Cell.prototype.drawMine = function(ctx) {

  let  x = this.x;
  let  y = this.y;
  let  w = this.width;
  let  h = this.height;

  ctx.fillStyle ="black";
  ctx.fill();

  // const pad = Math.round(this.width*0.25)

  const mine = new Mine(this.x, this.y, this.width, this.height) 
  mine.draw();

}

Cell.prototype.draw = function() {
  // console.log("still drawing", this.colors.hidden);
  const ctx = Canvases.getCanvas().getContext('2d');

  ctx.clearRect(this.x - 1, this.y-1, this.width+2, this.height+2);

  this.drawFrame(ctx);
  ctx.fillStyle = this.backgroundColor;
  ctx.fill()

  if (this.marker) {
    this.drawMarker(ctx);
  }

  if (this.mine) {
    this.drawMine(ctx);
  }

  if (this.falseFlag) {
    this.drawFalseFlag(ctx);
  }

  this.drawNeighbors(this.neighbors);

};


Cell.prototype.onMouseEnter = function() {
    this.tl.play();
};

Cell.prototype.onMouseExit = function() {
    this.tl.reverse()
};
