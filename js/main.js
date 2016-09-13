import TetrisView from './tetris_view';

document.addEventListener('DOMContentLoaded', () => {
  let tetris = document.getElementById('tetris');
  let view = new TetrisView(tetris);
  window.view = view;
});
