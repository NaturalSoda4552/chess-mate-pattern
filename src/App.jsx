import './App.css';

import Board from './model/Board.js';
import ChessManager from './model/ChessManager.js';

import { MatePatterns } from './data/MatePatterns.js';

function App() {
  const chessManager = new ChessManager(MatePatterns);
  chessManager.loadCurrentPattern(0);
}

export default App;
