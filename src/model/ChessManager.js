import { MatePatterns } from '../data/MatePatterns.js';
import { validateSquare } from '../utils/coordinate.js';
import Board from './Board';

class ChessManager {
  #patterns;
  #currentPattern;
  #board;
  #status; // 'idle', 'ongoing', 'correct', 'wrong'
  #solutionStep;
  #checkpoints;

  constructor(patterns = MatePatterns) {
    this.#patterns = patterns;
    this.#currentPattern = null;
    this.#board = new Board();
    this.#status = null;
    this.#solutionStep = 0;
    this.#checkpoints = [];
  }

  /**
   * 패턴 인덱스를 받아 체스 패턴을 로드하고 게임 상태를 초기화시킨다.
   * @param {number} index
   */
  loadPattern(index) {
    const pattern = this.#patterns[index];
    this.#solutionStep = 0;

    if (!pattern)
      return console.error(`${index}번 인덱스 패턴을 찾을 수 없습니다.`);
    this.#currentPattern = pattern;

    this.#board.loadFen(pattern.initialFen);
    this.#status = 'ongoing';

    this.#checkpoints = [{ step: 0, fen: pattern.initialFen }];
  }
  /**
   *  가장 최근의 체크포인트(사용자 턴 직전)로 게임 상태를 되돌립니다.
   */
  resetToLastCheckpoint() {
    if (this.#checkpoints.length === 0) {
      console.error('체크포인트가 없습니다.');
      return;
    }

    const lastCheckPoint = this.#checkpoints[this.#checkpoints.length - 1];
    this.#board.loadFen(lastCheckPoint.fen);

    this.#solutionStep = lastCheckPoint.step;
    console.log(
      `'${this.#currentPattern.name}' 패턴의 ${
        lastCheckPoint.step
      } 단계로 돌아갑니다.`,
    );
  }

  /**
   * 이동 처리, 정답/오답 판별, status 업데이트를 수행한다.
   * @param {string} fromSquare
   * @param {string} toSquare
   */
  handleMove(fromSquare, toSquare) {
    // 입력받은 칸들이 유효한지 확인
    validateSquare(fromSquare);
    validateSquare(toSquare);

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
      return;
    }

    // 흑 턴
    const blackTurnMove = this.#currentPattern.solution[this.#solutionStep];
    this.#board.movePiece(blackTurnMove.from, blackTurnMove.to);
    this.#solutionStep += 1;

    // 흑 턴 이후 체크포인트 저장
    this.#checkpoints.push({
      step: this.#solutionStep,
      fen: this.#board.fen(),
    });
    console.log(`체크포인트 저장: ${this.#solutionStep} 단계`);

    // // 정답인 경우
    // this.#board.movePiece(fromSquare, toSquare);
    // this.#solutionStep++;
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
