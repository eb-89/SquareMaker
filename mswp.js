// testing

let state = [];
let running =  false;



function Cell(x,y, content) {
  return {
    x,
    y,
    content
  }
}

function initialize(i, j) {

  for (let ii = 0; ii<i; ii++ ) {
      state[ii] = [];
    for (let jj = 0; jj < j; jj++) {

      let mine = false;
      let num = Math.random();

      if (num < 0.05) {
        state[ii][jj] = Cell(ii, jj, "M");
      } else {
        state[ii][jj] = Cell(ii, jj, "0");
      }
      // Create cells, with coordiates ii, jj, mine, hidden

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

        if (state[ii + dir[0]] && state[ii + dir[0]][jj + dir[1]]) {
          if (state[ii + dir[0]][jj + dir[1]].mine) {
            state[ii][jj].neighbors++;
          }
        }

      }
    }
  }

}

function floodfill(cell) {

  if (cell.neighbors == 0 && cell.content == "M") {
    cell.hidden = false;

    let i = cell.x;
    let j = cell.y;
    if (state[i][j+1]) {
      floodfill(state[i][j+1]);
    }
    if (state[i][j-1]) {
      floodfill(state[i][j-1]);
    }
    if (state[i+1]) {
      floodfill(state[i+1][j]);
    }
    if (state[i-1]) {
      floodfill(state[i-1][j]);
    }
  }
}

const go = {

  expand: function(x,y) {
    console.log(`click handled at ${x}, ${y}`)
  },

  mark: function(x,y) {
    // mark cell
  },


  isRunning: function() {
    return running;
  },
  init: function init() {
    // randommy place shitz.
    initialize(20,20);
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

  //logging

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


export default go;