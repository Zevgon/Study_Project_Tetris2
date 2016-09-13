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
  let updatedTile = grid[pos[0] + numPositionsDown][pos[1]];
  updatedTile.className = className;
  return [updatedTile.i, updatedTile.j];
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

  Array.prototype.select = function (callback) {
    let result = [];
    this.forEach(el => {
      if (callback(el)) {
        result.push(el);
      }
    });

    return result;
  }

  Array.prototype.uniq = function (callback) {
    if (callback === undefined) {
      callback = el => el;
    }
    let answer = [];
    let callbackResults = [];
    this.forEach(el => {
      let callbackResult = callback(el);
      if (!callbackResults.includes(callbackResult)) {
        callbackResults.push(callbackResult);
        answer.push(el);
      }
    });

    return answer;
  }

  const merge = function (arr1, arr2, callback) {
    if (callback === undefined) {
      callback = function (x, y) {
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      };
    }

    let result = [];
    while ((arr1.length !== 0) && (arr2.length !== 0)) {
      if (callback(arr1[0], arr2[0]) < 0) {
        result.push(arr1.shift());
      } else {
        result.push(arr2.shift());
      }
    }

    return result.concat(arr1).concat(arr2);
  }

  Array.prototype.mergeSort = function (callback) {
    if (this.length <= 1) {
      return this;
    }

    let half = Math.floor(this.length / 2);
    let left = this.slice(0, half);
    let right = this.slice(half);

    let sortedLeft = left.mergeSort(callback);
    let sortedRight = right.mergeSort(callback);

    return merge(sortedLeft, sortedRight, callback);
  };

  Array.prototype.last = function () {
    return this[this.length - 1];
  }
}
