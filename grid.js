
const Cell = function(x, y, width, height, color) {
  return {
    x,
    y,
    width,
    height,
    color,
    _time: null
  }
}

const cellCollection = function(x, y, width, height, color) {

  let innerGrid = [];
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      innerGrid[i*x+j] = Cell(i*width,j*height, width-1, height-1, color); 
    }
  }
  
  return {
      cellArray: innerGrid,
      defaultColor: color
  }
}

const Grid = function(x,y, width, height,color) {

  let grid = cellCollection(x,y, width, height, color)

  return {
    handleMouseMove: function(evt) {
      _handleMouseMove(grid, evt);
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
        ctx.fillRect(0, 0, el.width, el.height);
        ctx.restore();
      })
    }
  }
}

function _handleMouseMove(grid, evt) {


  const rect = evt.target.getBoundingClientRect();
  const mouseX = evt.clientX - rect.x;
  const mouseY = evt.clientY - rect.y;

  grid.cellArray.forEach( cell => {
    if (
      cell.x < mouseX 
      && cell.y < mouseY 
      && (cell.x + cell.width > mouseX)
      && (cell.y + cell.height > mouseY)
    ) {
      cell.color = "red";
    } else {
      cell.color = grid.defaultColor;
    }
  });

}

export default Grid;