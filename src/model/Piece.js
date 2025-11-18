class Piece {
  color;
  type;

  /**
   * 생성자: 색과 기물 타입을 받아 Piece 인스턴스를 생성한다.
   * @param {({type: string, color: string} | null)[][]} - 8x8 배열 형태의 초기 보드 상태
   * @param {string} color - 기물의 색
   * @param {string} type - 기물의 타입
   * @returns {Piece}
   */
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }

  /**
   * 기물이 이동할 수 있는 모든 유효한 칸의 배열을 반환한다.
   * @param {Board} board
   * @param {string} fromSquare - 기물이 현재 위치한 칸
   * @returns {string[]}
   */
  getValidMoves(board, fromSquare) {
    throw new Error('getValidMoves()는 자식에서 반드시 재정의되어야 합니다.');
  }
}

export default Piece;
