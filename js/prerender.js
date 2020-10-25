  // prerender

import { Canvases } from "./canvases.js"
const prerender = function() {

  let auxCvs = Canvases.getAuxCanvas();
  let auxCtx = Canvases.getAuxCanvas().getContext('2d'); 

  auxCtx.textBaseline = "middle";
  let ts = 30;
  let text;
  let numbers = []
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  for (let i = 0; i<10; i++) {

    let o = {
      x: i*50,
      y: 0,
      width: 50,
      height: 50
    }

    text = `${i}`;
    auxCtx.fillStyle = "white";
    auxCtx.setTransform(1, 0, 0, 1, o.x, 0);
    auxCtx.fillText(text, (o.width - auxCtx.measureText(text).width)/2, o.height/2);
    numbers.push(o);
  }

  ts = 15;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  auxCtx.setTransform(1, 0, 0, 1, 0, 50);

  text = `Start`;
  auxCtx.fillText(text, (100 - auxCtx.measureText(text).width)/2, ts);


  ts = 15;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  auxCtx.setTransform(1, 0, 0, 1, 0, 100);
  text = `restart`;
  auxCtx.fillText(text, (100 - auxCtx.measureText(text).width)/2, ts);

  ts = 15;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  auxCtx.setTransform(1, 0, 0, 1, 0, 150);
  text = `home`;
  auxCtx.fillText(text, (100 - auxCtx.measureText(text).width)/2, ts);

  ts = 30;
  auxCtx.font = `normal normal bold ${ts}px Courier`;
  auxCtx.fontColor = `blue`;
  auxCtx.setTransform(1, 0, 0, 1, 0, 200);
  // ctx.fillStyle = "blue";
  text = `Squares`;
  auxCtx.fillText(text, (150 - auxCtx.measureText(text).width)/2, ts);

  return {
    auxCvs,
    numberGlyphs: numbers
  }

}

export default prerender