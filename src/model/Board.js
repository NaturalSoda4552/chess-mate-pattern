export default class Board {
  /** @type {({type: string, color: string} | null)[][]} 8x8 배열 형태의 체스판 */
  #grid;
  /** @type {'w' | 'b'} 현재 턴인 플레이어의 색상 ('w': 백, 'b': 흑) */
  #turn;

  /**
   * 생성자: Board 인스턴스를 생성
   * @param {({type: string, color: string} | null)[][]} initialGrid - 8x8 배열 형태의 초기 보드 상태
   */
  constructor(initialGrid) {
    // 원본 데이터가 변경되지 않도록 깊은 복사 수행
    this.#grid = JSON.parse(JSON.stringify(initialGrid));
    this.#turn = 'w';
  }

  /**
   * 현재 보드의 2차원 배열을 반환
   * @returns {({type: string, color: string} | null)[][]}
   */
  getGrid() {
    return this.#grid;
  }

  /**
   * 지정된 칸의 기물 정보를 반환
   * @param {string} square - 'e4'와 같은 대수 표기법
   * @returns {{type: string, color: string, square: string} | null}
   */
  getPiece(square) {
    const { row, col } = this.#squareToCoords(square);
    return this.#grid[row][col];
  }

  /**
   * 특정 칸의 기물을 다른 칸으로 이동
   * @param {string} fromSquare - 기물의 시작 위치
   * @param {string} toSquare - 기물의 목표 위치
   */
  movePiece(fromSquare, toSquare) {
    const piece = this.getPiece(fromSquare);
    if (piece) {
      const { row: fromRow, col: fromCol } = this.#squareToCoords(fromSquare);
      const { row: toRow, col: toCol } = this.#squareToCoords(toSquare);

      this.#grid[toRow][toCol] = { ...piece, square: toSquare };
      this.#grid[fromRow][fromCol] = null;
    }
    this.#toggleTurn();
  }

  /**
   * 현재 턴인 플레이어의 색상을 반환
   * @returns {'w' | 'b'} 'w'는 백, 'b'는 흑
   */
  getTurn() {
    return this.#turn;
  }

  /**
   * 대수 표기법을 배열 좌표로 변환합니다. (ex. 'a8' -> {row: 0, col: 0})
   * @param {string} square
   * @returns {{row: number, col: number}}
   * @private
   */
  #squareToCoords(square) {
    const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(square[1], 10);
    return { row, col };
  }

  /**
   * 상대방에게 턴 넘기기
   * @private
   */
  #toggleTurn() {
    this.#turn = this.#turn === 'w' ? 'b' : 'w';
  }
}
