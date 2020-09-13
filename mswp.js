// testing

const jsonlog = function(log, obj) {
  let out = JSON.stringify(obj, function(key, val) {
    return (typeof val === 'function') ? '' + val : val;
  });
  console.log(log, out)
} 


let state = [];
let running =  false;

function Cell(x,y, content, hidden) {
  return {
    x,
    y,
    content,
    hidden,
    label: "",
    neighbors: 0
  }
}


function initialize(i, j) {

  for (let ii = 0; ii<i; ii++ ) {
      state[ii] = [];
    for (let jj = 0; jj < j; jj++) {

      let mine = false;
      let num = Math.random();

      if (num < 0.15) {
        state[ii][jj] = Cell(ii, jj, "M", true);
      } else {
        state[ii][jj] = Cell(ii, jj, "", true);
      }
    }
  }

  let directions = [
    [-1,-1],
    [ 0,-1],
    [ 1,-1],
    [-1, 0],
    // [ 0, 0],
    [ 1, 0],
    [-1, 1],
    [ 0, 1],
    [ 1, 1],
  ]

  for (let ii = 0; ii<i; ii++ ) {
    for (let jj = 0; jj < j; jj++) {
      for (let dir of directions) {
        let horz = ii + dir[0];
        let vert = jj + dir[1];

        if (state[horz] && state[horz][vert]) {
          if (state[horz][vert].content === "M") {
            state[ii][jj].neighbors++;
          }
        }
      }
      
      if (!(state[ii][jj].content === "M")) {
        state[ii][jj].content = `${state[ii][jj].neighbors}`;
      }
    }
  }

}

function _floodfill(x,y) {


  if (!state[x] || !state[x][y]) {
    return;
  }
  if (state[x][y].content == "M") {
    return;
  }

  if (state[x][y].label == "!") {
    return;
  }

  if (state[x][y].neighbors > 0) {
    state[x][y].hidden = false;
    return;
  }

  if (!state[x][y].hidden) {
    return;
  }

  state[x][y].hidden = false;

  _floodfill(x, y+1);
  _floodfill(x, y-1);
  _floodfill(x+1, y);
  _floodfill(x-1, y);

  _floodfill(x+1, y+1);
  _floodfill(x+1, y-1);
  _floodfill(x-1, y+1);
  _floodfill(x-1, y-1);
}

const go = function(x, y) {
  
  return {

    _x: x,
    _y: y,

    handleAction: function(x,y) {

    if (this.isRunning()) {
      if (state[x][y].content === "M") {
          this.end();
        } else if (state[x][y].neighbors == 0) {
          _floodfill(x,y);
        } 
        
        state[x][y].hidden = false;
      }
    },

    mark: function(x,y) {
      if (state[x][y].hidden) {
        if (state[x][y].label === "") {
          state[x][y].label = "!";
        } else {
          state[x][y].label = "";
        }
      }
    },


    isRunning: function() {
      return running;
    },

    init: function init() {
      initialize(this._x, this._y);
    },

    start: function () {
      running = true;
    },

    end: function () {

      running = false;
    },

    move: function move(i,j) {
      if (!running) {
        console.log("cannot make move, game is not running");
        return;
      }

      if (state[i][j].mine) {
        console.log("Moved on mine, game over");
        running = false;
      }

      if (state[i][j].neighbors == 0) {
        floodfill(state[i][j]);
      }
      if (state[i][j].hidden) {
        state[i][j].hidden = false;
      }
    },
    

    getState: function getState() {
      return state;
    },


    printState: function printState() {

      for (let row of state) {
        let out = "";
        for (let cell of row) {
          if (cell.hidden) {
            out = out + " H ";
          } else if (cell.mine) {
            out = out + " X ";
          } else {
            out = out + " " + cell.neighbors + " ";
          }
        }

        console.log(out);
      }
    }
  }
}


export default go;