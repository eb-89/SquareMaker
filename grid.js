// TODO: break out this file


const Cell = function(data, width, height, color) {

  let defaultColor = "#0000FF";
  let _data = data;
  let content = _data.content;
  let textColor = color;

  let animationLength = 1000;
  let animationStartTime;
  let _enterListener = true;

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
    textColor,

    setAnimationStart: function (timestamp) {
        animationStartTime = timestamp;
    },

    onMouseEnter: function() {},

    onMouseExit: function() {},

    animate: function (timestamp) {
      let runtime = timestamp - animationStartTime;
      if (runtime < animationLength) {
        let color = Math.sin(Math.PI*(runtime/animationLength))/1.5+0.1;
        let r = Math.round(color*255).toString(16);
        let g = Math.round(color*255).toString(16);
        // let b = Math.round(color*255).toString(16);
        let b = (255).toString(16);

        if (this.hidden) {
          this.color = `#${r}${g}${b}`;
        }
      } else {
          this.color = defaultColor;
      }
    }
  }
}


const cellCollection = function(x, y, width, height, color, model) {

  let stateArray = model.getState();
  let cells = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      cells[i*y+j] = Cell(stateArray[i][j], width, height, color);
    }
  }

  return {
      cellArray: cells,
      defaultColor: color
  }
}

const Grid = function(model, gridWidth, gridHeight) {


  let _timestamp;
  let width = Math.min(Math.round(gridWidth/model._x), Math.round(gridHeight/model._y));
  let height = width;
  let defaultColor = "blue"
  let grid = cellCollection(model._x, model._y, width, height, defaultColor, model)

  console.log(grid.cellArray);

  for(let cell of grid.cellArray) {

    // TODO: rewrite this
     cell.onMouseEnter = () => {
        cell.setAnimationStart(_timestamp);
     }
     cell.onMouseExit = () => {
       
     }
  }

  return {
    handleClick: function(evt, callback) {
      const cell = _getCell(evt, grid);

      if (cell) {
        callback(cell.x/cell.width, cell.y/cell.height);
      } 
    },

    handleMouseMove: function(evt) {
      _handleMouseMove(evt, grid);
    },

    setDefaultColor: function(color) {
      grid.defaultColor = color;
      grid.cellArray.forEach(el => {
        el.color = color;
      })
    },

    render: function(ctx, timestamp) {

      _timestamp = timestamp;

      if (!model.isRunning()) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const ts = 30;
        ctx.font = `normal normal bold ${ts}px Courier`;
        const endText = "You hit a mine"
        ctx.fillStyle = "black";
        ctx.fillText(endText, (ctx.canvas.clientWidth - ctx.measureText(endText).width)/2, ctx.canvas.height/2) ;
        return;
      }


      const ts = 10;
      ctx.font = `normal normal bold ${ts}px Courier`;

      for (let el of grid.cellArray) {

        // TODO: swap out all these colors
        ctx.setTransform(1, 0, 0, 1, el.x, el.y);
        if (!el.hidden) {
          if (el.content === "M") {
            ctx.fillStyle = "red";
          } else {
            ctx.fillStyle = "darkgray";
          }
        } else {
          ctx.fillStyle = el.color;
        }


        ctx.fillRect(0, 0, el.width-1, el.height-1);

        el.animate(_timestamp);

        const textplaceX = (el.width - ctx.measureText(el.content).width)/2;
        const textplaceY = (el.height + ts)/2;

        ctx.fillStyle = el.textColor;
        
        if (!el.hidden) {
          if (el.content == "M" || el.neighbors > 0) {
            ctx.fillText(el.content, textplaceX, textplaceY) ;
          } 
        } else {

          ctx.fillText(el.label, textplaceX, textplaceY) ;
        }

      }
    }
  }
}

function _handleMouseMove (evt, grid) {
  for (let cell of grid.cellArray) {

    const rect = evt.target.getBoundingClientRect();
    const mouseX = evt.clientX - rect.x;
    const mouseY = evt.clientY - rect.y;

    if (
      cell.x < mouseX 
      && cell.y < mouseY 
      && (cell.x + cell.width > mouseX)
      && (cell.y + cell.height > mouseY)
    ) {

      if (cell._enterListener) {
        cell.onMouseEnter();
        cell._enterListener = false;
      }
    } else {
      if (!cell._enterListener) {
        // mouseExit
        cell.onMouseExit();
        cell._enterListener = true;
      }

      // handle default case
      cell.color = cell.color;
      cell.textColor = "white"

    }
  }

}


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
    return cell;
    }
  }
}

export default Grid;