const Timer = function() {
  this.time;
  this.update = function(time) {
    this.time = time;
  }
  this.getTime = function() {
    return this.time;
  } 
}

export default Timer;