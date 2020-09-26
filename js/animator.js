
const Animation = function() {
  // this.draw = draw;
  this.start = function () {
    this.isRunning = true;
  },
  this.stop = function () {
    this.isRunning = false;
  },
  this.reset = function() {
    this.t = 0;
  },
  this.revert = function() {
    this.reverted = !this.reverted
  }
}


const Linear = function(from, to, duration, times, repeat ) {
  this.from = from;
  this.to = to;
  // maybe
  this.duration = duration;
  this.times = times;
  this.repeat = repeat;
  this.t = 0;
  this.value = from;
  this.reverted;
}

Linear.prototype = new Animation();
Linear.prototype.update = function() {
  this.reverted ? this.t-- : this.t++;


  // Broken.
  if (this.isRunning) {
    this.value = this.from + (this.to - this.from)/this.duration*this.t;
  }

  if (!this.reverted) {

    if (this.repeat && this.t === this.duration) {
      this.t = 0;
    }
  } else {
    if (this.repeat && this.t === 0) {
      this.t = this.duration;
    }
  }

  if (this.reverted) {

    if (this.t == 0)  {
      this.stop()
    } 
  }  else {
    if (this.t == this.duration) {
      this.stop();
    } 
  }
  return this.t;
}


const Sine = function(from, to, duration, times, repeat ) {
  Animation.call(this, from, to, duration, times, repeat);
  this.period = 2*Math.PI;
}
Sine.prototype = new Animation();
Sine.prototype.update = function() {
  this.t++;
  if (this.isRunning) {
    this.value = Math.sin(this.period*(this.t)/this.duration);
  }


  if (this.repeat && t === this.duration) {
    t = 0;
  }
  return t;
}

Sine.prototype.setPeriod = function(period) {
  this.period = period;
}

//const Blow = function(ctx, timer) {
//  this.timer = timer;
//  this.ctx = ctx;
//  this.startTime;
//  this.endTime;
//  this.isRunning;
//}
//
//Blow.prototype.start = function(duration) {
//  this.startTime = this.timer.getTime();
//  this.endTime = this.startTime + duration;
//  this.isRunning = true;
//}
//
//Blow.prototype.play = function(obj, time) { 
//  if (this.endTime < this.startTime) {
//    let runtime = this.startTime + time;
//    let color= `#${(255*(Math.sin(runtime/200) + 1/2)).toString(16)}0000`
//    obj.setColor(`#${Math.round(255*(Math.sin(runtime/200)/3 + 1/2)).toString(16)}0000`);
//  }
//  else if (time < this.endTime) {
//    let runtime =  this.endTime - time;
//    let color= `#${(255*(Math.sin(runtime/200) + 1/2)).toString(16)}0000`
//    obj.setColor(`#${Math.round(255*(Math.sin(runtime/200)/3 + 1/2)).toString(16)}0000`);
//  } else {
//    this.isRunning = false;
//  }
//}


const AnimationFactory = function() {
  
    return {

      expand() {
        let t1 = (ctx, obj,t) => {
          obj.width += 0.1;
          obj.height += 0.1;
        }

        // return new Animation([t1], _ctx); 
      },

      Linear(from, to, duration, times, repeat) {
        return new Linear(from, to, duration, times, repeat); 
      },
  }
} 


// TODO:
// Transforms
// Example:
// let t1 = (ctx, obj,t) => {
//   ctx.setTransform(1,0,0,1, obj.x + obj.width/2, obj.y+ obj.height/2);
//   ctx.transform(0.2*Math.sin(t/5) + 1, 0, 0, 0.2*Math.sin(t/5) + 1, 0 ,  0);
//   ctx.transform(1,0,0,1, -(obj.x + obj.width/2), -(obj.y+ obj.height/2));
// }

export default AnimationFactory();