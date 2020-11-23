import {Cell} from "./Cell.js"
import { Canvases } from "./canvases.js"


const Board = function(config, model) {
  
  let _stateArray = model.getState();

  let width = config.vcfg.boardWidth;

  let _cells = [];

  let hoveredCell; 
  let ctx = Canvases.getCanvas().getContext("2d")
  let auxCtx = Canvases.getAuxCanvas()
  let ctxWidth = Canvases.getCanvas().width;

  return {

    render: function() {
      for (let c of _cells) {

        let cellData = _stateArray[c.datax][c.datay] 
        
        if (cellData.isHidden()) {
          c.backgroundColor = `hsl(${config.vcfg.colorscheme.hiddencolor}, 50%, 50%)`
          c.setMarker(cellData.isLabeled());
        } else if (cellData.isMine()) {
          c.setMine(cellData.isMine());
        } else {
          let n = cellData.getNeighbors()
          c.setNeighbors(n);
          c.backgroundColor = `hsl(${config.vcfg.colorscheme.showncolor}, ${(n/8)*100}%, ${100 -(n/8)*100}%)`
        }

        if (model.gameIsWon() && cellData.isMine() && cellData.isLabeled()) {
          c.backgroundColor = config.vcfg.colorscheme.wincolor;
          c.setMine(false);
          c.setMarker(cellData.isLabeled());
        }

        if (model.gameIsLost())  {
          if (cellData.isMine() && cellData.isLabeled()) {
            c.backgroundColor = `hsl(${config.vcfg.colorscheme.hiddencolor}, 50%, 35%)`
            c.setMine(false);
            c.setMarker(cellData.isLabeled());
          }

          if (!cellData.isMine() && cellData.isLabeled()) {
            c.backgroundColor = `hsl(${config.vcfg.colorscheme.hiddencolor}, 50%, 35%)`
            c.setMarker(false)
            c.setFalseFlag(true);
          }
        }

        c.draw();

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
          c.markercolor = config.vcfg.colorscheme.markercolor;
          _cells.push(c)
        }
      }

      hoveredCell = undefined;
    },
    handleClick(evt) {
      const rect = evt.target.getBoundingClientRect();
      const mouseX = evt.clientX - rect.x;
      const mouseY = evt.clientY - rect.y;
      if (hoveredCell && model.isRunning()) {
        switch (evt.button) {
          case 0: 
            model.handleAction(hoveredCell.datax, hoveredCell.datay);
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

            if (_stateArray[cell.datax][cell.datay].isHidden() && model.isRunning()) {
              cell.onMouseEnter();
              cell._enterListener = false;
            }
          }
        } else {
          if (!cell._enterListener) {
            if (_stateArray[cell.datax][cell.datay].isHidden() && model.isRunning()) {
              cell.onMouseExit();
              cell._enterListener = true;
            } else if (cell.tl.progress()>0) {
              cell.tl.reverse();
            }

          }
        } 
      }

    }
  }
}


export default Board