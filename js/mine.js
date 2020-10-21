import { Canvases } from "./canvases.js"

export function Mine(x,y,w,h) {
  this.x = x
  this.y = y
  this.width  = w
  this.height = h
}


Mine.prototype.draw = function() {

  const ctx = Canvases.getCanvas().getContext('2d');
  ctx.fillStyle = "gray";
  const pad = Math.round(this.width*0.25)
  ctx.fillRect(this.x + pad, this.y+pad, this.width-2*pad, this.height-2*pad);
  ctx.beginPath();
  ctx.moveTo(this.x, this.y + this.height/2);
  ctx.lineTo(this.x + this.width/2, this.y + this.height/3);
  ctx.lineTo(this.x + this.width/2, this.y + this.height*2/3);
  ctx.closePath();
  ctx.fill();


  ctx.beginPath();
  ctx.moveTo(this.x + this.width/2, this.y);
  ctx.lineTo(this.x + this.width/3, this.y + this.height/2);
  ctx.lineTo(this.x + this.width*2/3, this.y + this.height/2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(this.x + this.width/2, this.y + this.height);
  ctx.lineTo(this.x + this.width/3, this.y + this.height/2);
  ctx.lineTo(this.x + this.width*2/3, this.y + this.height/2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(this.x + this.width, this.y + this.height/2);
  ctx.lineTo(this.x + this.width/2, this.y + this.height/3);
  ctx.lineTo(this.x + this.width/2, this.y + this.height*2/3);
  ctx.closePath();
  ctx.fill();

};