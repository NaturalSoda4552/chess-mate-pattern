import { MatePatterns } from '../data/MatePatterns.js';
import Board from './Board';

class ChessManager {
  #patterns;
  #currentPatternIndex;
  #board;
  #originalFen;
  #userMoves;
  #status;

  constructor(patterns = MatePatterns) {
    this.#patterns = patterns;
    this.#currentPatternIndex = null;
    this.#board = null;
    this.#originalFen = null;
    this.#userMoves = [];
    this.#status = 'idle';
  }

  /**
   * 특정 패턴을 선택하여 로드
   * @param {number} index - 패턴 인덱스
   */
  loadCurrentPattern(index) {
    this.#currentPatternIndex = index;
    this.#originalFen = this.#patterns[index].initialFen;
    this.#board = new Board();
    this.#board.createBoardFromFen(this.#originalFen);
    this.#userMoves = [];
    this.#status = 'idle';
  }
}

export default ChessManager;
