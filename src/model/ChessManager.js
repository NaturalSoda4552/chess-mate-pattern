import { MatePatterns } from '../data/MatePatterns.js';
import { ValidateSquare } from '../utils/coordinate.js';
import Board from './Board';

class ChessManager {
  #patterns;
  #currentPattern;
  #board;
  #status; // 'idle', 'ongoing', 'correct', 'wrong'
  #solutionStep;

  constructor(patterns = MatePatterns) {
    this.#patterns = patterns;
    this.#currentPattern = null;
    this.#board = new Board();
    this.#status = null;
    this.#solutionStep = 0;
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

  /**
   * 이동 처리, 정답/오답 판별, status 업데이트를 수행한다.
   * @param {string} fromSquare
   * @param {string} toSquare
   */
  handleMove(fromSquare, toSquare) {
    // 입력받은 칸들이 유효한지 확인
    ValidateSquare(fromSquare);
    ValidateSquare(toSquare);

    const piece = this.#board.getPiece(fromSquare);
    if (!piece || piece.color !== this.#board.getTurn()) {
      console.error('기물이 없거나 플레이어 색의 기물이 아닙니다.');
      return;
    }

    const allValidMoves = piece.getValidMoves(this.#board, fromSquare);
    if (!allValidMoves.includes(toSquare)) {
      console.error('이동할 수 없는 위치입니다.');
      return;
    }

    const expectedMove = this.#currentPattern.solution[this.#solutionStep];
    if (fromSquare !== expectedMove.from || toSquare !== expectedMove.to) {
      console.error('오답입니다!');
      return;
    }

    // 정답인 경우
    this.#board.movePiece(fromSquare, toSquare);
    this.#solutionStep++;
    if (this.#solutionStep === this.#currentPattern.solution.length) {
      console.log('정답입니다!');
    }
    return;
  }

  /**
   * 현재 Board 객체를 반환한다.
   * @returns {import('../model/Board.js').Board | null}
   */
  getBoard() {
    return this.#board;
  }
}

export default ChessManager;
