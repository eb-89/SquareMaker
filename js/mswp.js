
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


const Mswp = function() {

  let _state;
  let _running = false;

  let won = false;
  let lost = false;

  let seconds = 0;
  let minutes = 0;
  let tick;
  let onTick;

  let firstClick = true;
  let minesLeft;

  const handleFirstClick = function () {
    if (firstClick) {
      firstClick = false;
      tick = setInterval(() => {
        seconds++;

        if (onTick) { onTick() }

        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
      }, 1000)
    }
  }

  const gameIsWon = function() {
    for (let row of _state) {
      for (let cell of row) {

        if (!cell.isMine() && cell.isHidden()) {
          return false;
        }

        if (cell.isMine() && !cell.isLabeled()) {
          return false;
        }
      }
    }
    return true;
  }

  return {

    gameIsWon: function () {
      return won;
    },

    handleAction: function(x,y) {
      handleFirstClick();
      if (this.isRunning()) {
        let cell = _state[x][y];

        if (cell.isLabeled()) {
          return;
        }

        if (cell.isMine()) {
            this.end();
        } else {
          _floodfill(_state, x,y);
        }

        if (gameIsWon()) {
           won = true;
           this.end()
        }
      }
    },

    mark: function(x,y) {
      handleFirstClick();
      if (_state[x][y].isHidden()) {
          _state[x][y].labeled = !_state[x][y].labeled;
          _state[x][y].labeled ? minesLeft-- : minesLeft++;
          
          
      }
      if (gameIsWon()) {
          won =true;
          this.end();
      }
    },


    isRunning: function() {
      return _running;
    },

    init: function(mcfg) {
      this.x = mcfg.dims.x;
      this.y = mcfg.dims.y;
      _state = _initializeState(mcfg.dims.x, mcfg.dims.y, mcfg.mines);
      minesLeft = mcfg.mines;
      seconds = 0;
      minutes = 0;
      won = false;
      lost = false;
      
    },

    start: function () {
      _running = true;
    },

    end: function () {
      _running = false;
      lost = true;
      clearInterval(tick);
      this.reveal();

      firstClick = true;
    },

    getState: function () {
      return _state;
    },
    setOnTick(cb) {
      onTick = cb;
    },

    getSeconds() {
      return seconds;
    },

    getMinutes() {
      return minutes;
    },
    getMinesLeft() {
      if (minesLeft > 0) {
        return minesLeft
      } else {
        return 0
      }
    },

    reveal: function () {
      for (let row of _state) {
        for (let cell of row) { 
          if (cell.isMine() || cell.isLabeled())
          cell.show();
        }
      }
      
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