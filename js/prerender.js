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
    auxCtx.fillStyle = "black";
    auxCtx.setTransform(1, 0, 0, 1, o.x, 0);
    auxCtx.fillText(text, (o.width - auxCtx.measureText(text).width)/2, o.height/2);
    numbers.push(o);
  }
  
  return {
    numberGlyphs: numbers
  }

}

export default prerender