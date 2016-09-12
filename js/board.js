import Tile from './tile';
import I from './i';
import { tileBelow, tileLeft, tileRight, lowestYCoords, monkeyPatches} from './util';
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

    this.grid = grid;
    this.pieceTypes = [I];
    this.fallenPieces = [];

    let CurrentPiece = this.pieceTypes.sample();
    this.currentPiece = new CurrentPiece;
    this.allPieces = this.allPieces.bind(this);
    this.update = this.update.bind(this);
    this.maybeStop = this.maybeStop.bind(this);
    this.sample = this.sample.bind(this);
    this.clearCurrentPieceTiles = this.clearCurrentPieceTiles.bind(this);
  }

  allPieces () {
    return this.fallenPieces.concat([this.currentPiece]);
  }

  update () {
    let grid = this.grid;
    this.allPieces().forEach(piece => {
      piece.coords.forEach(coord => {
        grid[coord[0]][coord[1]].className = piece.className;
      });
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
    this.currentPiece.coords.forEach(coord => {
      grid[coord[0]][coord[1]] = new Tile([coord[0], coord[1]], '');
    });
  }

  maybeStop () {
    let stop = false;
    let that = this;
    this.currentPiece.coords.forEach(coord => {
      if (coord[0] === 19) {
        stop = true;
        return;
      } else if (tileBelow(that, coord).className !== '') {
        stop = true;
      }
    });

    if (stop) {
      this.fallenPieces.push(this.currentPiece);
      this.currentPiece = this.sample();
    }
  }

  moveLeft () {
    debugger;
  }

  sample () {
    let Piece = this.pieceTypes.sample();
    return new Piece;
  }

}

export default Board;
