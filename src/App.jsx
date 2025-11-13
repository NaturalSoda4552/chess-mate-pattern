import './App.css';
import Board from './model/Board.js';

import { standardGrid } from './data/standardGrid.js';

function App() {
  const board = new Board(standardGrid);
  console.log(board.getGrid()); // 최초 체스판 출력

  console.log(board.getPiece('e2')); // 특정 칸의 기물과 색을 출력

  board.movePiece('e2', 'e4');
  console.log(board.getGrid()); // 이동 후 체스판 출력
  console.log(board.getTurn()); // 이동했으므로 현재 차례는 흑
}

export default App;
