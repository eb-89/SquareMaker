import { Canvases } from "./canvases.js"


const Transition = function() {
  

  const cvs = Canvases.getCanvas()
  const ctx = cvs.getContext("2d")
  let boxes = [];

  let box = {
    x:0,
    y:0,
    width: 20,
    height: 20
  }

  for (let i=0; i< ctx.canvas.width/box.width; i++) {
      for (let j=0; j< ctx.canvas.height/box.height; j++) {

        let b = {
          x:i*(box.width),
          y:j*(box.height),
          width: 0,
          targetWidth: 20,
          height: 0,
          targetHeight: 20,

          draw: function (ctx) {
            ctx.fillStyle ="darkblue";
            ctx.fillRect(b.x, b.y, b.width, b.height);
          }
        }

        boxes.push(b)
      }
  }

  let split = 5;
  let buckets = []

  for (let i = 0; i<split; i++) {
    buckets[i] = []
  }

  for (let box of boxes) {
    let idx = Math.round(Math.random()*(split-1));
    buckets[idx].push(box);
  }

  let onTransition;
  let isRunning = false;

  let tl = gsap.timeline({paused: true});

  for (let bucket of buckets) {
    
    if (bucket.length == 0) {continue;}

    tl.to(bucket,  {
      width: function(index, target, targets) { //function-based value
          // console.log(index);
          return target.targetWidth;
      },
      height: function(index, target, targets) { //function-based value
          return target.targetHeight;
      },
      duration: function(index, target, targets) { //function-based value
           return 0.3
      }
      }, "-=0.2")

  }

  tl.call(() => {
    isRunning = false; 
    onTransition()

  }, null, "+=0.1");


  tl.call(() => {
    tl.reverse().then(() => {
      gsap.ticker.remove(render);
      ctx.clearRect(0,0, cvs.width, cvs.height)
      activeSceen.render();
    });
  })

  let activeSceen;

  function render() {
      ctx.clearRect(0,0, cvs.width, cvs.height)
      activeSceen.render();
      for (let box of boxes) {
          box.draw(ctx);
      }
  }

  return {

    setActiveScreen(screen) {
      activeSceen = screen;
    },

    onTransition(cb) {
      onTransition = cb;
    },

    startTransition() {
      gsap.ticker.add(render);
      tl.play();
      isRunning = true;

    },
    isRunning() {
      return isRunning;
    }
  };
}

export default Transition