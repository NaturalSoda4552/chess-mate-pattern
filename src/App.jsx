import './App.css';

import ChessManager from './model/ChessManager.js';
import { MatePatterns } from './data/MatePatterns.js';

function App() {
  const cm = new ChessManager(MatePatterns);
  cm.loadPattern(1);

  cm.handleMove('f1', 'c4');
  cm.handleMove('h5', 'g6'); // 틀린 수
  // cm.handleMove('h5', 'f7'); - 정답 수
  cm.resetToLastCheckpoint();
  cm.handleMove('h5', 'f7');
}

export default App;
