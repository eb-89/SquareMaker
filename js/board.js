import Cell from "./Cell.js"
import Animator from "./animator.js"


const Board = function(ctx, auxCvs, model, params) {
  
  let _stateArray;

  // let width = Math.min(params.cellW, params.cellH);
  let width = 300;



  let _cells = [];

  let hoveredCell; 
  let _ctx = ctx;
  let _auxCvs = params.auxCvs;

  return {

    draw: function(ctx, auxCvs) {
      for (let c of _cells) {
        if (c === hoveredCell) { continue; }
          c.update()
          c.draw(ctx);
      }

      if (hoveredCell) {
        hoveredCell.update();
        hoveredCell.draw(ctx);
      }
    },
    getModelData() {

      const cellW = width/params.mcfg.dims.x;
      const cellH = cellW;

       _stateArray = model.getState();
       _cells = [];
       
      for (let i = 0; i < model.x; i++) {
        for (let j = 0; j < model.y; j++) {
          let c = new Cell(_stateArray[i][j], cellW, cellH, _auxCvs);

          // Eeeh refactor this...
          c.setColorscheme(params.vcfg.colorscheme);
          c.setMarker(params.vcfg.markertype);
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
              console.log("DEATH");
            }
            break;
          case 2:
            model.mark(hoveredCell.datax, hoveredCell.datay);
            if (hoveredCell.isLabeled()) {
              hoveredCell.marker.animationRadius.start();
            } else {
              hoveredCell.marker.animationRadius.stop();
              hoveredCell.marker.animationRadius.reset();
            }
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