class GreenZ {
  constructor () {
    this.positions = ['horizontal', 'vertical'];
    this.position = 'horizontal';
    this.className = 'green-z';
    this.coords = [[-1, 4], [-1, 5], [0, 3], [0, 4]];
    this.rotateLeftCoords = this.rotateLeftCoords.bind(this);
    this.executeRotationLeft = this.executeRotationLeft.bind(this);
  }

  rotateLeftCoords () {
    if (this.position === 'horizontal') {
      let first = this.coords[0];
      let second = this.coords[1];
      let third = [this.coords[2][0], this.coords[2][1] + 2];
      let fourth = [this.coords[3][0] - 2, this.coords[3][1]];
      return [first, second, third, fourth];
    } else {
      let first = this.coords[0];
      let second = this.coords[1];
      let third = [this.coords[2][0], this.coords[2][1] - 2];
      let fourth = [this.coords[3][0] + 2, this.coords[3][1]];
      return [first, second, third, fourth];
    }
  }

  executeRotationLeft (newCoords) {
    this.coords = newCoords;
    this.position = this.positions[(this.positions.indexOf(this.position) + 1) % this.positions.length]
  }
}

export default GreenZ;
