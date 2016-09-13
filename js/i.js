class I {
  constructor () {
    this.positions = ['horizontal', 'vertical'];
    this.position = 'horizontal';
    this.className = 'i';
    this.coords = [[-1, 3], [-1, 4], [-1, 5], [-1, 6]];
    this.rotateLeftCoords = this.rotateLeftCoords.bind(this);
    this.togglePosition = this.togglePosition.bind(this);
    this.executeRotationLeft = this.executeRotationLeft.bind(this);
  }

  rotateLeftCoords () {
    if (this.position === 'horizontal') {
      let first = [this.coords[0][0] - 1, this.coords[0][1] + 1];
      let second = this.coords[1];
      let third = [this.coords[2][0] + 1, this.coords[2][1] - 1];
      let fourth = [this.coords[3][0] + 2, this.coords[3][1] - 2];
      return [first, second, third, fourth];
    } else {
      let first = [this.coords[0][0] + 1, this.coords[0][1] - 1];
      let second = this.coords[1];
      let third = [this.coords[2][0] - 1, this.coords[2][1] + 1];
      let fourth = [this.coords[3][0] - 2, this.coords[3][1] + 2];
      return [first, second,third, fourth];
    }
  }

  executeRotationLeft (newCoords) {
    this.coords = newCoords;
    this.position = this.positions[(this.positions.indexOf(this.position) + 1) % this.positions.length]
  }

  togglePosition () {
    this.position === 'horizontal' ? this.position = 'vertical' : this.position = 'horizontal';
  }
}

export default I;
