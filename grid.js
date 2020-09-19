// TODO: break out this file

import Animator from "./animator.js"


const Cell = function(data, width, height, animator) {
  this.width = width;
  this.height = height;
  this._data = data;
  this.xPos = this._data.x*this.width;
  this.yPos = this._data.y*this.height;
  this.color;
  this.image = undefined;

  
  this._animator = animator;
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

  
  if (this._animation) {
    let remaining = this._animation(timestamp); 
  
    if (remaining < 0) {
      this._animation = undefined;
    }
  }
  ctx.fillStyle = this.color;
  ctx.fillRect(0, 0, this.width-1, this.height-1);

  if (neighbors > 0) {
   ctx.drawImage(auxCvs, neighbors*this.width, 0, this.width, this.height, 0,0,this.width, this.height);
  }
};

Cell.prototype.onMouseEnter = function() {
      this._animation = this._animator.blow(this, 2000, 100);
};

Cell.prototype.onMouseExit = function() {
      // this._animation = undefined;
};



const Grid = function(cvs, auxCvs, model) {


  let ctx = cvs.getContext("2d")
  let auxCtx = auxCvs.getContext("2d");

  let width = Math.min(Math.round(ctx.canvas.width/model.x), Math.round(ctx.canvas.height/model.y));
  let height = width;

  // prerender
  const ts = 10;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  for (let i = 0; i<10; i++) {

    const text = `${i}`;
    auxCtx.fillStyle = "black";
    auxCtx.setTransform(1, 0, 0, 1, width*i, 0);
    auxCtx.fillText(text, (auxCtx.measureText(text).width)/2, ts/2) ;

  }


  const animator = Animator(ctx);

  let _stateArray = model.getState();

  let _cells = [];
  for (let i = 0; i < model.x; i++) {
    for (let j = 0; j < model.y; j++) {
      _cells[j*model.x+i] = new Cell(_stateArray[i][j], width, height, animator);
    }
  }





  return {
    handleClick: function(evt, callback) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      const cell = _getCell(mouseX, mouseY, _cells);

      // TODO: change this
      if (cell) {
        callback(cell.x, cell.y);
      } 
    },

    handleMouseMove: function(evt) {

      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;

      _handleMouseMove(mouseX, mouseY, _cells);
    },

    render: function(timestamp) {
      ctx.setTransform(1, 0, 0, 1,0,0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      animator.setTimestamp(timestamp);

      if (!model.isRunning()) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const ts = 30;
        ctx.font = `normal normal bold ${ts}px Courier`;
        const endText = "You hit a mine"
        ctx.fillStyle = "black";
        ctx.fillText(endText, (ctx.canvas.clientWidth - ctx.measureText(endText).width)/2, ctx.canvas.height/2) ;
        return;
      }

      for (let c of _cells) {
        c.draw(ctx, auxCvs, timestamp);
      }
    }
  }
}

function _handleMouseMove (mouseX, mouseY, cells) {
  for (let cell of cells) {

    if (
      cell.xPos < mouseX 
      && cell.yPos < mouseY 
      && (cell.xPos + cell.width > mouseX)
      && (cell.yPos + cell.height > mouseY)
    ) {    
      if (cell._enterListener) {
        cell.onMouseEnter();
        cell._enterListener = false;
      }
    } else {
      if (!cell._enterListener) {
        cell.onMouseExit();
        cell._enterListener = true;
      }

    }
  }

}


function _getCell(mouseX, mouseY, cells) {

  for (let cell of cells) {
    if (
      cell.xPos < mouseX 
      && cell.yPos < mouseY 
      && (cell.xPos + cell.width > mouseX)
      && (cell.yPos + cell.height > mouseY)
    ) {
    return cell;
    }
  }
}

export default Grid;