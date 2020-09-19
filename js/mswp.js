
function Cell(x,y, hidden, mine, labeled) {
  this.x = x
  this.y = y
  this.hidden = hidden
  this.mine = mine
  this.labeled = labeled;
  this.neighbors = 0;
}

Cell.prototype.isMine = function() { return this.mine; }
Cell.prototype.isHidden = function() { return this.hidden;}
Cell.prototype.isLabeled = function() {return this.labeled;}
Cell.prototype.getNeighbors = function() { return this.neighbors;}
Cell.prototype.hasNeighbors = function() { return this.neighbors != 0;}
Cell.prototype.setNeighbors = function(n) { this.neighbors = n;}
Cell.prototype.setMine = function() { this.mine = true; }
Cell.prototype.hide = function() { this.hidden = true; }
Cell.prototype.show = function() { this.hidden = false; }


const Mswp = function(x, y, noOfMines) {

  let _state;
  const _x = x
  const _y = y
  let _noOfMines = noOfMines;
  let _running = false;

  return {

    x,
    y,

    handleAction: function(x,y) {
      
    if (this.isRunning()) {
      let cell = _state[x][y];

      if (cell.isMine()) {
          this.end();
        } else if (_state[x][y].neighbors == 0) {
          if (_state[x][y].isLabeled()) {
            _state[x][y].label = "x";
          }
          console.time("a")
          _floodfill(_state, x,y);
          console.timeEnd("a")

        } 
        
        _state[x][y].show();
      }
    },

    mark: function(x,y) {
      if (_state[x][y].isHidden()) {
        if (_state[x][y].label === "") {
          _state[x][y].label = "!";
        } else {
          _state[x][y].label = "";
        }
      }
    },


    isRunning: function() {
      return _running;
    },

    init: function() {
      _state = _initializeState(_x, _y, noOfMines);
    },

    start: function () {
      _running = true;
    },

    end: function () {
      _running = false;
    },

    getState: function getState() {
      return _state;
    }
  }
}

function _addMines(state, noOfMines) {

  let randomArray = Array(state.length*state[0].length).fill(0).fill(1, 0, noOfMines);

  for (let i = 0; i < randomArray.length; i++) {
    let idx1 = Math.floor(Math.random()*randomArray.length);
    let idx2 = Math.floor(Math.random()*randomArray.length);

    let temp = randomArray[idx1]
    randomArray[idx1] = randomArray[idx2]
    randomArray[idx2] = temp;
  }

  for (let i = 0; i < randomArray.length; i++) {
    if (randomArray[i] == 1) {
      state[i % state.length][Math.floor(i/state.length)].setMine();
    }
  }

}


function _initializeState(i, j, noOfMines) {

  console.assert(noOfMines <= i*j);

  let state = [];
  for (let ii = 0; ii<i; ii++ ) {
    state[ii] = [];
    for (let jj = 0; jj < j; jj++) {
      state[ii][jj] = new Cell(ii, jj, true, false, false);
    }
  }

  _addMines(state, noOfMines);

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
          if (state[horz][vert].isMine()) {
            let mine = state[ii][jj];
            mine.setNeighbors(mine.getNeighbors() + 1);
          }
        }
      }
    }
  }

  return state;

}

function _floodfill(state, x,y) {

  if (!state[x] || !state[x][y]) {
    return;
  }

  if (!state[x][y].isHidden()) {
   return;
  }

  if (state[x][y].isMine()) {
    return;
  }

  if (state[x][y].isLabeled()) {
    return;
  }

  if (state[x][y].hasNeighbors()) {
    state[x][y].show();
    return;
  }

  state[x][y].show();


  _floodfill(state, x, y+1);
  _floodfill(state, x, y-1);
  _floodfill(state, x+1, y);
  _floodfill(state, x-1, y);

  _floodfill(state, x+1, y+1);
  _floodfill(state, x+1, y-1);
  _floodfill(state, x-1, y+1);
  _floodfill(state, x-1, y-1);
}

export default Mswp;