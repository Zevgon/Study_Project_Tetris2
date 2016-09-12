export const tileBelow = (board, coord) => {
  return board.grid[coord[0] + 1][coord[1]];
}

export const tileLeft = (board, coord) => {
  return board.grid[coord[0]][coord[1] - 1];
}

export const tileRight = (board, coord) => {
  return board.grid[coord[0]][coord[1] + 1];
}

export const lowestYCoords = (piece) => {
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
}
