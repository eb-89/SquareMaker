
const Cell = function(x, y, width, height, color, content) {
  return {
    x,
    y,
    width,
    height,
    color,
    _time: null,
    content: content,
    hidden: true
  }
}

const cellCollection = function(x, y, width, height, color, model) {

  let stateArray = model.getState();
  let innerGrid = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      innerGrid[i*x+j] = Cell(i*width,j*height, width, height, color, stateArray[x][y].content);
      // Doesn't work 
      innerGrid[i*x+j].hidden = stateArray[x][y].hidden;
    }
  }
  
  return {
      cellArray: innerGrid,
      defaultColor: color
  }
}

const Grid = function(x,y, width, height,color, model) {

  let grid = cellCollection(x,y, width, height, color, model)

  return {
    handleMouseClick: function(evt, callback) {
      const cell = _getCell(evt, grid);
      // cell.hidden = !cell.hidden;
      if (cell) {
        callback(cell.x/cell.width, cell.y/cell.height);
      }
    },

    handleMouseMove: function(evt) {
      let cell = _getCell(evt, grid);
    },

    setDefaultColor: function(color) {
      grid.defaultColor = color;
      grid.cellArray.forEach(el => {
        el.color = color;
      })
    },

    render: function(ctx, timestamp) {
      grid.cellArray.forEach( el => {
        el._time = timestamp;
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.fillStyle = el.color;
        ctx.fillRect(0, 0, el.width-1, el.height-1);

        if (!el.hidden) {
          const ts = 18;
          ctx.font = `normal normal bold ${ts}px Courier`;
          ctx.fillStyle = "white";
          const textplaceX = (el.width - ctx.measureText(el.content).width)/2;
          // const textplaceY = (el.height - ctx.measureText(el.content).height)/2;
          const textplaceY = el.height - ts/2;

          ctx.fillText(el.content, textplaceX, textplaceY) ;
        }
        ctx.restore();
      })
    }
  }
}

// Also highlights the cell.
function _getCell(evt, grid) {

  const rect = evt.target.getBoundingClientRect();
  const mouseX = evt.clientX - rect.x;
  const mouseY = evt.clientY - rect.y;
  let out;
  for (let cell of grid.cellArray) {
    if (
      cell.x < mouseX 
      && cell.y < mouseY 
      && (cell.x + cell.width > mouseX)
      && (cell.y + cell.height > mouseY)
    ) {
      cell.color = "red";
      out = cell;
    } else {
      cell.color = grid.defaultColor;
    }
  }
  return out;

}

export default Grid;