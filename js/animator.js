
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
  this.duration = 0;
}

const PulseT = function(ctx, duration) { 
  Animation.call(this);
  if (duration) {  
    this.duration = duration;
    this.end = this.t + this.duration;
  }
  this.ctx = ctx;
}

PulseT.prototype.play = function(obj) {

    this.ctx.setTransform(1,0,0,1, obj.x + obj.width/2, obj.y+ obj.height/2);
    this.ctx.transform(0.2*Math.sin(Math.PI + this.t/5) + 1, 0, 0, 0.2*Math.sin(Math.PI + this.t/5) + 1, 0 ,  0);
    this.ctx.transform(1,0,0,1, -(obj.x + obj.width/2), -(obj.y+ obj.height/2));

    if (this.end && this.end <= this.t) {
      this.isRunning = false;
      this.reset();
    } else {
      this.update(1);
    }
}


const SpinT = function(ctx, duration) { 
  Animation.call(this);
  if (duration) {  
    this.end = this.t + duration;
  }
  this.ctx = ctx;
}

SpinT.prototype.play = function(obj) {
    // This does not reset the transform!!
    this.ctx.transform(1,0,0,1, obj.x + obj.width/2, obj.y + obj.height/2);
    this.ctx.transform(Math.sin(this.t/5), 0, 0, 1, 0 ,  0);
    this.ctx.transform(1,0,0,1, -(obj.x + obj.width/2), -(obj.y + obj.height/2));
    
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

      pulseT(duration) {
        return new PulseT(_ctx, duration); 
      },


      spinT(duration) {
        return new SpinT(_ctx, duration); 
      },


  }
} 


export default AnimationFactory();