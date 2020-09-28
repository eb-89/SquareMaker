
import Animator from "./animator.js"


const Transition = function (ctx) {
  
  let timer = 0;

  let boxes = [];

  let RUNSPEED = 5;

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
          x:i*(box.width +0),
          y:j*(box.height +0),
          width: box.width,
          height:box.height,
          draw: function (ctx) {
            ctx.fillStyle ="gray";
            ctx.fillRect(b.x, b.y, b.width, b.height);
          }
        }

        boxes[i].push(b)
      }
  }

  let boxOfBoxes = []

  let left = 0;
  let right = 1;
  for (let i = 0; i< (boxes.length + boxes[0].length-1); i++) {

    let ii = Math.min(i, boxes.length-1);
    let arr = [];

    for (let j=left; j<right; j++) {
      let b = boxes[ii][j];
      
      b.aniFwWidth  = Animator.Linear(0, b.width, RUNSPEED, 1, false);
      b.aniFwWidth.delay = i*1 + Math.round(Math.random()*15)
      b.aniFwHeight = Animator.Linear(0, b.height, RUNSPEED, 1, false);
      b.aniFwHeight.delay = i*1 + Math.round(Math.random()*15)

      b.aniBwWidth  = Animator.Linear(box.height, 0, RUNSPEED, 1, false);
      b.aniBwWidth.delay = i*1 + Math.round(Math.random()*15)
      b.aniBwHeight = Animator.Linear(box.width, 0, RUNSPEED, 1, false);
      b.aniBwHeight.delay = i*1 + Math.round(Math.random()*15)
      
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
        for (let box of boxOfBoxes[i]) {
            box.draw(ctx);      
        }

      }

    },

    update() {

      timer++;

      for (let i= 0; i < boxOfBoxes.length; i++) {
        for (let j= 0; j < boxOfBoxes[i].length; j++) {
          let b = boxOfBoxes[i][j]; 
          
          if (startEnd) {
            b.aniFwWidth.update()
            b.aniFwHeight.update()
            b.width = b.aniFwWidth.value;
            b.height = b.aniFwHeight.value;
          } else {
            b.aniBwWidth.update()
            b.aniBwHeight.update()
            b.width = b.aniBwWidth.value;
            b.height = b.aniBwHeight.value;
          }
        }
      }

      if (timer == 80) {

        for (let boxes of boxOfBoxes) {
          for (let b of boxes) {
            b.aniBwWidth.start()
            b.aniBwHeight.start()
          }
        }

        startEnd = 0;
        doneCB();
      }

      if (timer == 160) {
        this.isRunning = false;
      }
    },

    startTransition(onDone) {

      this.isRunning = true;
      doneCB = onDone;
      startEnd = 1;
      timer = 0;
      for (let boxes of boxOfBoxes) {
        //console.log(box.animationWidth);
        for (let box of boxes) {

          box.aniFwWidth.reset();
          box.aniFwHeight.reset();
          box.aniBwWidth.reset();
          box.aniBwHeight.reset();

          box.aniFwWidth.start();
          box.aniFwHeight.start();
        }
      }
    }
  };
}

export default Transition