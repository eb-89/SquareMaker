import {Cell} from "./Cell.js"
// import Animator from "./animator.js"
import { Canvases } from "./canvases.js"


const Board = function(config, model) {
  
  let _stateArray;

  let width = config.vcfg.boardWidth;

  let _cells = [];

  let hoveredCell; 
  let ctx = Canvases.getCanvas().getContext("2d")
  let auxCtx = Canvases.getAuxCanvas()
  let ctxWidth = Canvases.getCanvas().width;

  return {

    render: function() {
      for (let c of _cells) {
        if (c === hoveredCell) { continue; }
          c.draw();
      }

      if (hoveredCell) {
        hoveredCell.draw();
      }
    },
    getModelData() {

      const cellW = config.vcfg.cellSize;
      const cellH = cellW;

       _stateArray = model.getState();
       _cells = [];
      
      let pad = 4;

      let bx = Math.round((ctxWidth - model.x*(config.vcfg.cellSize + pad))/2);
      let by = 100
      for (let i = 0; i < model.x; i++) {
        for (let j = 0; j < model.y; j++) {

          let x = bx + i*(cellW +pad);
          let y = by + j*(cellH +pad);

          let c = new Cell(_stateArray[i][j], x, y, cellW, cellH);

          // c.setColorscheme(config.vcfg.colorscheme);
          // c.setMarker(config.vcfg.markertype);
          _cells.push(c)
        }
      }

      hoveredCell = undefined;
    },
    handleClick(evt) {
      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;
      if (hoveredCell) {
        switch (evt.button) {
          case 0: 
            model.handleAction(hoveredCell.datax, hoveredCell.datay);
            if (!model.isRunning()) {
              model.reveal();
            }
            break;
          case 2:
            model.mark(hoveredCell.datax, hoveredCell.datay);
            break;
        }
      }
    },
    handleMouseMove(mouseX, mouseY) {
      
      hoveredCell = undefined;
      
      for (let cell of _cells) {
        if (cell.contains(mouseX, mouseY)) {
          hoveredCell = cell;
          if (cell._enterListener) {
            cell.onMouseEnter();
            cell._enterListener = false;
          }
        } else {
          if (!cell._enterListener) {
            cell.onMouseExit();
            cell._enterListener = true;
          }
        } 
      }

    }
  }
}


export default Board