import { MatePatterns } from '../data/MatePatterns.js';
import Board from './Board';

class ChessManager {
  #patterns;
  #currentPattern;
  #board;
  #status; // 'idle', 'ongoing', 'correct', 'wrong'

  constructor(patterns = MatePatterns) {
    this.#patterns = patterns;
    this.#currentPattern = null;
    this.#board = new Board();
    this.#status = null;
  }

  /**
   * 패턴 인덱스를 받아 체스 패턴을 로드하고 게임 상태를 초기화시킨다.
   * @param {number} index
   */
  loadPattern(index) {
    const pattern = this.#patterns[index];
    if (!pattern)
      return console.error(`${index}번 인덱스 패턴을 찾을 수 없습니다.`);
    this.#currentPattern = pattern;

    this.#board.loadFen(pattern.initialFen);
    this.#status = 'ongoing';
  }
}

export default ChessManager;
