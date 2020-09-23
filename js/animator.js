
const Animation = function () {
  this.t = 0;
  this.isRunning = false;
  this.start = function () {
      // this.t = 0;
      this.isRunning = true;
  },
  this.stop = function () {
    this.isRunning = false;
  },
  this.update = function (timestep) {
    this.t += timestep;
  },
  this.reset = function() {
    this.t = 0;
  }
}

const Pulse = function(ctx, duration) { 
  Animation.call(this);
  if (duration) {  
    this.end = this.t + duration;
  }
  this.ctx = ctx;
}

Pulse.prototype.play = function(obj) {

    this.ctx.transform(1,0,0,1, obj.width/2, obj.height/2);
    this.ctx.transform(0.2*Math.sin(this.t/5) + 1, 0, 0, 0.2*Math.sin(this.t/5) + 1, 0 ,  0);
    this.ctx.transform(1,0,0,1, -obj.width/2, -obj.height/2);
    // console.log("updating", obj);
    
    if (this.end && this.end < this.t) {
      this.isRunning = false;
      this.reset();
    } else {
      this.update(1);
    }
}


const Spin = function(ctx, duration) { 
  Animation.call(this);
  if (duration) {  
    this.end = this.t + duration;
  }
  this.ctx = ctx;
}

Spin.prototype.play = function(obj) {
    this.ctx.transform(1,0,0,1, obj.width/2, obj.height/2);
    this.ctx.transform(Math.sin(this.t/5), 0, 0, 1, 0 ,  0);
    this.ctx.transform(1,0,0,1, -obj.width/2, -obj.height/2);
    // console.log("updating", obj);
    
    if (this.end && this.end < this.t) {
      this.isRunning = false;
      this.reset();
    } else {
      this.update(1);
    }
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
  
    let _ctx;
    return {
    // Animations

      setContext(ctx) {
        _ctx = ctx;
      },

      pulse(duration) {
        return new Pulse(_ctx, duration); 
      },


      spin(duration) {
        return new Spin(_ctx, duration); 
      },


  }
} 


export default AnimationFactory();