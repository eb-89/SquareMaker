

const Pulse = function(ctx, timer) {
  this.timer = timer;
  this.ctx = ctx;
  this.startTime;
  this.endTime;
  this.isRunning;
}

Pulse.prototype.start = function(duration) {
  this.startTime = this.timer.getTime();
  this.endTime = this.startTime + duration;
  this.isRunning = true;
}

Pulse.prototype.play = function(obj, time) { 
  // If endtime is before startTime, run forever
  if (this.endTime < this.startTime) {
      let runtime = this.startTime + time;
      this.ctx.setTransform(1/2*Math.sin(runtime/200), 0, 0, 1/2*Math.sin(runtime/200), obj.x + obj.width/2 ,  obj.y+obj.height/2);
  }
  else if (time < this.endTime) {
      let runtime =  this.endTime - time;
      this.ctx.setTransform(1/2*Math.sin(runtime/200), 0, 0, 1/2*Math.sin(runtime/200), obj.x + obj.width/2 ,  obj.y+obj.height/2);
  } else {
    this.isRunning = false;
  }
}

const Blow = function(ctx, timer) {
  this.timer = timer;
  this.ctx = ctx;
  this.startTime;
  this.endTime;
  this.isRunning;
}

Blow.prototype.start = function(duration) {
  this.startTime = this.timer.getTime();
  this.endTime = this.startTime + duration;
  this.isRunning = true;
}

Blow.prototype.play = function(obj, time) { 
  if (this.endTime < this.startTime) {
    let runtime = this.startTime + time;
    let color= `#${(255*(Math.sin(runtime/200) + 1/2)).toString(16)}0000`
    obj.setColor(`#${Math.round(255*(Math.sin(runtime/200)/3 + 1/2)).toString(16)}0000`);
  }
  else if (time < this.endTime) {
    let runtime =  this.endTime - time;
    let color= `#${(255*(Math.sin(runtime/200) + 1/2)).toString(16)}0000`
    obj.setColor(`#${Math.round(255*(Math.sin(runtime/200)/3 + 1/2)).toString(16)}0000`);
  } else {
    this.isRunning = false;
  }
}


const AnimationFactory = function() {

  let _timer; 
  let _ctx;
  
  return {

    setTimer(timer) {
      _timer = timer;
    },

    setContext(ctx) {
      _ctx = ctx;
    },

    // Animations
    pulse() {
      return new Pulse(_ctx, _timer); 
    },


    blow() {
      return new Blow(_ctx, _timer); 
    },


  }
} 


export default AnimationFactory();