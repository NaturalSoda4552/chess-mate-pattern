class Board {
  #grid; // 하나의 체스판

  constructor(initialGrid) {
    this.#grid = JSON.parse(JSON.stringify(initialGrid));
  }

  // 체스판 반환
  getGrid() {
    return this.#grid;
  }
  // 한 칸의 기물 정보 반환
  getPiece(square) {
    const { row, col } = this.#squareToCoords(square);
    return this.#grid[row][col];
  }
  // 특정 칸의 행/열(위치)을 파싱해서 반환
  #squareToCoords(square) {
    const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = 8 - parseInt(square[1], 10);
    return { row, col };
  }
  // 기물 움직이기
  movePiece(from, to) {
    const piece = this.getPiece(from);
    if (piece) {
      const { row: fromRow, col: fromCol } = this.#squareToCoords(from);
      const { row: toRow, col: toCol } = this.#squareToCoords(to);

      this.#grid[toRow][toCol] = { ...piece, square: to };
      this.#grid[fromRow][fromCol] = null;
    }
  }
}

export default Board;
