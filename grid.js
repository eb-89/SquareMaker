
const Cell = function(data, width, height, color) {

  let _data = data;
  let content = _data.content;
  let textColor = "white"

  return {
    x: _data.x*width,
    y: _data.y*height,
    width,
    height,
    color,
    get content() {return _data.content},
    get hidden() {return _data.hidden},
    get neighbors() {return _data.neighbors},
    get label() {return _data.label},
    textColor
  }
}


const cellCollection = function(x, y, width, height, color, model) {

  let stateArray = model.getState();
  let cells = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      cells[i*x+j] = Cell(stateArray[i][j], width, height, color);
    }
  }

  return {
      cellArray: cells,
      defaultColor: color
  }
}

const Grid = function(model) {

  let width = 30;
  let height = 30;
  let defaultColor = "blue"
  let grid = cellCollection(model._x, model._y, width, height, defaultColor, model)

  return {
    handleClick: function(evt, callback) {
      const cell = _getCell(evt, grid);


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

    // timestamp not in use
    render: function(ctx, timestamp) {

      if (!model.isRunning()) {
        const ts = 30;
        ctx.font = `normal normal bold ${ts}px Courier`;
        const endText = "You hit a mine"
        ctx.fillStyle = "black";
        ctx.fillText(endText, (ctx.canvas.clientWidth - ctx.measureText(endText).width)/2, ctx.canvas.height/2) ;


        return;
      }

      grid.cellArray.forEach( el => {
        ctx.save();
        ctx.translate(el.x, el.y);
        
        if (!el.hidden) {
          if (el.content === "M") {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "magenta";
          }

        } else {
          ctx.fillStyle = el.color;
        }

        ctx.fillRect(0, 0, el.width-1, el.height-1);

        const ts = 18;
        ctx.font = `normal normal bold ${ts}px Courier`;
        ctx.fillStyle = el.textColor;
        const textplaceX = (el.width - ctx.measureText(el.content).width)/2;
        const textplaceY = (el.height + ts)/2;

        if (!el.hidden) {
          if (el.content == "M" || el.neighbors > 0) {
            ctx.fillText(el.content, textplaceX, textplaceY) ;
          } 
        } else {
          ctx.fillText(el.label, textplaceX, textplaceY) ;
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
      cell.textColor = "orange"
      out = cell;
    } else {
      cell.color = grid.defaultColor;
      cell.textColor = "white"
    }
  }
  return out;

}

export default Grid;