import { coordsToSquare, squareToCoords } from '../utils/coordinate';
import FenConverter from './FenConverter';

export default class Board {
  /** @type {({type: string, color: string} | null)[][]} 8x8 배열 형태의 체스판 */
  #grid;
  /** @type {'w' | 'b'} 현재 턴인 플레이어의 색상 ('w': 백, 'b': 흑) */
  #turn;

  /**
   * 생성자: 8x8 배열로부터 Board 인스턴스를 생성한다.
   * @param {({type: string, color: string} | null)[][]} - 8x8 배열 형태의 초기 보드 상태
   * @returns {Board}
   */
  constructor() {
    // 원본 데이터가 변경되지 않도록 깊은 복사 수행
    this.#grid = Array.from({ length: 8 }, () => Array(8).fill(null));
    this.#turn = 'w';
  }

  //#region FEN 문자열로 체스판을 생성하는 로직
  /** FEN 문자열로 Board 인스턴스를 생성한다.
   * @param {string} fen - FEN 문자열
   * @returns {Board}
   */
  createBoardFromFen(fen) {
    const { grid, color } = FenConverter.fenToBoard(fen);
    this.#grid = grid;
    this.#turn = color;
  }

  //#region 체스판을 FEN 문자열로 반환하는 로직
  /**
   * 체스판 정보를 FEN 문자열로 반환한다.
   * @returns {string} - FEN 문자열
   */
  fen() {
    let fenStr = '';
    for (let i = 0; i < 8; i++) {
      let emptyCount = 0;

      let rowStr = '';
      for (let j = 0; j < 8; j++) {
        const piece = this.#grid[i][j];
        if (piece) {
          if (emptyCount > 0) {
            rowStr += emptyCount;
            emptyCount = 0;
          }
          rowStr +=
            piece.color === 'w'
              ? piece.type.toUpperCase()
              : piece.type.toLowerCase();
        } else {
          emptyCount++;
        }
      }
      if (emptyCount > 0) {
        rowStr += emptyCount;
      }
      fenStr += rowStr + (i < 7 ? '/' : '');
    }

    // FEN의 나머지 부분 - 색 제외는 기본값 사용
    fenStr += ` ${this.#turn} - - 0 1`;

    return fenStr;
  }
  //#endregion

  //#region utils
  /**
   * 특정 칸의 기물을 다른 칸으로 이동시킨다.
   * @param {string} fromSquare - 기물의 시작 위치
   * @param {string} toSquare - 기물의 목표 위치
   */
  movePiece(fromSquare, toSquare) {
    const { row: fromRow, col: fromCol } = squareToCoords(fromSquare);
    const { row: toRow, col: toCol } = squareToCoords(toSquare);

    // 시작 위치와 목표 위치가 모두 체스판 위인지 검사
    // if (
    //   !this.#isWithinBounds(fromRow, fromCol) ||
    //   !this.#isWithinBounds(toRow, toCol)
    // ) {
    //   return console.error(
    //     `${fromSquare} -> ${toSquare} 이동은 유효한 이동이 아닙니다.`,
    //   );
    // }

    const piece = this.getPiece(fromSquare);
    if (piece) {
      this.#grid[toRow][toCol] = { ...piece, square: toSquare };
      this.#grid[fromRow][fromCol] = null;
    }
    this.#toggleTurn();
  }

  /**
   * 상대방에게 턴을 넘긴다.
   * @returns {boolean}
   */
  #toggleTurn() {
    this.#turn = this.#turn === 'w' ? 'b' : 'w';
  }
  //#endregion

  //#region getter
  /**
   * 현재 보드의 2차원 배열을 반환한다.
   * @returns {({type: string, color: string} | null)[][]}
   */
  getGrid() {
    return this.#grid;
  }
  /**
   * 지정된 칸의 기물 정보를 반환한다.
   * @param {string} square - 특정 칸
   * @returns {{type: string, color: string, square: string} | null}
   */
  getPiece(square) {
    const { row, col } = squareToCoords(square);
    // if (!this.#isWithinBounds(row, col)) {
    //   return console.error(`${square}은 유효한 위치가 아닙니다.`);
    // }

    return this.#grid[row][col];
  }

  /**
   * 현재 턴인 플레이어의 색상을 반환한다.
   * @returns {'w' | 'b'}
   */
  getTurn() {
    return this.#turn;
  }
  //#endregion
}
