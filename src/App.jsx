import './App.css';

import ChessManager from './model/ChessManager.js';
import { MatePatterns } from './data/MatePatterns.js';

function App() {
  const cm = new ChessManager(MatePatterns);
  cm.loadPattern(0);

  cm.handleMove('d1', 'h5');
}

export default App;
