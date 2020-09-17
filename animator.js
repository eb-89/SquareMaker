
const Animator = function(ctx) {

  let _timestamp = null;
  let _ctx = ctx;
  
  return {

    setTimestamp(timestamp) {
      this._timestamp = timestamp;
    },

    pushIn(obj, duration, delay) {
      let startTime = this._timestamp;
      
      return function (timestamp) {

        if (timestamp > startTime + delay) {

          obj.x++;
          obj.y++;
          
          let remaining = (startTime + duration) - timestamp;
          return remaining;
        } 
        return 0;
      }
    },

    pushOut(obj, duration, delay) {
      let startTime = this._timestamp;
      let ctx = this._ctx;
      
      return function (timestamp) {

        if (timestamp > startTime + delay) {

          obj.x--;
          obj.y--;
          
          let remaining = (startTime + duration) - timestamp;
          return remaining;
        } 
        return 0;
      }
    },

    pulse(obj, duration, delay) {
      let startTime = this._timestamp;
      let ctx = this._ctx;
      return function (timestamp) {

        if (timestamp > startTime + delay) {
          let runtime = startTime + delay - timestamp;
          _ctx.setTransform(1/2*Math.sin(runtime/200), 0, 0, 1/2*Math.sin(runtime/200), obj.xPos + obj.width/2 ,  obj.yPos+obj.height/2);
          return 0;
        } 
        return 0;
      }
    },

    blow(obj, duration, delay) {
      let startTime = this._timestamp;
      let ctx = this._ctx;
      return function (timestamp) {

        if (timestamp > startTime + delay) {
          let runtime = startTime + delay - timestamp;
          let color= `#${(255*(Math.sin(runtime/200) + 1/2)).toString(16)}0000`
          obj.setColor(`#${Math.round(255*(Math.sin(runtime/200)/3 + 1/2)).toString(16)}0000`); 

          let remaining = (startTime + duration) - timestamp;
          return remaining;
        } 
        return 0;
      }
    },


  }
} 


export default Animator;