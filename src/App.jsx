import './App.css';
import Board from './model/Board.js';

import { standardGrid } from './data/standardGrid.js';

function App() {
  const board = new Board(standardGrid);
  //   console.log(board.getGrid()); // 최초 체스판 출력

  //   console.log(board.getPiece('e2')); // 특정 칸의 기물과 색을 출력

  board.movePiece('e2', 'e4');
  //   console.log(board.getGrid()); // 이동 후 체스판 출력
  //   console.log(board.getTurn()); // 이동했으므로 현재 차례는 흑

  const board2 = new Board(standardGrid);
  board2.createBoardFromFen(
    'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
  );
  console.log(board2.getGrid());
}

export default App;
