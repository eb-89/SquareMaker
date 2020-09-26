
import Animator from "./animator.js"


const Transition = function (ctx) {
  
  let t = 0;

  let boxes = [];

  let box = {
    x:0,
    y:0,
    width: 20,
    height: 20
  }


  for (let i=0; i< ctx.canvas.width/box.width; i++) {
      boxes[i] = [];
      for (let j=0; j< ctx.canvas.height/box.height; j++) {

        let b = {
          x:j*(box.width +1),
          y:i*(box.height +1),
          width: box.width,
          height:box.height,
          draw: function (ctx) {
            ctx.fillStyle ="gray";
            ctx.fillRect(b.x, b.y, b.width, b.height);
          }
        }
        b.animation = Animator.expand();
        boxes[i].push(b)
      }
  }

  let boxOfBoxes = []
  let p = 0;
  let q = 0;
  let check = 0;

  let left = 0;
  let right = 1;
  for (let i = 0; i< (boxes.length + boxes[0].length-1); i++) {

    let ii = Math.min(i, boxes.length-1);
    let arr = [];

    for (let j=left; j<right; j++) {
      arr.push(boxes[ii][j])
      ii--;
    }

    if (i < boxes.length -1) {right++} else {left++}
    boxOfBoxes.push(arr);
  }

  let doneCB;

  let startEnd = 1;

  return {
    isRunning: false,
    render(ctx) {

      if (!this.isRunning) {
        return;
      }

      for (let i= 0; i< boxOfBoxes.length; i++) {

        let time;
        for (let box of boxOfBoxes[i]) {
          if (i == boxOfBoxes[i].length-1) { console.log(box);}
          if (box.animation.isRunning) { 
            time =  box.animation.run(box)

            if (time >30) {
              box.animation.stop();
              box.ended = true;
              continue;
            }

            if (i === boxOfBoxes.length-1 && box == boxOfBoxes[i][boxOfBoxes[i].length-1]) {
              console.log(true);
              this.isRunning = false;
              doneCB();
            }
          } else {
            if (box.ended) {
              // console.log("draw");
              box.draw(ctx);
            }
          }
        }


        if (boxOfBoxes[i+1] && time > 3) {
          for (let box of boxOfBoxes[i+1]) {
            box.animation.start();
          }
        }

      }

    },

    startTransition(onDone) {

      this.isRunning = true;
      doneCB = onDone;
      boxOfBoxes[0][0].animation.start();
    }
  };
}

export default Transition