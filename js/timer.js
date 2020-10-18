export function Timer(x,y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.seconds = 0;
  this.minutes = 0;
}


Timer.prototype.draw = function(ctx, auxCvs) {
  let secfirst = Math.floor(this.seconds/10);
  let minfirst = Math.floor(this.minutes/10);
  let seclast = this.seconds % 10;
  let minlast = this.minutes % 10;

  ctx.drawImage(auxCvs, minfirst  *50, 0, 50, 50, this.x, this.y, this.width, this.height);
  ctx.drawImage(auxCvs, minlast  *50, 0, 50, 50, this.x +50, this.y, this.width, this.height);
  ctx.drawImage(auxCvs, secfirst  *50, 0, 50, 50, this.x+100, this.y, this.width, this.height);
  ctx.drawImage(auxCvs, seclast  *50, 0, 50, 50, this.x +150, this.y, this.width, this.height);
}

Timer.prototype.setSeconds = function (secs) {
  this.seconds = secs;
}
Timer.prototype.setMinutes = function (mins) {
  this.minutes = mins;
}
