import Cell from "./Cell.js"
// import Animator from "./animator.js"


const Board = function(config, model) {
  
  let _stateArray;

  let width = config.vcfg.boardWidth;

  let _cells = [];

  let hoveredCell; 
  let _ctx = config.cvs.getContext('2d');
  let _auxCvs = config.auxCvs;

  return {

    render: function() {
      for (let c of _cells) {
        if (c === hoveredCell) { continue; }
          c.draw(_ctx, _auxCvs);
      }

      if (hoveredCell) {
        hoveredCell.draw(_ctx, _auxCvs);
      }
    },
    getModelData() {

      const cellW = Math.round(width/config.mcfg.dims.x);
      const cellH = cellW;

       _stateArray = model.getState();
       _cells = [];
      
      let pad = 4;
      for (let i = 0; i < model.x; i++) {
        for (let j = 0; j < model.y; j++) {

          let x = i*(cellW +pad) + (config.cvs.width-width)/2 - Math.round(model.x*pad/2);
          let y = j*(cellH +pad) + (config.cvs.width-width)/2 - 30;


          let c = new Cell(_stateArray[i][j], x, y, cellW, cellH);

          // Eeeh refactor this...
          c.setColorscheme(config.vcfg.colorscheme);
          c.setMarker(config.vcfg.markertype);
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