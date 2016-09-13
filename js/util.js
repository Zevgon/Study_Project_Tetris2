export const tileBelow = (board, coord) => {
  return board.grid[coord[0] + 1][coord[1]];
}

export const tileLeft = (board, coord) => {
  return board.grid[coord[0]][coord[1] - 1];
}

export const tileRight = (board, coord) => {
  return board.grid[coord[0]][coord[1] + 1];
}

export const lowestYCoords = piece => {
  let answer = [];
  piece.coords.forEach(coord => {
    if (answer.myIncludes(savedCoord => savedCoord[1] === coord[1])) {
      let savedCoord = answer.find(answerCoord => coord[1] === answerCoord[1]);
      if (coord[0] > savedCoord[0]) {
        let answerIdx = answer.indexOf(savedCoord);
        answer.splice(answerIdx, 1, coord);
      }
    } else {
      answer.push(coord);
    }
  });
  return answer;
}

export const moveSquareDown = (grid, pos, numPositionsDown) => {
  let className = grid[pos[0]][pos[1]].className;
  grid[pos[0]][pos[1]].className = '';
  grid[pos[0] + numPositionsDown][pos[1]].className = className;
}

export const monkeyPatches = () => {
  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
  }

  Array.prototype.myIncludes = function (callback) {
    let answer = false;
    this.forEach(el => {
      if (callback(el)) {
        answer = true;
      }
    });

    return answer;
  }

  Array.prototype.any = function (callback) {
    let answer;
    this.forEach(el => {
      if (callback(el)) {
        answer = true;
      } else if (!callback(el) && answer === undefined) {
        answer = false;
      }
    });

    return answer;
  }

  Array.prototype.inject = function (callback, acc) {
    let idx = 0;
    if (acc === undefined) {
      acc = this[0];
      idx += 1;
    }
    for (idx; idx < this.length; idx++) {
      acc = callback(acc, this[idx]);
    }

    return acc;
  };

  Array.prototype.flatten = function () {
    return this.inject((a, b) => {
      if (b instanceof Array) {
        return a.concat(b.flatten());
      } else {
        return a.concat(b);
      }
    }, []);
  }
}
