import Cell from "./Cell.js"
import Animator from "./animator.js"

const Mswpscreen = function(ctx, auxCvs, model, params) {
  
  let _stateArray = model.getState();

  let width = Math.min(params.cellW, params.cellH);
  let height = width;

  let _cells = [];

  let hoveredCell; 
  let _ctx = ctx;
  let _auxCvs = params.auxCvs;

  return {
    name: 'MSWP',

    render: function(ctx, auxCvs) {

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
       _stateArray = model.getState();
       _cells = [];
          console.log("State is ", _stateArray);


      for (let i = 0; i < model.x; i++) {
        for (let j = 0; j < model.y; j++) {
          let c = new Cell(_stateArray[i][j], width, height, _auxCvs);

          // Eeeh refactor this...
          c.setColorscheme(params.cfg.colorscheme);
          c.setMarker(params.cfg.markertype);
          _cells.push(c)
        }
      }
      // console.log(_cells);
      hoveredCell = undefined;
    },
    handleClick(mouseX, mouseY, cb) {
      // let cell = _getCell(mouseX, mouseY, _cells)
      if (hoveredCell) {
        cb(hoveredCell);
      }
    },
    handleMouseMove(mouseX, mouseY) {
      
      hoveredCell = undefined;
      
      for (let cell of _cells) {
        if (
          cell.x < mouseX 
          && cell.y < mouseY 
          && (cell.x + cell.width > mouseX)
          && (cell.y + cell.height > mouseY)
        ) {
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


export default Mswpscreen