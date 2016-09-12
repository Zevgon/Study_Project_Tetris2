class Tile {
  constructor (coords, className) {
    this.i = coords[0];
    this.j = coords[1];
    this.className = className;
    this.toString = this.toString.bind(this);
  }

  toString () {
    return `<li class=${this.className} />`
  }
}

export default Tile;
