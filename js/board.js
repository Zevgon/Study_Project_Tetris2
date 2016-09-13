import Tile from './tile';
import I from './i';
import Brick from './brick';
import RedZ from './red_z';
import GreenZ from './green_z';
import T from './t';
import { tileBelow, tileLeft, tileRight, lowestYCoords, monkeyPatches, moveSquareDown} from './util';
monkeyPatches();

class Board {
  constructor () {
    let grid = [];
    for (let i = 0; i < 20; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Tile([i, j], ''));
      }
      grid.push(row);
    }

    this.fallenCoords = [];
    this.grid = grid;
    this.pieceTypes = [I, Brick, RedZ, GreenZ, T];
    this.currentPiece = this.sample();

    this.sample = this.sample.bind(this);
    this.update = this.update.bind(this);
    this.maybeStop = this.maybeStop.bind(this);
    this.clearCurrentPieceTiles = this.clearCurrentPieceTiles.bind(this);
    this.validCoords = this.validCoords.bind(this);
    this.clearLines = this.clearLines.bind(this);
    this.clearLine = this.clearLine.bind(this);
  }

  clearLines () {
    let yCoords = this.currentPiece.coords.map(coord => coord[0]).uniq();
    let that = this;
    let clearedYs = [];
    yCoords.forEach(yCoord => {
      let clear = !this.grid[yCoord].any(tile => tile.className === '');
      if (clear) {
        that.clearLine(yCoord);
        clearedYs.push(yCoord);
      }
    });
    if (clearedYs.length > 1) {
      clearedYs = clearedYs.mergeSort();
      let gapLines = [];
      for (let i = clearedYs[0]; i < clearedYs.last(); i++) {
        if (!clearedYs.includes(i)) {
          gapLines.push(i);
        }
      }
      let numDown = clearedYs.select(y => y > gapLines.last()).length;
      let grid = this.grid;
      gapLines.forEach(y => {
        grid[y].forEach(tile => moveSquareDown(grid, [tile.i, tile.j], numDown));
      });
      let fallenCoords = this.fallenCoords;
      fallenCoords.forEach((coord, idx) => {
        if (coord[0] < clearedYs[0]) {
          fallenCoords[idx] = moveSquareDown(grid, coord, clearedYs.length);
        }
      });
    } else if (clearedYs.length === 1){
      let grid = this.grid;
      let fallenCoords = this.fallenCoords;
      fallenCoords.forEach((coord, idx) => {
        if (coord[0] < clearedYs[0]) {
          fallenCoords[idx] = moveSquareDown(grid, coord, clearedYs.length);
        }
      });
    }
  }

  clearLine (yCoord) {
    let newRow = [];
    this.grid[yCoord].forEach((tile, idx) => {
      newRow.push(new Tile([yCoord, idx], ''));
    });
    this.grid[yCoord] = newRow;
    for (let i = 0; i < this.fallenCoords.length; i++) {
      if (this.fallenCoords[i][0] === yCoord) {
        this.fallenCoords.splice(i, 1);
        i -= 1;
      }
    }
  }

  sample () {
    let Piece = this.pieceTypes.sample();
    return new Piece;
  }

  update () {
    let grid = this.grid;
    this.currentPiece.coords.forEach(coord => {
      grid[coord[0]][coord[1]].className = this.currentPiece.className;
    });
  }

  toString () {
    let result = '';
    this.grid.forEach(row => {
      result += '<ul>';
      row.forEach(tile => {
        result += tile.toString();
      });
      result += '</ul>';
    });

    return result;
  }

  fall () {
    this.maybeStop();
    this.clearCurrentPieceTiles();
    this.currentPiece.coords = this.currentPiece.coords.map(coord => {
      return [coord[0] + 1, coord[1]];
    });
  }

  clearCurrentPieceTiles () {
    let grid = this.grid;
    let execute = this.currentPiece.coords.any(coord => coord[0] >= 0);
    if (execute) {
      this.currentPiece.coords.forEach(coord => {
        if (coord[0] >= 0) {
          grid[coord[0]][coord[1]] = new Tile([coord[0], coord[1]], '');
        }
      });
    }
  }

  maybeStop () {
    let stop = false;
    let that = this;
    lowestYCoords(this.currentPiece).forEach(coord => {
      if (coord[0] === 19) {
        stop = true;
        return;
      } else if (tileBelow(that, coord).className !== '') {
        stop = true;
      }
    });

    if (stop) {
      let that = this;
      let sortedCoords = this.currentPiece.coords.mergeSort((coord1, coord2) => coord1[1] > coord2[1])
      sortedCoords.forEach(coord => {
        that.fallenCoords.push(coord);
      });
      this.clearLines();
      this.currentPiece = this.sample();
    }
  }

  moveLeft () {
    let newCoords = this.currentPiece.coords.map(coord => [coord[0], coord[1] - 1]);
    if (this.validCoords(newCoords)) {
      this.clearCurrentPieceTiles();
      this.currentPiece.coords = newCoords;
    }
  }

  moveRight () {
    let newCoords = this.currentPiece.coords.map(coord => [coord[0], coord[1] + 1]);
    if (this.validCoords(newCoords)) {
      this.clearCurrentPieceTiles();
      this.currentPiece.coords = newCoords;
    }
  }

  rotateLeft () {
    let newCoords = this.currentPiece.rotateLeftCoords();
    if (this.validCoords(newCoords)) {
      this.clearCurrentPieceTiles();
      this.currentPiece.coords = newCoords;
      this.currentPiece.executeRotationLeft(newCoords);
    }
  }

  validCoords(coords) {
    let result = true;
    let grid = this.grid;
    let that = this;
    coords.forEach(coord => {
      if (that.currentPiece.coords.any(el => el[0] === coord[0] && el[1] === coord[1])) {
        return;
      } else if (coord[0] < 0 || coord[0] > 19) {
        result = false;
      } else if (coord[1] < 0 || coord[1] > 9) {
        result = false;
        return;
      } else if (grid[coord[0]][coord[1]].className !== '') {
        result = false;
        return;
      }
    });
    return result;
  }

}

export default Board;
