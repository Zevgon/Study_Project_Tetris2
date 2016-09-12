import Board from './board';

class TetrisView {
  constructor (tetris) {
    this.tetris = tetris;
    this.board = new Board;
    this.render();
    this.startEventListeners();
  }

  startEventListeners () {
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 's':
          this.play();
          break;
        case 'p':
          window.clearInterval(this.timerId);
          break;
        case 'ArrowLeft':
          this.board.moveLeft();
          this.board.update();
          this.render();
          break;
        default:
          return;
      }
    });
  }

  play () {
    this.timerId = window.setInterval(() => {
      this.board.update();
      this.render();
      this.board.fall();
    }, 5000);
  }

  render () {
    this.tetris.innerHTML = this.board.toString();
  }
}

export default TetrisView;
