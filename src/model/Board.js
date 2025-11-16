export default class Board {
  /** @type {({type: string, color: string} | null)[][]} 8x8 배열 형태의 체스판 */
  #grid;
  /** @type {'w' | 'b'} 현재 턴인 플레이어의 색상 ('w': 백, 'b': 흑) */
  #turn;

  /**
   * 생성자: 8x8 배열로부터 Board 인스턴스를 생성
   * @param {({type: string, color: string} | null)[][]} initialGrid - 8x8 배열 형태의 초기 보드 상태
   * @returns {Board}
   */
  constructor(initialGrid) {
    // 원본 데이터가 변경되지 않도록 깊은 복사 수행
    this.#grid = JSON.parse(JSON.stringify(initialGrid));
    this.#turn = 'w';
  }

  //#region FEN 문자열로 체스판을 생성하는 로직
  /**
   * 생성자: Board 인스턴스를 생성
   * @param {string} fen - FEN 문자열로부터 Board 인스턴스를 생성
   */
  createBoardFromFen(fen) {
    const [piecePlacement, color, _1, _2, _3, _4] = fen.split(' ');
    this.#grid = this.#ToArray(piecePlacement);
    this.#turn = color;
  }
  /**
   *
   * @param {string[]} piecePlacement - FEN 기물 배치 문자열
   * @returns {({type: string, color: string} | null)[][]}
   */
  #ToArray(piecePlacement) {
    const grid = [];
    const ranks = piecePlacement.split('/');

    // 문자열 전체를 검사
    ranks.forEach((rankString) => {
      // 문자열의 각 행을 검사 후
      grid.push(this.#parsePieceOneLine(rankString));
    });
    return grid;
  }
  /**
   *
   */
  #parsePieceOneLine(rankString) {
    const row = [];
    let columnIndex = 0;

    rankString.split('').forEach((char) => {
      // 문자인 경우
      if (isNaN(parseInt(char, 10))) {
        row.push({
          type: char.toLowerCase(),
          color: char === char.toUpperCase() ? 'w' : 'b',
        });
        columnIndex += 1;
      } else {
        for (let i = 0; i < parseInt(char, 10); i++) {
          row.push(null);
          columnIndex += 1;
        }
      }
    });
    return row;
  }
  //#endregion

  //#region 체스판을 FEN 문자열로 반환하는 로직
  /**
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

  //#endgion

  //#region getter
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
    if (!this.#isWithinBounds) return null;

    const { row, col } = this.#squareToCoords(square);
    return this.#grid[row][col];
  }

  /**
   * 현재 턴인 플레이어의 색상을 반환
   * @returns {'w' | 'b'} 'w'는 백, 'b'는 흑
   */
  getTurn() {
    return this.#turn;
  }
  //#endregion

  //#region utils
  /**
   * 특정 칸의 기물을 다른 칸으로 이동
   * @param {string} fromSquare - 기물의 시작 위치
   * @param {string} toSquare - 기물의 목표 위치
   */
  movePiece(fromSquare, toSquare) {
    const { row: fromRow, col: fromCol } = this.#squareToCoords(fromSquare);
    const { row: toRow, col: toCol } = this.#squareToCoords(toSquare);

    // 시작 위치와 목표 위치가 모두 체스판 위인지 검사
    if (
      !this.#isWithinBounds(fromRow, fromCol) ||
      !this.#isWithinBounds(toRow, toCol)
    ) {
      console.error(
        `${fromSquare} -> ${toSquare} 이동은 유효한 이동이 아닙니다.`,
      );
      return false;
    }

    const piece = this.getPiece(fromSquare);
    if (piece) {
      this.#grid[toRow][toCol] = { ...piece, square: toSquare };
      this.#grid[fromRow][fromCol] = null;
    }
    this.#toggleTurn();
  }
  /**
   * 주어진 좌표가 체스판 범위(0-7) 내에 있는지 확인합니다.
   * @param {number} row
   * @param {number} col
   * @returns {boolean}
   */
  #isWithinBounds(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
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
  //#endregion
}
