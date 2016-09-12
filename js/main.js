import TetrisView from './tetris_view';

document.addEventListener('DOMContentLoaded', () => {
  let tetris = document.getElementById('tetris');
  new TetrisView(tetris);
});
