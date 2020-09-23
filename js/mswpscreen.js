import Cell from "./Cell.js"
import Animator from "./animator.js"

const Mswpscreen = function(model, params) {
  
  let _stateArray = model.getState();

  let width = Math.min(params.cellW, params.cellH);
  let height = width;

  let _cells = [];

  let hoveredCell; 


  return {
    name: 'MSWP',
    render: function(ctx, auxCvs) {
      for (let c of _cells) {
        // This is a referential comparison
        if (c !== hoveredCell) {
          c.draw(ctx, auxCvs);
        }
      }
      
      if (hoveredCell) {
        hoveredCell.draw(ctx, auxCvs);
      }
    },
    getModelData() {
       _stateArray = model.getState();

      for (let i = 0; i < model.x; i++) {
        for (let j = 0; j < model.y; j++) {
          _cells[j*model.x+i] = new Cell(_stateArray[i][j], width, height);
          _cells[j*model.x+i]._animation = Animator.pulse(30);
          // console.log(_cells[j*model.x+i]._animation);
        }
      }
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