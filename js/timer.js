import { Canvases } from "./canvases.js";

export function Timer(x,y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.seconds = 0;
  this.minutes = 0;
}


Timer.prototype.draw = function() {


  const ctx = Canvases.getCanvas().getContext("2d"); 
  const auxCvs = Canvases.getAuxCanvas()

  ctx.clearRect(this.x, this.y, this.width,this.height);
  ctx.fillRect(this.x, this.y, this.width,this.height);

  ctx.fillStyle="white";
  ctx.strokeStyle="white";
  ctx.lineWidth = 3;
  ctx.beginPath()
  ctx.moveTo(this.x + this.width/2, this.y);
  ctx.lineTo(this.x + this.width/2, this.y + this.height);
  ctx.closePath();
  ctx.stroke()




  for (let i = 0; i<this.seconds;i++) {
    let rightshift = this.x + this.width/2 + 10 +  (i % 10) *6;
    ctx.fillRect(rightshift, this.y + Math.floor(i/10)*6, 4, 4);
  }
  for (let i = 0; i<this.minutes;i++) {
    let leftshift = this.x + this.width/2 - 10 -  (i % 10) *6;
    ctx.fillRect(leftshift, this.y + Math.floor(i/10)*6, 4, 4);
  }

}

Timer.prototype.setSeconds = function (secs) {
  this.seconds = secs;
}
Timer.prototype.setMinutes = function (mins) {
  this.minutes = mins;
}
